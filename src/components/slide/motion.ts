import type { Transition, Variants } from "framer-motion";

export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/** 슬라이드 전환 — 방향(dir: 1 | -1)에 따라 좌우로 살짝 밀린다 */
export const slideVariants: Variants = {
  enter: (dir: number) => ({ opacity: 0, x: 48 * dir }),
  center: {
    opacity: 1,
    x: 0,
    transition: {
      opacity: { duration: 0.45, ease: EASE_OUT },
      x: { duration: 0.6, ease: EASE_OUT },
      staggerChildren: 0.07,
      delayChildren: 0.12,
    },
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: -32 * dir,
    transition: { duration: 0.28, ease: "easeIn" },
  }),
};

/**
 * 슬라이드 진입 시 순서대로 떠오르는 요소.
 * <Reveal> 이 이 variants를 쓴다 — 부모(슬라이드)의 stagger를 상속받는다.
 */
export const revealVariants: Variants = {
  enter: { opacity: 0, y: 22 },
  center: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
};

export const revealFadeVariants: Variants = {
  enter: { opacity: 0 },
  center: { opacity: 1, transition: { duration: 0.8, ease: EASE_OUT } },
};

/** 빌드 단계(Step)용 */
export const stepVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  shown: { opacity: 1, y: 0 },
};

export const stepTransition: Transition = { duration: 0.55, ease: EASE_OUT };
