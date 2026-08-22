(()=>{
'use strict';
const $=(s,root=document)=>root.querySelector(s);
const $$=(s,root=document)=>Array.from(root.querySelectorAll(s));
const sleep=(ms)=>new Promise(r=>setTimeout(r,ms));
const store=(k,v)=>{try{localStorage.setItem(k,typeof v==='string'?v:JSON.stringify(v))}catch{}};
const read=(k,fallback=null)=>{try{const v=localStorage.getItem(k);if(v===null)return fallback;try{return JSON.parse(v)}catch{return v}}catch{return fallback}};
const complete=(id)=>store(`ls_case_${id}_complete`,'true');
const routeHome=(prefill='')=>{if(prefill){store('ls_next_query',prefill);store('ls_last_query',prefill);} const q=prefill?`?prefill=${encodeURIComponent(prefill)}`:''; window.location.assign('../../index.html'+q);};

const seq=[
  ['街頭防犯カメラ','住宅街 / 312m'],['店舗外部カメラ','コンビニ前 / 184m'],['マンション外部設備','エントランス / 72m'],['共用部カメラ','フロア通路 / 18m'],['宅内接続機器','0m']
]; let i=0;
function render(){ $('#source').textContent=seq[i][0]; $('#thumb').textContent=seq[i][1]; $('#distance').textContent=seq[i][1].split('/').slice(-1)[0].trim(); }
$('#next').addEventListener('click', async()=>{ if(i<seq.length-1){ i++; render(); } else { $('#final').classList.remove('hidden'); complete('006'); await sleep(3500); routeHome('検索履歴'); } });
$('#home').addEventListener('click',()=>routeHome('検索履歴'));
render();

})();
