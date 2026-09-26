"use client";

import type { LucideIcon } from "lucide-react";
import { ArrowDown, Equal, Flower2, GraduationCap, Rocket, Shuffle, Stethoscope } from "lucide-react";
import { motion } from "framer-motion";
import type { SlideDef } from "@/components/deck/types";
import {
  Callout,
  Chip,
  Em,
  Eyebrow,
  Mark,
  Panel,
  Reveal,
  SlideFrame,
  Step,
  useStepShown,
} from "@/components/slide/primitives";
import { EASE_OUT } from "@/components/slide/motion";
import { cn } from "@/lib/utils";

/* ────────────────────────────────────────────────────────────
 * 실험 2 — 직업별로 교사와 비교한 결과 (해설 4.3 표 그대로)
 *  행 = 바빠 보이나(매우 바쁨 / 덜 바쁨), 열 = 창업가인가(예 / 아니오)
 *  odd = "이상한 점" (단계 2에서 표시)
 * ──────────────────────────────────────────────────────────── */
type Cell = {
  job: string;
  icon: LucideIcon;
  kind: "penalty" | "none" | "base";
  result: string;
  note?: string;
  odd?: string;
};

const BUSY_ROW: [Cell, Cell] = [
  { job: "스타트업 대표", icon: Rocket, kind: "penalty", result: "불이익", note: "교사와 비교해 불이익을 받았다" },
  { job: "간호사", icon: Stethoscope, kind: "penalty", result: "불이익", note: "교사와 비교해 불이익을 받았다", odd: "창업가가 아닌데도" },
];
const CALM_ROW: [Cell, Cell] = [
  { job: "꽃집 사장", icon: Flower2, kind: "none", result: "차이 없음", note: "불이익도 이득도 아님", odd: "창업가인데도" },
  { job: "초등학교 교사", icon: GraduationCap, kind: "base", result: "비교 기준" },
];

/* 행 머리 폭 + 두 열 — 머리글·두 행이 같은 격자를 쓴다 */
const ROW_GRID = "grid grid-cols-[140px_1fr_1fr] gap-x-4";

function MatrixCell({ cell }: { cell: Cell }) {
  const shown = useStepShown(1);
  const hit = shown && cell.kind === "penalty";
  const Icon = cell.icon;
  return (
    <div
      className={cn(
        "flex h-full flex-col justify-between rounded-[20px] px-7 pt-6 pb-5 ring-1 transition-[background-color,box-shadow] duration-500",
        hit ? "bg-tone-soft/45 shadow-[0_18px_36px_-24px_var(--tone)] ring-tone/35" : "bg-surface ring-line",
      )}
    >
      <div className="flex items-center gap-4">
        <span
          className={cn(
            "grid size-[52px] shrink-0 place-items-center rounded-[14px] transition-colors duration-500",
            hit ? "bg-tone text-white" : "bg-paper-2 text-ink-2",
          )}
        >
          <Icon className="size-[27px]" strokeWidth={1.8} />
        </span>
        <span className="text-[29px] font-bold tracking-[-0.03em] text-ink">{cell.job}</span>
      </div>

      <div className="flex flex-col items-start">
        {/* 이상한 점 (단계 2) */}
        {cell.odd ? (
          <Step at={2} kind="pop" className="mb-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-[3px] text-[18px] font-semibold text-tone-ink ring-[1.5px] ring-tone/60">
              <Shuffle className="size-[17px]" strokeWidth={2.2} />
              {cell.odd}
            </span>
          </Step>
        ) : null}

        {/* 결과 (단계 1) */}
        <Step at={1} className="flex flex-col">
          <span
            className={cn(
              "flex items-center gap-2 text-[28px] leading-tight font-bold tracking-[-0.03em]",
              cell.kind === "penalty" && "text-tone-ink",
              cell.kind === "none" && "text-ink-2",
              cell.kind === "base" && "font-semibold text-ink-3",
            )}
          >
            {cell.kind === "penalty" ? <ArrowDown className="size-[26px]" strokeWidth={2.6} /> : null}
            {cell.kind === "none" ? <Equal className="size-[26px]" strokeWidth={2.6} /> : null}
            {cell.result}
          </span>
          {cell.note ? (
            <span
              className={cn(
                "mt-0.5 text-[20px] tracking-[-0.01em]",
                cell.kind === "penalty" ? "font-medium text-tone-ink/85" : "text-ink-3",
              )}
            >
              {cell.note}
            </span>
          ) : null}
        </Step>
      </div>
    </div>
  );
}

function RowHead({ label, active }: { label: string; active: boolean }) {
  return (
    <div className="flex h-full items-center">
      <div
        className={cn(
          "flex w-full flex-col items-start gap-1.5 rounded-[16px] px-4 py-4 transition-colors duration-500",
          active ? "bg-tone text-white" : "bg-transparent text-ink-2",
        )}
      >
        <span className={cn("text-[18px] font-semibold", active ? "text-white/80" : "text-ink-3")}>바빠 보이나</span>
        <span className="text-[25px] leading-none font-bold tracking-[-0.03em]">{label}</span>
      </div>
    </div>
  );
}

function Busy() {
  const lineShown = useStepShown(2);

  return (
    <SlideFrame
      section="result"
      kicker="4.3 ‘창업가라서’가 아니라 ‘바빠 보여서’일 수도 있다 · 실험 2"
      title={
        <>
          불이익은 ‘창업가냐’가 아니라 <Mark>‘바빠 보이냐’</Mark>로 갈렸다
        </>
      }
      bodyClassName="grid grid-cols-[420px_1fr] gap-12"
    >
      {/* ── 왼쪽: 묶어서 보면 ≈ 0 / 공통점 ───────────── */}
      <div className="flex min-h-0 flex-col gap-5">
        <Reveal>
          <Panel className="px-8 py-7">
            <Eyebrow>먼저 · ‘창업가’로 묶어서 보면</Eyebrow>
            <div className="mt-4 flex flex-col gap-2.5">
              <div className="flex items-center gap-3 rounded-[14px] bg-paper-2/70 px-4 py-2.5">
                <Chip className="px-3">창업가</Chip>
                <span className="text-[21px] font-medium text-ink">스타트업 대표 + 꽃집 사장</span>
              </div>
              <div className="flex items-center gap-3 rounded-[14px] bg-paper-2/70 px-4 py-2.5">
                <Chip variant="outline" className="px-3">비교</Chip>
                <span className="text-[21px] font-medium text-ink">교사 + 간호사</span>
              </div>
            </div>
            <div className="mt-5 flex items-center gap-5 border-t border-line pt-5">
              <span className="shrink-0 font-serif text-[84px] leading-[0.9] tracking-[-0.02em] text-tone-ink">
                ≈0
              </span>
              <p className="text-[20px] leading-[1.45] text-ink-3">
                <strong className="text-[22px] font-semibold text-ink">차이가 거의 0</strong>
                <br />
                ‘창업가 전체’에 대한 불이익은
                <br />이 실험에서 나타나지 않았다.
              </p>
            </div>
          </Panel>
        </Reveal>

        <Step at={2}>
          <Callout title="그렇다면, 공통점은?">
            불이익을 받은 두 직업의 공통점은 창업이 아니라 <Em>‘매우 바쁨’</Em>, 불이익이 없던 두 직업의
            공통점은 <Em>‘덜 바쁨’</Em>이다.
          </Callout>
        </Step>
      </div>

      {/* ── 오른쪽: 2×2 매트릭스 (행 단위로 등장 — 진입 stagger 를 짧게) ── */}
      <div className="flex min-h-0 flex-col">
        <Reveal kind="fade">
          <Eyebrow className="text-ink-3">그런데 · 직업을 하나씩 떼어 교사와 비교하면</Eyebrow>
        </Reveal>

        {/* 열 머리 */}
        <Reveal kind="fade" className={cn(ROW_GRID, "mt-3 pb-3")}>
          <div />
          {["예", "아니오"].map((c) => (
            <div key={c} className="text-center">
              <span className="inline-flex items-center gap-2 text-[21px] font-semibold text-ink-2">
                <span className="text-[18px] font-medium text-ink-3">창업가인가</span>
                <span className="h-4 w-px bg-line" />
                {c}
              </span>
            </div>
          ))}
        </Reveal>

        <div className="flex min-h-0 flex-1 flex-col">
          {/* 1행 — 매우 바쁨 */}
          <Reveal kind="pop" className={cn(ROW_GRID, "min-h-0 flex-1")}>
            <RowHead label="매우 바쁨" active={lineShown} />
            <MatrixCell cell={BUSY_ROW[0]} />
            <MatrixCell cell={BUSY_ROW[1]} />
          </Reveal>

          {/* 경계선 (단계 2) */}
          <div className="relative flex h-[44px] shrink-0 items-center">
            <motion.span
              aria-hidden
              initial={false}
              animate={{ scaleX: lineShown ? 1 : 0 }}
              transition={{ duration: 0.8, ease: EASE_OUT }}
              className="absolute inset-x-0 top-1/2 h-[3px] origin-left -translate-y-1/2 rounded-full bg-tone"
            />
            <motion.span
              initial={false}
              animate={{ opacity: lineShown ? 1 : 0, y: lineShown ? 0 : 6 }}
              transition={{ duration: 0.5, ease: EASE_OUT, delay: lineShown ? 0.45 : 0 }}
              className="relative ml-[156px] rounded-full bg-tone px-4 py-1 text-[18px] font-semibold text-white"
            >
              불이익의 경계선 — ‘매우 바쁨’과 ‘덜 바쁨’ 사이
            </motion.span>
          </div>

          {/* 2행 — 덜 바쁨 */}
          <Reveal kind="pop" className={cn(ROW_GRID, "min-h-0 flex-1")}>
            <RowHead label="덜 바쁨" active={false} />
            <MatrixCell cell={CALM_ROW[0]} />
            <MatrixCell cell={CALM_ROW[1]} />
          </Reveal>
        </div>
      </div>
    </SlideFrame>
  );
}

export const busySlide: SlideDef = {
  id: "result-busy",
  section: "result",
  title: "‘창업가라서’가 아니라 ‘바빠 보여서’?",
  steps: 2,
  Component: Busy,
};
