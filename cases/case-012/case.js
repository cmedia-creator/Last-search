(()=>{
'use strict';
const $=(s,root=document)=>root.querySelector(s);
const $$=(s,root=document)=>Array.from(root.querySelectorAll(s));
const sleep=(ms)=>new Promise(r=>setTimeout(r,ms));
const store=(k,v)=>{try{localStorage.setItem(k,typeof v==='string'?v:JSON.stringify(v))}catch{}};
const read=(k,fallback=null)=>{try{const v=localStorage.getItem(k);if(v===null)return fallback;try{return JSON.parse(v)}catch{return v}}catch{return fallback}};
const complete=(id)=>store(`ls_case_${id}_complete`,'true');
const routeHome=(prefill='')=>{if(prefill){store('ls_next_query',prefill);store('ls_last_query',prefill);} const q=prefill?`?prefill=${encodeURIComponent(prefill)}`:''; window.location.assign('../../index.html'+q);};

$('#send').addEventListener('click', async()=>{ const q=$('#query').value.trim(); if(!q) return; const res=$('#response'); res.classList.remove('hidden'); if(/誰|だれ|何を|なにを/.test(q)){ res.innerHTML='<h3>LAST SEARCH</h3><p>佐伯さんです</p>'; complete('012'); await sleep(1600); routeHome('どこにでもいる'); return; } res.innerHTML='<h3>LAST SEARCH</h3><p>探してください</p>'; });
$('#home').addEventListener('click',()=>routeHome('どこにでもいる'));

})();
