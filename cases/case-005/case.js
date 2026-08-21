(() => {
  "use strict";

  const terminal = document.getElementById("terminal");
  const summary = document.getElementById("summary");
  const processName = document.getElementById("processName");
  const message = document.getElementById("message");
  const continueButton = document.getElementById("continueButton");

  const logs = [
    ["[23:41:08] crawl completed", "dim"],
    ["[23:41:08] indexed: 18,441", "dim"],
    ["[23:41:09] orphan pages: 327", "dim"],
    ["", "blank"],
    ["[23:41:15] archive fragment detected", "warn"],
    ["[23:41:15] source date: 2009", "warn"],
    ["[23:41:16] format: unknown", ""],
    ["[23:41:18] attempting read...", ""],
    ["", "blank"],
    ["[23:41:24] executable data detected", "warn"],
    ["[23:41:24] process state: inactive", ""],
    ["[23:41:27] sandbox created", ""],
    ["[23:41:31] process state: active", "warn"],
    ["", "blank"],
    ["[23:41:34] external process initialized", "warn"],
    ["[23:41:35] origin: unresolved", ""],
    ["[23:41:36] process name: UNKNOWN", ""]
  ];

  let i = 0;

  function appendLine(text, cls = "") {
    const div = document.createElement("div");
    div.className = "line " + cls;
    div.textContent = text;
    terminal.appendChild(div);
    terminal.scrollTop = terminal.scrollHeight;
  }

  function writeNext() {
    if (i >= logs.length) {
      afterLogs();
      return;
    }

    const [text, cls] = logs[i];
    appendLine(text, cls);
    i += 1;

    const delay = text === "" ? 300 : 420;
    window.setTimeout(writeNext, delay);
  }

  function afterLogs() {
    summary.hidden = false;
    message.textContent = "Z Searchの実行環境に未登録の処理を確認しました。";

    window.setTimeout(() => {
      processName.textContent = "Z SEARCH";
      appendLine("[23:41:41] process name: Z SEARCH", "warn");
      message.textContent = "処理情報が更新されました。";
    }, 1800);

    window.setTimeout(() => {
      appendLine("[23:41:44] indexed pages: 18,441", "dim");
      appendLine("[23:41:44] indexed pages: 42,907", "warn");
      message.textContent = "検索可能な情報が増加しています。";
    }, 3400);

    window.setTimeout(() => {
      appendLine("[23:41:49] new query relationship detected", "");
      appendLine("[23:41:49] date: 2009", "");
      appendLine("[23:41:50] continue?", "cursor");
      continueButton.hidden = false;
      message.textContent = "2009年の記録を検索できます。";
    }, 5200);
  }

  continueButton.addEventListener("click", () => {
    localStorage.setItem("ls_case_005_complete", "true");
    localStorage.setItem("ls_zsearch_ai_fusion_detected", "true");
    localStorage.setItem("ls_2009_archive_seen", "true");
    localStorage.setItem("ls_next_query", "2009");
    localStorage.setItem("ls_last_query", "2009");
    window.location.href = "../../index.html?prefill=2009";
  });

  window.setTimeout(writeNext, 700);
})();
