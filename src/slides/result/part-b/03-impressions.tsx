"use client";

import { ArrowDown, ArrowUp, Check, Eye, Minus } from "lucide-react";
import { motion } from "framer-motion";
import type { SlideDef } from "@/components/deck/types";
import {
  Callout,
  Chip,
  Mark,
  Reveal,
  SlideFrame,
  Step,
  useStepShown,
} from "@/components/slide/primitives";
import { EASE_OUT } from "@/components/slide/motion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

/* ────────────────────────────────────────────────────────────
 * 실험 3 — 창업가 프로필에 매긴 인상 (같은 조건의 초등학교 교사 프로필과 견준 결과)
 *  link: 이 인상이 답장 의향으로 이어졌나 / share: 답장 의향 차이 중 이 인상을 거쳐 생긴 몫
 * ──────────────────────────────────────────────────────────── */
type Row = {
  trait: string;
  tag?: string;
  dir: "down" | "up";
  link: "yes" | "weak" | "no";
  share?: number;
};

const ROWS: Row[] = [
  { trait: "다정함·배려심", tag: "공동체성", dir: "down", link: "yes", share: 30 },
  { trait: "가정에 헌신할 것 같은 정도", dir: "down", link: "weak", share: 19 },
  { trait: "능력·추진력", tag: "주체성", dir: "up", link: "no" },
  { trait: "일에 매여 있는 정도", tag: "바빠 보임", dir: "up", link: "no" },
];

function ShareBar({ share, weak }: { share: number; weak: boolean }) {
  const shown = useStepShown(1);
  return (
    <div className="flex flex-1 items-center gap-4">
      <div className="relative h-[16px] flex-1 overflow-hidden rounded-full bg-paper-2 ring-1 ring-line">
        <motion.span
          initial={false}
          animate={{ width: shown ? `${share}%` : "0%" }}
          transition={{ duration: 0.9, ease: EASE_OUT, delay: shown ? 0.25 : 0 }}
          className={cn("absolute inset-y-0 left-0 rounded-full", weak ? "bg-tone/45" : "bg-tone")}
          style={
            weak
              ? {
                  backgroundImage:
                    "repeating-linear-gradient(135deg, rgba(255,255,255,0.55) 0 5px, transparent 5px 10px)",
                }
              : undefined
          }
        />
      </div>
      <span
        className={cn(
          "flex w-[116px] shrink-0 items-baseline gap-1.5",
          weak ? "text-tone-ink/60" : "text-tone-ink",
        )}
      >
        <span className="text-[19px] font-semibold">약</span>
        <span className="font-serif text-[42px] leading-none tracking-[-0.02em] tabular">{share}%</span>
      </span>
    </div>
  );
}

function Impressions() {
  return (
    <SlideFrame
      section="result"
      kicker="4.4 남성들의 속마음 — 실험 3 설문, 같은 조건의 초등학교 교사 프로필과 견주어"
      title={
        <>
          ‘능력 있다’고 봤지만, <Mark>‘덜 다정해 보인다’</Mark>가 발목을 잡은 듯하다
        </>
      }
      bodyClassName="flex flex-col gap-5"
    >
      {/* ── 인상 표 ───────────────────────────────── */}
      <Reveal>
        <div className="overflow-hidden rounded-[22px] bg-surface ring-1 ring-line">
          <Table className="table-fixed text-[22px]">
            <colgroup>
              <col className="w-[400px]" />
              <col className="w-[250px]" />
              <col />
            </colgroup>
            <TableHeader className="bg-paper-2/70">
              <TableRow className="border-line hover:bg-transparent">
                <TableHead className="h-auto px-8 py-3.5 text-[19px] font-semibold text-ink-3">무엇을 물었나</TableHead>
                <TableHead className="h-auto px-4 py-3.5 text-[19px] font-semibold text-ink-3">교사와 견준 창업가</TableHead>
                <TableHead className="h-auto px-4 py-3.5 text-[19px] font-semibold text-ink-3">
                  <Step at={1} className="flex items-baseline gap-3">
                    <span className="text-tone-ink">이 인상이 답장 의향으로 이어졌나</span>
                    <span className="text-[19px] font-medium text-ink-3">막대 = 답장 의향 차이 중 이 인상을 거친 몫</span>
                  </Step>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ROWS.map((r) => {
                const down = r.dir === "down";
                return (
                  <TableRow key={r.trait} className="border-line hover:bg-transparent">
                    {/* 무엇을 물었나 */}
                    <TableCell className="h-[68px] px-8 py-0">
                      <Reveal className="flex items-center gap-3">
                        <span className="text-[24px] font-semibold tracking-[-0.02em] text-ink">{r.trait}</span>
                        {r.tag ? (
                          <Chip variant="outline" className="px-3 text-[17px]">
                            {r.tag}
                          </Chip>
                        ) : null}
                      </Reveal>
                    </TableCell>

                    {/* 교사와 견준 창업가 */}
                    <TableCell className="px-4 py-0">
                      <Reveal
                        className={cn(
                          "inline-flex items-center gap-2 rounded-full py-1.5 pr-4 pl-2.5 text-[22px] font-bold",
                          down ? "bg-tone-soft/55 text-tone-ink" : "bg-paper-2 text-ink-2",
                        )}
                      >
                        <span
                          className={cn(
                            "grid size-[28px] place-items-center rounded-full text-white",
                            down ? "bg-tone" : "bg-ink-2",
                          )}
                        >
                          {down ? (
                            <ArrowDown className="size-[17px]" strokeWidth={2.8} />
                          ) : (
                            <ArrowUp className="size-[17px]" strokeWidth={2.8} />
                          )}
                        </span>
                        {down ? "낮게 봤다" : "높게 봤다"}
                      </Reveal>
                    </TableCell>

                    {/* 답장 의향으로 이어졌나 (단계 1) */}
                    <TableCell className="px-4 py-0 pr-8">
                      <Step at={1} className="flex items-center gap-5">
                        <span className="flex w-[270px] shrink-0 flex-col">
                          <span
                            className={cn(
                              "flex items-center gap-2 text-[23px] leading-tight font-bold tracking-[-0.02em]",
                              r.link === "yes" && "text-tone-ink",
                              r.link === "weak" && "text-tone-ink/75",
                              r.link === "no" && "font-semibold text-ink-3",
                            )}
                          >
                            {r.link === "no" ? (
                              <Minus className="size-[22px]" strokeWidth={2.6} />
                            ) : (
                              <Check className="size-[22px]" strokeWidth={2.8} />
                            )}
                            {r.link === "yes" ? "그렇다" : r.link === "weak" ? "약하게 그렇다" : "아니다"}
                          </span>
                          {r.link === "weak" ? (
                            <span className="pl-[30px] text-[19px] leading-snug font-medium text-ink-3">
                              아슬아슬 — 우연일 여지 남음
                            </span>
                          ) : null}
                        </span>
                        {r.share ? <ShareBar share={r.share} weak={r.link === "weak"} /> : null}
                      </Step>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </Reveal>

      {/* ── 읽는 법 (단계 2) ─────────────────────────── */}
      <div className="grid grid-cols-[1fr_1fr] gap-6">
        <Step at={2}>
          <Callout title="무시한 게 아니다">
            오히려 ‘능력 있다’고 봤다. 그런데 연애 상대로 고를 때는 그 능력이 별로 도움이 되지 않았고,
            ‘다정하지 않을 것 같다’는 인상이 발목을 잡은 것으로 보인다.
          </Callout>
        </Step>
        <Step at={2}>
          <div className="h-full rounded-[18px] bg-paper-2/70 px-8 py-6 ring-1 ring-line">
            <p className="flex items-center gap-2.5 text-[21px] font-semibold text-ink">
              <Eye className="size-[22px]" strokeWidth={2} />이 표가 보여주는 것
            </p>
            <p className="mt-2 text-[22px] leading-[1.6] text-pretty text-ink-2">
              여성 창업가가 <strong className="font-semibold text-ink">어떤 사람인가</strong>가 아니라, 직업명 한
              줄을 보고 남성들이 <strong className="font-semibold text-ink">무엇을 짐작했는가</strong>다. 프로필은
              실존 인물이 아니어서, 그 짐작이 맞는지는 확인할 길이 없다.
            </p>
          </div>
        </Step>
      </div>
    </SlideFrame>
  );
}

export const impressionsSlide: SlideDef = {
  id: "result-impressions",
  section: "result",
  title: "남성들의 속마음 — 인상과 답장 의향",
  steps: 2,
  Component: Impressions,
};
