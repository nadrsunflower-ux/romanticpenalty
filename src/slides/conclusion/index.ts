import type { SlideDef } from "@/components/deck/types";
import { findingsSlide } from "./01-findings";
import { hiddenCostSlide } from "./02-hidden-cost";
import { firstMessageSlide } from "./03-first-message";
import { notSaidSlide } from "./04-not-said";
import { questionsSlide } from "./05-questions";

export const conclusionSlides: SlideDef[] = [
  findingsSlide,
  hiddenCostSlide,
  firstMessageSlide,
  notSaidSlide,
  questionsSlide,
];
