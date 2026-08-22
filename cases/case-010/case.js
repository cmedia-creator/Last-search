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
  ['1','家庭用回線'],['12','国内クラウド'],['138','企業ネットワーク'],['2048','国外サーバー'],['65535','家庭用ルーター / 監視装置 / IoT'],['∞','単一の接続元が存在しません']
]; let i=0; const src=$('#sources');
function render(){ const row=document.createElement('div'); row.className='card'; row.innerHTML=`<h3>${seq[i][0]}</h3><p>${seq[i][1]}</p>`; src.appendChild(row); $('#count').textContent=seq[i][0]; $('#bar').style.width = `${Math.min((i+1)*18,100)}%`; }
$('#trace').addEventListener('click',()=>{ if(i<seq.length-1){ render(); i++; if(i===seq.length-1) $('#trace').textContent='終了'; } else { complete('010'); routeHome('見つけましたか'); } });
$('#home').addEventListener('click',()=>routeHome('見つけましたか'));
render(); i++;

})();
