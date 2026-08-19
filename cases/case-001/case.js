const IMG='./img/';
const promptEl=document.getElementById('prompt');
const gridEl=document.getElementById('grid');
const statusEl=document.getElementById('status');
const appEl=document.getElementById('app');
const challengeEl=document.getElementById('challenge');
const resetBtn=document.getElementById('resetBtn');
const verifyBtn=document.getElementById('verifyBtn');
const actionsEl=document.getElementById('actions');
const finishEl=document.getElementById('finish');
const headText=document.getElementById('headText');

const N=[1,2,3,4,5,6,7,8,9].map(n=>`noise-${String(n).padStart(2,'0')}.webp`);
const S=[1,2,3,4].map(n=>`signal-${String(n).padStart(2,'0')}.webp`);
const B=[1,2,3,4].map(n=>`bike-${String(n).padStart(2,'0')}.webp`);
const H=[1,2,3].map(n=>`house-${String(n).padStart(2,'0')}.webp`);
const F=[1,2,3,4].map(n=>`family-${String(n).padStart(2,'0')}.webp`);
const K=[1,2,3,4,5,6,7,8,9].map(n=>`kuga-${String(n).padStart(2,'0')}.webp`);

const steps=[
  {prompt:'信号機が写っている画像をすべて選択してください', images:[S[0],N[0],S[1],N[1],N[2],S[2],N[3],S[3],N[4]], correct:[0,2,5,7]},
  {prompt:'自転車が写っている画像をすべて選択してください', images:[N[5],B[0],N[0],B[1],N[1],N[2],B[2],N[3],B[3]], correct:[1,3,6,8]},
  {prompt:'家が写っている画像をすべて選択してください', images:[N[4],H[0],N[5],N[6],H[1],N[7],H[2],N[8],N[0]], correct:[1,4,6]},
  {prompt:'家族が写っている画像をすべて選択してください', images:[F[0],N[1],F[1],N[2],F[2],N[3],N[4],F[3],N[5]], correct:[0,2,4,7]},
  {prompt:'針が写っている画像を選択してください', images:[N[6],N[7],'needle-01.webp',N[8],N[0],N[1],N[2],N[3],N[4]], correct:[2]},
  {prompt:'糸が写っている画像を選択してください', images:[N[5],N[6],N[7],N[8],'thread-01.webp',N[0],N[1],N[2],N[3]], correct:[4]},
  {prompt:'久我あきらが写っている画像をすべて選択してください', images:[S[0],B[0],H[0],F[0],'needle-01.webp','thread-01.webp',N[0],N[2],N[4]], correct:[], trap:true},
  {prompt:'久我あきらが写っている画像をすべて選択してください', images:K, correct:[0,1,2,3,4,5,6,7,8], final:true}
];

let stepIndex=0;
let selected=new Set();
let trapTriggered=false;

function render(){
  const step=steps[stepIndex];
  promptEl.textContent=step.prompt;
  gridEl.innerHTML='';
  statusEl.textContent='';
  selected.clear();
  step.images.forEach((src,i)=>{
    const btn=document.createElement('button');
    btn.type='button';
    btn.className='tile';
    btn.setAttribute('aria-label',`画像 ${i+1}`);
    const img=document.createElement('img');
    img.src=IMG+src;
    img.alt='';
    btn.appendChild(img);
    btn.addEventListener('click',()=>{
      if(selected.has(i)){selected.delete(i);btn.classList.remove('selected')}
      else{selected.add(i);btn.classList.add('selected')}
    });
    gridEl.appendChild(btn);
  });
  challengeEl.classList.remove('fade');
  void challengeEl.offsetWidth;
  challengeEl.classList.add('fade');
}
function sameSet(){
  const correct=steps[stepIndex].correct;
  return selected.size===correct.length && correct.every(i=>selected.has(i));
}
function glitch(){
  appEl.classList.add('glitch');
  setTimeout(()=>appEl.classList.remove('glitch'),650);
}
function verify(){
  const step=steps[stepIndex];
  if(step.trap && !trapTriggered){
    statusEl.textContent='不正解です。もう一度お試しください。';
    trapTriggered=true;
    glitch();
    setTimeout(()=>{stepIndex++;render()},1050);
    return;
  }
  if(!sameSet()){
    statusEl.textContent='不正解です。もう一度お試しください。';
    glitch();
    return;
  }
  if(step.final){finish();return;}
  stepIndex++;
  render();
}
function finish(){
  LSStorage.markCase('001');
  challengeEl.style.display='none';
  statusEl.textContent='';
  actionsEl.style.display='none';
  headText.textContent='認証情報を保存しています。';
  finishEl.style.display='block';
  glitch();
  setTimeout(()=>location.href='../../index.html?from=case001',1800);
}
verifyBtn.addEventListener('click',verify);
resetBtn.addEventListener('click',render);
render();
