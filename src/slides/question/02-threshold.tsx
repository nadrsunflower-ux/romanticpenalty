"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import type { SlideDef } from "@/components/deck/types";
import { Body, Callout, Mark, Reveal, SlideFrame, Step, useStepShown } from "@/components/slide/primitives";
import { cn } from "@/lib/utils";

const STAGES = ["만남", "연애 시작", "교제", "결혼", "가족 형성"];

function Threshold() {
  const focusShown = useStepShown(2);

  return (
    <SlideFrame
      section="question"
      kicker="1.2 왜 하필 ‘연애를 시작하는 순간’인가"
      title={
        <>
          여기서 막히면, 뒤의 모든 단계는 <Mark>시작조차 되지 않는다</Mark>
        </>
      }
      lead="가족을 이루는 과정을 순서대로 늘어놓으면 이렇다."
    >
      <div className="relative mx-auto mt-4 w-[1320px]">
        {/* 기존 연구 — 오른쪽 끝 (단계 1) */}
        <Step at={1} className="absolute top-0 right-0 w-[500px]">
          <div className="flex flex-col items-center">
            <span className="rounded-full bg-ink/80 px-5 py-2 text-[19px] font-semibold text-paper">
              기존 연구가 본 곳 · 결혼 이후
            </span>
            <span className="mt-3 h-[18px] w-full rounded-t-[10px] border-x-2 border-t-2 border-ink/35" />
          </div>
        </Step>

        {/* 단계 흐름 */}
        <div className="flex items-center justify-between pt-[78px]">
          {STAGES.map((s, i) => {
            const isFocus = i === 1;
            return (
              <Fragment key={s}>
                <Reveal kind="pop">
                  <div
                    className={cn(
                      "grid h-[118px] w-[204px] place-items-center rounded-[26px] text-[29px] font-bold tracking-[-0.03em] ring-1 transition-all duration-500",
                      isFocus && focusShown
                        ? "bg-tone text-white shadow-[0_22px_40px_-18px_var(--tone)] ring-tone"
                        : "bg-surface text-ink ring-line",
                    )}
                  >
                    {s}
                  </div>
                </Reveal>
                {i < STAGES.length - 1 ? (
                  <Reveal kind="fade">
                    <ChevronRight className="size-[34px] text-ink-3/70" strokeWidth={2.2} />
                  </Reveal>
                ) : null}
              </Fragment>
            );
          })}
        </div>

        {/* 이 연구 — 가장 앞단 (단계 2) */}
        <Step at={2} className="absolute top-[212px] left-[140px] w-[380px]">
          <div className="flex flex-col items-center">
            <motion.span
              animate={focusShown ? { y: [0, -6, 0] } : { y: 0 }}
              transition={{ duration: 1.6, repeat: focusShown ? Infinity : 0, ease: "easeInOut" }}
              className="text-[34px] leading-none text-tone"
            >
              ▲
            </motion.span>
            <span className="mt-2 rounded-full bg-tone-soft px-5 py-2 text-[20px] font-bold text-tone-ink">
              이 연구가 보는 지점 · 가장 앞단
            </span>
          </div>
        </Step>
      </div>

      <div className="absolute inset-x-0 bottom-0 grid grid-cols-[1fr_1fr] gap-10">
        <Step at={1}>
          <Body className="text-[24px]">
            기존 연구는 화살표의 <strong className="font-semibold text-ink">오른쪽 끝(결혼 이후)</strong>만 봤다.
          </Body>
        </Step>
        <Step at={2}>
          <Callout title="이 연구는 맨 왼쪽 문턱을 본다">
            여기서 막히면 뒤의 모든 단계는 시작조차 되지 않기 때문이다.
          </Callout>
        </Step>
      </div>
    </SlideFrame>
  );
}

export const thresholdSlide: SlideDef = {
  id: "question-threshold",
  section: "question",
  title: "왜 ‘연애를 시작하는 순간’인가",
  steps: 2,
  Component: Threshold,
};
