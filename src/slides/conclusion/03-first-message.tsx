"use client";

import type { ReactNode } from "react";
import { Ellipsis, TriangleAlert, X } from "lucide-react";
import type { SlideDef } from "@/components/deck/types";
import {
  Callout,
  Chip,
  Mark,
  NumberDot,
  Panel,
  Reveal,
  SlideFrame,
  Step,
} from "@/components/slide/primitives";
import { cn } from "@/lib/utils";

/* 셋째의 단서 — 원문 그대로 */
const HEDGES: ReactNode[] = [
  "답장을 안 할 이유는 얼마든지 있고, 원래 열에 일곱 이상은 어느 쪽에도 답하지 않았다.",
  <>
    증거가 되는 것은{" "}
    <strong className="font-semibold text-ink">수백 건을 모았을 때 두 집단 사이에 남는 차이</strong>뿐이다.
  </>,
  "본인도 모르는 무의식이었는지까지는 이 연구가 확인하지 않았다.",
];

/** 칼럼 머리 — 번호 + "둘째 · …" */
function ColumnHead({ n, order, title }: { n: number; order: string; title: string }) {
  return (
    <div className="flex h-[44px] items-center gap-3.5">
      <NumberDot n={n} solid />
      <p className="text-[27px] font-bold tracking-[-0.03em] text-ink">
        <span className="text-tone-ink">{order}</span>
        <span className="mx-2.5 text-ink-3/60">·</span>
        {title}
      </p>
    </div>
  );
}

/** 세로 시간축의 한 지점 */
function TimeNode({
  when,
  focus,
  tag,
  line,
  children,
}: {
  when: string;
  focus?: boolean;
  tag: string;
  /** 다음 점으로 이어지는 선(down) / 이전 점에서 오는 선(up) */
  line: "down" | "up";
  children: ReactNode;
}) {
  return (
    <div className="grid grid-cols-[112px_1fr] items-stretch">
      <div className="relative flex items-center">
        <span
          aria-hidden
          className={cn(
            "absolute left-[8px] w-[2px] bg-line",
            line === "down" ? "top-1/2 -bottom-5" : "top-0 bottom-1/2",
          )}
        />
        <span
          className={cn(
            "relative z-10 size-[18px] shrink-0 rounded-full ring-4 ring-surface",
            focus ? "bg-tone" : "bg-ink-3/60",
          )}
        />
        <span
          className={cn(
            "ml-3 text-[20px] font-semibold tracking-[-0.02em]",
            focus ? "text-tone-ink" : "text-ink-3",
          )}
        >
          {when}
        </span>
      </div>
      <div
        className={cn(
          "rounded-[16px] px-6 py-5",
          focus ? "bg-tone-soft/35 ring-1 ring-tone/25" : "bg-paper-2/70",
        )}
      >
        <Chip variant={focus ? "solid" : "outline"}>{tag}</Chip>
        <p
          className={cn(
            "mt-2.5 text-[23px] leading-[1.5] tracking-[-0.02em]",
            focus ? "font-semibold text-tone-ink" : "text-ink-2",
          )}
        >
          {children}
        </p>
      </div>
    </div>
  );
}

function FirstMessage() {
  return (
    <SlideFrame
      section="conclusion"
      kicker="5.2 왜 중요한가 — 둘째·셋째"
      title={
        <>
          끌림도 편견도, <Mark>첫 메시지 단계</Mark>에서 이미 보일 수 있다
        </>
      }
      bodyClassName="grid grid-cols-[610px_1fr] gap-10"
    >
      {/* ── 둘째 · 창업가 부부 ─────────────────────── */}
      <div className="flex h-full flex-col gap-4">
        <Reveal>
          <ColumnHead n={2} order="둘째" title="창업가 부부가 왜 많을까" />
        </Reveal>
        <Reveal className="flex-1">
          <Panel className="flex h-full flex-col px-8 pt-7 pb-7">
            <p className="text-[19px] text-ink-3">예전부터 있던 관찰</p>
            <p className="mt-1 text-[24px] leading-[1.45] font-semibold tracking-[-0.02em] text-ink">
              “부부가 둘 다 사업하는 집이 유독 많다”
            </p>

            <div className="mt-6 flex flex-col gap-5">
              <TimeNode when="첫 메시지" focus tag="이 연구가 더한 가능성" line="down">
                결혼하기 한참 전, 첫 메시지 단계에서 이미 서로 끌리는 것으로 보인다
              </TimeNode>
              <TimeNode when="결혼 후" tag="지금까지의 설명" line="up">
                결혼한 뒤 서로 지식과 영향을 주고받아서
              </TimeNode>
            </div>

            <p className="mt-auto pt-5 text-[22px] leading-[1.5] text-ink-2">
              → 기존 설명을 <strong className="font-semibold text-tone-ink">대체하는 게 아니라 보완</strong>한다
            </p>
          </Panel>
        </Reveal>
      </div>

      {/* ── 셋째 · 편견의 작동 방식 (→ 1) ─────────────── */}
      <div className="flex h-full flex-col gap-4">
        <Step at={1}>
          <ColumnHead n={3} order="셋째" title="편견은 어떻게 작동하나" />
        </Step>
        <Step at={1} className="flex-1">
          <Panel className="flex h-full flex-col justify-center px-8 py-7">
            <div className="flex flex-col gap-2.5">
              <div className="flex h-[56px] items-center gap-4 rounded-[14px] bg-paper-2/70 px-5">
                <span className="grid size-[30px] shrink-0 place-items-center rounded-full bg-ink/10 text-ink-3">
                  <X className="size-[17px]" strokeWidth={2.6} />
                </span>
                <span className="text-[23px] text-ink-3 line-through decoration-ink-3/50">
                  “나는 여성 창업가가 싫다”
                </span>
                <span className="ml-auto text-[19px] text-ink-3">아무도 이렇게 말하지 않았다</span>
              </div>
              <div className="flex h-[56px] items-center gap-4 rounded-[14px] border-2 border-dashed border-tone/40 bg-tone-soft/20 px-5">
                <span className="grid h-[30px] w-[44px] shrink-0 place-items-center rounded-[12px] rounded-bl-[4px] bg-tone-soft/70 text-tone-ink">
                  <Ellipsis className="size-[20px]" strokeWidth={2.4} />
                </span>
                <span className="text-[23px] font-semibold tracking-[-0.02em] text-tone-ink">
                  그저 답장을 하지 않았을 뿐이다
                </span>
              </div>
            </div>
            <p className="mt-6 text-[26px] leading-[1.5] font-bold tracking-[-0.03em] text-ink">
              차별은 말로 드러나지 않은 채, <Mark variant="block">조용한 선택</Mark>의 형태로 쌓일 수 있다.
            </p>
          </Panel>
        </Step>

        {/* 단서 (→ 2) */}
        <Step at={2}>
          <Callout icon={<TriangleAlert />} title="단, 답장하지 않은 한 사람을 두고 “편견이 있다”고 말할 수는 없다">
            <ul className="flex flex-col gap-1.5">
              {HEDGES.map((h, i) => (
                <li key={i} className="flex gap-2.5">
                  <span className="mt-[14px] size-[5px] shrink-0 rounded-full bg-tone/70" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </Callout>
        </Step>
      </div>
    </SlideFrame>
  );
}

export const firstMessageSlide: SlideDef = {
  id: "conclusion-first-message",
  section: "conclusion",
  title: "왜 중요한가 ② 창업가 부부 · 조용한 편견",
  steps: 2,
  Component: FirstMessage,
};
