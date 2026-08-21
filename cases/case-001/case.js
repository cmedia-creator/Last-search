(() => {
  "use strict";

  const IMG = "./img/";

  // 既存CASE001素材をそのまま利用する。
  // 不正解タイルには別カテゴリの画像を混ぜる。
  const rounds = [
    {
      prompt: "信号機が写っている画像をすべて選択してください",
      items: [
        ["signal-01.webp",1],["bike-01.webp",0],["signal-02.webp",1],
        ["house-01.webp",0],["family-01.webp",0],["signal-03.webp",1],
        ["bike-02.webp",0],["signal-04.webp",1],["house-02.webp",0]
      ]
    },
    {
      prompt: "自転車が写っている画像をすべて選択してください",
      items: [
        ["family-02.webp",0],["bike-01.webp",1],["house-03.webp",0],
        ["bike-02.webp",1],["signal-01.webp",0],["family-03.webp",0],
        ["bike-03.webp",1],["signal-02.webp",0],["bike-04.webp",1]
      ]
    },
    {
      prompt: "家が写っている画像をすべて選択してください",
      items: [
        ["signal-03.webp",0],["house-01.webp",1],["bike-03.webp",0],
        ["family-04.webp",0],["house-02.webp",1],["signal-04.webp",0],
        ["house-03.webp",1],["bike-04.webp",0],["family-01.webp",0]
      ]
    },
    {
      prompt: "家族が写っている画像をすべて選択してください",
      items: [
        ["family-01.webp",1],["house-01.webp",0],["family-02.webp",1],
        ["signal-01.webp",0],["family-03.webp",1],["bike-01.webp",0],
        ["house-02.webp",0],["family-04.webp",1],["signal-02.webp",0]
      ]
    },
    {
      prompt: "針が写っている画像を選択してください",
      items: [
        ["family-02.webp",0],["thread-01.webp",0],["needle-01.webp",1],
        ["house-03.webp",0],["signal-03.webp",0],["bike-02.webp",0],
        ["family-04.webp",0],["signal-04.webp",0],["house-01.webp",0]
      ]
    },
    {
      prompt: "糸が写っている画像を選択してください",
      items: [
        ["signal-02.webp",0],["needle-01.webp",0],["family-03.webp",0],
        ["house-02.webp",0],["thread-01.webp",1],["bike-04.webp",0],
        ["signal-04.webp",0],["family-01.webp",0],["house-03.webp",0]
      ]
    },
    {
      prompt: "久我あきらが写っている画像をすべて選択してください",
      trap: true,
      items: [
        ["family-01.webp",0],["house-01.webp",0],["signal-01.webp",0],
        ["bike-01.webp",0],["needle-01.webp",0],["thread-01.webp",0],
        ["family-02.webp",0],["house-02.webp",0],["signal-02.webp",0]
      ]
    },
    {
      prompt: "久我あきらが写っている画像をすべて選択してください",
      final: true,
      items: [
        ["kuga-01.webp",1],["kuga-02.webp",1],["kuga-03.webp",1],
        ["kuga-04.webp",1],["kuga-05.webp",1],["kuga-06.webp",1],
        ["kuga-07.webp",1],["kuga-08.webp",1],["kuga-09.webp",1]
      ]
    }
  ];

  const promptEl = document.getElementById("prompt");
  const gridEl = document.getElementById("grid");
  const verifyEl = document.getElementById("verify");
  const statusEl = document.getElementById("status");
  const completeEl = document.getElementById("complete");

  let roundIndex = 0;
  let selected = new Set();
  let trapAttempted = false;

  function renderRound() {
    const round = rounds[roundIndex];
    selected.clear();
    statusEl.textContent = "";
    promptEl.textContent = round.prompt;
    gridEl.innerHTML = "";

    round.items.forEach(([src], index) => {
      const btn = document.createElement("button");
      btn.className = "tile";
      btn.type = "button";
      btn.setAttribute("aria-label", `画像 ${index + 1}`);
      btn.dataset.index = index;

      const img = document.createElement("img");
      img.src = IMG + src;
      img.alt = "";
      img.loading = "eager";
      btn.appendChild(img);

      btn.addEventListener("click", () => {
        if (selected.has(index)) {
          selected.delete(index);
          btn.classList.remove("selected");
        } else {
          selected.add(index);
          btn.classList.add("selected");
        }
      });

      gridEl.appendChild(btn);
    });
  }

  function isCorrect(round) {
    const correct = round.items
      .map((item, i) => item[1] ? i : -1)
      .filter(i => i >= 0);

    if (selected.size !== correct.length) return false;
    return correct.every(i => selected.has(i));
  }

  function nextRound() {
    roundIndex += 1;
    if (roundIndex >= rounds.length) {
      finish();
      return;
    }
    renderRound();
  }

  function finish() {
    // 「本人」そのものではなく、久我の継続セッションに接続された状態。
    localStorage.setItem("ls_case_001_complete", "true");
    localStorage.setItem("ls_logged_in", "true");
    localStorage.setItem("ls_session_identity", "kuga_akira");
    localStorage.setItem("ls_session_mode", "continuation");

    completeEl.hidden = false;

    // 理解する時間を与える。カウントダウンは見せない。
    window.setTimeout(() => {
      window.location.href = "../../index.html";
    }, 7000);
  }

  verifyEl.addEventListener("click", () => {
    const round = rounds[roundIndex];

    // 「該当なし」はユーザーに一度考えさせる。
    if (round.trap) {
      if (selected.size === 0) {
        if (!trapAttempted) {
          trapAttempted = true;
          statusEl.textContent = "該当する画像を選択してください。";
          return;
        }
        nextRound();
        return;
      }
      statusEl.textContent = "選択内容を確認できませんでした。";
      return;
    }

    if (!isCorrect(round)) {
      statusEl.textContent = "選択内容を確認してください。";
      return;
    }

    if (round.final) {
      finish();
      return;
    }

    nextRound();
  });

  renderRound();
})();
