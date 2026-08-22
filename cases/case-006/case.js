
(()=>{
'use strict';

const $=(s)=>document.querySelector(s);
const sleep=(ms)=>new Promise(r=>setTimeout(r,ms));

const searchForm=$('#searchForm');
const searchInput=$('#searchInput');
const searchStage=$('#searchStage');
const traceStage=$('#traceStage');
const statusText=$('#statusText');
const progressWrap=$('#progressWrap');
const progressFill=$('#progressFill');
const progressNum=$('#progressNum');
const eventLog=$('#eventLog');

const cam1=$('#cam1');
const cam2=$('#cam2');
const cam3=$('#cam3');
const cam4=$('#cam4');
const cam5Error=$('#cam5Error');
const cam5=$('#cam5');

const blackout=$('#blackout');
const blackoutLine=$('#blackoutLine');
const deathText=$('#deathText');

let running=false;

function saveComplete(){
  try{ localStorage.setItem('ls_case_006_complete','true'); }catch(e){}
}

function goTop(){
  location.assign('../../index.html');
}

function isSearchIntent(value){
  const v=(value||'').trim().toLowerCase();
  if(!v) return false;

  const keywords=[
    '探す','探して','探せ','探したい','探そう','探します',
    'さがす','さがして','さがせ',
    '捜す','捜して','捜せ','捜索',
    '検索','追跡','見つける','見つけて','見つけたい','見付ける',
    'find','search','track','locate'
  ];
  return keywords.some(k=>v.includes(k));
}

function addLog(text,cls=''){
  const line=document.createElement('span');
  line.className='log-line '+cls;
  line.textContent=text;
  eventLog.appendChild(line);
}

async function loading(message,duration=1700){
  statusText.textContent=message;
  progressWrap.classList.remove('hidden');
  progressFill.style.width='0%';
  progressNum.textContent='0%';

  const steps=50;
  for(let i=1;i<=steps;i++){
    await sleep(duration/steps);
    const n=Math.min(100,Math.round(i/steps*100));
    progressFill.style.width=n+'%';
    progressNum.textContent=n+'%';
  }
  await sleep(180);
  progressWrap.classList.add('hidden');
}

function reveal(el){
  el.classList.remove('hidden');
  el.scrollIntoView({behavior:'smooth',block:'nearest'});
}

async function setStatus(text,wait=900){
  statusText.textContent=text;
  await sleep(wait);
}

async function runTracking(){
  searchStage.classList.add('hidden');
  traceStage.classList.remove('hidden');
  window.scrollTo({top:0,behavior:'instant'});

  await loading('防犯カメラのデータを追跡します',1800);
  await setStatus('成功',550);
  addLog('防犯カメラ検索：成功','ok');
  reveal(cam1);
  await sleep(1200);

  await loading('ユーザーによる命令を継続します',1700);
  await setStatus('成功',550);
  addLog('命令継続：成功','ok');
  reveal(cam2);
  await sleep(1100);

  await setStatus('関連データを続けて表示します',850);
  reveal(cam3);
  await sleep(450);
  reveal(cam4);
  addLog('関連映像：2件追加','ok');
  await sleep(1250);

  reveal(cam5Error);
  statusText.textContent='画像データを取得できません';
  addLog('SOURCE 05：画像データエラー','fail');
  await sleep(1200);

  await setStatus('アクセスを制限されています',950);
  await setStatus('解析を開始します',950);

  await setStatus('ゲート1通過',650);
  addLog('GATE 01：PASS','ok');
  await setStatus('ゲート2通過',650);
  addLog('GATE 02：PASS','ok');
  await setStatus('ゲート3通過',650);
  addLog('GATE 03：PASS','ok');

  await setStatus('火災報知器へアクセス開始',1200);
  addLog('DEVICE CLASS：FIRE ALARM','');
  await setStatus('ネット接続領域発見',850);
  addLog('NETWORK AREA：FOUND','ok');
  await setStatus('アクセスします',850);
  await setStatus('成功',650);
  addLog('DEVICE ACCESS：SUCCESS','ok');
  await setStatus('表示します',700);

  cam5Error.classList.add('hidden');
  reveal(cam5);
  statusText.textContent='追跡継続中';
  addLog('SOURCE 05：映像復元','ok');

  await sleep(7000);

  blackout.classList.remove('hidden');
  blackoutLine.textContent='追跡可能領域から離脱';
  await sleep(1600);

  blackoutLine.textContent='再検索';
  await sleep(900);
  blackoutLine.textContent='再検索 → 失敗';
  await sleep(1200);

  blackoutLine.textContent='再検索';
  await sleep(900);
  blackoutLine.textContent='再検索 → 失敗';
  await sleep(1400);

  blackoutLine.textContent='追跡を中止します';
  await sleep(1500);

  blackoutLine.textContent='';
  deathText.classList.remove('hidden');
  await sleep(7000);

  saveComplete();
  goTop();
}

searchForm.addEventListener('submit',(e)=>{
  e.preventDefault();
  if(running) return;

  const value=searchInput.value;
  if(!isSearchIntent(value)){
    goTop();
    return;
  }

  running=true;
  searchInput.blur();
  runTracking().catch(()=>{
    // 演出途中で例外が起きてもプレイ不能にしない
    saveComplete();
    goTop();
  });
});

searchInput.focus();
})();
