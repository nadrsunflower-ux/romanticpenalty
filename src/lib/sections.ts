export type Tone = "red" | "yellow" | "green" | "blue" | "purple";

export type SectionKey =
  | "cover"
  | "question"
  | "theory"
  | "method"
  | "result"
  | "conclusion";

export type SectionMeta = {
  no: string;
  label: string;
  en: string;
  tone: Tone;
};

/**
 * 섹션 색은 초록(Abstract) 하이라이트 색과 1:1로 대응한다.
 * 빨강=서론/질문, 노랑=이론, 초록=방법론, 파랑=결과, 보라=결론
 */
export const SECTIONS: Record<SectionKey, SectionMeta> = {
  cover: { no: "00", label: "논문 개요", en: "Overview", tone: "red" },
  question: { no: "01", label: "이 연구가 던진 질문", en: "Question", tone: "red" },
  theory: { no: "02", label: "이론적 배경", en: "Theory", tone: "yellow" },
  method: { no: "03", label: "방법론", en: "Method", tone: "green" },
  result: { no: "04", label: "결과", en: "Findings", tone: "blue" },
  conclusion: { no: "05", label: "결론", en: "Conclusion", tone: "purple" },
};

/** Tailwind 정적 클래스 — 동적 조합 대신 이 맵을 쓴다 */
export const TONE_CLASS: Record<
  Tone,
  { soft: string; strong: string; ink: string; bgStrong: string; border: string }
> = {
  red: { soft: "bg-hl-red", strong: "text-c-red", ink: "text-d-red", bgStrong: "bg-c-red", border: "border-c-red" },
  yellow: { soft: "bg-hl-yellow", strong: "text-c-yellow", ink: "text-d-yellow", bgStrong: "bg-c-yellow", border: "border-c-yellow" },
  green: { soft: "bg-hl-green", strong: "text-c-green", ink: "text-d-green", bgStrong: "bg-c-green", border: "border-c-green" },
  blue: { soft: "bg-hl-blue", strong: "text-c-blue", ink: "text-d-blue", bgStrong: "bg-c-blue", border: "border-c-blue" },
  purple: { soft: "bg-hl-purple", strong: "text-c-purple", ink: "text-d-purple", bgStrong: "bg-c-purple", border: "border-c-purple" },
};
