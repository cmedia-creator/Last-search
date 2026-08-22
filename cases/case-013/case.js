(()=>{
'use strict';
const $=(s,root=document)=>root.querySelector(s);
const store=(k,v)=>{try{localStorage.setItem(k,typeof v==='string'?v:JSON.stringify(v))}catch{}};
const complete=(id)=>store(`ls_case_${id}_complete`,'true');
const routeHome=(prefill='')=>{
  if(prefill){store('ls_next_query',prefill);store('ls_last_query',prefill);}
  const q=prefill?`?prefill=${encodeURIComponent(prefill)}`:'';
  window.location.assign('../../index.html'+q);
};

const records=[
  {label:'電車内広告', origin:'車内デジタル広告設備', img:'./img/train.webp', alt:'電車内広告に表示された「探してください」'},
  {label:'駅の電光掲示板', origin:'駅構内案内表示設備', img:'./img/station.webp', alt:'駅の電光掲示板に表示された「探してください」'},
  {label:'家電量販店のテレビ', origin:'店頭展示テレビ群', img:'./img/electronics.webp', alt:'家電量販店のテレビに表示された「探してください」'},
  {label:'店舗サイネージ', origin:'店舗入口デジタルサイネージ', img:'./img/store.webp', alt:'店舗サイネージに表示された「探してください」'},
  {label:'スマートフォン通知', origin:'個人端末通知画面', img:'./img/phone.webp', alt:'スマートフォンに届いた「探してください」という通知'},
  {label:'街頭ビジョン', origin:'街頭大型映像設備', img:'./img/city.webp', alt:'街頭ビジョンに表示された「探してください」'}
];

let index=0;
const image=$('#evidenceImage');
const source=$('#source');
const origin=$('#origin');
const counter=$('#counter');
const next=$('#next');
const finalNote=$('#finalNote');

function render(){
  const r=records[index];
  image.src=r.img;
  image.alt=r.alt;
  source.textContent=r.label;
  origin.textContent=r.origin;
  counter.textContent=`記録 ${index+1} / ${records.length}`;
  finalNote.classList.toggle('hidden',index!==records.length-1);
  next.textContent=index===records.length-1?'終了':'別の記録を見る';
}

next.addEventListener('click',()=>{
  if(index<records.length-1){
    index++;
    render();
    window.scrollTo({top:0,behavior:'smooth'});
    return;
  }
  complete('013');
  routeHome('空白');
});

$('#home').addEventListener('click',()=>{
  complete('013');
  routeHome('空白');
});

render();
})();
