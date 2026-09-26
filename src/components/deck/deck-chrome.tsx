"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, LayoutGrid, Maximize } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Kbd } from "@/components/ui/kbd";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { SECTIONS, TONE_CLASS, type SectionKey } from "@/lib/sections";
import { EASE_OUT } from "@/components/slide/motion";
import type { SlideDef } from "./types";

const pad = (n: number) => String(n).padStart(2, "0");

/* ── 바닥글: 서지 정보 · 쪽 번호 · 섹션 색 진행 막대 ───────── */
export function DeckFooter({
  slides,
  index,
  step,
  hidden,
}: {
  slides: SlideDef[];
  index: number;
  step: number;
  hidden: boolean;
}) {
  const current = slides[index];
  const meta = SECTIONS[current.section];
  const steps = current.steps ?? 0;

  return (
    <motion.div
      initial={false}
      animate={{ opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.4 }}
      className="pointer-events-none absolute inset-x-0 bottom-0 z-40 h-[72px]"
      data-tone={meta.tone}
    >
      <div className="absolute inset-x-[104px] bottom-[26px] flex items-center justify-between text-[15px] text-ink-3">
        <span className="tracking-[-0.005em]">
          <span className="font-serif text-[18px] text-ink-2 italic">A Romantic Penalty?</span>
          <span className="mx-2 text-line">|</span>
          Tong, Li &amp; Park (2026), <span className="italic">Journal of Business Venturing</span>
        </span>
        <span className="flex items-center gap-4">
          {steps > 0 ? (
            <span className="flex items-center gap-[5px]" aria-label={`빌드 ${step}/${steps}`}>
              {Array.from({ length: steps }, (_, i) => (
                <span
                  key={i}
                  className={cn(
                    "size-[7px] rounded-full transition-colors duration-300",
                    i < step ? "bg-tone" : "bg-ink/12",
                  )}
                />
              ))}
            </span>
          ) : null}
          <span className="tabular flex items-baseline gap-1.5">
            <span className="font-serif text-[21px] text-ink">{pad(index + 1)}</span>
            <span className="text-ink-3/70">/</span>
            <span>{pad(slides.length)}</span>
          </span>
        </span>
      </div>

      {/* 섹션 색으로 칠해지는 진행 막대 */}
      <div className="absolute inset-x-0 bottom-0 flex h-[6px]">
        {slides.map((s, i) => {
          const tone = TONE_CLASS[SECTIONS[s.section].tone];
          return (
            <span
              key={s.id}
              className={cn(
                "h-full flex-1 transition-colors duration-500",
                i < index ? tone.soft : i === index ? tone.bgStrong : "bg-paper-2",
              )}
            />
          );
        })}
      </div>
    </motion.div>
  );
}

/* ── 마우스를 움직이면 나타나는 조작 버튼 ─────────────────── */
export function DeckControls({
  onPrev,
  onNext,
  onOverview,
  onFullscreen,
  canPrev,
  canNext,
}: {
  onPrev: () => void;
  onNext: () => void;
  onOverview: () => void;
  onFullscreen: () => void;
  canPrev: boolean;
  canNext: boolean;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const show = () => {
      setVisible(true);
      clearTimeout(timer);
      timer = setTimeout(() => setVisible(false), 2400);
    };
    window.addEventListener("mousemove", show);
    return () => {
      window.removeEventListener("mousemove", show);
      clearTimeout(timer);
    };
  }, []);

  // 클릭 후 포커스를 풀어 Space/Enter 가 버튼을 다시 누르지 않게 한다
  const run = (fn: () => void) => (e: MouseEvent<HTMLButtonElement>) => {
    fn();
    e.currentTarget.blur();
  };

  const btn =
    "size-[44px] rounded-full text-paper/85 hover:bg-white/12 hover:text-paper disabled:opacity-30 [&_svg:not([class*='size-'])]:size-[22px]";

  const items = [
    { label: "이전", keys: ["←"], icon: <ChevronLeft />, onClick: onPrev, disabled: !canPrev },
    { label: "슬라이드 목록", keys: ["G"], icon: <LayoutGrid />, onClick: onOverview },
    { label: "전체 화면", keys: ["F"], icon: <Maximize />, onClick: onFullscreen },
    { label: "다음", keys: ["→"], icon: <ChevronRight />, onClick: onNext, disabled: !canNext },
  ];

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-[14px] z-50 flex justify-center">
      <motion.div
        initial={false}
        animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 10 }}
        transition={{ duration: 0.3, ease: EASE_OUT }}
        className={cn(
          "flex items-center gap-1 rounded-full bg-ink/88 p-1.5 shadow-[0_12px_30px_-10px_rgba(0,0,0,0.5)]",
          visible ? "pointer-events-auto" : "pointer-events-none",
        )}
      >
        {items.map((it) => (
          <Tooltip key={it.label}>
            <TooltipTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon-lg"
                  className={btn}
                  onClick={run(it.onClick)}
                  disabled={it.disabled}
                  aria-label={it.label}
                />
              }
            >
              {it.icon}
            </TooltipTrigger>
            <TooltipContent side="top" sideOffset={10}>
              {it.label}
              {it.keys.map((k) => (
                <Kbd key={k}>{k}</Kbd>
              ))}
            </TooltipContent>
          </Tooltip>
        ))}
      </motion.div>
    </div>
  );
}

/* ── 슬라이드 목록 (G / O) ─────────────────────────────── */
const ORDER: SectionKey[] = ["cover", "question", "theory", "method", "result", "conclusion"];

export function DeckOverview({
  open,
  onOpenChange,
  slides,
  current,
  onSelect,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  slides: SlideDef[];
  current: number;
  onSelect: (index: number) => void;
}) {
  const groups = ORDER.map((key) => ({
    key,
    meta: SECTIONS[key],
    items: slides.map((s, i) => ({ s, i })).filter(({ s }) => s.section === key),
  })).filter((g) => g.items.length > 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[86vh] overflow-y-auto bg-surface p-8 sm:max-w-[980px]">
        <DialogHeader>
          <DialogTitle className="text-[22px] font-bold tracking-[-0.02em]">슬라이드 목록</DialogTitle>
          <DialogDescription className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px]">
            <span className="flex items-center gap-1.5">
              <Kbd>←</Kbd>
              <Kbd>→</Kbd> 이동 · <Kbd>Space</Kbd> 다음 단계
            </span>
            <span className="flex items-center gap-1.5">
              <Kbd>Shift</Kbd>+<Kbd>→</Kbd> 빌드 건너뛰기
            </span>
            <span className="flex items-center gap-1.5">
              <Kbd>F</Kbd> 전체 화면 · <Kbd>G</Kbd> 목록
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map(({ key, meta, items }) => {
            const tone = TONE_CLASS[meta.tone];
            return (
              <div key={key}>
                <p className={cn("mb-2 flex items-center gap-2 text-[13px] font-semibold", tone.ink)}>
                  <span className={cn("size-2.5 rounded-full", tone.bgStrong)} />
                  {meta.no} · {meta.label}
                </p>
                <ul className="flex flex-col gap-0.5">
                  {items.map(({ s, i }) => (
                    <li key={s.id}>
                      <button
                        type="button"
                        onClick={() => onSelect(i)}
                        className={cn(
                          "flex w-full items-baseline gap-3 rounded-lg px-2.5 py-1.5 text-left text-[14px] transition-colors hover:bg-paper-2",
                          i === current && cn(tone.soft, "font-semibold"),
                        )}
                      >
                        <span className="w-6 shrink-0 font-serif text-[15px] text-ink-3 tabular">
                          {pad(i + 1)}
                        </span>
                        <span className="text-ink">{s.title}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
