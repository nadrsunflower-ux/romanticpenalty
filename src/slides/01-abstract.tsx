"use client";

import type { MouseEvent, ReactNode } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ChevronDown, MousePointerClick } from "lucide-react";
import type { SlideDef } from "@/components/deck/types";
import { useSlide } from "@/components/deck/slide-context";
import { Reveal, SectionTag } from "@/components/slide/primitives";
import { EASE_OUT } from "@/components/slide/motion";
import { cn } from "@/lib/utils";

/* ────────────────────────────────────────────────────────────
 * 형광펜 5색 — 초록.png 에서 추출한 색 그대로 (노랑만 투사 환경을 고려해 아주 약간 진하게)
 * ──────────────────────────────────────────────────────────── */
type Highlight = {
  label: string;
  base: string; // 기본 형광펜 색
  active: string; // 선택 시 조금 더 진한 색
  strong: string; // 밑줄·칩 색
  ink: string; // 제목 글자색
  heading?: string;
  body?: ReactNode;
  list?: string[];
};

const HIGHLIGHTS: Highlight[] = [
  {
    label: "서론",
    base: "#ffc0c0",
    active: "#ffa3a3",
    strong: "#e0464e",
    ink: "#8f1d24",
    heading: "왜 이 연구를 하는가?",
    body: "여성 창업이 점점 더 보편화되고 있지만, 그것이 가족 형성에 함의를 지니는 중요한 결과인 여성의 연애 전망에 어떤 영향을 미치는지에 대해 알려진 바가 거의 없다.",
  },
  {
    label: "이론적인 배경",
    base: "#fff0ba",
    active: "#ffe07a",
    strong: "#d99a00",
    ink: "#6b4b00",
    body: "우리는 여성 창업가(특히 성장지향형 벤처)가 연애 전망의 저하에 직면하고 있으며, 이는 잠재적으로 젠더화된 특성 추론과 시간 요구에 대한 우려에 의해 형성된다고 생각한다.",
  },
  {
    label: "방법론",
    base: "#b1ebcf",
    active: "#8adfb7",
    strong: "#1e9e6a",
    ink: "#0e5638",
    heading: "양적 연구",
    body: "설문 실험으로 보완된 두 건의 현장실험",
  },
  {
    label: "결과",
    base: "#b1c7e6",
    active: "#93b1df",
    strong: "#3767b8",
    ink: "#1c3c75",
    list: [
      "여성 창업가가 평균적으로 연애 관계 형성에서 불이익을 받되, 남성 창업가로부터는 오히려 선호된다.",
      "이 연애 페널티의 기저에 있는 메커니즘에 대한 증거를 발견하였다.",
    ],
  },
  {
    label: "결론 (연구 의의)",
    base: "#cdb8f8",
    active: "#b99ef5",
    strong: "#7650da",
    ink: "#43278f",
    list: [
      "창업 연구에서의 가족 배태성 관점을 확장하였다.",
      "연애 페널티를 그동안 충분히 탐구되지 않은 도전 과제로 기록함으로써 여성 창업 연구에 기여하였다.",
    ],
  },
];

/* 초록 원문 — hl 은 HIGHLIGHTS 인덱스, order 는 칠해지는 순서 */
type Segment = string | { hl: number; order: number; text: string };

const ABSTRACT: Segment[] = [
  {
    hl: 0,
    order: 0,
    text: "Female entrepreneurship is increasingly common, yet we know little about how it affects women’s romantic prospects, a crucial outcome with implications for family formation.",
  },
  " We propose that ",
  {
    hl: 1,
    order: 1,
    text: "female entrepreneurs, particularly those pursuing growth-oriented ventures, face diminished romantic prospects, potentially shaped by gendered trait inferences and concerns about time demand.",
  },
  " ",
  { hl: 2, order: 2, text: "Using two field experiments, supplemented by a survey experiment," },
  " we provide ",
  {
    hl: 3,
    order: 3,
    text: "causal evidence that female entrepreneurs are on average penalized in romantic relationship initiation, but are preferred by male entrepreneurs.",
  },
  " Further analysis offers ",
  { hl: 3, order: 4, text: "suggestive evidence on mechanisms underlying this romantic penalty." },
  " By examining the impact of female entrepreneurship on romantic prospects, our study ",
  { hl: 4, order: 5, text: "extends the family embeddedness perspective in entrepreneurship research." },
  " It also contributes ",
  {
    hl: 4,
    order: 6,
    text: "to female entrepreneurship research by documenting a romantic penalty as a previously underexplored challenge.",
  },
];

/**
 * 형광펜이 왼→오로 칠해지는 효과:
 * background-color 는 형광펜 색, 그 위를 흰 덮개(gradient)가 오른쪽으로 걷히며 드러난다.
 * (background-color 는 CSS transition 으로 선택 상태 변화도 부드럽게 처리)
 */
const sweep = (order: number): Variants => ({
  enter: { backgroundSize: "100% 100%" },
  center: {
    backgroundSize: "0% 100%",
    transition: { duration: 0.75, ease: EASE_OUT, delay: 0.55 + order * 0.2 },
  },
});

function Abstract() {
  const { step, setStep } = useSlide();
  const active = step > 0 ? step - 1 : null;

  const toggle = (i: number) => setStep(active === i ? 0 : i + 1);

  return (
    <div className="absolute inset-0 flex flex-col px-[104px] pt-[56px] pb-[92px]" data-tone="red">
      <Reveal kind="fade" className="flex items-center gap-4">
        <SectionTag section="cover" />
        <span className="text-[19px] font-medium text-ink-3">초록 · 형광펜 문장이 논문의 뼈대입니다</span>
      </Reveal>

      <div className="mt-7 flex min-h-0 flex-1 gap-9">
        {/* ── 초록 원문 (논문 PDF 스타일의 흰 종이) ───────────── */}
        <Reveal className="relative w-[930px] shrink-0">
          <div className="h-full rounded-[6px] bg-white px-[46px] pt-[38px] pb-[34px] shadow-[0_1px_2px_rgba(23,22,28,0.06),0_24px_48px_-24px_rgba(23,22,28,0.28)] ring-1 ring-black/[0.06]">
            <p className="font-text-serif text-[19px] tracking-[0.42em] text-ink">ABSTRACT</p>
            <div className="mt-4 mb-5 h-px bg-ink/45" />
            <p
              lang="en"
              className="text-justify font-text-serif text-[23.5px] leading-[1.72] text-[#1a1a1a] hyphens-auto"
              style={{ wordBreak: "normal" }}
            >
              {ABSTRACT.map((seg, i) => {
                if (typeof seg === "string") return <span key={i}>{seg}</span>;
                const h = HIGHLIGHTS[seg.hl];
                const isActive = active === seg.hl;
                const dimmed = active !== null && !isActive;
                return (
                  <motion.span
                    key={i}
                    role="button"
                    aria-pressed={isActive}
                    aria-label={`${h.label} 설명 보기`}
                    onClick={() => toggle(seg.hl)}
                    variants={sweep(seg.order)}
                    className="box-clone cursor-pointer rounded-[3px] bg-no-repeat px-[3px] py-[1px] transition-[background-color,box-shadow,color] duration-300 hover:brightness-[0.97]"
                    style={{
                      backgroundImage: "linear-gradient(#fff, #fff)",
                      backgroundPosition: "100% 0",
                      backgroundColor: isActive ? h.active : dimmed ? `${h.base}73` : h.base,
                      boxShadow: isActive ? `inset 0 -3px 0 ${h.strong}` : "inset 0 0 0 transparent",
                      color: dimmed ? "#1a1a1a99" : undefined,
                    }}
                  >
                    {seg.text}
                  </motion.span>
                );
              })}
            </p>
          </div>
        </Reveal>

        {/* ── 설명 패널 (아코디언) ─────────────────────────── */}
        <div className="flex min-w-0 flex-1 flex-col">
          <Reveal kind="fade" className="flex items-center gap-2.5 pb-4 text-[18px] text-ink-3">
            <MousePointerClick className="size-[21px]" />
            형광펜 문장을 클릭하면 설명이 펼쳐집니다
          </Reveal>
          <div className="flex flex-col gap-2.5">
            {HIGHLIGHTS.map((h, i) => (
              <ExplainRow key={h.label} h={h} index={i} open={active === i} onToggle={() => toggle(i)} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ExplainRow({
  h,
  index,
  open,
  onToggle,
}: {
  h: Highlight;
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    onToggle();
    e.currentTarget.blur();
  };

  return (
    <Reveal
      className={cn(
        "overflow-hidden rounded-[16px] transition-[background-color,box-shadow] duration-300",
        open ? "bg-white shadow-[0_18px_40px_-22px_rgba(23,22,28,0.35)]" : "bg-surface/60",
      )}
      style={{ boxShadow: open ? `inset 0 0 0 1.5px ${h.strong}33, 0 18px 40px -22px rgba(23,22,28,0.35)` : undefined }}
    >
      <button
        type="button"
        onClick={onClick}
        aria-expanded={open}
        className="flex w-full items-center gap-4 px-5 py-[15px] text-left"
      >
        <span
          className="grid size-[34px] shrink-0 place-items-center rounded-[9px] font-serif text-[20px] italic transition-colors duration-300"
          style={{ backgroundColor: open ? h.active : h.base, color: h.ink }}
        >
          {index + 1}
        </span>
        <span
          className="flex-1 text-[23px] font-semibold tracking-[-0.02em] transition-colors duration-300"
          style={{ color: open ? h.ink : "#45434d" }}
        >
          {h.label}
        </span>
        <motion.span
          initial={false}
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.35, ease: EASE_OUT }}
          className="text-ink-3"
        >
          <ChevronDown className="size-[22px]" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE_OUT }}
          >
            <div className="px-6 pt-1 pb-6">
              <div className="mb-4 h-[3px] w-12 rounded-full" style={{ backgroundColor: h.strong }} />
              {h.heading ? (
                <p className="mb-2.5 text-[23px] leading-[1.4] font-bold tracking-[-0.025em]" style={{ color: h.ink }}>
                  {h.heading}
                </p>
              ) : null}
              {h.body ? <p className="text-[21.5px] leading-[1.62] text-ink-2">{h.body}</p> : null}
              {h.list ? (
                <ol className="flex flex-col gap-3">
                  {h.list.map((item, k) => (
                    <li key={k} className="flex gap-3 text-[21.5px] leading-[1.58] text-ink-2">
                      <span
                        className="mt-[3px] grid size-[26px] shrink-0 place-items-center rounded-full text-[15px] font-bold text-white"
                        style={{ backgroundColor: h.strong }}
                      >
                        {k + 1}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ol>
              ) : null}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </Reveal>
  );
}

export const abstractSlide: SlideDef = {
  id: "abstract",
  section: "cover",
  title: "초록 (Abstract)",
  steps: 5,
  Component: Abstract,
};
