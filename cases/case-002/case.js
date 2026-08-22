(()=>{
'use strict';
const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const sleep=(ms)=>new Promise(r=>setTimeout(r,ms));
const store=(k,v)=>{try{localStorage.setItem(k,String(v))}catch{}};
const routeHome=()=>location.assign('../../index.html');
const opened=new Set();
const querySection=$('#querySection');
const input=$('#queryInput');
const button=$('#searchBtn');
const hint=$('#queryHint');
const log=$('#trackingLog');
const loggedQuery=$('#loggedQuery');
const loggedTime=$('#loggedTime');
const targetState=$('#targetState');
let possessionStarted=false;
let userEnabled=false;
let submitted=false;

function maybeRevealSearch(){
  if(opened.size<2 || !querySection.classList.contains('hidden')) return;
  querySection.classList.remove('hidden');
  setTimeout(()=>querySection.scrollIntoView({behavior:'smooth',block:'center'}),250);
}

$$('.documentCard').forEach(details=>{
  details.addEventListener('toggle',()=>{
    if(!details.open) return;
    opened.add(details.dataset.doc);
    if(details.dataset.doc==='2'){
      setTimeout(()=>$('#oddPost')?.scrollIntoView({behavior:'smooth',block:'center'}),280);
    }
    maybeRevealSearch();
  });
});

async function typeForced(text, speed=105){
  input.value='';
  for(const ch of text){
    input.value+=ch;
    await sleep(speed);
  }
}

async function startPossession(){
  if(possessionStarted) return;
  possessionStarted=true;
  userEnabled=false;
  button.disabled=true;
  input.readOnly=true;
  input.classList.add('locked');
  hint.textContent='';

  await typeForced('実体',180);
  await sleep(1000);
  await typeForced('実体とはなんですか',115);
  await sleep(1350);
  input.value='';
  await sleep(650);
  await typeForced('見えていますか',125);
  await sleep(1050);
  input.value='';
  input.readOnly=false;
  input.classList.remove('locked');
  userEnabled=true;
  button.disabled=false;
  hint.textContent='返答を入力してください。';
  input.focus();
}

input.addEventListener('focus',startPossession,{once:true});

function currentTime(){
  const d=new Date();
  return `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}:${String(d.getSeconds()).padStart(2,'0')}`;
}

async function submitQuery(){
  if(!userEnabled || submitted) return;
  const q=input.value.trim();
  if(!q){ hint.textContent='何か入力してください。'; return; }
  submitted=true;
  userEnabled=false;
  input.readOnly=true;
  button.disabled=true;
  loggedQuery.textContent=q;
  loggedTime.textContent=currentTime();
  log.classList.remove('hidden');
  // The trace result is the core reveal. Keep it immediately visible even on mobile.
  requestAnimationFrame(()=>{
    const r=log.getBoundingClientRect();
    const vh=window.innerHeight || document.documentElement.clientHeight;
    if(r.bottom>vh-12 || r.top<8){
      log.scrollIntoView({behavior:'smooth',block:'nearest'});
    }
  });
  hint.textContent='判定中……';
  store('ls_case_002_user_query',q);
  await sleep(3000);
  targetState.textContent='最重要人物';
  targetState.closest('.logRow').classList.add('changed');
  hint.textContent='';
  await sleep(900);
  input.value='';
  await typeForced('見つけました',135);
  input.classList.add('found');
  store('ls_case_002_complete','true');
  store('ls_tracking_status','highest_priority');
  await sleep(2400);
  routeHome();
}
button.addEventListener('click',submitQuery);
input.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();submitQuery();}});
})();
