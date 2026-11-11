/* Bölüm motoru (Kat 9 motor.js mantığı): zaman çizelgesine göre sahneleri gösterir, altyazı, panel ve kameranın
   tek bir zamana bağlanması (deterministik; render için). window.__renderAt(T) saniye cinsinden.
   Sahne çizimi bölüme aittir: BOLUM.sahne[id] = {zoom:[z0,z1,cx,cy], ciz(g,sc), hook(lt,sc,g)}  (story/bolum-NN/sahne-cizim.js)
   Böylece bu dosya ve sablon/ içindeki her şey bölümden bağımsızdır. */
(function(){
const ns='http://www.w3.org/2000/svg';
const D=JSON.parse(document.getElementById('data').textContent),SC=D.sahneler;
const svg=document.getElementById('svg'),ust=document.getElementById('ust'),capg=document.getElementById('cap');
const lines=[0,1,2].map(i=>document.getElementById('c'+(i+1)));
window.BOLUM=window.BOLUM||{sahne:{}};BOLUM.data=D;
// her sahne bir grup: <g.sc#scN><g.cam>…çizim…</g></g>
SC.forEach(sc=>{
 const g=document.createElementNS(ns,'g');g.setAttribute('class','sc');g.id='sc'+sc.id;g.style.display='none';
 const cam=document.createElementNS(ns,'g');cam.setAttribute('class','cam');g.appendChild(cam);svg.insertBefore(g,ust);
 const s=BOLUM.sahne[sc.id];if(s&&s.ciz)s.ciz(cam,sc);
});
function active(T){for(let i=SC.length-1;i>=0;i--)if(T>=SC[i].baslangic)return SC[i];return SC[0]}
function hm(s){const[a,b]=s.split(':').map(Number);return a*60+b}
function fmt(m){m=((Math.round(m)%1440)+1440)%1440;return String(Math.floor(m/60)).padStart(2,'0')+':'+String(m%60).padStart(2,'0')}
function setCap(sc,lt){
 const c=(sc.altyazi||[]).find(x=>lt>=x.t0&&lt<x.t1);
 if(!c){capg.style.display='none';return}
 capg.style.display='inline';capg.setAttribute('class','cap-'+c.konusan);
 const L=c.satir,n=L.length,y0=1500-(n-1)*88;
 lines.forEach((e,i)=>{const s=L[i]||'';if(e.__s!==s){e.textContent=s;e.__s=s}e.setAttribute('y',y0+i*88)})
}
let lastId=-1;
window.__renderAt=function(T){
 const sc=active(T),lt=T-sc.baslangic;
 if(sc.id!==lastId){document.querySelectorAll('.sc').forEach(g=>{g.style.display=(+g.id.slice(2)===sc.id)?'inline':'none'});lastId=sc.id}
 const g=document.getElementById('sc'+sc.id),cam=g.querySelector('.cam'),s=BOLUM.sahne[sc.id]||{};
 // kamera
 if(s.zoom){const[z0,z1,cx,cy]=s.zoom,k=Math.min(1,lt/sc.sure),z=z0+(z1-z0)*k;cam.setAttribute('transform',`translate(${cx} ${cy}) scale(${z}) translate(${-cx} ${-cy})`)}else cam.removeAttribute('transform');
 if(sc.agiz&&s.agiz){const k=Math.min(sc.agiz.length-1,Math.max(0,Math.floor(lt/0.033)));s.agiz(sc.agiz[k])}
 if(s.hook)s.hook(lt,sc,cam);
 setCap(sc,lt);
 // durum paneli
 const hudg=document.getElementById('hud'),h=sc.hud;
 if(hudg){if(!h){hudg.style.display='none'}else{hudg.style.display='inline';
  let saat=h.saat;if(h.saat_bas){const k=Math.min(1,lt/sc.sure);saat=fmt(hm(h.saat_bas)+(hm(h.saat)-hm(h.saat_bas))*k)}
  const set=(id,v)=>{const e=document.getElementById(id);if(e&&e.__v!==v){e.textContent=v;e.__v=v}};
  set('h-donem',h.donem);set('h-saat',saat);set('h-isik','IŞIK: '+h.isik);set('h-tekne','TEKNE: '+h.tekne);set('h-hedef','HEDEF: '+h.hedef);
  const bi=document.getElementById('h-isik-bg');if(bi)bi.setAttribute('fill',h.isik==='AÇIK'?'#1f7a45':'#9a3a30')}}
 // tüm animasyonları sahne zamanına bağla
 document.getAnimations().forEach(a=>{
  if(a.constructor&&a.constructor.name==='CSSTransition'){try{a.finish()}catch(e){}return}
  a.pause();a.currentTime=Math.max(0,lt)*1000;
 });
};
// canlı oynatma (önizleme)
/* önizleme sesi: yalnızca anlatım (konuşma) çalar; efekt ve müzik karışımı render aşamasında eklenir */
const SES={},sd=document.getElementById('sesdata');
if(sd){const m=JSON.parse(sd.textContent);Object.keys(m).forEach(id=>{SES[id]=new Audio(m[id]);SES[id].preload='auto'})}
const sesDur=()=>Object.keys(SES).forEach(id=>{const a=SES[id];if(!a.paused){a.pause()}a.currentTime=0});
BOLUM.sesAcik=false;
BOLUM.sesKilit=()=>{BOLUM.sesAcik=true;Object.keys(SES).forEach(id=>{const a=SES[id];a.muted=true;const p=a.play();if(p&&p.then)p.then(()=>{a.pause();a.currentTime=0;a.muted=false}).catch(()=>{a.muted=false})})};
BOLUM.sesKapat=()=>{BOLUM.sesAcik=false;sesDur()};
let start=performance.now(),playing=true,prevT=0;
window.BOLUM.play=()=>{start=performance.now();playing=true;prevT=0};
(function loop(){
 if(playing&&!window.__manual){
  const T=((performance.now()-start)/1000)%D.toplam;
  if(T<prevT)sesDur();
  if(BOLUM.sesAcik)SC.forEach(sc=>{if(sc.ses&&SES[sc.id]){const st=sc.baslangic+sc.ses.baslangic;if(prevT<st&&T>=st){const a=SES[sc.id];a.currentTime=0;a.play().catch(()=>{})}}});
  prevT=T;window.__renderAt(T)
 }else if(window.__manual){sesDur()}
 requestAnimationFrame(loop)})();
window.__renderAt(0);
})();
