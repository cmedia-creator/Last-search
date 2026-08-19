(() => {
"use strict";
const CASE_ID="007", ENTRY_KEY="ls_entry_case", ACTIVE_KEY="ls_case_007_active";
const entry=sessionStorage.getItem(ENTRY_KEY);
const active=sessionStorage.getItem(ACTIVE_KEY)==="true";

if(entry===CASE_ID){
  sessionStorage.removeItem(ENTRY_KEY);
  sessionStorage.setItem(ACTIVE_KEY,"true");
}else if(!active){
  location.replace("../case-003/");
  return;
}

if(localStorage.getItem("ls_case_007_complete")==="true"){
  document.addEventListener("DOMContentLoaded",()=>{
    document.body.innerHTML=`<main style="min-height:100dvh;display:flex;align-items:center;justify-content:center;padding:24px;background:#f4f4f1;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Yu Gothic',Meiryo,sans-serif"><div style="text-align:center"><div style="font-size:13px;color:#777;margin-bottom:16px;letter-spacing:.08em">LAST SEARCH</div><div style="font-size:22px">検索履歴は保存済みです。</div></div></main>`;
    sessionStorage.removeItem(ACTIVE_KEY);
    setTimeout(()=>location.replace("../../"),3000);
  });
  return;
}

const intro=document.getElementById("intro");
const history=document.getElementById("history");
const openBtn=document.getElementById("openBtn");
const blankRow=document.getElementById("blankRow");
const recovered=document.getElementById("recovered");
const restoreText=document.getElementById("restoreText");
const restoredQuery=document.getElementById("restoredQuery");
const currentRows=document.getElementById("currentRows");
const endText=document.getElementById("endText");
let sequenceStarted=false;

openBtn.addEventListener("click",()=>{
  intro.hidden=true;
  history.hidden=false;
  history.scrollIntoView({behavior:"smooth",block:"start"});
});

blankRow.addEventListener("click",()=>{
  if(sequenceStarted) return;
  sequenceStarted=true;
  blankRow.disabled=true;
  recovered.hidden=false;
  recovered.scrollIntoView({behavior:"smooth",block:"start"});

  setTimeout(()=>{
    restoreText.hidden=true;
    restoredQuery.hidden=false;
  },5000);

  setTimeout(()=>{
    const now=new Date();
    const hh=String(now.getHours()).padStart(2,"0");
    const mm=String(now.getMinutes()).padStart(2,"0");
    const time=`${hh}:${mm}`;

    currentRows.innerHTML=`
      <div class="row new"><time>${time}</time><span>久我あきら　2009年9月17日</span></div>
      <div class="row"><time>${time}</time><span>この履歴を見ている人</span></div>
    `;
  },8000);

  setTimeout(()=>{
    endText.hidden=false;
  },15000);

  setTimeout(()=>{
    localStorage.setItem("ls_case_007_complete","true");
    try{
      const seen=JSON.parse(localStorage.getItem("ls_seen_cases")||"[]");
      const list=Array.isArray(seen)?seen:[];
      if(!list.includes("007")) list.push("007");
      localStorage.setItem("ls_seen_cases",JSON.stringify(list));
    }catch{
      localStorage.setItem("ls_seen_cases",JSON.stringify(["007"]));
    }
    sessionStorage.removeItem(ACTIVE_KEY);
    sessionStorage.removeItem(ENTRY_KEY);
    location.href="../../";
  },18000);
});
})();