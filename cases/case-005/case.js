(() => {
  "use strict";

  const CASE_ID = "005";
  const ENTRY_KEY = "ls_entry_case";
  const ACTIVE_KEY = "ls_case_005_active";

  const entryCase = sessionStorage.getItem(ENTRY_KEY);
  const alreadyActive = sessionStorage.getItem(ACTIVE_KEY) === "true";

  if (entryCase === CASE_ID) {
    sessionStorage.removeItem(ENTRY_KEY);
    sessionStorage.setItem(ACTIVE_KEY, "true");
  } else if (!alreadyActive) {
    location.replace("../case-003/");
    return;
  }

  if (localStorage.getItem("ls_case_005_complete") === "true") {
    document.addEventListener("DOMContentLoaded", () => {
      document.body.innerHTML = `
        <main style="min-height:100dvh;display:flex;align-items:center;justify-content:center;
        padding:24px;background:#f4f4f1;color:#111;font-family:-apple-system,BlinkMacSystemFont,
        'Segoe UI','Yu Gothic',Meiryo,sans-serif;">
          <div style="text-align:center;max-width:640px;">
            <div style="font-size:13px;color:#747474;margin-bottom:16px;letter-spacing:.08em;">LAST SEARCH</div>
            <div style="font-size:22px;line-height:1.7;">検索結果は更新済みです。</div>
          </div>
        </main>`;
      sessionStorage.removeItem(ACTIVE_KEY);
      sessionStorage.removeItem(ENTRY_KEY);
      setTimeout(() => location.replace("../../"), 3000);
    });
    return;
  }

  const input = document.getElementById("searchInput");
  const form = document.getElementById("searchForm");
  const resultMeta = document.getElementById("resultMeta");
  const results = document.getElementById("results");
  const emptyState = document.getElementById("emptyState");

  const q = localStorage.getItem("ls_last_query") || "";
  input.value = q;
  resultMeta.textContent = q ? `「${q}」の検索結果` : "検索結果";

  if (localStorage.getItem("ls_case_005_record_erased") === "true") {
    results.hidden = true;
    emptyState.hidden = false;
  }

  form.addEventListener("submit", e => {
    e.preventDefault();
    const query = input.value.trim();
    if (query) {
      localStorage.setItem("ls_last_query", query);
      resultMeta.textContent = `「${query}」の検索結果`;
    }
  });
})();
