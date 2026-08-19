(() => {
  "use strict";

  const message = document.getElementById("message");
  const submessage = document.getElementById("submessage");
  const screen = document.getElementById("screen");

  function setMessage(main, sub = "") {
    message.classList.add("fade");
    submessage.classList.add("fade");

    setTimeout(() => {
      message.textContent = main;
      submessage.textContent = sub;
      message.classList.remove("fade");
      submessage.classList.remove("fade");
    }, 350);
  }

  function pulse() {
    screen.classList.add("glitch");
    setTimeout(() => screen.classList.remove("glitch"), 650);
  }

  // CASE 003は「正規ルートではないアクセス」を拾うためのCASE。
  // 一度踏んだことだけ記録しておく。
  localStorage.setItem("ls_case_003_seen", "true");

  setTimeout(() => {
    pulse();
    setMessage("この記録はまだ開かれていません。");
  }, 1800);

  setTimeout(() => {
    pulse();
    setMessage("あなたはまだ、ここを検索していない。");
  }, 4300);

  setTimeout(() => {
    submessage.textContent = "検索画面へ戻ります。";
  }, 7000);

  setTimeout(() => {
    window.location.href = "../../";
  }, 9000);
})();
