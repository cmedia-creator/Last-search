(()=>{
'use strict';

const $=(s)=>document.querySelector(s);
const $$=(s)=>Array.from(document.querySelectorAll(s));
const sleep=(ms)=>new Promise(r=>setTimeout(r,ms));

const permissionScreen=$('#permissionScreen');
const accessScreen=$('#accessScreen');
const loginScreen=$('#loginScreen');
const recordsScreen=$('#recordsScreen');
const traceScreen=$('#traceScreen');

const promptTitle=$('#promptTitle');
const promptText=$('#promptText');
const choiceRow=$('#choiceRow');
const yesBtn=$('#yesBtn');
const noBtn=$('#noBtn');
const statements=$('#statements');
const statementEls=$$('.statement');
const interveneBtn=$('#interveneBtn');

const accessRain=$('#accessRain');
const systemMessage=$('#systemMessage');

const loginId=$('#loginId');
const loginPass=$('#loginPass');
const loginState=$('#loginState');
const protectMessage=$('#protectMessage');

const blockStatus=$('#blockStatus');
const traceTitle=$('#traceTitle');
const codeField=$('#codeField');

let promptStep=0;
let locked=false;

function setComplete(){
  try{localStorage.setItem('ls_case_008_complete','true');}catch(e){}
}

function goTop(){
  location.assign('../../index.html');
}

function typeInto(input,text,delay=80){
  return new Promise(async resolve=>{
    input.value='';
    for(const ch of text){
      input.value += ch;
      await sleep(delay);
    }
    resolve();
  });
}

function addAccessWord(){
  const span=document.createElement('span');
  span.className='access-word';
  span.textContent='ACCESS';
  span.style.left=Math.floor(Math.random()*92)+'%';
  span.style.top=Math.floor(Math.random()*92)+'%';
  span.style.fontSize=(.6+Math.random()*1.2)+'rem';
  span.style.opacity=(.25+Math.random()*.65).toFixed(2);
  accessRain.appendChild(span);
  setTimeout(()=>span.remove(),1700);
}

async function showStatements(){
  choiceRow.classList.add('hidden');
  promptCard.classList.add('hidden');
  statements.classList.remove('hidden');

  for(const el of statementEls){
    el.classList.remove('hidden');
    await sleep(1150);
  }

  await sleep(750);
  interveneBtn.classList.remove('hidden');
  interveneBtn.focus();
}

async function handleChoice(){
  if(locked) return;
  locked=true;

  if(promptStep===0){
    promptStep=1;
    promptTitle.textContent='怖いですか？';
    promptText.textContent='';
    await sleep(120);
    locked=false;
    return;
  }

  if(promptStep===1){
    promptStep=2;
    await showStatements();
    locked=false;
  }
}

yesBtn.addEventListener('click',handleChoice);
noBtn.addEventListener('click',handleChoice);

interveneBtn.addEventListener('click',()=>{
  if(locked) return;
  locked=true;
  runIntervention().catch(()=>{
    setComplete();
    goTop();
  });
});

async function runIntervention(){
  permissionScreen.classList.add('hidden');
  accessScreen.classList.remove('hidden');
  window.scrollTo({top:0,behavior:'instant'});

  systemMessage.textContent='ACCESS';
  const rainTimer=setInterval(()=>{
    for(let i=0;i<8;i++) addAccessWord();
  },110);

  await sleep(2600);
  systemMessage.textContent='POLICE DATABASE / CONNECTION ESTABLISHED';
  await sleep(1000);

  clearInterval(rainTimer);
  accessScreen.classList.add('hidden');
  loginScreen.classList.remove('hidden');

  await sleep(700);
  loginState.textContent='資格情報を取得しています';
  await typeInto(loginId,'OGT-0917-13',72);
  await sleep(350);
  await typeInto(loginPass,'***************',55);

  await sleep(650);
  loginState.textContent='ログインしました';
  loginState.style.color='#9bc99b';

  await sleep(550);
  protectMessage.classList.remove('hidden');

  await sleep(1650);
  loginScreen.classList.add('hidden');
  recordsScreen.classList.remove('hidden');
  window.scrollTo({top:0,behavior:'instant'});

  blockStatus.textContent='保護処理を開始しています';
  await sleep(1300);
  blockStatus.textContent='アクセスを遮断します';
  await sleep(1100);
  blockStatus.textContent='アクセスを遮断します → 失敗';
  await sleep(1200);
  blockStatus.textContent='逆探知が実行されました';

  await sleep(1400);
  recordsScreen.classList.add('hidden');
  traceScreen.classList.remove('hidden');

  await runTrace();
}

function randomCodeLine(i){
  const hex=()=>Math.floor(Math.random()*0xffffff).toString(16).padStart(6,'0').toUpperCase();
  const ops=['TRACE_ROUTE','RESOLVE_NODE','SCAN_GATE','REVERSE_LOOKUP','MAP_SESSION','IDENTIFY_HOST','ACCESS_VECTOR','HANDSHAKE','PERSIST_LINK','RECURSIVE_SCAN'];
  const op=ops[i%ops.length];
  return `[${String(i).padStart(4,'0')}] ${op} 0x${hex()} :: ${hex()}-${hex()}-${hex()}`;
}

async function runTrace(){
  traceTitle.textContent='逆探知が実行されました';
  codeField.textContent='';

  for(let i=0;i<95;i++){
    codeField.textContent += randomCodeLine(i)+'\n';
    if(i%4===0) await sleep(26);
  }

  await sleep(1300);

  traceTitle.textContent='';
  codeField.classList.add('error-mode');

  const errorLines=[];
  for(let i=0;i<72;i++){
    errorLines.push(`ERROR  ERROR  ERROR  ERROR  ERROR  ERROR  ERROR`);
  }
  codeField.textContent=errorLines.join('\n');

  await sleep(2500);

  setComplete();
  goTop();
}
})();