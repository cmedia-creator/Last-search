(()=>{
const input=document.getElementById("input"),sug=document.getElementById("suggestions"),msg=document.getElementById("message"),search=document.getElementById("search"),final=document.getElementById("final"),finish=document.getElementById("finish");
let phase=0, timer=null;
function list(arr){sug.innerHTML="";arr.forEach(x=>{const d=document.createElement("div");d.className="suggestion";d.textContent=x;sug.appendChild(d)})}
list(["おごたか","おごたかとは","おごたか　意味"]);
input.addEventListener("input",()=>{
 clearTimeout(timer); phase++;
 if(phase===1) list(["それではありません"]);
 else if(phase===2) list(["違います"]);
 else if(phase===3) list(["消してください"]);
 else list(["検索しなくても分かります"]);
 timer=setTimeout(takeOver,900);
});
search.onclick=takeOver;
function takeOver(){
 if(final.classList.contains("hidden")===false)return;
 input.disabled=true;search.disabled=true;input.value="";sug.innerHTML="";msg.textContent="";
 final.classList.remove("hidden");
 setTimeout(()=>document.getElementById("f2").classList.remove("hidden"),1800);
 setTimeout(()=>document.getElementById("f3").classList.remove("hidden"),3800);
 setTimeout(()=>{document.getElementById("f4").classList.remove("hidden");localStorage.setItem("ls_searcher_is_target","true")},5800);
 setTimeout(()=>finish.classList.remove("hidden"),7600);
}
finish.onclick=()=>{localStorage.setItem("ls_case_015_complete","true");localStorage.setItem("ls_observation_active","true");location.href="../../index.html?observed=1"};
})();