(function(){
  'use strict';
  const share=document.getElementById('shareButton');
  const status=document.getElementById('shareStatus');
  const walletButton=document.getElementById('walletButton');
  const GUEST_KEY='starquest_guest_profile_v1';
  const SESSION_KEY='starquest_session';
  const USERS_KEY='starquest_users';
  let lastCreditAt=0;

  const read=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key))??fallback}catch{return fallback}};
  const write=(key,value)=>{try{localStorage.setItem(key,JSON.stringify(value));return true}catch{return false}};

  function fallbackStore(){
    const session=read(SESSION_KEY,null);
    const users=read(USERS_KEY,{});
    if(session&&session.key&&users&&users[session.key])return{profile:users[session.key],save(profile){users[session.key]=profile;write(USERS_KEY,users)}};
    const guest=read(GUEST_KEY,{key:'__guest__',username:'Guest',tokens:0,shareCount:0,pendingShareCredits:0,shareEvents:[],ledger:[]});
    return{profile:guest,save(profile){write(GUEST_KEY,profile)}};
  }

  function fallbackSnapshot(){
    const profile=fallbackStore().profile||{};
    return{balance:Math.max(0,Number(profile.tokens)||0),progressToNextCoin:Math.max(0,Number(profile.pendingShareCredits)||0),shareCount:Math.max(0,Number(profile.shareCount)||0)};
  }

  function snapshot(){
    if(window.ControlPhi&&typeof window.ControlPhi.wallet==='function')return window.ControlPhi.wallet();
    return fallbackSnapshot();
  }

  function effectiveBalance(state){
    return Number(((Number(state?.balance)||0)+(Math.max(0,Number(state?.progressToNextCoin)||0)/10)).toFixed(1));
  }

  function render(){
    if(!walletButton)return;
    const state=snapshot();
    const balance=effectiveBalance(state);
    const progress=Math.max(0,Number(state?.progressToNextCoin)||0);
    walletButton.textContent=`Wallet · ${balance.toFixed(1)} ⭐ · ${progress}/10`;
    walletButton.dataset.unifiedWallet='control-phi';
    walletButton.setAttribute('aria-label',`Open StarCoin wallet. Balance ${balance.toFixed(1)}. Share progress ${progress} of 10.`);
  }

  function fallbackCredit(reference,method){
    const now=Date.now();
    const store=fallbackStore();
    const wallet=store.profile&&typeof store.profile==='object'?store.profile:{};
    wallet.tokens=Math.max(0,Number(wallet.tokens)||0);
    wallet.shareCount=Math.max(0,Number(wallet.shareCount)||0);
    wallet.pendingShareCredits=Math.max(0,Number(wallet.pendingShareCredits)||0);
    wallet.shareEvents=Array.isArray(wallet.shareEvents)?wallet.shareEvents:[];
    wallet.ledger=Array.isArray(wallet.ledger)?wallet.ledger:[];
    const duplicate=wallet.shareEvents.some(event=>event&&event.contentId===reference&&Math.abs(now-Number(event.createdAt||0))<3500);
    if(duplicate)return{balance:wallet.tokens,progressToNextCoin:wallet.pendingShareCredits,awarded:0,alreadyRecorded:true};
    const id=`adventure-share-${now.toString(36)}-${Math.random().toString(36).slice(2,8)}`;
    wallet.shareCount+=1;wallet.pendingShareCredits+=1;
    wallet.shareEvents.push({id,contentId:reference,method,confirmed:true,verified:true,source:'adventure-control-phi-fallback',createdAt:now});
    let awarded=0;
    while(wallet.pendingShareCredits>=10){wallet.pendingShareCredits-=10;wallet.tokens+=1;awarded+=1;}
    wallet.ledger.push({id:`tx-${id}`,type:awarded?'share_reward':'share_credit',amount:awarded,balance:wallet.tokens,pendingShareCredits:wallet.pendingShareCredits,referenceId:id,source:'adventure-control-phi-fallback',createdAt:now});
    wallet.shareEvents=wallet.shareEvents.slice(-250);wallet.ledger=wallet.ledger.slice(-500);store.save(wallet);
    const detail={balance:wallet.tokens,progressToNextCoin:wallet.pendingShareCredits,shareCount:wallet.shareCount,awarded,source:'adventure-control-phi-fallback'};
    window.dispatchEvent(new CustomEvent('starquest:share-progress',{detail}));
    window.dispatchEvent(new CustomEvent('controlphi:wallet-change',{detail}));
    return detail;
  }

  function rewardShare(reference,method){
    if(window.ControlPhi&&typeof window.ControlPhi.ensureShareCredit==='function')return window.ControlPhi.ensureShareCredit(reference,method);
    return fallbackCredit(reference,method);
  }

  async function handleShare(event){
    if(!share||!event.target.closest('#shareButton'))return;
    event.preventDefault();event.stopPropagation();event.stopImmediatePropagation();
    const nowTitle=document.getElementById('nowTitle');
    const title=nowTitle&&nowTitle.textContent&&!nowTitle.textContent.includes('Loading')?nowTitle.textContent:'Adventure TV';
    const payload={title:`${title} · Adventure TV`,text:`Watch ${title} on Adventure TV.`,url:location.href};
    try{
      if(navigator.share){
        await navigator.share(payload);
        const result=rewardShare(payload.url,'native-share');
        lastCreditAt=Date.now();render();
        const balance=effectiveBalance(result||snapshot());
        if(status)status.textContent=result?.alreadyRecorded?`Shared · wallet already recorded this +0.1 credit · ${balance.toFixed(1)} ⭐`:(result?.awarded?`Shared · 1 StarCoin completed · ${balance.toFixed(1)} ⭐`:`Shared · +0.1 StarCoin · ${balance.toFixed(1)} ⭐ · ${Number(result?.progressToNextCoin)||0}/10`);
      }else{
        await navigator.clipboard.writeText(payload.url);
        if(status)status.textContent='Link copied. A confirmed share is required before a StarCoin reward.';
      }
    }catch(error){
      if(status)status.textContent=error&&error.name==='AbortError'?'Share canceled. No reward added.':'Share or wallet save did not complete.';
    }
  }

  document.addEventListener('click',handleShare,true);
  if(walletButton){
    walletButton.addEventListener('click',function(){
      render();
      const shared=document.getElementById('controlPhiWalletButton');
      if(shared){shared.click();setTimeout(render,0);}
    });
  }
  window.addEventListener('storage',render);
  window.addEventListener('focus',render);
  window.addEventListener('starquest:share-progress',()=>{if(Date.now()-lastCreditAt>100)render();});
  window.addEventListener('controlphi:wallet-change',render);
  render();
})();
