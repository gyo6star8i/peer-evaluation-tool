# 팀프로젝트 동료평가 수합 도구

학생은 스마트기기로 GitHub Pages 링크에 접속해 학번, 성명, 소속 모둠, 모둠별 평가 점수를 제출합니다. 교수자는 집계 화면에서 Google Sheet에 모인 응답을 불러와 모둠별 점수와 CSV를 확인합니다.

## 파일 구성

- `index.html`: 학생용 평가 입력 화면
- `admin.html`: 교수자용 집계 화면
- `config.js`: 모둠, 평가항목, Apps Script URL 설정
- `apps-script/Code.gs`: Google Sheets에 응답을 저장하고 읽어오는 Apps Script 코드

## 1. Google Sheet 수합 서버 만들기

1. 새 Google 스프레드시트를 만듭니다.
2. `확장 프로그램` → `Apps Script`를 엽니다.
3. 기본 코드를 지우고 `apps-script/Code.gs` 내용을 붙여넣습니다.
4. 왼쪽 `프로젝트 설정` → `스크립트 속성`에 `ADMIN_KEY`를 추가하고 교수자 확인 키를 입력합니다.
5. 저장 후 `배포` → `새 배포`를 누릅니다.
6. 유형은 `웹 앱`으로 선택합니다.
7. 실행 권한은 `나`, 액세스 권한은 `모든 사용자`로 설정합니다.
8. 배포 후 발급되는 웹 앱 URL을 복사합니다.

## 2. 도구 설정

`config.js`에서 아래 항목을 수정합니다.

```js
appsScriptUrl: "여기에_웹_앱_URL_붙여넣기",
teams: [
  { id: "team-1", name: "1모둠", topic: "발표 주제" }
],
criteria: [
  { id: "understanding", name: "주제 이해", max: 5, weight: 20 }
]
```

`id`는 영문/숫자/하이픈 조합을 권장합니다. 이미 응답을 받은 뒤에는 모둠과 평가항목의 `id`를 바꾸지 않는 편이 좋습니다.

## 3. GitHub Pages 배포

1. GitHub에 새 저장소를 만듭니다.
2. `index.html`, `admin.html`, `config.js`, `apps-script/Code.gs`, `README.md`를 업로드합니다.
3. 저장소 `Settings` → `Pages`에서 배포 브랜치를 `main`으로 선택합니다.
4. 학생에게 `https://계정명.github.io/저장소명/` 링크를 공유합니다.
5. 교수자는 `https://계정명.github.io/저장소명/admin.html`에서 교수자 확인 키를 입력하고 응답을 불러옵니다.

## 집계 방식

- 학생 1명이 모든 모둠을 한 번에 평가합니다.
- 각 모둠 점수는 `받은 점수 / 만점 * 가중치`를 합산해 100점 만점으로 환산합니다.
- 기본값은 자기 소속 모둠 평가를 집계에서 제외합니다. `config.js`의 `excludeSelfTeam`을 `false`로 바꾸면 포함합니다.
- 같은 학번이 같은 모둠을 여러 번 제출하면 집계 화면에서는 가장 최근 제출만 반영합니다. Google Sheet 원자료에는 모든 제출 기록이 남습니다.

## 운영 팁

- 발표 시작 전 학생들에게 한 번 접속 테스트를 시키면 네트워크 문제를 빨리 잡을 수 있습니다.
- 집계 화면은 수업 중 `응답 불러오기`를 눌러 최신 상태를 확인합니다.
- 최종 제출 후 `집계 CSV`와 `원자료 CSV`를 내려받아 성적 처리 자료로 보관하세요.
