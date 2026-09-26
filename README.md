# A Romantic Penalty? — 논문 발표 슬라이드

Tong, Li & Park (2026). *A romantic penalty? Female entrepreneurship and relationship initiation in online dating.* Journal of Business Venturing, 41, 106608.
발표: 첨단기술비즈니스학과 4기 유선화

Next.js 16 · Tailwind CSS v4 · shadcn/ui · framer-motion으로 만든 16:9 슬라이드형 웹사이트 (총 27장).

## 실행

```bash
npm install          # 처음 한 번
npm run dev          # 편집용 → http://localhost:3100
```

발표할 때는 프로덕션 모드를 권장한다. 개발용 오버레이와 HMR이 없어 가장 안정적이다.

```bash
npm run build && npm run start   # → http://localhost:3100
```

## 조작

| 키 | 동작 |
|---|---|
| `→` `↓` `Space` `PageDown` `Enter` | 다음 (빌드 단계 → 다음 슬라이드) |
| `←` `↑` `PageUp` `Backspace` | 이전 |
| `Shift` + `→` / `←` | 빌드 단계를 건너뛰고 슬라이드 이동 |
| `Home` / `End` | 처음 / 마지막 |
| `G` 또는 `O` | 슬라이드 목록 |
| `F` | 전체 화면 |

- 마우스를 움직이면 하단에 조작 버튼이 나타난다. 모바일에서는 좌우로 스와이프한다.
- 주소 해시(`#/12`, `#/12/2`)에 현재 슬라이드와 빌드 단계가 기록되어, 새로고침해도 같은 화면이 유지된다.
- 2번 슬라이드(초록)에서는 형광펜 문장이나 오른쪽 목록을 클릭하면 설명이 펼쳐진다. `→`를 누르면 순서대로 열린다.

## 검증 도구

개발 서버(`npm run dev`)가 켜진 상태에서 실행한다.

```bash
npm run check          # 타입 검사 + ESLint
npm run shots          # 전체 슬라이드를 마지막 빌드 단계로 캡처 + 모아보기 → tools/.shots/chrome/
npm run shots:safari   # 같은 캡처를 Safari 엔진(WebKit)으로
npm run test:ui        # 키보드·클릭·목록·새로고침 인터랙션 테스트 (Chrome + WebKit)
node tools/shot.mjs theory-time/2 13   # 특정 슬라이드만 (id 또는 번호, /n = 빌드 단계)
```

## 이어서 작업하기

- `docs/HANDOFF.md` — 요구사항, 확정된 결정, 수정 이력, 슬라이드 번호 ↔ 파일 표
- `docs/DESIGN_GUIDE.md` — 디자인 규칙과 검증 루프
- `docs/source/` — 「쉬운 해설」 원문 발췌, 영어 원문 텍스트
- `docs/illustrations/` — GPT Image 2 삽화 원본(PNG)

## 구조

```
src/
  components/deck/     덱 엔진 (16:9 스테이지 스케일링, 내비게이션, 바닥글, 목록)
  components/slide/    공용 슬라이드 컴포넌트 (SlideFrame, Reveal, Step, Mark, Panel …)
  slides/              슬라이드 — 섹션별 폴더, 각 index.ts 가 순서를 정한다
  assets/              GPT Image 2 삽화 (WebP)
tools/                 캡처·레이아웃 검사(shot.mjs), 인터랙션 테스트(interact.mjs)
docs/                  인수인계·디자인 가이드·원문 발췌·삽화 원본
```

섹션 색은 초록 슬라이드의 형광펜 색과 같다: 빨강=질문, 노랑=이론, 초록=방법론, 파랑=결과, 보라=결론.
