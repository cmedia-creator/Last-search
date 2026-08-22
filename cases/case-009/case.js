(()=>{
'use strict';

const $=(s)=>document.querySelector(s);
const sleep=(ms)=>new Promise(r=>setTimeout(r,ms));
const store=(k,v)=>{try{localStorage.setItem(k,String(v))}catch{}};

function routeHome(prefill='接続元'){
  if(prefill){
    store('ls_next_query',prefill);
    store('ls_last_query',prefill);
  }
  window.location.assign('../../index.html?prefill='+encodeURIComponent(prefill));
}

const records=[
  {
    img:'./img/family-01.webp',
    count:'4名',
    status:'全員一致',
    missing:'0名',
    note:'同一世帯として登録されています。'
  },
  {
    img:'./img/family-02.webp',
    count:'3名',
    status:'人物 01 を検出できません',
    missing:'1名',
    note:'撮影地点・背景・記録日時の連続性は保たれています。'
  },
  {
    img:'./img/family-03.webp',
    count:'2名',
    status:'人物 01 / 04 を検出できません',
    missing:'2名',
    note:'画像の改変履歴は検出されませんでした。'
  },
  {
    img:'./img/family-04.webp',
    count:'1名',
    status:'人物 01 / 02 / 04 を検出できません',
    missing:'3名',
    note:'同一地点の記録として照合されています。'
  },
  {
    img:'./img/family-05.webp',
    count:'0名',
    status:'登録人物を検出できません',
    missing:'4名',
    note:'背景情報のみ一致しました。'
  }
];

const photo=$('#familyPhoto');
const stamp=$('#photoStamp');
const result=$('#scanResult');
const scan=$('#scan');
const home=$('#home');
const wrap=document.querySelector('.photo-wrap');
const overlay=$('#finalOverlay');

let index=0;
let finished=false;

function render(){
  const r=records[index];
  photo.src=r.img;
  stamp.textContent=`RECORD ${String(index+1).padStart(2,'0')} / 05`;
  result.innerHTML=`
    <div class="kv"><strong>検出人数</strong><span>${r.count}</span></div>
    <div class="kv"><strong>照合状態</strong><span class="${index>0?'value-warn':''}">${r.status}</span></div>
    <div class="kv"><strong>未検出</strong><span>${r.missing}</span></div>
    <div class="kv"><strong>補足</strong><span>${r.note}</span></div>
  `;
}

async function nextRecord(){
  if(finished) return;
  scan.disabled=true;

  if(index < records.length-1){
    wrap.classList.add('loading');
    await sleep(520);
    index++;
    render();
    await sleep(180);
    wrap.classList.remove('loading');
    scan.disabled=false;
    if(index===records.length-1){
      scan.textContent='照合を完了する';
    }
    return;
  }

  finished=true;
  store('ls_case_009_complete','true');
  store('ls_case_009_family_missing','4');
  store('ls_case_009_related_count','5');

  await sleep(450);
  overlay.classList.remove('hidden');
  await sleep(4200);
  routeHome('接続元');
}

scan.addEventListener('click',nextRecord);
home.addEventListener('click',()=>routeHome('接続元'));
render();
})();
