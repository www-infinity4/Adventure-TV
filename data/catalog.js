(function(){
  "use strict";
  const rows=[
    ["Three Hours of Ambient Hiking Footage",3600,"PyQQJWmV1LE","Hiking · World Trails","Kraig Adams"],
    ["12 Days Hiking 100 Miles to K2 Base Camp",2180,"oocupkAp6o8","Hiking · Pakistan","Kraig Adams"],
    ["Hiking the Grand Canyon Tonto Trail",780,"hg6EggpwMYI","Hiking · Grand Canyon","Kraig Adams"],
    ["Hiking 80 Miles on the Dry Stone Route in Mallorca",2200,"pB1rFD-5AnU","Hiking · Mallorca","Kraig Adams"],
    ["Cosy Camping in Rain, Sun and Wind",2400,"cma8iYzFB94","Camping · Australia","Go4x4"],
    ["Small Car Camping — Big Tent, Smart Storage",2100,"shM2xvJyizs","Camping · Australia","Go4x4"],
    ["Solo Car Camping in the Rain",1800,"qvvRZ5ZAj5Q","Camping · Rain Adventure","Go4x4"],
    ["Gold Panning — Start to Finish",720,"pCloOt1YcYw","Gold Prospecting","Dan Hurd Prospecting"],
    ["Gold in an Old Ground Sluice",1200,"s7quOeiExX4","Gold Prospecting · Treasure","Dan Hurd Prospecting"],
    ["Excavator Gold Find",1200,"oA0u_QfcIoE","Gold Mining Adventure","Ask Jeff Williams"],
    ["Colorado Elk and Deer Hunts",1200,"KJaz6j88ukU","Hunting · Colorado","Eastmans Hunting TV / MyOutdoorTV"],
    ["Alaska Brown Bear Adventure",1200,"DpsldIrnxFg","Hunting · Alaska","Eastmans Hunting Journals"],
    ["Expedition X — Adventure Collection",3540,"amQdip9y2zs","Expedition · Exploration","Discovery Channel"],
    ["The Ultimate Mining Challenges",3540,"Zl8l62dpTP4","Mining · Gold","Discovery Channel"],
    ["Parker and Tony Risk Millions",3540,"5MuCrIR3MsY","Gold Mining","Discovery"],
    ["Parker Hits 10,000 Ounces",2400,"hxggQ6YzAkc","Gold Mining","Discovery"]
  ];
  window.ADVENTURE_CATALOG=rows.map(function(row,index){return{id:"ADVENTURE-"+String(index+1).padStart(3,"0"),title:row[0],year:null,collection:row[3],runtimeSeconds:row[1],videoId:row[2],source:row[4],networkChannel:"ADVENTURE TV",contentClass:"Adventure Program",rating:"TV-PG",cleared:true,posterUrl:""};});
  window.ADVENTURE_VAULT=["World Hiking","Camping","Hunting","Treasure Hunting","Gemstones","Gold Prospecting","Silver & Mining","Mountains","Deserts","Forests","Road Adventures","Spectacular Scenery"];
  window.ADVENTURE_CHANNEL={id:"ADVENTURE-TV",sourcePolicy:"Long-form public embeddable creator and network adventure sources. Avoid trailers, shorts and promotional-only clips as primary programs.",schedulePolicy:"Twenty-four hourly blocks fill the viewer-local day. The lineup changes at local midnight and stays fixed through that day."};
  window.ADVENTURE_COMMERCIALS=[{id:"ADV-BREAK-1",title:"Adventure TV intermission",durationSeconds:60,videoId:"",cleared:true},{id:"ADV-BREAK-2",title:"Gear up — the adventure continues",durationSeconds:60,videoId:"",cleared:true},{id:"ADV-BREAK-3",title:"Next trail starts shortly",durationSeconds:60,videoId:"",cleared:true}];
})();
