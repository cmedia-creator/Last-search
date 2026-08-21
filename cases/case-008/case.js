(() => {
"use strict";

const word = document.getElementById("word");
const resultCard = document.getElementById("resultCard");
const judgement = document.getElementById("judgement");
const judgeLabel = document.getElementById("judgeLabel");
const referenceBox = document.getElementById("referenceBox");
const referenceTarget = document.getElementById("referenceTarget");
const message = document.getElementById("message");
const continueButton = document.getElementById("continueButton");
const panel = document.getElementById("panel");

function typeTo(target, delay=260) {
  return new Promise(resolve => {
    let i = 0;
    word.textContent = "";
    const timer = setInterval(() => {
      word.textContent = target.slice(0, ++i);
      if (i >= target.length) {
        clearInterval(timer);
        resolve();
      }
    }, delay);
  });
}

async function sequence() {
  // 外部接続側が「OGOTAKA」という文字列を解析しているように見せる。
  await new Promise(r => setTimeout(r, 1400));

  await typeTo("OGATAKA", 280);
  message.textContent = "似た文字列を見つけました。";

  await new Promise(r => setTimeout(r, 1200));
  await typeTo("おがたか", 300);

  await new Promise(r => setTimeout(r, 1000));
  resultCard.hidden = false;
  message.textContent = "";

  await new Promise(r => setTimeout(r, 1400));
  judgement.hidden = false;
  judgeLabel.textContent = "一致";

  await new Promise(r => setTimeout(r, 1800));
  panel.classList.add("glitch");
  judgement.classList.add("wrong");
  judgeLabel.textContent = "一致";
  setTimeout(() => panel.classList.remove("glitch"), 800);

  await new Promise(r => setTimeout(r, 900));
  const correction = document.createElement("div");
  correction.style.cssText = "margin-top:10px;text-align:center;font-size:16px;font-weight:700;";
  correction.textContent = "違う";
  judgement.insertAdjacentElement("afterend", correction);

  await new Promise(r => setTimeout(r, 1700));
  await typeTo("OGOTAKA", 220);
  message.textContent = "参照先を確認しています。";

  await new Promise(r => setTimeout(r, 1400));
  referenceBox.hidden = false;

  await new Promise(r => setTimeout(r, 1800));
  referenceTarget.textContent = "接続元";
  message.textContent = "";

  localStorage.setItem("ls_ogotaka_self_reference_detected", "true");

  await new Promise(r => setTimeout(r, 1800));
  const subtle = document.createElement("p");
  subtle.style.cssText = "margin:16px 0 0;text-align:center;color:#777;font-size:12px;";
  subtle.textContent = "小形高の記録は関連履歴に残されています。";
  referenceBox.insertAdjacentElement("afterend", subtle);

  await new Promise(r => setTimeout(r, 1400));
  continueButton.hidden = false;
}

continueButton.addEventListener("click", () => {
  localStorage.setItem("ls_case_008_complete", "true");
  localStorage.setItem("ls_ogotaka_ogataka_same", "false");
  localStorage.setItem("ls_ogataka_record_retained", "true");
  localStorage.setItem("ls_next_query", "小形高 2009年9月17日");
  localStorage.setItem("ls_last_query", "小形高 2009年9月17日");
  location.href = "../../index.html?prefill=" + encodeURIComponent("小形高 2009年9月17日");
});

sequence();
})();
