(()=>{
'use strict';
const $=(s,root=document)=>root.querySelector(s);
const $$=(s,root=document)=>Array.from(root.querySelectorAll(s));
const sleep=(ms)=>new Promise(r=>setTimeout(r,ms));
const store=(k,v)=>{try{localStorage.setItem(k,typeof v==='string'?v:JSON.stringify(v))}catch{}};
const read=(k,fallback=null)=>{try{const v=localStorage.getItem(k);if(v===null)return fallback;try{return JSON.parse(v)}catch{return v}}catch{return fallback}};
const complete=(id)=>store(`ls_case_${id}_complete`,'true');
const routeHome=(prefill='')=>{if(prefill){store('ls_next_query',prefill);store('ls_last_query',prefill);} const q=prefill?`?prefill=${encodeURIComponent(prefill)}`:''; window.location.assign('../../index.html'+q);};

const states=['取得中','2026-08-22 00:28','2026-08-22 00:29 이후取得なし'];
let step=0;
$('#scan').addEventListener('click', async()=>{ step++; $('#lastCheck').textContent=states[Math.min(step,states.length-1)]; if(step===1){ $('#sessionState').textContent='一致候補あり'; } if(step>=2){ $('#sessionState').textContent='一致'; $('#match').classList.remove('hidden'); complete('004'); await sleep(3500); routeHome('2009年9月17日'); } });
$('#home').addEventListener('click',()=>routeHome('2009年9月17日'));

})();
