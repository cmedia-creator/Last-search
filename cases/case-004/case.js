(() => {
  "use strict";

  const CASE_ID = "004";
  const ENTRY_KEY = "ls_entry_case";
  const ACTIVE_KEY = "ls_case_004_active";

  const entryCase = sessionStorage.getItem(ENTRY_KEY);
  const alreadyActive = sessionStorage.getItem(ACTIVE_KEY) === "true";

  if (entryCase === CASE_ID) {
    sessionStorage.removeItem(ENTRY_KEY);
    sessionStorage.setItem(ACTIVE_KEY, "true");
  } else if (!alreadyActive) {
    window.location.replace("../case-003/");
    return;
  }

  if (localStorage.getItem("ls_case_004_complete") === "true") {
    document.addEventListener("DOMContentLoaded", () => {
      document.body.innerHTML = `
        <main style="min-height:100dvh;display:flex;align-items:center;justify-content:center;
        padding:24px;background:#f4f4f1;color:#111;font-family:-apple-system,BlinkMacSystemFont,
        'Segoe UI','Yu Gothic',Meiryo,sans-serif;">
          <div style="text-align:center;max-width:640px;">
            <div style="font-size:13px;color:#747474;margin-bottom:16px;letter-spacing:.08em;">
              LAST SEARCH
            </div>
            <div style="font-size:22px;line-height:1.7;">
              照合はすでに完了しています。
            </div>
          </div>
        </main>`;
      sessionStorage.removeItem(ACTIVE_KEY);
      sessionStorage.removeItem(ENTRY_KEY);
      setTimeout(() => window.location.replace("../../"), 3000);
    });
    return;
  }

  const expandBtn = document.getElementById("expandBtn");
  const initialResult = document.getElementById("initialResult");
  const searching = document.getElementById("searching");
  const searchingText = document.getElementById("searchingText");
  const archiveResults = document.getElementById("archiveResults");
  const currentResult = document.getElementById("currentResult");
  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");

  function visitedAll() {
    return ["profile","stop","delete"].every(
      key => localStorage.getItem(`ls_case_004_${key}`) === "true"
    );
  }

  function revealCurrentIfReady() {
    if (visitedAll()) currentResult.hidden = false;
  }

  expandBtn.addEventListener("click", () => {
    initialResult.hidden = true;
    searching.hidden = false;

    setTimeout(() => {
      searchingText.textContent = "該当なし";
    }, 1300);

    setTimeout(() => {
      searchingText.textContent = "削除済みページを検索しています……";
    }, 2600);

    setTimeout(() => {
      searchingText.textContent = "3件見つかりました";
    }, 4000);

    setTimeout(() => {
      searching.hidden = true;
      archiveResults.hidden = false;
      localStorage.setItem("ls_case_004_expanded", "true");
      revealCurrentIfReady();
    }, 4900);
  });

  searchForm.addEventListener("submit", e => {
    e.preventDefault();
    if (searchInput.value.trim()) {
      localStorage.setItem("ls_last_query", searchInput.value.trim());
    }
  });

  if (localStorage.getItem("ls_case_004_expanded") === "true") {
    initialResult.hidden = true;
    archiveResults.hidden = false;
    revealCurrentIfReady();
  }
})();
