(()=>{
'use strict';
const $=(s,root=document)=>root.querySelector(s);
const $$=(s,root=document)=>Array.from(root.querySelectorAll(s));
const sleep=(ms)=>new Promise(r=>setTimeout(r,ms));
const store=(k,v)=>{try{localStorage.setItem(k,typeof v==='string'?v:JSON.stringify(v))}catch{}};
const read=(k,fallback=null)=>{try{const v=localStorage.getItem(k);if(v===null)return fallback;try{return JSON.parse(v)}catch{return v}}catch{return fallback}};
const complete=(id)=>store(`ls_case_${id}_complete`,'true');
const routeHome=(prefill='')=>{if(prefill){store('ls_next_query',prefill);store('ls_last_query',prefill);} const q=prefill?`?prefill=${encodeURIComponent(prefill)}`:''; window.location.assign('../../index.html'+q);};

const lines=['この記録はまだ開かれていません。','あなたはまだ、ここを検索していない。','検索画面へ戻ります。'];
const box=$('#lines'); let i=0;
async function run(){ for(const line of lines){ const p=document.createElement('div'); p.className='card'; p.textContent=line; box.appendChild(p); await sleep(900); } complete('003'); store('ls_case_003_seen','true'); }
$('#return').addEventListener('click',()=>routeHome(read('ls_next_query','')));
run();

})();
