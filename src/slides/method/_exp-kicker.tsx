"use client";

import { Fragment } from "react";
import { cn } from "@/lib/utils";

/**
 * 3.3 '세 번의 실험' 슬라이드 공용 키커.
 * 머리줄에 세 실험을 알약으로 늘어놓고, 지금 보고 있는 실험만 섹션 색으로 칠한다
 * → 세 장을 넘기는 동안 청중이 "전체 중 어디쯤인지" 한눈에 알 수 있다.
 */
const EXPS = [
  { n: 1, kind: "현장실험", label: "창업가 vs 관리자" },
  { n: 2, kind: "현장실험", label: "창업가에도 종류가 있다" },
  { n: 3, kind: "설문실험", label: "왜 그런지 물어보기" },
] as const;

export function ExpKicker({ active }: { active: 1 | 2 | 3 }) {
  return (
    <span className="inline-flex items-center gap-5">
      <span>3.3 실제로 한 일 — 세 번의 실험</span>
      <span className="inline-flex items-center gap-2">
        {EXPS.map((e, i) => {
          const on = e.n === active;
          return (
            <Fragment key={e.n}>
              <span
                className={cn(
                  "inline-flex h-[36px] items-center gap-2 rounded-full pr-3.5 pl-[6px] text-[17px] font-semibold tracking-[-0.01em] whitespace-nowrap",
                  on ? "bg-tone text-white" : "bg-surface text-ink-3 ring-1 ring-line",
                )}
              >
                <span
                  className={cn(
                    "grid size-[24px] place-items-center rounded-full text-[17px] leading-none font-bold tabular-nums",
                    on ? "bg-white text-tone-ink" : "bg-paper-2 text-ink-3",
                  )}
                >
                  {e.n}
                </span>
                <span className={cn("font-medium", on ? "text-white/80" : "text-ink-3/80")}>{e.kind}</span>
                <span>{e.label}</span>
              </span>
              {i < EXPS.length - 1 ? <span className="h-px w-4 bg-ink/20" /> : null}
            </Fragment>
          );
        })}
      </span>
    </span>
  );
}
