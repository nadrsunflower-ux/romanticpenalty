"use client";

import { Check, Clock, GraduationCap, HandHeart, House, Rocket, Shuffle, TrendingUp, X } from "lucide-react";
import type { SlideDef } from "@/components/deck/types";
import { Em, Eyebrow, Mark, Panel, Reveal, SlideFrame } from "@/components/slide/primitives";
import { ExpKicker } from "./_exp-kicker";

/* 남성 응답자에게 직접 물은 인상 네 가지 (결과 4.4 표와 같은 순서: 다정 · 가정 헌신 / 능력 · 바쁨) */
const ASKED = [
  { icon: HandHeart, q: "얼마나 다정해 보이는가" },
  { icon: House, q: "가정에 얼마나 헌신할 것 같은가" },
  { icon: TrendingUp, q: "얼마나 능력 있어 보이는가" },
  { icon: Clock, q: "얼마나 바빠 보이는가" },
];

function Exp3() {
  return (
    <SlideFrame
      section="method"
      kicker={<ExpKicker active={3} />}
      title={
        <>
          답장만으론 속마음을 모른다 — 그래서 <Mark>직접 물었다</Mark>
        </>
      }
      bodyClassName="grid grid-cols-[500px_1fr] gap-10"
    >
      {/* 왼쪽 — 누구에게, 무엇을 보여줬나 */}
      <Reveal>
        <Panel className="flex h-full flex-col px-9 py-9">
          <Eyebrow>누구에게 · 무엇을 보여줬나</Eyebrow>
          <div className="mt-4 flex items-end gap-4">
            <p className="font-serif text-[104px] leading-[0.95] tracking-[-0.02em] text-tone-ink tabular">
              985<span className="ml-1 font-sans text-[32px] font-semibold tracking-normal">명</span>
            </p>
            <div className="pb-2">
              <p className="text-[26px] font-bold tracking-[-0.02em] text-ink">남성 응답자</p>
            </div>
          </div>
          <p className="mt-3 text-[20px] leading-[1.5] text-balance text-ink-3">
            설문을 대충 찍지 않았는지 확인하는 문항을 통과한 사람들
          </p>

          <div className="mt-auto border-t border-line pt-7">
            <div className="flex items-center gap-3 text-[22px] font-semibold text-ink-2">
              <span className="grid size-[38px] place-items-center rounded-full bg-tone-soft/60 text-tone-ink">
                <Shuffle className="size-[20px]" strokeWidth={2.2} />
              </span>
              가상의 여성 프로필 · 비교한 직업
            </div>
            <div className="mt-4 flex flex-col gap-3">
              <span className="flex h-[60px] items-center gap-3 rounded-[15px] bg-tone-soft/45 px-5 text-[24px] font-bold tracking-[-0.02em] text-tone-ink ring-1 ring-tone/20">
                <Rocket className="size-[23px]" strokeWidth={2} />
                사이버보안 스타트업 창업가
              </span>
              <span className="flex h-[60px] items-center gap-3 rounded-[15px] bg-paper-2 px-5 text-[24px] font-bold tracking-[-0.02em] text-ink">
                <GraduationCap className="size-[23px]" strokeWidth={2} />
                초등학교 교사
              </span>
            </div>
          </div>
        </Panel>
      </Reveal>

      {/* 오른쪽 — 앞 두 실험의 한계 → 설문실험이란 + 물은 인상 4가지 */}
      <div className="flex flex-col">
        <Reveal>
          <div className="flex items-center gap-3 text-[22px] tracking-[-0.015em] text-ink-2">
            <span className="rounded-full bg-paper-2 px-3.5 py-1 text-[17px] font-semibold text-ink-3">
              앞의 두 실험
            </span>
            <Check className="size-[21px] shrink-0 text-tone" strokeWidth={2.6} />
            <span>
              “그런 일이 <strong className="font-semibold text-ink">일어난다</strong>”는 보여준다
            </span>
            <span className="mx-1 h-5 w-px bg-line" />
            <X className="size-[21px] shrink-0 text-ink-3" strokeWidth={2.6} />
            <span>
              “<strong className="font-semibold text-ink">왜</strong> 그런지”는 말해주지 않는다
            </span>
          </div>
        </Reveal>
        <Reveal className="mt-6">
          <p className="text-[24px] leading-[1.6] tracking-[-0.015em] text-ink-2">
            설문조사처럼 생겼지만, 응답자마다 보여주는 프로필을 <Em>무작위로</Em> 바꾼다는 점에서{" "}
            <strong className="font-semibold text-ink">실험</strong>이다.
          </p>
        </Reveal>
        <Reveal kind="fade" className="mt-8">
          <Eyebrow>인상을 직접 물었다 — “이 사람은 …”</Eyebrow>
        </Reveal>
        <div className="mt-4 grid flex-1 grid-cols-2 gap-4">
          {ASKED.map(({ icon: Icon, q }) => (
            <Reveal key={q} kind="pop" className="h-full">
              <div className="flex h-full flex-col justify-between rounded-[20px] bg-surface px-7 py-6 ring-1 ring-line">
                <span className="grid size-[56px] place-items-center rounded-[15px] bg-paper-2 text-ink-2">
                  <Icon className="size-[28px]" strokeWidth={1.8} />
                </span>
                <span className="text-[27px] leading-[1.35] font-semibold tracking-[-0.025em] text-balance text-ink">
                  {q}?
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </SlideFrame>
  );
}

export const exp3Slide: SlideDef = {
  id: "method-exp3",
  section: "method",
  title: "실험 3: 왜 그런지 물어보기",
  Component: Exp3,
};
