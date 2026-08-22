(()=>{
'use strict';

const lastLine=document.querySelector('#lastLine');
const paidEntry=document.querySelector('#paidEntry');
const paidButton=document.querySelector('#paidButton');

let revealed=false;

function markFreeComplete(){
  try{
    localStorage.setItem('ls_case_014_complete','true');
    localStorage.setItem('ls_free_complete','true');
  }catch(e){}
}

function revealPaidEntry(){
  if(revealed) return;
  revealed=true;
  markFreeComplete();
  paidEntry.classList.remove('hidden');
}

const observer=new IntersectionObserver((entries)=>{
  for(const entry of entries){
    if(entry.target===lastLine && entry.isIntersecting && entry.intersectionRatio>=0.75){
      revealPaidEntry();
      observer.disconnect();
      break;
    }
  }
},{threshold:[0.75]});

observer.observe(lastLine);

paidButton.addEventListener('click',()=>{
  markFreeComplete();
});
})();