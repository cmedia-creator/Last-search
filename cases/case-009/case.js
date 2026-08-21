(() => {
"use strict";

const photo = document.getElementById("photo");
const flash = document.getElementById("flash");
const stamp = document.getElementById("stamp");
const count = document.getElementById("count");
const status = document.getElementById("status");
const message = document.getElementById("message");
const next = document.getElementById("next");

const frames = [
  {src:"./img/family-01.png", time:"02:54", people:"4名", status:"確認中", msg:"保存写真を照合しています。"},
  {src:"./img/family-02.png", time:"02:57", people:"3名", status:"確認中", msg:"同じ場所の保存写真です。"},
  {src:"./img/family-03.png", time:"03:01", people:"2名", status:"確認中", msg:""},
  {src:"./img/family-04.png", time:"03:07", people:"1名", status:"外部接続", msg:""},
  {src:"./img/family-05.png", time:"03:12", people:"0名", status:"所在不明", msg:"4名を確認できません。"}
];

let index = 0;

function showFrame(i){
  const f = frames[i];
  flash.classList.remove("on");
  void flash.offsetWidth;
  flash.classList.add("on");

  setTimeout(()=>{
    photo.src = f.src;
    stamp.textContent = "2009/09/17 " + f.time;
    count.textContent = f.people;
    status.textContent = f.status;
    message.textContent = f.msg;
  },150);
}

function run(){
  setTimeout(()=>showFrame(1),1800);
  setTimeout(()=>showFrame(2),3900);
  setTimeout(()=>showFrame(3),6100);
  setTimeout(()=>showFrame(4),8500);

  setTimeout(()=>{
    status.textContent = "通信なし";
    message.textContent = "";
  },10200);

  setTimeout(()=>{
    message.textContent = "関連する検索記録があります。";
    next.hidden = false;
  },11600);
}

next.addEventListener("click",()=>{
  localStorage.setItem("ls_case_009_complete","true");
  localStorage.setItem("ls_household_missing_seen","true");
  localStorage.setItem("ls_offline_query_seen","true");
  localStorage.setItem("ls_next_query","OFFLINE");
  localStorage.setItem("ls_last_query","OFFLINE");
  location.href="../../index.html?prefill=OFFLINE";
});

run();
})();
