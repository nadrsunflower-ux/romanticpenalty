"use client";

import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { ArrowDown, ArrowRight, Clock, Equal, Flower2, Lightbulb, Rocket, Stethoscope } from "lucide-react";
import { motion } from "framer-motion";
import type { SlideDef } from "@/components/deck/types";
import {
  Chip,
  Em,
  Eyebrow,
  Mark,
  NumberDot,
  Panel,
  Reveal,
  SlideFrame,
  Step,
  useStepShown,
} from "@/components/slide/primitives";
import { EASE_OUT } from "@/components/slide/motion";
import { cn } from "@/lib/utils";

/* 관점 1 — 같은 ‘창업가’ 안에서도 갈린다 */
const VENTURES: { icon: LucideIcon; job: string; kind: string; penalty: boolean }[] = [
  { icon: Rocket, job: "스타트업 대표", kind: "회사를 키우려는 야심 있는 창업", penalty: true },
  { icon: Flower2, job: "꽃집 사장", kind: "생계와 만족을 위한 창업", penalty: false },
];

function ReadingHead({ n, label, title }: { n: number; label: string; title: ReactNode }) {
  return (
    <>
      <div className="flex items-center gap-3.5">
        <NumberDot n={n} solid />
        <Eyebrow>{label}</Eyebrow>
      </div>
      <p className="mt-3 text-[29px] leading-[1.35] font-bold tracking-[-0.03em] text-ink">{title}</p>
    </>
  );
}

/** 가로형 직업 노드 (아이콘 + 직업명 + 보조 설명) */
function JobNode({ icon: Icon, job, sub }: { icon: LucideIcon; job: string; sub: string }) {
  return (
    <div className="flex shrink-0 items-center gap-3 rounded-[16px] bg-tone-soft/40 py-3 pr-5 pl-3.5 ring-1 ring-tone/25">
      <span className="grid size-[46px] shrink-0 place-items-center rounded-[13px] bg-tone text-white">
        <Icon className="size-[24px]" strokeWidth={1.8} />
      </span>
      <span className="flex flex-col">
        <span className="text-[22px] leading-tight font-bold tracking-[-0.02em] text-ink">{job}</span>
        <span className="text-[19px] font-medium text-ink-3">{sub}</span>
      </span>
    </div>
  );
}

function Conclude({ children }: { children: ReactNode }) {
  return (
    <div className="flex gap-3 text-[22px] leading-[1.55] text-ink-2">
      <ArrowRight className="mt-[6px] size-[22px] shrink-0 text-tone" strokeWidth={2.4} />
      <p>{children}</p>
    </div>
  );
}

function TwoReadings() {
  const secondShown = useStepShown(1);

  return (
    <SlideFrame
      section="result"
      kicker="4.3 두 실험에 대한 논문의 관점"
      title={
        <>
          <Mark>‘성장지향 창업가’</Mark>라서, 그리고 어쩌면 <Mark>‘바빠 보여서’</Mark>
        </>
      }
      bodyClassName="flex flex-col gap-6"
    >
      <div className="grid min-h-0 flex-1 grid-cols-2 gap-8">
        {/* ── 관점 1 ─────────────────────────────── */}
        <Reveal className="h-full">
          <Panel className="flex h-full flex-col px-9 py-7">
            <ReadingHead n={1} label="관점 1" title={<>‘창업가라서’가 아니라 ‘성장지향 창업가라서’</>} />

            <div className="mt-5 flex flex-col gap-2">
              {VENTURES.map(({ icon: Icon, job, kind, penalty }) => (
                <div
                  key={job}
                  className={cn(
                    "flex items-center gap-4 rounded-[16px] py-2.5 pr-6 pl-3.5 ring-1",
                    penalty ? "bg-tone-soft/40 ring-tone/25" : "bg-paper-2/60 ring-line",
                  )}
                >
                  <span
                    className={cn(
                      "grid size-[46px] shrink-0 place-items-center rounded-[13px]",
                      penalty ? "bg-tone text-white" : "bg-surface text-ink-2",
                    )}
                  >
                    <Icon className="size-[24px]" strokeWidth={1.8} />
                  </span>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <span className="text-[22px] leading-tight font-bold tracking-[-0.02em] text-ink">{job}</span>
                    <span className="text-[19px] text-ink-3">{kind}</span>
                  </div>
                  <span
                    className={cn(
                      "flex shrink-0 items-center gap-1.5 text-[23px] font-bold",
                      penalty ? "text-tone-ink" : "text-ink-3",
                    )}
                  >
                    {penalty ? (
                      <ArrowDown className="size-[22px]" strokeWidth={2.6} />
                    ) : (
                      <Equal className="size-[22px]" strokeWidth={2.6} />
                    )}
                    {penalty ? "불이익" : "차이 없음"}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-auto pt-4">
              <Conclude>
                대상을 ‘창업가’로 뭉뚱그리면 틀리고,
                <br />
                <Em>‘성장지향 창업가’</Em>로 좁혀야 정확하다.
              </Conclude>
            </div>
          </Panel>
        </Reveal>

        {/* ── 관점 2 (단계 1) ─────────────────────── */}
        <Step at={1} className="h-full">
          <Panel className="flex h-full flex-col px-9 py-7">
            <ReadingHead n={2} label="관점 2" title={<>‘바빠 보이는 직업’도 한몫했을 가능성</>} />

            {/* 스타트업 대표 ── 바빠 보인다 ── 간호사 */}
            <div className="mt-5 flex items-center">
              <JobNode icon={Rocket} job="스타트업 대표" sub="창업가" />
              <div className="relative flex flex-1 items-center justify-center self-stretch">
                <motion.span
                  aria-hidden
                  initial={false}
                  animate={{ scaleX: secondShown ? 1 : 0 }}
                  transition={{ duration: 0.7, ease: EASE_OUT, delay: secondShown ? 0.35 : 0 }}
                  className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 bg-tone/60"
                />
                <span className="relative inline-flex items-center gap-1.5 rounded-full bg-tone px-3 py-1 text-[18px] font-semibold whitespace-nowrap text-white">
                  <Clock className="size-[17px]" strokeWidth={2.4} />
                  바빠 보인다
                </span>
              </div>
              <JobNode icon={Stethoscope} job="간호사" sub="창업가 아님" />
            </div>
            <p className="mt-3 text-[20px] leading-[1.5] text-ink-3">
              간호사는 창업가가 아니라서 관점 1로 설명되지 않는다.
              <br />
              둘을 잇는 건 <span className="whitespace-nowrap">‘바빠 보인다’는 점뿐.</span>
            </p>

            <div className="mt-auto flex flex-col gap-2.5 pt-4">
              <Conclude>
                <Em>시간 부담에 대한 걱정</Em>도 작용했을 가능성이 있다.
              </Conclude>
              <div className="flex flex-wrap items-center gap-2.5 pl-[34px]">
                <Chip variant="outline">가능성일 뿐 · 논문은 확정하지 않음</Chip>
                <Chip variant="outline">뒤의 설문(4.4) 결과는 오히려 불리</Chip>
              </div>
            </div>
          </Panel>
        </Step>
      </div>

      {/* ── 생각해 볼 거리 (단계 2) ─────────────────────── */}
      <Step at={2}>
        <div className="flex items-center gap-7 rounded-[20px] border-[1.5px] border-dashed border-tone/45 bg-surface px-9 py-5">
          <span className="flex shrink-0 items-center gap-3 text-[20px] font-semibold text-tone-ink">
            <span className="grid size-[44px] place-items-center rounded-full bg-tone text-white">
              <Lightbulb className="size-[23px]" strokeWidth={2} />
            </span>
            생각해 볼 거리
          </span>
          <span className="h-12 w-px shrink-0 bg-line" />
          <div className="flex flex-col gap-0.5">
            <p className="text-[25px] leading-[1.45] font-semibold tracking-[-0.02em] text-ink">
              ‘여성 <Mark variant="block">창업가</Mark>에 대한 페널티’인가, ‘<Mark variant="block">바쁜 직업</Mark>을
              가진 여성에 대한 페널티’인가?
            </p>
            <p className="text-[20px] text-ink-3">실험 2는 이 질문에 딱 떨어지는 답을 주지 못한다.</p>
          </div>
        </div>
      </Step>
    </SlideFrame>
  );
}

export const twoReadingsSlide: SlideDef = {
  id: "result-two-readings",
  section: "result",
  title: "두 실험에 대한 논문의 관점",
  steps: 2,
  Component: TwoReadings,
};
