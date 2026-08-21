(() => {
"use strict";
const points=document.getElementById("points"),count=document.getElementById("count"),
message=document.getElementById("message"),searchStage=document.getElementById("searchStage"),
searchRows=document.getElementById("searchRows"),oneResult=document.getElementById("oneResult"),
openResult=document.getElementById("openResult"),finalMessage=document.getElementById("finalMessage"),
finish=document.getElementById("finish"),ending=document.getElementById("ending"),
end1=document.getElementById("end1"),end2=document.getElementById("end2"),end3=document.getElementById("end3");

const dots=[];
for(let i=0;i<31;i++){
 const d=document.createElement("div");
 d.className="dot"+(i===30?" kuga":"");
 d.style.left=(8+((i*17)%84))+"%";
 d.style.top=(10+((i*29)%78))+"%";
 points.appendChild(d); dots.push(d);
}

setTimeout(()=>{
 message.textContent="全員が同じ方向へ移動しています。";
 dots.forEach((d,i)=>{
   const angle=(i/31)*Math.PI*2;
   const radius=5+(i%5)*1.5;
   d.style.left=(50+Math.cos(angle)*radius)+"%";
   d.style.top=(50+Math.sin(angle)*radius)+"%";
 });
},1700);

setTimeout(()=>{
 message.textContent="位置情報が順番に途切れています。";
 let i=0;
 const timer=setInterval(()=>{
   if(i>=30){clearInterval(timer);setTimeout(removeKuga,900);return}
   dots[i].classList.add("gone");
   count.textContent=30-i;
   i++;
 },150);
},5700);

function removeKuga(){
 message.textContent="最後の1名を確認しています。";
 setTimeout(()=>{
   dots[30].classList.add("gone");
   count.textContent="0";
   message.textContent="";
   localStorage.setItem("ls_all_31_locations_lost","true");
   setTimeout(showSearch,1400);
 },1500);
}

function addSearch(q){
 const row=document.createElement("div");row.className="search-row";
 row.innerHTML="<span></span><span>0件</span>";
 row.firstChild.textContent=q;
 searchRows.appendChild(row);
}

function showSearch(){
 document.querySelector(".map").style.display="none";
 document.querySelector(".count-box").style.display="none";
 searchStage.hidden=false;
 const qs=["久我あきら","小形高　一家","失踪者31名","見つからない場所"];
 qs.forEach((q,i)=>setTimeout(()=>addSearch(q),i*900));
 setTimeout(()=>{
   message.textContent="検索結果はありません。";
 },3800);
 setTimeout(()=>{
   oneResult.hidden=false;
   message.textContent="";
   openResult.hidden=false;
 },6100);
}

openResult.onclick=()=>{
 openResult.hidden=true;
 oneResult.hidden=true;
 searchStage.hidden=true;
 finalMessage.hidden=false;
 localStorage.setItem("ls_final_message_seen","true");
 setTimeout(()=>finish.hidden=false,2600);
};

finish.onclick=()=>{
 localStorage.setItem("ls_case_012_complete","true");
 localStorage.setItem("ls_free_ending_complete","true");
 ending.hidden=false;
 setTimeout(()=>{end1.textContent="";end2.hidden=false},2200);
 setTimeout(()=>end3.hidden=false,4300);
};
})();