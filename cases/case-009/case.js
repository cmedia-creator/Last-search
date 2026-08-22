(()=>{
'use strict';
const $=(s,root=document)=>root.querySelector(s);
const $$=(s,root=document)=>Array.from(root.querySelectorAll(s));
const sleep=(ms)=>new Promise(r=>setTimeout(r,ms));
const store=(k,v)=>{try{localStorage.setItem(k,typeof v==='string'?v:JSON.stringify(v))}catch{}};
const read=(k,fallback=null)=>{try{const v=localStorage.getItem(k);if(v===null)return fallback;try{return JSON.parse(v)}catch{return v}}catch{return fallback}};
const complete=(id)=>store(`ls_case_${id}_complete`,'true');
const routeHome=(prefill='')=>{if(prefill){store('ls_next_query',prefill);store('ls_last_query',prefill);} const q=prefill?`?prefill=${encodeURIComponent(prefill)}`:''; window.location.assign('../../index.html'+q);};

const states=[
  '<div class="kv"><strong>検出人数</strong><span>4名</span></div><div class="kv"><strong>状態</strong><span>照合中</span></div>',
  '<div class="kv"><strong>検出人数</strong><span>4名</span></div><div class="kv"><strong>関連人物</strong><span>5</span></div><div class="kv"><strong>状態</strong><span>追加照合を実行しています</span></div>',
  '<div class="kv"><strong>関連人物 01-04</strong><span>一致</span></div><div class="kv"><strong>関連人物 05</strong><span>照合不可</span></div><div class="kv"><strong>補足</strong><span>家族単位の関連付けを検出しました</span></div>'
]; let i=0; $('#scanResult').innerHTML=states[0];
$('#scan').addEventListener('click',()=>{ i++; if(i<states.length){ $('#scanResult').innerHTML=states[i]; if(i===states.length-1) $('#scan').textContent='終了'; } else { complete('009'); routeHome('接続元'); } });
$('#home').addEventListener('click',()=>routeHome('接続元'));

})();
