(()=>{
"use strict";
const $=s=>document.querySelector(s);
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const store=(k,v)=>{try{localStorage.setItem(k,String(v))}catch{}};
const complete=id=>store(`ls_case_${id}_complete`,`true`);
const routeHome=(prefill="")=>{if(prefill){store("ls_next_query",prefill);store("ls_last_query",prefill)}const q=prefill?`?prefill=${encodeURIComponent(prefill)}`:"";location.assign("../../index.html"+q)};
const records=[
{img:"./img/track-01.webp",cam:"CAM-01",time:"23:41:12",source:"街頭防犯カメラ",owner:"自治体管理",match:"97.8%",handoff:"最初の記録",status:"対象を照合しています。"},
{img:"./img/track-02.webp",cam:"CAM-07",time:"23:47:36",source:"店舗外部防犯カメラ",owner:"民間店舗管理",match:"98.5%",handoff:"6分24秒後 / 同一人物",status:"別の管理系統から同一人物を検出しました。"},
{img:"./img/track-03.webp",cam:"CAM-13",time:"23:52:08",source:"建物入口防犯カメラ",owner:"集合住宅管理",match:"99.1%",handoff:"4分32秒後 / 同一人物",status:"追跡元を切り替えました。"},
{img:"./img/track-04.webp",cam:"CAM-21",time:"23:56:44",source:"共用部カメラ",owner:"集合住宅管理",match:"99.6%",handoff:"4分36秒後 / 同一人物",status:"対象を継続して確認しています。"},
{img:"./img/track-05.webp",cam:"SOURCE-UNKNOWN",time:"23:59:03",source:"宅内接続機器",owner:"久我あきら",match:"99.9%",handoff:"2分19秒後 / 同一人物",status:"取得元の機器種別を確認できません。",access:"確認できません"}
];
let i=0;
const progress=$("#progress"); records.forEach((_,n)=>{const d=document.createElement("span");d.className="dot"+(n===0?" on":" ");progress.appendChild(d)});
function render(){const r=records[i];$("#image").src=r.img;$("#camera").textContent=r.cam;$("#time").textContent=r.time;$("#source").textContent=r.source;$("#owner").textContent=r.owner;$("#confidence").textContent=`人物一致率：${r.match}`;$("#handoff").textContent=r.handoff;$("#status").textContent=r.status;document.querySelectorAll(".dot").forEach((d,n)=>d.classList.toggle("on",n<=i));const access=$("#accessRow");if(r.access){access.classList.remove("hidden");$("#access").textContent=r.access;$("#next").textContent="追跡結果を見る"}else{access.classList.add("hidden");$("#next").textContent="次の記録"}}
$("#next").addEventListener("click",async()=>{if(i<records.length-1){i++;render();return}complete("006");store("ls_case_006_tracking_sources","5");$("#final").classList.remove("hidden");await sleep(4200);routeHome("検索履歴")});
$("#home").addEventListener("click",()=>routeHome("検索履歴"));
render();
})();
