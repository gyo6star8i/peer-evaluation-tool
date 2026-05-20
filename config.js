window.EVAL_CONFIG = {
  appTitle: "팀프로젝트 동료평가",
  className: "1학년 팀프로젝트 발표",

  // Google Apps Script 배포 뒤 발급된 웹 앱 URL로 교체하세요.
  appsScriptUrl: "PASTE_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE",

  // 수업 모둠 정보를 수정하세요.
  teams: [
    { id: "team-1", name: "1모둠", topic: "" },
    { id: "team-2", name: "2모둠", topic: "" },
    { id: "team-3", name: "3모둠", topic: "" },
    { id: "team-4", name: "4모둠", topic: "" },
    { id: "team-5", name: "5모둠", topic: "" }
  ],

  // 항목별 점수는 0점부터 max점까지 입력됩니다. weight는 팀 점수 산출 비중입니다.
  criteria: [
    { id: "understanding", name: "주제 이해", max: 5, weight: 20 },
    { id: "creativity", name: "창의성", max: 5, weight: 20 },
    { id: "evidence", name: "자료와 근거", max: 5, weight: 20 },
    { id: "delivery", name: "발표 전달력", max: 5, weight: 20 },
    { id: "teamwork", name: "팀워크와 완성도", max: 5, weight: 20 }
  ],

  // true이면 평가자의 소속 모둠과 같은 대상 모둠 점수는 집계에서 제외됩니다.
  excludeSelfTeam: true
};
