(() => {
  "use strict";

  // 正規ルート確認
  // TOPからCASE 001へ遷移する直前に sessionStorage の
  // ls_entry_case = "001" が設定されていることを前提とする。
  // 一度正規入場した同一タブでのリロードは許可する。
  const CASE_ID = "001";
  const ENTRY_KEY = "ls_entry_case";
  const ACTIVE_KEY = "ls_case_001_active";

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
  // 正規ルート・履歴戻り等で再度CASE001へ来た場合は、
  // 認証を再実行せず、完了済みメッセージを表示してTOPへ戻す。
  if (localStorage.getItem("ls_case_001_complete") === "true") {
    document.addEventListener("DOMContentLoaded", () => {
      const body = document.body;
      body.innerHTML = `
        <main style="
          min-height:100dvh;
          display:flex;
          align-items:center;
          justify-content:center;
          padding:24px;
          background:#f4f4f1;
          color:#111;
          font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Yu Gothic',Meiryo,sans-serif;
        ">
          <div style="text-align:center;max-width:640px;">
            <div style="font-size:13px;color:#747474;margin-bottom:16px;letter-spacing:.08em;">
              LAST SEARCH
            </div>
            <div style="font-size:22px;line-height:1.7;">
              本人確認はすでに完了しています。
            </div>
          </div>
        </main>
      `;
      sessionStorage.removeItem("ls_case_001_active");
      sessionStorage.removeItem("ls_entry_case");
      setTimeout(() => {
        window.location.replace("../../");
      }, 3000);
    });
    return;
  }

  const $ = (selector) => document.querySelector(selector);

  const promptEl = $("#prompt");
  const gridEl = $("#grid");
  const statusEl = $("#status");
  const challengeEl = $("#challenge");
  const verifyBtn = $("#verifyBtn");
  const resetBtn = $("#resetBtn");
  const headText = document.querySelector(".head p");
  const appEl = $("#app");

  if (!promptEl || !gridEl || !statusEl || !verifyBtn || !resetBtn) {
    console.error("CASE 001: required DOM elements were not found.");
    return;
  }

  /*
    CASE 001 正式フロー

    信号機
    → 自転車
    → 家
    → 家族
    → 針
    → 糸
    → 「久我あきらが写っている画像をすべて選択してください」

    最終の久我画面には久我本人の画像を9枚表示する。
    ・0枚選択 → 不正解。その場から進めない
    ・1枚以上選択 → 正解扱い。そのまま本人認証へ進む
    ・追加の選択画面は存在しない

    認証完了後:
    ls_case_001_complete = true
    → 7秒
    → LAST SEARCH TOP
    → TOP右上「ログイン中」
  */

  const IMG = {
    signal1: "./img/signal-01.webp",
    signal2: "./img/signal-02.webp",
    signal3: "./img/signal-03.webp",
    signal4: "./img/signal-04.webp",

    bike1: "./img/bike-01.webp",
    bike2: "./img/bike-02.webp",
    bike3: "./img/bike-03.webp",
    bike4: "./img/bike-04.webp",

    house1: "./img/house-01.webp",
    house2: "./img/house-02.webp",
    house3: "./img/house-03.webp",

    family1: "./img/family-01.webp",
    family2: "./img/family-02.webp",
    family3: "./img/family-03.webp",
    family4: "./img/family-04.webp",

    needle1: "./img/needle-01.webp",
    thread1: "./img/thread-01.webp",

    kuga1: "./img/kuga-01.webp",
    kuga2: "./img/kuga-02.webp",
    kuga3: "./img/kuga-03.webp",
    kuga4: "./img/kuga-04.webp",
    kuga5: "./img/kuga-05.webp",
    kuga6: "./img/kuga-06.webp",
    kuga7: "./img/kuga-07.webp",
    kuga8: "./img/kuga-08.webp",
    kuga9: "./img/kuga-09.webp"
  };

  /*
    正解画像の位置は従来仕様を維持。
    ダミーには他カテゴリーの実在画像を再利用する。
    これにより noise-* のファイル名に依存しない。
  */
  const steps = [
    {
      prompt: "信号機が写っている画像をすべて選択してください",
      images: [
        IMG.signal1, IMG.family1, IMG.signal2,
        IMG.house1,  IMG.bike1,   IMG.signal3,
        IMG.thread1, IMG.signal4, IMG.family2
      ],
      correct: [0, 2, 5, 7]
    },
    {
      prompt: "自転車が写っている画像をすべて選択してください",
      images: [
        IMG.house2, IMG.bike1,   IMG.family3,
        IMG.bike2,  IMG.signal1, IMG.needle1,
        IMG.bike3,  IMG.house3,  IMG.bike4
      ],
      correct: [1, 3, 6, 8]
    },
    {
      prompt: "家が写っている画像をすべて選択してください",
      images: [
        IMG.family1, IMG.house1, IMG.signal2,
        IMG.bike2,   IMG.house2, IMG.family4,
        IMG.house3,  IMG.thread1, IMG.signal3
      ],
      correct: [1, 4, 6]
    },
    {
      prompt: "家族が写っている画像をすべて選択してください",
      images: [
        IMG.family1, IMG.bike1,   IMG.family2,
        IMG.house1,  IMG.family3, IMG.signal1,
        IMG.needle1, IMG.family4, IMG.thread1
      ],
      correct: [0, 2, 4, 7]
    },
    {
      prompt: "針が写っている画像を選択してください",
      images: [
        IMG.house2,  IMG.family2, IMG.needle1,
        IMG.signal4, IMG.bike3,   IMG.thread1,
        IMG.house1,  IMG.family3, IMG.signal2
      ],
      correct: [2]
    },
    {
      prompt: "糸が写っている画像を選択してください",
      images: [
        IMG.bike2,   IMG.house3,  IMG.family1,
        IMG.signal3, IMG.thread1, IMG.needle1,
        IMG.family4, IMG.house1,  IMG.bike4
      ],
      correct: [4, 5]
    },
    {
      prompt: "久我あきらが写っている画像をすべて選択してください",
      images: [
        IMG.kuga1, IMG.kuga2, IMG.kuga3,
        IMG.kuga4, IMG.kuga5, IMG.kuga6,
        IMG.kuga7, IMG.kuga8, IMG.kuga9
      ],
      kugaGate: true
    }
  ];

  let stepIndex = 0;
  let selected = new Set();
  let locked = false;

  function render() {
    locked = false;
    selected.clear();

    const step = steps[stepIndex];

    promptEl.textContent = step.prompt;
    statusEl.textContent = "";
    gridEl.innerHTML = "";

    step.images.forEach((src, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "tile";
      button.setAttribute("aria-label", `画像 ${index + 1}`);

      const img = document.createElement("img");
      img.src = src;
      img.alt = "";
      img.draggable = false;
      img.style.width = "100%";
      img.style.height = "100%";
      img.style.objectFit = "cover";
      img.style.display = "block";

      button.appendChild(img);

      button.addEventListener("click", () => {
        if (locked) return;

        if (selected.has(index)) {
          selected.delete(index);
          button.classList.remove("selected");
          button.setAttribute("aria-pressed", "false");
        } else {
          selected.add(index);
          button.classList.add("selected");
          button.setAttribute("aria-pressed", "true");
        }

        if (step.kugaGate && selected.size > 0) {
          statusEl.textContent = "";
        }
      });

      button.setAttribute("aria-pressed", "false");
      gridEl.appendChild(button);
    });

    if (challengeEl) {
      challengeEl.classList.remove("fade");
      void challengeEl.offsetWidth;
      challengeEl.classList.add("fade");
    }

    verifyBtn.disabled = false;
    resetBtn.disabled = false;
  }

  function sameSet(actual, expected) {
    if (actual.size !== expected.length) return false;
    return expected.every((value) => actual.has(value));
  }

  function showIncorrect() {
    statusEl.textContent = "不正解です。もう一度お試しください。";

    if (appEl) {
      appEl.classList.add("glitch");
      setTimeout(() => appEl.classList.remove("glitch"), 650);
    }
  }

  function saveCaseComplete() {
    /*
      既存 storage.js がある場合はそれを優先。
      TOP側は localStorage の "true" も読めるため、念のため直接保存も行う。
    */
    try {
      if (window.LSStorage && typeof window.LSStorage.set === "function") {
        window.LSStorage.set("ls_case_001_complete", true);
      }
    } catch (error) {
      console.warn("CASE 001: LSStorage save failed.", error);
    }

    localStorage.setItem("ls_case_001_complete", "true");

    try {
      const seen = JSON.parse(localStorage.getItem("ls_seen_cases") || "[]");
      if (Array.isArray(seen) && !seen.includes("001")) {
        seen.push("001");
        localStorage.setItem("ls_seen_cases", JSON.stringify(seen));
      }
    } catch {
      localStorage.setItem("ls_seen_cases", JSON.stringify(["001"]));
    }
  }

  function startAuthentication() {
    if (locked) return;
    locked = true;

    verifyBtn.disabled = true;
    resetBtn.disabled = true;

    gridEl.innerHTML = "";
    statusEl.textContent = "";

    promptEl.textContent = "本人認証を開始します";
    if (headText) {
      headText.textContent = "認証情報を確認しています。";
    }

    if (appEl) {
      appEl.classList.add("glitch");
      setTimeout(() => appEl.classList.remove("glitch"), 650);
    }

    setTimeout(() => {
      promptEl.textContent = "本人認証が完了しました。";
      if (headText) {
        headText.textContent = "認証情報を保存しています。";
      }

      saveCaseComplete();

      /*
        完了文言を7秒間維持。
        カウントダウンは表示しない。
      */
      setTimeout(() => {
        sessionStorage.removeItem(ACTIVE_KEY);
        sessionStorage.removeItem(ENTRY_KEY);
        window.location.href = "../../";
      }, 7000);
    }, 1600);
  }

  function verify() {
    if (locked) return;

    const step = steps[stepIndex];

    /*
      最終「久我あきら」画面。
      9枚すべて久我あきら。

      0枚 → 不正解
      1枚以上 → 正解扱い → 即、本人認証開始
    */
    if (step.kugaGate) {
      if (selected.size === 0) {
        showIncorrect();
        return;
      }

      startAuthentication();
      return;
    }

    if (!sameSet(selected, step.correct)) {
      showIncorrect();
      return;
    }

    stepIndex += 1;
    render();
  }

  verifyBtn.addEventListener("click", verify);

  resetBtn.addEventListener("click", () => {
    if (locked) return;
    render();
  });

  render();
})();
