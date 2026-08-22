
(()=>{
'use strict';
const $=(s,r=document)=>r.querySelector(s);
const sleep=(ms)=>new Promise(r=>setTimeout(r,ms));
const store=(k,v)=>{try{localStorage.setItem(k, typeof v==='string'?v:JSON.stringify(v));}catch{}}
const complete=(id)=>store(`ls_case_${id}_complete`,'true');
const routeHome=(prefill='')=>{ if(prefill){ store('ls_next_query',prefill); store('ls_last_query',prefill);} const q=prefill?`?prefill=${encodeURIComponent(prefill)}`:''; location.assign('../../index.html'+q); };

const articleEnd = $('#articleEnd');
const bottomHint = $('#bottomHint');
const hackOverlay = $('#hackOverlay');
const terminalBody = $('#terminalBody');
const familyFlash = $('#familyFlash');
const choiceWrap = $('#choiceWrap');
const warningWrap = $('#warningWrap');
const countNum = $('#countNum');
const saCard = $('#saCard');
const yesBtn = $('#yesBtn');
const noBtn = $('#noBtn');
let sequenceStarted = false;

function appendLine(text, cls='info'){
  const span = document.createElement('span');
  span.className = `line ${cls}`;
  span.textContent = text;
  terminalBody.appendChild(span);
  terminalBody.scrollTop = terminalBody.scrollHeight;
}

const io = new IntersectionObserver(async(entries)=>{
  const entry=entries[0];
  if(entry && entry.isIntersecting && !sequenceStarted){
    sequenceStarted = true;
    bottomHint.classList.remove('hidden');
    await sleep(5000);
    bottomHint.classList.add('hidden');
    startHackSequence();
  }
},{threshold:.95});
io.observe(articleEnd);

async function startHackSequence(){
  hackOverlay.classList.remove('hidden');
  appendLine('おごたかが、不正アクセスを試みる。','warn');
  await sleep(1200);
  appendLine('小形高市住民基本台帳 → アクセス開始','info');
  await sleep(900);
  appendLine('小形高市住民基本台帳 → 成功','ok');
  await sleep(650);
  appendLine('小形高市住民基本台帳 → データなし','warn');
  await sleep(900);
  familyFlash.classList.remove('hidden');
  appendLine('画像解析開始','info');
  await sleep(950);
  appendLine('画像解析 → 成功','ok');
  await sleep(850);
  appendLine('警視庁データベース → アクセス開始','info');
  await sleep(900);
  appendLine('警視庁データベース → 24件ヒット','ok');
  await sleep(900);
  appendLine('判定中……','info');
  await sleep(1200);
  appendLine('判定 → 失敗','warn');
  await sleep(650);
  appendLine('鮮明な画像がありません','warn');
  await sleep(700);
  choiceWrap.classList.remove('hidden');
}

async function handleChoice(){
  choiceWrap.classList.add('hidden');
  appendLine('アクセスを検知されました','warn');
  warningWrap.classList.remove('hidden');
  saCard.classList.remove('hidden');
  for(let n=5;n>=1;n--){ countNum.textContent=String(n); await sleep(1000); }
  complete('005');
  routeHome('距離');
}

yesBtn.addEventListener('click', handleChoice);
noBtn.addEventListener('click', handleChoice);
})();
