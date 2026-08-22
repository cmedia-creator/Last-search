(()=>{
'use strict';
const $=(s,root=document)=>root.querySelector(s);
const $$=(s,root=document)=>Array.from(root.querySelectorAll(s));
const sleep=(ms)=>new Promise(r=>setTimeout(r,ms));
const store=(k,v)=>{try{localStorage.setItem(k,String(v))}catch{}};
const routeHome=(prefill='久我あきら')=>{
  if(prefill){store('ls_next_query',prefill);store('ls_last_query',prefill);}
  const q=prefill?`?prefill=${encodeURIComponent(prefill)}`:'';
  location.assign('../../index.html'+q);
};

const opened=new Set();
const clock=$('#clock');
const syncNotice=$('#syncNotice');
const syncText=$('#syncText');
const back=$('#back');
const deathOverlay=$('#deathOverlay');
let deathStarted=false;

function updateClock(){
  if(opened.size===0) clock.textContent='00:27';
  else if(opened.size===1) clock.textContent='00:28';
  else {
    clock.textContent='00:28';
    syncNotice.hidden=false;
    syncText.textContent='閲覧済み資料を照合しています。';
  }
}

$$('.documentCard').forEach(details=>{
  details.addEventListener('toggle',()=>{
    if(!details.open) return;
    opened.add(details.dataset.doc);
    updateClock();

    if(details.dataset.doc==='2'){
      setTimeout(()=>{
        const odd=$('#oddPost');
        if(odd) odd.scrollIntoView({behavior:'smooth',block:'center'});
      },300);
    }
  });
});

async function triggerDeath(){
  if(deathStarted) return;

  if(opened.size<2){
    const firstClosed=$$('.documentCard').find(d=>!d.open);
    if(firstClosed){
      firstClosed.open=true;
      firstClosed.scrollIntoView({behavior:'smooth',block:'center'});
    }
    return;
  }

  deathStarted=true;
  back.disabled=true;
  syncNotice.hidden=false;
  syncText.textContent='閲覧済み資料を照合しています。';
  await sleep(900);
  clock.textContent='00:29';
  deathOverlay.hidden=false;
  store('ls_case_002_complete','true');
  store('ls_kuga_status','00:29');
  store('ls_case_002_docs_opened','true');
  await sleep(7000);
  routeHome('久我あきら');
}

back.addEventListener('click',triggerDeath);
updateClock();
})();
