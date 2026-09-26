import type { SlideDef } from "@/components/deck/types";
import { whyExperimentSlide } from "./01-why-experiment";
import { twinProfilesSlide } from "./02-twin-profiles";
import { limitsEthicsSlide } from "./03-limits-ethics";
import { exp1Slide } from "./04-exp1";
import { exp2Slide } from "./05-exp2";
import { exp3Slide } from "./06-exp3";

/** 03 방법론 — 3.1 관찰 대신 실험 → 3.2 쌍둥이 프로필·한계 → 3.3 세 번의 실험 */
export const methodSlides: SlideDef[] = [
  whyExperimentSlide,
  twinProfilesSlide,
  limitsEthicsSlide,
  exp1Slide,
  exp2Slide,
  exp3Slide,
];
