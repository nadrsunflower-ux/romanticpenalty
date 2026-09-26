"use client";

import { useId } from "react";
import { motion } from "framer-motion";
import { ArrowLeftRight, Flower2, Rocket, UserRound, Users, Zap, type LucideIcon } from "lucide-react";
import type { SlideDef } from "@/components/deck/types";
import { Callout, Mark, Panel, Reveal, SlideFrame, Step, useStepShown } from "@/components/slide/primitives";
import { EASE_OUT } from "@/components/slide/motion";
import { cn } from "@/lib/utils";

/* 논문이 든 표현 (해설 2.1 표) */
const FOUNDER = [
  { ko: "야심 있다", en: "ambitious" },
  { ko: "자기주장이 강하다", en: "assertive" },
  { ko: "자신감 있다", en: "confident" },
];
const WOMAN = [
  { ko: "남을 잘 챙긴다", en: "nurturing" },
  { ko: "공감해 준다", en: "sympathetic" },
];

function RoleConflict() {
  const clash = useStepShown(2);

  return (
    <SlideFrame
      section="theory"
      kicker="2.1 첫 번째 이유 — ‘여자다움’과 ‘창업가다움’이 부딪힌다"
      title={
        <>
          ‘창업가다움’과 ‘여자다움’은 <Mark>방향이 반대</Mark>다
        </>
      }
      lead="직업마다, 성별마다 따라붙는 고정관념이 있다."
      bodyClassName="flex flex-col"
    >
      <div className="grid min-h-0 flex-1 grid-cols-[500px_1fr_500px]">
        <Reveal className="h-full">
          <TraitCard
            icon={Rocket}
            who="창업가"
            traits={FOUNDER}
            dirIcon={UserRound}
            dirLabel="모두 자기를 앞세우는 성질"
          />
        </Reveal>

        {/* 가운데 — 한 사람에게 둘 다 기대하면 부딪힌다 */}
        <div className="relative flex flex-col items-center justify-center">
          <Step at={1} kind="fade" className="absolute top-[18px] left-1/2 -translate-x-1/2">
            <span className="flex items-center gap-2 text-[20px] font-semibold whitespace-nowrap text-tone-ink">
              <ArrowLeftRight className="size-[22px]" strokeWidth={2.2} />
              방향이 반대
            </span>
          </Step>

          <div className="flex w-full items-center justify-center">
            <PushArrow dir="right" shown={clash} />
            <Reveal kind="pop" className="relative mx-2">
              {/* 충격파 — 한 번만 */}
              <motion.span
                aria-hidden
                initial={false}
                animate={clash ? { scale: [1, 1.55], opacity: [0.5, 0] } : { scale: 1, opacity: 0 }}
                transition={{ duration: 0.9, ease: "easeOut", delay: 0.5 }}
                className="absolute inset-0 rounded-full bg-tone"
              />
              <div
                className={cn(
                  "relative grid size-[132px] place-items-center rounded-full ring-1 transition-all duration-500",
                  clash
                    ? "bg-tone text-white shadow-[0_22px_40px_-16px_var(--tone)] ring-tone delay-300"
                    : "bg-surface text-ink-2 ring-line",
                )}
              >
                <UserRound className="size-[58px]" strokeWidth={1.6} />
              </div>
              <motion.span
                initial={false}
                animate={clash ? { scale: 1, opacity: 1, rotate: 0 } : { scale: 0.3, opacity: 0, rotate: -30 }}
                transition={{ duration: 0.45, ease: EASE_OUT, delay: clash ? 0.5 : 0 }}
                className="absolute -top-2 -right-3 grid size-[50px] place-items-center rounded-full bg-ink text-[#ffd84d] shadow-lg"
              >
                <Zap className="size-[26px] fill-current" strokeWidth={1.8} />
              </motion.span>
            </Reveal>
            <PushArrow dir="left" shown={clash} />
          </div>

          <Reveal kind="fade" className="mt-5 text-center">
            <p className="text-[22px] font-semibold tracking-[-0.02em] text-ink">여성 창업가</p>
            <p className="mt-1 text-[19px] text-ink-3">한 사람에게 둘 다 기대하면?</p>
          </Reveal>
        </div>

        <Reveal className="h-full">
          <TraitCard
            icon={Flower2}
            who="여성"
            traits={WOMAN}
            dirIcon={Users}
            dirLabel="모두 남을 앞세우는 성질"
          />
        </Reveal>
      </div>

      <Step at={2} className="mt-6">
        <Callout
          className="py-5"
          icon={<Zap />}
          title={
            <span>
              머릿속에서 충돌이 생긴다 — 심리학에서는 이것을{" "}
              <span className="rounded-[6px] bg-tone-soft px-2 py-0.5 text-[23px] font-bold">역할 부조화</span>
              라고 부른다
            </span>
          }
        >
          ‘사회가 <strong className="font-semibold text-ink">여자</strong>에게 기대하는 모습’과 ‘사회가{" "}
          <strong className="font-semibold text-ink">창업가</strong>에게 기대하는 모습’이 서로 어긋나는 것.
        </Callout>
      </Step>
    </SlideFrame>
  );
}

function TraitCard({
  icon: Icon,
  who,
  traits,
  dirIcon: DirIcon,
  dirLabel,
}: {
  icon: LucideIcon;
  who: string;
  traits: { ko: string; en: string }[];
  dirIcon: LucideIcon;
  dirLabel: string;
}) {
  return (
    <Panel className="flex h-full flex-col px-9 pt-7 pb-6">
      <div className="flex items-center gap-4">
        <span className="grid size-[52px] shrink-0 place-items-center rounded-[14px] bg-paper-2 text-ink-2">
          <Icon className="size-[27px]" strokeWidth={1.8} />
        </span>
        <p className="text-[32px] leading-none font-bold tracking-[-0.03em] text-ink">
          {who}
          <span className="ml-1 text-[20px] font-medium tracking-[-0.01em] text-ink-3">에게 기대하는 모습</span>
        </p>
      </div>

      <ul className="mt-4 flex flex-col">
        {traits.map((t) => (
          <li key={t.en} className="flex items-baseline justify-between gap-4 border-b border-line py-[9px]">
            <span className="text-[27px] font-semibold tracking-[-0.025em] text-ink">{t.ko}</span>
            <span className="font-serif text-[25px] text-ink-3 italic">{t.en}</span>
          </li>
        ))}
      </ul>

      <Step at={1} className="mt-auto pt-4">
        <span className="inline-flex items-center gap-2.5 rounded-full bg-tone-soft/70 py-2 pr-5 pl-4 text-[21px] font-semibold tracking-[-0.02em] text-tone-ink">
          <DirIcon className="size-[22px]" strokeWidth={2} />
          {dirLabel}
        </span>
      </Step>
    </Panel>
  );
}

/** 가운데로 밀고 들어오는 굵은 화살표 */
function PushArrow({ dir, shown }: { dir: "right" | "left"; shown: boolean }) {
  const gid = useId();
  return (
    <motion.div
      aria-hidden
      initial={false}
      animate={shown ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
      transition={{ duration: 0.55, ease: EASE_OUT }}
      className={cn("h-[30px] w-[88px] shrink-0", dir === "right" ? "origin-left" : "origin-right")}
    >
      <svg viewBox="0 0 88 30" className={cn("size-full overflow-visible", dir === "left" && "-scale-x-100")}>
        <defs>
          <linearGradient id={gid} x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" style={{ stopColor: "var(--tone)", stopOpacity: 0.12 }} />
            <stop offset="1" style={{ stopColor: "var(--tone)", stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <path d="M0 10 H64 V1 L88 15 L64 29 V20 H0 Z" fill={`url(#${gid})`} />
      </svg>
    </motion.div>
  );
}

export const roleConflictSlide: SlideDef = {
  id: "theory-role-conflict",
  section: "theory",
  title: "여자다움 vs 창업가다움",
  steps: 2,
  Component: RoleConflict,
};
