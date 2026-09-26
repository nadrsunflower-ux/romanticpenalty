"use client";

import { ArrowRight, Shuffle, ThumbsDown, ThumbsUp, Users } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import type { SlideDef } from "@/components/deck/types";
import {
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

/* 단점 칸에 ‘드세다·군림한다’가 나온 횟수 (해설 4.4) */
const COUNTS = [
  { label: "창업가 프로필", n: 248, focus: true },
  { label: "교사 프로필", n: 112, focus: false },
];
const MAX = 248;

/** 막대 성장 — 진입(enter/center)과 빌드(hidden/shown) 이름을 모두 정의 */
const grow = (w: string, delay: number): Variants => ({
  enter: { width: "0%" },
  hidden: { width: "0%" },
  center: { width: w, transition: { duration: 1, ease: EASE_OUT, delay } },
  shown: { width: w, transition: { duration: 1, ease: EASE_OUT, delay } },
});

function AttitudeWedge() {
  const shown = useStepShown(1);
  return (
    <div className="relative mt-5">
      {/* 쐐기 — 점수가 높을수록 깎아내림이 커진다 (개념도). 왼쪽 끝도 0이 아니라 ‘작다’ */}
      <div className="relative h-[118px]">
        <motion.div
          aria-hidden
          initial={false}
          animate={{ clipPath: shown ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)" }}
          transition={{ duration: 1.1, ease: EASE_OUT, delay: shown ? 0.3 : 0 }}
          className="absolute inset-0"
          style={{
            clipPath: "inset(0 100% 0 0)",
          }}
        >
          <svg viewBox="0 0 440 118" preserveAspectRatio="none" className="size-full">
            <defs>
              <linearGradient id="wedge-fill" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0" stopColor="var(--tone-soft)" stopOpacity="0.55" />
                <stop offset="1" stopColor="var(--tone)" stopOpacity="0.95" />
              </linearGradient>
            </defs>
            <polygon points="0,100 440,6 440,116 0,116" fill="url(#wedge-fill)" />
          </svg>
        </motion.div>
        <span className="absolute bottom-[36px] left-1 text-[19px] font-semibold text-ink-2">차이가 작다</span>
        <span className="absolute top-[22px] right-[10px] rounded-full bg-surface/95 px-3 py-0.5 text-[19px] font-bold text-tone-ink">
          더 크게 깎아내렸다
        </span>
      </div>
      {/* 가로축 */}
      <div className="mt-2 flex items-center gap-2 text-[19px] text-ink-3">
        <span>점수 낮음</span>
        <span className="relative h-[2px] flex-1 bg-ink-3/50">
          <ArrowRight className="absolute top-1/2 -right-2 size-[18px] -translate-y-1/2 text-ink-3" strokeWidth={2.4} />
        </span>
        <span className="pl-2 font-semibold text-ink-2">점수 높음</span>
      </div>
      <p className="mt-1 text-center text-[19px] text-ink-3">성역할 태도 점수 (개념도 — 크기는 수치가 아님)</p>
    </div>
  );
}

function Voices() {
  return (
    <SlideFrame
      section="result"
      kicker="4.4 남성들이 직접 쓴 답변 · 성역할 태도"
      title={
        <>
          장점엔 ‘독립적’, 단점엔 <Mark>‘드세다·군림한다’</Mark>
        </>
      }
      bodyClassName="grid grid-cols-[1fr_500px] gap-10"
    >
      {/* ── 왼쪽: 직접 쓴 답변 ─────────────────────── */}
      <Reveal className="h-full">
        <Panel className="flex h-full flex-col px-10 py-8">
          <Eyebrow>남성들이 직접 쓴 답변 · 창업가 프로필</Eyebrow>

          {/* 장점 */}
          <div className="mt-5 flex items-center gap-4">
            <span className="flex w-[92px] shrink-0 items-center gap-2 text-[21px] font-semibold text-ink-2">
              <ThumbsUp className="size-[21px]" strokeWidth={2} />
              장점
            </span>
            {["독립적인 성격", "성취한 커리어"].map((q) => (
              <span
                key={q}
                className="rounded-[14px] rounded-bl-[4px] bg-paper-2/80 px-5 py-2.5 text-[24px] font-semibold tracking-[-0.02em] text-ink ring-1 ring-line"
              >
                “{q}”
              </span>
            ))}
            <span className="text-[19px] text-ink-3">… 이렇게 적은 남성이 많았다</span>
          </div>

          {/* 단점 */}
          <div className="mt-7 flex items-center gap-4">
            <span className="flex w-[92px] shrink-0 items-center gap-2 text-[21px] font-semibold text-ink-2">
              <ThumbsDown className="size-[21px]" strokeWidth={2} />
              단점
            </span>
            <span className="rounded-[14px] rounded-bl-[4px] bg-tone-soft/55 px-5 py-2.5 text-[24px] font-bold tracking-[-0.02em] text-tone-ink ring-1 ring-tone/25">
              “드세다 · 군림한다”
            </span>
            <span className="text-[19px] text-ink-3">라는 표현이 나온 횟수</span>
          </div>

          <div className="mt-6 flex flex-col gap-4 pl-[108px]">
            {COUNTS.map((c, i) => (
              <div key={c.label} className="flex items-center gap-4">
                <span className={cn("w-[140px] shrink-0 text-[21px] font-semibold", c.focus ? "text-ink" : "text-ink-3")}>
                  {c.label}
                </span>
                <div className="relative h-[34px] flex-1">
                  <motion.div
                    variants={grow(`${(c.n / MAX) * 100}%`, 0.45 + i * 0.15)}
                    className={cn("absolute inset-y-0 left-0 rounded-[8px]", c.focus ? "bg-tone" : "bg-ink-3/35")}
                  />
                </div>
                <span className={cn("flex w-[104px] shrink-0 items-baseline gap-1", c.focus ? "text-tone-ink" : "text-ink-3")}>
                  <span className="font-serif text-[48px] leading-none tracking-[-0.02em] tabular">{c.n}</span>
                  <span className="text-[20px] font-semibold">번</span>
                </span>
              </div>
            ))}
          </div>

          <div className="mt-auto flex flex-col gap-2.5 border-t border-line pt-5">
            <p className="flex gap-3 text-[20px] leading-[1.55] text-ink-3">
              <span className="mt-[13px] size-[6px] shrink-0 rounded-full bg-ink-3/60" />
              <span>
                교사에게 쓰인 경우는 타고난 성격이 아니라 <strong className="font-semibold text-ink-2">교실에서 아이들을
                이끄는 역할</strong> 때문인 경우가 많았다고 연구진은 덧붙인다.
              </span>
            </p>
            <p className="flex gap-3 text-[20px] leading-[1.55] text-ink-3">
              <Shuffle className="mt-[5px] size-[19px] shrink-0 text-ink-3" strokeWidth={2.2} />
              <span>
                얼굴 사진 13장은 무작위로 배정 → 이 차이를 만든 것 역시 <strong className="font-semibold text-ink-2">직업 한 줄</strong>이다.
              </span>
            </p>
          </div>
        </Panel>
      </Reveal>

      {/* ── 오른쪽: 성역할 태도 ───────────────────── */}
      <Step at={1} className="h-full">
        <Panel className="flex h-full flex-col px-9 py-8">
          <Eyebrow>보는 사람에 따라 달랐다</Eyebrow>
          <p className="mt-3 flex items-center gap-2.5 text-[28px] font-bold tracking-[-0.03em] text-ink">
            <Users className="size-[26px] text-tone" strokeWidth={2} />
            성역할 태도와 함께 움직였다
          </p>
          <p className="mt-3 text-[21px] leading-[1.55] text-ink-2">
            ‘남자는 밖, 여자는 집’류 문장 <strong className="font-semibold text-ink">8개</strong>에 얼마나 동의하는지로
            점수를 매겼다.
          </p>
          <AttitudeWedge />
          <Step at={2} className="mt-auto">
            <div className="relative overflow-hidden rounded-[16px] bg-tone-soft/40 py-4 pr-6 pl-7 ring-1 ring-tone/20">
              <span className="absolute inset-y-0 left-0 w-[5px] bg-tone" />
              <p className="text-[22px] leading-[1.55] text-ink-2">
                ‘남성 일반’의 성질이 아니라, <strong className="font-semibold text-tone-ink">특정한 통념과 함께
                움직이는 반응</strong>에 가깝다.
              </p>
            </div>
          </Step>
        </Panel>
      </Step>
    </SlideFrame>
  );
}

export const voicesSlide: SlideDef = {
  id: "result-voices",
  section: "result",
  title: "직접 쓴 답변과 성역할 태도",
  steps: 2,
  Component: Voices,
};
