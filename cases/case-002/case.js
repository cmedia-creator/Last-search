(() => {
  "use strict";

  // 正規ルート確認
  // TOPからCASE 002へ遷移する直前に sessionStorage の
  // ls_entry_case = "002" が設定されていることを前提とする。
  // 怪文書ページとの往復や、同一タブでのリロードは許可する。
  const CASE_ID = "002";
  const ENTRY_KEY = "ls_entry_case";
  const ACTIVE_KEY = "ls_case_002_active";

  const entryCase = sessionStorage.getItem(ENTRY_KEY);
  const alreadyActive = sessionStorage.getItem(ACTIVE_KEY) === "true";

  if (entryCase === CASE_ID) {
    sessionStorage.removeItem(ENTRY_KEY);
    sessionStorage.setItem(ACTIVE_KEY, "true");
  } else if (!alreadyActive) {
    window.location.replace("../case-003/");
    return;
  }

  // 完了済みCASEへの再侵入
  // CASE002完了後に履歴やURLから再度入った場合は、
  // 怪文書・未来履歴を再実行せず、同期済みメッセージだけ表示する。
  if (localStorage.getItem("ls_case_002_complete") === "true") {
    document.addEventListener("DOMContentLoaded", () => {
      const body = document.body;
      body.innerHTML = `
        <main style="
          min-height:100dvh;
          display:flex;
          align-items:center;
          justify-content:center;
          padding:24px;
          background:#f3f1ea;
          color:#171717;
          font-family:Georgia,'Yu Mincho','Hiragino Mincho ProN',serif;
        ">
          <div style="text-align:center;max-width:640px;">
            <div style="font-size:13px;color:#77736c;margin-bottom:16px;letter-spacing:.08em;">
              LAST SEARCH
            </div>
            <div style="font-size:22px;line-height:1.7;">
              検索履歴はすでに同期されています。
            </div>
          </div>
        </main>
      `;
      sessionStorage.removeItem("ls_case_002_active");
      sessionStorage.removeItem("ls_entry_case");
      setTimeout(() => {
        window.location.replace("../../");
      }, 3000);
    });
    return;
  }

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

    sessionStorage.removeItem(ACTIVE_KEY);
    sessionStorage.removeItem(ENTRY_KEY);
    location.href = "../../";
  });

  renderHistory();
})();
