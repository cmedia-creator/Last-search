(() => {
  "use strict";

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

    /*
      「家」判定の曖昧さを解消。
      自転車画像など、背景に家が写り込む可能性のある画像を除外し、
      問いも「家の外観が中心」に限定する。
    */
    {
      prompt: "家の外観が中心に写っている画像をすべて選択してください",
      images: [
        IMG.signal1, IMG.house1,  IMG.signal2,
        IMG.needle1, IMG.house2,  IMG.thread1,
        IMG.house3,  IMG.signal3, IMG.signal4
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

    /*
      needle-01 にも糸が写っているため両方を正解にする。
    */
    {
      prompt: "糸が写っている画像をすべて選択してください",
      images: [
        IMG.bike2,   IMG.house3,  IMG.family1,
        IMG.signal3, IMG.thread1, IMG.needle1,
        IMG.family4, IMG.house1,  IMG.bike4
      ],
      correct: [4, 5]
    },

    /*
      1回目の久我問題は「該当なし」。
      何を選んだかに関係なく、確認を押すと一度だけ不正解表示し、
      自動的に次の久我9枚画面へ進める。
    */
    {
      prompt: "久我あきらが写っている画像をすべて選択してください",
      images: [
        IMG.family1, IMG.house2,  IMG.signal1,
        IMG.bike3,   IMG.family4, IMG.needle1,
        IMG.house1,  IMG.thread1, IMG.signal4
      ],
      kugaTrap: true
    },

    /*
      2回目は9枚すべて久我。全選択で本人認証へ。
    */
    {
      prompt: "久我あきらが写っている画像をすべて選択してください",
      images: [
        IMG.kuga1, IMG.kuga2, IMG.kuga3,
        IMG.kuga4, IMG.kuga5, IMG.kuga6,
        IMG.kuga7, IMG.kuga8, IMG.kuga9
      ],
      correct: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      finalKuga: true
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
      button.setAttribute("aria-pressed", "false");

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
      });

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

      setTimeout(() => {
        window.location.href = "../../";
      }, 7000);
    }, 1600);
  }

  function verify() {
    if (locked) return;

    const step = steps[stepIndex];

    if (step.kugaTrap) {
      locked = true;
      verifyBtn.disabled = true;
      resetBtn.disabled = true;

      showIncorrect();

      setTimeout(() => {
        stepIndex += 1;
        render();
      }, 1100);
      return;
    }

    if (!sameSet(selected, step.correct)) {
      showIncorrect();
      return;
    }

    if (step.finalKuga) {
      startAuthentication();
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
