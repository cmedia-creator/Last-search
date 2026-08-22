(()=>{
'use strict';
const $=(s,root=document)=>root.querySelector(s);
const $$=(s,root=document)=>Array.from(root.querySelectorAll(s));
const sleep=(ms)=>new Promise(r=>setTimeout(r,ms));
const store=(k,v)=>{try{localStorage.setItem(k,typeof v==='string'?v:JSON.stringify(v))}catch{}};
const read=(k,fallback=null)=>{try{const v=localStorage.getItem(k);if(v===null)return fallback;try{return JSON.parse(v)}catch{return v}}catch{return fallback}};
const complete=(id)=>store(`ls_case_${id}_complete`,'true');
const routeHome=(prefill='')=>{if(prefill){store('ls_next_query',prefill);store('ls_last_query',prefill);} const q=prefill?`?prefill=${encodeURIComponent(prefill)}`:''; window.location.assign('../../index.html'+q);};

const promptEl=$('#prompt'),grid=$('#grid'),status=$('#status'),verify=$('#verify'),challenge=$('#challenge'),completeView=$('#complete');
const I={signal:[1,2,3,4].map(n=>`./img/signal-0${n}.webp`),bike:[1,2,3,4].map(n=>`./img/bike-0${n}.webp`),house:[1,2,3].map(n=>`./img/house-0${n}.webp`),family:[1,2,3,4].map(n=>`./img/family-0${n}.webp`),needle:"./img/needle-01.webp",thread:"./img/thread-01.webp",kuga:[1,2,3,4,5,6,7,8,9].map(n=>`./img/kuga-0${n}.webp`)};
const steps=[
 {p:'信号機が写っている画像をすべて選択してください',a:[I.signal[0],I.family[0],I.signal[1],I.house[0],I.bike[0],I.signal[2],I.thread,I.signal[3],I.family[1]],c:[0,2,5,7]},
 {p:'自転車が写っている画像をすべて選択してください',a:[I.house[1],I.bike[0],I.family[2],I.bike[1],I.signal[0],I.needle,I.bike[2],I.house[2],I.bike[3]],c:[1,3,6,8]},
 {p:'家の外観が中心に写っている画像をすべて選択してください',a:[I.signal[0],I.house[0],I.signal[1],I.needle,I.house[1],I.thread,I.house[2],I.signal[2],I.signal[3]],c:[1,4,6]},
 {p:'家族が写っている画像をすべて選択してください',a:[I.family[0],I.bike[0],I.family[1],I.house[0],I.family[2],I.signal[0],I.needle,I.family[3],I.thread],c:[0,2,4,7]},
 {p:'針が写っている画像を選択してください',a:[I.house[1],I.family[1],I.needle,I.signal[3],I.bike[2],I.thread,I.house[0],I.family[2],I.signal[1]],c:[2]},
 {p:'糸が写っている画像をすべて選択してください',a:[I.bike[1],I.house[2],I.family[0],I.signal[2],I.thread,I.needle,I.family[3],I.house[0],I.bike[3]],c:[4,5]},
 {p:'久我あきらが写っている画像をすべて選択してください',a:[I.family[0],I.house[1],I.signal[0],I.bike[2],I.family[3],I.needle,I.house[0],I.thread,I.signal[3]],trap:true},
 {p:'久我あきらが写っている画像をすべて選択してください',a:I.kuga,c:[0,1,2,3,4,5,6,7,8],final:true}
];
let si=0,selected=new Set();
function render(){selected.clear(); const s=steps[si]; promptEl.textContent=s.p; status.textContent=''; grid.innerHTML=''; s.a.forEach((src,i)=>{ const b=document.createElement('button'); b.type='button'; b.className='tile'; b.innerHTML=`<img alt="認証画像 ${i+1}" src="${src}">`; b.addEventListener('click',()=>{b.classList.toggle('selected'); b.classList.contains('selected')?selected.add(i):selected.delete(i)}); grid.appendChild(b); }); }
verify.addEventListener('click', async()=>{ const s=steps[si]; verify.disabled=true; if(s.trap){ status.textContent='該当する画像がありません。'; await sleep(1100); si++; verify.disabled=false; render(); return; } const got=[...selected].sort((a,b)=>a-b).join(','), need=[...(s.c||[])].sort((a,b)=>a-b).join(','); if(got!==need){ status.textContent='選択内容を確認してください。'; verify.disabled=false; return; } if(s.final){ complete('001'); store('ls_logged_in','true'); store('ls_session_identity','kuga_akira'); challenge.classList.add('hidden'); completeView.classList.remove('hidden'); await sleep(7000); routeHome('久我あきら'); return; } si++; verify.disabled=false; render(); });
render();

})();
