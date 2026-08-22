(()=>{
'use strict';
const $=(s,root=document)=>root.querySelector(s);
const $$=(s,root=document)=>Array.from(root.querySelectorAll(s));
const sleep=(ms)=>new Promise(r=>setTimeout(r,ms));
const store=(k,v)=>{try{localStorage.setItem(k,typeof v==='string'?v:JSON.stringify(v))}catch{}};
const read=(k,fallback=null)=>{try{const v=localStorage.getItem(k);if(v===null)return fallback;try{return JSON.parse(v)}catch{return v}}catch{return fallback}};
const complete=(id)=>store(`ls_case_${id}_complete`,'true');
const routeHome=(prefill='')=>{if(prefill){store('ls_next_query',prefill);store('ls_last_query',prefill);} const q=prefill?`?prefill=${encodeURIComponent(prefill)}`:''; window.location.assign('../../index.html'+q);};

const data=[
  ['電車内広告','探してください'],['駅の電光掲示板','探してください'],['家電量販店のテレビ','探してください'],['店舗サイネージ','探してください'],['スマートフォン通知','探してください'],['街頭ビジョン','探してください']
]; let i=0; const wrap=$('#systems');
function add(){ const card=document.createElement('div'); card.className='card'; card.innerHTML=`<div class="tag">${data[i][0]}</div><div class="screenThumb" style="margin-top:10px">${data[i][1]}</div>`; wrap.appendChild(card); }
$('#next').addEventListener('click',()=>{ if(i<data.length){ add(); i++; if(i===data.length) $('#next').textContent='終了'; } else { complete('013'); routeHome('空白'); } });
$('#home').addEventListener('click',()=>routeHome('空白'));
add(); i++;

})();
