"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Briefcase, Equal, EqualNot, Rocket } from "lucide-react";
import type { SlideDef } from "@/components/deck/types";
import { Caption, Chip, Eyebrow, Mark, Reveal, SlideFrame, Step, useStepShown } from "@/components/slide/primitives";
import { EASE_OUT } from "@/components/slide/motion";
import { cn } from "@/lib/utils";
import twin from "@/assets/twin-profiles.webp";

/* 카드 행 높이(px) — 카드 두 장과 가운데 '=' 열이 같은 높이를 공유해 줄이 맞는다 */
const ROWS = [120, 86, 88, 100, 90] as const;
const CARD_W = 344;
const GUTTER_W = 100;

/* ────────────────────────────────────────────────────────────
 * 사진 — GPT Image 2 삽화에서 왼쪽 카드의 얼굴만 원형으로 잘라 두 카드에 똑같이 쓴다
 * (원본 1440×1800 중 x 230–570, y 760–1100 영역)
 * ──────────────────────────────────────────────────────────── */
const AVATAR = 92;
const S = AVATAR / 340;

function Avatar() {
  return (
    <span
      className="relative block shrink-0 overflow-hidden rounded-full ring-2 ring-surface"
      style={{
        width: AVATAR,
        height: AVATAR,
        boxShadow: "0 0 0 1px var(--color-line)",
      }}
    >
      <Image
        src={twin}
        alt="AI로 만든 얼굴 (두 프로필 모두 같은 사진)"
        placeholder="blur"
        sizes="800px"
        className="absolute max-w-none"
        style={{
          width: 1440 * S,
          height: 1800 * S,
          left: -230 * S,
          top: -760 * S,
        }}
      />
    </span>
  );
}

function Skel({ w, className }: { w: number; className?: string }) {
  return <span className={cn("inline-block h-[11px] rounded-full bg-ink/12", className)} style={{ width: w }} />;
}

function Slot({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex h-[28px] items-center rounded-[7px] border border-dashed border-ink/30 px-2 text-[17px] leading-none font-medium text-ink-3">
      {children}
    </span>
  );
}

function FieldLabel({ children, note }: { children: ReactNode; note?: ReactNode }) {
  return (
    <p className="flex items-center justify-between gap-2 text-[17px] font-semibold tracking-[-0.01em] text-ink-3">
      <span>{children}</span>
      {note ? (
        <span className="rounded-full bg-paper-2 px-2.5 py-[1px] text-[17px] font-medium text-ink-2">{note}</span>
      ) : null}
    </p>
  );
}

/* 소득: 사이트의 5개 구간 중 위에서 두 번째 */
function IncomeBars() {
  return (
    <div className="flex items-center gap-3.5">
      <div className="flex items-end gap-[5px]">
        {[12, 18, 24, 30, 36].map((h, i) => (
          <span
            key={h}
            className={cn("w-[17px] rounded-[4px]", i === 3 ? "bg-ink/80" : "bg-ink/10")}
            style={{ height: h }}
          />
        ))}
      </div>
      <span className="text-[20px] font-medium text-ink-2">위에서 두 번째 구간</span>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
 * 프로필 카드
 * ──────────────────────────────────────────────────────────── */
function ProfileCard({ job }: { job: "founder" | "manager" }) {
  const revealed = useStepShown(1);
  const dim = { opacity: revealed ? 0.42 : 1 };
  const dimT = { duration: 0.5, ease: EASE_OUT };

  const rows: ReactNode[] = [
    // 사진 · 나이 · 키
    <div key="head" className="flex items-center gap-4">
      <Avatar />
      <div>
        <p className="flex items-baseline gap-2 tracking-[-0.03em]">
          <span className="text-[30px] font-bold text-ink">26세</span>
          <span className="text-[22px] font-medium text-ink-2">· 165cm</span>
        </p>
        <Chip variant="outline" className="mt-2 text-ink-3">
          AI로 만든 얼굴
        </Chip>
      </div>
    </div>,
    // 소득
    <div key="income">
      <FieldLabel>소득 · 사이트의 5개 구간</FieldLabel>
      <div className="mt-2">
        <IncomeBars />
      </div>
    </div>,
    // 자기소개
    <div key="intro">
      <FieldLabel note="직업·도시 이름만 바뀜">자기소개</FieldLabel>
      <div className="mt-2.5 flex items-center gap-2">
        <Skel w={38} />
        <Slot>도시</Slot>
        <Skel w={58} />
        <Slot>직업</Slot>
        <Skel w={46} />
      </div>
    </div>,
    // 보낸 메시지
    <div key="msg">
      <FieldLabel note="토씨 하나까지 동일">보낸 메시지</FieldLabel>
      <div className="mt-2 inline-flex w-[250px] flex-col gap-[9px] rounded-[16px] rounded-bl-[5px] bg-paper-2 px-4 py-[11px]">
        <Skel w={196} className="bg-ink/15" />
        <Skel w={132} className="bg-ink/15" />
      </div>
    </div>,
  ];

  return (
    <div
      className="rounded-[26px] bg-surface px-6 py-5 shadow-[0_1px_0_rgba(23,22,28,0.04),0_18px_40px_-22px_rgba(23,22,28,0.25)] ring-1 ring-line"
      style={{ width: CARD_W }}
    >
      <div className="flex flex-col divide-y divide-line">
        {rows.map((r, i) => (
          <motion.div
            key={i}
            initial={false}
            animate={dim}
            transition={dimT}
            className="flex flex-col justify-center"
            style={{ height: ROWS[i] }}
          >
            {r}
          </motion.div>
        ))}

        {/* 직업 — 여기 한 군데만 다르다 */}
        <div className="flex flex-col justify-center" style={{ height: ROWS[4] }}>
          <FieldLabel>직업</FieldLabel>
          <div className="relative mt-2 h-[44px]">
            <AnimatePresence initial={false} mode="wait">
              {revealed ? (
                <motion.span
                  key="job"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.15 }}
                  className={cn(
                    "absolute inset-y-0 left-0 inline-flex items-center gap-2.5 rounded-[12px] px-3.5 text-[24px] font-bold tracking-[-0.03em]",
                    job === "founder" ? "bg-tone-soft/70 text-tone-ink" : "bg-paper-2 text-ink",
                  )}
                >
                  {job === "founder" ? (
                    <Rocket className="size-[22px]" strokeWidth={2} />
                  ) : (
                    <Briefcase className="size-[22px]" strokeWidth={2} />
                  )}
                  {job === "founder" ? "창업가" : "회사 관리자"}
                </motion.span>
              ) : (
                <motion.span
                  key="blank"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-y-0 left-0 inline-flex items-center gap-2"
                >
                  <Skel w={120} className="h-[14px]" />
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

/* 가운데 열 — 행마다 '=' (마지막 직업 행만 '≠') */
function Gutter() {
  const revealed = useStepShown(1);
  return (
    <div className="flex flex-col py-5" style={{ width: GUTTER_W }}>
      {ROWS.map((h, i) => {
        const isJob = i === ROWS.length - 1;
        return (
          <div key={i} className="relative grid place-items-center" style={{ height: h }}>
            <span
              className={cn(
                "absolute inset-x-0 top-1/2 border-t-2 border-dashed transition-colors duration-500",
                isJob && revealed ? "border-tone/60" : "border-ink/12",
              )}
            />
            {isJob ? (
              <span
                className={cn(
                  "relative grid size-[44px] place-items-center rounded-full ring-1 transition-all duration-500",
                  revealed
                    ? "bg-tone text-white shadow-[0_12px_26px_-10px_var(--tone)] ring-tone"
                    : "bg-surface text-ink-3 ring-line",
                )}
              >
                {revealed ? (
                  <EqualNot className="size-[22px]" strokeWidth={2.6} />
                ) : (
                  <span className="font-serif text-[26px] leading-none italic">?</span>
                )}
              </span>
            ) : (
              <motion.span
                initial={false}
                animate={{ opacity: revealed ? 0.45 : 1 }}
                className="relative grid size-[36px] place-items-center rounded-full bg-paper text-ink-2 ring-1 ring-ink/15"
              >
                <Equal className="size-[19px]" strokeWidth={2.6} />
              </motion.span>
            )}
          </div>
        );
      })}
    </div>
  );
}

function TwinProfiles() {
  return (
    <SlideFrame
      section="method"
      kicker="3.2 핵심 아이디어 — ‘쌍둥이 프로필’"
      title={
        <>
          다른 건 전부 똑같고, <Mark>딱 한 가지만</Mark> 다르다
        </>
      }
      bodyClassName="grid grid-cols-[788px_1fr] gap-12"
    >
      {/* 왼쪽 — 쌍둥이 카드 */}
      <div className="flex flex-col">
        <div className="flex items-start">
          <Reveal kind="pop">
            <ProfileCard job="founder" />
          </Reveal>
          <Reveal kind="fade">
            <Gutter />
          </Reveal>
          <Reveal kind="pop">
            <ProfileCard job="manager" />
          </Reveal>
        </div>
        <Reveal kind="fade" className="mt-3.5">
          <Caption className="text-[19px]">
            여성 프로필 예시 · 남성 프로필도 같은 방식으로 만들었다 (사진은 성별당 1장)
          </Caption>
        </Reveal>
      </div>

      {/* 오른쪽 — 이 설계의 논리 */}
      <div className="flex flex-col pt-2">
        <Reveal>
          <Eyebrow>한 줄 요약</Eyebrow>
          <p className="mt-4 border-l-[5px] border-tone pl-5 text-[25px] leading-[1.6] font-semibold tracking-[-0.025em] text-ink">
            다른 건 전부 똑같고,
            <br />딱 한 가지만 다른 두 사람을 만들어서,
            <br />
            세상이 다르게 대하는지 본다.
          </p>
        </Reveal>

        {/* 위(한 줄 요약)·아래(선행 실험) 사이 가운데 — 상하 여백이 같도록 */}
        <div className="flex flex-1 flex-col justify-center">
          <Step at={1}>
            <p className="text-[24px] leading-[1.6] tracking-[-0.02em] text-ink-2">
              사진도, 나이도, 메시지도 같다.
              <br />
              그러니 답장률에 차이가 난다면,
              <br />그 차이를 만든 것은
            </p>
            <p className="mt-1.5 text-[38px] leading-[1.3] font-bold tracking-[-0.035em] text-ink">
              <Mark>바뀐 직업란</Mark>이다.
            </p>
          </Step>
        </div>

        <Reveal>
          <div className="rounded-[18px] bg-paper-2/70 px-5 py-5">
            <p className="text-[20px] leading-[1.6] tracking-[-0.02em] whitespace-nowrap text-ink-2">
              온라인 데이팅에서 이미 같은 방식을 쓴 선행 실험들을 따랐다.
            </p>
          </div>
        </Reveal>
      </div>
    </SlideFrame>
  );
}

export const twinProfilesSlide: SlideDef = {
  id: "method-twin-profiles",
  section: "method",
  title: "핵심 아이디어: 쌍둥이 프로필",
  steps: 1,
  Component: TwinProfiles,
};
