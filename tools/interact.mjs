// 덱 인터랙션 테스트 (키보드·클릭·목록·새로고침·16:9 유지): node tools/interact.mjs [chrome|webkit] [base URL, 기본 http://localhost:3100]
import { chromium, webkit } from "playwright";

const browserName = process.argv[2] ?? "chrome";
const base = process.argv[3] ?? "http://localhost:3100";
const browser = browserName === "webkit" ? await webkit.launch() : await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));

let failures = 0;
const check = (name, cond, extra = "") => {
  console.log(`${cond ? "PASS" : "FAIL"}  ${name}${extra ? "  — " + extra : ""}`);
  if (!cond) failures++;
};
const hash = () => page.evaluate(() => location.hash.split("/").slice(0, 2).join("/"));
const expanded = () =>
  page.$$eval("button[aria-expanded=true]", (els) => els.map((e) => e.textContent?.trim()));
const settle = (ms = 700) => page.waitForTimeout(ms);

await page.goto(`${base}/#/2`, { waitUntil: "networkidle" });
await settle(2000);
check("abstract loads at #/2", (await hash()) === "#/2");
check("no row expanded at step 0", (await expanded()).length === 0);

await page.click('[role=button][aria-label="방법론 설명 보기"]');
await settle();
let ex = await expanded();
check("click green highlight → 방법론 row opens", ex.length === 1 && ex[0].includes("방법론"), JSON.stringify(ex));

await page.keyboard.press("ArrowRight");
await settle();
ex = await expanded();
check("ArrowRight → next build (결과)", ex.length === 1 && ex[0].includes("결과"), JSON.stringify(ex));

await page.click('[role=button][aria-label="결과 설명 보기"] >> nth=1');
await settle();
check("click active highlight again → closes", (await expanded()).length === 0);

await page.click("button:has-text('서론')");
await settle();
ex = await expanded();
check("click accordion row 서론 → opens", ex.length === 1 && ex[0].includes("서론"), JSON.stringify(ex));

// Space should not double-trigger after clicking a (now blurred) button
await page.keyboard.press(" ");
await settle();
ex = await expanded();
check("Space after row click → exactly one step (이론)", ex.length === 1 && ex[0].includes("이론"), JSON.stringify(ex));

for (let i = 0; i < 4; i++) {
  await page.keyboard.press("ArrowRight");
  await settle(250);
}
await settle(900);
check("after last build, ArrowRight moves to slide 3", (await hash()) === "#/3", await hash());

await page.keyboard.press("ArrowLeft");
await settle(1200);
ex = await expanded();
check("ArrowLeft returns to slide 2 fully built (결론 open)", (await hash()) === "#/2" && ex.length === 1 && ex[0].includes("결론"), `${await hash()} ${JSON.stringify(ex)}`);

await page.keyboard.press("Shift+ArrowRight");
await settle(1000);
check("Shift+ArrowRight skips builds to next slide", (await hash()) === "#/3", await hash());

await page.keyboard.press("g");
await settle(600);
const dialogVisible = await page.isVisible("[role=dialog]");
check("G opens overview dialog", dialogVisible);
await page.click("[role=dialog] button:has-text('표지')");
await settle(1200);
check("overview item navigates to 표지", (await hash()) === "#/1", await hash());
check("dialog closed after select", !(await page.isVisible("[role=dialog]")));

await page.keyboard.press("End");
await settle(1200);
const total = await page.evaluate(() => {
  const l = document.querySelector("[aria-roledescription=slide]")?.getAttribute("aria-label") ?? "";
  return l;
});
check("End goes to last slide", /감사합니다/.test(total), total);

await page.keyboard.press("Home");
await settle(1000);
check("Home goes to first slide", (await hash()) === "#/1");

// controls appear on mouse move and next button works once
await page.mouse.move(700, 500);
await page.mouse.move(720, 520);
await settle(500);
await page.click("button[aria-label=다음]");
await settle(900);
check("control ▶ button navigates to slide 2", (await hash()) === "#/2", await hash());
await page.keyboard.press(" ");
await settle(700);
ex = await expanded();
check("Space after control click advances exactly one build", (await hash()) === "#/2" && ex.length === 1 && ex[0].includes("서론"), `${await hash()} ${JSON.stringify(ex)}`);

// reload keeps slide + build step
await page.keyboard.press("ArrowRight");
await page.keyboard.press("ArrowRight");
await settle(600);
await page.reload({ waitUntil: "networkidle" });
await settle(1800);
ex = await expanded();
check("reload restores build step (방법론 open at #/2/3)", ex.length === 1 && ex[0].includes("방법론"), `${await page.evaluate(() => location.hash)} ${JSON.stringify(ex)}`);

// resize → stage keeps 16:9
await page.setViewportSize({ width: 1000, height: 900 });
await settle(500);
const box = await page.evaluate(() => {
  const r = document.querySelector(".slide-canvas")?.getBoundingClientRect();
  return r ? { w: r.width, h: r.height } : null;
});
check("stage keeps 16:9 on narrow viewport", box && Math.abs(box.w / box.h - 16 / 9) < 0.01, JSON.stringify(box));

console.log(`\n${failures === 0 ? "ALL PASS" : failures + " FAILURE(S)"} (${browserName})`);
if (errors.length) console.log("errors:", [...new Set(errors)].slice(0, 10));
await browser.close();
process.exit(failures ? 1 : 0);
