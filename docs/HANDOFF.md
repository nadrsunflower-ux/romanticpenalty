# 인수인계 — 「A Romantic Penalty?」 발표 슬라이드

> 새 채팅에서 이어서 작업할 때 **이 문서를 먼저 읽는다.** 디자인 규칙은 `docs/DESIGN_GUIDE.md`에 있다.
> 마지막 갱신: 2026-09-28 (6차 수정까지 반영, 24장)

## 1. 프로젝트 개요

- **발표 대상 논문**: Tong, D., Li, X., & Park, H. D. (2026). *A romantic penalty? Female entrepreneurship and relationship initiation in online dating.* Journal of Business Venturing, 41, 106608.
- **발표자**: 고려대학교 대학원 첨단기술비즈니스학과 4기 유선화 — [26-2] 창업사례연구세미나. 발표 시간은 약 20분이다.
- **형태**: 16:9 슬라이드형 웹사이트. Next.js 16(App Router) + Tailwind CSS v4 + shadcn/ui(base-ui 스타일) + framer-motion 13으로 만들었다.
- **원자료** (상위 폴더 `[26-2] 창업사례연구세미나/`):
  - 논문 원문 PDF
  - `A-romantic-penalty_국문번역.md/.pdf`
  - `A-romantic-penalty_분석보고서.md/.pdf`
  - `A-romantic-penalty_쉬운해설.pdf` — 슬라이드 3번부터의 내용 출처
  - `초록.png` — 초록 형광펜 원본
- **출처 텍스트 사본**: `docs/source/`
  - 「쉬운 해설」 섹션별 발췌와 전체본
  - 영어 원문 텍스트(`원문_영어.txt`)
  - 어려운 말 사전

## 2. 처음 요청받은 구성 (사용자 원 요구사항)

1. **슬라이드 1**
   - 논문 제목과 저자
   - GPT Image 2로 만든 삽화
   - 하단에 "첨단기술비즈니스학과 4기 유선화"
2. **슬라이드 2**
   - `초록.png`의 형광펜 5색을 똑같은 효과로 재현한다.
   - 형광펜 문장을 클릭하면 사용자가 쓴 설명이 애니메이션으로 나온다.
   - 색과 내용의 대응: 빨강=서론, 노랑=이론적 배경, 초록=방법론, 파랑=결과, 보라=결론(연구 의의)
3. **슬라이드 3부터**: 「쉬운 해설」 PDF의 다음 다섯 부분을 순서대로 담는다.
   - 1장 이 연구가 던진 질문
   - 2장 이론적 배경
   - 3장 방법론
   - 4장 결과
   - 5장 결론
4. **분량과 기능**: 전체 약 20분. 타이머나 슬라이드별 시간 표시는 넣지 않는다.

## 3. 실행·확인

```bash
cd romantic-penalty-slides
npm install                 # 처음 한 번 (node_modules가 없을 때)
npm run dev                 # 편집용 → http://localhost:3100
npm run build && npm run start   # 발표용(프로덕션) → http://localhost:3100
```

- **조작**
  - 다음: `→` / `Space`
  - 이전: `←`
  - 빌드 단계 건너뛰기: `Shift+→`
  - 슬라이드 목록: `G`
  - 전체 화면: `F`
  - 처음/끝: `Home` / `End`
- **해시**: 주소의 `#/12/2`(12번 슬라이드 2단계)나 `#/slide-id`로 바로 이동한다. 새로고침해도 같은 화면이 유지된다.
- **검증 도구**(개발 서버가 켜진 상태에서):
  - `npm run check` — tsc와 eslint
  - `node tools/shot.mjs <id>/<단계>` — 특정 슬라이드 캡처
  - `npm run shots` / `npm run shots:safari` — 전체를 마지막 빌드 단계로 캡처하고 모아보기 이미지 생성. 결과는 `tools/.shots/`
  - `npm run test:ui` — 인터랙션 19개 항목을 Chrome과 WebKit에서 테스트
  - Playwright 1.63.0(WebKit 2359 캐시와 버전을 맞춤)을 쓰고, Chrome은 설치된 Google Chrome을 쓴다.
- **버전 관리**: 로컬 작업 브랜치는 `presentation`이다(로컬 `main`에는 create-next-app 초기 커밋만 있다). 수정을 마칠 때마다 이 브랜치에 커밋한다.
  - 원격 `origin` = https://github.com/nadrsunflower-ux/romanticpenalty (**공개 저장소**). 로컬 `presentation`을 원격 `main`으로 올린다.
  - 푸시: `git push origin presentation:main`. 브랜치 이름이 달라 `git push`만 쓰면 거절된다.
  - 삽화 원본 PNG 때문에 HTTPS 푸시가 HTTP 400으로 끊길 수 있어서, 이 저장소에 `http.postBuffer`를 500MB로 설정해 두었다.
  - `docs/source/원문_영어.txt`는 논문 원문이다. 이 논문은 CC BY 4.0 오픈 액세스라 공개 저장소에 두어도 된다.
- **배포**: Vercel 프로젝트 `romanticpenalty`(팀 `sunflowers-projects-9c1bed07`) → **https://romanticpenalty.vercel.app**
  - GitHub 저장소와 연결되어 있어 원격 `main`에 푸시하면 자동으로 프로덕션 배포된다. 수동 배포는 `vercel --prod`.
  - 배포본 확인: `node tools/shot.mjs final --base https://romanticpenalty.vercel.app [--browser webkit]`, `node tools/interact.mjs chrome https://romanticpenalty.vercel.app`
- **Safari 대비**: `package.json`의 `browserslist`에 Safari ≥ 15를 넣어 두었다. 사용자 전역 규칙인 "Safari 에러" 대응을 선제 적용한 것이다.

## 4. 슬라이드 번호표 (현재 24장)

사용자는 수정 요청을 **슬라이드 번호**로 한다. 슬라이드를 추가하거나 지우면 번호가 바뀌므로 이 표도 갱신한다. 표를 다시 뽑을 때는 `npm run shots` 출력의 번호와 제목을 쓰면 된다.

| # | 섹션 | 제목(목록용) | id | 빌드 단계 | 파일 (src/slides/) |
|---|---|---|---|---|---|
| 1 | 00 개요 | 표지 | `cover` | 0 | `00-cover.tsx` |
| 2 | 00 개요 | 초록 (Abstract) | `abstract` | 5 | `01-abstract.tsx` |
| 3 | 01 질문 | 왜 이런 걸 연구했을까 | `question-why` | 1 | `question/01-why.tsx` |
| 4 | 01 질문 | 왜 ‘연애를 시작하는 순간’인가 | `question-threshold` | 2 | `question/02-threshold.tsx` |
| 5 | 02 이론 | 여자다움 vs 창업가다움 | `theory-role-conflict` | 2 | `theory/01-role-conflict.tsx` |
| 6 | 02 이론 | 무엇을 기준으로 보느냐 | `theory-lens` | 2 | `theory/02-lens.tsx` |
| 7 | 02 이론 | 너무 바쁠 것 같다 | `theory-time` | 2 | `theory/03-time.tsx` |
| 8 | 02 이론 | 연구진이 세운 두 가지 예상 | `theory-hypotheses` | 2 | `theory/04-hypotheses.tsx` |
| 9 | 03 방법론 | 왜 관찰 대신 실험인가 | `method-why-experiment` | 2 | `method/01-why-experiment.tsx` |
| 10 | 03 방법론 | 핵심 아이디어: 쌍둥이 프로필 | `method-twin-profiles` | 1 | `method/02-twin-profiles.tsx` |
| 11 | 03 방법론 | 한계(복합 처치)와 연구윤리 | `method-limits-ethics` | 2 | `method/03-limits-ethics.tsx` |
| 12 | 03 방법론 | 실험 1: 창업가 vs 회사 관리자 | `method-exp1` | 0 | `method/04-exp1.tsx` |
| 13 | 03 방법론 | 실험 2: 창업가에도 종류가 있다 | `method-exp2` | 0 | `method/05-exp2.tsx` |
| 14 | 03 방법론 | 실험 3: 왜 그런지 물어보기 | `method-exp3` | 0 | `method/06-exp3.tsx` |
| 15 | 04 결과 | 여성에게만 생기는 불이익 | `result-female-only` | 3 | `result/part-a/01-female-only.tsx` |
| 16 | 04 결과 | 예외 — 상대도 창업가라면 | `result-reversal` | 3 | `result/part-a/02-reversal.tsx` |
| 17 | 04 결과 | ‘창업가라서’가 아니라 ‘바빠 보여서’? | `result-busy` | 2 | `result/part-b/01-busy.tsx` |
| 18 | 04 결과 | 두 실험에 대한 논문의 관점 | `result-two-readings` | 2 | `result/part-b/02-two-readings.tsx` |
| 19 | 04 결과 | 남성들의 속마음 — 인상과 답장 의향 | `result-impressions` | 2 | `result/part-b/03-impressions.tsx` |
| 20 | 04 결과 | 직접 쓴 답변과 성역할 태도 | `result-voices` | 2 | `result/part-b/04-voices.tsx` |
| 21 | 04 결과 | 엇갈림과 연구진의 단서 | `result-caveats` | 2 | `result/part-b/05-caveats.tsx` |
| 22 | 05 결론 | 이 연구가 보여준 것 | `conclusion-findings` | 2 | `conclusion/01-findings.tsx` |
| 23 | 05 결론 | 왜 중요한가 — 창업가 부부 · 조용한 편견 | `conclusion-first-message` | 2 | `conclusion/02-first-message.tsx` |
| 24 | 05 결론 | 감사합니다 | `closing` | 0 | `99-closing.tsx` |

## 5. 확정된 결정 사항 (되돌리지 말 것)

- **2번 슬라이드 설명은 사용자가 직접 쓴 글이다.** 문구는 그대로 두고, 아래만 고쳤다.
  - 오탈자: 연예→연애, 매커니즘→메커니즘, 패널티→페널티
  - 방법론 제목: "하이브리드 (주: 질적 연구 / 부: 양적 연구)" → **"양적 연구"**. 사용자가 강박적으로 검토하라고 요청해서 원문을 확인했다.
    - 독립 검토자 3명이 모두 양적 연구로 판정했다.
    - 논문은 스스로를 *"two field experiments, supplemented by a survey experiment"*라고 소개하고 *"causal evidence"*를 주장한다. mixed/hybrid라는 자기규정은 없다.
    - 질적 요소는 보조뿐이다: 설문 끝 주관식 2문항(BERT 토픽 모델링으로 빈도 집계, p.13)과 각주 21의 비공식 인터뷰.
  - 결과 2번 문장에는 원문의 "suggestive(잠정적)"가 빠져 있다. 사용자에게 알렸고, 사용자가 그대로 두었다.
- **용어·표기 규칙**
  - '창업가'로 통일한다('창업자' 금지 — 사용자 지시, "사이버보안 스타트업 창업가" 포함).
  - '페널티', '%포인트', '회사 관리자', '얼굴 사진 13장'
  - 실험 1 표기: "창업가 vs 회사 관리자"(알약은 "창업가 vs 관리자")
- **방법론 13번과 결과 17번의 2×2 매트릭스는 축 방향이 같다**: 열 = 창업가인가(예/아니오), 행 = 바빠 보이나(매우 바쁨/덜 바쁨).
- **삭제한 슬라이드** — 모두 사용자 지시로 지웠고 파일도 없다(git 이력에는 남아 있다).
  - 2차: 옛 16번 `result-chance`(동전 비유·통계적 유의성)와 옛 17번 `result-effect-size`(%포인트, 6.7%p는 큰가 작은가, 100칸 도트). 다시 필요하면 `docs/source/4a_결과_4.1-4.2.txt`를 바탕으로 새로 만든다.
  - 5차: 옛 23번 `conclusion-hidden-cost`(왜 중요한가 ① 보이지 않던 비용), 옛 25번 `conclusion-not-said`(이 연구가 말하지 않은 것 — 범위·한계), 옛 26번 `conclusion-questions`(생각해 볼 질문). 파일은 커밋 `e474501`의 `src/slides/conclusion/02-hidden-cost.tsx`·`04-not-said.tsx`·`05-questions.tsx`에 있고, 내용 출처는 `docs/source/5_결론.txt`이다.
  - 그래서 결론의 "왜 중요한가"는 창업가 부부·조용한 편견 두 가지만 남았고, 번호도 1·2로 매겼다.
- **2번 슬라이드 형광펜 색** — 초록.png에서 추출:
  - 빨강 #ffc0c0, 초록 #b1ebcf, 파랑 #b1c7e6, 보라 #cdb8f8
  - 노랑만 투사 환경을 고려해 #fff4cc → #fff0ba로 아주 약간 진하게
  - 이 5색이 덱 전체의 섹션 색이다.

## 6. 수정 이력

### 1차 — 최초 제작
- 표지, 초록 인터랙션, 01 질문(2장), 덱 엔진은 직접 작성했다.
- 02~05 섹션은 섹션별 에이전트가 만들었고, 독립 검수 에이전트가 원문 대조와 시각 검수를 한 뒤 덱 전체 일관성을 검토했다.
- 일관성 검토에서 고친 것:
  - 13번 매트릭스 축 방향 통일
  - 명칭 통일
  - 19번 '일에 매여 있는 정도'에 "바빠 보임" 태그
  - 26번 질문 1에 보조문 "(정확히는 — 남성 쪽 차이는 우연 범위였으니, 남자에게는 손해가 아닌데 여자에게만 손해가 된다)"
- 해시에 빌드 단계를 기록하도록 바꿨다.
- 버그 수정: 표지 레이어가 하단 조작 버튼을 가리던 문제를 z-index로 해결했다.

### 2차 — 사용자 수정 요청 (당시 번호 기준)
- **1**: 제목 "A romantic penalty?" 전체에 분홍 형광펜
- **3**
  - 리드 문단 줄바꿈
  - "여성 창업가가 직원을 뽑기 더 어려운가?"
  - "→ 대부분…"을 23px로 키우고 '이미 결혼해 아이가 있는 여성'·'사업 쪽 이야기'를 볼드
  - 오른쪽 질문 2곳 줄바꿈
- **5**: '(스테레오타입)'과 '논문이 든 표현은 이렇다' 삭제
- **6**
  - 제목의 '깎이는 쪽' → '흠이 되는 쪽'
  - '넘겨짚기의 무서운 점' 블록 삭제
  - '그렇다면 다정함이 왜 연애에서 문제가 될까?' 블록을 오른쪽 자리로 이동
- **7**
  - 인용문 줄바꿈("가정을 챙길 시간도, 마음도 없을 것 같은데?"는 한 줄)과 형광펜 확장
  - 소제목 "그렇다면 바쁨이 왜 연애에서 문제가 될까?"에 돋보기 아이콘
  - 흐름 3칸 문구·줄바꿈 변경(칸 폭 때문에 아이콘을 글자 위로 옮김)
- **8**: 제목 형광펜 제거, '실험을 하기 전에 세운…' 삭제
- **9**
  - 리드 문장 교체
  - '무작위 — 제비뽑기하듯…' 삭제
  - 제목 형광펜 제거
- **10**
  - 선행 실험 문장을 한 줄로 교체(이력서 비유 삭제, 카드 사이 간격을 줄여 폭 확보)
  - 결론 문장 줄바꿈
- **11**
  - Callout을 "논문도 이 점을 인정한다" + 검은 글씨 "— 그래서 ‘복합 처치(여러 가지가 한 번에 바뀐 실험)’라고 부른다."로 변경
  - Eyebrow를 '연구윤리'로 변경
  - 마지막 문장 줄바꿈
- **12**: '언제' 행 삭제
- **13**
  - 문구 2개와 '시안 한 도시에서만'·'왜 시안인가' 블록 삭제
  - '실험 2 한눈에' → '실험 2'
  - 빌드 단계 제거
- **14**: '얼굴 사진 13장' 블록을 제목 바로 아래로 옮기고, 빌드 없이 처음부터 보이게 함
- **15**
  - '대략값' 문구와 '눈으로 본 평균일 뿐, 계산해 보면' 삭제
  - "남성 쪽 차이는 우연으로도 충분히 생길 수 있는 크기였다."를 한 줄로
  - 역산 각주 삭제
- **16~17**: 삭제(§5 참고)
- **2**: 방법론 → "양적 연구"(§5 참고)

### 3차
- '창업자' → '창업가' 통일(3번, 14번)

### 4차 (현재 번호 기준)
- **8**: 예상 1·2 줄바꿈
- **9**
  - '그렇다면 어떻게?' 블록 내용을 세로 가운데 정렬
  - "그래서 연구진은 실험을 택했다."는 검은색, '실험'만 초록(c-green)에 27px
- **10**: '사진도~직업란이다' 문단을 위아래 여백이 같게 가운데 배치
- **13**: '실험 2' 블록의 위·아래 끝을 스타트업 대표 칸 위 ~ 꽃집 사장 칸 아래에 맞춤(같은 그리드의 2~3행에 배치)
- **16**
  - 도식 위 Eyebrow와 '화살표는 방향만…' 삭제
  - "야심과 바쁨은 / 흠이 아니라…" 줄바꿈
  - '몇 %포인트' 칩을 '뒤집힌 방향' 칩 아래로 세로 배치
  - 도식을 세로 가운데로
- **17**
  - "‘창업가 전체’에 대한 불이익은 / 이 실험에서 나타나지 않았다." 줄바꿈
  - 스타트업 대표 설명을 "교사와 비교해 불이익을 받았다"로
- **18**
  - 제목 '바빠 보여서'에 파란 형광펜
  - 소제목 "4.3 두 실험에 대한 논문의 관점"
  - 첫째/둘째 읽기 → 관점 1/관점 2
  - 줄바꿈 2곳
  - '→ 마지막 토론 질문 3' 삭제

### 5차 (옛 번호 기준 — 수정 뒤 번호는 §4)
- **4**: 리드 "가족을 이루는 과정을 순서대로 늘어놓으면 이렇다." 삭제. 빈 높이만큼 도식을 내려 제목–도식, 도식–아래 문단 간격을 맞춤
- **8**
  - 예상 1·2를 각각 한 줄로(요청 문구대로 끝에 마침표를 붙임)
  - 한 줄에 들어가도록 오른쪽 패널을 520→478px(열 간격 40→36px), 카드 안쪽 여백과 번호 칸을 줄이고 예상 문장을 33→30px로
  - 패널이 좁아져 WebKit에서 굵은 '바쁨과 야심'이 두 줄로 갈라지던 것을 `whitespace-nowrap`으로 묶어 원래 줄바꿈 유지
- **12**: '왜 남성 프로필도 만들었나?' 블록을 빌드·진입 애니메이션 없이 처음부터 보이게 함(빌드 단계 0)
- **14**
  - '앞선 실험의 약점' 블록(얼굴 사진 13장 띠 전체) 삭제
  - 남은 두 칸이 빈 높이를 채우도록 다시 배치: 985명 숫자와 직업 칩을 키우고 직업 부분을 패널 아래로 보냄. 물은 인상 4칸은 아이콘 위·질문 아래의 세로 타일로
- **19**: 표 머리의 '막대 = 답장 의향 차이 중 이 인상을 거친 몫' 삭제
- **20**
  - "교사에게 쓰인 경우는 교실에서 아이들을 이끄는 역할 때문인 경우가 많았다." 한 줄('타고난 성격이 아니라'·'고 연구진은 덧붙인다' 삭제)
  - '직업 한 줄' → '직업'
  - 쐐기 도식 캡션에서 '(개념도 — 크기는 수치가 아님)' 삭제, '성역할 태도 점수'만 남김
- **21**
  - "간호사도 불이익을 받았다 / → ‘바빠 보이는 게 문제’라는 쪽을 가리켰다." 줄바꿈
  - "그런데 ‘바빠 보인다’는 인상 자체는 / 답장 의향과 이어지지 않았다." 줄바꿈
  - '— 이유는 셋' 삭제
  - WebKit에서 두 카드가 3줄로 꺾이던 문제를 카드 글 칸에 `flex-1`을 줘서 해결(아래 §7 WebKit 주의 참고)
- **22**
  - '읽기 전에 · 범위' 블록 삭제. 남은 블록 간격·칸 높이를 늘려 균형을 맞춤
  - 칩 '잠정적 해석 · 논문이 확정한 것 아님' → '잠정적 해석'
- **23, 25, 26**: 삭제(§5 참고)
- **24** (현재 23)
  - '둘째 · '·'셋째 · ' 삭제, 번호를 1·2로. 소제목(kicker)의 '— 둘째·셋째'도 삭제하고 목록 제목의 ②를 뺌
  - '첫 메시지 단계' → '첫 단계'(제목, 예전부터 있던 관찰 칸의 문장). 시간축 라벨 '첫 메시지'는 그대로 둠
  - 단서 첫 줄 "답장을 안 할 이유는 얼마든지 있고, / 원래 열에…" 줄바꿈. WebKit에서 3줄이 되어 본문이 804px를 넘던 것을 항목 글 칸 `flex-1`로 해결

### 6차
- **24(마지막)**: 'you'의 빨간 형광펜 제거, '감사합니다 · 질문과 토론' → '감사합니다'
- GitHub 공개 저장소에 푸시하고 Vercel CLI로 배포(§3 참고)

## 7. 사용자와 일하는 방식 (다음 세션용 메모)

- 요청은 **"** 슬라이드 N" 목록으로 오고, 바꿀 문구를 정확히 적어 준다.
  - **"(줄바꿈)"** → `<br />`
  - **"한 줄로"** → `whitespace-nowrap`에 필요하면 폭을 다시 배분한다.
  - 문구는 글자 그대로 반영한다.
- 요청이 모호하면 가장 그럴듯한 해석으로 반영하고, 어떻게 해석했는지 답변에 밝힌다(예: "가운데 정렬 = 세로 가운데").
- 사용자가 준 글에 오탈자나 원문과 어긋나는 점이 있으면 알린다. 사용자 지시와 덱 규칙이 어긋날 때(예: 창업자/창업가)는 그대로 반영하되 알린다.
- 삭제로 빈 공간이 생기면 균형을 다시 잡고, 그렇게 했다고 알린다.
- **WebKit 주의 — `<br />` 줄바꿈 요청**: 글 칸이 내용 폭만큼만 잡히는 flex 항목(아이콘 옆 글 등)이고 `text-pretty`가 걸려 있으면, `<br />`을 넣은 뒤 WebKit(Safari)만 줄을 한 번 더 나눈다. 글 칸에 `flex-1`(또는 `w-full`)을 주면 해결된다. 줄바꿈을 넣은 뒤에는 반드시 `--browser webkit` 캡처로 줄 수를 확인한다(5차 21·23번).
- 수정 후에는 매번 `npm run check`와 해당 슬라이드 캡처를 확인한다. 큰 수정 뒤에는 `npm run shots`, `npm run shots:safari`, `npm run test:ui`, 프로덕션 빌드까지 돌린다.
- 답변은 한국어로, 본론부터 한다.

## 8. 삽화 (GPT Image 2 — Higgsfield CLI `gpt_image_2`, 4:5, 2k, quality high)

- 표지: `src/assets/cover-illustration.webp` (원본 `docs/illustrations/cover-illustration_original.png`, job `642ba082-…`)
  > Editorial flat illustration for the cover of an academic seminar presentation about female entrepreneurship and romance in online dating. A confident young East Asian woman startup founder in a relaxed blazer sits at a minimalist desk with an open laptop showing a rising growth chart, holding a smartphone that shows a dating app. Above her, soft chat bubbles float, and a delicate balance scale gently tilts: a small briefcase on one pan, a pink heart on the other, suggesting quiet tension between ambition and romance. Modern minimalist editorial spot-illustration style like The New Yorker or Monocle, clean geometric shapes, subtle risograph grain texture, generous negative space, calm and sophisticated mood. Limited palette only: warm off-white cream background (#F7F3EC), deep navy ink (#1C2340), soft coral pink (#FF9E9E), pale butter yellow (#FFE9A8), mint green (#9FE3C3), dusty periwinkle blue (#A9C1E8), lavender (#C7B3F5). Absolutely no text, no letters, no numbers, no logos, no watermark.
- 쌍둥이 프로필(10번 슬라이드 아바타에 사용): `src/assets/twin-profiles.webp` (원본 `docs/illustrations/twin-profiles_original.png`, job `2b42bed5-…`)
  > Conceptual editorial flat illustration for an academic presentation cover. Two identical dating-app profile cards stand side by side like twins, each with the same simple portrait of a young East Asian woman with shoulder-length hair; the only difference is a small icon badge: the left card has a tiny rocket badge (startup founder), the right card has a tiny briefcase badge (company manager). Many small pink hearts and chat bubbles float toward the right card, while only a few hearts reach the left card, and one lonely chat bubble with three dots hangs unanswered above it. (팔레트·금지 문구는 표지와 같음)
- 웹용 변환: 1440×1800 WebP q90(Pillow). 표지 배경색 #fef5e4는 삽화 배경에서 추출했다.

## 9. 구조 요약

```
romantic-penalty-slides/
  src/app/                layout(폰트·메타) · page(Deck) · globals.css(색 토큰)
  src/components/deck/    덱 엔진: 1600×900 스테이지 스케일링, 키보드/스와이프/해시, 전환, 바닥글·진행 막대, 조작 버튼, 목록(G)
  src/components/slide/   primitives.tsx(공용 컴포넌트) · motion.ts
  src/components/ui/      shadcn 컴포넌트
  src/slides/             슬라이드 (섹션 폴더별 index.ts가 순서 결정 → src/slides/index.ts)
  src/assets/             삽화 WebP
  tools/                  shot.mjs(캡처·레이아웃 검사) · interact.mjs(인터랙션 테스트) · sheet.py(모아보기)
  docs/                   HANDOFF.md(이 문서) · DESIGN_GUIDE.md · source/(원문 발췌) · illustrations/(삽화 원본)
```
