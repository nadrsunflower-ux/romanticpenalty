"use client";

import { createContext, useContext } from "react";

export type SlideState = {
  /** 0-based slide index */
  index: number;
  /** 현재 빌드 단계 (0 = 아무것도 드러나지 않은 상태) */
  step: number;
  /** 이 슬라이드의 전체 빌드 단계 수 */
  steps: number;
  setStep: (step: number) => void;
};

export const SlideContext = createContext<SlideState>({
  index: 0,
  step: 0,
  steps: 0,
  setStep: () => {},
});

export const useSlide = () => useContext(SlideContext);
