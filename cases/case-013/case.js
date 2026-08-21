(()=>{
const H=document.getElementById("history"),msg=document.getElementById("message"),all=document.getElementById("deleteAll"),panel=document.getElementById("panel"),ending=document.getElementById("ending"),finish=document.getElementById("finish");
let items=["久我あきら","小形高","2009年9月17日","OGOTAKA","削除済み"], youCount=0, specialOpened=false;
function draw(){
 H.innerHTML="";
 items.forEach((name,i)=>{
  const r=document.createElement("div");r.className="row"+(name==="あなた"?" you":"");
  const s=document.createElement("span");s.textContent=name;
  const b=document.createElement("button");b.textContent="削除";b.onclick=()=>remove(i,name);
  r.append(s,b);H.appendChild(r);
 });
 if(items.length>=3 && items.every(x=>x==="あなた")) all.classList.remove("hidden");
}
function remove(i,name){
 if(name==="削除済み" && !specialOpened){
   specialOpened=true; items.splice(i,1,"あなた"); msg.textContent="削除しました。"; draw(); return;
 }
 if(name==="あなた"){
   items.splice(i,1); draw(); msg.textContent="削除しました。";
   setTimeout(()=>{items.splice(Math.min(i,items.length),0,"あなた");draw();msg.textContent="復元しました。";panel.classList.add("shake");setTimeout(()=>panel.classList.remove("shake"),650)},850);
   return;
 }
 items.splice(i,1); draw(); msg.textContent="削除しました。";
 setTimeout(()=>{items.splice(Math.min(i,items.length),0,"あなた");youCount++;draw();msg.textContent="復元しました。"; if(youCount>=2) all.classList.remove("hidden")},700);
}
all.onclick=()=>{
 H.innerHTML="";all.classList.add("hidden");msg.textContent="";
 setTimeout(()=>ending.classList.remove("hidden"),3000);
 setTimeout(()=>document.getElementById("line2").classList.remove("hidden"),4800);
 setTimeout(()=>{document.getElementById("line3").classList.remove("hidden");localStorage.setItem("ls_observation_target","you")},6500);
 setTimeout(()=>finish.classList.remove("hidden"),8000);
};
finish.onclick=()=>{localStorage.setItem("ls_case_013_complete","true");localStorage.setItem("ls_observation_active","true");location.href="../../index.html?observed=1"};
draw();
})();