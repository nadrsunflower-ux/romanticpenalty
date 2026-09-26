"use client";

import type { ReactNode } from "react";
import { motion, type Variants } from "framer-motion";
import { ArrowLeftRight, Briefcase, Check, Rocket, TriangleAlert, X } from "lucide-react";
import type { SlideDef } from "@/components/deck/types";
import {
  Callout,
  Eyebrow,
  Mark,
  Panel,
  Reveal,
  SigBadge,
  SlideFrame,
  Step,
  useStepShown,
} from "@/components/slide/primitives";
import { EASE_OUT } from "@/components/slide/motion";
import { cn } from "@/lib/utils";

/* ────────────────────────────────────────────────────────────
 * 실험 1 답장률 (해설 원문 4.1 표 — 논문이 "약 ○○%"로 적은 대략값)
 * ──────────────────────────────────────────────────────────── */
const PX = 7.5; // 1%포인트 = 7.5px
const CHART_H = 250;
const GRID = [10, 20, 30];

type Group = {
  sender: string;
  manager: number;
  founder: number;
  significant: boolean;
  verdict: string;
};

const GROUPS: Group[] = [
  { sender: "여성", manager: 25, founder: 19, significant: true, verdict: "약 6.7%포인트 낮음" },
  { sender: "남성", manager: 26, founder: 31, significant: false, verdict: "숫자는 높지만" },
];

/** 비교 기준 막대 — 슬라이드 진입 시 바닥에서 자란다 */
const grow = (h: number, delay: number): Variants => ({
  enter: { height: 0 },
  center: { height: h, transition: { duration: 0.95, ease: EASE_OUT, delay } },
});

function Value({ v, light }: { v: number; light?: boolean }) {
  return (
    <span
      className={cn(
        "flex items-baseline justify-center gap-1 pt-3 leading-none",
        light ? "text-white" : "text-ink",
      )}
    >
      <span className={cn("text-[19px] font-medium", light ? "text-white/80" : "text-ink-2")}>약</span>
      <span className="font-serif text-[46px] tracking-[-0.02em] tabular">{v}%</span>
    </span>
  );
}

function BarLabel({ icon, label, sub }: { icon: ReactNode; label: string; sub?: string }) {
  return (
    <div className="flex w-[128px] flex-col items-center text-center">
      <span className="flex items-center gap-1.5 text-[21px] font-semibold tracking-[-0.02em] text-ink [&_svg]:size-[20px]">
        {icon}
        {label}
      </span>
      <span className="mt-0.5 h-[26px] text-[19px] text-ink-3">{sub}</span>
    </div>
  );
}

function PairChart({ g, gi }: { g: Group; gi: number }) {
  const founderShown = useStepShown(1);
  const verdictShown = useStepShown(2);
  const isFemale = g.significant;
  const gap = (g.manager - g.founder) * PX; // 여성: 사라진 몫

  return (
    <div className="flex flex-col items-center">
      {/* 그룹 머리표 */}
      <Reveal kind="fade">
        <span
          className={cn(
            "inline-flex h-[36px] items-center rounded-full px-4 text-[19px] font-semibold tracking-[-0.01em]",
            isFemale ? "bg-tone-soft/70 text-tone-ink" : "bg-paper-2 text-ink-2",
          )}
        >
          보낸 사람 · {g.sender}
        </span>
      </Reveal>

      {/* 막대 쌍 */}
      <div className="relative mt-4 flex items-end gap-8" style={{ height: CHART_H }}>
        {/* 비교 기준선 (단계 2) — 관리자 막대 높이에서 창업가 막대까지 가로지른다 */}
        <motion.span
          aria-hidden
          initial={false}
          animate={{ opacity: verdictShown ? 1 : 0, scaleX: verdictShown ? 1 : 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="absolute left-0 w-full origin-left border-t-2 border-dashed border-ink/45"
          style={{ bottom: g.manager * PX }}
        />

        {/* 회사 관리자 (비교 기준, 중립색) */}
        <motion.div
          variants={grow(g.manager * PX, 0.35 + gi * 0.12)}
          className="relative w-[128px] overflow-hidden rounded-t-[14px] bg-ink/[0.16]"
        >
          <Value v={g.manager} />
        </motion.div>

        {/* 창업가 (섹션 색, 단계 1에서 자란다) */}
        <div className="relative w-[128px]" style={{ height: CHART_H }}>
          {/* 단계 0: 아직 모름 */}
          <motion.span
            aria-hidden
            initial={false}
            animate={{ opacity: founderShown ? 0 : 1 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-x-0 bottom-3 text-center font-serif text-[54px] leading-none text-ink-3/50 italic"
          >
            ?
          </motion.span>

          {/* 여성: 사라진 답장 몫 (단계 2) */}
          {isFemale ? (
            <motion.div
              initial={false}
              animate={{ opacity: verdictShown ? 1 : 0 }}
              transition={{ duration: 0.5, ease: EASE_OUT, delay: verdictShown ? 0.25 : 0 }}
              className="absolute inset-x-0 grid place-items-center rounded-t-[14px] border-2 border-b-0 border-dashed border-tone/70 bg-[repeating-linear-gradient(-45deg,transparent_0_7px,rgba(55,103,184,0.12)_7px_14px)]"
              style={{ bottom: g.founder * PX, height: gap }}
            >
              <span className="text-[21px] font-bold tracking-[-0.02em] text-tone-ink">−6.7%p</span>
            </motion.div>
          ) : null}

          <motion.div
            initial={false}
            animate={{ height: founderShown ? g.founder * PX : 0 }}
            transition={{ duration: 0.95, ease: EASE_OUT, delay: founderShown ? 0.1 + gi * 0.15 : 0 }}
            className={cn(
              "absolute inset-x-0 bottom-0 overflow-hidden rounded-t-[14px] transition-[background-color,box-shadow] duration-500",
              !isFemale && verdictShown
                ? "bg-tone-soft shadow-[inset_0_0_0_2px_rgba(55,103,184,0.45)]"
                : "bg-tone",
            )}
          >
            <Value v={g.founder} light={isFemale || !verdictShown} />
          </motion.div>
        </div>
      </div>

      {/* 바닥선 */}
      <span aria-hidden className="h-[2px] w-[312px] rounded-full bg-ink/30" />

      {/* 막대 이름 */}
      <Reveal kind="fade" className="mt-3 flex gap-8">
        <BarLabel icon={<Briefcase className="text-ink-3" />} label="회사 관리자" sub="비교 기준" />
        <BarLabel icon={<Rocket className="text-tone" />} label="창업가" />
      </Reveal>

      {/* 비교 결과 (단계 2) */}
      <Step at={2} className="mt-3 flex flex-col items-center gap-2">
        <span
          className={cn(
            "text-[22px] font-semibold tracking-[-0.02em]",
            isFemale ? "text-tone-ink" : "text-ink-2",
          )}
        >
          {g.verdict}
        </span>
        <SigBadge significant={g.significant} />
      </Step>
    </div>
  );
}

const SAME = ["같은 사진", "같은 나이", "같은 메시지"];

function FemaleOnly() {
  return (
    <SlideFrame
      section="result"
      kicker="4.1 여성에게만 생기는 불이익 · 실험 1 · 예상 1"
      title={
        <>
          직업란만 바꿨을 뿐인데, 손해는 <Mark>여성에게만</Mark> 생겼다
        </>
      }
      bodyClassName="grid grid-cols-[1fr_556px] gap-10"
    >
      {/* ── 왼쪽: 답장률 막대 차트 ─────────────────────────── */}
      <Reveal className="h-full">
        <Panel className="flex h-full flex-col px-10 pt-8 pb-7">
          <div className="flex items-baseline justify-between">
            <Eyebrow>답장률 · 메시지 100건 중 답장이 온 비율</Eyebrow>
          </div>

          <div className="relative mt-5 flex flex-1 justify-center gap-[36px] pl-[50px]">
            {/* 눈금선 — 행의 세로 가운데(선)가 정확히 값 위치에 오도록 절반만큼 내린다 */}
            <div aria-hidden className="pointer-events-none absolute inset-x-0" style={{ top: 52, height: CHART_H }}>
              {GRID.map((t) => (
                <div key={t} className="absolute inset-x-0 flex translate-y-1/2 items-center" style={{ bottom: t * PX }}>
                  <span className="w-[48px] text-[17px] text-ink-3/80 tabular">{t}%</span>
                  <span className="h-px flex-1 bg-ink/[0.07]" />
                </div>
              ))}
            </div>

            {GROUPS.map((g, gi) => (
              <PairChart key={g.sender} g={g} gi={gi} />
            ))}
          </div>
        </Panel>
      </Reveal>

      {/* ── 오른쪽: 실험 조건 + 주의 ───────────────────────── */}
      <div className="flex h-full min-h-0 flex-col justify-center gap-5">
        <Reveal>
          <Panel className="px-7 py-6">
            <div className="flex flex-wrap gap-2">
              {SAME.map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center gap-1.5 rounded-full bg-paper-2 px-3.5 py-1.5 text-[20px] font-medium text-ink-2"
                >
                  <Check className="size-[18px] text-ink-3" strokeWidth={2.4} />
                  {s}
                </span>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-4 rounded-[16px] bg-tone-soft/35 px-5 py-3.5 ring-1 ring-tone/20">
              <span className="text-[22px] font-bold tracking-[-0.02em] text-tone-ink">직업란만</span>
              <span className="flex items-center gap-2.5 text-[21px] font-semibold text-ink">
                회사 관리자
                <ArrowLeftRight className="size-[20px] text-tone" strokeWidth={2.2} />
                창업가
              </span>
            </div>
          </Panel>
        </Reveal>

        <Step at={3}>
          <Callout icon={<TriangleAlert />} title="주의 — 남성 창업가의 ‘31%’" className="py-6">
            <p className="text-[21px] whitespace-nowrap">
              남성 쪽 차이는 <strong className="font-semibold text-ink">우연으로도 충분히 생길 수 있는 크기</strong>였다.
            </p>
            <ul className="mt-3.5 flex flex-col gap-2">
              <li className="flex items-start gap-3">
                <span className="mt-[5px] grid size-[24px] shrink-0 place-items-center rounded-full bg-ink/10 text-ink-3">
                  <X className="size-[15px]" strokeWidth={3} />
                </span>
                <span className="text-ink-3 line-through decoration-ink-3/50">남성은 창업가라고 하면 이득을 본다</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-[5px] grid size-[24px] shrink-0 place-items-center rounded-full bg-tone text-white">
                  <Check className="size-[15px]" strokeWidth={3} />
                </span>
                <span className="font-semibold text-ink">여성에게 생긴 손해가 남성에게는 생기지 않았다</span>
              </li>
            </ul>
          </Callout>
        </Step>
      </div>
    </SlideFrame>
  );
}

export const femaleOnlySlide: SlideDef = {
  id: "result-female-only",
  section: "result",
  title: "여성에게만 생기는 불이익",
  steps: 3,
  Component: FemaleOnly,
};
