import type { SlideDef } from "@/components/deck/types";
import { resultPartASlides } from "./part-a";
import { resultPartBSlides } from "./part-b";

/** part-a: 4.1–4.2 · part-b: 4.3–4.4 */
export const resultSlides: SlideDef[] = [...resultPartASlides, ...resultPartBSlides];
