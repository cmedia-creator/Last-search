(()=>{
'use strict';
const $=(s,root=document)=>root.querySelector(s);
const $$=(s,root=document)=>Array.from(root.querySelectorAll(s));
const sleep=(ms)=>new Promise(r=>setTimeout(r,ms));
const store=(k,v)=>{try{localStorage.setItem(k,typeof v==='string'?v:JSON.stringify(v))}catch{}};
const read=(k,fallback=null)=>{try{const v=localStorage.getItem(k);if(v===null)return fallback;try{return JSON.parse(v)}catch{return v}}catch{return fallback}};
const complete=(id)=>store(`ls_case_${id}_complete`,'true');
const routeHome=(prefill='')=>{if(prefill){store('ls_next_query',prefill);store('ls_last_query',prefill);} const q=prefill?`?prefill=${encodeURIComponent(prefill)}`:''; window.location.assign('../../index.html'+q);};

const docs=[
  '<div class="doc redacted"><h3>警察照会記録</h3><p>######## ######## ########</p><p class="reveal">対象：佐伯</p><p class="reveal">関係：父親</p></div>',
  '<div class="doc redacted"><h3>識別名照会</h3><p>######## ######## ########</p><p class="reveal">返答：私はおごたかです</p></div>',
  '<div class="doc redacted"><h3>公安参照メモ</h3><p>######## ######## ########</p><p class="reveal">2001 / 東都大学・加野研究所</p></div>'
];
let i=0; const docsEl=$('#docs');
$('#reveal').addEventListener('click',()=>{ if(i<docs.length){ const wrap=document.createElement('div'); wrap.innerHTML=docs[i]; docsEl.appendChild(wrap.firstChild); i++; if(i===docs.length) $('#reveal').textContent='終了'; } else { complete('008'); routeHome('五人目'); } });
$('#home').addEventListener('click',()=>routeHome('五人目'));

})();
