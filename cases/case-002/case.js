(()=>{
'use strict';
const $=(s,root=document)=>root.querySelector(s);
const $$=(s,root=document)=>Array.from(root.querySelectorAll(s));
const sleep=(ms)=>new Promise(r=>setTimeout(r,ms));
const store=(k,v)=>{try{localStorage.setItem(k,typeof v==='string'?v:JSON.stringify(v))}catch{}};
const read=(k,fallback=null)=>{try{const v=localStorage.getItem(k);if(v===null)return fallback;try{return JSON.parse(v)}catch{return v}}catch{return fallback}};
const complete=(id)=>store(`ls_case_${id}_complete`,'true');
const routeHome=(prefill='')=>{if(prefill){store('ls_next_query',prefill);store('ls_last_query',prefill);} const q=prefill?`?prefill=${encodeURIComponent(prefill)}`:''; window.location.assign('../../index.html'+q);};

const items=[
  {t:'記録 01',b:'検索結果は正常です。\nリンク1：記録の断片\nリンク2：削除済み掲示板のミラー'},
  {t:'記録 02',b:'追跡対象：久我あきら\n最終更新：数秒前\n状態：取得中'},
  {t:'記録 03',b:'Z Search へのアクセスを再確認しています。\n閲覧を続けると結果が更新される場合があります。'}
];
const log=$('#log'), next=$('#next'), back=$('#back'), clock=$('#clock'), overlay=$('#overlay');
let idx=0; let mins=26;
function addItem(){ if(idx>=items.length) return; const c=document.createElement('article'); c.className='card'; c.innerHTML=`<h3>${items[idx].t}</h3><p>${items[idx].b.replace(/\n/g,'<br>')}</p>`; log.appendChild(c); idx++; mins++; clock.textContent=`00:${String(mins).padStart(2,'0')}`; if(mins>=29){ trigger(); } }
let done=false;
async function trigger(){ if(done) return; done=true; overlay.classList.remove('hidden'); complete('002'); store('ls_kuga_status','00:29'); await sleep(7000); routeHome('久我あきら'); }
next.addEventListener('click',()=>{ addItem(); if(idx>=items.length) next.disabled=true; });
back.addEventListener('click',()=> trigger());
addItem();

})();
