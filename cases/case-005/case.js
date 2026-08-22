(()=>{
'use strict';
const $=(s,root=document)=>root.querySelector(s);
const $$=(s,root=document)=>Array.from(root.querySelectorAll(s));
const sleep=(ms)=>new Promise(r=>setTimeout(r,ms));
const store=(k,v)=>{try{localStorage.setItem(k,typeof v==='string'?v:JSON.stringify(v))}catch{}};
const read=(k,fallback=null)=>{try{const v=localStorage.getItem(k);if(v===null)return fallback;try{return JSON.parse(v)}catch{return v}}catch{return fallback}};
const complete=(id)=>store(`ls_case_${id}_complete`,'true');
const routeHome=(prefill='')=>{if(prefill){store('ls_next_query',prefill);store('ls_last_query',prefill);} const q=prefill?`?prefill=${encodeURIComponent(prefill)}`:''; window.location.assign('../../index.html'+q);};

const records=[
  {source:'居住者台帳',count:'4名',detail:'父 / 母 / 娘 / 息子'},
  {source:'旧自治体バックアップ',count:'3名',detail:'父 / 母 / 娘'},
  {source:'住宅契約記録',count:'2名',detail:'成人2名のみ照合'},
  {source:'転出届原本照合',count:'0名',detail:'該当記録なし'}
];
let i=0; const out=$('#record');
function render(){ const r=records[i]; out.innerHTML=`<div class="kv"><strong>参照元</strong><span>${r.source}</span></div><div class="kv"><strong>人数</strong><span>${r.count}</span></div><div class="kv"><strong>補足</strong><span>${r.detail}</span></div>`; if(i===records.length-1){ $('#next').textContent='終了'; } }
$('#next').addEventListener('click',()=>{ if(i<records.length-1){ i++; render(); } else { complete('005'); routeHome('距離'); } });
$('#home').addEventListener('click',()=>routeHome('距離'));
render();

})();
