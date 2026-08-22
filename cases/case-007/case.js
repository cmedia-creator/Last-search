(()=>{
'use strict';
const $=(s,root=document)=>root.querySelector(s);
const $$=(s,root=document)=>Array.from(root.querySelectorAll(s));
const sleep=(ms)=>new Promise(r=>setTimeout(r,ms));
const store=(k,v)=>{try{localStorage.setItem(k,typeof v==='string'?v:JSON.stringify(v))}catch{}};
const read=(k,fallback=null)=>{try{const v=localStorage.getItem(k);if(v===null)return fallback;try{return JSON.parse(v)}catch{return v}}catch{return fallback}};
const complete=(id)=>store(`ls_case_${id}_complete`,'true');
const routeHome=(prefill='')=>{if(prefill){store('ls_next_query',prefill);store('ls_last_query',prefill);} const q=prefill?`?prefill=${encodeURIComponent(prefill)}`:''; window.location.assign('../../index.html'+q);};

const timeline=$('#timeline');
const entries=[['00:41','小形高'],['00:53','小形高 事故'],['01:08','小形高 9月17日'],['01:26','行方不明'],['02:41','実体とは何ですか'],['03:17','検索語なし']];
let idx=0; function add(time,text){ const row=document.createElement('div'); row.className='row'; row.innerHTML=`<div class="time">${time}</div><div class="entry">${text}</div>`; timeline.appendChild(row); }
$('#append').addEventListener('click', async()=>{ if(idx<entries.length){ add(entries[idx][0],entries[idx][1]); idx++; if(idx===entries.length){ await sleep(500); const now = new Date(); const t = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`; add(t, read('ls_last_query','この履歴を見ている人')); $('#append').textContent='終了'; return; } return; } complete('007'); routeHome('権限'); });
$('#home').addEventListener('click',()=>routeHome('権限'));
add(entries[idx][0],entries[idx][1]); idx++;

})();
