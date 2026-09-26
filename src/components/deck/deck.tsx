"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { slideVariants } from "@/components/slide/motion";
import { SlideContext } from "./slide-context";
import { DeckFooter, DeckControls, DeckOverview } from "./deck-chrome";
import type { SlideDef } from "./types";

export const STAGE_W = 1600;
export const STAGE_H = 900;

type Pos = { index: number; step: number; dir: 1 | -1 };

/**
 * 해시 형식:  #/12  ·  #/12/3  ·  #/slide-id  ·  #/slide-id/2
 * (번호는 1부터, 두 번째 값은 빌드 단계)
 */
function parseHash(hash: string, slides: SlideDef[]): { index: number; step: number } | null {
  const parts = decodeURIComponent(hash).replace(/^#\/?/, "").split("/");
  if (!parts[0]) return null;
  const index = /^\d+$/.test(parts[0])
    ? Number(parts[0]) - 1
    : slides.findIndex((s) => s.id === parts[0]);
  if (index < 0 || index >= slides.length) return null;
  const max = slides[index].steps ?? 0;
  const step = parts[1] ? Math.min(max, Math.max(0, Number(parts[1]) || 0)) : 0;
  return { index, step };
}

function isEditable(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  return (
    target.isContentEditable ||
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.tagName === "SELECT"
  );
}

function useStageScale() {
  const ref = useRef<HTMLElement>(null);
  const [scale, setScale] = useState(0);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      setScale(Math.min(el.clientWidth / STAGE_W, el.clientHeight / STAGE_H));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return { ref, scale };
}

export function Deck({ slides }: { slides: SlideDef[] }) {
  const [pos, setPos] = useState<Pos>({ index: 0, step: 0, dir: 1 });
  const [ready, setReady] = useState(false);
  const [overview, setOverview] = useState(false);
  const { ref: stageRef, scale } = useStageScale();

  const slide = slides[pos.index];
  const steps = slide.steps ?? 0;

  /* ── 해시 ↔ 위치 동기화 ─────────────────────────────── */
  useEffect(() => {
    const fromHash = parseHash(window.location.hash, slides);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- 최초 1회 URL 복원
    if (fromHash) setPos({ ...fromHash, dir: 1 });
    setReady(true);
    const onHash = () => {
      const p = parseHash(window.location.hash, slides);
      if (p) setPos((cur) => ({ ...p, dir: p.index >= cur.index ? 1 : -1 }));
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [slides]);

  useEffect(() => {
    if (!ready) return;
    // 빌드 단계까지 기록해 새로고침·HMR 뒤에도 같은 화면으로 돌아온다
    const next = pos.step > 0 ? `#/${pos.index + 1}/${pos.step}` : `#/${pos.index + 1}`;
    if (window.location.hash !== next) window.history.replaceState(null, "", next);
  }, [pos.index, pos.step, ready]);

  useEffect(() => {
    document.title = `${pos.index + 1}. ${slide.title} — A Romantic Penalty?`;
  }, [pos.index, slide.title]);

  /* ── 내비게이션 ─────────────────────────────────────── */
  const next = useCallback(
    (skipSteps = false) => {
      setPos((p) => {
        const max = slides[p.index].steps ?? 0;
        if (!skipSteps && p.step < max) return { ...p, step: p.step + 1, dir: 1 };
        if (p.index < slides.length - 1) return { index: p.index + 1, step: 0, dir: 1 };
        return p;
      });
    },
    [slides],
  );

  const prev = useCallback(
    (skipSteps = false) => {
      setPos((p) => {
        if (!skipSteps && p.step > 0) return { ...p, step: p.step - 1, dir: -1 };
        if (p.index > 0) {
          const i = p.index - 1;
          return { index: i, step: skipSteps ? 0 : (slides[i].steps ?? 0), dir: -1 };
        }
        return p;
      });
    },
    [slides],
  );

  const goTo = useCallback(
    (index: number, step = 0) => {
      setPos((p) => {
        const i = Math.max(0, Math.min(slides.length - 1, index));
        if (i === p.index && step === p.step) return p;
        return { index: i, step, dir: i >= p.index ? 1 : -1 };
      });
    },
    [slides.length],
  );

  const setStep = useCallback(
    (s: number) => {
      setPos((p) => {
        const max = slides[p.index].steps ?? 0;
        const clamped = Math.max(0, Math.min(max, s));
        return clamped === p.step ? p : { ...p, step: clamped, dir: clamped > p.step ? 1 : -1 };
      });
    },
    [slides],
  );

  const toggleFullscreen = useCallback(() => {
    const doc = document as Document & {
      webkitFullscreenElement?: Element;
      webkitExitFullscreen?: () => void;
    };
    const el = document.documentElement as HTMLElement & {
      webkitRequestFullscreen?: () => void;
    };
    if (doc.fullscreenElement || doc.webkitFullscreenElement) {
      if (doc.exitFullscreen) void doc.exitFullscreen();
      else doc.webkitExitFullscreen?.();
    } else if (el.requestFullscreen) {
      void el.requestFullscreen();
    } else {
      el.webkitRequestFullscreen?.();
    }
  }, []);

  /* ── 키보드 (document 전역 — 포커스에 의존하지 않음) ─── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (isEditable(e.target)) return;
      if (overview) return; // 개요 창이 열려 있으면 다이얼로그가 처리
      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
        case "PageDown":
        case " ":
        case "Enter":
          e.preventDefault(); // Safari 방향키 히스토리 스와이프 방지
          next(e.shiftKey);
          break;
        case "ArrowLeft":
        case "ArrowUp":
        case "PageUp":
        case "Backspace":
          e.preventDefault();
          prev(e.shiftKey);
          break;
        case "Home":
          e.preventDefault();
          goTo(0);
          break;
        case "End":
          e.preventDefault();
          goTo(slides.length - 1);
          break;
        case "f":
        case "F":
          e.preventDefault();
          toggleFullscreen();
          break;
        case "g":
        case "G":
        case "o":
        case "O":
          e.preventDefault();
          setOverview(true);
          break;
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [next, prev, goTo, toggleFullscreen, overview, slides.length]);

  /* ── 터치 스와이프 ──────────────────────────────────── */
  useEffect(() => {
    let x0 = 0;
    let y0 = 0;
    const onStart = (e: TouchEvent) => {
      x0 = e.touches[0].clientX;
      y0 = e.touches[0].clientY;
    };
    const onEnd = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - x0;
      const dy = e.changedTouches[0].clientY - y0;
      if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.4) {
        if (dx < 0) next();
        else prev();
      }
    };
    document.addEventListener("touchstart", onStart, { passive: true });
    document.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      document.removeEventListener("touchstart", onStart);
      document.removeEventListener("touchend", onEnd);
    };
  }, [next, prev]);

  const ctx = useMemo(
    () => ({ index: pos.index, step: pos.step, steps, setStep }),
    [pos.index, pos.step, steps, setStep],
  );

  const Current = slide.Component;

  return (
    <MotionConfig reducedMotion="user">
      <main
        ref={stageRef}
        className="fixed inset-0 flex items-center justify-center overflow-hidden bg-stage"
      >
        {ready && scale > 0 ? (
          <div
            className="relative shrink-0 overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]"
            style={{ width: STAGE_W * scale, height: STAGE_H * scale }}
          >
            <div
              className="slide-canvas absolute top-0 left-0 overflow-hidden bg-paper text-ink"
              style={{
                width: STAGE_W,
                height: STAGE_H,
                transform: `scale(${scale})`,
                transformOrigin: "0 0",
              }}
            >
              <AnimatePresence custom={pos.dir}>
                <motion.section
                  key={slide.id}
                  custom={pos.dir}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-0"
                  aria-roledescription="slide"
                  aria-label={`${pos.index + 1} / ${slides.length}: ${slide.title}`}
                >
                  <SlideContext.Provider value={ctx}>
                    <Current />
                  </SlideContext.Provider>
                </motion.section>
              </AnimatePresence>

              <DeckFooter
                slides={slides}
                index={pos.index}
                step={pos.step}
                hidden={Boolean(slide.bare)}
              />
              <DeckControls
                onPrev={() => prev()}
                onNext={() => next()}
                onOverview={() => setOverview(true)}
                onFullscreen={toggleFullscreen}
                canPrev={pos.index > 0 || pos.step > 0}
                canNext={pos.index < slides.length - 1 || pos.step < steps}
              />
            </div>
          </div>
        ) : null}

        <DeckOverview
          open={overview}
          onOpenChange={setOverview}
          slides={slides}
          current={pos.index}
          onSelect={(i) => {
            goTo(i);
            setOverview(false);
          }}
        />
      </main>
    </MotionConfig>
  );
}
