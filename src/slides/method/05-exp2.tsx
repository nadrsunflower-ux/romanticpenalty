"use client";

import type { ComponentType, ReactNode } from "react";
import { CalendarDays, Flower2, GraduationCap, Rocket, Stethoscope, UserRound } from "lucide-react";
import type { SlideDef } from "@/components/deck/types";
import { Body, Eyebrow, Mark, Panel, Reveal, SlideFrame } from "@/components/slide/primitives";
import { cn } from "@/lib/utils";
import { ExpKicker } from "./_exp-kicker";

/* 네 직업 — 해설 원문 표 그대로. 결과(4.3) 슬라이드와 같은 방향: 열 = 창업가인가?, 행 = 바빠 보이나? */
type Job = {
  name: string;
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
  founder: boolean;
  image: "남성적" | "여성적";
};

const GRID: Job[][] = [
  [
    { name: "스타트업 대표", icon: Rocket, founder: true, image: "남성적" },
    { name: "간호사", icon: Stethoscope, founder: false, image: "여성적" },
  ],
  [
    { name: "꽃집 사장", icon: Flower2, founder: true, image: "여성적" },
    {
      name: "초등학교 교사",
      icon: GraduationCap,
      founder: false,
      image: "여성적",
    },
  ],
];

const COLS = ["예", "아니오"];
const ROWS = ["매우 바쁨", "덜 바쁨"];

function JobCell({ job }: { job: Job }) {
  const Icon = job.icon;
  return (
    <div
      className={cn(
        "flex h-full items-center gap-5 rounded-[20px] px-6 ring-1",
        job.founder ? "bg-tone-soft/30 ring-tone/25" : "bg-surface ring-line",
      )}
    >
      <span
        className={cn(
          "grid size-[60px] shrink-0 place-items-center rounded-[16px]",
          job.founder ? "bg-tone text-white" : "bg-paper-2 text-ink-2",
        )}
      >
        <Icon className="size-[30px]" strokeWidth={1.8} />
      </span>
      <div className="min-w-0">
        <p className="text-[27px] leading-[1.25] font-bold tracking-[-0.03em] text-ink">{job.name}</p>
        <p className="mt-1.5 text-[19px] text-ink-3">
          통념상 이미지 <span className="font-semibold text-ink-2">{job.image}</span>
        </p>
      </div>
    </div>
  );
}

/**
 * 2×2 매트릭스. aside 는 오른쪽 열에서 두 본문 줄(스타트업 대표 ~ 꽃집 사장)과
 * 위아래 끝이 정확히 맞도록 같은 그리드의 2~3행에 걸쳐 놓는다.
 */
/* 5열 그리드라 자동 배치에 맡기면 칸이 밀린다 → 행·열 위치를 정적 클래스로 명시 */
const ROW_START = ["row-start-2", "row-start-3"];
const CELL_COL = ["col-start-2", "col-start-3"];

function Matrix({ aside }: { aside: ReactNode }) {
  return (
    <div className="grid grid-cols-[124px_1fr_1fr_24px_500px] grid-rows-[auto_148px_148px] gap-3">
      {/* 머리줄 */}
      {COLS.map((c, i) => (
        <Reveal key={c} kind="fade" className={cn("row-start-1 flex flex-col px-2 pb-1", CELL_COL[i])}>
          <span className="text-[17px] font-semibold text-ink-3">창업가인가?</span>
          <span
            className={cn(
              "text-[24px] leading-[1.3] font-bold tracking-[-0.02em]",
              i === 0 ? "text-tone-ink" : "text-ink-2",
            )}
          >
            {c}
          </span>
        </Reveal>
      ))}

      {/* 본문 두 줄 */}
      {GRID.map((row, r) => (
        <div key={ROWS[r]} className="contents">
          <Reveal kind="fade" className={cn("col-start-1 flex flex-col justify-center", ROW_START[r])}>
            <span className="text-[17px] font-semibold text-ink-3">바빠 보이나?</span>
            <span className="text-[24px] leading-[1.3] font-bold tracking-[-0.02em] text-ink">{ROWS[r]}</span>
          </Reveal>
          {row.map((job, c) => (
            <Reveal key={job.name} kind="pop" className={cn("h-full", ROW_START[r], CELL_COL[c])}>
              <JobCell job={job} />
            </Reveal>
          ))}
        </div>
      ))}

      <div className="col-start-5 row-span-2 row-start-2 min-h-0">{aside}</div>
    </div>
  );
}

function Fact({
  icon: Icon,
  children,
}: {
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
  children: ReactNode;
}) {
  return (
    <li className="flex items-center gap-3.5 text-[22px] tracking-[-0.015em] text-ink-2">
      <Icon className="size-[22px] shrink-0 text-tone" strokeWidth={2} />
      <span>{children}</span>
    </li>
  );
}

function Exp2() {
  return (
    <SlideFrame
      section="method"
      kicker={<ExpKicker active={2} />}
      title={
        <>
          ‘창업가라서’ 불리한가, <Mark>‘바빠 보여서’</Mark> 불리한가
        </>
      }
      bodyClassName="flex flex-col"
    >
      {/* 위 — 첫 실험의 허점 */}
      <Reveal>
        <Body className="text-[23px] leading-[1.6]">
          첫 실험의 허점: ‘창업가’라고만 하면{" "}
          <strong className="font-semibold text-ink">야망 있는 스타트업 대표</strong>
          도, <strong className="font-semibold text-ink">동네 꽃집 사장님</strong>도 창업가다.
        </Body>
      </Reveal>

      {/* 아래 — 2×2 설계 + 실험 2 개요 (개요 블록은 두 본문 줄과 위아래를 맞춘다) */}
      <div className="flex flex-1 flex-col justify-center">
        <Matrix
          aside={
            <Reveal className="h-full">
              <Panel className="flex h-full flex-col justify-center px-8 py-6">
                <Eyebrow>실험 2</Eyebrow>
                <div className="mt-4 flex items-end gap-5">
                  <div>
                    <p className="font-serif text-[64px] leading-none tracking-[-0.02em] text-ink-3 tabular">
                      800
                      <span className="ml-1 font-sans text-[24px] font-semibold tracking-normal">건</span>
                    </p>
                    <p className="mt-1.5 text-[19px] font-semibold text-ink-3">보낸 메시지</p>
                  </div>
                  <span className="mb-[38px] text-[28px] text-ink-3/60">→</span>
                  <div>
                    <p className="font-serif text-[64px] leading-none tracking-[-0.02em] text-tone-ink tabular">
                      787
                      <span className="ml-1 font-sans text-[24px] font-semibold tracking-normal">건</span>
                    </p>
                    <p className="mt-1.5 text-[19px] font-semibold text-tone-ink">분석에 쓴 것</p>
                  </div>
                </div>
                <ul className="mt-6 flex flex-col gap-3 border-t border-line pt-5">
                  <Fact icon={CalendarDays}>2025년 7~8월</Fact>
                  <Fact icon={UserRound}>여성 프로필 4개 × 200건</Fact>
                </ul>
              </Panel>
            </Reveal>
          }
        />
      </div>
    </SlideFrame>
  );
}

export const exp2Slide: SlideDef = {
  id: "method-exp2",
  section: "method",
  title: "실험 2: 창업가에도 종류가 있다",
  Component: Exp2,
};
