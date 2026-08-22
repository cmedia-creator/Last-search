(()=>{
'use strict';

const lastPost=document.querySelector('#lastPost');
const exitNotice=document.querySelector('#exitNotice');

let armed=false;
let timer=null;

function complete(){
  try{
    localStorage.setItem('ls_case_013_complete','true');
  }catch(e){}
}

function goTop(){
  location.assign('../../index.html');
}

function armExit(){
  if(armed) return;
  armed=true;

  // 最後まで見たことが分かるよう、7秒の最後だけ小さく通知
  timer=setTimeout(()=>{
    exitNotice.classList.remove('hidden');
  },5500);

  setTimeout(()=>{
    complete();
    goTop();
  },7000);
}

const observer=new IntersectionObserver((entries)=>{
  for(const entry of entries){
    if(entry.target===lastPost && entry.isIntersecting && entry.intersectionRatio>=0.62){
      armExit();
      observer.disconnect();
      break;
    }
  }
},{
  threshold:[0.62]
});

observer.observe(lastPost);

window.addEventListener('pagehide',()=>{
  if(timer) clearTimeout(timer);
});
})();