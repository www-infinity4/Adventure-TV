(function(){
  "use strict";
  const engine=window.AdventureEngine,catalog=window.ADVENTURE_CATALOG||[];
  const guide=document.querySelector(".guide");
  if(!engine||!guide||!catalog.length)return;
  const shell=document.createElement("details");
  shell.className="week-shell";
  shell.innerHTML='<summary>See the full 7-day Adventure TV guide</summary><div class="week-days"></div>';
  guide.appendChild(shell);
  const style=document.createElement("style");
  style.textContent='.week-shell{margin-top:24px;border:1px solid rgba(255,255,255,.14);border-radius:16px;background:rgba(8,15,9,.8);overflow:hidden}.week-shell>summary{cursor:pointer;list-style:none;padding:16px 18px;color:#d9ff9b;font-weight:900}.week-shell>summary::-webkit-details-marker{display:none}.week-days{padding:0 14px 14px;display:grid;gap:14px}.week-day{border-top:1px solid rgba(255,255,255,.12);padding-top:13px}.week-day h3{margin:0 0 10px;font:700 1.35rem Georgia,serif}.week-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}.week-program{min-height:74px;padding:10px;border:1px solid rgba(255,255,255,.11);border-radius:11px;background:#101611}.week-program time{display:block;color:#f6c56b;font-size:.78rem;font-weight:900}.week-program strong{display:block;margin-top:4px;font-size:.9rem;line-height:1.15}@media(max-width:760px){.week-grid{grid-template-columns:1fr 1fr}}';
  document.head.appendChild(style);
  function formatTime(ms){return new Intl.DateTimeFormat("en-US",{timeZone:engine.TIME_ZONE,hour:"numeric",minute:"2-digit"}).format(new Date(ms));}
  function formatDay(ms){return new Intl.DateTimeFormat("en-US",{timeZone:engine.TIME_ZONE,weekday:"long",month:"short",day:"numeric"}).format(new Date(ms));}
  let rendered=false;
  shell.addEventListener("toggle",()=>{if(!shell.open||rendered)return;rendered=true;const now=new Date();now.setHours(12,0,0,0);const days=[];for(let i=0;i<7;i++){const dayMs=now.getTime()+i*86400000;let schedule=[];try{schedule=engine.createDaySchedule(dayMs,catalog);}catch(_){}if(!schedule.length)continue;days.push(`<section class="week-day"><h3>${formatDay(schedule[0].startsAtMs)}</h3><div class="week-grid">${schedule.map(block=>`<article class="week-program"><time>${formatTime(block.startsAtMs)}</time><strong>${block.movie.title}</strong></article>`).join("")}</div></section>`);}shell.querySelector(".week-days").innerHTML=days.join("");});
})();
