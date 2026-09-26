"use client";

import { Fragment, type MouseEvent, type ReactNode } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { Check, MousePointerClick } from "lucide-react";
import type { SlideDef } from "@/components/deck/types";
import { useSlide } from "@/components/deck/slide-context";
import { Mark, Panel, Reveal, SlideFrame } from "@/components/slide/primitives";
import { EASE_OUT } from "@/components/slide/motion";
import { cn } from "@/lib/utils";

/* ────────────────────────────────────────────────────────────
 * 5.3 오해 9가지 ↔ 실제로는 — 해설 원문 표 그대로 (굵은 글씨도 원문 강조 위치)
 * ──────────────────────────────────────────────────────────── */
/* 수치 보조 표시 — 비교 기준(회색) → 주목 대상(섹션 색). 라벨은 해설 4.1 표의 비교 대상 그대로 */
type FigItem = { value: ReactNode; label: string; focus?: boolean };

type Myth = {
  myth: string;
  verdict: string;
  body: ReactNode;
  figure?: { items: FigItem[]; caption: string };
};

/** "약" 을 숫자 앞에 작게 붙인다 */
const About = ({ children }: { children: ReactNode }) => (
  <>
    <span className="mr-1.5 font-sans text-[26px] font-semibold tracking-normal">약</span>
    {children}
  </>
);

const B = ({ children }: { children: ReactNode }) => (
  <Mark variant="block" className="font-semibold text-ink">
    {children}
  </Mark>
);

const MYTHS: Myth[] = [
  {
    myth: "여성은 창업하면 연애를 못 한다",
    verdict: "아니다.",
    body: (
      <>
        답장률이 약 25%에서 약 19%로 줄었을 뿐이다. 19%는 여전히 답장을 받았다.
        논문도 효과 크기를 <B>“크지 않다(modest)”</B>고 표현한다.
      </>
    ),
    figure: {
      items: [
        { value: <About>25%</About>, label: "여성 · 회사 관리자" },
        { value: <About>19%</About>, label: "여성 · 창업가", focus: true },
      ],
      caption: "첫 메시지 답장률 · 직업란만 바꿈",
    },
  },
  {
    myth: "여성 창업가는 결혼하기 어렵다",
    verdict: "알 수 없다.",
    body: (
      <>
        이 연구는 <B>첫 메시지에 답장이 오는지</B>만 봤다. 실제 연애나 결혼까지
        추적하지 않았다. 오히려 설문실험에서는 <B>“실제로 만나 볼 의향”</B>을
        물었을 때 창업가와 교사의 차이가 사라졌다.
      </>
    ),
  },
  {
    myth: "모든 여성 창업가가 그렇다",
    verdict: "아니다.",
    body: (
      <>
        불이익은 <B>성장지향 창업(스타트업)</B>에 몰려 있었다. 꽃집 같은 생활형
        창업에서는 나타나지 않았다.
      </>
    ),
  },
  {
    myth: "전 세계가 다 그렇다",
    verdict: "알 수 없다.",
    body: (
      <>
        중국의 특정 데이팅 사이트에서 얻은 결과다. 같은 중국 안에서도
        상하이에서는 이렇다 할 차이가 나타나지 않았다. 단 이 도시별 비교는
        논문에 <B>표로 실리지 않은 분석</B>이고, 도시 두 곳만으로는 이유를
        단정할 수 없다.
      </>
    ),
  },
  {
    myth: "\u2009‘창업가’라는 말 하나만 깨끗하게 비교했다", // 여는 따옴표 “‘ 가 붙어 보이지 않게 얇은 공백
    verdict: "아니다.",
    body: (
      <>
        직업 이름에는 소득·계층·업종 이미지가 한 덩어리로 딸려 온다. 논문도 이를{" "}
        <B>“복합 처치”</B>라고 인정한다.
      </>
    ),
  },
  {
    myth: "원인이 밝혀졌다",
    verdict: "아니다.",
    body: (
      <>
        연구진 스스로 “왜”에 대한 설명은 <B>잠정적(suggestive)</B>이라고 여러 번
        못박는다.
      </>
    ),
  },
  {
    myth: "여성 창업가는 실제로 덜 다정하다",
    verdict: "이 연구가 잰 것이 아니다.",
    body: (
      <>
        실험에 쓰인 프로필은 지어낸 인물이다. 설문이 잰 것은{" "}
        <B>남성들의 짐작</B>뿐이고, 여성 창업가의 실제 성격은 측정되지도
        검증되지도 않았다.
      </>
    ),
  },
  {
    myth: "결국 남자들이 문제다",
    verdict: "그렇게까지는 말할 수 없다.",
    body: (
      <>
        차이는 6.7%포인트이고, 창업가 남성은 오히려 반대로 반응했으며, 성역할
        태도 점수가 낮은 남성에게서는 차이가 작았다.{" "}
        <B>집단 전체의 속성이 아니라 통념이 작동한 만큼의 차이</B>다.
      </>
    ),
    figure: {
      items: [{ value: "6.7%p", label: "여성 관리자 ↔ 여성 창업가 답장률 차이", focus: true }],
      caption: "%p = %포인트",
    },
  },
  {
    myth: "여성은 직업을 숨겨야 한다",
    verdict: "연구진의 주장이 아니다.",
    body: (
      <>
        이 연구는 편견이 존재함을 보여줄 뿐, 개인이 거기 맞추라고 말하지 않는다.
        논문이 제안하는 방향은{" "}
        <B>돌봄 분담의 정상화, 창업가 이미지의 성중립화</B> 쪽이다.
      </>
    ),
  },
];

/* 인트로에서 미리 보여 줄 '실제로는'의 답 (중복 제거) */
const VERDICTS = [...new Set(MYTHS.map((m) => m.verdict.replace(/\.$/, "")))];

/* 상세 패널 전환 — 라벨 이름(hidden/shown)을 써서 안쪽 Mark 도 함께 칠해지게 한다 */
const detail: Variants = {
  hidden: { opacity: 0, y: 16 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2, ease: "easeIn" } },
};

const strike: Variants = {
  hidden: { scaleX: 0 },
  shown: {
    scaleX: 1,
    transition: { duration: 0.55, ease: EASE_OUT, delay: 0.25 },
  },
};

function NotSaid() {
  const { step, setStep } = useSlide();
  const active = step > 0 ? step - 1 : null;

  const pick = (i: number) => (e: MouseEvent<HTMLButtonElement>) => {
    setStep(i + 1);
    e.currentTarget.blur();
  };

  return (
    <SlideFrame
      section="conclusion"
      kicker="5.3 이 연구가 말하지 않은 것 — 반드시 함께 읽어야 할 부분"
      title={
        <>
          좋은 연구일수록, <Mark>말할 수 없는 것</Mark>을 분명히 한다
        </>
      }
      bodyClassName="grid grid-cols-[580px_1fr] gap-10"
    >
      {/* ── 왼쪽: 오해하기 쉬운 것 9 ─────────────────── */}
      <div className="flex h-full flex-col justify-between">
        {MYTHS.map((m, i) => {
          const isActive = active === i;
          const done = active !== null && i < active;
          return (
            <Reveal key={m.myth} kind="fade">
              <button
                type="button"
                onClick={pick(i)}
                aria-pressed={isActive}
                aria-label={`오해 ${i + 1}: ${m.myth} — 실제로는 보기`}
                className={cn(
                  "flex h-[56px] w-full items-center gap-3.5 rounded-[14px] px-4 text-left transition-[background-color,box-shadow,color] duration-300",
                  isActive
                    ? "bg-white shadow-[0_14px_30px_-18px_rgba(23,22,28,0.35)] ring-2 ring-tone/45"
                    : done
                      ? "bg-transparent ring-1 ring-line/70"
                      : "bg-surface ring-1 ring-line hover:bg-white",
                )}
              >
                <span
                  className={cn(
                    "grid size-[30px] shrink-0 place-items-center rounded-full font-serif text-[19px] leading-none italic transition-colors duration-300",
                    isActive
                      ? "bg-tone text-white"
                      : done
                        ? "bg-tone-soft/70 text-tone-ink"
                        : "bg-paper-2 text-ink-2",
                  )}
                >
                  {i + 1}
                </span>
                <span
                  className={cn(
                    "text-[21px] tracking-[-0.025em] transition-colors duration-300",
                    isActive
                      ? "font-semibold text-ink"
                      : done
                        ? "text-ink-3 line-through decoration-tone/45"
                        : "text-ink-2",
                  )}
                >
                  “{m.myth}”
                </span>
                {done ? (
                  <Check
                    className="ml-auto size-[20px] shrink-0 text-tone"
                    strokeWidth={2.6}
                  />
                ) : null}
              </button>
            </Reveal>
          );
        })}
      </div>

      {/* ── 오른쪽: 실제로는 ─────────────────────────── */}
      <Reveal className="h-full">
        <Panel className="relative h-full overflow-hidden px-11 py-10">
          <AnimatePresence mode="wait" initial={false}>
            {active === null ? (
              <motion.div
                key="intro"
                variants={detail}
                initial="hidden"
                animate="shown"
                exit="exit"
                className="flex h-full flex-col"
              >
                <div className="flex items-end gap-5">
                  <span className="font-serif text-[150px] leading-[0.8] text-tone italic">
                    9
                  </span>
                  <p className="pb-1 text-[34px] leading-[1.3] font-bold tracking-[-0.03em] text-ink">
                    가지, 오해하기 쉬운 것
                  </p>
                </div>
                <p className="mt-8 text-[25px] leading-[1.6] text-pretty text-ink-2">
                  이 논문도 그렇다. 왼쪽 문장들은 모두 오해하기 쉽지만 이 연구가{" "}
                  <strong className="font-semibold text-ink">
                    말하지 않은 것
                  </strong>
                  이다. 하나씩 ‘실제로는’을 확인해 보자.
                </p>
                <div className="mt-9 border-t border-line pt-6">
                  <p className="text-[19px] font-semibold text-ink-3">
                    ‘실제로는’ 칸에 나오는 답
                  </p>
                  <div className="mt-3.5 flex flex-wrap gap-2.5">
                    {VERDICTS.map((v) => (
                      <span
                        key={v}
                        className="rounded-full bg-tone-soft/40 px-4 py-1.5 text-[21px] font-semibold tracking-[-0.02em] text-tone-ink"
                      >
                        {v}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="mt-auto flex items-center gap-2.5 text-[19px] text-ink-3">
                  <MousePointerClick className="size-[21px]" />
                  왼쪽 문장을 클릭하거나 → 키를 누르면 ‘실제로는’이 드러납니다
                </p>
              </motion.div>
            ) : (
              <motion.div
                key={active}
                variants={detail}
                initial="hidden"
                animate="shown"
                exit="exit"
                className="flex h-full flex-col"
              >
                {/* 장식 번호 — 본문(relative 래퍼)보다 먼저 두어 항상 글자 뒤에 깔린다 */}
                {!MYTHS[active].figure ? (
                  <span
                    aria-hidden
                    className="pointer-events-none absolute right-[40px] bottom-[-44px] font-serif text-[250px] leading-none text-tone-soft/40 italic select-none"
                  >
                    {active + 1}
                  </span>
                ) : null}

                <div className="relative flex h-full flex-col">
                  <p className="text-[19px] font-semibold tracking-[0.02em] text-ink-3">
                    오해하기 쉬운 것{" "}
                    <span className="font-serif text-[22px] italic">
                      {active + 1}
                    </span>
                    <span className="text-ink-3/60"> / 9</span>
                  </p>
                  <p className="mt-2 text-[36px] leading-[1.35] font-bold tracking-[-0.03em] text-ink-2">
                    <span className="relative">
                      “{MYTHS[active].myth}”
                      <motion.span
                        aria-hidden
                        variants={strike}
                        className="absolute inset-x-0 top-[43%] h-[3px] origin-left rounded-full bg-tone/70"
                      />
                    </span>
                  </p>

                  <div className="mt-7 flex items-center gap-4">
                    <span className="text-[19px] font-semibold tracking-[0.08em] text-tone-ink">
                      실제로는
                    </span>
                    <span className="h-px flex-1 bg-line" />
                  </div>
                  <p className="mt-4 text-[44px] leading-[1.2] font-bold tracking-[-0.035em] text-tone-ink">
                    {MYTHS[active].verdict}
                  </p>
                  <p className="mt-5 text-[26px] leading-[1.65] text-pretty text-ink-2">
                    {MYTHS[active].body}
                  </p>

                  {MYTHS[active].figure ? (
                    <div className="mt-auto flex items-end gap-6 border-t border-line pt-5">
                      {MYTHS[active].figure.items.map((f, i) => (
                        <Fragment key={f.label}>
                          {i > 0 ? (
                            <span className="pb-[34px] text-[36px] leading-none text-ink-3/60">→</span>
                          ) : null}
                          <div className="flex flex-col">
                            <span
                              className={cn(
                                "font-serif text-[64px] leading-[0.95] tracking-[-0.02em] tabular",
                                f.focus ? "text-tone-ink" : "text-ink-3",
                              )}
                            >
                              {f.value}
                            </span>
                            <span
                              className={cn(
                                "mt-2 text-[19px] font-semibold tracking-[-0.01em]",
                                f.focus ? "text-tone-ink" : "text-ink-3",
                              )}
                            >
                              {f.label}
                            </span>
                          </div>
                        </Fragment>
                      ))}
                      <span className="ml-auto pb-[2px] text-[19px] text-ink-3">
                        {MYTHS[active].figure.caption}
                      </span>
                    </div>
                  ) : null}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Panel>
      </Reveal>
    </SlideFrame>
  );
}

export const notSaidSlide: SlideDef = {
  id: "conclusion-not-said",
  section: "conclusion",
  title: "이 연구가 말하지 않은 것",
  steps: 9,
  Component: NotSaid,
};
