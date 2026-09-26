"use client";

import type { LucideIcon } from "lucide-react";
import {
  ArrowDown,
  Flower2,
  MapPin,
  Mars,
  MessageCircle,
  Rocket,
  Scale,
  ScanSearch,
  Venus,
} from "lucide-react";
import type { SlideDef } from "@/components/deck/types";
import { Chip, Mark, NumberDot, Reveal, SlideFrame, Step } from "@/components/slide/primitives";
import { cn } from "@/lib/utils";

/* ②③④ — "누구에게, 어떤 창업에서?" 경계 조건. 강조(focus) = 불이익이 나타난 쪽 */
type Cell = { icon: LucideIcon; label: string; result: string; focus?: boolean };
type Boundary = { n: number; title: string; cells: [Cell, Cell]; note: string };

const BOUNDARIES: Boundary[] = [
  {
    n: 2,
    title: "남성에게는 나타나지 않는다",
    cells: [
      { icon: Mars, label: "남성 창업가", result: "나타나지 않음" },
      { icon: Venus, label: "여성 창업가", result: "불이익", focus: true },
    ],
    note: "→ 직업 인기 문제가 아니라, 여성에게만 적용되는 잣대",
  },
  {
    n: 3,
    title: "모든 창업이 그런 건 아니다",
    cells: [
      { icon: Rocket, label: "성장지향 창업", result: "불이익이 몰림", focus: true },
      { icon: Flower2, label: "꽃집 같은 생활형 창업", result: "나타나지 않음" },
    ],
    note: "→ 불이익은 회사를 키우려는 창업에 몰려 있었다",
  },
  {
    n: 4,
    title: "모든 남성이 그런 것도 아니다",
    cells: [
      { icon: Rocket, label: "창업가 남성", result: "오히려 선호" },
      { icon: Scale, label: "성역할 태도 점수 높은 남성", result: "불이익 더 큼", focus: true },
    ],
    note: "단, 이런 창업가 남성은 드물다",
  },
];

function Findings() {
  return (
    <SlideFrame
      section="conclusion"
      kicker="5.1 이 연구가 보여준 것"
      title={
        <>
          <Mark>연애의 첫 문턱</Mark>에서, 여성 창업가는 불이익을 받았다
        </>
      }
      bodyClassName="flex flex-col gap-[14px]"
    >
      {/* 범위 — 이걸 빼고 읽으면 전부 과장 */}
      <Reveal>
        <div className="flex h-[54px] items-center gap-5 rounded-[16px] bg-surface px-6 ring-1 ring-line">
          <span className="flex items-center gap-2.5 text-[19px] font-semibold text-tone-ink">
            <ScanSearch className="size-[22px]" strokeWidth={2} />
            읽기 전에 · 범위
          </span>
          <span className="h-6 w-px bg-line" />
          <span className="flex items-center gap-2 text-[21px] font-medium text-ink">
            <MapPin className="size-[20px] text-ink-3" strokeWidth={2} />
            중국의 한 데이팅 사이트
          </span>
          <span className="text-ink-3">·</span>
          <span className="flex items-center gap-2 text-[21px] font-medium text-ink">
            <MessageCircle className="size-[20px] text-ink-3" strokeWidth={2} />
            첫 메시지에 답장이 오는지
          </span>
          <span className="ml-auto text-[20px] text-ink-2">
            이 범위를 빼고 읽으면 <strong className="font-semibold text-tone-ink">전부 과장</strong>이 된다
          </span>
        </div>
      </Reveal>

      {/* ① 핵심 결과 */}
      <Reveal>
        <div className="flex items-center gap-6 rounded-[20px] bg-tone px-8 py-[18px] text-white shadow-[0_22px_40px_-24px_var(--tone)]">
          <span className="inline-grid size-[44px] shrink-0 place-items-center rounded-full bg-white/20 font-serif text-[24px] leading-none italic">
            1
          </span>
          <p className="text-[28px] leading-[1.3] font-bold tracking-[-0.03em]">
            여성 창업가에게는 사업 바깥에서도 불이익이 있었다
          </p>
          <span className="h-10 w-px bg-white/30" />
          <p className="flex-1 text-[22px] leading-[1.45] text-white/90">
            연애를 시작하는 첫 문턱에서 답장받을 확률이 낮아졌다
          </p>
          <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-white/15 py-1.5 pr-3 pl-3.5 text-[19px] font-semibold">
            <MessageCircle className="size-[19px]" strokeWidth={2.2} />
            답장
            <ArrowDown className="size-[19px]" strokeWidth={2.6} />
          </span>
        </div>
      </Reveal>

      {/* ②③④ 경계 조건 (→ 1) */}
      <Step at={1} className="grid min-h-0 flex-1 grid-cols-3 gap-4">
        {BOUNDARIES.map((b) => (
          <div
            key={b.n}
            className="flex flex-col rounded-[20px] bg-surface px-6 pt-5 pb-5 shadow-[0_1px_0_rgba(23,22,28,0.04),0_12px_32px_-18px_rgba(23,22,28,0.18)] ring-1 ring-line"
          >
            <div className="flex items-center gap-3.5">
              <NumberDot n={b.n} className="size-[38px] text-[21px]" />
              <p className="text-[24px] font-bold tracking-[-0.03em] text-ink">{b.title}</p>
            </div>
            <div className="mt-4 flex flex-col gap-2">
              {b.cells.map((c) => (
                <div
                  key={c.label}
                  className={cn(
                    "flex h-[52px] items-center gap-2.5 rounded-[13px] px-4",
                    c.focus ? "bg-tone-soft/45 ring-1 ring-tone/25" : "bg-paper-2/80",
                  )}
                >
                  <c.icon
                    className={cn("size-[19px] shrink-0", c.focus ? "text-tone-ink" : "text-ink-3")}
                    strokeWidth={2}
                  />
                  <span className="text-[20px] tracking-[-0.02em] text-ink-2">{c.label}</span>
                  <span
                    className={cn(
                      "ml-auto text-[21px] font-bold tracking-[-0.02em] whitespace-nowrap",
                      c.focus ? "text-tone-ink" : "text-ink-3",
                    )}
                  >
                    {c.result}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-auto min-h-[74px] border-t border-line/80 pt-3 text-[20px] leading-[1.5] text-balance text-ink-2">
              {b.note}
            </p>
          </div>
        ))}
      </Step>

      {/* ⑤ 이유 — 잠정적 해석 (→ 2) */}
      <Step at={2}>
        <div className="flex items-center gap-6 rounded-[20px] border-2 border-dashed border-tone/35 bg-tone-soft/25 px-8 py-4">
          <NumberDot n={5} />
          <p className="w-[300px] shrink-0 text-[24px] leading-[1.35] font-bold tracking-[-0.03em] text-ink">
            이유는 능력 의심이
            <br />
            아닌 것으로 보인다
          </p>
          <div className="flex flex-1 items-center gap-3">
            <span className="rounded-[12px] bg-surface px-4 py-2.5 text-[21px] text-ink-2 ring-1 ring-line">
              능력은 <strong className="font-semibold text-ink">인정</strong>하면서
            </span>
            <span className="text-[22px] text-ink-3">→</span>
            <span className="rounded-[12px] bg-surface px-4 py-2.5 text-[21px] text-ink-2 ring-1 ring-tone/30">
              <strong className="font-semibold text-tone-ink">“다정하지 않을 것 같다”</strong>고 넘겨짚는 쪽
            </span>
          </div>
          <Chip variant="outline" className="shrink-0 border-tone/40 text-tone-ink">
            잠정적 해석 · 논문이 확정한 것 아님
          </Chip>
        </div>
      </Step>
    </SlideFrame>
  );
}

export const findingsSlide: SlideDef = {
  id: "conclusion-findings",
  section: "conclusion",
  title: "이 연구가 보여준 것",
  steps: 2,
  Component: Findings,
};
