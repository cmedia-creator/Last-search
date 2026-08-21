(() => {
"use strict";

const checks = document.getElementById("checks");
const nameBox = document.getElementById("nameBox");
const ogotaka = document.getElementById("ogotaka");
const freeze = document.getElementById("freeze");
const connection = document.getElementById("connection");
const state = document.getElementById("state");
const message = document.getElementById("message");
const continueButton = document.getElementById("continueButton");
const panel = document.getElementById("panel");

if (!checks || !nameBox || !ogotaka || !freeze || !connection ||
    !state || !message || !continueButton || !panel) {
  console.error("CASE007: required DOM element missing");
  return;
}

/* 初期状態をJS側でも明示。CSS事故があっても進行を壊しにくくする。 */
nameBox.hidden = true;
freeze.hidden = true;
connection.hidden = true;
continueButton.hidden = true;
continueButton.disabled = false;

const items = [
  ["人間", "一致しません"],
  ["場所", "一致しません"],
  ["組織", "一致しません"],
  ["プログラム", "一致しません"],
  ["範囲", "確認できません"]
];

let i = 0;
let progressed = false;

function addCheck() {
  if (progressed) return;

  if (i >= items.length) {
    progressed = true;
    setTimeout(showName, 800);
    return;
  }

  const row = document.createElement("div");
  row.className = "check";

  const label = document.createElement("span");
  const result = document.createElement("b");

  label.textContent = items[i][0];
  result.textContent = items[i][1];

  row.append(label, result);
  checks.appendChild(row);

  i += 1;
  setTimeout(addCheck, 480);
}

function showName() {
  nameBox.hidden = false;
  message.textContent = "分類できないため、仮の名前を付けます。";
  setTimeout(typeName, 900);
}

function typeName() {
  const word = "OGOTAKA";
  let n = 0;

  const timer = setInterval(() => {
    n += 1;
    ogotaka.textContent = word.slice(0, n);

    if (n >= word.length) {
      clearInterval(timer);

      try {
        localStorage.setItem("ls_ogotaka_identifier_seen", "true");
      } catch {}

      message.textContent = "仮の名前を保存しました。";
      setTimeout(beginFreeze, 1300);
    }
  }, 260);
}

function beginFreeze() {
  freeze.hidden = false;
  document.body.style.cursor = "wait";
  message.textContent = "";

  setTimeout(connectBack, 4200);
}

function connectBack() {
  freeze.hidden = true;
  document.body.style.cursor = "";

  panel.classList.add("shock");
  setTimeout(() => panel.classList.remove("shock"), 700);

  connection.hidden = false;
  state.textContent = "接続中";
  message.textContent = "";

  try {
    localStorage.setItem("ls_external_access_after_naming", "true");
  } catch {}

  setTimeout(() => {
    state.textContent = "確認中";
    message.textContent = "接続元を確認できません。";
  }, 1500);

  setTimeout(() => {
    if (!connection.querySelector(".watching-line")) {
      const line = document.createElement("p");
      line.className = "watching-line";
      line.style.cssText =
        "margin:16px 0 0;text-align:center;font-size:13px;font-weight:650;";
      line.textContent = "こちらを確認しています";
      connection.appendChild(line);
    }

    message.textContent = "";
  }, 3100);

  setTimeout(() => {
    continueButton.hidden = false;
  }, 5000);
}

continueButton.addEventListener("click", () => {
  if (continueButton.disabled) return;
  continueButton.disabled = true;

  try {
    localStorage.setItem("ls_case_007_complete", "true");
    localStorage.setItem("ls_next_query", "OGOTAKA");
    localStorage.setItem("ls_last_query", "OGOTAKA");
  } catch {}

  /* GitHub Pagesでも相対パス事故を起こしにくい */
  window.location.assign("../../index.html?prefill=OGOTAKA");
});

setTimeout(addCheck, 900);
})();
