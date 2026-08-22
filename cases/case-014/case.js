(()=>{
'use strict';
const $=(s,root=document)=>root.querySelector(s);
const $$=(s,root=document)=>Array.from(root.querySelectorAll(s));
const sleep=(ms)=>new Promise(r=>setTimeout(r,ms));
const store=(k,v)=>{try{localStorage.setItem(k,typeof v==='string'?v:JSON.stringify(v))}catch{}};
const read=(k,fallback=null)=>{try{const v=localStorage.getItem(k);if(v===null)return fallback;try{return JSON.parse(v)}catch{return v}}catch{return fallback}};
const complete=(id)=>store(`ls_case_${id}_complete`,'true');
const routeHome=(prefill='')=>{if(prefill){store('ls_next_query',prefill);store('ls_last_query',prefill);} const q=prefill?`?prefill=${encodeURIComponent(prefill)}`:''; window.location.assign('../../index.html'+q);};

const entries=[['通信','2009-09-17 18:42 を最後に途絶'],['交通','富士山麓周辺で記録停止'],['金融','以降の更新なし'],['監視映像','対象検出なし'],['行政','以降の活動なし']];
let i=0; const tl=$('#timeline'); function add(){ const row=document.createElement('div'); row.className='row'; row.innerHTML=`<div class="time">${entries[i][0]}</div><div class="entry">${entries[i][1]}</div>`; tl.appendChild(row); }
$('#next').addEventListener('click',()=>{ if(i<entries.length){ add(); i++; if(i===entries.length){ $('#finalQuestion').classList.remove('hidden'); $('#next').textContent='終了'; } } else { complete('014'); routeHome('佐伯'); } });
$('#home').addEventListener('click',()=>routeHome('佐伯'));
add(); i++;

})();
