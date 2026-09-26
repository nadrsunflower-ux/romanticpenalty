"use client";

import { useId, type ReactNode } from "react";
import { motion, type Variants } from "framer-motion";
import { ArrowDown, ArrowRight, Check, Heart, Rocket, X } from "lucide-react";
import type { SlideDef } from "@/components/deck/types";
import {
  Chip,
  Em,
  Eyebrow,
  Panel,
  Reveal,
  SlideFrame,
  Step,
  useStepShown,
} from "@/components/slide/primitives";
import { EASE_OUT } from "@/components/slide/motion";
import { cn } from "@/lib/utils";

/* 화살표가 슬라이드 진입 때 그려지는 효과 (enter → center) */
const draw = (delay: number): Variants => ({
  enter: { pathLength: 0, opacity: 0 },
  center: { pathLength: 1, opacity: 1, transition: { duration: 0.9, ease: EASE_OUT, delay } },
});

/* 점선은 pathLength 를 쓰면 대시가 사라지므로 투명도만 */
const fadeIn = (delay: number): Variants => ({
  enter: { opacity: 0 },
  center: { opacity: 1, transition: { duration: 0.6, ease: EASE_OUT, delay } },
});

/* 교란 구조 다이어그램 — 좌측 열(796px) 기준 좌표 */
const W = 796;
const H = 386;

function ConfoundDiagram() {
  const asked = useStepShown(1);
  // 다른 슬라이드의 SVG 와 id 가 겹치지 않도록 고유 id 사용
  const arrowId = `arrow-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

  return (
    <div className="relative" style={{ width: W, height: H }}>
      {/* 화살표 (성격·가치관 → 두 결과) */}
      <svg className="absolute inset-0" width={W} height={H} viewBox={`0 0 ${W} ${H}`} aria-hidden>
        <defs>
          <marker id={arrowId} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="var(--tone)" />
          </marker>
        </defs>
        <motion.path
          d="M300 118 C 250 170, 190 190, 168 244"
          fill="none"
          stroke="var(--tone)"
          strokeWidth={3}
          strokeLinecap="round"
          markerEnd={`url(#${arrowId})`}
          variants={draw(0.55)}
        />
        <motion.path
          d="M496 118 C 546 170, 606 190, 628 244"
          fill="none"
          stroke="var(--tone)"
          strokeWidth={3}
          strokeLinecap="round"
          markerEnd={`url(#${arrowId})`}
          variants={draw(0.7)}
        />
        {/* 창업가 ↔ 연애 결과 사이의 의심스러운 연결 */}
        <motion.path
          d="M334 316 L 462 316"
          fill="none"
          stroke="#86838f"
          strokeWidth={2.5}
          strokeDasharray="7 8"
          variants={fadeIn(0.95)}
        />
      </svg>

      {/* 위 — 성격과 가치관 */}
      <Reveal kind="pop" className="absolute top-0 left-[168px] w-[460px]">
        <div className="rounded-[22px] bg-tone-soft/45 px-7 py-5 text-center ring-1 ring-tone/25">
          <p className="text-[28px] leading-[1.3] font-bold tracking-[-0.03em] text-tone-ink">성격과 가치관</p>
          <p className="mt-1.5 text-[20px] leading-[1.45] text-ink-2">도전적이거나 독립적인 성격, 특정한 가치관</p>
        </div>
      </Reveal>

      {/* 아래 왼쪽 — 창업 선택 */}
      <Reveal kind="pop" className="absolute top-[250px] left-0 w-[330px]">
        <Node icon={<Rocket strokeWidth={1.8} />} title="창업을 택한다" sub="이런 사람이 더 많이 택한다" />
      </Reveal>

      {/* 아래 오른쪽 — 연애에서 보이는 모습 */}
      <Reveal kind="pop" className="absolute top-[250px] left-[466px] w-[330px]">
        <Node icon={<Heart strokeWidth={1.8} />} title="연애에서 보이는 모습" sub="여기에도 똑같이 영향을 준다" />
      </Reveal>

      {/* 가운데 물음표 */}
      <Reveal kind="pop" className="absolute top-[290px] left-[372px]">
        <span
          className={cn(
            "grid size-[52px] place-items-center rounded-full font-serif text-[32px] leading-none italic ring-1 transition-colors duration-500",
            asked ? "bg-ink text-paper ring-ink" : "bg-surface text-ink-2 ring-line",
          )}
        >
          ?
        </span>
      </Reveal>
    </div>
  );
}

function Node({ icon, title, sub }: { icon: ReactNode; title: string; sub?: string }) {
  return (
    <div className="flex h-[132px] flex-col justify-center rounded-[20px] bg-surface px-6 ring-1 ring-line">
      <div className="flex items-center gap-3.5">
        <span className="grid size-[44px] shrink-0 place-items-center rounded-[12px] bg-paper-2 text-ink-2 [&_svg]:size-[23px]">
          {icon}
        </span>
        <span className="text-[24px] leading-[1.3] font-bold tracking-[-0.03em] text-ink">{title}</span>
      </div>
      {sub ? <p className="mt-3 text-[20px] leading-[1.4] text-ink-2">{sub}</p> : null}
    </div>
  );
}

function WhyExperiment() {
  return (
    <SlideFrame
      section="method"
      kicker="3.1 그냥 현실을 관찰하면 안 되는 이유"
      title={
        <>
          여성은 제비뽑기로 창업가가 되지 않는다
        </>
      }
      lead="가장 쉬운 방법은 현실의 여성 창업가와 비창업가를 모아 비교하는 것이지만 치명적인 문제가 있다."
      bodyClassName="grid grid-cols-[796px_1fr] gap-14"
    >
      {/* 왼쪽 — 왜 비교가 안 되는가 */}
      <div className="flex flex-col">
        <ConfoundDiagram />

        <Step at={1} className="mt-5">
          <div className="rounded-[18px] bg-surface px-7 pt-3 pb-3.5 ring-1 ring-line">
            <p className="text-[19px] font-medium text-ink-3">답장이 적은 이유가…</p>
            <div className="mt-1.5 flex items-center gap-4">
              <span className="text-[22px] font-semibold tracking-[-0.02em] text-ink">“창업가라서?”</span>
              <span className="text-[20px] text-ink-3">아니면</span>
              <span className="text-[22px] font-semibold tracking-[-0.02em] text-ink">“원래 그런 성격이라서?”</span>
              <ArrowRight className="size-[24px] shrink-0 text-ink-3" strokeWidth={2} />
              <span className="rounded-full bg-ink px-4 py-1.5 text-[20px] font-semibold text-paper">구분할 수 없다</span>
            </div>
          </div>
        </Step>
      </div>

      {/* 오른쪽 — 해법: 무작위 */}
      <Step at={2} className="h-full">
        <Panel className="flex h-full flex-col justify-center px-9 py-8">
          <Eyebrow>그렇다면 어떻게?</Eyebrow>

          {/* 이상적이지만 불가능 */}
          <div className="mt-5 flex gap-4">
            <span className="grid size-[40px] shrink-0 place-items-center rounded-full bg-paper-2 text-ink-3">
              <X className="size-[21px]" strokeWidth={2.4} />
            </span>
            <div>
              <p className="flex items-center gap-2.5 text-[19px] font-semibold text-ink-3">
                이상적인 방법
                <Chip variant="outline" className="text-ink-3">
                  현실에서는 당연히 불가능
                </Chip>
              </p>
              <p className="mt-1.5 text-[22px] leading-[1.5] text-ink-2">
                여성들을 제비뽑기하듯 <strong className="font-semibold text-ink">무작위</strong>로 창업가와 비창업가로
                나눠 보기
              </p>
            </div>
          </div>

          <ArrowDown className="my-3 ml-[9px] size-[22px] text-ink-3/70" strokeWidth={2} />

          {/* 가능한 방법 */}
          <div className="flex gap-4 rounded-[16px] bg-tone-soft/35 py-4 pr-4 pl-3 ring-1 ring-tone/20">
            <span className="grid size-[40px] shrink-0 place-items-center rounded-full bg-tone text-white">
              <Check className="size-[21px]" strokeWidth={2.6} />
            </span>
            <div>
              <p className="text-[19px] font-semibold text-tone-ink">가능한 방법</p>
              <p className="mt-1 text-[24px] leading-[1.45] font-semibold tracking-[-0.02em] text-ink">
                가짜 프로필의 <Em>직업란만</Em> 무작위로 바꾸기
              </p>
            </div>
          </div>

          <p className="mt-6 text-[24px] font-bold tracking-[-0.02em] text-ink">
            그래서 연구진은 <span className="text-[27px] text-c-green">실험</span>을 택했다.
          </p>

        </Panel>
      </Step>
    </SlideFrame>
  );
}

export const whyExperimentSlide: SlideDef = {
  id: "method-why-experiment",
  section: "method",
  title: "왜 관찰 대신 실험인가",
  steps: 2,
  Component: WhyExperiment,
};
