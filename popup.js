let generatedLinks=[];
let botRunning=false;
const words=['technology','gaming','software','computer','internet','science','history','music','movies','travel','design','security','windows','browser','hardware','innovation','research','tutorial','news','guide','review','tips','tools','future','digital','network','development','mobile','performance','privacy','automation','coding','artificial intelligence','cloud','data','web'];

function render(){
  const box=document.getElementById('linkList');
  const empty=!generatedLinks.length;
  box.innerHTML=empty?'<p>No generated links available.</p>':'<ul>'+generatedLinks.map(x=>`<li>${x}</li>`).join('')+'</ul>';
  document.getElementById('nextSearch').disabled=empty||botRunning;
  const run=document.getElementById('runBot');
  run.disabled=empty&&!botRunning;
  run.textContent=botRunning?'STOP BOT':'RUN BOT';
  run.classList.toggle('running',botRunning);
}
function store(){return chrome.storage.local.set({generatedLinks});}
function generate(n,form){return Array.from({length:n},()=>{const count=3+Math.floor(Math.random()*3),chosen=[];for(let i=0;i<count;i++)chosen.push(words[Math.floor(Math.random()*words.length)]);const q=chosen.map(encodeURIComponent).join('+');return `https://www.bing.com/search?q=${q}&qs=PN&form=${encodeURIComponent(form)}`;});}

document.getElementById('saveBtn').onclick=async()=>{
  const n=parseInt(document.getElementById('amountInput').value,10),form=document.getElementById('formIdInput').value.trim();
  if(!n||n<1)return alert('Enter a valid search amount.');
  if(!form)return alert('Enter a valid FORM ID.');
  if(botRunning) await chrome.runtime.sendMessage({type:'STOP_BOT'});
  botRunning=false; generatedLinks=generate(n,form); await store(); render();
};

document.getElementById('nextSearch').onclick=async()=>{
  if(!generatedLinks.length||botRunning)return;
  const url=generatedLinks.shift(); await chrome.tabs.update({url}); await store(); render();
};

document.getElementById('runBot').onclick=async()=>{
  if(botRunning){await chrome.runtime.sendMessage({type:'STOP_BOT'});botRunning=false;}
  else if(generatedLinks.length){await chrome.runtime.sendMessage({type:'START_BOT'});botRunning=true;}
  const state=await chrome.storage.local.get(['generatedLinks','botRunning']);
  generatedLinks=Array.isArray(state.generatedLinks)?state.generatedLinks:[];botRunning=!!state.botRunning;render();
};

chrome.storage.onChanged.addListener((changes,area)=>{
  if(area!=='local')return;
  if(changes.generatedLinks)generatedLinks=changes.generatedLinks.newValue||[];
  if(changes.botRunning)botRunning=!!changes.botRunning.newValue;
  render();
});

chrome.storage.local.get(['generatedLinks','botRunning'],r=>{generatedLinks=Array.isArray(r.generatedLinks)?r.generatedLinks:[];botRunning=!!r.botRunning;render();});
