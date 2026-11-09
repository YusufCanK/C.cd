// ---- sahne 4-17 kurulumu ----
Rigs.deniz($('d4'),{x:430,y:930,s:1,anim:'lookwin'});
(function(){ // pusula çentikleri
 const g=$('ticks5');for(let i=0;i<48;i++){const a=i/48*Math.PI*2,r1=i%4===0?206:222,r2=236;el(g,'line',{x1:640+Math.sin(a)*r1,y1:1010-Math.cos(a)*r1,x2:640+Math.sin(a)*r2,y2:1010-Math.cos(a)*r2,stroke:'#3a2a1c','stroke-width':i%4===0?7:3})}})();
Rigs.ela($('e7'),{x:540,y:860,s:1,anim:'speaker'});
Rigs.deniz($('d9'),{x:290,y:1010,s:.64});Rigs.ela($('e9'),{x:780,y:1060,s:.6,phase:0});
(function(){ // merdiven: iç içe kareler
 const g=$('stairs');for(let k=0;k<10;k++){const sz=1200*Math.pow(.76,k),a=k*7,c=Math.round(54-k*4.6);
  const r=el(g,'rect',{x:540-sz/2,y:860-sz/2,width:sz,height:sz,fill:`rgb(${c},${c+14},${c+26})`,stroke:'#05090d','stroke-width':Math.max(4,14-k),transform:`rotate(${a} 540 860)`});
  if(k<9){const g2=el(g,'g',{transform:`rotate(${a} 540 860)`});el(g2,'line',{x1:540-sz/2,y1:860-sz/2,x2:540+sz/2,y2:860-sz/2,stroke:'#0a131c','stroke-width':Math.max(3,9-k)})}}})();
Rigs.deniz($('d13'),{x:540,y:640,s:.58,mood:'worried',anim:'looklr'});
function corridor(g){
 const xl=u=>400*u,yt=u=>700*u,yb=u=>1920-820*u;
 el(g,'rect',{x:-100,y:-100,width:1280,height:2200,fill:'#05090d'});
 el(g,'polygon',{points:'0,0 1080,0 680,700 400,700',fill:'#0a131c'});
 el(g,'polygon',{points:'0,1920 1080,1920 680,1100 400,1100',fill:'#16273a'});
 el(g,'polygon',{points:'0,0 400,700 400,1100 0,1920',fill:'#122234'});
 el(g,'polygon',{points:'1080,0 680,700 680,1100 1080,1920',fill:'#0f1d2c'});
 el(g,'rect',{x:400,y:700,width:280,height:400,fill:'#091019'});
 const gl=el(g,'ellipse',{cx:540,cy:900,rx:150,ry:200,fill:'url(#wg)',opacity:.35});
 el(g,'rect',{x:490,y:740,width:100,height:90,fill:'#26496c',opacity:.8});
 // koridor sonu: solda arızalı asansör, sağda merdiven boşluğu (bölüm hedefi)
 el(g,'rect',{x:412,y:880,width:118,height:220,fill:'#25313b',stroke:'#05090d','stroke-width':6});
 el(g,'path',{d:'M471 880 V1100',stroke:'#05090d','stroke-width':4});
 el(g,'path',{d:'M414 890 L528 1090 M528 890 L414 1090',stroke:'#f2c230','stroke-width':14});
 el(g,'path',{d:'M414 890 L528 1090 M528 890 L414 1090',stroke:'#05090d','stroke-width':14,'stroke-dasharray':'12 14'});
 el(g,'rect',{x:396,y:830,width:150,height:44,rx:5,fill:'#c8372d',stroke:'#05090d','stroke-width':5});
 const t1=el(g,'text',{x:471,y:866,'text-anchor':'middle',fill:'#fff','font-family':'Impact,Arial Black,sans-serif','font-size':38});t1.textContent='ARIZALI';
 el(g,'rect',{x:556,y:880,width:116,height:220,fill:'#05090d',stroke:'#05090d','stroke-width':6});
 el(g,'path',{d:'M566 1090 H662 M580 1050 H662 M594 1010 H662 M608 970 H662 M622 930 H662',stroke:'#2a3d52','stroke-width':8});
 // tavandan sarkan, ışıklı merdiven tabelası (telefonda okunur boyut)
 el(g,'path',{d:'M470 520 V600 M710 520 V600',stroke:'#05090d','stroke-width':6});
 el(g,'ellipse',{cx:590,cy:640,rx:270,ry:90,fill:'#3ddc84',opacity:.18});
 el(g,'rect',{x:370,y:598,width:440,height:84,rx:10,fill:'#2f9e5b',stroke:'#05090d','stroke-width':7});
 el(g,'path',{d:'M392 664 h20 v-15 h20 v-15 h20 v-15 h20',stroke:'#fff','stroke-width':8,fill:'none','stroke-linejoin':'round'});
 const t2=el(g,'text',{x:600,y:658,'text-anchor':'middle',fill:'#fff','font-family':'Impact,Arial Black,sans-serif','font-size':46});t2.textContent='MERDİVEN';
 el(g,'path',{d:'M740 640 h44 m-16 -16 l16 16 l-16 16',stroke:'#fff','stroke-width':8,fill:'none','stroke-linecap':'round','stroke-linejoin':'round'});
 el(g,'rect',{x:556,y:870,width:116,height:12,fill:'#2f9e5b'});
 [[.1,.24],[.4,.5],[.68,.74]].forEach(([u1,u2])=>{[-1,1].forEach(side=>{
  const X=u=>side<0?xl(u):1080-xl(u),top=u=>yb(u)-.78*(yb(u)-yt(u));
  el(g,'polygon',{points:`${X(u1)},${top(u1)} ${X(u2)},${top(u2)} ${X(u2)},${yb(u2)} ${X(u1)},${yb(u1)}`,fill:'#1b2c3f',stroke:'#05090d','stroke-width':6});
  el(g,'circle',{cx:X(u2-(u2-u1)*.18),cy:yb(u2)-(yb(u2)-top(u2))*.5,r:Math.max(3,12*(1-u1)),fill:'#d9a441'})})});
 return g}
corridor($('cor14'));corridor($('cor15'));corridor($('cor17'));
Sisli.draw($('ahmet15'),Sisli.presets.ahmet,540,1090,.34);
Sisli.draw($('q17'),Sisli.presets.ahmet,330,1262,.45);
Rigs.deniz($('d16'),{x:540,y:1010,s:1.25,mood:'scared'});
// ---- sahne ipuçları (kare kare) ----
BOLUM.hooks[3]=(lt,sc)=>{const c=sc.altyazi,b=c[1]?c[1].t0:2.06,d=c[2]?c[2].t0:3.71;
 $('s3a').style.display=lt<b?'inline':'none';$('s3b').style.display=(lt>=b&&lt<d)?'inline':'none';$('s3c').style.display=lt>=d?'inline':'none';
 $('s3a').dataset.sub=0;$('s3b').dataset.sub=b;$('s3c').dataset.sub=d};
BOLUM.hooks[7]=(lt,sc,g)=>{const c=sc.altyazi;let i=-1;c.forEach((x,k)=>{if(lt>=x.t0)i=k});g.querySelector('.ela').setAttribute('data-phase',i<=0?0:i===1?1:i===2?2:3)};
BOLUM.hooks[13]=(lt,sc,g)=>{const c=sc.altyazi;let i=-1;c.forEach((x,k)=>{if(lt>=x.t0&&lt<x.t1)i=k});g.setAttribute('data-focus',i===1?'fener':i===2?'balta':'')};
