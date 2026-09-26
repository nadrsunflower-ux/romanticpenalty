"use client";

import type { ReactNode } from "react";
import { Briefcase, Heart, Search, TriangleAlert, type LucideIcon } from "lucide-react";
import type { SlideDef } from "@/components/deck/types";
import { Chip, Mark, Panel, Reveal, SlideFrame, Step } from "@/components/slide/primitives";
import { cn } from "@/lib/utils";

type Lens = {
  tag: string;
  icon: LucideIcon;
  heading: string;
  standard: string;
  flaw: string;
  guess: ReactNode;
  outcome: ReactNode;
  badge: ReactNode;
  focus?: boolean;
};

/* 흠이 되는 항목 — (가)는 중립 회색 바탕, (나)는 섹션 색 형광펜 */
const WORK: Lens = {
  tag: "가",
  icon: Briefcase,
  heading: "일터에서 볼 때",
  standard: "‘창업가다움’",
  flaw: "여자라는 점",
  guess: (
    <>
      “여자라서 창업가로서{" "}
      <span className="box-clone rounded-[4px] bg-ink/10 px-[0.12em] font-semibold text-ink">능력</span>이 부족할 것
      같다”
    </>
  ),
  outcome: "투자를 못 받고, 직원을 못 구한다",
  badge: <Chip variant="outline">이미 많이 연구됨</Chip>,
};

const LOVE: Lens = {
  tag: "나",
  icon: Heart,
  heading: "연애 상대로 볼 때",
  standard: "‘여자다움’",
  flaw: "창업가라는 점",
  guess: (
    <>
      “창업가라서 여자로서{" "}
      <Mark variant="block" className="font-semibold text-tone-ink">
        다정함
      </Mark>
      이 부족할 것 같다”
    </>
  ),
  outcome: (
    <>
      연애 상대로서 불리할 것 — 이것이 <strong className="font-semibold text-tone-ink">첫 번째 이유</strong>
    </>
  ),
  badge: <Chip variant="solid">이 논문이 새로 주목</Chip>,
  focus: true,
};

function LensSlide() {
  return (
    <SlideFrame
      section="theory"
      kicker="2.1 첫 번째 이유 — 무엇을 기준으로 보느냐"
      title={
        <>
          충돌은 하나, <Mark>보는 기준</Mark>에 따라 흠이 되는 쪽이 달라진다
        </>
      }
      bodyClassName="flex flex-col"
    >
      <div className="grid grid-cols-2 gap-8">
        <Reveal className="h-full">
          <LensCard lens={WORK} />
        </Reveal>
        <Step at={1} className="h-full">
          <LensCard lens={LOVE} />
        </Step>
      </div>

      <Step at={2} className="mt-6 grid grid-cols-2 gap-8">
        <div className="col-start-2 flex items-start gap-5 rounded-[18px] bg-surface/70 px-8 py-6 ring-1 ring-line">
          <span className="mt-1 grid size-[44px] shrink-0 place-items-center rounded-full bg-tone-soft/80 text-tone-ink">
            <Search className="size-[22px]" strokeWidth={2.2} />
          </span>
          <div>
            <p className="text-[21px] font-semibold text-ink">그렇다면 다정함이 왜 연애에서 문제가 될까?</p>
            <p className="mt-1.5 text-[22px] leading-[1.6] text-pretty text-ink-2">
              짝 고르기 심리 연구에 따르면, 오래 갈 관계를 생각할 때 사람들은 남녀 모두{" "}
              <strong className="font-semibold text-ink">다정함·배려심</strong>을 특히 중요하게 본다.
            </p>
          </div>
        </div>
      </Step>
    </SlideFrame>
  );
}

function LensCard({ lens }: { lens: Lens }) {
  const { icon: Icon, focus } = lens;
  return (
    <Panel
      className={cn(
        "flex h-full flex-col px-9 pt-7 pb-7",
        focus && "shadow-[0_28px_56px_-30px_var(--tone)] ring-2 ring-tone/55",
      )}
    >
      {/* 머리 */}
      <div className="flex items-center gap-4">
        <span
          className={cn(
            "grid size-[52px] shrink-0 place-items-center rounded-[14px]",
            focus ? "bg-tone-soft text-tone-ink" : "bg-paper-2 text-ink-2",
          )}
        >
          <Icon className="size-[26px]" strokeWidth={1.9} />
        </span>
        <p className="text-[30px] font-bold tracking-[-0.03em] text-ink">
          <span className={cn("mr-2.5 font-semibold", focus ? "text-tone" : "text-ink-3")}>({lens.tag})</span>
          {lens.heading}
        </p>
        <span className="ml-auto">{lens.badge}</span>
      </div>

      {/* 기준 → 흠 → 짐작 */}
      <dl className="mt-7 grid grid-cols-[112px_1fr] items-baseline gap-x-5 gap-y-5">
        <dt className="text-[19px] font-semibold text-ink-3">기준</dt>
        <dd className={cn("text-[30px] leading-[1.25] font-bold tracking-[-0.03em]", focus ? "text-tone-ink" : "text-ink")}>
          {lens.standard}
        </dd>

        <dt className="text-[19px] font-semibold text-ink-3">흠이 되는 것</dt>
        <dd>
          <span className="inline-flex items-center gap-2 rounded-full bg-ink/85 py-1 pr-4 pl-3 text-[22px] font-semibold tracking-[-0.02em] text-white">
            <TriangleAlert className="size-[19px] text-[#ffd84d]" strokeWidth={2.2} />
            {lens.flaw}
          </span>
        </dd>

        <dt className="text-[19px] font-semibold text-ink-3">이런 짐작</dt>
        <dd className="text-[24px] leading-[1.5] font-medium tracking-[-0.02em] text-ink">{lens.guess}</dd>
      </dl>
      <div className="min-h-6 flex-1" />

      <p className="mt-auto flex gap-2.5 border-t border-line pt-5 text-[22px] leading-[1.5] text-ink-2">
        <span className={cn("font-semibold", focus ? "text-tone" : "text-ink-3")}>→</span>
        <span>{lens.outcome}</span>
      </p>
    </Panel>
  );
}

export const lensSlide: SlideDef = {
  id: "theory-lens",
  section: "theory",
  title: "무엇을 기준으로 보느냐",
  steps: 2,
  Component: LensSlide,
};
