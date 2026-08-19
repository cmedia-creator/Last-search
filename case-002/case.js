(() => {
  "use strict";

  const $ = (s) => document.querySelector(s);
  const input = $("#searchInput");
  const form = $("#searchForm");
  const notice = $("#dataNotice");
  const noticeText = $("#dataNoticeText");
  const historyPanel = $("#historyPanel");
  const historyRows = $("#historyRows");
  const syncMessage = $("#syncMessage");
  const finalSearch = $("#finalSearch");
  const finalSearchForm = $("#finalSearchForm");
  const finalSearchInput = $("#finalSearchInput");
  const resultMeta = $("#resultMeta");

  const query = localStorage.getItem("ls_last_query") || "";
  input.value = query;
  resultMeta.textContent = query ? `「${query}」の検索結果` : "検索結果";

  const hadPriorData =
    localStorage.getItem("ls_search_count") !== null ||
    localStorage.getItem("ls_case_001_complete") !== null ||
    localStorage.getItem("ls_last_query") !== null;

  if (!hadPriorData) {
    notice.hidden = false;
    noticeText.textContent =
      "保存された検索履歴を確認できません。\nブラウザのデータを削除しましたか？\n\n履歴の復元を試行します。";

    setTimeout(() => {
      noticeText.textContent =
        "復元できませんでした。\n\n新しい記録を開始します。";
    }, 2600);
  }

  if (!localStorage.getItem("ls_case_002_started_at")) {
    localStorage.setItem("ls_case_002_started_at", String(Date.now()));
  }

  function visited(key) {
    return localStorage.getItem(key) === "true";
  }

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function timeAfter(minutes) {
    const base = Number(localStorage.getItem("ls_case_002_started_at")) || Date.now();
    const d = new Date(base + minutes * 60000);
    return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }

  function row(time, text, cls = "") {
    const el = document.createElement("div");
    el.className = `history-row ${cls}`.trim();
    el.innerHTML = `<span>${time}</span><span></span>`;
    el.lastElementChild.textContent = text;
    historyRows.appendChild(el);
    return el;
  }

  function renderHistory() {
    const a = visited("ls_case_002_record_a");
    const b = visited("ls_case_002_record_b");
    if (!a && !b) return;

    historyPanel.hidden = false;
    historyRows.innerHTML = "";
    syncMessage.textContent = "";

    row(timeAfter(1), "久我あきら");
    row(timeAfter(3), "久我あきら 2009");

    if (a) row(timeAfter(6), "小形高");

    if (a && b) {
      const death = row(timeAfter(9), "久我あきら　死亡", "future");

      // 重要演出:
      // 「久我あきら　死亡」は7秒間、確実に表示する。
      // ユーザーが怪文書をじっくり読んでも見落としにくい時間を確保。
      setTimeout(() => {
        death.remove();
        syncMessage.textContent = "検索履歴を同期しました。";
        finalSearch.hidden = false;
      }, 7000);
    }
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const q = input.value.trim();
    if (!q) return;
    localStorage.setItem("ls_last_query", q);
    resultMeta.textContent = `「${q}」の検索結果`;
  });

  finalSearchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const q = finalSearchInput.value.trim() || "小形高";
    localStorage.setItem("ls_last_query", q);
    localStorage.setItem("ls_pending_query", q);
    localStorage.setItem("ls_case_002_complete", "true");

    try {
      const seen = JSON.parse(localStorage.getItem("ls_seen_cases") || "[]");
      const list = Array.isArray(seen) ? seen : [];
      if (!list.includes("002")) list.push("002");
      localStorage.setItem("ls_seen_cases", JSON.stringify(list));
    } catch {
      localStorage.setItem("ls_seen_cases", JSON.stringify(["002"]));
    }

    location.href = "../../";
  });

  renderHistory();
})();
