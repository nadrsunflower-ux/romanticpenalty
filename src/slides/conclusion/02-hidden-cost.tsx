"use client";

import { motion } from "framer-motion";
import { Check, HandCoins, HeartCrack, Plus, TrendingDown, TriangleAlert, Users, X } from "lucide-react";
import type { SlideDef } from "@/components/deck/types";
import {
  Callout,
  Chip,
  Eyebrow,
  Mark,
  Panel,
  Reveal,
  SlideFrame,
  Step,
  useStepShown,
} from "@/components/slide/primitives";
import { EASE_OUT } from "@/components/slide/motion";

/* 여성이 창업을 망설이는 이유로 "보통 떠올리는 것" */
const KNOWN = [
  { icon: HandCoins, label: "자금" },
  { icon: Users, label: "인맥" },
  { icon: TrendingDown, label: "실패 위험" },
];

/* 오른쪽 — ✕/✓ 한 쌍 (같은 문법으로 두 번: 원인 → 해결책) */
function Contrast({ label, no, yes }: { label: string; no: string; yes: string }) {
  return (
    <div>
      <Eyebrow>{label}</Eyebrow>
      <div className="mt-3 flex flex-col gap-2">
        <div className="flex h-[54px] items-center gap-4 rounded-[14px] bg-paper-2/70 px-5">
          <span className="grid size-[30px] shrink-0 place-items-center rounded-full bg-ink/10 text-ink-3">
            <X className="size-[17px]" strokeWidth={2.6} />
          </span>
          <span className="text-[23px] text-ink-3 line-through decoration-ink-3/50">{no}</span>
        </div>
        <div className="flex h-[54px] items-center gap-4 rounded-[14px] bg-tone-soft/40 px-5 ring-1 ring-tone/25">
          <span className="grid size-[30px] shrink-0 place-items-center rounded-full bg-tone text-white">
            <Check className="size-[17px]" strokeWidth={2.6} />
          </span>
          <span className="text-[23px] font-semibold tracking-[-0.02em] text-tone-ink">{yes}</span>
        </div>
      </div>
    </div>
  );
}

function HiddenCost() {
  const added = useStepShown(1);

  return (
    <SlideFrame
      section="conclusion"
      kicker="5.2 왜 중요한가 — 첫째, 보이지 않던 비용이 드러났다"
      title={
        <>
          자금·인맥·실패 위험 옆에, <Mark>보이지 않던 비용</Mark> 하나
        </>
      }
      bodyClassName="grid grid-cols-[660px_1fr] gap-11"
    >
      {/* 왼쪽 — 망설임의 목록 (영수증처럼) */}
      <Reveal className="h-full">
        <Panel className="flex h-full flex-col overflow-hidden p-0">
          <div className="flex items-center justify-between bg-paper-2/60 px-9 py-5">
            <p className="text-[22px] font-semibold tracking-[-0.02em] text-ink">여성이 창업을 망설이는 이유</p>
            <span className="text-[19px] text-ink-3">보통 떠올리는 것</span>
          </div>

          <ul className="px-9">
            {KNOWN.map(({ icon: Icon, label }) => (
              <li key={label} className="flex h-[92px] items-center gap-5 border-b border-line/80">
                <span className="grid size-[46px] shrink-0 place-items-center rounded-[13px] bg-paper-2 text-ink-2">
                  <Icon className="size-[24px]" strokeWidth={1.8} />
                </span>
                <span className="text-[27px] font-semibold tracking-[-0.025em] text-ink">{label}</span>
                <Check className="ml-auto size-[24px] text-ink-3/70" strokeWidth={2.2} />
              </li>
            ))}
          </ul>

          {/* 새로 더해진 항목 (→ 1). 그 전에는 점선 자리표시만 */}
          <div className="relative mt-auto">
            <motion.div
              aria-hidden
              initial={false}
              animate={{ opacity: added ? 0 : 1 }}
              transition={{ duration: 0.4, ease: EASE_OUT }}
              className="absolute inset-x-9 top-4 bottom-8 flex items-center justify-center gap-3 rounded-[16px] border-2 border-dashed border-line text-[21px] text-ink-3"
            >
              <Plus className="size-[22px]" strokeWidth={2} />
              그리고 또 하나?
            </motion.div>
            <Step at={1}>
              <div className="relative border-t-2 border-dashed border-tone/35 bg-tone-soft/30 px-9 pt-7 pb-8">
                <Chip variant="solid" className="absolute -top-[16px] left-9">
                  이 연구가 보탠 항목
                </Chip>
                <div className="flex items-center gap-5">
                  <span className="grid size-[46px] shrink-0 place-items-center rounded-[13px] bg-tone text-white">
                    <HeartCrack className="size-[24px]" strokeWidth={1.9} />
                  </span>
                  <span className="text-[29px] font-bold tracking-[-0.03em] text-tone-ink">
                    “연애·결혼이 어려워질지도”
                  </span>
                </div>
                <p className="mt-3 pl-[66px] text-[22px] leading-[1.55] text-ink-2">
                  이 걱정도 <strong className="font-semibold text-ink">실제 근거가 있는 것일 수 있다</strong>
                </p>
              </div>
            </Step>
          </div>
        </Panel>
      </Reveal>

      {/* 오른쪽 — 단서와 해석 */}
      <div className="flex h-full flex-col gap-6">
        <Step at={2}>
          <Callout icon={<TriangleAlert />} title="단, 여기까지는 확인하지 못했다">
            <strong className="font-semibold text-ink">“연애 페널티 때문에 여성이 창업을 덜 한다”</strong>는
            연결고리 — 논문도 이것은 확인하지 못했다고 명시한다.
          </Callout>
        </Step>

        <Step at={3} className="flex-1">
          <Panel className="flex h-full flex-col justify-center gap-7 px-9 py-7">
            <Contrast label="이 비용은 누가 만드나" no="창업이라는 일 자체" yes="직업명을 보고 성격을 짐작하는 쪽의 반응" />
            <Contrast label="그래서 논문이 찾는 해결책" no="여성 개인" yes="그 반응 쪽" />
          </Panel>
        </Step>
      </div>
    </SlideFrame>
  );
}

export const hiddenCostSlide: SlideDef = {
  id: "conclusion-hidden-cost",
  section: "conclusion",
  title: "왜 중요한가 ① 보이지 않던 비용",
  steps: 3,
  Component: HiddenCost,
};
