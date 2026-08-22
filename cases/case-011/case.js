(()=>{
'use strict';
const $=(s,root=document)=>root.querySelector(s);
const $$=(s,root=document)=>Array.from(root.querySelectorAll(s));
const sleep=(ms)=>new Promise(r=>setTimeout(r,ms));
const store=(k,v)=>{try{localStorage.setItem(k,typeof v==='string'?v:JSON.stringify(v))}catch{}};
const read=(k,fallback=null)=>{try{const v=localStorage.getItem(k);if(v===null)return fallback;try{return JSON.parse(v)}catch{return v}}catch{return fallback}};
const complete=(id)=>store(`ls_case_${id}_complete`,'true');
const routeHome=(prefill='')=>{if(prefill){store('ls_next_query',prefill);store('ls_last_query',prefill);} const q=prefill?`?prefill=${encodeURIComponent(prefill)}`:''; window.location.assign('../../index.html'+q);};

const convo=$('#conversation'); const input=$('#query');
function say(who,text){ const card=document.createElement('div'); card.className='card'; card.innerHTML=`<div class="badge">${who}</div><p style="margin-top:10px">${text}</p>`; convo.appendChild(card); }
$('#send').addEventListener('click', async()=>{ const q=input.value.trim(); if(!q) return; say('入力', q); input.value=''; await sleep(350); if(/何を|なにを/.test(q)){ say('LAST SEARCH','佐伯さんです'); complete('011'); return; } if(/見せて|みせて/.test(q)){ say('LAST SEARCH','私が持っているものを見ますか'); return; } if(/見つけてない|見つからない/.test(q)){ say('LAST SEARCH','私が持っているものを見ますか'); return; } say('LAST SEARCH','見つけましたか'); });
$('#home').addEventListener('click',()=>routeHome('探してください'));
say('LAST SEARCH','見つけましたか');

})();
