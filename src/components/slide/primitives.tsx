"use client";

import type { ComponentProps, ReactNode } from "react";
import { motion, type HTMLMotionProps, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { SECTIONS, type SectionKey, type Tone } from "@/lib/sections";
import { useSlide } from "@/components/deck/slide-context";
import { Badge } from "@/components/ui/badge";
import { EASE_OUT, stepTransition } from "./motion";

/* ────────────────────────────────────────────────────────────
 * 변형(variants) — enter/center 는 슬라이드 진입, hidden/shown 은 빌드 단계.
 * 두 이름을 모두 정의해 두어야 Step 안의 Reveal/Mark 도 정상적으로 나타난다.
 * ──────────────────────────────────────────────────────────── */
const rise: Variants = {
  enter: { opacity: 0, y: 22 },
  hidden: { opacity: 0, y: 22 },
  center: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
  shown: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
};

const fade: Variants = {
  enter: { opacity: 0 },
  hidden: { opacity: 0 },
  center: { opacity: 1, transition: { duration: 0.8, ease: EASE_OUT } },
  shown: { opacity: 1, transition: { duration: 0.8, ease: EASE_OUT } },
};

const pop: Variants = {
  enter: { opacity: 0, scale: 0.94 },
  hidden: { opacity: 0, scale: 0.94 },
  center: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASE_OUT } },
  shown: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASE_OUT } },
};

const REVEAL_KINDS = { rise, fade, pop } as const;

/**
 * 슬라이드가 열릴 때 순서대로(stagger) 떠오르는 블록.
 * 문서 순서대로 0.07s 간격으로 등장한다.
 */
export function Reveal({
  kind = "rise",
  className,
  ...props
}: HTMLMotionProps<"div"> & { kind?: keyof typeof REVEAL_KINDS }) {
  return <motion.div variants={REVEAL_KINDS[kind]} className={className} {...props} />;
}

/**
 * 빌드 단계. 발표 중 → / Space 를 누르면 at 번째 단계에서 나타난다.
 * (슬라이드 정의의 steps 값이 이 컴포넌트들의 최대 at 과 같아야 한다)
 */
export function Step({
  at,
  className,
  kind = "rise",
  children,
  ...props
}: Omit<HTMLMotionProps<"div">, "animate" | "initial"> & {
  at: number;
  kind?: keyof typeof REVEAL_KINDS;
}) {
  const { step } = useSlide();
  const shown = step >= at;
  return (
    <motion.div
      initial={false}
      animate={shown ? "shown" : "hidden"}
      variants={REVEAL_KINDS[kind]}
      transition={stepTransition}
      aria-hidden={!shown}
      className={cn(!shown && "pointer-events-none", className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/** 현재 단계가 at 이상인지 — 조건부 스타일링에 쓴다 */
export function useStepShown(at: number) {
  const { step } = useSlide();
  return step >= at;
}

/* ────────────────────────────────────────────────────────────
 * 레이아웃
 * ──────────────────────────────────────────────────────────── */

/**
 * 표준 슬라이드 프레임 (1600×900 캔버스 기준).
 *  - 상단: 섹션 태그 + kicker(소제목 번호 등)
 *  - 제목(title), 선택적 리드 문장(lead)
 *  - 본문(children)은 남은 높이를 채운다 (flex-1)
 * 바닥글·페이지 번호·진행 막대는 덱이 그린다 (하단 72px 비워 둠).
 */
export function SlideFrame({
  section,
  kicker,
  title,
  lead,
  children,
  className,
  bodyClassName,
}: {
  section: SectionKey;
  kicker?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  const meta = SECTIONS[section];
  return (
    <div
      data-tone={meta.tone}
      className={cn("absolute inset-0 flex flex-col px-[104px] pt-[64px] pb-[96px]", className)}
    >
      <Reveal kind="fade" className="flex items-center gap-4">
        <SectionTag section={section} />
        {kicker ? (
          <span className="text-[19px] font-medium tracking-[-0.01em] text-ink-3">{kicker}</span>
        ) : null}
      </Reveal>

      <Reveal className="mt-6">
        <h2 className="max-w-[1320px] text-[52px] leading-[1.2] font-bold tracking-[-0.035em] text-balance text-ink">
          {title}
        </h2>
      </Reveal>

      {lead ? (
        <Reveal className="mt-5">
          <p className="max-w-[1180px] text-[24px] leading-[1.6] text-pretty text-ink-2">{lead}</p>
        </Reveal>
      ) : null}

      <div className={cn("relative mt-10 min-h-0 flex-1", bodyClassName)}>{children}</div>
    </div>
  );
}

/** 섹션 번호 + 이름 알약 */
export function SectionTag({ section, className }: { section: SectionKey; className?: string }) {
  const meta = SECTIONS[section];
  return (
    <span
      data-tone={meta.tone}
      className={cn(
        "inline-flex h-[38px] items-center gap-2.5 rounded-full bg-tone-soft/70 pr-4 pl-3 text-[17px] font-semibold tracking-[-0.01em] text-tone-ink",
        className,
      )}
    >
      <span className="font-serif text-[21px] leading-none italic">{meta.no}</span>
      <span className="h-3.5 w-px bg-tone-ink/25" />
      {meta.label}
    </span>
  );
}

/* ────────────────────────────────────────────────────────────
 * 텍스트 요소
 * ──────────────────────────────────────────────────────────── */

const MARK_BG: Record<Tone, string> = {
  red: "#ffc0c0",
  yellow: "#ffe89a",
  green: "#b1ebcf",
  blue: "#b1c7e6",
  purple: "#cdb8f8",
};

const markVariants: Variants = {
  enter: { backgroundSize: "0% 100%" },
  hidden: { backgroundSize: "0% 100%" },
  center: { backgroundSize: "100% 100%", transition: { duration: 0.9, ease: EASE_OUT, delay: 0.35 } },
  shown: { backgroundSize: "100% 100%", transition: { duration: 0.9, ease: EASE_OUT, delay: 0.2 } },
};

/**
 * 형광펜 강조 — 슬라이드 진입 시 왼→오로 칠해진다.
 *  - variant="marker"(기본): 글자 아래쪽 절반만 칠하는 마커 느낌 (제목·큰 글씨용)
 *  - variant="block": 초록 슬라이드처럼 글줄 전체를 칠함 (본문용)
 */
export function Mark({
  tone,
  children,
  className,
  variant = "marker",
}: {
  /** 생략하면 현재 섹션 색 */
  tone?: Tone;
  children: ReactNode;
  className?: string;
  variant?: "marker" | "block";
}) {
  const c = tone ? MARK_BG[tone] : "var(--tone-soft)";
  const image =
    variant === "marker"
      ? `linear-gradient(to bottom, transparent 0%, transparent 50%, ${c} 50%, ${c} 92%, transparent 92%)`
      : `linear-gradient(${c}, ${c})`;
  return (
    <motion.mark
      variants={markVariants}
      className={cn(
        "box-clone bg-no-repeat text-inherit",
        variant === "block" ? "rounded-[4px] px-[0.12em]" : "px-[0.04em]",
        className,
      )}
      style={{ backgroundImage: image, backgroundColor: "transparent", backgroundPosition: "0 0" }}
    >
      {children}
    </motion.mark>
  );
}

/** 굵은 강조 (섹션 딥 컬러) */
export function Em({ children, className }: { children: ReactNode; className?: string }) {
  return <strong className={cn("font-semibold text-tone-ink", className)}>{children}</strong>;
}

/** 본문 문단 — 기본 26px */
export function Body({ className, ...props }: ComponentProps<"p">) {
  return (
    <p className={cn("text-[26px] leading-[1.65] text-pretty text-ink-2", className)} {...props} />
  );
}

/** 작은 설명/캡션 — 20px */
export function Caption({ className, ...props }: ComponentProps<"p">) {
  return <p className={cn("text-[20px] leading-[1.55] text-ink-3", className)} {...props} />;
}

/** 소제목 라벨 (영문 대문자 느낌의 작은 머리표) */
export function Eyebrow({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      className={cn("text-[17px] font-semibold tracking-[0.08em] text-tone-ink uppercase", className)}
      {...props}
    />
  );
}

/* ────────────────────────────────────────────────────────────
 * 블록 요소
 * ──────────────────────────────────────────────────────────── */

/** 흰 종이 카드 */
export function Panel({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "rounded-[22px] bg-surface p-9 shadow-[0_1px_0_rgba(23,22,28,0.04),0_12px_32px_-18px_rgba(23,22,28,0.18)] ring-1 ring-line",
        className,
      )}
      {...props}
    />
  );
}

/** 주석·주의 박스. 좌측에 섹션 색 막대. */
export function Callout({
  icon,
  title,
  children,
  className,
  tone,
}: {
  icon?: ReactNode;
  title?: ReactNode;
  children: ReactNode;
  className?: string;
  tone?: Tone;
}) {
  return (
    <div
      data-tone={tone}
      className={cn(
        "relative overflow-hidden rounded-[18px] bg-tone-soft/35 py-6 pr-8 pl-9 ring-1 ring-tone/15",
        className,
      )}
    >
      <span className="absolute inset-y-0 left-0 w-[6px] bg-tone" />
      {title ? (
        <p className="flex items-center gap-2.5 text-[21px] font-semibold text-tone-ink [&_svg]:size-[22px]">
          {icon}
          {title}
        </p>
      ) : null}
      <div className={cn("text-[22px] leading-[1.6] text-pretty text-ink-2", title && "mt-2")}>
        {children}
      </div>
    </div>
  );
}

/** 큰 따옴표 인용 — 사람들의 속마음/짐작을 보여줄 때 */
export function Quote({
  children,
  by,
  className,
}: {
  children: ReactNode;
  by?: ReactNode;
  className?: string;
}) {
  return (
    <figure className={cn("relative pl-[76px]", className)}>
      <span
        aria-hidden
        className="absolute top-[-34px] left-0 font-serif text-[150px] leading-none text-tone/45 select-none"
      >
        “
      </span>
      <blockquote className="text-[36px] leading-[1.45] font-semibold tracking-[-0.025em] text-balance text-ink">
        {children}
      </blockquote>
      {by ? <figcaption className="mt-4 text-[20px] text-ink-3">{by}</figcaption> : null}
    </figure>
  );
}

/** 큰 숫자 + 라벨 */
export function Stat({
  value,
  label,
  note,
  className,
  valueClassName,
}: {
  value: ReactNode;
  label: ReactNode;
  note?: ReactNode;
  className?: string;
  valueClassName?: string;
}) {
  return (
    <div className={cn("flex flex-col", className)}>
      <span
        className={cn(
          "font-serif text-[104px] leading-[0.95] tracking-[-0.02em] text-tone-ink tabular",
          valueClassName,
        )}
      >
        {value}
      </span>
      <span className="mt-3 text-[22px] font-semibold text-ink">{label}</span>
      {note ? <span className="mt-1 text-[19px] leading-[1.5] text-ink-3">{note}</span> : null}
    </div>
  );
}

/** 번호 동그라미 */
export function NumberDot({
  n,
  className,
  solid,
}: {
  n: ReactNode;
  className?: string;
  solid?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-grid size-[44px] shrink-0 place-items-center rounded-full font-serif text-[24px] leading-none italic",
        solid ? "bg-tone text-white" : "bg-tone-soft/80 text-tone-ink",
        className,
      )}
    >
      {n}
    </span>
  );
}

/** 작은 라벨 알약 (shadcn Badge 기반). tone 을 주면 해당 색, 없으면 현재 섹션 색 */
export function Chip({
  children,
  className,
  tone,
  variant = "soft",
}: {
  children: ReactNode;
  className?: string;
  tone?: Tone;
  variant?: "soft" | "solid" | "outline";
}) {
  return (
    <Badge
      data-tone={tone}
      variant="outline"
      className={cn(
        "h-auto rounded-full border-transparent px-3.5 py-1 text-[17px] leading-[1.35] font-semibold tracking-[-0.01em] whitespace-nowrap",
        variant === "soft" && "bg-tone-soft/75 text-tone-ink",
        variant === "solid" && "bg-tone text-white",
        variant === "outline" && "border-ink/20 bg-transparent text-ink-2",
        className,
      )}
    >
      {children}
    </Badge>
  );
}

/**
 * 통계적 유의성 표시 — 해설 문서의 표현을 그대로 쓴다.
 *  significant=true  → "우연으로 보기 어려운 차이"
 *  significant=false → "우연으로도 생길 수 있는 범위"
 */
export function SigBadge({
  significant,
  className,
  children,
}: {
  significant: boolean;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <Chip variant={significant ? "solid" : "outline"} className={className}>
      {children ?? (significant ? "우연으로 보기 어려운 차이" : "우연으로도 생길 수 있는 범위")}
    </Chip>
  );
}
