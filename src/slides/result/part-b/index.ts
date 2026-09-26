import type { SlideDef } from "@/components/deck/types";
import { busySlide } from "./01-busy";
import { twoReadingsSlide } from "./02-two-readings";
import { impressionsSlide } from "./03-impressions";
import { voicesSlide } from "./04-voices";
import { caveatsSlide } from "./05-caveats";

/** 04 결과 뒷부분 — 4.3 바빠 보여서? · 4.4 남성들의 속마음 */
export const resultPartBSlides: SlideDef[] = [
  busySlide,
  twoReadingsSlide,
  impressionsSlide,
  voicesSlide,
  caveatsSlide,
];
