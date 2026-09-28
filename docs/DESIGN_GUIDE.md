# 디자인 가이드 — 슬라이드를 고치거나 새로 만들 때의 규칙

덱 전체가 한 사람이 만든 것처럼 보이도록 지켜 온 규칙이다. 새 슬라이드를 만들거나 크게 고칠 때는 아래 기준 예시 파일을 먼저 읽는다.

- 공용 컴포넌트: `src/components/slide/primitives.tsx`
- 표준 슬라이드 예시: `src/slides/question/01-why.tsx`, `src/slides/question/02-threshold.tsx`
- 인터랙티브 예시: `src/slides/01-abstract.tsx`
- 섹션·색 정의: `src/lib/sections.ts` / 색 토큰: `src/app/globals.css`

## 1. 캔버스와 안전 영역

- 모든 슬라이드는 **1600×900px 고정 캔버스**에 그린다. 덱이 화면 크기에 맞춰 통째로 확대·축소하므로 크기는 px로 생각한다.
- `SlideFrame`을 쓰면 좌우 104px, 위 64px, 아래 96px 여백이 자동으로 잡힌다. 본문(children)은 제목 아래 남은 높이(flex-1)를 채운다.
- **본문 내용의 아래 끝은 y ≤ 804px.** 그 아래(서지 정보·쪽 번호·섹션 색 진행 막대)는 덱이 그린다.
- 넘치면 슬라이드를 나누거나 빌드(Step)로 쪼갠다. 스크롤은 쓰지 않는다.
- 내용을 지우고 나서 빈 공간이 생기면 방치하지 말고 균형을 다시 잡는다(가운데 정렬, `my-auto`, `justify-center` 등).

## 2. 타이포그래피 (최소 크기 엄수)

| 용도 | 크기 | 비고 |
|---|---|---|
| 슬라이드 제목 (SlideFrame `title`) | 52px bold | 핵심 메시지를 담은 문장형 헤드라인 |
| 리드 문장 (`lead`) | 24px | 선택 |
| 본문 | 22–26px | `Body` = 26px, 카드 안 본문은 22–24px |
| 카드 제목 | 26–32px semibold/bold | |
| 캡션·주석 | **최소 19px** | `Caption` = 20px. 19px 미만 금지 (칩·라벨 17px만 예외) |
| 큰 숫자 | 64–120px `font-serif` | `Stat` |

- 폰트: 한글·본문 = Pretendard(`font-sans`, npm 패키지로 로컬 번들), 영문 장식·숫자 = Instrument Serif(`font-serif`), 영문 본문 세리프 = Newsreader(`font-text-serif`, 초록 슬라이드).
- 캔버스에 `word-break: keep-all`이 걸려 있어 한국어 단어가 중간에서 끊기지 않는다.
- **줄바꿈 지정**은 `<br />`로 한다. **"한 줄로"** 요청은 `whitespace-nowrap`을 쓰고, 칸이 좁으면 폭을 다시 배분한다(글자를 19px 아래로 줄이지 않는다).
- `<br />`을 넣는 글이 flex 항목 안에 있고 `text-pretty`가 걸려 있으면 WebKit(Safari)이 줄을 한 번 더 나눌 수 있다. 글 칸에 `flex-1`을 주고 `--browser webkit` 캡처로 줄 수를 확인한다. 꼭 붙어 있어야 하는 굵은 구절은 `whitespace-nowrap`으로 묶는다.

## 3. 색

섹션 색은 초록(Abstract) 슬라이드의 형광펜 색과 같다. 각 섹션은 자기 색을 주조색으로 쓴다.

| 섹션 | tone | soft (형광펜) | strong | deep (텍스트) |
|---|---|---|---|---|
| 00 개요·01 질문 | red | `bg-hl-red` #ffc0c0 | `c-red` #e0464e | `d-red` #8f1d24 |
| 02 이론 | yellow | `bg-hl-yellow` #fff4cc (tone-soft #ffeaa6) | `c-yellow` #d99a00 | `d-yellow` #6b4b00 |
| 03 방법론 | green | `bg-hl-green` #b1ebcf | `c-green` #1e9e6a | `d-green` #0e5638 |
| 04 결과 | blue | `bg-hl-blue` #b1c7e6 | `c-blue` #3767b8 | `d-blue` #1c3c75 |
| 05 결론 | purple | `bg-hl-purple` #cdb8f8 | `c-purple` #7650da | `d-purple` #43278f |

- `SlideFrame section="..."` 안에서는 현재 섹션 색 토큰을 쓴다: `bg-tone`, `bg-tone-soft`, `text-tone`, `text-tone-ink`, `ring-tone/20` 등. 투명도 수식어(`/40`)도 쓸 수 있다.
- 다른 섹션 색이 필요하면 정적 클래스(`bg-hl-*`, `text-c-*`, `text-d-*`)나 `TONE_CLASS` 맵을 쓴다. **클래스 이름을 문자열 조합으로 만들지 않는다**(Tailwind는 정적 문자열만 인식한다).
- 중립색: `bg-paper` #f7f4ee, `bg-paper-2` #efeae1, 카드 `bg-surface` #fffdf9, 선 `ring-line`/`bg-line` #e3ddd2, 글자 `text-ink` / `text-ink-2` / `text-ink-3`.
- 차트·표에서는 비교 기준을 중립 회색으로, 주목 대상을 섹션 색으로 칠한다.
- 표지·마무리 배경은 삽화 배경과 같은 크림색 `#fef5e4`이다.

## 4. 공용 컴포넌트 (`@/components/slide/primitives`)

```tsx
<SlideFrame section="theory" kicker="2.1 …" title={<>…<Mark>…</Mark></>} lead="…" bodyClassName="grid grid-cols-2 gap-10">…</SlideFrame>
<Reveal kind="rise|fade|pop">        // 슬라이드가 열릴 때 문서 순서대로 0.07초 간격으로 떠오름
<Step at={1}>                         // 빌드: →/Space로 at번째 단계에 등장. SlideDef.steps = 가장 큰 at
useStepShown(n) / useSlide()          // 단계에 따른 조건부 스타일, 클릭으로 단계 제어
<Mark tone? variant="marker|block">   // 형광펜. marker = 아래 절반(제목용, 기본), block = 줄 전체(본문용)
<Em> <Body> <Caption> <Eyebrow> <Panel> <Callout icon title tone?> <Quote by?> <Stat> <NumberDot> <Chip> <SigBadge significant>
```

- shadcn 컴포넌트(`@/components/ui/*`): badge, card, table, separator, tooltip, kbd, button, dialog. Table은 기본 `text-sm`을 20–23px로 덮어쓴다.
- 아이콘은 `lucide-react`를 쓴다. 이름이 있는지는 `node_modules/lucide-react/dist/lucide-react.d.ts`에서 `declare const 이름:`으로 확인한다.
- 제목의 형광펜은 슬라이드당 보통 1개(`Mark`)이다. 사용자가 없애거나 더해 달라고 하면 그대로 따른다.

## 5. 애니메이션 (framer-motion)

- 블록은 `Reveal`로 감싸 진입 stagger를 준다.
- 빌드(Step)는 말로 풀어 갈 때 도움이 되는 곳에만 쓰고, `SlideDef.steps`를 가장 큰 `at`과 반드시 맞춘다.
- motion 요소에 variants를 줄 때는 **enter/center(진입)와 hidden/shown(빌드)을 둘 다** 정의해야 Step 안에서도 동작한다(`primitives.tsx`의 rise 참고).
- **금지**: `layout`/`layoutId` 애니메이션(확대·축소된 캔버스에서 어긋남), `whileInView`, 무한 반복 남발, `backdrop-filter`.
- 버튼은 클릭한 뒤 `e.currentTarget.blur()`를 호출한다. 그래야 Space 키가 버튼을 다시 누르지 않는다. 인라인 텍스트를 클릭 대상으로 할 때는 `<span role="button">`을 쓴다.
- 키보드는 덱이 document 전체에서 처리한다. 슬라이드에서 키 이벤트를 따로 걸지 않는다.
- 그리드에 열을 추가하면 자동 배치로 칸이 밀릴 수 있다. 이럴 때는 `row-start-*`·`col-start-*`로 위치를 명시한다(`method/05-exp2.tsx` 참고).

## 6. 내용 원칙

- 사실과 수치는 `docs/source/`의 「쉬운 해설」 원문에 있는 것만 쓴다. 영어 원문 대조는 `docs/source/원문_영어.txt`에서 한다.
- 원문의 단서 표현(우연 범위, suggestive/잠정적, modest, 짐작 ≠ 실제 성격, 복합 처치 등)은 빠뜨리지 않는다.
- 용어는 `docs/HANDOFF.md`의 "용어·표기 규칙"을 따른다.

## 7. 파일 규칙

- 슬라이드 1장 = 파일 1개(`NN-name.tsx`). 파일 첫 줄은 `"use client";`이고, `SlideDef`를 export한다.
- 순서는 각 섹션 폴더의 `index.ts` 배열이 정하고, 전체 순서는 `src/slides/index.ts`가 정한다.
- `id`는 `섹션-이름` 형식의 kebab-case이다. 이 id가 URL 해시(`#/id`)와 스크린샷 대상으로 쓰인다.
- 새 npm 패키지는 꼭 필요할 때만 추가한다.

## 8. 검증 루프 (수정할 때마다)

```bash
npm run dev                                  # http://localhost:3100 (따로 켜 둔다)
npm run check                                # tsc + eslint
node tools/shot.mjs <id> <id>/<단계>          # 고친 슬라이드만 캡처 → tools/.shots/chrome/*.png
npm run shots                                # 전체를 마지막 빌드 단계로 캡처 + 6장씩 모아보기(sheetN.png)
npm run shots:safari                         # 같은 캡처를 Safari 엔진(WebKit)으로
npm run test:ui                              # 키보드·클릭·목록·새로고침 인터랙션 테스트 (Chrome + WebKit)
```

- 캡처 PNG는 반드시 직접 열어 확인한다. 도구가 출력하는 `⚠ overflow`, `⚠ footer zone`, `runtime errors` 경고는 0이어야 한다.
- 발표 직전에는 `npm run build && npm run start`로 프로덕션 상태를 확인한다.
