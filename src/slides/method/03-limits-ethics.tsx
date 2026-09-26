"use client";

import type { ReactNode } from "react";
import { motion, type Variants } from "framer-motion";
import { Clock, Coins, Info, Layers, ShieldCheck, Store, UsersRound, EyeClosed, Ban, VenetianMask } from "lucide-react";
import type { SlideDef } from "@/components/deck/types";
import {
  Body,
  Callout,
  Eyebrow,
  Mark,
  Panel,
  Reveal,
  SlideFrame,
  Step,
} from "@/components/slide/primitives";
import { EASE_OUT } from "@/components/slide/motion";
import { cn } from "@/lib/utils";

/* ────────────────────────────────────────────────────────────
 * “창업가” 한 단어 → 딸려 오는 짐작 네 가지
 * ──────────────────────────────────────────────────────────── */
const BUNDLE = [
  { icon: Coins, text: "소득 전망" },
  { icon: Store, text: "업종 이미지" },
  { icon: Layers, text: "사회 계층" },
  { icon: Clock, text: "“얼마나 시간이 자유로울까”" },
];

const DW = 800; // 다이어그램 폭
const DH = 292; // 다이어그램 높이
const PILL_R = 262; // 단어 알약의 오른쪽 끝 x
const CHIP_X = 404; // 짐작 칩의 왼쪽 x
const CHIP_H = 58;
const CHIP_GAP = 20;
const chipY = (i: number) => i * (CHIP_H + CHIP_GAP) + CHIP_H / 2 + 2; // 칩 중심 y

const draw = (i: number): Variants => ({
  enter: { pathLength: 0, opacity: 0 },
  center: { pathLength: 1, opacity: 1, transition: { duration: 0.7, ease: EASE_OUT, delay: 0.5 + i * 0.1 } },
});

function Unbundle() {
  const cy = DH / 2;
  return (
    <div className="relative" style={{ width: DW, height: DH }}>
      <svg className="absolute inset-0" width={DW} height={DH} viewBox={`0 0 ${DW} ${DH}`} aria-hidden>
        {BUNDLE.map((_, i) => {
          const y = chipY(i);
          return (
            <motion.path
              key={i}
              d={`M${PILL_R} ${cy} C ${PILL_R + 80} ${cy}, ${CHIP_X - 80} ${y}, ${CHIP_X} ${y}`}
              fill="none"
              stroke="var(--tone)"
              strokeOpacity={0.55}
              strokeWidth={2.5}
              strokeLinecap="round"
              variants={draw(i)}
            />
          );
        })}
      </svg>

      {/* 단어 하나 */}
      <Reveal kind="pop" className="absolute left-0" style={{ top: cy - 70 }}>
        <div className="flex h-[140px] w-[262px] flex-col items-center justify-center rounded-[26px] bg-tone text-white shadow-[0_22px_40px_-20px_var(--tone)]">
          <span className="text-[17px] font-semibold tracking-[0.02em] text-white/80">직업란의 단어 하나</span>
          <span className="mt-1 text-[46px] leading-none font-bold tracking-[-0.04em]">“창업가”</span>
        </div>
      </Reveal>

      {/* 딸려 오는 짐작 */}
      {BUNDLE.map(({ icon: Icon, text }, i) => (
        <Reveal
          key={text}
          kind="rise"
          className="absolute"
          style={{ left: CHIP_X, top: chipY(i) - CHIP_H / 2 }}
        >
          <div
            className="flex items-center gap-3.5 rounded-[16px] bg-surface pr-6 pl-3 ring-1 ring-line"
            style={{ height: CHIP_H }}
          >
            <span className="grid size-[38px] place-items-center rounded-[11px] bg-tone-soft/55 text-tone-ink">
              <Icon className="size-[21px]" strokeWidth={1.9} />
            </span>
            <span className="text-[23px] font-semibold tracking-[-0.02em] text-ink">{text}</span>
          </div>
        </Reveal>
      ))}

    </div>
  );
}

/* ────────────────────────────────────────────────────────────
 * 연구윤리 항목
 * ──────────────────────────────────────────────────────────── */
function EthicsRow({
  icon,
  children,
  tone = "neutral",
}: {
  icon: ReactNode;
  children: ReactNode;
  tone?: "neutral" | "good" | "muted";
}) {
  return (
    <li className="flex gap-4">
      <span
        className={cn(
          "mt-[2px] grid size-[38px] shrink-0 place-items-center rounded-full [&_svg]:size-[20px]",
          tone === "good" && "bg-tone text-white",
          tone === "neutral" && "bg-paper-2 text-ink-2",
          tone === "muted" && "bg-paper-2 text-ink-3",
        )}
      >
        {icon}
      </span>
      <span
        className={cn(
          "text-[22px] leading-[1.5] tracking-[-0.015em]",
          tone === "muted" ? "text-ink-3" : "text-ink-2",
        )}
      >
        {children}
      </span>
    </li>
  );
}

function LimitsEthics() {
  return (
    <SlideFrame
      section="method"
      kicker="3.2 단, 한계도 있다 — 복합 처치와 연구윤리"
      title={
        <>
          직업 이름 하나는 <Mark>한 가지 정보가 아니다</Mark>
        </>
      }
      bodyClassName="grid grid-cols-[800px_1fr] gap-12"
    >
      {/* 왼쪽 — 복합 처치 */}
      <div className="flex flex-col">
        <Unbundle />

        <Reveal className="mt-7">
          <Body className="text-[24px]">
            ‘창업가’라는 말에는 이런 짐작이 <strong className="font-semibold text-ink">한 덩어리로</strong> 딸려 온다.
            <br />
            그래서 “창업가라는 말의 <strong className="font-semibold text-ink">어느 부분</strong>이 작용했는가”까지는
            갈라낼 수 없다.
          </Body>
        </Reveal>

        <Step at={1} className="mt-5">
          <Callout title="논문도 이 점을 인정한다">
            <span className="text-ink">— 그래서 ‘복합 처치(여러 가지가 한 번에 바뀐 실험)’라고 부른다.</span>
          </Callout>
        </Step>
      </div>

      {/* 오른쪽 — 연구윤리 */}
      <Step at={2} className="h-full">
        <Panel className="flex h-full flex-col px-9 py-8">
          <Eyebrow>연구윤리</Eyebrow>

          <ul className="mt-5 flex flex-col gap-[18px]">
            <EthicsRow icon={<UsersRound strokeWidth={1.9} />}>
              메시지를 받은 사람들은 <strong className="font-semibold text-ink">실존하는 이용자</strong>였다
            </EthicsRow>
            <EthicsRow icon={<EyeClosed strokeWidth={1.9} />}>
              지어낸 프로필이라는 것도, 자신이 연구 대상이라는 것도 몰랐다
            </EthicsRow>
            <EthicsRow icon={<Ban strokeWidth={1.9} />}>미리 알렸다면 실험 자체가 성립하지 않기 때문</EthicsRow>
          </ul>

          <div className="mt-6 flex items-center gap-3 rounded-[14px] bg-paper-2/80 px-5 py-3.5">
            <VenetianMask className="size-[24px] shrink-0 text-ink-2" strokeWidth={1.8} />
            <p className="text-[23px] font-semibold tracking-[-0.02em] text-ink">그래도 “속여도 되는가”는 남는 물음</p>
          </div>

          <ul className="mt-auto flex flex-col gap-4 border-t border-line pt-5">
            <EthicsRow tone="good" icon={<ShieldCheck strokeWidth={2} />}>
              두 현장실험과 설문실험 모두
              <br />
              <strong className="font-semibold text-tone-ink">연구윤리심의(IRB) 승인</strong>을 받았다
            </EthicsRow>
            <EthicsRow tone="muted" icon={<Info strokeWidth={2} />}>
              다만 실험이 끝난 뒤 당사자들에게
              <br />
              사실을 알렸다는 언급은 없다
            </EthicsRow>
          </ul>
        </Panel>
      </Step>
    </SlideFrame>
  );
}

export const limitsEthicsSlide: SlideDef = {
  id: "method-limits-ethics",
  section: "method",
  title: "한계(복합 처치)와 연구윤리",
  steps: 2,
  Component: LimitsEthics,
};
