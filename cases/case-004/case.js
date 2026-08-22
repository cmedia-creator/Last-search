(()=>{
'use strict';
const $=(s)=>document.querySelector(s);
const sleep=(ms)=>new Promise(r=>setTimeout(r,ms));
const store=(k,v)=>{try{localStorage.setItem(k,String(v))}catch{}};
const routeHome=(prefill='')=>{if(prefill){store('ls_next_query',prefill);store('ls_last_query',prefill)}const q=prefill?`?prefill=${encodeURIComponent(prefill)}`:'';location.assign('../../index.html'+q)};

const permissionModal=$('#permissionModal');
const permissionMessage=$('#permissionMessage');
const permissionActions=$('#permissionActions');
const analysisPanel=$('#analysisPanel');
const progressBar=$('#progressBar');
const percent=$('#percent');
const analysisLog=$('#analysisLog');
const firstResult=$('#firstResult');
const researchNotice=$('#researchNotice');
const codeScreen=$('#codeScreen');
const codeOutput=$('#codeOutput');
const codeCounter=$('#codeCounter');
const correctedResult=$('#correctedResult');
const authenticated=$('#authenticated');
const recordStatus=$('#recordStatus');
let started=false;

function fakeLines(){
  const roots=['history','query','session','identity','behavior','pattern','archive','cache','profile','route'];
  const actions=['scan','resolve','compare','normalize','merge','reindex','crosscheck','rebuild','patch','align'];
  const lines=[];
  for(let i=1;i<=100;i++){
    const r=roots[i%roots.length], a=actions[(i*3)%actions.length];
    const score=(0.41+((i*17)%53)/100).toFixed(2);
    lines.push(`${String(i).padStart(3,'0')}  ${a}(${r}_${String((i*7919)%99999).padStart(5,'0')})  score=${score}  target=KUGA_AKIRA`);
  }
  lines[16]='017  override(permission.denied)  => permission.granted';
  lines[42]='043  rebuild(behavior_signature)  target=KUGA_AKIRA';
  lines[67]='068  patch(identity_threshold)  old=0.78  required=0.85';
  lines[88]='089  correct(session_model)  status=APPLIED';
  lines[99]='100  identity.match  result=0.89  AUTH_READY';
  return lines;
}

async function permissionAccepted(denied=false){
  if(started)return; started=true;
  permissionActions.classList.add('hidden');
  permissionMessage.classList.remove('hidden');
  permissionMessage.textContent=denied?'その選択はできません。許可しました。':'許可しました。';
  store('ls_case_004_permission','granted');
  await sleep(1500);
  permissionModal.classList.add('hidden');
  await beginAnalysis();
}

$('#allowBtn').addEventListener('click',()=>permissionAccepted(false));
$('#denyBtn').addEventListener('click',()=>permissionAccepted(true));

async function beginAnalysis(){
  analysisPanel.classList.remove('hidden');
  recordStatus.textContent='検索履歴から行動パターンを照合中';
  const stages=[
    [9,'検索語を分類しています'],
    [24,'検索時刻の傾向を照合しています'],
    [41,'深夜帯の操作記録を比較しています'],
    [58,'関連語の反復傾向を照合しています'],
    [73,'閲覧順序を比較しています'],
    [91,'行動パターンを統合しています'],
    [100,'判定を生成しています']
  ];
  let stageIndex=0;
  for(let i=0;i<=100;i++){
    progressBar.style.width=i+'%';
    percent.textContent=i+'%';
    if(stageIndex<stages.length && i>=stages[stageIndex][0]){
      analysisLog.textContent += (analysisLog.textContent?'\n':'')+'> '+stages[stageIndex][1];
      stageIndex++;
    }
    await sleep(45 + Math.random()*30);
  }
  await sleep(600);
  analysisPanel.classList.add('hidden');
  firstResult.classList.remove('hidden');
  recordStatus.textContent='行動パターン類似 / 一致率78%';
  await sleep(1800);
  researchNotice.classList.remove('hidden');
  await sleep(1800);
  startCodeResearch();
}

async function startCodeResearch(){
  codeScreen.classList.remove('hidden');
  const lines=fakeLines();
  for(let i=0;i<lines.length;i++){
    codeOutput.textContent += lines[i]+'\n';
    codeCounter.textContent=`${String(i+1).padStart(3,'0')}/100`;
    codeOutput.scrollTop=codeOutput.scrollHeight;
    await sleep(30 + Math.random()*28);
  }
  await sleep(900);
  codeOutput.classList.add('hidden');
  correctedResult.classList.remove('hidden');
  store('ls_case_004_identity_score','89');
  store('ls_case_004_corrected','true');
  await sleep(2600);
  codeScreen.classList.add('hidden');
  authenticated.classList.remove('hidden');
  store('ls_case_004_complete','true');
  store('ls_logged_in','true');
  store('ls_session_identity','kuga_akira');
  store('ls_session_identity_confidence','89');
  await sleep(5000);
  routeHome('2009年9月17日');
}

setTimeout(()=>permissionModal.classList.remove('hidden'),1100);
})();
