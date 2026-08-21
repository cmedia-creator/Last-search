(() => {
"use strict";
const panel=document.getElementById("panel"),message=document.getElementById("message"),
searchStage=document.getElementById("searchStage"),query=document.getElementById("query"),
finalBox=document.getElementById("finalBox"),next=document.getElementById("next");

const changes=[
 ["v0","解約済み","携帯電話"],
 ["v1","アカウントが存在しません","メール"],
 ["v2","ユーザーが見つかりません","SNS"],
 ["v3","取得できません","位置情報"],
 ["v4","人物を検出できません","人物照合"]
];

function erase(n){
 const [id,text,label]=changes[n];
 const card=document.querySelector(`[data-step="${n}"]`);
 document.getElementById(id).textContent=text;
 card.classList.add("deleted");
 panel.classList.add("pulse");
 setTimeout(()=>panel.classList.remove("pulse"),650);
 message.textContent=label+"の記録が消えました。";
}

changes.forEach((_,n)=>setTimeout(()=>erase(n),1500+n*1700));

setTimeout(()=>{
 message.textContent="";
 searchStage.hidden=false;
 typeQuery("見つからない場所");
},10300);

function typeQuery(text){
 let i=0;
 const timer=setInterval(()=>{
   query.textContent=text.slice(0,++i);
   if(i>=text.length){
     clearInterval(timer);
     localStorage.setItem("ls_missing_place_query_seen","true");
     setTimeout(showFinal,1700);
   }
 },260);
}

function showFinal(){
 finalBox.hidden=false;
 message.textContent="以降の記録を確認できません。";
 setTimeout(()=>{next.hidden=false},1600);
}

next.onclick=()=>{
 localStorage.setItem("ls_case_010_complete","true");
 localStorage.setItem("ls_household_self_erasure_seen","true");
 localStorage.setItem("ls_next_query","久我あきら 最終記録");
 localStorage.setItem("ls_last_query","久我あきら 最終記録");
 location.href="../../index.html?prefill="+encodeURIComponent("久我あきら 最終記録");
};
})();