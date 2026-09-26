"use client";

import { Fragment, type ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, Gem, Hourglass, House, MessageCircleHeart, Plus, Search, TrendingDown, type LucideIcon } from "lucide-react";
import type { SlideDef } from "@/components/deck/types";
import { Mark, NumberDot, Panel, Quote, Reveal, SlideFrame, Step, useStepShown } from "@/components/slide/primitives";
import { EASE_OUT } from "@/components/slide/motion";
import { cn } from "@/lib/utils";

const FLOW: { icon: LucideIcon; body: ReactNode; focus?: boolean }[] = [
  {
    icon: Gem,
    body: (
      <>
        <span className="whitespace-nowrap">
          <strong className="font-semibold text-ink">결혼까지 염두에 둔 진지한 만남</strong>에서는
        </span>
        <br />
        자연스럽게 조건을 보게 된다.
      </>
    ),
  },
  {
    icon: MessageCircleHeart,
    body: (
      <>
        프로필을 보며 자연스럽게 떠올린다
        <br />
        <span className="font-semibold whitespace-nowrap text-ink">“이 사람과 함께 가정을 꾸릴 수 있을까?”</span>
      </>
    ),
  },
  {
    icon: TrendingDown,
    body: (
      <>
        <span className="whitespace-nowrap">그 순간 ‘너무 바쁠 것 같다’는</span>
        <br />
        짐작이 <strong className="font-bold text-tone-ink">감점 요인</strong>이 된다.
      </>
    ),
    focus: true,
  },
];

function TimeSlide() {
  const flowShown = useStepShown(1);

  return (
    <SlideFrame
      section="theory"
      kicker="2.2 두 번째 이유 — ‘저 사람은 너무 바쁠 것 같다’"
      title={
        <>
          ‘너무 바쁠 것 같다’는 짐작이 <Mark>감점</Mark>이 된다
        </>
      }
      bodyClassName="flex flex-col"
    >
      {/* ── 두 생각이 겹치면 → 이런 속마음 ─────────────── */}
      <div className="grid grid-cols-[268px_34px_268px_52px_1fr] items-center gap-x-3">
        <Reveal className="h-full">
          <SourceCard icon={Hourglass} label="인식">
            창업은 <strong className="font-bold text-ink">일이 많은 직업</strong>이다
          </SourceCard>
        </Reveal>
        <Reveal kind="pop" className="grid place-items-center text-ink-3">
          <Plus className="size-[30px]" strokeWidth={2.2} />
        </Reveal>
        <Reveal className="h-full">
          <SourceCard icon={House} label="낡은 성역할 통념">
            “남자는 밖에서 돈을 벌고, 여자는 집안일을 한다”
          </SourceCard>
        </Reveal>
        <Reveal kind="fade" className="grid place-items-center text-tone">
          <ArrowRight className="size-[38px]" strokeWidth={2.4} />
        </Reveal>
        <Reveal className="pl-3">
          <p className="mb-5 pl-[76px] text-[19px] font-semibold text-ink-3">두 생각이 겹치면, 이런 생각이 나온다</p>
          <Quote className="[&_blockquote]:text-[31px]">
            저 여자는 사업하느라 바빠서,
            <br />
            <span className="whitespace-nowrap">
              <Mark>가정을 챙길 시간도, 마음도</Mark> 없을 것 같은데?
            </span>
          </Quote>
        </Reveal>
      </div>

      {/* ── 왜 연애의 문턱에서 작동할까 (단계 1) ─────────── */}
      <Step at={1} className="mt-6">
        <Panel className="px-9 py-6">
          <p className="flex items-center gap-4 text-[24px] font-bold tracking-[-0.025em] text-ink">
            <span className="grid size-[44px] shrink-0 place-items-center rounded-full bg-tone-soft/80 text-tone-ink">
              <Search className="size-[22px]" strokeWidth={2.2} />
            </span>
            그렇다면 바쁨이 왜 연애에서 문제가 될까?
          </p>
          <div className="mt-4 grid grid-cols-[1fr_28px_1fr_28px_1fr] items-stretch gap-x-3">
            {FLOW.map(({ icon: Icon, body, focus }, i) => (
              <Fragment key={i}>
                <motion.div
                  initial={false}
                  animate={flowShown ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                  transition={{ duration: 0.55, ease: EASE_OUT, delay: flowShown ? 0.15 + i * 0.22 : 0 }}
                  className={cn(
                    "flex flex-col items-start gap-2 rounded-[16px] px-5 py-3.5",
                    focus ? "bg-tone-soft/55 ring-1 ring-tone/30" : "bg-paper-2/60",
                  )}
                >
                  <span
                    className={cn(
                      "grid size-[36px] shrink-0 place-items-center rounded-full",
                      focus ? "bg-tone text-white" : "bg-surface text-ink-2 ring-1 ring-line",
                    )}
                  >
                    <Icon className="size-[19px]" strokeWidth={2} />
                  </span>
                  <p className="text-[21px] leading-[1.55] text-ink-2">{body}</p>
                </motion.div>
                {i < FLOW.length - 1 ? (
                  <div className="grid place-items-center text-ink-3/70">
                    <ChevronRight className="size-[30px]" strokeWidth={2.2} />
                  </div>
                ) : null}
              </Fragment>
            ))}
          </div>
        </Panel>
      </Step>

      {/* ── 정리 (단계 2) ───────────────────────────── */}
      <Step at={2} className="mt-5 grid grid-cols-2 gap-8">
        <div className="flex items-center gap-5 rounded-[18px] bg-surface/70 px-7 py-4 ring-1 ring-line">
          <NumberDot n="1" />
          <p className="text-[21px] text-ink-3">
            첫 번째 이유는 <span className="ml-1 text-[25px] font-bold tracking-[-0.025em] text-ink">성격에 대한 넘겨짚기</span>
          </p>
        </div>
        <div className="flex items-center gap-5 rounded-[18px] bg-tone-soft/45 px-7 py-4 ring-1 ring-tone/25">
          <NumberDot n="2" solid />
          <p className="text-[21px] text-ink-3">
            두 번째 이유는{" "}
            <span className="ml-1 text-[25px] font-bold tracking-[-0.025em] text-tone-ink">시간에 대한 걱정</span>
          </p>
        </div>
      </Step>
    </SlideFrame>
  );
}

function SourceCard({ icon: Icon, label, children }: { icon: LucideIcon; label: string; children: ReactNode }) {
  return (
    <div className="flex h-full flex-col rounded-[20px] bg-surface px-7 py-5 ring-1 ring-line">
      <div className="flex items-center gap-3">
        <span className="grid size-[42px] place-items-center rounded-[12px] bg-paper-2 text-ink-2">
          <Icon className="size-[22px]" strokeWidth={1.9} />
        </span>
        <span className="text-[19px] font-semibold text-ink-3">{label}</span>
      </div>
      <p className="mt-3 text-[23px] leading-[1.45] font-medium tracking-[-0.02em] text-ink-2">{children}</p>
    </div>
  );
}

export const timeSlide: SlideDef = {
  id: "theory-time",
  section: "theory",
  title: "너무 바쁠 것 같다",
  steps: 2,
  Component: TimeSlide,
};
