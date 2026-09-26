"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { SlideDef } from "@/components/deck/types";
import { Mark, Reveal } from "@/components/slide/primitives";
import { EASE_OUT } from "@/components/slide/motion";
import cover from "@/assets/cover-illustration.webp";

/** 삽화 배경색(#FEF5E4)과 같은 크림색으로 전체를 칠해 그림이 이음매 없이 이어지게 한다 */
function Cover() {
  return (
    <div className="absolute inset-0 flex bg-[#fef5e4]">
      {/* ── 왼쪽: 제목 · 저자 · 발표자 ───────────────── */}
      <div className="relative z-10 flex w-[900px] shrink-0 flex-col py-[76px] pr-[40px] pl-[104px]">
        <Reveal kind="fade" className="flex items-center gap-3 text-[17px] font-medium text-ink-3">
          <span className="size-2 rounded-full bg-c-red" />
          <span className="font-serif text-[21px] text-ink-2 italic">Journal of Business Venturing</span>
          <span className="text-line">|</span>
          <span className="tabular">Vol. 41 (2026) 106608</span>
        </Reveal>

        <div className="mt-auto">
          <Reveal>
            <h1 className="font-serif text-[118px] leading-[0.94] tracking-[-0.025em] text-ink">
              <Mark tone="red">A romantic penalty?</Mark>
            </h1>
          </Reveal>
          <Reveal className="mt-7">
            <p className="max-w-[720px] font-serif text-[44px] leading-[1.12] tracking-[-0.01em] text-ink-2">
              Female entrepreneurship and relationship initiation in online dating
            </p>
          </Reveal>
          <Reveal className="mt-6">
            <p className="text-[21px] font-medium tracking-[-0.02em] text-ink-3">
              연애 페널티인가? 여성 창업과 온라인 데이팅에서의 관계 형성
            </p>
          </Reveal>

          <Reveal className="mt-12">
            <p className="text-[27px] font-semibold tracking-[-0.02em] text-ink">
              Di Tong<span className="mx-3 font-normal text-ink-3/60">·</span>Xiumei Li
              <span className="mx-3 font-normal text-ink-3/60">·</span>Haemin Dennis Park
            </p>
            <p className="mt-2.5 max-w-[760px] text-[18px] leading-[1.6] text-ink-3">
              Nottingham University Business School China · Asper School of Business, University of
              Manitoba · Naveen Jindal School of Management, UT Dallas
            </p>
          </Reveal>
        </div>

        <Reveal kind="fade" className="mt-auto flex items-center gap-5 pt-10">
          <span className="h-px w-14 bg-ink/25" />
          <p className="text-[22px] tracking-[-0.02em] text-ink-2">
            첨단기술비즈니스학과 4기 <span className="ml-1 font-bold text-ink">유선화</span>
          </p>
        </Reveal>
      </div>

      {/* ── 오른쪽: GPT Image 2 삽화 ─────────────────── */}
      <motion.div
        className="relative h-full flex-1"
        variants={{
          enter: { opacity: 0, scale: 1.04 },
          center: { opacity: 1, scale: 1, transition: { duration: 1.4, ease: EASE_OUT } },
        }}
        style={{
          WebkitMaskImage: "linear-gradient(to right, transparent 0, #000 72px)",
          maskImage: "linear-gradient(to right, transparent 0, #000 72px)",
        }}
      >
        <Image
          src={cover}
          alt="노트북과 스마트폰을 든 여성 창업가 위로, 서류가방과 하트가 저울에 올려진 삽화"
          fill
          priority
          sizes="700px"
          placeholder="blur"
          className="object-cover object-center"
        />
      </motion.div>
    </div>
  );
}

export const coverSlide: SlideDef = {
  id: "cover",
  section: "cover",
  title: "표지",
  bare: true,
  Component: Cover,
};
