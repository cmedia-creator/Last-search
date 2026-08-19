(() => {
"use strict";
const CASE_ID="006", ENTRY_KEY="ls_entry_case", ACTIVE_KEY="ls_case_006_active";
const entry=sessionStorage.getItem(ENTRY_KEY);
const active=sessionStorage.getItem(ACTIVE_KEY)==="true";

if(entry===CASE_ID){
  sessionStorage.removeItem(ENTRY_KEY);
  sessionStorage.setItem(ACTIVE_KEY,"true");
}else if(!active){
  location.replace("../case-003/");
  return;
}

if(localStorage.getItem("ls_case_006_complete")==="true"){
  document.addEventListener("DOMContentLoaded",()=>{
    document.body.innerHTML=`<main style="min-height:100dvh;display:flex;align-items:center;justify-content:center;padding:24px;background:#f4f4f1;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Yu Gothic',Meiryo,sans-serif"><div style="text-align:center"><div style="font-size:13px;color:#777;margin-bottom:16px;letter-spacing:.08em">LAST SEARCH</div><div style="font-size:22px">位置記録は確認済みです。</div></div></main>`;
    sessionStorage.removeItem(ACTIVE_KEY);
    setTimeout(()=>location.replace("../../"),3000);
  });
  return;
}

const records=[
 {img:"distance-01.png",date:"2026/08/14",distance:"312m"},
 {img:"distance-02.png",date:"2026/08/15",distance:"184m"},
 {img:"distance-03.png",date:"2026/08/16",distance:"72m"},
 {img:"distance-04.png",date:"2026/08/17",distance:"18m"},
 {img:"distance-05.png",date:"2026/08/18",distance:"0m"},
 {img:"distance-06.png",date:"2009/09/17",distance:"0m",past:true},
 {img:"distance-07.png",date:"2009/09/17 03:17",distance:"-4m",place:"内部",inside:true}
];

let index=Number(sessionStorage.getItem("ls_case_006_index")||0);
if(index<0||index>=records.length) index=0;

const photo=document.getElementById("photo");
const date=document.getElementById("date");
const distance=document.getElementById("distance");
const place=document.getElementById("place");
const placeRow=place.parentElement;
const personRow=document.getElementById("personRow");
const nextBtn=document.getElementById("nextBtn");
const searchPlaceBtn=document.getElementById("searchPlaceBtn");
let finalTimerStarted=false;

function render(){
 const r=records[index];
 photo.src="./img/"+r.img;
 date.textContent=r.date;
 distance.textContent=r.distance;
 placeRow.hidden=!r.place;
 if(r.place) place.textContent=r.place;
 personRow.hidden=true;
 searchPlaceBtn.hidden=true;

 if(index===4) nextBtn.textContent="過去の記録";
 else nextBtn.textContent="次の記録";

 if(index===records.length-1){
   nextBtn.hidden=true;
   startFinal();
 } else {
   nextBtn.hidden=false;
 }
 sessionStorage.setItem("ls_case_006_index",String(index));
}

function startFinal(){
 if(finalTimerStarted) return;
 finalTimerStarted=true;

 setTimeout(()=>{ distance.textContent="現在"; },5000);
 setTimeout(()=>{
   personRow.hidden=false;
 },7500);
 setTimeout(()=>{
   searchPlaceBtn.hidden=false;
 },9500);
}

nextBtn.addEventListener("click",()=>{
 if(index<records.length-1){
   index++;
   render();
 }
});

searchPlaceBtn.addEventListener("click",()=>{
 localStorage.setItem("ls_case_006_complete","true");
 localStorage.setItem("ls_pending_query","久我あきら　2009年9月17日");
 try{
   const seen=JSON.parse(localStorage.getItem("ls_seen_cases")||"[]");
   const list=Array.isArray(seen)?seen:[];
   if(!list.includes("006")) list.push("006");
   localStorage.setItem("ls_seen_cases",JSON.stringify(list));
 }catch{
   localStorage.setItem("ls_seen_cases",JSON.stringify(["006"]));
 }
 sessionStorage.removeItem("ls_case_006_index");
 sessionStorage.removeItem(ACTIVE_KEY);
 sessionStorage.removeItem(ENTRY_KEY);
 location.href="../../";
});

render();
})();