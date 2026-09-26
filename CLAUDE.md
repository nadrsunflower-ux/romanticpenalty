@AGENTS.md

# 「A Romantic Penalty?」 발표 슬라이드 웹사이트

논문 발표용 16:9 슬라이드형 웹사이트(Next.js 16 · Tailwind v4 · shadcn · framer-motion). 발표자는 첨단기술비즈니스학과 4기 유선화이다.

**작업을 시작하기 전에 반드시 읽을 문서**
- `docs/HANDOFF.md` — 요구사항, 확정된 결정, 수정 이력, **슬라이드 번호 ↔ 파일 표**, 사용자와 일하는 방식
- `docs/DESIGN_GUIDE.md` — 캔버스·타이포·색·컴포넌트·애니메이션 규칙과 검증 루프

**핵심 규칙 요약**
- 사용자는 "슬라이드 N" 번호로 수정을 요청한다. HANDOFF의 번호표로 파일을 찾고, 문구와 "(줄바꿈)"을 글자 그대로 반영한다.
- 슬라이드를 추가하거나 지우면 번호표와 수정 이력(HANDOFF §4, §6)을 함께 갱신한다.
- 용어: '창업가'(창업자 ✗), '페널티', '%포인트'. 2번 슬라이드의 방법론 라벨은 검증을 거쳐 확정한 "양적 연구"이다.
- 사실과 수치는 `docs/source/`의 해설 원문에 있는 것만 쓴다.
- 수정 후에는 `npm run check`를 돌리고 `node tools/shot.mjs <id>/<단계>`로 캡처해 PNG를 직접 확인한다. 큰 수정 뒤에는 `npm run shots`, `npm run shots:safari`, `npm run test:ui`, `npm run build`까지 돌린다. 캡처와 테스트는 개발 서버(`npm run dev`, 포트 3100)가 켜져 있어야 한다.
