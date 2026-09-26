"use client";

import type { ReactNode } from "react";
import type { SlideDef } from "@/components/deck/types";
import { Em, Mark, Reveal, SlideFrame } from "@/components/slide/primitives";

/*
 * 5.4 생각해 볼 질문 — 원문 문장 그대로.
 * 긴 문항은 글자 위계만 나눈다: pre(맥락) → main(질문) → post(덧붙인 물음)
 */
type Question = { pre?: ReactNode; main: ReactNode; post?: ReactNode };

const QUESTIONS: Question[] = [
  {
    main: (
      <>
        같은 “창업가”라는 단어가 왜 남자에게는 <Em>장점</Em>이 되고 여자에게는 <Em>단점</Em>이 될까?
      </>
    ),
    post: "(정확히는 — 남성 쪽 차이는 우연 범위였으니, 남자에게는 손해가 아닌데 여자에게만 손해가 된다)",
  },
  {
    main: (
      <>
        창업가 남성이 여성 창업가를 좋아한 이유는 <Em className="whitespace-nowrap">편견이 없어서</Em>일까, 아니면{" "}
        <Em className="whitespace-nowrap">자기와 비슷한 사람</Em>을 좋아한 것뿐일까?
      </>
    ),
  },
  {
    main: (
      <>
        간호사도 불이익을 받았다면, 진짜 원인은 <Em className="whitespace-nowrap">“창업”</Em>일까 <Em className="whitespace-nowrap">“바쁨”</Em>일까?
      </>
    ),
  },
  {
    main: (
      <>
        이런 편견을 줄이려면 <Em>누가 무엇을</Em> 바꿔야 할까?
      </>
    ),
    post: "여성 개인일까, 남성들의 인식일까, 아니면 데이팅 사이트의 구조일까?",
  },
  {
    main: (
      <>
        <Em>한국에서</Em> 같은 실험을 하면 결과가 같을까, 다를까?
      </>
    ),
    post: "왜 그렇게 생각하는가?",
  },
  {
    pre: "이 연구는 두 차례에 걸쳐 실제 이용자에게 가짜 프로필로 2,400건의 말을 걸었다. 알리면 실험이 안 되고, 안 알리면 속이는 것이 된다.",
    main: (
      <>
        이 맞바꿈은 <Em>어디까지</Em> 허용해도 될까?
      </>
    ),
  },
];

function Questions() {
  return (
    <SlideFrame
      section="conclusion"
      kicker="5.4 생각해 볼 질문 · 토론"
      title={
        <>
          정답 대신, <Mark>함께 생각해 볼</Mark> 여섯 가지 질문
        </>
      }
      bodyClassName="grid grid-cols-2 grid-rows-[repeat(3,minmax(0,1fr))] gap-x-6 gap-y-5"
    >
      {QUESTIONS.map((q, i) => (
        <Reveal key={i} className="h-full">
          <div className="flex h-full flex-col justify-center rounded-[20px] bg-surface py-6 pr-9 pl-7 shadow-[0_1px_0_rgba(23,22,28,0.04),0_12px_32px_-18px_rgba(23,22,28,0.18)] ring-1 ring-line">
            <div className="flex gap-5">
              <span className="w-[42px] shrink-0 text-center font-serif text-[54px] leading-[0.9] text-tone italic">
                {i + 1}
              </span>
              <div className="min-w-0 flex-1">
                {q.pre ? <p className="mb-2 text-[21px] leading-[1.55] text-ink-2">{q.pre}</p> : null}
                <p className="text-[26px] leading-[1.5] font-semibold tracking-[-0.025em] text-pretty text-ink">
                  {q.main}
                </p>
                {q.post ? <p className="mt-1.5 text-[22px] leading-[1.5] text-balance text-ink-2">{q.post}</p> : null}
              </div>
            </div>
          </div>
        </Reveal>
      ))}
    </SlideFrame>
  );
}

export const questionsSlide: SlideDef = {
  id: "conclusion-questions",
  section: "conclusion",
  title: "생각해 볼 질문",
  Component: Questions,
};
