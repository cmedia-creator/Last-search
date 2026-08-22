(()=>{
'use strict';

const $=(s)=>document.querySelector(s);
const sleep=(ms)=>new Promise(r=>setTimeout(r,ms));

const currentTime=$('#currentTime');
const mailView=$('#mailView');
const analysisView=$('#analysisView');
const analysisStatus=$('#analysisStatus');
const progressWrap=$('#progressWrap');
const progressFill=$('#progressFill');
const progressValue=$('#progressValue');
const nodeField=$('#nodeField');
const traceLog=$('#traceLog');
const crash=$('#crash');
const crashCode=$('#crashCode');
const crashTitle=$('#crashTitle');

function jpTime(){
  const parts=new Intl.DateTimeFormat('ja-JP',{
    timeZone:'Asia/Tokyo',
    hour:'2-digit',
    minute:'2-digit',
    hour12:false
  }).formatToParts(new Date());
  const get=t=>parts.find(p=>p.type===t)?.value || '--';
  return `${get('hour')}時${get('minute')}分`;
}

function setComplete(){
  try{localStorage.setItem('ls_case_010_complete','true');}catch(e){}
}

function goTopWithOgotaka(){
  try{
    localStorage.setItem('ls_next_query','OGOTAKA');
    localStorage.setItem('ls_last_query','OGOTAKA');
  }catch(e){}
  location.assign('../../index.html?prefill=OGOTAKA');
}

function addLog(text,cls=''){
  const span=document.createElement('span');
  span.className='trace-line '+cls;
  span.textContent=text;
  traceLog.appendChild(span);
}

function addNodes(count){
  for(let i=0;i<count;i++){
    const n=document.createElement('span');
    n.className='node';
    n.style.left=(2+Math.random()*96)+'%';
    n.style.top=(4+Math.random()*92)+'%';
    n.style.opacity=(.25+Math.random()*.7).toFixed(2);
    nodeField.appendChild(n);
  }
}

async function loading(text,duration=1600){
  analysisStatus.textContent=text;
  progressWrap.classList.remove('hidden');
  progressFill.style.width='0%';
  progressValue.textContent='0%';
  const steps=50;
  for(let i=1;i<=steps;i++){
    await sleep(duration/steps);
    const p=Math.round(i/steps*100);
    progressFill.style.width=p+'%';
    progressValue.textContent=p+'%';
  }
  await sleep(200);
  progressWrap.classList.add('hidden');
}

function codeLine(i){
  const hex=()=>Math.floor(Math.random()*0xffffff).toString(16).padStart(6,'0').toUpperCase();
  const ops=['TRACE','ROUTE','NODE','TOR','RESOLVE','MAP','SCAN','FILTER','HANDSHAKE','RECURSE'];
  return `[${String(i).padStart(4,'0')}] ${ops[i%ops.length]} 0x${hex()} ${hex()}:${Math.floor(Math.random()*65535)}`;
}

async function run(){
  currentTime.textContent=jpTime();

  await sleep(10000);

  mailView.classList.add('hidden');
  analysisView.classList.remove('hidden');
  window.scrollTo({top:0,behavior:'instant'});

  await loading('解析開始',1500);
  addNodes(25);
  addLog('INITIAL TRACE : START','ok');

  await sleep(700);
  analysisStatus.textContent='対象が膨大です';
  addNodes(80);
  addLog('TARGET COUNT : OVER LIMIT','error');
  await sleep(1500);

  await loading('Tor解析',1600);
  addNodes(120);
  addLog('TOR EXIT NODES : ANALYZING');
  await sleep(800);

  await loading('絞り込みます',1400);
  addLog('FILTER PHASE : START');
  await sleep(500);

  analysisStatus.textContent='error';
  addLog('FILTER PHASE : ERROR','error');
  await sleep(1200);

  analysisStatus.textContent='接続元は∞です';
  addLog('SOURCE COUNT : ∞','infinity');

  // この5秒だけ完全に止める
  await sleep(5000);

  crash.classList.remove('hidden');
  let text='';
  for(let i=0;i<95;i++) text += codeLine(i)+'\n';
  crashCode.textContent=text;

  await sleep(700);
  crashTitle.textContent='SERVER CRASH';
  await sleep(2500);

  setComplete();
  goTopWithOgotaka();
}

run().catch(()=>{
  setComplete();
  goTopWithOgotaka();
});
})();