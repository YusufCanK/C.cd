/* Kontrol aracı: derlenmiş bölüm sayfasından belirli saniyelerde kare alır (render değil, yalnızca bakmak için).
   Kullanım: node sablon/kontak.js prototip/bolum01.build.html cikti_klasoru 1.0,5.5,12 [genislik]  */
const {chromium}=require('playwright');const path=require('path'),fs=require('fs');
(async()=>{
 const [,, html, out, times, w]=process.argv;const W=+(w||540),H=Math.round(W*16/9);fs.mkdirSync(out,{recursive:true});
 const b=await chromium.launch();const p=await b.newPage({viewport:{width:W,height:H}});
 const errs=[];p.on('pageerror',e=>errs.push(String(e)));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
 await p.goto('file://'+path.resolve(html));await p.waitForTimeout(300);
 for(const T of times.split(',').map(Number)){
  await p.evaluate(t=>{window.__manual=true;window.__renderAt(t)},T);
  await p.screenshot({path:path.join(out,String(Math.round(T*10)).padStart(4,'0')+'.png')});
 }
 console.log('hatalar:',errs.length?errs:'yok');await b.close();
})();
