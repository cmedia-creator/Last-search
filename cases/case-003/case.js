(() => {
  "use strict";

  const title = document.getElementById("title");
  const message = document.getElementById("message");
  const detail = document.getElementById("detail");
  const backButton = document.getElementById("backButton");
  const requestValue = document.getElementById("requestValue");
  const contextValue = document.getElementById("contextValue");
  const recordValue = document.getElementById("recordValue");

  localStorage.setItem("ls_case_003_seen", "true");

  const hasSearchContext =
    localStorage.getItem("ls_last_query") ||
    localStorage.getItem("ls_search_count");

  if (hasSearchContext) {
    requestValue.textContent = "INVALID CONTEXT";
    contextValue.textContent = "INSUFFICIENT";
  }

  window.setTimeout(() => {
    title.textContent = "この記録はまだ開かれていません。";
    message.textContent = "表示に必要な検索履歴を確認できませんでした。";
  }, 1700);

  window.setTimeout(() => {
    detail.hidden = false;
  }, 2900);

  window.setTimeout(() => {
    message.textContent = "あなたはまだ、ここを検索していない。";
    recordValue.textContent = "UNOPENED";
  }, 4500);

  window.setTimeout(() => {
    message.textContent = "検索画面へ戻ります。";
    backButton.hidden = false;
  }, 6500);

  function returnTop() {
    localStorage.setItem("ls_case_003_complete", "true");
    localStorage.setItem("ls_case_003_reason", "missing_search_context");
    window.location.href = "../../index.html";
  }

  backButton.addEventListener("click", returnTop);
  window.setTimeout(returnTop, 9000);
})();
