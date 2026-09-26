// 슬라이드 스크린샷 + 레이아웃 검사 도구 (Playwright)
//
// 사용법 (프로젝트 루트에서, 개발 서버 `npm run dev` 가 켜진 상태):
//   node tools/shot.mjs final --sheet               # 전체 슬라이드를 '마지막 빌드 단계'로 찍고 모아보기 이미지 생성
//   node tools/shot.mjs all                         # 전체 슬라이드를 0단계로
//   node tools/shot.mjs 7 abstract/3 theory-time/2  # 특정 슬라이드 (번호·id, 빌드 단계는 /n)
// 옵션:
//   --browser chrome|webkit   (webkit = Safari 엔진, 기본 chrome — 설치된 Google Chrome 사용)
//   --base http://localhost:3100   (프로덕션 확인 시 npm run build && npm run start 후 같은 주소)
//   --out <dir>               (기본 tools/.shots/<browser>)
//   --wait <ms>               (진입 애니메이션 대기, 기본 2200)
//   --sheet                   (6장씩 모은 sheetN.png 생성 — python3 + Pillow 필요)
//
// 경고 출력:
//   ⚠ overflow          1600×900 캔버스 밖으로 나간 요소, overflow:hidden 컨테이너에서 잘린 글자
//   ⚠ footer zone       본문 글자가 바닥글 영역(y > 836)을 침범
//   ⚠ runtime errors    콘솔 오류·페이지 오류·Next.js 오류 오버레이
// aria-hidden="true" 인 장식 요소는 검사에서 제외된다.
import { chromium, webkit } from "playwright";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
let browserName = "chrome";
let base = "http://localhost:3100";
let out = null;
let wait = 2200;
let sheet = false;
const targets = [];
for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (a === "--browser") browserName = args[++i];
  else if (a === "--base") base = args[++i];
  else if (a === "--out") out = args[++i];
  else if (a === "--wait") wait = Number(args[++i]);
  else if (a === "--sheet") sheet = true;
  else targets.push(a);
}
out ??= path.join(here, ".shots", browserName);
fs.mkdirSync(out, { recursive: true });

const browser = browserName === "webkit" ? await webkit.launch() : await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({ viewport: { width: 1600, height: 900 }, deviceScaleFactor: 1 });

const errors = [];
page.on("pageerror", (e) => errors.push(`[pageerror] ${e.message}`));
page.on("console", (m) => {
  if (m.type() === "error") errors.push(`[console.error] ${m.text()}`);
});

/** 새로 로드해야 진입 애니메이션이 처음부터 재생되고 빌드 단계가 정확히 반영된다 */
async function load(hash) {
  await page.goto(`${base}/#/${hash}`, { waitUntil: "networkidle", timeout: 60000 });
  // 마우스를 움직이지 않아야 하단 조작 버튼이 숨겨진 상태로 찍힌다
  await page.waitForTimeout(wait);
  const overlay = await page.evaluate(() => {
    const el = document.querySelector("nextjs-portal");
    return el?.shadowRoot?.textContent?.slice(0, 600) ?? "";
  });
  if (/error|failed|unhandled/i.test(overlay)) errors.push(`[next-overlay] ${overlay.replace(/\s+/g, " ")}`);
}

/** 현재 슬라이드 정보: 번호·전체 수·제목·빌드 단계 수 (덱의 aria 속성에서 읽는다) */
async function slideInfo() {
  return page.evaluate(() => {
    const label = document.querySelector("section[aria-roledescription=slide]")?.getAttribute("aria-label") ?? "";
    const m = label.match(/^(\d+)\s*\/\s*(\d+):\s*(.*)$/);
    const build = document.querySelector('[aria-label^="빌드"]')?.getAttribute("aria-label") ?? "";
    const b = build.match(/(\d+)\/(\d+)/);
    return {
      n: m ? Number(m[1]) : 0,
      total: m ? Number(m[2]) : 0,
      title: m ? m[3] : "",
      steps: b ? Number(b[2]) : 0,
    };
  });
}

async function check() {
  return page.evaluate(() => {
    const canvas = document.querySelector(".slide-canvas");
    const sec = canvas?.querySelector("section[aria-roledescription=slide]");
    if (!canvas || !sec) return { overflow: ["(슬라이드를 찾지 못함)"], footer: [] };
    const cr = canvas.getBoundingClientRect();
    const sx = cr.width / 1600;
    const overflow = [];
    for (const el of sec.querySelectorAll("*")) {
      if (el.closest('[aria-hidden="true"]')) continue;
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;
      const style = getComputedStyle(el);
      if (style.visibility === "hidden" || Number(style.opacity) === 0) continue;
      const L = (r.left - cr.left) / sx, T = (r.top - cr.top) / sx;
      const R = (r.right - cr.left) / sx, B = (r.bottom - cr.top) / sx;
      if (R > 1601 || B > 901 || L < -1 || T < -1) {
        overflow.push(`${el.tagName.toLowerCase()} [${Math.round(L)},${Math.round(T)} → ${Math.round(R)},${Math.round(B)}] "${(el.textContent || "").trim().slice(0, 40)}"`);
      }
      if (["hidden", "clip"].includes(style.overflowY) || ["hidden", "clip"].includes(style.overflowX)) {
        for (const d of el.querySelectorAll("p,span,li,h1,h2,h3,h4,td,th,strong,em,mark")) {
          if (d.closest('[aria-hidden="true"]')) continue;
          if (Number(getComputedStyle(d).opacity) === 0 || !(d.textContent || "").trim()) continue;
          const dr = d.getBoundingClientRect();
          if (dr.width === 0 || dr.height === 0) continue;
          if (dr.bottom > r.bottom + 2 * sx || dr.right > r.right + 2 * sx || dr.top < r.top - 2 * sx || dr.left < r.left - 2 * sx) {
            overflow.push(`CLIPPED text inside ${el.tagName.toLowerCase()}: "${(d.textContent || "").trim().slice(0, 40)}"`);
            break;
          }
        }
      }
    }
    const footer = [];
    for (const el of sec.querySelectorAll("p,span,li,h1,h2,h3,td,th,div")) {
      if (el.children.length > 0 && el.tagName === "DIV") continue;
      if (el.closest('[aria-hidden="true"]')) continue;
      const txt = (el.textContent || "").trim();
      if (!txt) continue;
      const r = el.getBoundingClientRect();
      if (r.width === 0 || Number(getComputedStyle(el).opacity) === 0) continue;
      const B = (r.bottom - cr.top) / sx;
      if (B > 836) footer.push(`"${txt.slice(0, 30)}" bottom=${Math.round(B)}`);
    }
    return { overflow: overflow.slice(0, 12), footer: footer.slice(0, 6) };
  });
}

// ── 대상 목록 만들기 ──────────────────────────────────────
let list = targets;
if (targets.length === 1 && (targets[0] === "all" || targets[0] === "final")) {
  const final = targets[0] === "final";
  await load("1");
  const { total } = await slideInfo();
  list = [];
  for (let n = 1; n <= total; n++) {
    if (!final) {
      list.push(String(n));
      continue;
    }
    await page.goto(`${base}/#/${n}`, { waitUntil: "networkidle" });
    await page.waitForTimeout(300);
    const { steps } = await slideInfo();
    list.push(steps > 0 ? `${n}/${steps}` : String(n));
  }
}

const files = [];
for (const t of list) {
  await load(t);
  const info = await slideInfo();
  const name = /^\d+(\/\d+)?$/.test(t) ? `${String(info.n).padStart(2, "0")}${t.includes("/") ? "_s" + t.split("/")[1] : ""}` : t.replace(/\//g, "_s");
  const file = path.join(out, `${name}.png`);
  await page.screenshot({ path: file });
  files.push(file);
  const { overflow, footer } = await check();
  console.log(`✓ ${String(info.n).padStart(2, "0")}/${info.total} ${info.title}${t.includes("/") ? ` (단계 ${t.split("/")[1]})` : ""} → ${path.relative(process.cwd(), file)}`);
  if (overflow.length) console.log(`   ⚠ overflow:\n     ${overflow.join("\n     ")}`);
  if (footer.length) console.log(`   ⚠ footer zone (y > 836):\n     ${footer.join("\n     ")}`);
}

if (errors.length) {
  console.log("\n⚠ runtime errors:");
  for (const e of [...new Set(errors)].slice(0, 20)) console.log("  " + e);
}
await browser.close();

if (sheet && files.length) {
  for (let i = 0; i < files.length; i += 6) {
    const dest = path.join(out, `sheet${i / 6 + 1}.png`);
    execFileSync("python3", [path.join(here, "sheet.py"), dest, ...files.slice(i, i + 6)]);
    console.log(`▦ ${path.relative(process.cwd(), dest)}`);
  }
}
