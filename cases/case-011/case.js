(() => {
"use strict";
const panel=document.getElementById("panel"),deathWord=document.getElementById("deathWord"),
questions=document.getElementById("questions"),missing=document.getElementById("missing"),
people=document.getElementById("people"),counter=document.getElementById("counter"),
number=document.getElementById("number"),lastQuery=document.getElementById("lastQuery"),
message=document.getElementById("message"),next=document.getElementById("next");

const checks=[
 ["遺体","見つかりません"],
 ["死亡届","見つかりません"],
 ["死亡診断書","見つかりません"]
];

function addQuestion(i){
 const d=document.createElement("div"); d.className="question bad";
 d.innerHTML="<span></span><b></b>";
 d.querySelector("span").textContent=checks[i][0];
 d.querySelector("b").textContent=checks[i][1];
 questions.appendChild(d);
}

setTimeout(()=>{
 deathWord.textContent="死亡？";
 panel.classList.add("shake");
 setTimeout(()=>panel.classList.remove("shake"),700);
 questions.hidden=false;
 message.textContent="";
},1800);

checks.forEach((_,i)=>setTimeout(()=>addQuestion(i),2900+i*900));

setTimeout(()=>{
 deathWord.textContent="死亡を確認できません";
 deathWord.style.fontSize="18px";
 message.textContent="判定を訂正しています。";
},6100);

setTimeout(()=>{
 document.querySelector(".death").style.display="none";
 questions.style.display="none";
 missing.hidden=false;
 message.textContent="";
 localStorage.setItem("ls_kuga_death_corrected","true");
},7600);

const names=[
 "小形高地区　一家A","小形高地区　一家B","小形高地区　一家C","小形高地区　一家D",
 "人物 06","人物 07","人物 08","人物 09","人物 10","人物 11",
 "人物 12","人物 13","人物 14","人物 15","人物 16","人物 17"
];

function addPerson(name){
 const d=document.createElement("div");d.className="person";
 d.innerHTML="<span></span><span>どこにもいません。</span>";
 d.firstChild.textContent=name;
 people.appendChild(d);
}

setTimeout(()=>{
 people.hidden=false;
 message.textContent="同じ状態の人物記録があります。";
 let i=0;
 const t=setInterval(()=>{
   if(i>=names.length){clearInterval(t);showCount();return}
   addPerson(names[i++]);
 },190);
},9300);

function showCount(){
 counter.hidden=false;
 let vals=[5,8,17,31],i=0;
 const t=setInterval(()=>{
   number.textContent=vals[i++];
   if(i>=vals.length){
     clearInterval(t);
     localStorage.setItem("ls_related_missing_persons","31");
     setTimeout(showQuery,1200);
   }
 },800);
}

function showQuery(){
 lastQuery.hidden=false;
 message.textContent="";
 setTimeout(()=>next.hidden=false,1400);
}

next.onclick=()=>{
 localStorage.setItem("ls_case_011_complete","true");
 localStorage.setItem("ls_next_query","見つからない場所 位置情報");
 localStorage.setItem("ls_last_query","見つからない場所 位置情報");
 location.href="../../index.html?prefill="+encodeURIComponent("見つからない場所 位置情報");
};
})();