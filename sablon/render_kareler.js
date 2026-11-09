#!/usr/bin/env node
/* Kare üretici: node sablon/render_kareler.js derlenmis.html cikti_klasoru toplam_sn [fps=30] [isci=4]
   Her kare window.__renderAt(T) ile deterministik olarak çizilir ve JPEG olarak kaydedilir. */
const {chromium}=require('playwright');const fs=require('fs');
const [,, html, dir, total, fpsA, workA]=process.argv;const fps=+(fpsA||30),W=+(workA||4),N=Math.ceil(+total*fps);
fs.mkdirSync(dir,{recursive:true});
const first=+(process.env.ILK||0),last=Math.min(N,+(process.env.SON||N));
(async()=>{const jobs=[];
 for(let w=0;w<W;w++)jobs.push((async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920},deviceScaleFactor:1});
  await p.goto('file://'+require('path').resolve(html));await p.evaluate(()=>{window.__manual=true});
  for(let f=first+w;f<last;f+=W){await p.evaluate(t=>window.__renderAt(t),f/fps);await p.screenshot({path:`${dir}/${String(f).padStart(5,'0')}.jpg`,type:'jpeg',quality:90})}
  await b.close()})());
 await Promise.all(jobs);console.log('tamam',last-first,'kare')})();
