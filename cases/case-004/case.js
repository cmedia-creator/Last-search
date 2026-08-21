(() => {
  "use strict";

  const status = document.getElementById("status");
  const message = document.getElementById("message");
  const basis = document.getElementById("basis");
  const detailButton = document.getElementById("detailButton");
  const nextButton = document.getElementById("nextButton");

  // CASE004の役割:
  // 久我を「怪異」ではなく、実在したZ Search開発者として初めて整理して見せる。
  // ただしLAST SEARCHだけが、データ欠落から「死亡」と推定している。

  window.setTimeout(() => {
    status.textContent = "所在不明";
    message.textContent = "最終確認以降の生存記録を確認できません。";
  }, 1600);

  window.setTimeout(() => {
    status.textContent = "死亡";
    status.classList.add("status-dead");
    message.textContent = "人物状態を更新しました。";
  }, 3400);

  window.setTimeout(() => {
    detailButton.hidden = false;
    nextButton.hidden = false;
  }, 4700);

  detailButton.addEventListener("click", () => {
    basis.hidden = false;
    detailButton.hidden = true;
    message.textContent = "表示された記録には、死亡を直接確認した情報は含まれていません。";
    localStorage.setItem("ls_case_004_basis_seen", "true");
  });

  nextButton.addEventListener("click", () => {
    localStorage.setItem("ls_case_004_complete", "true");
    localStorage.setItem("ls_kuga_profile_seen", "true");
    localStorage.setItem("ls_kuga_creator_of", "z_search");
    localStorage.setItem("ls_next_query", "Z Search");
    localStorage.setItem("ls_last_query", "Z Search");
    window.location.href = "../../index.html?prefill=Z%20Search";
  });
})();
