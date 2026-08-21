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

const items = [
  ["人間", "一致しません"],
  ["場所", "一致しません"],
  ["組織", "一致しません"],
  ["プログラム", "一致しません"],
  ["範囲", "確認できません"]
];

let i = 0;

function addCheck() {
  if (i >= items.length) {
    setTimeout(showName, 800);
    return;
  }
  const row = document.createElement("div");
  row.className = "check";
  row.innerHTML = "<span></span><b></b>";
  row.querySelector("span").textContent = items[i][0];
  row.querySelector("b").textContent = items[i][1];
  checks.appendChild(row);
  i++;
  setTimeout(addCheck, 480);
}

function typeName() {
  const word = "OGOTAKA";
  let n = 0;
  const timer = setInterval(() => {
    ogotaka.textContent = word.slice(0, ++n);
    if (n === word.length) {
      clearInterval(timer);
      localStorage.setItem("ls_ogotaka_identifier_seen", "true");
      message.textContent = "仮の名前を保存しました。";
      setTimeout(beginFreeze, 1300);
    }
  }, 260);
}

function showName() {
  nameBox.hidden = false;
  message.textContent = "分類できないため、仮の名前を付けます。";
  setTimeout(typeName, 900);
}

function beginFreeze() {
  freeze.hidden = false;
  document.body.style.cursor = "wait";
  message.textContent = "";
  // 「見つけた瞬間、向こうにも見つかった」ための無音の間。
  setTimeout(connectBack, 4200);
}

function connectBack() {
  freeze.hidden = true;
  document.body.style.cursor = "";
  panel.classList.add("shock");
  setTimeout(() => panel.classList.remove("shock"), 700);

  connection.hidden = false;
  message.textContent = "";
  localStorage.setItem("ls_external_access_after_naming", "true");

  setTimeout(() => {
    state.textContent = "確認中";
    message.textContent = "接続元を確認できません。";
  }, 1500);

  setTimeout(() => {
    const line = document.createElement("p");
    line.style.cssText = "margin:16px 0 0;text-align:center;font-size:13px;font-weight:650;";
    line.textContent = "こちらを確認しています";
    connection.appendChild(line);
    message.textContent = "";
  }, 3100);

  setTimeout(() => {
    continueButton.hidden = false;
  }, 5000);
}

continueButton.addEventListener("click", () => {
  localStorage.setItem("ls_case_007_complete", "true");
  localStorage.setItem("ls_next_query", "OGOTAKA");
  localStorage.setItem("ls_last_query", "OGOTAKA");
  location.href = "../../index.html?prefill=OGOTAKA";
});

setTimeout(addCheck, 900);
})();
