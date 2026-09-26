import type { ComponentType } from "react";
import type { SectionKey } from "@/lib/sections";

export type SlideDef = {
  /** URL 해시에 쓰이는 고유 id (kebab-case) */
  id: string;
  section: SectionKey;
  /** 개요(overview) 목록에 표시되는 짧은 제목 */
  title: string;
  /** →/Space로 한 단계씩 드러낼 빌드 단계 수 (기본 0) */
  steps?: number;
  /** 머리글·바닥글 없이 전체 화면을 직접 쓰는 슬라이드 */
  bare?: boolean;
  Component: ComponentType;
};
