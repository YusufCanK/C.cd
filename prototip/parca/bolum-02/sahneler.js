// ---- Bölüm 2: Merdiven ----
const K2='#05090d',IMP2="Impact,'Arial Black',sans-serif";
function tx2(p,x,y,t,a){const e=el(p,'text',Object.assign({x,y,'text-anchor':'middle','font-family':IMP2},a||{}));e.textContent=t;return e}
function koridor(g){
 const xl=u=>400*u,yt=u=>700*u,yb=u=>1920-820*u;
 el(g,'rect',{x:-100,y:-100,width:1280,height:2200,fill:K2});
 el(g,'polygon',{points:'0,0 1080,0 680,700 400,700',fill:'#0a131c'});el(g,'polygon',{points:'0,1920 1080,1920 680,1100 400,1100',fill:'#16273a'});
 el(g,'polygon',{points:'0,0 400,700 400,1100 0,1920',fill:'#122234'});el(g,'polygon',{points:'1080,0 680,700 680,1100 1080,1920',fill:'#0f1d2c'});
 el(g,'rect',{x:400,y:700,width:280,height:400,fill:'#091019'});el(g,'ellipse',{cx:540,cy:900,rx:150,ry:200,fill:'url(#wg)',opacity:.3});
 el(g,'rect',{x:412,y:880,width:118,height:220,fill:'#25313b',stroke:K2,'stroke-width':6});el(g,'path',{d:'M414 890 L528 1090 M528 890 L414 1090',stroke:'#f2c230','stroke-width':14});
 el(g,'rect',{x:556,y:880,width:116,height:220,fill:K2});el(g,'rect',{x:370,y:598,width:440,height:84,rx:10,fill:'#2f9e5b',stroke:K2,'stroke-width':7});tx2(g,600,658,'MERDİVEN',{fill:'#fff','font-size':46});
 [[.1,.24],[.4,.5],[.68,.74]].forEach(([u1,u2])=>{[-1,1].forEach(side=>{const X=u=>side<0?xl(u):1080-xl(u),top=u=>yb(u)-.78*(yb(u)-yt(u));
  el(g,'polygon',{points:`${X(u1)},${top(u1)} ${X(u2)},${top(u2)} ${X(u2)},${yb(u2)} ${X(u1)},${yb(u1)}`,fill:'#1b2c3f',stroke:K2,'stroke-width':6})})});return g}
function boslukUstten(g){el(g,'rect',{x:-200,y:-200,width:1480,height:2400,fill:K2});for(let k=0;k<10;k++){const sz=1200*Math.pow(.76,k),a=k*7,c=Math.round(54-k*4.6);
 el(g,'rect',{x:540-sz/2,y:860-sz/2,width:sz,height:sz,fill:`rgb(${c},${c+14},${c+26})`,stroke:K2,'stroke-width':Math.max(4,14-k),transform:`rotate(${a} 540 860)`})}}
function balta(g,x,y,r,s){const b=el(g,'g',{transform:`translate(${x} ${y}) rotate(${r}) scale(${s||1})`,stroke:K2,'stroke-width':8,'stroke-linejoin':'round'});
 el(b,'rect',{x:-16,y:-250,width:32,height:520,rx:12,fill:'#8a5a33'});el(b,'path',{d:'M16 -240 Q150 -270 160 -150 Q90 -176 16 -130Z',fill:'#aab4be'});el(b,'path',{d:'M24 -228 Q120 -250 140 -170',stroke:'#e9eef2','stroke-width':6,fill:'none'});return b}
function yildiz(g,x,y,s,renk){return el(g,'path',{transform:`translate(${x} ${y}) scale(${s})`,d:'M0 -60 l14 40 l40 -14 l-24 34 l36 22 l-42 4 l6 42 l-30 -30 l-30 30 l6 -42 l-42 -4 l36 -22 l-24 -34 l40 14z',fill:renk||'#f2c230',stroke:K2,'stroke-width':6})}
function gozler(g,x,y,s){const e=el(g,'g',{});[[-1],[1]].forEach(([d])=>{el(e,'circle',{cx:x+d*14*s,cy:y,r:14*s,fill:'#e8f3ff',opacity:.35});el(e,'circle',{cx:x+d*14*s,cy:y,r:6*s,fill:'#fff'})});return e}
function cerceve2(g){el(g,'rect',{x:24,y:24,width:1032,height:1872,fill:'none',stroke:K2,'stroke-width':20})}
function el2(g,x,y,s){return el(g,'circle',{cx:x,cy:y,r:40*(s||1),fill:'#E0A56B',stroke:K2,'stroke-width':10})}
// 1: seçim kartı, sonra başlık
(function(){const g=$('k1');koridor(g);Sisli.draw(el(g,'g',{style:'filter:brightness(.55)'}),Sisli.presets.ahmet,540,1090,.34);el(g,'rect',{x:-100,y:-100,width:1280,height:2200,fill:K2,opacity:.6});
 const k=el(g,'g',{id:'b2kart'});el(k,'rect',{x:140,y:640,width:800,height:640,rx:44,fill:'#14212d',stroke:'#ef8a3c','stroke-width':14});
 tx2(k,540,760,'SİZ SEÇTİNİZ',{fill:'#ffb347','font-size':70});balta(k,540,1010,24,.62);el(k,'circle',{cx:250,cy:860,r:54,fill:'#ef8a3c',stroke:K2,'stroke-width':6});tx2(k,250,890,'B',{fill:K2,'font-size':80});
 tx2(k,540,1210,'BALTA',{fill:'#fff','font-size':110,stroke:'#000','stroke-width':12,'paint-order':'stroke'})})();
BOLUM.hooks[1]=lt=>{$('b2kart').style.display=lt<2.4?'inline':'none'};
// 2: Sisli yaklaşıyor, Deniz baltayı kaldırıyor
(function(){const g=$('k2');koridor(g);const a=el(g,'g',{id:'b2ahmet',style:'filter:brightness(.6)'});Sisli.draw(a,Sisli.presets.ahmet,540,1250,.62);a.appendChild(gozler(g,540,905,1.2));
 el(g,'rect',{x:-100,y:-100,width:1280,height:2200,fill:K2,opacity:.25});Rigs.deniz(el(g,'g',{}),{x:300,y:1300,s:.78,mood:'scared'});balta(g,640,1330,28,.9);el2(g,560,1520,1.1)})();
BOLUM.hooks[2]=lt=>{const p=Math.min(1,lt/6);$('b2ahmet').setAttribute('transform',`translate(${540*(1-(1+.25*p))} ${1250*(1-(1+.25*p))}) scale(${1+.25*p})`)};
// 3: ıska, balta kapı kasasında
(function(){const g=$('k3');el(g,'rect',{width:1080,height:1920,fill:'#1b2c3f'});el(g,'rect',{x:360,y:-20,width:200,height:1960,fill:'#6b4a33',stroke:K2,'stroke-width':14});
 [[380,200],[520,600],[400,1300]].forEach(([x,y])=>el(g,'path',{d:`M${x} ${y} q30 60 0 140`,stroke:'#4a3322','stroke-width':8,fill:'none'}));
 const h=el(g,'g',{});for(let i=0;i<16;i++){const a=i/16*6.28;el(h,'path',{d:`M${470+Math.cos(a)*170} ${930+Math.sin(a)*170} L${470+Math.cos(a)*620} ${930+Math.sin(a)*620}`,stroke:'#fff','stroke-width':6+(i%3)*3,opacity:.45})}
 balta(g,760,1180,-62,1.4);[[430,860,-30],[520,1000,20],[440,1020,60]].forEach(([x,y,r])=>el(g,'path',{d:`M${x} ${y} l40 -12 l-8 40z`,fill:'#a07a55',stroke:K2,'stroke-width':5,transform:`rotate(${r} ${x} ${y})`}));
 tx2(g,640,1560,'GÜM!',{fill:'#f2c230','font-size':220,stroke:'#000','stroke-width':18,'paint-order':'stroke',transform:'rotate(-8 640 1560)'});cerceve2(g)})();
// 4: ses merdiven boşluğundan aşağı yankılanıyor
(function(){const g=$('k4');boslukUstten(g);const h=el(g,'g',{id:'b2halka'});for(let k=0;k<5;k++)el(h,'circle',{cx:540,cy:860,r:100,fill:'none',stroke:'#cfe9ff','stroke-width':10})})();
BOLUM.hooks[4]=lt=>{[...$('b2halka').children].forEach((c,k)=>{const r=(lt*260+k*240)%1100+30;c.setAttribute('r',r);c.setAttribute('opacity',Math.max(0,.6*(1-r/1100)))})};
// 5: ikinci savuruş, Sisli düşer (çizgi film darbesi, kan yok)
(function(){const g=$('k5');koridor(g);el(g,'rect',{x:-100,y:-100,width:1280,height:2200,fill:K2,opacity:.35});
 const a=el(g,'g',{id:'b2dus',style:'filter:brightness(.7)'});Sisli.draw(a,Sisli.presets.ahmet,540,1500,.75);
 el(g,'path',{id:'b2yay',d:'M200 600 Q620 420 880 1100',stroke:'#fff','stroke-width':16,fill:'none','stroke-linecap':'round',opacity:.8});const y=yildiz(g,600,1000,1.4);y.id='b2yildiz';cerceve2(g)})();
BOLUM.hooks[5]=lt=>{const p=Math.min(1,Math.max(0,(lt-.4)/.9)),e=1-Math.pow(1-p,2);$('b2dus').setAttribute('transform',`rotate(${-70*e} 540 1500) translate(${-60*e} 0)`);
 $('b2yay').style.display=lt<.9?'inline':'none';$('b2yildiz').style.display=(lt>.35&&lt<1.1)?'inline':'none'};
// 6: anahtarlık (9-B, turuncu kedi)
(function(){const g=$('k6');el(g,'rect',{x:-100,y:-100,width:1280,height:2200,fill:'#2a2f36'});for(let x=-100;x<1200;x+=180)for(let y=-100;y<2100;y+=180)el(g,'rect',{x,y,width:176,height:176,fill:(x+y)%360?'#323842':'#2c3239'});
 el(g,'path',{d:'M-40 -40 L420 -40 Q440 220 300 330 L-40 380Z',fill:'#6a5a48',stroke:K2,'stroke-width':12});el(g,'ellipse',{cx:330,cy:340,rx:70,ry:52,fill:'#a9a59a',stroke:K2,'stroke-width':10});
 el(g,'circle',{cx:560,cy:900,r:110,fill:'none',stroke:K2,'stroke-width':30});el(g,'circle',{cx:560,cy:900,r:110,fill:'none',stroke:'#c9c2a8','stroke-width':18});
 [[0,-10],[1,25]].forEach(([i,r])=>{const k=el(g,'g',{transform:`translate(${600+i*30} 1000) rotate(${r})`,stroke:K2,'stroke-width':7});el(k,'circle',{cx:0,cy:0,r:46,fill:'#d9a441'});el(k,'rect',{x:-14,y:30,width:28,height:240,fill:'#d9a441'});el(k,'path',{d:'M14 200 h30 v20 h-30 M14 240 h20',fill:'none'})});
 const t=el(g,'g',{transform:'translate(400 1040) rotate(-14)'});el(t,'rect',{x:-90,y:0,width:180,height:120,rx:14,fill:'#f4f1e6',stroke:K2,'stroke-width':8});tx2(t,0,90,'9-B',{fill:'#c0392b','font-size':78});
 const c=el(g,'g',{transform:'translate(760 1110) rotate(12)',stroke:K2,'stroke-width':8,'stroke-linejoin':'round'});el(c,'ellipse',{cx:0,cy:60,rx:70,ry:60,fill:'#f28c28'});el(c,'circle',{cx:0,cy:-30,r:56,fill:'#f28c28'});
 el(c,'path',{d:'M-46 -60 L-40 -110 L-12 -78Z M46 -60 L40 -110 L12 -78Z',fill:'#f28c28'});el(c,'circle',{cx:-20,cy:-34,r:7,fill:K2,stroke:'none'});el(c,'circle',{cx:20,cy:-34,r:7,fill:K2,stroke:'none'});el(c,'path',{d:'M60 80 q70 -10 60 -90',fill:'none','stroke-width':16});
 el(g,'path',{d:'M640 840 q60 120 120 250',stroke:'#c9c2a8','stroke-width':10,fill:'none'})})();
// 7: aşağıdan cevap (gözler beliriyor)
(function(){const g=$('k7');boslukUstten(g);el(g,'rect',{x:-200,y:-200,width:1480,height:2400,fill:K2,opacity:.35});const h=el(g,'g',{id:'b2gozler'});
 [[620,980,.6],[470,820,.5],[560,700,.4],[430,1060,.7],[680,800,.45]].forEach(([x,y,s])=>{const e=gozler(h,x,y,s*1.6);e.setAttribute('class','b2-glow')})})();
BOLUM.hooks[7]=lt=>{[...$('b2gozler').children].forEach((c,k)=>c.style.display=lt>.8+k*.7?'inline':'none')};
// 8: Deniz merdivenin başında
(function(){const g=$('k8');el(g,'rect',{x:-100,y:-100,width:1280,height:2200,fill:'#101a24'});for(let i=0;i<9;i++)el(g,'path',{d:`M-100 ${1500-i*150} L1200 ${900-i*150}`,stroke:'#1d2c3b','stroke-width':40});
 el(g,'path',{d:'M-100 1300 L1200 700',stroke:'#5b6670','stroke-width':18});for(let x=0;x<1100;x+=120)el(g,'path',{d:`M${x} ${1300-x*.46} v220`,stroke:'#5b6670','stroke-width':10});
 Rigs.deniz(el(g,'g',{}),{x:540,y:1000,s:.75,mood:'worried'});balta(g,820,1320,-18,.85);el2(g,790,1470,1.1)})();
// 9: 8, 7, 6
(function(){const g=$('k9');const vs=[];['8','7','6'].forEach((n,i)=>{const v=el(g,'g',{});vs.push(v);el(v,'rect',{x:-100,y:-100,width:1280,height:2200,fill:['#3b4a5a','#34424f','#2d3a46'][i]});
 el(v,'rect',{x:300,y:420,width:520,height:700,fill:'none',stroke:'#5b6a78','stroke-width':10,'stroke-dasharray':'30 20'});tx2(v,560,1000,n,{fill:'#e8e2d0','font-size':560,opacity:.9});tx2(v,560,1170,'KAT',{fill:'#e8e2d0','font-size':80,opacity:.8});
 el(v,'path',{d:'M-100 1700 L1200 1300',stroke:'#5b6670','stroke-width':18});Rigs.deniz(el(v,'g',{}),{x:150,y:1180,s:.5,mood:'worried'});gozler(v,900,1620,1.2+i*.5).setAttribute('class','b2-glow')});
 g.__v=vs})();
BOLUM.hooks[9]=(lt,sc)=>{const c=sc.altyazi||[];const b1=c[1]?c[1].t0:2.3,b2=c[2]?c[2].t0:4.6;const i=lt<b1?0:lt<b2?1:2;$('k9').__v.forEach((v,k)=>v.style.display=k===i?'inline':'none')};
// 10: gecikmiş sesli mesaj (Ela)
(function(){const g0=$('k10');el(g0,'rect',{x:-100,y:-100,width:1280,height:2200,fill:'#090e13'});const g=el(g0,'g',{transform:'translate(0 200)'});el(g,'rect',{x:-100,y:-100,width:1280,height:2200,fill:'#090e13'});el(g,'ellipse',{cx:540,cy:880,rx:560,ry:720,fill:'#6ac4ff',opacity:.1});
 el(g,'path',{d:'M200 1240 Q150 1100 190 980 L260 1000 L260 1300Z',fill:'#E0A56B',stroke:K2,'stroke-width':12});el(g,'rect',{x:250,y:320,width:580,height:1060,rx:80,fill:'#0d1218',stroke:K2,'stroke-width':14});
 el(g,'rect',{x:276,y:352,width:528,height:996,rx:58,fill:'#12354a'});tx2(g,540,620,'05:58',{'font-family':'Arial Narrow,Impact,sans-serif','font-weight':700,'font-size':170,fill:'#e8f3ff'});
 const b=el(g,'g',{class:'b2-glow'});el(b,'rect',{x:640,y:388,width:104,height:44,rx:10,fill:'none',stroke:'#ff5a4a','stroke-width':6});el(b,'rect',{x:648,y:396,width:10,height:28,rx:3,fill:'#ff5a4a'});tx2(b,600,426,'%3',{'font-family':'system-ui,sans-serif','font-weight':800,'font-size':40,fill:'#ff5a4a'});
 el(g,'rect',{x:304,y:760,width:472,height:300,rx:34,fill:'#1f5c80',stroke:'#0a2a3d','stroke-width':6});el(g,'circle',{cx:372,cy:835,r:38,fill:'#f2c230',stroke:K2,'stroke-width':5});
 const t1=el(g,'text',{x:438,y:822,'font-family':'system-ui,sans-serif','font-weight':800,'font-size':40,fill:'#fff'});t1.textContent='Ela';const t2=el(g,'text',{x:438,y:868,'font-family':'system-ui,sans-serif','font-size':30,fill:'#cfe0e6'});t2.textContent='Sesli mesaj · 03:12';
 const w=el(g,'g',{id:'b2dalga'});for(let i=0;i<22;i++)el(w,'rect',{x:330+i*20,y:960,width:12,height:20,rx:5,fill:'#e8f3ff'});
 el(g,'path',{d:'M880 1240 Q930 1100 890 980 L820 1000 L820 1300Z',fill:'#E0A56B',stroke:K2,'stroke-width':12})})();
BOLUM.hooks[10]=lt=>{[...$('b2dalga').children].forEach((r,i)=>{const h=lt<8.6?18+60*Math.abs(Math.sin(lt*7+i*1.7))*Math.abs(Math.sin(lt*2.3+i)):12;r.setAttribute('height',h);r.setAttribute('y',990-h/2)})};
// 11: titreşim bir Sisli'yi çekiyor
(function(){const g=$('k11');el(g,'rect',{x:-100,y:-100,width:1280,height:2200,fill:'#0d151d'});for(let i=0;i<12;i++)el(g,'rect',{x:-100,y:700+i*110,width:1280,height:60,fill:'#18242f'});
 const s=el(g,'g',{id:'b2basKaldir',style:'filter:brightness(.6)'});Sisli.draw(s,Sisli.random(7),560,1700,.62);const e=gozler(g,560,1290,1.4);e.id='b2g11';e.setAttribute('class','b2-glow');
 const t=el(g,'g',{transform:'translate(880 760)'});el(t,'rect',{x:-50,y:-90,width:100,height:180,rx:18,fill:'#0d1218',stroke:'#6ac4ff','stroke-width':6});[[-80,1],[80,-1]].forEach(([dx,s])=>el(t,'path',{d:`M${dx} -40 q${-20*s} 40 0 80 M${dx*1.4} -60 q${-28*s} 60 0 120`,stroke:'#6ac4ff','stroke-width':6,fill:'none'}))})();
BOLUM.hooks[11]=lt=>{const p=Math.min(1,lt/1.6);$('b2basKaldir').setAttribute('transform',`rotate(${-12+12*p} 560 1700)`);$('b2g11').style.display=lt>1.2?'inline':'none'};
// 12: yangın dolabı, cam kırılıyor
(function(){const g0=$('k12');el(g0,'rect',{width:1080,height:1920,fill:'#3b4a5a'});const g=el(g0,'g',{transform:'translate(0 140)'});el(g,'rect',{x:200,y:420,width:680,height:1020,rx:20,fill:'#c8372d',stroke:K2,'stroke-width':14});
 tx2(g,540,540,'YANGIN DOLABI',{fill:'#fff','font-size':70});const cam=el(g,'g',{id:'b2cam'});el(cam,'rect',{x:260,y:600,width:560,height:780,fill:'#bfe3ef',opacity:.55,stroke:K2,'stroke-width':8});el(cam,'path',{d:'M300 660 l120 0 l-200 260z',fill:'#fff',opacity:.4});
 const kr=el(g,'g',{id:'b2kirik'});el(kr,'rect',{x:260,y:600,width:560,height:780,fill:'#7a2620',stroke:K2,'stroke-width':8});el(kr,'circle',{cx:540,cy:980,r:150,fill:'none',stroke:'#9fd3f2','stroke-width':10});
 [[260,600,520,900,300,1100],[820,600,600,920,820,860],[380,1380,540,1040,700,1380],[820,1100,620,1020,820,1380]].forEach(p=>el(kr,'polygon',{points:p.join(' '),fill:'#bfe3ef',opacity:.5,stroke:K2,'stroke-width':5}));
 [[160,1500,20],[900,1560,-30],[300,1620,60],[760,1480,10]].forEach(([x,y,r])=>el(kr,'polygon',{points:`${x},${y} ${x+50},${y+10} ${x+20},${y+50}`,fill:'#bfe3ef',stroke:K2,'stroke-width':4,transform:`rotate(${r} ${x} ${y})`}));
 const bb=el(g,'g',{id:'b2sap'});balta(bb,860,1500,-130,1.1);yildiz(bb,560,1000,1.1,'#fff')})();
BOLUM.hooks[12]=lt=>{if(!$('k12').__c){$('k12').__c=1;const g=$('k12');const r=el(g,'rect',{x:24,y:24,width:1032,height:1872,fill:'none',stroke:K2,'stroke-width':20})}const k=lt>3.4;$('b2cam').style.display=k?'none':'inline';$('b2kirik').style.display=k?'inline':'none';$('b2sap').style.display=(lt>3.1&&lt<4.2)?'inline':'none'};
// 13: kaçış maskesi, etiket
(function(){const g=$('k13');el(g,'rect',{x:-100,y:-100,width:1280,height:2200,fill:'#7a2620'});el(g,'circle',{cx:540,cy:620,r:220,fill:'none',stroke:'#c8372d','stroke-width':60});
 const kutu=el(g,'g',{stroke:K2,'stroke-width':10});el(kutu,'rect',{x:300,y:960,width:480,height:420,rx:20,fill:'#f2a33a'});el(kutu,'path',{d:'M420 1130 q120 -110 240 0 v90 q-120 90 -240 0z',fill:'#3b4a5a'});el(kutu,'circle',{cx:540,cy:1260,r:44,fill:'#1d1d1d'});
 tx2(g,540,1030,'KAÇIŞ MASKESİ',{fill:K2,'font-size':52});
 const et=el(g,'g',{id:'b2etiket'});el(et,'rect',{x:-100,y:-100,width:1280,height:2200,fill:'#000',opacity:.55});el(et,'rect',{x:110,y:640,width:860,height:560,rx:24,fill:'#f4f1e6',stroke:K2,'stroke-width':14});
 tx2(et,540,760,'KAÇIŞ MASKESİ',{fill:'#c0392b','font-size':72});el(et,'path',{d:'M170 800 H910',stroke:K2,'stroke-width':6});tx2(et,540,950,'FİLTRE: 1 ADET',{fill:K2,'font-size':110});tx2(et,540,1110,'60 DK',{fill:'#c0392b','font-size':120})})();
BOLUM.hooks[13]=lt=>{$('b2etiket').style.display=lt>2.6?'inline':'none'};
// 14: zemin kat lobisi
(function(){const g=$('k14');el(g,'rect',{x:-100,y:-100,width:1280,height:2200,fill:'#2b3946'});el(g,'rect',{x:-100,y:1250,width:1280,height:900,fill:'#3d4a55'});
 for(let x=-100;x<1200;x+=120)el(g,'path',{d:`M${x} 1250 L${540+(x-540)*2.4} 2100`,stroke:'#33404a','stroke-width':6});
 el(g,'rect',{x:260,y:420,width:560,height:840,fill:'#c9d3d8',stroke:K2,'stroke-width':16});el(g,'rect',{x:276,y:436,width:528,height:808,fill:'#dfe7ea'});
 el(g,'ellipse',{cx:540,cy:760,rx:300,ry:200,fill:'#fff3d6',opacity:.6});el(g,'path',{d:'M540 420 V1260',stroke:K2,'stroke-width':12});el(g,'rect',{x:470,y:820,width:30,height:90,rx:8,fill:'#5b6670'});el(g,'rect',{x:580,y:820,width:30,height:90,rx:8,fill:'#5b6670'});
 for(let i=0;i<6;i++)el(g,'rect',{x:860+(i%2)*80,y:640+Math.floor(i/2)*90,width:70,height:80,fill:'#6b7a86',stroke:K2,'stroke-width':5});
 [[11,360,1330,.42],[12,560,1300,.4],[13,760,1340,.44]].forEach(([s,x,y,k])=>Sisli.draw(el(g,'g',{style:'filter:brightness(.5)'}),Sisli.random(s),x,y,k));
 Rigs.deniz(el(g,'g',{}),{x:200,y:1500,s:.62,mood:'scared'});balta(g,400,1750,10,.75)})();
// 15: seçim
(function(){const g=$('k15');el(g,'rect',{x:-100,y:-100,width:1280,height:2200,fill:'#0b141d'});tx2(g,540,400,'DENİZ NASIL ÇIKMALI?',{fill:'#fff','font-size':76});
 [[40,'A','ÖN KAPIDAN KOŞ','Gün ışığında yavaşlar.','Ama üçünün arasından geçmeli.',0],[560,'B','BODRUMDAN DOLAŞ','Daha uzun, daha karanlık.','Filtre süresi azalır.',1]].forEach(([x,h,b,l1,l2,i])=>{
  const c=el(g,'g',{class:'card',style:`--d:${.1+i*.2}s`});el(c,'rect',{x,y:470,width:480,height:620,rx:40,fill:'#14212d',stroke:'#ef8a3c','stroke-width':12});el(c,'circle',{cx:x+66,cy:536,r:44,fill:'#ef8a3c',stroke:K2,'stroke-width':6});tx2(c,x+66,562,h,{fill:K2,'font-size':72});
  const ik=el(c,'g',{transform:`translate(${x+240} 760)`,stroke:K2,'stroke-width':8});
  if(!i){el(ik,'rect',{x:-90,y:-130,width:180,height:250,fill:'#dfe7ea'});el(ik,'path',{d:'M0 -130 V120',fill:'none'});el(ik,'path',{d:'M-150 60 h90 m-30 -30 l30 30 l-30 30',stroke:'#f2c230','stroke-width':14,fill:'none'})}
  else{for(let k=0;k<5;k++)el(ik,'rect',{x:-120+k*48,y:-120+k*48,width:240-k*48,height:40,fill:'#5b6670'});el(ik,'path',{d:'M110 -110 v150 m-30 -30 l30 30 l30 -30',stroke:'#f2c230','stroke-width':14,fill:'none'})}
  tx2(c,x+240,960,b,{fill:'#fff','font-size':52,stroke:'#000','stroke-width':8,'paint-order':'stroke'});
  const a1=el(c,'text',{x:x+240,y:1015,'text-anchor':'middle','font-family':'system-ui,Arial,sans-serif','font-weight':700,'font-size':30,fill:'#fff'});a1.textContent=l1;
  const a2=el(c,'text',{x:x+240,y:1058,'text-anchor':'middle','font-family':'system-ui,Arial,sans-serif','font-weight':700,'font-size':28,fill:'#ffb347'});a2.textContent=l2});
 const q=el(g,'g',{class:'card',style:'--d:1.1s'});el(q,'rect',{x:160,y:1130,width:760,height:300,rx:40,fill:'#14212d',stroke:'#e64b3c','stroke-width':12});
 const c=el(q,'g',{transform:'translate(300 1290) scale(.9)',stroke:K2,'stroke-width':8});el(c,'ellipse',{cx:0,cy:60,rx:70,ry:60,fill:'#f28c28'});el(c,'circle',{cx:0,cy:-30,r:56,fill:'#f28c28'});el(c,'path',{d:'M-46 -60 L-40 -110 L-12 -78Z M46 -60 L40 -110 L12 -78Z',fill:'#f28c28'});
 tx2(q,660,1270,'?',{fill:'#e64b3c','font-size':150,stroke:'#000','stroke-width':12,'paint-order':'stroke'});tx2(q,640,1390,"AHMET AMCA'NIN KEDİSİ?",{fill:'#fff','font-size':46,stroke:'#000','stroke-width':8,'paint-order':'stroke'})})();
