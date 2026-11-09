/* Sisli üretici: parametrelerden farklı bir Sisli (eski bir insan) çizer. Çizgi film üslubu: düz renk, kalın kontur.
   Kullanım: Sisli.draw(svgGrubu, Sisli.random(tohum) | Sisli.presets.ahmet, x, y, ölçek)  (ayaklar y=0, boy ~600 birim) */
(function(root){
const ns='http://www.w3.org/2000/svg',O='#05090d',BLOOD='#7a1f24',BLOOD2='#a02b30';
function el(p,n,a){const e=document.createElementNS(ns,n);for(const k in a)e.setAttribute(k,a[k]);p.appendChild(e);return e}
function rng(s){return()=>(s=(s*16807)%2147483647)/2147483647}
const pick=(r,a)=>a[Math.floor(r()*a.length)];
const SKIN=['#6f7d8b','#76846f','#8a8078','#738190','#7c8583'];
const TOP=['#7a3b3b','#3f5f7a','#6b6f3f','#8a7a4a','#4a4a6b','#7d5a3a','#5a7a6b','#8b8f98','#a0524a'];
const BOT=['#2b3646','#3a3530','#4a4f5a','#2f3b2f','#4a3a3a','#5a4a3a'];
const HAIR=['#1b1410','#3a2a1c','#6e6a64','#c9c6c0','#5a3a22'];
const SHOE=['#2a2220','#6b4a3a','#d9d6cf','#3a4a6b'];
function qpt(p0,p1,p2,t){const a=(1-t)*(1-t),b=2*(1-t)*t,c=t*t;return[a*p0[0]+b*p1[0]+c*p2[0],a*p0[1]+b*p1[1]+c*p2[1]]}
function sub(p0,p1,p2,t){const m1=[p0[0]+(p1[0]-p0[0])*t,p0[1]+(p1[1]-p0[1])*t],m2=[p1[0]+(p2[0]-p1[0])*t,p1[1]+(p2[1]-p1[1])*t];return[p0,m1,[m1[0]+(m2[0]-m1[0])*t,m1[1]+(m2[1]-m1[1])*t]]}
const qd=q=>`M${q[0][0]} ${q[0][1]} Q${q[1][0]} ${q[1][1]} ${q[2][0]} ${q[2][1]}`;
function zig(x1,x2,y,n,amp,rev){let d='';const st=(x2-x1)/n;for(let i=0;i<=n;i++){const x=x1+st*i,yy=y+(i%2?amp:0);d+=(i?' L':'M')+x+' '+yy}return d}
function blob(g,cx,cy,r,seed){const R=rng(seed||7);let d='';const n=7;for(let i=0;i<n;i++){const a=i/n*6.283,rr=r*(.6+R()*.6);d+=(i?' L':'M')+(cx+Math.cos(a)*rr)+' '+(cy+Math.sin(a)*rr*.9)}d+='Z';el(g,'path',{d:d,fill:BLOOD,stroke:'none',opacity:.92});el(g,'circle',{cx:cx-r*.2,cy:cy-r*.2,r:r*.18,fill:BLOOD2,opacity:.8})}
function drip(g,x,y,len){el(g,'path',{d:`M${x} ${y} v${len}`,stroke:BLOOD,'stroke-width':7,'stroke-linecap':'round'});el(g,'circle',{cx:x,cy:y+len,r:6,fill:BLOOD})}
function draw(parent,o,x,y,sc){
 const g=el(parent,'g',{transform:`translate(${x||0} ${y||0}) scale(${sc||1})`});
 const h=o.h||1,w=o.w||1,hs=o.hs||1,skin=o.skin||SKIN[0];
 const L=230*h,T=190*h,hipY=-L,shY=hipY-T,hr=64*hs,headCY=shY-34-hr;
 const tw=70*w,hw=(o.belly?100:78)*w,lw=40*Math.sqrt(w),lo=26*w;
 const bot=o.bottom||{color:BOT[0],type:'pants'},top=o.top||{color:TOP[0]};
 // bacaklar
 [-1,1].forEach(d=>{
  if(bot.type==='skirt'){el(g,'rect',{x:d>0?lo-lw/2:-lo-lw/2,y:-130,width:lw,height:120,fill:skin,stroke:O,'stroke-width':9})}
  else{const x1=d*lo-lw/2,x2=d*lo+lw/2;
   el(g,'rect',{x:x1,y:-70,width:lw,height:62,fill:skin,stroke:O,'stroke-width':9});
   el(g,'path',{d:`M${x1} ${hipY} H${x2} V-62 ${zig(x2,x1,-62,5,16).replace('M','L')} Z`,fill:bot.color,stroke:O,'stroke-width':9,'stroke-linejoin':'round'})}
  const bare=o.shoes==='bare'||(o.shoes==='one'&&d<0);
  el(g,'ellipse',{cx:d*lo*1.1,cy:-9,rx:lw*.62+14,ry:19,fill:bare?skin:(o.shoeColor||SHOE[1]),stroke:O,'stroke-width':9});
  if(bare)for(let t=-1;t<=1;t++)el(g,'path',{d:`M${d*lo*1.1+t*12} -2 v6`,stroke:O,'stroke-width':5,'stroke-linecap':'round'})});
 // gövde: ten + gömlek (yırtık etek)
 const torso=`M${-hw} ${hipY} Q${-tw-14} ${(shY+hipY)/2} ${-tw} ${shY+10} Q0 ${shY-28} ${tw} ${shY+10} Q${tw+14} ${(shY+hipY)/2} ${hw} ${hipY} Z`;
 el(g,'path',{d:torso,fill:skin,stroke:O,'stroke-width':11,'stroke-linejoin':'round'});
 const cid='k'+Math.random().toString(36).slice(2,8),cp=el(el(g,'defs',{}),'clipPath',{id:cid});
 el(cp,'path',{d:`${torso}`});
 const hemY=hipY-(top.long?-24:34);
 const sg=el(g,'g',{'clip-path':`url(#${cid})`});
 el(sg,'path',{d:`M${-hw-30} ${shY-40} H${hw+30} V${hemY} ${zig(hw+30,-hw-30,hemY,8,16).replace('M','L')} Z`,fill:top.color});
 if(top.stripe)for(let i=0;i<10;i++)el(sg,'rect',{x:-hw-30,y:shY+i*(T/9),width:2*hw+60,height:10,fill:top.stripe});
 if(top.open){el(sg,'path',{d:`M0 ${shY} V${hipY}`,stroke:'#2a2420','stroke-width':6});for(let i=0;i<4;i++)el(sg,'circle',{cx:0,cy:shY+30+i*42*h,r:6,fill:'#d9d0b8'})}
 if(o.apron)el(sg,'path',{d:`M${-hw+14} ${shY+30} H${hw-14} V${hipY} H${-hw+14} Z`,fill:'#d9d6cf',stroke:'#8b8780','stroke-width':4});
 if(o.tie)el(sg,'path',{d:`M-12 ${shY+8} L12 ${shY+8} L8 ${shY+90} L0 ${shY+110} L-8 ${shY+90} Z`,fill:o.tie});
 (o.wounds||[]).forEach(wd=>{if(wd==='chest')blob(sg,-hw*.35,shY+T*.5,38,5);if(wd==='belly'){blob(sg,hw*.3,hipY-50,34,9)}});
 el(g,'path',{d:torso,fill:'none',stroke:O,'stroke-width':11,'stroke-linejoin':'round'});
 if(bot.type==='skirt')el(g,'path',{d:`M${-hw} ${hipY-10} H${hw} L${hw+22} -125 ${zig(hw+22,-hw-22,-125,8,18).replace('M','L')} Z`,fill:bot.color,stroke:O,'stroke-width':9,'stroke-linejoin':'round'});
 // kollar
 [-1,1].forEach(d=>{
  const p0=[d*(tw-4),shY+22],p1=[d*(tw+52*w),shY+120],p2=[d*(tw+20+8*w),hipY+80];
  const missing=(o.missing==='armL'&&d<0)||(o.missing==='armR'&&d>0);
  const tEnd=missing?.66:1;const arm=sub(p0,p1,p2,tEnd);
  el(g,'path',{d:qd(arm),fill:'none',stroke:O,'stroke-width':48,'stroke-linecap':'round'});
  el(g,'path',{d:qd(arm),fill:'none',stroke:skin,'stroke-width':32,'stroke-linecap':'round'});
  const sl=top.sleeve==='short'?.42:top.sleeve==='none'?0:.9;
  if(sl>0){const s2=sub(p0,p1,p2,Math.min(sl,tEnd));el(g,'path',{d:qd(s2),fill:'none',stroke:O,'stroke-width':52,'stroke-linecap':'round'});el(g,'path',{d:qd(s2),fill:'none',stroke:top.color,'stroke-width':36,'stroke-linecap':'round'})}
  if(missing){const e=qpt(p0,p1,p2,.66);blob(g,e[0],e[1],20,3);el(g,'path',{d:`M${e[0]-14} ${e[1]} l6 14 l8 -10 l8 12`,stroke:BLOOD,'stroke-width':6,fill:'none',stroke_linecap:'round'});drip(g,e[0],e[1]+8,26)}
  else{const e=p2;el(g,'circle',{cx:e[0],cy:e[1]+18,r:26,fill:skin,stroke:O,'stroke-width':9});for(let f=-1;f<=1;f++)el(g,'path',{d:`M${e[0]+f*10} ${e[1]+36} l${f*3} 22`,stroke:O,'stroke-width':8,'stroke-linecap':'round'})}
  if((o.wounds||[]).includes(d<0?'biteL':'biteR')){const b=qpt(p0,p1,p2,.55*tEnd);blob(g,b[0],b[1],17,11);for(let i=0;i<5;i++)el(g,'circle',{cx:b[0]-12+i*6,cy:b[1]-10+(i%2)*3,r:2.6,fill:'#2a0a0c'});drip(g,b[0]+5,b[1]+10,22)}
  if(o.keys&&d>0&&!missing){const kg=el(g,'g',{transform:`translate(${p2[0]} ${p2[1]+44})`});el(kg,'g',{'class':'keys'}).innerHTML=`<circle cx="0" cy="14" r="13" fill="none" stroke="#d7b24f" stroke-width="6"/><rect x="-14" y="26" width="10" height="34" rx="4" fill="#d7b24f" stroke="${O}" stroke-width="3" transform="rotate(-12 -9 26)"/><rect x="-5" y="28" width="10" height="38" rx="4" fill="#d7b24f" stroke="${O}" stroke-width="3"/><rect x="5" y="26" width="10" height="34" rx="4" fill="#d7b24f" stroke="${O}" stroke-width="3" transform="rotate(12 10 26)"/>`}
 });
 if(o.necklace)el(g,'path',{d:`M${-tw*.5} ${shY+4} Q0 ${shY+70} ${tw*.5} ${shY+4}`,fill:'none',stroke:'#c9a64a','stroke-width':5});
 // boyun + baş
 el(g,'rect',{x:-26,y:shY-44,width:52,height:54,fill:skin,stroke:O,'stroke-width':9});
 if((o.wounds||[]).includes('neck')){blob(g,-24,shY-16,22,2);drip(g,-18,shY-6,30)}
 const hd=el(g,'g',{class:'head',style:`transform-origin:0px ${shY}px`});
 const hc=o.hair||{type:'short',color:HAIR[1]};
 if(hc.type==='long')el(hd,'path',{d:`M${-hr-16} ${headCY} Q${-hr-30} ${headCY+hr*1.6} ${-hr+10} ${headCY+hr*1.7} L${hr-10} ${headCY+hr*1.7} Q${hr+30} ${headCY+hr*1.6} ${hr+16} ${headCY} Z`,fill:hc.color,stroke:O,'stroke-width':9,'stroke-linejoin':'round'});
 el(hd,'circle',{cx:-hr*.98,cy:headCY+6,r:hr*.3,fill:skin,stroke:O,'stroke-width':9});el(hd,'circle',{cx:hr*.98,cy:headCY+6,r:hr*.3,fill:skin,stroke:O,'stroke-width':9});
 el(hd,'ellipse',{cx:0,cy:headCY,rx:hr*.96,ry:hr*1.1,fill:skin,stroke:O,'stroke-width':11});
 if(hc.type==='short'||hc.type==='long')el(hd,'path',{d:`M${-hr*.96} ${headCY-hr*.2} Q${-hr*1.0} ${headCY-hr*1.12} 0 ${headCY-hr*1.14} Q${hr*1.0} ${headCY-hr*1.12} ${hr*.96} ${headCY-hr*.2} Q${hr*.5} ${headCY-hr*.7} 0 ${headCY-hr*.62} Q${-hr*.5} ${headCY-hr*.7} ${-hr*.96} ${headCY-hr*.2}Z`,fill:hc.color,stroke:O,'stroke-width':8,'stroke-linejoin':'round'});
 if(hc.type==='tuft'){[-1,1].forEach(d=>el(hd,'path',{d:`M${d*hr*.9} ${headCY-hr*.5} Q${d*hr*1.12} ${headCY-hr*.15} ${d*hr*.92} ${headCY+hr*.2}`,fill:'none',stroke:hc.color,'stroke-width':9,'stroke-linecap':'round'}));}
 if(o.cap)el(hd,'path',{d:`M${-hr*.98} ${headCY-hr*.35} Q0 ${headCY-hr*1.5} ${hr*.98} ${headCY-hr*.35} L${hr*1.35} ${headCY-hr*.2} L${-hr*.98} ${headCY-hr*.15}Z`,fill:o.cap,stroke:O,'stroke-width':8,'stroke-linejoin':'round'});
 const ex=hr*.42,ey=headCY-hr*.08,gc=o.glow||'#eaf4ff',sad=o.sad?hr*.05:0;
 [-1,1].forEach(d=>{el(hd,'ellipse',{cx:d*ex,cy:ey+sad,rx:hr*.36,ry:hr*.42,fill:'#0b141d'});el(hd,'circle',{cx:d*ex,cy:ey+sad,r:hr*.4,fill:gc,class:'glow',opacity:.3});el(hd,'circle',{cx:d*ex+(o.look||0),cy:ey+sad,r:hr*.14,fill:'#fff'})});
 if(o.brows){const bc=o.brows;[-1,1].forEach(d=>el(hd,'path',{d:`M${d*ex-d*hr*.34} ${ey-hr*.55+(o.sad?hr*.08:0)} Q${d*ex} ${ey-hr*.78} ${d*ex+d*hr*.34} ${ey-hr*.5-(o.sad?hr*.14:0)}`,fill:'none',stroke:bc,'stroke-width':hr*.15,'stroke-linecap':'round'}))}
 if(o.glasses){[-1,1].forEach(d=>el(hd,'circle',{cx:d*ex,cy:ey+sad,r:hr*.44,fill:'none',stroke:'#b5bdc7','stroke-width':6}));el(hd,'path',{d:`M${-ex+hr*.44} ${ey} H${ex-hr*.44}`,stroke:'#b5bdc7','stroke-width':6});if(o.glasses==='crack')el(hd,'path',{d:`M${-ex-hr*.3} ${ey-hr*.3} L${-ex+hr*.2} ${ey+hr*.32} M${-ex-hr*.05} ${ey-hr*.4} L${-ex-hr*.1} ${ey}`,fill:'none',stroke:'#fff','stroke-width':3.5,'stroke-linecap':'round'})}
 el(hd,'path',{d:`M${-hr*.12} ${headCY+hr*.1} Q0 ${headCY+hr*.32} ${hr*.12} ${headCY+hr*.1}`,fill:'none',stroke:O,'stroke-width':6,'stroke-linecap':'round'});
 const my=headCY+hr*.56;
 if(o.mustache)el(hd,'path',{d:`M${-hr*.5} ${my-hr*.16} Q${-hr*.2} ${my-hr*.42} 0 ${my-hr*.24} Q${hr*.2} ${my-hr*.42} ${hr*.5} ${my-hr*.16} Q${hr*.3} ${my+hr*.04} 0 ${my-hr*.06} Q${-hr*.3} ${my+hr*.04} ${-hr*.5} ${my-hr*.16}Z`,fill:o.mustache,stroke:O,'stroke-width':5,'stroke-linejoin':'round'});
 const mw=hr*(o.snarl?.46:.34);
 el(hd,'path',{d:`M${-mw} ${my} Q0 ${my+hr*(o.snarl?.7:.34)} ${mw} ${my} Q0 ${my-hr*.06} ${-mw} ${my}Z`,fill:'#1a0e10',stroke:O,'stroke-width':6,'stroke-linejoin':'round'});
 if(o.snarl)for(let i=-2;i<=2;i++)el(hd,'rect',{x:i*mw*.34-4,y:my-2,width:8,height:10,fill:'#e9e4d6'});
 (o.wounds||[]).forEach(wd=>{if(wd==='cheek'){el(hd,'path',{d:`M${hr*.3} ${headCY+hr*.1} l22 22 M${hr*.45} ${headCY+hr*.02} l20 24`,stroke:BLOOD,'stroke-width':6,'stroke-linecap':'round'})}if(wd==='head'){blob(hd,-hr*.5,headCY-hr*.5,20,4)}});
 return g}
// rastgele Sisli (çeşitlilik)
function random(seed){const r=rng(seed*7919+13),P=a=>pick(r,a);
 const female=r()<.4,build=r(),h=.8+r()*.4;
 const o={h:h,w:build<.25?.74:build>.78?1.4:.95+r()*.15,hs:.95+r()*.2,skin:P(SKIN),belly:build>.78,glow:P(['#eaf4ff','#eaf4ff','#ffe9a8','#ffc8b8']),
  top:{color:P(TOP),stripe:r()<.18?'#d9d0b8':null,sleeve:P(['long','long','short','none']),long:r()<.3,open:r()<.2},
  bottom:{color:P(BOT),type:female&&r()<.6?'skirt':'pants'},shoes:P(['bare','one','shoe','shoe']),shoeColor:P(SHOE),
  hair:{type:P(['bald','short','short','tuft','long']),color:P(HAIR)},look:(r()-.5)*5,sad:r()<.3,snarl:r()<.35,wounds:[],mustache:(!female&&r()<.3)?P(HAIR):null,glasses:r()<.15?P([true,'crack']):null,cap:r()<.12?P(TOP):null,tie:r()<.12?'#7a3b3b':null,apron:r()<.07};
 if(female&&o.hair.type==='bald')o.hair.type='long';
 const W=['chest','belly','biteL','biteR','neck','cheek','head'];const n=1+Math.floor(r()*3);for(let i=0;i<n;i++){const wd=P(W);if(!o.wounds.includes(wd))o.wounds.push(wd)}
 if(r()<.2)o.missing=P(['armL','armR']);
 return o}
const presets={
 ahmet:{h:.98,w:1.18,hs:1.05,skin:'#7b8791',belly:true,glow:'#eaf4ff',sad:true,look:2,glasses:'crack',mustache:'#d8d5cf',brows:'#b9b6b0',hair:{type:'tuft',color:'#c9c6c0'},top:{color:'#8f8566',open:true,sleeve:'long',long:true},bottom:{color:'#3b4b64',type:'pants'},shoes:'shoe',shoeColor:'#8a5a4a',keys:true,wounds:['neck']},
 cemal:{h:.86,w:1.4,hs:1.08,skin:'#7d8a78',belly:true,glow:'#ffe9a8',snarl:true,mustache:'#1b1410',brows:'#1b1410',hair:{type:'short',color:'#1b1410'},top:{color:'#5a7a6b',sleeve:'short'},apron:true,bottom:{color:'#3a3530',type:'pants'},shoes:'one',shoeColor:'#2a2220',wounds:['biteL','chest']},
 ayse:{h:1.14,w:.78,hs:.98,skin:'#8a8078',glow:'#ffc8b8',look:-2,hair:{type:'long',color:'#3a2a1c'},top:{color:'#4a8f90',sleeve:'short',long:false},bottom:{color:'#4a8f90',type:'skirt'},shoes:'bare',wounds:['chest','biteR'],missing:'armL',cap:'#e8eef2'}
};
root.Sisli={draw:draw,random:random,presets:presets};
})(typeof self!=='undefined'?self:this);
