function doPost(e) {
  const payload = JSON.parse(e.parameter.payload || "{}");
  const sheet = getSheet_(payload.sheetName || payload.departmentName || "responses");
  ensureHeader_(sheet);

  const rows = (payload.evaluations || []).map(item => [
    new Date(),
    payload.submittedAt || "",
    payload.departmentId || "",
    payload.departmentName || "",
    payload.classCode || "",
    payload.studentId || "",
    payload.studentName || "",
    payload.studentTeamId || "",
    payload.studentTeamName || "",
    item.targetTeamId || "",
    item.targetTeamName || "",
    Number(item.percent || 0),
    JSON.stringify(item.scores || {}),
    item.comment || "",
    JSON.stringify(payload.criteria || []),
    JSON.stringify(payload.teams || []),
    payload.excludeSelfTeam === true ? "TRUE" : "FALSE"
  ]);

  if (rows.length) {
    sheet.getRange(sheet.getLastRow() + 1, 1, rows.length, rows[0].length).setValues(rows);
  }

  return HtmlService.createHtmlOutput("OK");
}

function doGet(e) {
  const callback = e.parameter.callback || "callback";
  const adminKey = PropertiesService.getScriptProperties().getProperty("ADMIN_KEY") || "";
  if (adminKey && e.parameter.key !== adminKey) {
    const denied = `${callback}(${JSON.stringify({ error: "UNAUTHORIZED", rows: [] })});`;
    return ContentService
      .createTextOutput(denied)
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  const rows = readRows_(e.parameter.department || "responses");
  const output = `${callback}(${JSON.stringify({ rows })});`;
  return ContentService
    .createTextOutput(output)
    .setMimeType(ContentService.MimeType.JAVASCRIPT);
}

function getSheet_(sheetName) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const safeName = String(sheetName || "responses").replace(/[\\/?*[\]:]/g, "").slice(0, 99) || "responses";
  return spreadsheet.getSheetByName(safeName) || spreadsheet.insertSheet(safeName);
}

function ensureHeader_(sheet) {
  const header = [
    "serverTimestamp",
    "submittedAt",
    "departmentId",
    "departmentName",
    "classCode",
    "studentId",
    "studentName",
    "studentTeamId",
    "studentTeamName",
    "targetTeamId",
    "targetTeamName",
    "percent",
    "scoresJson",
    "comment",
    "criteriaJson",
    "teamsJson",
    "excludeSelfTeam"
  ];

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(header);
    return;
  }

  const current = sheet.getRange(1, 1, 1, header.length).getValues()[0];
  if (current.join("") === "") {
    sheet.getRange(1, 1, 1, header.length).setValues([header]);
  }
}

function readRows_(sheetName) {
  const sheet = getSheet_(sheetName);
  ensureHeader_(sheet);
  const values = sheet.getDataRange().getValues();
  if (values.length <= 1) return [];

  const header = values[0];
  return values.slice(1).filter(row => row.some(Boolean)).map(row => {
    const item = {};
    header.forEach((key, index) => {
      item[key] = row[index];
    });
    return {
      serverTimestamp: toIso_(item.serverTimestamp),
      submittedAt: item.submittedAt || toIso_(item.serverTimestamp),
      departmentId: String(item.departmentId || ""),
      departmentName: String(item.departmentName || ""),
      classCode: item.classCode || "",
      studentId: String(item.studentId || ""),
      studentName: String(item.studentName || ""),
      studentTeamId: String(item.studentTeamId || ""),
      studentTeamName: String(item.studentTeamName || ""),
      targetTeamId: String(item.targetTeamId || ""),
      targetTeamName: String(item.targetTeamName || ""),
      percent: Number(item.percent || 0),
      scores: parseJson_(item.scoresJson, {}),
      comment: String(item.comment || ""),
      excludeSelfTeam: item.excludeSelfTeam === true || item.excludeSelfTeam === "TRUE"
    };
  });
}

function parseJson_(value, fallback) {
  try {
    return JSON.parse(value || "");
  } catch (error) {
    return fallback;
  }
}

function toIso_(value) {
  if (!value) return "";
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString();
}
