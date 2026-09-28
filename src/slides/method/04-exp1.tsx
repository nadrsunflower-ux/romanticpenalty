"use client";

import type { ReactNode } from "react";
import { ArrowDown, Briefcase, Rocket } from "lucide-react";
import type { SlideDef } from "@/components/deck/types";
import { Callout, Eyebrow, Mark, Panel, Reveal, SlideFrame } from "@/components/slide/primitives";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { ExpKicker } from "./_exp-kicker";

/* 실험 1 개요 — 해설 원문 표 그대로 */
const ROWS: { k: string; v: ReactNode; sub?: ReactNode }[] = [
  { k: "어디서", v: "중국 상하이, 시안" },
  {
    k: "무엇을 비교",
    v: (
      <>
        <strong className="font-semibold text-tone-ink">창업가</strong> vs{" "}
        <strong className="font-semibold text-ink">회사 관리자</strong>
      </>
    ),
  },
  { k: "프로필", v: "8개 (창업가/관리자 × 두 도시 × 남/여)" },
  {
    k: "보낸 메시지",
    v: (
      <>
        프로필 1개당 200건 = <strong className="font-semibold text-ink">1,600건</strong>
      </>
    ),
  },
  {
    k: "분석에 쓴 것",
    v: (
      <>
        <strong className="font-semibold text-ink">1,408건</strong>
      </>
    ),
    sub: "받는 사람 정보가 빠진 건은 제외",
  },
  {
    k: "측정한 것",
    v: (
      <>
        <strong className="font-semibold text-ink">2주 안에 답장이 왔는가</strong>{" "}
        <span className="text-ink-3">(예/아니오)</span>
      </>
    ),
  },
];

/* 프로필 8개 = 직업 2 × 도시 2 × 성별 2 */
function JobPair() {
  return (
    <span className="flex gap-1.5">
      <span className="inline-flex h-[40px] items-center gap-1.5 rounded-full bg-tone-soft/70 px-3.5 text-[19px] font-semibold text-tone-ink">
        <Rocket className="size-[18px]" strokeWidth={2.2} />
        창업가
      </span>
      <span className="inline-flex h-[40px] items-center gap-1.5 rounded-full bg-paper-2 px-3.5 text-[19px] font-semibold text-ink-2">
        <Briefcase className="size-[18px]" strokeWidth={2.2} />
        관리자
      </span>
    </span>
  );
}

function ProfileGrid() {
  const cities = ["상하이", "시안"];
  return (
    <div>
      <div className="grid grid-cols-[62px_1fr_1fr] items-center gap-x-3 gap-y-3.5">
        <span />
        <span className="text-[21px] font-bold tracking-[-0.02em] text-ink">여성 프로필</span>
        <span className="text-[21px] font-bold tracking-[-0.02em] text-ink">남성 프로필</span>
        {cities.map((c) => (
          <div key={c} className="contents">
            <span className="text-[20px] font-medium text-ink-3">{c}</span>
            <JobPair />
            <JobPair />
          </div>
        ))}
        <span />
        {["남성", "여성"].map((to) => (
          <span key={to} className="mt-1.5 flex flex-col border-t border-dashed border-ink/15 pt-3">
            <span className="flex items-center gap-1 text-[19px] text-ink-3">
              <ArrowDown className="size-[17px]" strokeWidth={2.2} />
              {to} 이용자에게
            </span>
            <span className="mt-0.5 text-[26px] font-bold tracking-[-0.02em] text-ink">800건</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Exp1() {
  return (
    <SlideFrame
      section="method"
      kicker={<ExpKicker active={1} />}
      title={
        <>
          창업가 vs 회사 관리자 — <Mark>2주 안에 답장이 오는가</Mark>
        </>
      }
      bodyClassName="grid grid-cols-[1fr_560px] gap-12"
    >
      {/* 왼쪽 — 실험 개요 표 (shadcn Table) */}
      <Reveal className="h-full">
        <div className="h-full overflow-hidden rounded-[22px] bg-surface ring-1 ring-line shadow-[0_1px_0_rgba(23,22,28,0.04),0_12px_32px_-18px_rgba(23,22,28,0.18)] [&_[data-slot=table-container]]:h-full">
          <Table className="h-full text-[22px]">
            <TableBody>
              {ROWS.map((r) => (
                <TableRow key={r.k} className="border-line hover:bg-transparent">
                  <TableCell className="w-[168px] bg-paper-2/45 py-3 pr-4 pl-7 text-[20px] font-semibold text-ink-3">
                    {r.k}
                  </TableCell>
                  <TableCell className="py-3 pr-7 pl-6 text-[23px] leading-[1.45] whitespace-normal text-ink-2">
                    {r.v}
                    {r.sub ? <span className="ml-2 text-[19px] text-ink-3">({r.sub})</span> : null}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Reveal>

      {/* 오른쪽 — 프로필 구성과 '왜 남성 프로필도?' */}
      <div className="flex flex-col">
        <Reveal>
          <Panel className="px-8 py-7">
            <Eyebrow>프로필 8개 · 각 200건</Eyebrow>
            <div className="mt-5">
              <ProfileGrid />
            </div>
          </Panel>
        </Reveal>

        {/* 빌드·진입 애니메이션 없이 처음부터 보인다 */}
        <div className="mt-auto">
          <Callout title="왜 남성 프로필도 만들었나?">
            여성 창업가만 조사하면 “<strong className="font-semibold text-ink">창업가라는 직업 자체가 인기가 없나?</strong>”라는
            반론이 가능하다. 남성 창업가와 비교해야 <strong className="font-semibold text-tone-ink">여성에게만 생기는 일</strong>
            인지 알 수 있다.
          </Callout>
        </div>
      </div>
    </SlideFrame>
  );
}

export const exp1Slide: SlideDef = {
  id: "method-exp1",
  section: "method",
  title: "실험 1: 창업가 vs 회사 관리자",
  Component: Exp1,
};
