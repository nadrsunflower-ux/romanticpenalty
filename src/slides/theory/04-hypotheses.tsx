"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowRight, GraduationCap, Heart, Plus, Rocket, Stethoscope, type LucideIcon } from "lucide-react";
import type { SlideDef } from "@/components/deck/types";
import { Caption, Chip, Em, Eyebrow, Panel, Reveal, SlideFrame, Step, useStepShown } from "@/components/slide/primitives";
import { EASE_OUT } from "@/components/slide/motion";
import { cn } from "@/lib/utils";

const PAIRS: { icon: LucideIcon; job: string }[] = [
  { icon: Stethoscope, job: "의사" },
  { icon: GraduationCap, job: "교사" },
];

function Hypotheses() {
  const why = useStepShown(2);

  return (
    <SlideFrame
      section="theory"
      kicker="2.3 연구진이 세운 두 가지 예상"
      title={
        <>
          불이익은 있을 것, 단 상대도 창업가라면 줄어들 것
        </>
      }
      bodyClassName="grid grid-cols-[1fr_478px] gap-9"
    >
      {/* ── 왼쪽: 두 가지 예상 ─────────────────────── */}
      <div className="flex flex-col">
        <Reveal className="flex items-center gap-3">
          <Chip variant="outline" className="bg-surface text-[18px]">
            성격에 대한 넘겨짚기
          </Chip>
          <Plus className="size-[20px] text-ink-3" strokeWidth={2.4} />
          <Chip variant="outline" className="bg-surface text-[18px]">
            시간에 대한 걱정
          </Chip>
          <ArrowRight className="ml-1 size-[22px] text-tone" strokeWidth={2.4} />
          <span className="text-[20px] text-ink-3">두 이유를 합쳐 이렇게 예상했다</span>
        </Reveal>

        <Reveal className="mt-7">
          <HypCard n="1">
            여성 창업가는 연애를 시작할 때 <Em className="font-bold">불이익</Em>을 받을 것이다.
          </HypCard>
        </Reveal>

        <Step at={1} className="mt-7">
          <HypCard n="2" focus>
            단, 상대 남성이 <Em className="font-bold">본인도 창업가</Em>라면 그 불이익이 <Em className="font-bold">줄어들</Em> 것이다.
          </HypCard>
        </Step>

      </div>

      {/* ── 오른쪽: 예상 2의 근거 (단계 2) ─────────────── */}
      <Step at={2} className="h-full">
        <Panel className="flex h-full flex-col px-8 pt-8 pb-8">
          <Eyebrow>예상 2는 왜 나왔을까?</Eyebrow>
          <p className="mt-3 text-[28px] leading-[1.35] font-bold tracking-[-0.03em] text-balance text-ink">
            사람들은 자기와 비슷한 사람에게 끌리는 경향이 있다
          </p>

          <div className="mt-5 flex flex-col gap-2.5">
            {PAIRS.map(({ icon: Icon, job }) => (
              <div
                key={job}
                className="flex items-center justify-center gap-4 rounded-[14px] bg-paper-2/70 px-5 py-3 text-[25px] font-semibold tracking-[-0.02em] whitespace-nowrap text-ink"
              >
                <Icon className="size-[24px] text-ink-3" strokeWidth={1.9} />
                {job}
                <Heart className="size-[20px] fill-tone text-tone" strokeWidth={0} />
                {job}
                <Icon className="size-[24px] text-ink-3" strokeWidth={1.9} />
              </div>
            ))}
          </div>
          <Caption className="mt-2.5 text-center">의사는 의사와, 교사는 교사와 결혼하는 경우가 많다</Caption>

          <div className="mt-auto border-t border-line pt-6">
            <p className="text-[22px] leading-[1.55] text-pretty text-ink-2">
              <strong className="font-semibold text-ink">창업가 남성</strong>이라면 창업가 여성의{" "}
              <strong className="font-semibold whitespace-nowrap text-ink">바쁨과 야심</strong>을 흠이 아니라 공통점으로 볼 수 있다.
            </p>
            <div className="mt-4 flex items-center justify-center gap-4 rounded-[16px] bg-tone-soft/35 py-3.5">
              <span className="relative inline-flex rounded-full bg-surface px-5 py-1 text-[24px] font-semibold text-ink-3 ring-1 ring-line">
                흠
                <motion.span
                  aria-hidden
                  initial={false}
                  animate={{ scaleX: why ? 1 : 0 }}
                  transition={{ duration: 0.45, ease: EASE_OUT, delay: why ? 0.7 : 0 }}
                  className="absolute top-1/2 right-3 left-3 h-[2.5px] origin-left rounded-full bg-ink-2"
                />
              </span>
              <ArrowRight className="size-[26px] text-tone" strokeWidth={2.4} />
              <motion.span
                initial={false}
                animate={why ? { scale: 1, opacity: 1 } : { scale: 0.7, opacity: 0 }}
                transition={{ duration: 0.5, ease: EASE_OUT, delay: why ? 1.05 : 0 }}
                className="inline-flex items-center gap-2 rounded-full bg-tone px-5 py-1 text-[24px] font-bold text-white shadow-[0_12px_24px_-12px_var(--tone)]"
              >
                <Rocket className="size-[20px]" strokeWidth={2.2} />
                공통점
              </motion.span>
            </div>
          </div>
        </Panel>
      </Step>
    </SlideFrame>
  );
}

function HypCard({ n, children, focus }: { n: string; children: ReactNode; focus?: boolean }) {
  return (
    <Panel
      className={cn(
        "flex items-center gap-6 px-8 py-9",
        focus && "shadow-[0_28px_56px_-30px_var(--tone)] ring-2 ring-tone/55",
      )}
    >
      <div className="flex w-[64px] shrink-0 flex-col items-center">
        <span className="text-[19px] font-semibold text-ink-3">예상</span>
        <span className="font-serif text-[84px] leading-[0.95] text-tone italic">{n}</span>
      </div>
      <span className="h-[92px] w-px shrink-0 bg-line" />
      <p className="text-[30px] leading-[1.42] font-bold tracking-[-0.03em] whitespace-nowrap text-ink">{children}</p>
    </Panel>
  );
}

export const hypothesesSlide: SlideDef = {
  id: "theory-hypotheses",
  section: "theory",
  title: "연구진이 세운 두 가지 예상",
  steps: 2,
  Component: Hypotheses,
};
