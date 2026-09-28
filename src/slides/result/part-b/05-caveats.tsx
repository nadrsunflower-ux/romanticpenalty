"use client";

import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { Blend, ClipboardList, Link2Off, Percent, Stethoscope, UsersRound, Zap } from "lucide-react";
import type { SlideDef } from "@/components/deck/types";
import { Chip, Eyebrow, Mark, NumberDot, Panel, Reveal, SlideFrame, Step } from "@/components/slide/primitives";

/* 연구진 스스로의 단서 — ‘왜’는 확정이 아니라 suggestive 인 이유 셋 (해설 4.4) */
const REASONS: { icon: LucideIcon; body: ReactNode }[] = [
  {
    icon: Blend,
    body: (
      <>
        인상 평가들이 <strong className="font-semibold text-ink">서로 얽혀 있어</strong> 하나만 깔끔하게 떼어낼 수
        없다.
      </>
    ),
  },
  {
    icon: Percent,
    body: (
      <>
        ‘30%·19%’ 같은 계산이 네 항목 중 <strong className="font-semibold text-ink">일부에서만</strong> 뚜렷하게
        나왔다.
      </>
    ),
  },
  {
    icon: UsersRound,
    body: (
      <>
        설문 응답자는 실제로 메시지를 받은 그 남성들이 아니라 <strong className="font-semibold text-ink">별도로
        모집한 다른 남성들</strong>이다.
      </>
    ),
  },
];

function EvidenceCard({
  tag,
  icon: Icon,
  children,
}: {
  tag: string;
  icon: LucideIcon;
  children: ReactNode;
}) {
  return (
    <Panel className="flex h-full items-start gap-5 px-8 py-7">
      <span className="grid size-[52px] shrink-0 place-items-center rounded-[14px] bg-paper-2 text-ink-2">
        <Icon className="size-[26px]" strokeWidth={1.8} />
      </span>
      <div className="flex min-w-0 flex-1 flex-col">
        <Chip variant="outline" className="self-start">
          {tag}
        </Chip>
        <p className="mt-2.5 text-[24px] leading-[1.5] font-medium tracking-[-0.02em] text-pretty text-ink">
          {children}
        </p>
      </div>
    </Panel>
  );
}

function Caveats() {
  return (
    <SlideFrame
      section="result"
      kicker="4.4 엇갈리는 대목과 연구진 스스로의 단서"
      title={
        <>
          ‘왜’에 대한 설명은 아직 <Mark>‘그럴 가능성이 있다’</Mark> 수준이다
        </>
      }
      bodyClassName="flex flex-col"
    >
      {/* ── 엇갈리는 대목 ─────────────────────────── */}
      <Reveal kind="fade" className="flex items-baseline gap-4">
        <Eyebrow>엇갈리는 대목</Eyebrow>
        <span className="text-[20px] text-ink-3">‘바빠 보여서’라는 설명을 두 실험이 서로 다르게 가리킨다</span>
      </Reveal>
      <div className="mt-4 grid grid-cols-[1fr_88px_1fr] items-stretch">
        <Reveal>
          <EvidenceCard tag="실험 2 · 현장실험" icon={Stethoscope}>
            간호사도 불이익을 받았다
            <br />→ <strong className="font-semibold text-tone-ink">‘바빠 보이는 게 문제’</strong>라는 쪽을 가리켰다.
          </EvidenceCard>
        </Reveal>
        <Reveal kind="pop" className="flex flex-col items-center justify-center gap-1.5">
          <span className="grid size-[52px] place-items-center rounded-full bg-ink text-paper">
            <Zap className="size-[24px]" strokeWidth={2} />
          </span>
          <span className="text-[19px] font-semibold text-ink-2">엇갈림</span>
        </Reveal>
        <Reveal>
          <EvidenceCard tag="실험 3 · 설문" icon={ClipboardList}>
            그런데 <strong className="font-semibold text-tone-ink">‘바빠 보인다’는 인상 자체</strong>는
            <br />
            답장 의향과 이어지지 않았다.
          </EvidenceCard>
        </Reveal>
      </div>

      {/* 연구진의 판단 (단계 1) */}
      <Step at={1} className="mt-5 flex justify-center">
        <div className="inline-flex items-center gap-4 rounded-full bg-surface py-2.5 pr-7 pl-3 ring-1 ring-line">
          <span className="grid size-[38px] place-items-center rounded-full bg-tone-soft/70 text-tone-ink">
            <Link2Off className="size-[20px]" strokeWidth={2.2} />
          </span>
          <span className="text-[22px] text-ink-2">
            그래서 연구진도 <strong className="font-semibold text-ink">시간 부담 쪽 설명</strong>은
          </span>
          <span className="text-[24px] font-bold tracking-[-0.02em] text-tone-ink">“증거가 더 애매하다”</span>
          <span className="font-text-serif text-[22px] text-ink-3 italic">less conclusive</span>
        </div>
      </Step>

      {/* ── 연구진 스스로의 단서 (단계 2) ─────────────── */}
      <Step at={2} className="mt-auto">
        <div className="flex items-baseline gap-4">
          <Eyebrow>연구진 스스로의 단서</Eyebrow>
          <span className="text-[20px] text-ink-3">
            ‘왜’에 대한 설명은 확정된 사실이 아니라{" "}
            <strong className="font-semibold text-ink-2">“그럴 가능성이 있다”</strong>{" "}
            <span className="font-text-serif italic">(suggestive)</span> 수준
          </span>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-5">
          {REASONS.map(({ icon: Icon, body }, i) => (
            <div
              key={i}
              className="flex h-full items-start gap-5 rounded-[20px] bg-tone-soft/30 py-6 pr-7 pl-6 ring-1 ring-tone/20"
            >
              <div className="flex shrink-0 flex-col items-center gap-3">
                <NumberDot n={i + 1} solid />
                <Icon className="size-[24px] text-tone/60" strokeWidth={1.8} />
              </div>
              <p className="pt-1.5 text-[22px] leading-[1.55] text-pretty text-ink-2">{body}</p>
            </div>
          ))}
        </div>
      </Step>
    </SlideFrame>
  );
}

export const caveatsSlide: SlideDef = {
  id: "result-caveats",
  section: "result",
  title: "엇갈림과 연구진의 단서",
  steps: 2,
  Component: Caveats,
};
