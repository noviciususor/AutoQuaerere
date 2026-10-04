const ALARM='autoquaerere-next';

async function getState(){
  return await chrome.storage.local.get(['generatedLinks','botRunning']);
}

async function scheduleNext(){
  const delaySeconds=5+Math.floor(Math.random()*4);
  await chrome.alarms.create(ALARM,{delayInMinutes:delaySeconds/60});
}

async function openNext(){
  const {generatedLinks=[],botRunning=false}=await getState();
  if(!botRunning) return;
  if(!generatedLinks.length){
    await chrome.storage.local.set({botRunning:false});
    await chrome.alarms.clear(ALARM);
    return;
  }
  const [url,...rest]=generatedLinks;
  const tabs=await chrome.tabs.query({active:true,lastFocusedWindow:true});
  if(tabs[0]?.id) await chrome.tabs.update(tabs[0].id,{url});
  else await chrome.tabs.create({url});
  await chrome.storage.local.set({generatedLinks:rest});
  if(rest.length) await scheduleNext();
  else await chrome.storage.local.set({botRunning:false});
}

chrome.runtime.onMessage.addListener((msg,_sender,sendResponse)=>{
  (async()=>{
    if(msg?.type==='START_BOT'){
      const {generatedLinks=[]}=await getState();
      if(!generatedLinks.length){sendResponse({ok:false});return;}
      await chrome.storage.local.set({botRunning:true});
      await openNext();
      sendResponse({ok:true});
    } else if(msg?.type==='STOP_BOT'){
      await chrome.storage.local.set({botRunning:false});
      await chrome.alarms.clear(ALARM);
      sendResponse({ok:true});
    }
  })();
  return true;
});

chrome.alarms.onAlarm.addListener(alarm=>{if(alarm.name===ALARM) openNext();});
