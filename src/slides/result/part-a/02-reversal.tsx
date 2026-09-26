"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Briefcase, Check, Rocket, Sparkles, X } from "lucide-react";
import type { SlideDef } from "@/components/deck/types";
import { Mark, NumberDot, Panel, Reveal, SlideFrame, Step, useStepShown } from "@/components/slide/primitives";
import { EASE_OUT } from "@/components/slide/motion";
import { cn } from "@/lib/utils";

/* ────────────────────────────────────────────────────────────
 * 4.2 예외 — 상대도 창업가라면 정반대 (해설 원문)
 * 화살표는 "방향"만 나타낸다. 원문에 뒤집힘의 크기 수치는 없으므로 길이에는 의미를 두지 않는다.
 * ──────────────────────────────────────────────────────────── */

const LABEL_W = 184; // 행 이름 칸
const HALF = 196; // 화살표 영역의 절반 (가운데 = 차이 없음)
const ARROW = 172; // 화살표 길이 (방향 표시용, 크기 아님)

const LEFT_CLIP = "polygon(0 50%, 22px 0, 100% 0, 100% 100%, 22px 100%)";
const RIGHT_CLIP = "polygon(0 0, calc(100% - 22px) 0, 100% 50%, calc(100% - 22px) 100%, 0 100%)";

function DirArrow({
  dir,
  width,
  shown,
  className,
  children,
  overlay,
}: {
  dir: "left" | "right";
  width: number;
  shown: boolean;
  className: string;
  children: ReactNode;
  overlay?: ReactNode;
}) {
  const isLeft = dir === "left";
  return (
    <motion.div
      initial={false}
      animate={{ scaleX: shown ? 1 : 0, opacity: shown ? 1 : 0 }}
      transition={{ duration: 0.75, ease: EASE_OUT }}
      className={cn(
        "absolute top-0 flex h-[50px] items-center overflow-hidden text-[20px] font-semibold tracking-[-0.02em] whitespace-nowrap",
        isLeft ? "origin-right justify-end pr-4" : "origin-left justify-start pl-4",
        className,
      )}
      style={{
        width,
        clipPath: isLeft ? LEFT_CLIP : RIGHT_CLIP,
        ...(isLeft ? { right: HALF } : { left: HALF }),
      }}
    >
      <span className="relative">{children}</span>
      {overlay}
    </motion.div>
  );
}

function Row({
  icon,
  label,
  sub,
  children,
}: {
  icon: ReactNode;
  label: ReactNode;
  sub?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex items-center">
      <div
        className="flex shrink-0 items-start gap-2.5 [&_svg]:mt-[4px] [&_svg]:size-[21px]"
        style={{ width: LABEL_W }}
      >
        {icon}
        <div className="flex flex-col">
          <span className="text-[21px] leading-[1.35] font-semibold tracking-[-0.02em] text-ink">{label}</span>
          {sub ? <span className="text-[19px] leading-[1.35] text-ink-3">{sub}</span> : null}
        </div>
      </div>
      <div className="relative h-[50px]" style={{ width: HALF * 2 }}>
        {children}
      </div>
    </div>
  );
}

function Reversal() {
  const flipped = useStepShown(1);
  const sizeDoubt = useStepShown(3);

  return (
    <SlideFrame
      section="result"
      kicker="4.2 예외 — 상대도 창업가라면 정반대 · 예상 2"
      title={
        <>
          상대도 창업가라면, 불이익은 <Mark>정반대로 뒤집혔다</Mark>
        </>
      }
      bodyClassName="grid grid-cols-[1fr_700px] gap-8"
    >
      {/* ── 왼쪽: 방향 다이어그램 ─────────────────────────── */}
      <Reveal className="h-full">
        <Panel className="flex h-full flex-col px-9 pt-7 pb-6">
          {/* 도식 — 해석 상자 위 남은 공간의 세로 가운데 */}
          <div className="my-auto">
            {/* 축 머리 */}
            <div className="flex items-center">
              <span className="shrink-0 text-[19px] text-ink-3" style={{ width: LABEL_W }}>
                받은 남성
              </span>
              <div
                className="relative flex h-[30px] items-center justify-between text-[19px] font-semibold"
                style={{ width: HALF * 2 }}
              >
                <span className="text-ink-2">← 불리</span>
                <span className="absolute left-1/2 -translate-x-1/2 rounded-full bg-paper-2 px-3 py-0.5 text-[17px] font-medium text-ink-3">
                  차이 없음
                </span>
                <span className="text-tone-ink">유리 →</span>
              </div>
            </div>

            <div className="relative mt-5 flex flex-col gap-5">
              {/* 가운데 기준선 */}
              <span
                aria-hidden
                className="absolute top-[-10px] bottom-[-6px] border-l-2 border-dashed border-ink/20"
                style={{ left: LABEL_W + HALF - 1 }}
              />

              <Row icon={<Briefcase className="text-ink-3" />} label="창업가가 아닐 때">
                <DirArrow dir="left" width={ARROW} shown className="bg-ink-3 text-white">
                  불리
                </DirArrow>
              </Row>

              <Row icon={<Rocket className="text-ink-3" />} label="창업가일 때" sub="연구진의 예상 2">
                <DirArrow
                  dir="left"
                  width={104}
                  shown
                  className="bg-[repeating-linear-gradient(-45deg,rgba(23,22,28,0.07)_0_8px,rgba(23,22,28,0.13)_8px_16px)] text-ink-2"
                >
                  덜 불리
                </DirArrow>
                <span
                  className="absolute top-1/2 -translate-y-1/2 text-[19px] whitespace-nowrap text-ink-3"
                  style={{ left: HALF + 14 }}
                >
                  “불이익이 줄어들 것”
                </span>
              </Row>

              <Row
                icon={<Rocket className="text-tone" />}
                label={<span className="text-tone-ink">창업가일 때</span>}
                sub={<span className="font-semibold text-tone-ink">실제 결과</span>}
              >
                <DirArrow
                  dir="right"
                  width={ARROW}
                  shown={flipped}
                  className="bg-tone text-white"
                  overlay={
                    <motion.span
                      aria-hidden
                      initial={false}
                      animate={{ opacity: sizeDoubt ? 1 : 0 }}
                      transition={{ duration: 0.6, ease: EASE_OUT }}
                      className="absolute inset-y-0 right-0 w-[48%] bg-[linear-gradient(to_right,rgba(255,253,249,0)_0%,rgba(255,253,249,0.85)_100%)]"
                    />
                  }
                >
                  오히려 유리
                </DirArrow>
                <motion.span
                  aria-hidden
                  initial={false}
                  animate={{ opacity: sizeDoubt ? 1 : 0, x: sizeDoubt ? 0 : -6 }}
                  transition={{ duration: 0.5, ease: EASE_OUT, delay: sizeDoubt ? 0.2 : 0 }}
                  className="absolute top-1/2 -translate-y-1/2 font-serif text-[40px] leading-none text-tone italic"
                  style={{ left: HALF + ARROW + 8 }}
                >
                  ?
                </motion.span>
              </Row>
            </div>
          </div>

          {/* 해석 (단계 1) */}
          <Step at={1}>
            <div className="rounded-[16px] bg-tone-soft/35 px-6 py-[14px] ring-1 ring-tone/20">
              <p className="text-[19px] font-semibold tracking-[-0.01em] text-tone-ink/75">
                예상 2도 맞았다 — 다만 실제로는 그 이상이었다
              </p>
              <p className="mt-0.5 text-[22px] font-bold tracking-[-0.02em] text-tone-ink">
                줄어든 정도가 아니라, 방향이 통째로 뒤집혔다
              </p>
              <p className="mt-1.5 flex gap-2.5 text-[21px] leading-[1.5] text-ink-2">
                <Sparkles className="mt-[5px] size-[20px] shrink-0 text-tone" strokeWidth={1.9} />
                <span>
                  창업가 남성에게 여성 창업가의 야심과 바쁨은
                  <br />
                  흠이 아니라 <strong className="font-semibold text-ink">매력으로 읽힌 것으로 보인다</strong>.
                </span>
              </p>
            </div>
          </Step>
        </Panel>
      </Reveal>

      {/* ── 오른쪽: 중요한 단서 두 가지 ───────────────────── */}
      <div className="flex h-full min-h-0 flex-col gap-4">
        {/* 단서 ① */}
        <Step at={2}>
          <Panel className="px-8 py-6">
            <div className="flex items-center gap-3.5">
              <NumberDot n={1} className="size-[38px] text-[21px]" />
              <p className="text-[25px] font-bold tracking-[-0.025em] text-ink">
                그런 남성이 드물다 <span className="font-semibold text-tone-ink">→ 평균은 여전히 손해</span>
              </p>
            </div>
            <p className="mt-3 text-[19px] text-ink-3">메시지를 받은 남성 가운데 창업가의 비율</p>
            <div className="mt-2 flex flex-col gap-2">
              {[
                { k: "실험 1", v: 9 },
                { k: "실험 2", v: 5 },
              ].map((r) => (
                <div key={r.k} className="flex items-center gap-4">
                  <span className="w-[64px] text-[19px] font-medium text-ink-2">{r.k}</span>
                  <span className="relative h-[16px] flex-1 overflow-hidden rounded-full bg-ink/[0.08]">
                    <span className="absolute inset-y-0 left-0 rounded-full bg-tone" style={{ width: `${r.v}%` }} />
                  </span>
                  <span className="w-[76px] text-right text-[21px] font-semibold text-tone-ink tabular">약 {r.v}%</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-2 text-[19px] font-semibold tracking-[-0.015em] whitespace-nowrap">
              <span className="rounded-full bg-tone-soft/60 px-3 py-1 text-tone-ink">소수에게 크게 환영</span>
              <span className="text-ink-3">+</span>
              <span className="rounded-full bg-paper-2 px-3 py-1 text-ink-2">다수에게 조금씩 외면</span>
              <span className="text-ink-3">=</span>
              <span className="rounded-full bg-ink-2 px-3 py-1 text-white">총합 마이너스</span>
            </div>
          </Panel>
        </Step>

        {/* 단서 ② */}
        <Step at={3} className="min-h-0 flex-1">
          <Panel className="flex h-full flex-col px-8 py-6">
            <div className="flex items-center gap-3.5">
              <NumberDot n={2} className="size-[38px] text-[21px]" />
              <p className="text-[25px] font-bold tracking-[-0.025em] text-ink">뒤집힘의 ‘크기’는 믿기 어렵다</p>
            </div>
            <p className="mt-3.5 text-[22px] leading-[1.6] text-ink-2">
              창업가 남성은 <strong className="font-semibold text-ink">몇십 명 수준</strong>. 사람이 적은 칸에서는 한두
              명의 답장만으로도 비율이 크게 출렁여, 효과가 실제보다 크게 나오기 쉽다.
            </p>
            <div className="mt-4 flex flex-col items-start gap-2.5 text-[19px] font-semibold tracking-[-0.015em] whitespace-nowrap">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-tone-soft/60 px-3.5 py-1 text-tone-ink">
                <Check className="size-[17px]" strokeWidth={3} />
                뒤집힌 방향 — 받아들인다
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-paper-2 px-3.5 py-1 text-ink-2">
                <X className="size-[17px]" strokeWidth={3} />
                ‘몇 %포인트’ — 그대로 믿기 어렵다
              </span>
            </div>
            <p className="mt-auto pt-4 text-[19px] text-ink-3">
              ※ 연구진도 밝히듯, 창업가 남성은 일부러 골라 보낸 게 아니라 우연히 섞여 들어왔다.
            </p>
          </Panel>
        </Step>
      </div>
    </SlideFrame>
  );
}

export const reversalSlide: SlideDef = {
  id: "result-reversal",
  section: "result",
  title: "예외 — 상대도 창업가라면",
  steps: 3,
  Component: Reversal,
};
