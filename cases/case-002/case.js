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
const back=$('#back');
const deathOverlay=$('#deathOverlay');
let deathStarted=false;

function updateClock(){
  if(opened.size===0) clock.textContent='00:27';
  if(opened.size===1) clock.textContent='00:28';
  if(opened.size>=2){
    clock.textContent='00:28';
    syncNotice.hidden=false;
  }
}

$$('.docToggle').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const target=$('#'+btn.getAttribute('aria-controls'));
    const expanded=btn.getAttribute('aria-expanded')==='true';
    btn.setAttribute('aria-expanded',String(!expanded));
    target.hidden=expanded;
    if(!expanded){
      const card=btn.closest('.documentCard');
      opened.add(card.dataset.doc);
      updateClock();
      if(card.dataset.doc==='2'){
        setTimeout(()=>{
          const odd=$('.odd');
          if(odd && !expanded) odd.scrollIntoView({behavior:'smooth',block:'center'});
        },250);
      }
    }
  });
});

async function triggerDeath(){
  if(deathStarted) return;
  deathStarted=true;
  back.disabled=true;
  if(opened.size<2){
    // 未閲覧でも戻れるが、まず資料を開かせる
    back.disabled=false;
    const firstClosed=$$('.docToggle').find(b=>b.getAttribute('aria-expanded')!=='true');
    if(firstClosed){
      firstClosed.animate([{transform:'translateX(0)'},{transform:'translateX(-4px)'},{transform:'translateX(4px)'},{transform:'translateX(0)'}],{duration:320});
    }
    return;
  }
  syncNotice.hidden=false;
  syncNotice.textContent='閲覧済み資料を照合しています。';
  await sleep(800);
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
