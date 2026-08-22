(()=>{
'use strict';
const $=(s,root=document)=>root.querySelector(s);
const $$=(s,root=document)=>Array.from(root.querySelectorAll(s));
const sleep=(ms)=>new Promise(r=>setTimeout(r,ms));
const store=(k,v)=>{try{localStorage.setItem(k,typeof v==='string'?v:JSON.stringify(v))}catch{}};
const read=(k,fallback=null)=>{try{const v=localStorage.getItem(k);if(v===null)return fallback;try{return JSON.parse(v)}catch{return v}}catch{return fallback}};
const complete=(id)=>store(`ls_case_${id}_complete`,'true');
const routeHome=(prefill='')=>{if(prefill){store('ls_next_query',prefill);store('ls_last_query',prefill);} const q=prefill?`?prefill=${encodeURIComponent(prefill)}`:''; window.location.assign('../../index.html'+q);};

const input=$('#query'); const result=$('#result'); const paid=$('#paidNotice'); let timer=null; let runs=0;
function seed(){ clearTimeout(timer); timer=setTimeout(()=>{ if(!input.value.trim()) input.value='佐伯'; }, 1600); }
input.addEventListener('input', seed);
$('#search').addEventListener('click', async()=>{ if(input.value.trim()!=='佐伯'){ result.classList.remove('hidden'); result.innerHTML='<h3>検索結果</h3><p>一致する結果が見つかりません。</p>'; seed(); return; } runs++; result.classList.remove('hidden'); result.innerHTML='<h3>検索結果</h3><p>見つけましたか</p>'; complete('015'); store('ls_free_complete','true'); if(runs>=1){ await sleep(1200); paid.classList.remove('hidden'); } });
$('#home').addEventListener('click',()=>routeHome('佐伯'));
seed();

})();
