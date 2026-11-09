/* Bölüm motoru: zaman çizelgesine göre sahneleri gösterir, altyazı ve ağızı sürer, tüm CSS animasyonlarını
   tek bir zamana bağlar (deterministik; render için). window.__renderAt(T) saniye cinsinden. */
(function(){
const D=JSON.parse(document.getElementById('data').textContent),svg=document.getElementById('svg'),SC=D.sahneler;
const c1=document.getElementById('c1'),c2=document.getElementById('c2'),c3=document.getElementById('c3'),capg=document.getElementById('cap');
const lines=[c1,c2,c3];
window.BOLUM=window.BOLUM||{hooks:{}};BOLUM.data=D;BOLUM.hooks=BOLUM.hooks||{};
function active(T){for(let i=SC.length-1;i>=0;i--)if(T>=SC[i].baslangic)return SC[i];return SC[0]}
let lastId=-1;
function setCap(sc,lt){
 const c=(sc.altyazi||[]).find(x=>lt>=x.t0&&lt<x.t1);
 if(!c){capg.style.display='none';return}
 capg.style.display='inline';capg.setAttribute('class','cap-'+c.konusan);
 const L=c.satir,n=L.length,y0=1500-(n-1)*88;
 lines.forEach((e,i)=>{const s=L[i]||'';if(e.__s!==s){e.textContent=s;e.__s=s}e.setAttribute('y',y0+i*88)})
}
window.__renderAt=function(T){
 const sc=active(T),lt=T-sc.baslangic;
 if(sc.id!==lastId){document.querySelectorAll('.sc').forEach(g=>{g.style.display=(+g.dataset.id===sc.id)?'inline':'none';g.style.setProperty('--dur',sc.sure+'s')});lastId=sc.id}
 const g=document.getElementById('sc'+sc.id);
 if(sc.agiz&&g){const k=Math.min(sc.agiz.length-1,Math.max(0,Math.floor((lt-sc.ses.baslangic)/0.033)));const v=(lt>=sc.ses.baslangic&&lt<=sc.ses.baslangic+sc.ses.sure)?sc.agiz[k]:0;g.querySelectorAll('.speaker').forEach(r=>Rigs.mouth(r,v))}
 const h=BOLUM.hooks[sc.id];if(h)h(lt,sc,g);
 setCap(sc,lt);
 const tt=document.getElementById('title');if(tt)tt.style.opacity=(sc.id===1)?String(Math.max(0,Math.min(1,(2.9-lt)/.5))*Math.min(1,lt/.25)):'0';
 const hudg=document.getElementById('hud');
 if(hudg){const h=sc.hud;if(!h||(sc.id===1&&lt<3.0)){hudg.style.display='none'}else{hudg.style.display='inline';hudg.style.opacity=String(sc.id===1?Math.min(1,(lt-3.0)/.4):1);
  const set=(id,v)=>{const e=document.getElementById(id);if(e&&e.__v!==v){e.textContent=v;e.__v=v}};
  set('h-gun',h.gun+'. GÜN');set('h-saat',h.saat);set('h-kat',h.kat?('KAT: '+h.kat):'');set('h-kalan',h.kalan);set('h-uzak',h.uzak?('ELA\'YA: '+h.uzak):'')}}
 // tüm animasyonları sahne zamanına bağla
 document.getAnimations().forEach(a=>{
  if(a.constructor&&a.constructor.name==='CSSTransition'){try{a.finish()}catch(e){}return}
  const el=a.effect&&a.effect.target;if(!el||!el.closest)return;
  const holder=el.closest('[data-sub]');const off=holder?+holder.dataset.sub:0;
  a.pause();a.currentTime=Math.max(0,lt-off)*1000;
 });
};
// canlı oynatma (önizleme)
let start=performance.now(),playing=true;
window.BOLUM.play=()=>{start=performance.now();playing=true};
(function loop(){if(playing&&!window.__manual){const T=((performance.now()-start)/1000)%D.toplam;window.__renderAt(T)}requestAnimationFrame(loop)})();
window.__renderAt(0);
})();
