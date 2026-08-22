(()=>{
'use strict';
const $=(s,r=document)=>r.querySelector(s);
const sleep=(ms)=>new Promise(r=>setTimeout(r,ms));
const store=(k,v)=>{try{localStorage.setItem(k,typeof v==='string'?v:JSON.stringify(v));}catch{}};
const complete=(id)=>store(`ls_case_${id}_complete`,'true');
const routeHome=(prefill='')=>{if(prefill){store('ls_next_query',prefill);store('ls_last_query',prefill);}const q=prefill?`?prefill=${encodeURIComponent(prefill)}`:'';location.assign('../../index.html'+q);};

const articleEnd=$('#articleEnd');
const bottomHint=$('#bottomHint');
const hackOverlay=$('#hackOverlay');
const terminalPanel=$('.terminal-panel');
const terminalBody=$('#terminalBody');
const familyFlash=$('#familyFlash');
const choiceWrap=$('#choiceWrap');
const warningWrap=$('#warningWrap');
const countNum=$('#countNum');
const saCard=$('#saCard');
const yesBtn=$('#yesBtn');
const noBtn=$('#noBtn');
let sequenceStarted=false;
let choiceLocked=false;

function appendLine(text,cls='info'){
  const span=document.createElement('span');
  span.className=`line ${cls}`;
  span.textContent=text;
  terminalBody.appendChild(span);
  terminalBody.scrollTop=terminalBody.scrollHeight;
}
function showAndFocus(el){
  el.classList.remove('hidden');
  requestAnimationFrame(()=>el.scrollIntoView({behavior:'smooth',block:'center'}));
}

const io=new IntersectionObserver(async(entries)=>{
  const entry=entries[0];
  if(entry&&entry.isIntersecting&&!sequenceStarted){
    sequenceStarted=true;
    bottomHint.classList.remove('hidden');
    await sleep(5000);
    bottomHint.classList.add('hidden');
    await startHackSequence();
  }
},{threshold:.75});
io.observe(articleEnd);

async function startHackSequence(){
  hackOverlay.classList.remove('hidden');
  appendLine('おごたかが、不正アクセスを試みる。','warn');
  await sleep(900);

  appendLine('小形高市住民基本台帳 → アクセス開始','info');
  await sleep(800);
  appendLine('小形高市住民基本台帳 → 成功','ok');
  await sleep(650);
  appendLine('小形高市住民基本台帳 → データなし','warn');
  await sleep(750);

  // 2. 家族写真を急に表示
  showAndFocus(familyFlash);
  await sleep(700);

  // 3. 画像解析開始 → 成功
  appendLine('画像解析開始','info');
  await sleep(1000);
  appendLine('画像解析 → 成功','ok');
  await sleep(950);

  // 写真は解析後に閉じ、次の選択肢が画面外に押し出されないようにする
  familyFlash.classList.add('hidden');

  // 4. 警視庁データベース → 24件ヒット
  appendLine('警視庁データベース → アクセス開始','info');
  await sleep(900);
  appendLine('警視庁データベース → 24件ヒット','ok');
  await sleep(900);

  // 5. 判定中 → 失敗 → 鮮明な画像がありません
  appendLine('判定中……','info');
  await sleep(1200);
  appendLine('判定 → 失敗','warn');
  await sleep(650);
  appendLine('鮮明な画像がありません','warn');
  await sleep(700);

  // 必ずユーザーの見える範囲に選択肢を出す
  showAndFocus(choiceWrap);
}

async function handleChoice(){
  if(choiceLocked)return;
  choiceLocked=true;
  yesBtn.disabled=true;
  noBtn.disabled=true;
  choiceWrap.classList.add('hidden');

  appendLine('アクセスを検知されました','warn');
  warningWrap.classList.remove('hidden');
  saCard.classList.remove('hidden');
  requestAnimationFrame(()=>saCard.scrollIntoView({behavior:'smooth',block:'center'}));

  for(let n=5;n>=1;n--){
    countNum.textContent=String(n);
    await sleep(1000);
  }
  complete('005');
  routeHome('距離');
}

yesBtn.addEventListener('click',handleChoice);
noBtn.addEventListener('click',handleChoice);
})();
