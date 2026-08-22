(()=>{
'use strict';

const $=(s)=>document.querySelector(s);
const sleep=(ms)=>new Promise(r=>setTimeout(r,ms));

const board=$('#board');
const form=$('#chatForm');
const input=$('#chatInput');
const sendBtn=$('#sendBtn');
const inputState=$('#inputState');

let phase='boot';
let locked=false;
let attemptLockArmed=false;

function saveComplete(){
  try{localStorage.setItem('ls_case_012_complete','true');}catch(e){}
}

function goTop(){
  location.assign('../../index.html');
}

function scrollBottom(){
  requestAnimationFrame(()=>{
    window.scrollTo({top:document.documentElement.scrollHeight,behavior:'smooth'});
  });
}

function addSystem(text,cls=''){
  const div=document.createElement('div');
  div.className='system-line '+cls;
  div.textContent=text;
  board.appendChild(div);
  scrollBottom();
  return div;
}

function addPost(user,text,type='ogotaka'){
  const article=document.createElement('article');
  article.className=`post ${type}`;

  const head=document.createElement('div');
  head.className='post-head';

  const key=document.createElement('span');
  key.className='key';
  key.textContent='ユーザー：';

  const name=document.createElement('span');
  name.className=`user ${type==='ogotaka'?'ogotaka':''}`;
  name.textContent=user;

  head.append(key,name);

  const body=document.createElement('div');
  body.className='post-body';
  body.textContent=text;

  article.append(head,body);
  board.appendChild(article);
  scrollBottom();
  return article;
}

function enableInput(state='コメントを入力してください'){
  locked=false;
  input.disabled=false;
  sendBtn.disabled=false;
  inputState.classList.remove('locked');
  inputState.textContent=state;
  setTimeout(()=>input.focus(),150);
}

function disableInput(state='入力はロックされています'){
  locked=true;
  input.disabled=true;
  sendBtn.disabled=true;
  inputState.classList.add('locked');
  inputState.textContent=state;
}

function isJukai(text){
  const v=(text||'').replace(/\s+/g,'').toLowerCase();
  const keys=[
    '樹海',
    '青木ヶ原',
    '青木ヶ原樹海',
    '富士樹海',
    '富士の樹海',
    'aokigahara',
    'jukai'
  ];
  return keys.some(k=>v.includes(k.toLowerCase()));
}

async function boot(){
  disableInput('接続中');

  await sleep(950);
  addSystem('おごたかが入室しました。');

  await sleep(900);
  addPost('おごたか','見つけましたか');

  await sleep(350);
  phase='first_reply';
  enableInput();
}

async function afterFirstReply(){
  disableInput('返信を受信しています');

  await sleep(850);
  addPost('おごたか','あなたに情報提供をしました。そして、あなたも望んでいました。');

  await sleep(1250);
  addPost('おごたか','見つけることはできましたね？');

  await sleep(350);
  phase='lock_attempt';
  attemptLockArmed=true;

  // 見た目上は一度だけ入力できそうにする。
  enableInput('コメントを入力してください');
}

async function triggerAnswerCheck(){
  if(!attemptLockArmed) return;
  attemptLockArmed=false;

  disableInput('入力欄がロックされました');
  input.value='';

  await sleep(900);
  addPost('おごたか','答え合わせをします。どこにいましたか？');

  await sleep(450);
  phase='answer';
  enableInput('場所を入力してください');
}

async function handleAnswer(text){
  disableInput('判定中');

  await sleep(850);

  if(isJukai(text)){
    addPost('おごたか','たどり着きましたね');

    await sleep(1600);
    saveComplete();
    goTop();
    return;
  }

  addPost('おごたか','そこにはいません。探してください。');

  await sleep(1200);
  addSystem('おごたかが退出しました。','leave');

  await sleep(2300);
  saveComplete();
  goTop();
}

form.addEventListener('submit',(e)=>{
  e.preventDefault();
  if(locked) return;

  const text=input.value.trim();
  if(!text) return;

  if(phase==='first_reply'){
    addPost('あなた',text,'you');
    input.value='';
    phase='waiting';
    afterFirstReply();
    return;
  }

  if(phase==='lock_attempt'){
    // 返答内容は採用しない。
    // 入力しようとした瞬間にロックされる演出。
    return;
  }

  if(phase==='answer'){
    addPost('あなた',text,'you');
    input.value='';
    phase='judging';
    handleAnswer(text);
  }
});

// 「見つけることはできましたね？」後は、入力欄へ触れた瞬間にロック。
input.addEventListener('focus',()=>{
  if(phase==='lock_attempt' && attemptLockArmed){
    triggerAnswerCheck();
  }
});

input.addEventListener('beforeinput',(e)=>{
  if(phase==='lock_attempt' && attemptLockArmed){
    e.preventDefault();
    triggerAnswerCheck();
  }
});

input.addEventListener('keydown',(e)=>{
  if(phase==='lock_attempt' && attemptLockArmed){
    e.preventDefault();
    triggerAnswerCheck();
  }
});

boot().catch(()=>{
  saveComplete();
  goTop();
});
})();