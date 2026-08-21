(() => {
  "use strict";

  const checkButton = document.getElementById("checkButton");
  const sourceBox = document.getElementById("sourceBox");
  const message = document.getElementById("message");
  const lifeStatus = document.getElementById("lifeStatus");
  const lastSeen = document.getElementById("lastSeen");
  const deathScreen = document.getElementById("deathScreen");

  const sources = [
    document.getElementById("src1"),
    document.getElementById("src2"),
    document.getElementById("src3"),
    document.getElementById("src4")
  ];

  let started = false;

  function setSource(index, text) {
    sources[index].textContent = text;
  }

  function finishCase() {
    // 新正史上は「実死亡」ではない。
    // LAST SEARCH側が、利用可能な情報から死亡と推定した記録。
    localStorage.setItem("ls_case_002_complete", "true");
    localStorage.setItem("ls_kuga_status_display", "dead");
    localStorage.setItem("ls_kuga_status_basis", "inferred");
    localStorage.setItem("ls_kuga_status_time", "00:29");

    // 死亡表示を7秒維持してからTOPへ。
    window.setTimeout(() => {
      window.location.href = "../../index.html";
    }, 7000);
  }

  function beginCheck() {
    if (started) return;
    started = true;

    checkButton.disabled = true;
    checkButton.textContent = "更新中";
    sourceBox.hidden = false;
    lifeStatus.textContent = "照合中";
    lifeStatus.classList.remove("alive");
    lifeStatus.classList.add("pending");
    message.textContent = "複数の記録を照合しています。";

    window.setTimeout(() => setSource(0, "更新なし"), 900);
    window.setTimeout(() => setSource(1, "更新なし"), 1700);
    window.setTimeout(() => setSource(2, "更新なし"), 2500);
    window.setTimeout(() => setSource(3, "確認不能"), 3300);

    window.setTimeout(() => {
      message.textContent = "状態を更新しています。";
    }, 4100);

    window.setTimeout(() => {
      lastSeen.textContent = "00:29";
      lifeStatus.textContent = "更新";
    }, 5100);

    window.setTimeout(() => {
      document.getElementById("panel").hidden = true;
      deathScreen.hidden = false;
      finishCase();
    }, 6200);
  }

  checkButton.addEventListener("click", beginCheck);
})();
