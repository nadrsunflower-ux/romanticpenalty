"use client";

import { Baby, HandCoins, UserPlus } from "lucide-react";
import type { SlideDef } from "@/components/deck/types";
import { Body, Caption, Em, Eyebrow, Mark, Panel, Reveal, SlideFrame, Step } from "@/components/slide/primitives";

const ASKED = [
  { icon: HandCoins, q: "여성 창업가가 투자를 받기 더 어려운가?" },
  { icon: UserPlus, q: "여성 창업가가 직원을 뽑기 더 어려운가?" },
  { icon: Baby, q: "결혼한 여성 창업가가 일과 육아를 어떻게 병행하는가?" },
];

function WhyStudy() {
  return (
    <SlideFrame
      section="question"
      kicker="1.1 왜 이런 걸 연구했을까"
      title={
        <>
          여성 창업 연구는 많았지만, <Mark>연애의 시작</Mark>은 비어 있었다
        </>
      }
      bodyClassName="grid grid-cols-[1fr_600px] gap-12"
    >
      {/* 왼쪽 — 기존 연구가 물어 온 것 */}
      <div className="flex flex-col">
        <Reveal>
          <Body className="text-[24px]">
            여성 창업가는 남성에 비해 수가 적고 사업 성과도 뒤처진다.
            <br />
            이것은 오랫동안 연구 주제였고, 학자들은 주로 이런 것들을 물어 왔다.
          </Body>
        </Reveal>
        <div className="mt-7 flex flex-col gap-3.5">
          {ASKED.map(({ icon: Icon, q }) => (
            <Reveal key={q}>
              <div className="flex items-center gap-5 rounded-[18px] bg-surface px-6 py-[18px] ring-1 ring-line">
                <span className="grid size-[50px] shrink-0 place-items-center rounded-[14px] bg-paper-2 text-ink-2">
                  <Icon className="size-[26px]" strokeWidth={1.8} />
                </span>
                <span className="text-[24px] font-medium tracking-[-0.02em] text-ink">{q}</span>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-6">
          <Caption className="text-[23px] text-ink-2">
            → 대부분 <strong className="font-semibold text-ink">이미 결혼해 아이가 있는 여성</strong>을 보거나,{" "}
            <strong className="font-semibold text-ink">사업 쪽 이야기</strong>에 머물렀다.
          </Caption>
        </Reveal>
      </div>

      {/* 오른쪽 — 빠진 질문 (→ 한 번 누르면 등장) */}
      <Step at={1} className="h-full">
        <Panel className="relative flex h-full flex-col justify-center overflow-hidden px-12">
          <span
            aria-hidden
            className="absolute right-[40px] bottom-[6px] font-serif text-[280px] leading-[0.8] text-tone-soft/60 italic select-none"
          >
            ?
          </span>
          <Eyebrow className="relative">빠져 있던 질문</Eyebrow>
          <p className="relative mt-5 text-[34px] leading-[1.45] font-bold tracking-[-0.03em] text-ink">
            아직 결혼하지 않은
            <br />
            여성 창업가는 어떨까?
          </p>
          <p className="relative mt-4 text-[27px] leading-[1.55] tracking-[-0.02em] text-ink-2">
            결혼은커녕, <Em>연애를 시작하는 것 자체</Em>가
            <br />
            더 어려워지지는 않을까?
          </p>
          <div className="relative mt-9 h-px bg-line" />
          <p className="relative mt-6 text-[23px] font-semibold text-tone-ink">
            이 연구는 바로 그 지점을 묻는다.
          </p>
        </Panel>
      </Step>
    </SlideFrame>
  );
}

export const whySlide: SlideDef = {
  id: "question-why",
  section: "question",
  title: "왜 이런 걸 연구했을까",
  steps: 1,
  Component: WhyStudy,
};
