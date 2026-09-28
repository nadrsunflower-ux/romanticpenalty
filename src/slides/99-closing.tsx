"use client";

import type { SlideDef } from "@/components/deck/types";
import { Reveal } from "@/components/slide/primitives";

const SWATCHES = ["bg-hl-red", "bg-hl-yellow", "bg-hl-green", "bg-hl-blue", "bg-hl-purple"];

function Closing() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#fef5e4]" data-tone="red">
      <Reveal kind="fade" className="flex gap-2.5">
        {SWATCHES.map((c) => (
          <span key={c} className={`h-[10px] w-[54px] rounded-full ${c}`} />
        ))}
      </Reveal>
      <Reveal className="mt-12">
        <h2 className="font-serif text-[148px] leading-none tracking-[-0.02em] text-ink">
          Thank you
        </h2>
      </Reveal>
      <Reveal className="mt-8">
        <p className="text-[30px] font-semibold tracking-[-0.03em] text-ink-2">감사합니다</p>
      </Reveal>
      <Reveal kind="fade" className="mt-20 text-center">
        <p className="font-serif text-[22px] text-ink-3 italic">
          Tong, D., Li, X., &amp; Park, H. D. (2026). A romantic penalty? Female entrepreneurship and
          relationship initiation in online dating.
        </p>
        <p className="mt-1 font-serif text-[22px] text-ink-3 italic">Journal of Business Venturing, 41, 106608.</p>
        <p className="mt-8 text-[22px] tracking-[-0.02em] text-ink-2">
          첨단기술비즈니스학과 4기 <span className="font-bold text-ink">유선화</span>
        </p>
      </Reveal>
    </div>
  );
}

export const closingSlide: SlideDef = {
  id: "closing",
  section: "conclusion",
  title: "감사합니다",
  bare: true,
  Component: Closing,
};
