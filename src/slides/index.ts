import type { SlideDef } from "@/components/deck/types";
import { coverSlide } from "./00-cover";
import { abstractSlide } from "./01-abstract";
import { questionSlides } from "./question";
import { theorySlides } from "./theory";
import { methodSlides } from "./method";
import { resultSlides } from "./result";
import { conclusionSlides } from "./conclusion";
import { closingSlide } from "./99-closing";

export const slides: SlideDef[] = [
  coverSlide,
  abstractSlide,
  ...questionSlides,
  ...theorySlides,
  ...methodSlides,
  ...resultSlides,
  ...conclusionSlides,
  closingSlide,
];
