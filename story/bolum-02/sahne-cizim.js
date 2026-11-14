/* Kara Burun Bölüm 2 "Bakan": sahne çizimleri ve kancaları.
   Sahne 8, 9, 10, 11 Bölüm 1'in çizimlerini yeniden kullanır (sahneler.json -> "kutuphane": ["story/bolum-01"]).
   Ortak yardımcılar: sablon/cizim.js (Cz), karakterler: sablon/rigs.js (Rigs). */
(function(){
const S=(window.BOLUM=window.BOLUM||{sahne:{}}).sahne,$=id=>document.getElementById(id),P=Cz.P;
const clamp=(x,a,b)=>Math.max(a,Math.min(b,x)),ease=x=>x<0?0:x>1?1:x*x*(3-2*x);
const fade=(id,lt,t0,d)=>{const e=$(id);if(e)e.setAttribute('opacity',clamp((lt-t0)/(d||.35),0,1))};
const hx=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16));
const lerpC=(a,b,u)=>{const A=hx(a),B=hx(b);return '#'+A.map((v,i)=>Math.round(v+(B[i]-v)*clamp(u,0,1)).toString(16).padStart(2,'0')).join('')};
const stars=(n,seed,ymax)=>{const r=Cz.rng(seed);let s='<g fill="#dfe8f2">';for(let i=0;i<n;i++)s+=`<circle cx="${(r()*1080).toFixed(0)}" cy="${(r()*ymax).toFixed(0)}" r="${(1.5+r()*2.5).toFixed(1)}" opacity="${(.4+r()*.5).toFixed(2)}"/>`;return s+'</g>'};

/* ---- Bölüm 1'den yeniden kullanılan sahneler ---- */
const K=window.KUT['bolum-01'];
S[8]=K[8];     // lamba ritüeli (9 sn)
S[9]=K[9];     // zaman atlama (4 sn)
S[10]=K[12];   // gece yarısı saati
S[11]=K[13];   // telsiz + KURAL 2 banner

/* ---- S1: deliğin içinden Gölgesiz yüzü ---- */
let rigG1;
S[1]={zoom:[1,1.06,540,960],
 ciz(g){g.innerHTML=Cz.duz('#05080b')+`<g id="pt1"><circle cx="540" cy="960" r="420" fill="#2b2b30" stroke="#111" stroke-width="22"/><circle cx="540" cy="960" r="370" fill="#0a0f14" stroke="#111" stroke-width="12"/></g>
  <clipPath id="cp1"><circle cx="540" cy="960" r="366"/></clipPath><circle id="gl1" cx="540" cy="960" r="366" fill="#e8c76a" opacity=".1"/>
  <g id="ey1" opacity="0"><circle cx="478" cy="968" r="30" fill="#f3f6f4"/><circle cx="602" cy="968" r="30" fill="#f3f6f4"/><circle cx="478" cy="968" r="7" fill="#111"/><circle cx="602" cy="968" r="7" fill="#111"/></g>
  <g id="fc1" clip-path="url(#cp1)" opacity="0"></g>`+Cz.rain(18,31);
  rigG1=Rigs.golgesiz(g.querySelector('#fc1'),{x:540,y:968,s:.5})},
 hook(lt){const f=ease((lt-1.3)/.5);$('fc1').setAttribute('opacity',f);$('ey1').setAttribute('opacity',f>0?0:clamp((lt-.3)/.5,0,1)*.9);
  const s=.55+.5*ease((lt-1.3)/2.4);rigG1.parentNode.setAttribute('transform',`translate(540 ${960+8*s}) scale(${s})`);
  let dx=0,gl=.1;[3.0,3.5,4.0].forEach(t=>{const d=lt-t;if(d>0&&d<.25){dx+=Math.sin(d*90)*8*(1-d/.25);gl=Math.max(gl,.5*(1-d/.25))}});
  $('pt1').setAttribute('transform',`translate(${dx} 0)`);$('gl1').setAttribute('opacity',gl)}};

/* ---- S2: deliğin dışı, sundurma ve gölgesiz figür ---- */
let rigG2;
S[2]={zoom:[1,1.1,540,960],
 ciz(g){g.innerHTML=Cz.duz('#05080b')+`<clipPath id="cp2"><circle cx="540" cy="960" r="400"/></clipPath>
  <g clip-path="url(#cp2)"><rect x="100" y="540" width="880" height="470" fill="#0d1a2b"/>${stars(30,17,1000).replace(/cx="(\d+)"/g,(m,x)=>`cx="${140+(+x%800)}"`)}
   <rect x="100" y="900" width="880" height="100" fill="#10212f"/>
   <rect x="100" y="980" width="880" height="400" fill="#5a4029"/><path d="M100 1060 H980 M100 1150 H980 M100 1250 H980" stroke="#3a2a1b" stroke-width="6"/><path d="M300 980 L200 1380 M520 980 L480 1380 M740 980 L780 1380" stroke="#3a2a1b" stroke-width="6"/>
   <path d="M360 1180 L420 1180 L880 1270 L820 1270 Z" fill="#241810" opacity=".85"/>
   <ellipse cx="640" cy="1222" rx="92" ry="20" fill="#241810" opacity=".85"/>
   <rect x="360" y="600" width="60" height="580" fill="#6b4a2c" stroke="#111" stroke-width="9"/>`+
   Cz.varil(600,1210,.9)+Cz.gaz(240,980,.85)+`</g><circle cx="540" cy="960" r="400" fill="none" stroke="#111" stroke-width="30"/><circle cx="540" cy="960" r="430" fill="none" stroke="#2b2b30" stroke-width="26"/>`;
  rigG2=Rigs.golgesiz(g.querySelector('g'),{x:780,y:760,s:.42})},
 hook(lt){const t=ease((lt-3.4)/1.2);Rigs.poz(rigG2,{bas:-9*t,bakis:14*t,kolR:0})}};

/* ---- S3: şafağa kadar bekleyiş ---- */
let rigB3;
S[3]={
 ciz(g){g.innerHTML=Cz.brick('#16262b','#0d181b')+`<rect y="1420" width="1080" height="500" fill="#2a1d12"/><path d="M0 1420H1080" stroke="#111" stroke-width="10"/>`+Cz.cerceve(70,470,160,200)+Cz.simit(140,1130,44)+Cz.kova(930,1540,.8)+Cz.kapi(330,330,420,1090,'k3')+
  `<circle id="dl3" cx="540" cy="624" r="64" fill="#e8c76a" opacity=".12"/><circle cx="880" cy="330" r="100" fill="#2b2b30" stroke="#111" stroke-width="14"/><circle id="sk3" cx="880" cy="330" r="82" fill="#0b1424"/><path d="M880 248 V412 M798 330 H962" stroke="#111" stroke-width="8"/>`+Cz.toz(10,41,300,1300);
  rigB3=Rigs.bekci(g,{x:190,y:900,s:.5,mood:'worried'})},
 hook(lt,sc){const u=lt/sc.sure;$('sk3').setAttribute('fill',lerpC('#0b1424','#9db8cc',u));Rigs.poz(rigB3,{bas:6,bakis:30})}};

/* ---- S4: şafak, bekçi lambayı söndürür ---- */
let rigB4;
S[4]={
 ciz(g){g.innerHTML=Cz.duz('#0b121a')+`<path id="wa4" d="M60 820 V560 Q135 470 210 560 V820 Z" fill="#e9a46d" stroke="#111" stroke-width="12"/><path d="M135 480 V820 M60 650 H210" stroke="#111" stroke-width="8"/><path id="wb4" d="M870 820 V560 Q945 470 1020 560 V820 Z" fill="#e9a46d" stroke="#111" stroke-width="12"/><path d="M945 480 V820 M870 650 H1020" stroke="#111" stroke-width="8"/>
  <circle id="gl4" cx="540" cy="900" r="10" fill="#f6d56a" opacity="0"/>
  <g><ellipse cx="540" cy="900" rx="270" ry="390" fill="#2a3a4a" stroke="#111" stroke-width="14"/><ellipse cx="540" cy="900" rx="200" ry="300" fill="none" stroke="#111" stroke-width="8"/><ellipse cx="540" cy="900" rx="120" ry="190" fill="none" stroke="#111" stroke-width="8"/><ellipse id="lc4" cx="540" cy="900" rx="50" ry="80" fill="#f6d56a" stroke="#111" stroke-width="8"/><path d="M290 700 H790 M270 900 H810 M290 1100 H790" stroke="#111" stroke-width="6"/></g>
  <rect x="820" y="1180" width="160" height="260" rx="16" fill="#2b2b30" stroke="#111" stroke-width="10"/><g id="lv4" transform="rotate(35 900 1320)"><path d="M900 1320 V1230" stroke="#c4443a" stroke-width="14" stroke-linecap="round"/><circle cx="900" cy="1226" r="22" fill="#c4443a" stroke="#111" stroke-width="6"/></g>
  <path d="M60 1560 H1020" stroke="#111" stroke-width="10"/><rect y="1560" width="1080" height="360" fill="#1b2733"/>`+Cz.teneke(770,1560,1)+Cz.kova(930,1560,1)+Cz.takimTahtasi(70,860)+Cz.martiU(110,420,.7);
  rigB4=Rigs.bekci(g,{x:700,y:1210,s:.34})},
 hook(lt,sc){const u=lt/sc.sure,c=lerpC('#e9a46d','#a9d0ee',u*1.3);$('wa4').setAttribute('fill',c);$('wb4').setAttribute('fill',c);
  $('lv4').setAttribute('transform',`rotate(${35-70*ease((lt-2.2)/.4)} 900 1320)`);const off=ease((lt-2.8)/1.0);
  $('lc4').setAttribute('fill',off>.5?'#9fb8cc':P.lamp);$('gl4').setAttribute('r',10+(1-off)*760*(lt>=2.2?1:0));$('gl4').setAttribute('opacity',(lt<2.2?.0:.55*(1-off)));
  Rigs.poz(rigB4,{kolR:-40*ease((lt-1.8)/.4)*(lt<3.2?1:0),bas:0,bakis:-10})}};

/* ---- S5 / S7: telsiz + Rıza penceresi ---- */
function rizaPencere(g,idp,cx,cy,r,s){
 g.insertAdjacentHTML('beforeend',`<g id="pw${idp}"><circle cx="${cx}" cy="${cy}" r="${r+24}" fill="#6b4a2c" stroke="#111" stroke-width="14"/><clipPath id="cq${idp}"><circle cx="${cx}" cy="${cy}" r="${r}"/></clipPath><g id="pg${idp}" clip-path="url(#cq${idp})"><rect x="${cx-r}" y="${cy-r}" width="${2*r}" height="${2*r}" fill="#56667a"/><rect x="${cx-r}" y="${cy+r*.4}" width="${2*r}" height="${r}" fill="#27394a"/></g></g>`);
 return Rigs.reis(g.querySelector('#pg'+idp),{x:cx,y:cy-10,s,mood:'worried'});
}
let rigR5,ag5=0;
S[5]={zoom:[1,1.06,540,900],
 ciz(g){g.innerHTML=Cz.duz('#0c141b')+`<g transform="translate(540 1180) scale(1.0)">${Cz.telsiz('r5')}</g>`+Cz.rain(14,52);rigR5=rizaPencere(g,'5',720,620,230,.62)},
 agiz(v){Rigs.mouth(rigR5,v);ag5=v},
 hook(lt){$('r5w').setAttribute('d',Cz.dalga(60,340,-112,10+ag5*14,lt))}};
let rigR7,ag7=0;
S[7]={zoom:[1,1.05,540,900],
 ciz(g){g.innerHTML=Cz.duz('#0c141b')+`<g transform="translate(540 1180) scale(1.0)">${Cz.telsiz('r7')}</g>`;rigR7=rizaPencere(g,'7',720,620,230,.62)},
 agiz(v){Rigs.mouth(rigR7,v);ag7=v},
 hook(lt){const cut=ease((lt-2.6)/.6);$('pw7').setAttribute('opacity',1-cut);$('r7w').setAttribute('d',cut>=1?'M60 -112 H340':Cz.dalga(60,340,-112,(10+ag7*14)*(1-cut),lt))}};

/* ---- S6: bekçi telsize konuşuyor ---- */
let rigB6;
S[6]={zoom:[1,1.1,540,700],
 ciz(g){g.innerHTML=Cz.brick('#10181d','#0a1013')+`<rect y="1360" width="1080" height="560" fill="#3a2a1b"/><path d="M0 1360H1080" stroke="#111" stroke-width="10"/>`+Cz.gaz(150,1380,.9)+Cz.guve(190,1250)+Cz.bardak(930,1390,1.2,true)+Cz.takvim(110,420,.8);
  rigB6=Rigs.bekci(g,{x:540,y:700,s:1.05,mood:'scared'})},
 agiz(v){Rigs.mouth(rigB6,v)}};

/* ---- S12: bu benim sesim, tavandan adımlar ---- */
let rigB12;
S[12]={zoom:[1,1.15,540,760],
 ciz(g){g.innerHTML=Cz.brick('#0f171c','#080d10')+`<g transform="translate(790 250)"><rect x="-130" y="-70" width="260" height="140" fill="#4a3320" stroke="#111" stroke-width="10"/><path d="M-130 0 H130 M0 -70 V70" stroke="#2a1d12" stroke-width="6"/><circle cx="60" cy="30" r="16" fill="none" stroke="#8a8a92" stroke-width="8"/></g><g id="dust12" fill="#e8d9a8"><circle cx="730" cy="320" r="4"/><circle cx="780" cy="330" r="3"/><circle cx="840" cy="318" r="5"/><circle cx="880" cy="326" r="3"/></g>`+Cz.toz(10,61,300,1300);
  rigB12=Rigs.bekci(g,{x:540,y:860,s:1.3,mood:'scared'})},
 hook(lt){const t=ease((lt-.6)/1.0);Rigs.poz(rigB12,{bas:-8*t,bakis:0});
  let dy=0,op=0;[1.5,2.7].forEach(s=>{const d=lt-s;if(d>0&&d<1.1){dy=Math.max(dy,d*220);op=Math.max(op,1-d/1.1)}});
  const e=$('dust12');e.setAttribute('transform',`translate(0 ${dy})`);e.setAttribute('opacity',op)}};

/* ---- S13: oylama kartı ---- */
S[13]={
 ciz(g){g.innerHTML=Cz.brick('#10181d','#0a1013')+`<g opacity=".3">${Cz.kapi(290,300,500,1120)}</g><g id="cd13"><rect x="90" y="470" width="900" height="870" rx="44" fill="#efe6cc" stroke="#111" stroke-width="10"/>`+
  Cz.txt(540,578,'00:53 · TELSİZDE KENDİ SESİN',{size:44,fill:P.red,anchor:'middle',extra:'textLength="780" lengthAdjust="spacingAndGlyphs"'})+Cz.txt(540,716,'NE YAPARSIN?',{size:104,fill:'#1a1208',anchor:'middle'})+
  `<g id="ba13" opacity="0"><rect x="130" y="790" width="820" height="130" rx="26" fill="#2f9d57" stroke="#111" stroke-width="8"/><g transform="translate(215 855)"><rect x="-34" y="-22" width="68" height="44" rx="8" fill="#fff" stroke="#111" stroke-width="5"/><circle cx="-12" cy="0" r="12" fill="#111"/><path d="M12 -8 H26 M12 4 H26 M12 16 H22" stroke="#111" stroke-width="4"/><path d="M20 -22 L34 -46" stroke="#fff" stroke-width="6" stroke-linecap="round"/></g>${Cz.txt(560,880,'TELSİZE CEVAP VER',{size:62,fill:'#fff',anchor:'middle',extra:'textLength="560" lengthAdjust="spacingAndGlyphs"'})}</g>`+
  `<g id="bb13" opacity="0"><rect x="130" y="950" width="820" height="130" rx="26" fill="#d6453a" stroke="#111" stroke-width="8"/><g transform="translate(215 1015)"><circle r="26" fill="none" stroke="#fff" stroke-width="9"/><path d="M0 -38 V-6" stroke="#fff" stroke-width="9" stroke-linecap="round"/></g>${Cz.txt(560,1040,'TELSİZİ KAPAT',{size:62,fill:'#fff',anchor:'middle',extra:'textLength="500" lengthAdjust="spacingAndGlyphs"'})}</g>`+
  `<g id="bt13" opacity="0">`+Cz.txt(540,1160,'Kuledeki sence kim?',{size:46,fill:'#2a1a10',anchor:'middle',cls:'hand'})+Cz.txt(540,1230,'Seçimini yoruma yaz · Çoğunluk sonraki bölümü belirler',{size:27,fill:'#5a4a3a',anchor:'middle'})+`</g></g>
  <g id="fo13" opacity="0"><rect x="90" y="1380" width="900" height="110" rx="26" fill="#f6c63a" stroke="#111" stroke-width="8"/>${Cz.tower(150,1470,.09,true)}${Cz.txt(560,1452,'3. GECEYİ GÖRMEK İÇİN TAKİP ET',{size:44,fill:'#1a1208',anchor:'middle',extra:'textLength="740" lengthAdjust="spacingAndGlyphs"'})}</g>`},
 hook(lt){const k=ease(lt/.6),c=$('cd13');c.setAttribute('transform',`translate(0 ${(1-k)*140})`);c.setAttribute('opacity',k);fade('ba13',lt,1.2);fade('bb13',lt,1.8);fade('bt13',lt,2.6);fade('fo13',lt,3.4)}};
})();
