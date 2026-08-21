(()=>{
const n=document.getElementById("number"),s=document.getElementById("status"),m=document.getElementById("message"),f=document.getElementById("finish");
setTimeout(()=>{n.textContent="人物：1";s.textContent="1名を確認しました。"},1800);
setTimeout(()=>{n.textContent="人物：2";s.textContent="再確認しています。"},3900);
setTimeout(()=>{m.textContent="1名が画面を見ています。"},5600);
setTimeout(()=>{m.classList.add("alert");m.textContent="1名があなたを見ています。";localStorage.setItem("ls_second_observer_seen","true")},7600);
setTimeout(()=>{n.textContent="人物：1";s.textContent="確認を終了しました。";m.textContent="";m.classList.remove("alert")},10000);
setTimeout(()=>f.classList.remove("hidden"),11500);
f.onclick=()=>{localStorage.setItem("ls_case_014_complete","true");localStorage.setItem("ls_observation_active","true");location.href="../../index.html?observed=1"};
})();