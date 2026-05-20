window.EVAL_CONFIG = {
  appTitle: "팀프로젝트 동료평가",
  className: "1학년 팀프로젝트 발표",

  // Google Apps Script 배포 뒤 발급된 웹 앱 URL로 교체하세요.
  appsScriptUrl: "https://script.google.com/macros/s/AKfycbxyrHN_yK4PrmbIjenWtOToTET5WQhY1QOgTeSpyogGzGIiLyBSjN3gBJDCsplDU6dTCA/exec",

  // 학과별 모둠 정보를 수정하세요. sheetName은 Google Sheet 탭 이름과 같아야 합니다.
  classes: [
    {
      id: "ot",
      name: "작업치료학과",
      sheetName: "작업치료학과",
      teams: [
        { id: "ot-team-1", name: "1팀", topic: "" },
        { id: "ot-team-2", name: "2팀", topic: "" },
        { id: "ot-team-3", name: "3팀", topic: "" },
        { id: "ot-team-4", name: "4팀", topic: "" },
        { id: "ot-team-5", name: "5팀", topic: "" },
        { id: "ot-team-6", name: "6팀", topic: "" },
        { id: "ot-team-7", name: "7팀", topic: "" },
        { id: "ot-team-8", name: "8팀", topic: "" }
      ]
    },
    {
      id: "dh",
      name: "치위생학과",
      sheetName: "치위생학과",
      teams: [
        { id: "dh-team-1", name: "1팀", topic: "" },
        { id: "dh-team-2", name: "2팀", topic: "" },
        { id: "dh-team-3", name: "3팀", topic: "" },
        { id: "dh-team-4", name: "4팀", topic: "" },
        { id: "dh-team-5", name: "5팀", topic: "" },
        { id: "dh-team-6", name: "6팀", topic: "" },
        { id: "dh-team-7", name: "7팀", topic: "" },
        { id: "dh-team-8", name: "8팀", topic: "" },
        { id: "dh-team-9", name: "9팀", topic: "" },
        { id: "dh-team-10", name: "10팀", topic: "" }
      ]
    }
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
