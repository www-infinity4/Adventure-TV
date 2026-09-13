(function(){
  "use strict";
  const channels=[
    ["Adventure TV","Adventure-TV"],["Discovery","Discovery"],["History Channel","History-Channel"],["CNN","CNN"],["FSN","FSN"],["TBS","TBS"],["BET","BET"],["Nickelodeon","Nickelodeon"],["Nintendo TV","Nintendo-TV"],["Ozzy TV","Ozzy-TV"],["MTV","MTV"],["VH1","VH1"],["Physics TV","Physics-TV"],["Motor TV","Motor-TV"],["CCR TV","CCR-TV"],["Trigger TV","Trigger-TV"],["Chiller","Chiller"],["Disney Vintage","Disney"],["Cartoon Network","Cartoon-Network"],["WGN","WGN"],["NBC","NBC"],["FOX","FOX"],["PBS","PBS"],["TNT","TNT"],["HBO","HBO"],["Cinemax","Cinemax"],["Showtime","Showtime"],["Starz","Starz"],["Encore","Encore"],["Hermit TV","Hermit-TV"],["Star Launcher","Star-Launcher"],["Trump TV","Trump-TV"],["ShopLC","ShopLC"],["StarQuest","TV-Database"],["Astraflix","Astraflix"],["Syncord","Syncord"],["Vintech","Vintech"],["Flix Blender","Flix-Blender"],["Animasync","Animasync"]
  ].map(([name,slug])=>({name,slug,url:`https://www-infinity4.github.io/${slug}/`}));
  function currentSlug(){return location.pathname.split("/").filter(Boolean)[0]||"";}
  function esc(value){return String(value).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
  function html(){const active=currentSlug().toLowerCase();return channels.map(channel=>`<a${channel.slug.toLowerCase()===active?' aria-current="page"':''} href="${channel.url}">${esc(channel.name)}</a>`).join("");}
  document.querySelectorAll(".channel-menu nav,.channel-directory nav").forEach(nav=>nav.innerHTML=html());
  document.addEventListener("click",event=>{const details=document.querySelector(".channel-menu[open]");if(details&&!details.contains(event.target))details.removeAttribute("open");});
  window.ADVENTURE_CHANNELS=channels;
})();
