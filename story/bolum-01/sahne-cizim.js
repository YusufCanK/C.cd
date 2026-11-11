/* Kara Burun Bölüm 1: sahne çizimleri ve kancaları (bu bölüme ait; ortak yardımcılar sablon/cizim.js, rig'ler sablon/rigs.js).
   BOLUM.sahne[id] = {zoom:[z0,z1,cx,cy], ciz(g,sc), hook(lt,sc,g), agiz(v)}  (sahne id'leri sahneler.json ile aynı) */
(function(){
const S=(window.BOLUM=window.BOLUM||{sahne:{}}).sahne,$=id=>document.getElementById(id),P=Cz.P;
const clamp=(x,a,b)=>Math.max(a,Math.min(b,x)),fade=(id,lt,t0,d)=>{const e=$(id);if(e)e.setAttribute('opacity',clamp((lt-t0)/(d||.35),0,1))};
const ease=x=>x<0?0:x>1?1:x*x*(3-2*x);
/* anahtar kare ara değeri: K=[[t,{alan:değer}],…]; sayılar yumuşak geçer, metin/bool alanlar sonraki karede değişir */
const kf=(K,t)=>{if(t<=K[0][0])return Object.assign({},K[0][1]);for(let i=1;i<K.length;i++)if(t<=K[i][0]){const[t0,a]=K[i-1],[t1,b]=K[i],u=ease((t-t0)/(t1-t0)),o={};Object.keys(b).forEach(k=>{const av=a[k]!==undefined?a[k]:b[k];o[k]=typeof b[k]==='number'?av+(b[k]-av)*u:(u>=1?b[k]:av)});return o}return Object.assign({},K[K.length-1][1])};
const stars=(n,seed,ymax)=>{const r=Cz.rng(seed);let s='<g fill="#dfe8f2">';for(let i=0;i<n;i++)s+=`<circle cx="${(r()*1080).toFixed(0)}" cy="${(r()*ymax).toFixed(0)}" r="${(1.5+r()*2.5).toFixed(1)}" opacity="${(.4+r()*.5).toFixed(2)}"/>`;return s+'</g>'};
const masa=(y,buhar)=>`<rect y="${y}" width="1080" height="${1920-y}" fill="#3a2a1b"/><path d="M0 ${y}H1080" stroke="#111" stroke-width="10"/><path d="M0 ${y+130}H1080 M0 ${y+270}H1080" stroke="#2a1d12" stroke-width="7"/>`+Cz.defterK(520,y+190,1.5,-3)+Cz.gaz(1000,y+110,1)+Cz.bardak(110,y+110,1.25,buhar);
const kapiDuvari=()=>Cz.cerceve(70,470,160,200)+Cz.yagmurluk(930,500,.9)+Cz.cizme(880,1425,.6)+Cz.orumcek(1080,0,1,true);
const knock=(lt,ts,id,cx,cy,glow)=>{let dx=0,gl=.12;ts.forEach(t=>{const d=lt-t;if(d>0&&d<.3){dx+=Math.sin(d*70)*9*(1-d/.3);gl=Math.max(gl,.6*(1-d/.3))}});const k=$(id);if(k)k.setAttribute('transform',`translate(${cx+dx} ${cy})`);const e=$(glow);if(e)e.setAttribute('opacity',gl)};

/* S1: HOOK, telsiz */
S[1]={zoom:[1,1.12,540,880],
 ciz(g){g.innerHTML=Cz.duz('#0c141b')+Cz.takvim(170,420,.9)+Cz.anahtar(360,440,1)+`<g transform="translate(540 880) scale(1.2)">${Cz.telsiz('r1')}</g>`+masa(1216,true)+Cz.rain(22,3)},
 hook(lt){$('r1w').setAttribute('d',Cz.dalga(60,340,-112,42,lt));$('r1g').setAttribute('fill',Math.floor(lt*9)%3===0?'#144a2c':'#0e2a1a')}};

/* S2: HOOK, kapıdaki vuruş */
S[2]={zoom:[1,1.08,540,700],
 ciz(g){g.innerHTML=Cz.brick('#16262b','#0d181b')+`<rect y="1420" width="1080" height="500" fill="#2a1d12"/><path d="M0 1420H1080" stroke="#111" stroke-width="10"/>
  <circle cx="140" cy="905" r="190" fill="${P.lamp}" opacity=".10"/><rect x="108" y="860" width="64" height="90" rx="12" fill="${P.lamp}" stroke="#111" stroke-width="8"/>`+kapiDuvari()+Cz.kapi(290,300,500,1120,'k2')+`<circle id="dl2" cx="540" cy="602" r="76" fill="#e8c76a" opacity=".12"/>`},
 hook(lt){knock(lt,[1.2,2.3,3.4],'k2',290,300,'dl2')}};

/* S3: başlık kartı */
S[3]={
 ciz(g){const l=Cz.lamba(540,1010,.5);g.innerHTML=Cz.duz('#070d12')+stars(50,3,950)+Cz.sea(1010,'#0e1c28','#2c4a60')+Cz.ray(l[0],l[1],0,520,60,.2)+Cz.ray(l[0],l[1],180,520,60,.2)+Cz.tower(540,1010,.5,true)+Cz.towerDetay(540,1010,.5)+Cz.kopuk(540,1012,330)+Cz.martiU(220,560,1.1)+Cz.martiU(330,640,.8)+Cz.martiU(850,590,1)+
  Cz.txt(540,1210,'KARA BURUN',{size:170,fill:P.lamp,anchor:'middle',extra:'stroke="#000" stroke-width="16" stroke-linejoin="round" paint-order="stroke fill" font-weight="900" textLength="900" lengthAdjust="spacingAndGlyphs"'})+
  Cz.txt(540,1330,'BÖLÜM 1 · İLK GECE',{size:66,fill:'#fff',anchor:'middle',extra:'stroke="#000" stroke-width="12" paint-order="stroke fill" letter-spacing="3"'})},
 hook(lt,sc,g){g.style.opacity=Math.min(1,lt/.25)*Math.min(1,(sc.sure-lt)/.25)}};

/* S4: ada ve iskele; Rıza tekneden iskeleye çıkar, bekçiye bagajı verir */
let rigR4,rigB4;
S[4]={zoom:[1,1.1,560,1050],
 ciz(g){
  g.innerHTML=Cz.duz('#56667a')+`<rect y="560" width="1080" height="420" fill="#6b7b8c" opacity=".55"/><rect y="760" width="1080" height="220" fill="#7d8c9b" opacity=".5"/>`+Cz.sea(980,'#27394a','#4e6b82')+Cz.kasaba(740,985,.9)+Cz.tower(560,1180,1.0,false)+Cz.towerDetay(560,1180,1.0)+Cz.martiU(250,520,1.1)+Cz.martiU(380,590,.8)+Cz.martiU(880,470,1.2)+Cz.samandira(130,1260,22,'#ef7d32')+Cz.samandira(960,1230,18,'#c4443a');
  g.insertAdjacentHTML('beforeend',`<path d="M40 1540 L470 1540 L420 1670 L100 1670 Z" fill="#8a3a2a" stroke="#111" stroke-width="10" stroke-linejoin="round"/><path d="M60 1580 H452" stroke="#efe6cc" stroke-width="12"/>
   <path d="M470 1480 L1080 1480 L1080 1560 L390 1560 Z" fill="#9a7a50" stroke="#111" stroke-width="10" stroke-linejoin="round"/><path d="M390 1560 L1080 1560 L1080 1920 L300 1920 Z" fill="#5a4029" stroke="#111" stroke-width="10" stroke-linejoin="round"/>
   <path d="M560 1480 L500 1560 M700 1480 L650 1560 M840 1480 L800 1560 M980 1480 L950 1560" stroke="#6b4a2c" stroke-width="7"/><path d="M450 1700 H1080 M400 1820 H1080" stroke="#3a2a1b" stroke-width="7"/><path d="M482 1496 Q448 1518 456 1546" fill="none" stroke="#d9c9a0" stroke-width="9" stroke-linecap="round"/>`+
   Cz.sandik(410,1546,.6,true)+Cz.samandira(92,1518,26,'#ef7d32')+Cz.bitta(482,1500,.7)+Cz.martiO(482,1444,.7)+Cz.sandik(940,1542,.7,true)+Cz.varil(1032,1548,.7));
  rigR4=Rigs.reis(g,{x:0,y:0,s:.4});rigB4=Rigs.bekci(g,{x:0,y:0,s:.4});
  g.insertAdjacentHTML('beforeend','<g id="bag4"><rect x="-44" y="-32" width="88" height="64" rx="16" fill="#7a5230" stroke="#111" stroke-width="7"/><path d="M-26 -32 Q0 -62 26 -32" fill="none" stroke="#111" stroke-width="7"/><path d="M-44 -4 H44" stroke="#4a3320" stroke-width="6"/></g>');
 },
 hook(lt){
  /* Rıza: 0-3 sn teknede, 3-5,4 sn iskeleye yürür, sonra bekçiye bagajı verir */
  const u=ease((lt-3)/2.4),x=260+300*u,y=1042-20*ease((x-400)/90);
  rigR4.parentNode.setAttribute('transform',`translate(${x} ${y}) scale(.4)`);
  Rigs.poz(rigR4,{walk:lt>3&&lt<5.4,bas:lt>5.4?-4:0});
  const r=ease((lt-5.5)/.6);
  rigB4.parentNode.setAttribute('transform','translate(800 1012) scale(.4)');
  Rigs.poz(rigB4,{kolL:38*r,bas:lt>5.5?-3:0,bakis:lt>5.5?-10:0});
  const bx0=x-110,by0=y+350,k=ease((lt-5.6)/.9);
  $('bag4').setAttribute('transform',`translate(${bx0+(697-bx0)*k} ${by0+(1362-by0)*k-70*Math.sin(Math.PI*k)}) scale(.8)`)
 }};

/* S5: Reis Rıza konuşuyor */
let rigR;
S[5]={zoom:[1,1.06,540,700],
 ciz(g){g.innerHTML=Cz.duz('#5a6b7c')+`<rect y="1000" width="1080" height="920" fill="#27394a"/>`+Cz.kasaba(820,1000,.55)+Cz.martiU(200,560,1.2)+Cz.martiU(330,640,.9)+Cz.martiU(900,520,1)+`<g stroke="#111" stroke-width="10"><rect x="130" y="1060" width="46" height="280" fill="#6b4a2c"/><rect x="904" y="1060" width="46" height="280" fill="#6b4a2c"/></g><path d="M153 1110 Q540 1250 927 1110" fill="none" stroke="#d9c9a0" stroke-width="12"/><path d="M153 1140 V1170" stroke="#d9c9a0" stroke-width="7"/>`+Cz.samandira(153,1200,30,'#ef7d32')+Cz.martiO(927,1062,.9);rigR=Rigs.reis(g,{x:540,y:640,s:1})},
 agiz(v){Rigs.mouth(rigR,v)}};

/* S6: kural kâğıdı */
const RULES=[["Fener gün batımında yanar,","gün doğarken söner."],["Gece yarısından sonra","telsize cevap verme."],["Gece kapı çalarsa delikten bak.","Gölgesi yoksa açma."],["Kuleye çıkarken say: altmış bir.","Tutmazsa geri in."]];
S[6]={zoom:[1,1.08,540,900],
 ciz(g){let s=Cz.planks('#4b3a2a','#33271b')+`<g transform="translate(0 60) rotate(-1.2 540 800)"><path d="M150 380 H930 V1250 H150 Z" fill="#efe6cc" stroke="#111" stroke-width="10" stroke-linejoin="round"/>`+
  Cz.txt(540,470,'BEKÇİ KURALLARI',{size:56,fill:'#5a2a1a',anchor:'middle'})+`<path d="M230 492 H850" stroke="#5a2a1a" stroke-width="5"/>`;
  RULES.forEach((r,i)=>{const y=590+i*150;s+=`<g id="rl${i}" opacity="0">`+Cz.txt(190,y,(i+1)+'.',{size:56,fill:P.red,cls:'hand',extra:'font-weight="700"'})+Cz.txt(262,y,r[0],{size:38,fill:'#2a1a10',cls:'hand'})+Cz.txt(262,y+52,r[1],{size:38,fill:'#2a1a10',cls:'hand'})+'</g>'});
  s+=`<path d="M330 1128 L380 1152 L430 1124 L490 1158 L550 1126 L620 1162 L690 1130 L760 1160 L830 1128 L936 1152 V1262 H330 Z" fill="#4b3a2a" stroke="#111" stroke-width="8" stroke-linejoin="round"/>`;
  s+=`<g id="rl4" opacity="0">`+Cz.txt(190,1190,'5.',{size:56,fill:P.red,cls:'hand',extra:'font-weight="700"'})+'</g></g><circle cx="540" cy="432" r="22" fill="#c4443a" stroke="#111" stroke-width="7"/>';
  s+=Cz.anahtar(70,540,1)+Cz.takvim(950,520,.78)+`<rect y="1400" width="1080" height="34" fill="#6b4a2c" stroke="#111" stroke-width="8"/>`+Cz.gaz(95,1400,.6)+Cz.bardak(540,1400,1,true)+Cz.defterK(860,1380,1.1,2);
  g.innerHTML=s},
 hook(lt){[.6,1.9,3.2,4.5,5.8].forEach((t,i)=>fade('rl'+i,lt,t))}};

/* S7: Zeki Usta'nın defteri, yırtık parça yerine oturur */
const ZP=Cz.ZZ.map(([x,y])=>[640+x*240/280,440+y]);
S[7]={zoom:[1,1.1,540,860],
 ciz(g){const edge=ZP.map(p=>`L${p[0].toFixed(0)} ${p[1]}`).join(' ');
  let rule='';for(let y=520;y<1260;y+=60)rule+=`<path d="M120 ${y} H510" stroke="#cfc3a2" stroke-width="4"/>`;
  g.innerHTML=Cz.duz('#241810')+`<rect x="60" y="410" width="960" height="920" rx="24" fill="#4a3320" stroke="#111" stroke-width="12"/>
  <path d="M90 440 H540 V1300 H90 Z" fill="#efe6cc" stroke="#111" stroke-width="8"/>${rule}
  <path d="M540 440 H640 ${edge} L880 440 H990 V1300 H540 Z" fill="#efe6cc" stroke="#111" stroke-width="8" stroke-linejoin="round"/>
  <path d="M540 440 V1300" stroke="#111" stroke-width="10"/>`+
  `<g id="d7a" opacity="0">`+Cz.txt(600,540,'3 hafta önce',{size:36,fill:'#6a5a46',cls:'hand'})+`</g>`+
  `<g id="d7b" opacity="0">`+Cz.txt(600,700,"Kural 5'i yırtan",{size:50,fill:'#2a1a10',cls:'hand'})+Cz.txt(600,770,'benim.',{size:50,fill:'#2a1a10',cls:'hand'})+`</g>`+
  `<g id="d7c" opacity="0">`+Cz.txt(600,900,'Pişman değilim.',{size:50,fill:P.red,cls:'hand'})+`<path d="M600 916 H900" stroke="${P.red}" stroke-width="6" stroke-linecap="round"/></g>`+
  `<circle cx="320" cy="1080" r="48" fill="none" stroke="#b58a4a" stroke-width="9" opacity=".5"/><circle cx="320" cy="1080" r="30" fill="#b58a4a" opacity=".12"/><path d="M120 462 V500 Q120 512 132 512 Q144 512 144 500 V470" fill="none" stroke="#8a8a92" stroke-width="5"/>`+
  Cz.gaz(120,1430,.8)+`<g transform="translate(470 1390)"><circle cx="-34" r="26" fill="#cfe1ea" opacity=".6" stroke="#111" stroke-width="6"/><circle cx="34" r="26" fill="#cfe1ea" opacity=".6" stroke="#111" stroke-width="6"/><path d="M-8 -4 Q0 -10 8 -4 M-60 -6 L-86 -16 M60 -6 L86 -16" stroke="#111" stroke-width="6" fill="none" stroke-linecap="round"/></g><path d="M600 1420 L740 1385" stroke="#e0a53a" stroke-width="14" stroke-linecap="round"/><path d="M740 1385 L760 1380" stroke="#2a1a10" stroke-width="12" stroke-linecap="round"/><g transform="translate(880 1420)"><rect x="-34" y="-50" width="68" height="50" rx="10" fill="#1d2b4a" stroke="#111" stroke-width="7"/><rect x="-14" y="-72" width="28" height="22" fill="#2b2b30" stroke="#111" stroke-width="6"/><path d="M40 -10 L104 -86" stroke="#efe6cc" stroke-width="9" stroke-linecap="round"/></g>`+Cz.bardak(1000,1430,.8,false)+
  `<g id="pc7"><path d="M640 440 L880 440 ${[...ZP].reverse().map(p=>`L${p[0].toFixed(0)} ${p[1]}`).join(' ')} Z" fill="#efe6cc" stroke="#111" stroke-width="8" stroke-linejoin="round"/><path d="M670 458 h90 M790 458 h60" stroke="#6a5a46" stroke-width="5" stroke-linecap="round"/></g>`},
 hook(lt){fade('d7a',lt,.2);fade('d7b',lt,.7);fade('d7c',lt,1.6);const k=1-ease((lt-2.3)/1.1);$('pc7').setAttribute('transform',`translate(${-230*k} ${-280*k}) rotate(${-14*k} 760 440)`)}};

/* S8: merdiven sayımı ve lambanın yanması */
let rigB8;
S[8]={
 ciz(g){let st='M60 1920 V1760';for(let i=0;i<14;i++)st+=` h60 v-72`;st+=' V1920 Z';
  g.innerHTML=`<g id="ph8a">${Cz.brick('#16222b','#0d161c')}<path d="${st}" fill="#3b4650" stroke="#111" stroke-width="10" stroke-linejoin="round"/><path d="M90 1590 L930 590" stroke="#8a6a44" stroke-width="12" stroke-linecap="round"/><path d="M200 1500 V1620 M400 1330 V1450 M600 1160 V1280 M800 990 V1110" stroke="#8a6a44" stroke-width="9"/>${Cz.orumcek(1080,0,1,true)}${Cz.duvarLambasi(170,1000,1)}${Cz.duvarLambasi(910,650,1)}<g><circle cx="200" cy="520" r="112" fill="#2b2b30" stroke="#111" stroke-width="12"/><circle cx="200" cy="520" r="94" fill="#0b1424"/>${Cz.moon(236,486,26)}<path d="M106 570 Q150 546 200 570 T294 570" stroke="#2c4a60" stroke-width="7" fill="none"/><path d="M200 426 V614 M106 520 H294" stroke="#111" stroke-width="8"/></g>
   <rect x="520" y="420" width="320" height="200" rx="22" fill="#0b1217" stroke="${P.lamp}" stroke-width="8"/>${Cz.txt(680,468,'BASAMAK',{size:34,fill:'#c9d4de',anchor:'middle'})}${Cz.txt(680,578,'55',{size:120,fill:P.lamp,anchor:'middle',extra:'id="st8"'})}</g>
   <g id="ph8b" style="display:none">${Cz.duz('#0b121a')}<rect id="wm8" width="1080" height="1920" fill="#f6d56a" opacity="0"/>
   <circle id="gl8" cx="540" cy="900" r="10" fill="#f6d56a" opacity="0"/>
   <g id="ln8"><ellipse cx="540" cy="900" rx="270" ry="390" fill="#2a3a4a" stroke="#111" stroke-width="14"/><ellipse cx="540" cy="900" rx="200" ry="300" fill="none" stroke="#111" stroke-width="8"/><ellipse cx="540" cy="900" rx="120" ry="190" fill="none" stroke="#111" stroke-width="8"/><ellipse id="lc8" cx="540" cy="900" rx="50" ry="80" fill="#9fb8cc" stroke="#111" stroke-width="8"/><path d="M290 700 H790 M270 900 H810 M290 1100 H790" stroke="#111" stroke-width="6"/></g>
   <rect x="820" y="1180" width="160" height="260" rx="16" fill="#2b2b30" stroke="#111" stroke-width="10"/><g id="lv8" transform="rotate(-35 900 1320)"><path d="M900 1320 V1230" stroke="#c4443a" stroke-width="14" stroke-linecap="round"/><circle cx="900" cy="1226" r="22" fill="#c4443a" stroke="#111" stroke-width="6"/></g>
   <path d="M60 1560 H1020" stroke="#111" stroke-width="10"/><rect y="1560" width="1080" height="360" fill="#1b2733"/>
   <path d="M60 820 V560 Q135 470 210 560 V820 Z" fill="#0b1424" stroke="#111" stroke-width="12"/><path d="M135 480 V820 M60 650 H210" stroke="#111" stroke-width="8"/><path d="M870 820 V560 Q945 470 1020 560 V820 Z" fill="#0b1424" stroke="#111" stroke-width="12"/><path d="M945 480 V820 M870 650 H1020" stroke="#111" stroke-width="8"/>${Cz.moon(110,600,22)}<g fill="#dfe8f2"><circle cx="170" cy="700" r="3"/><circle cx="905" cy="620" r="3"/><circle cx="980" cy="740" r="3"/></g>
   ${Cz.teneke(770,1560,1)}${Cz.teneke(850,1560,.8)}</g>`;
  rigB8=Rigs.bekci(g,{x:0,y:0,s:.3,anim:'walk'})},
 hook(lt){const a=lt<4.6;$('ph8a').style.display=a?'inline':'none';$('ph8b').style.display=a?'none':'inline';
  if(a){const u=clamp(lt/4.2,0,1),i=4+8*u,k=Math.floor(i);rigB8.parentNode.setAttribute('transform',`translate(${100+k*60+30} ${1760-k*72-382}) scale(.3)`);$('st8').textContent=55+Math.min(6,Math.floor(lt/.7))}
  else{const t=lt-4.6;rigB8.classList.remove('walk');rigB8.parentNode.setAttribute('transform','translate(220 1180) scale(.34)');
   $('lv8').setAttribute('transform',`rotate(${-35+70*ease((t-.9)/.3)} 900 1320)`);const on=ease((t-1.5)/.5);
   $('lc8').setAttribute('fill',on>.1?P.lamp:'#9fb8cc');$('gl8').setAttribute('r',10+on*760);$('gl8').setAttribute('opacity',.55*on);$('wm8').setAttribute('opacity',.14*on)}}};

/* S9: zaman atlama */
S[9]={
 ciz(g){const l=Cz.lamba(250,1170,.55);g.innerHTML=Cz.duz('#0b1424')+stars(60,5,900)+`<g id="mo9">${Cz.moon(0,0,80)}</g>`+Cz.sea(1100,'#10212f','#2c4a60')+Cz.kasaba(820,1108,1.1)+`<g id="fb9"><g transform="translate(560 1190)"><path d="M-40 0 H40 L28 20 H-28 Z" fill="#18222c" stroke="#111" stroke-width="5"/><path d="M0 0 V-40" stroke="#111" stroke-width="5"/><circle cy="-44" r="7" fill="#f6d56a"/></g><g transform="translate(700 1230) scale(.8)"><path d="M-40 0 H40 L28 20 H-28 Z" fill="#18222c" stroke="#111" stroke-width="5"/><path d="M0 0 V-40" stroke="#111" stroke-width="5"/><circle cy="-44" r="7" fill="#f6d56a"/></g></g>`+Cz.samandira(430,1300,16,'#c4443a',true)+Cz.ray(l[0],l[1],14,900,70,.2,'by9')+Cz.tower(250,1170,.55,true)+
  `<g id="cl9" fill="#1c2c44" stroke="#111" stroke-width="6"><ellipse cx="300" cy="420" rx="170" ry="46"/><ellipse cx="780" cy="640" rx="210" ry="52"/></g>`},
 hook(lt,sc){const u=lt/sc.sure;$('mo9').setAttribute('transform',`translate(${920-u*760} ${760-420*Math.sin(Math.PI*u)})`);$('cl9').setAttribute('transform',`translate(${-u*260} 0)`);$('fb9').setAttribute('transform',`translate(${-u*150} 0)`);$('by9').setAttribute('transform',`rotate(${14+Math.sin(lt*3)*10} 250 ${1170-618*.55})`)}};

/* S10: tekne kurtarılıyor */
S[10]={
 ciz(g){const l=Cz.lamba(200,1180,.9);g.innerHTML=Cz.duz('#0b1424')+stars(50,9,800)+Cz.moon(880,330,70)+Cz.sea(1050,'#10212f','#2c4a60')+Cz.kasaba(930,1060,.85)+Cz.samandira(500,1330,18,'#c4443a',true)+Cz.ray(l[0],l[1],20,1300,60,.3,'by10')+Cz.tower(200,1180,.9,true)+Cz.towerDetay(200,1180,.9)+Cz.kopuk(200,1190,420)+
  `<g id="bt10" transform="translate(780 1220)"><path id="bth" d="M-90 0 L90 0 L62 52 L-62 52 Z" fill="#18222c" stroke="#111" stroke-width="8" stroke-linejoin="round"/><rect x="-30" y="-48" width="60" height="48" fill="#223040" stroke="#111" stroke-width="7"/><path d="M0 -48 V-110" stroke="#111" stroke-width="7"/><circle cx="0" cy="-116" r="12" fill="${P.lamp}"/><circle cx="0" cy="-116" r="40" fill="${P.lamp}" opacity=".18"/></g>`},
 hook(lt){const a=15+lt*14;$('by10').setAttribute('transform',`rotate(${a} 200 ${1180-618*.9})`);const lit=Math.abs(a-45.8)<9;$('bth').setAttribute('fill',lit?'#8a3a2a':'#18222c');const k=ease((lt-2)/1);$('bt10').setAttribute('transform',`translate(780 1220) rotate(${-14*(1-k)})`)}};

/* S11: kule dışarıdan */
S[11]={zoom:[1.12,1,540,900],
 ciz(g){const l=Cz.lamba(540,1500,1.3);g.innerHTML=Cz.duz('#0b1424')+stars(60,11,800)+Cz.moon(180,300,64)+Cz.sea(1380,'#10212f','#2c4a60')+Cz.ray(l[0],l[1],-4,1100,90,.28,'ba11')+Cz.ray(l[0],l[1],176,1100,90,.28,'bb11')+Cz.tower(540,1500,1.3,true)+Cz.towerDetay(540,1500,1.3)+Cz.kopuk(540,1500,700)+Cz.gaz(700,1490,.38)+Cz.sandik(380,1496,.7,true)+Cz.martiU(300,700,1.2)+Cz.martiU(790,560,1)+Cz.martiU(900,880,.9)+Cz.rain(18,13)},
 hook(lt){const l=Cz.lamba(540,1500,1.3),a=-14+lt*8;$('ba11').setAttribute('transform',`rotate(${a} ${l[0]} ${l[1]})`);$('bb11').setAttribute('transform',`rotate(${a+180} ${l[0]} ${l[1]})`)}};

/* S12: gece yarısı */
S[12]={zoom:[1,1.08,540,900],
 ciz(g){g.innerHTML=Cz.brick('#0f1a20','#0a1217')+Cz.orumcek(0,0,1,false)+Cz.orumcek(1080,0,1,true)+`<circle cx="540" cy="470" r="12" fill="#8a8a92" stroke="#111" stroke-width="6"/><path d="M540 480 V580" stroke="#8a8a92" stroke-width="10"/><rect y="1420" width="1080" height="34" fill="#6b4a2c" stroke="#111" stroke-width="8"/>`+Cz.gaz(180,1420,.9)+Cz.defterK(540,1400,1.3,0)+Cz.bardak(900,1420,1.1,false)+`<g transform="translate(540 900)">${Cz.saat(330,'ck')}</g><rect id="fl12" width="1080" height="1920" fill="#000" opacity="0"/>`},
 hook(lt){const m=-6*(1-ease((lt-1)/.5));$('ckm').setAttribute('transform',`rotate(${m})`);$('ckh').setAttribute('transform','rotate(0)');$('cks').setAttribute('transform',`rotate(${lt<1.5?-(1.5-lt)*60:(lt-1.5)*36})`);
  const f=(lt>2&&lt<2.15)||(lt>2.3&&lt<2.4)?.85:0;$('fl12').setAttribute('opacity',f)}};

/* S13: Zeki'nin sesi telsizden */
S[13]={zoom:[1,1.1,540,700],
 ciz(g){g.innerHTML=Cz.duz('#0c141b')+`<g transform="translate(540 700) scale(1.05)">${Cz.telsiz('r13')}</g>`+masa(994,false)+`
  <g id="bn13" opacity="0"><rect x="70" y="1060" width="940" height="200" rx="22" fill="#7a1d1d" stroke="#efe6cc" stroke-width="6"/>`+Cz.txt(540,1136,'KURAL 2: Gece yarısından sonra',{size:46,fill:'#fff',anchor:'middle',cls:'hand',extra:'font-weight="700"'})+Cz.txt(540,1204,'telsize cevap verme.',{size:46,fill:'#fff',anchor:'middle',cls:'hand',extra:'font-weight="700"'})+`</g>`+Cz.rain(18,21)},
 hook(lt){$('r13w').setAttribute('d',Cz.dalga(60,340,-112,46,lt+3));const e=$('bn13');e.setAttribute('opacity',clamp((lt-2.4)/.3,0,1));e.setAttribute('transform',`translate(0 ${(1-ease((lt-2.4)/.4))*60})`)}};

/* S14: kapı ve delik; bekçi kapıya döner, yaklaşır, feneri kaldırır; kamera deliğe girer; deliğin içinde Gölgesiz yüzü */
let rigB14;
const bz=o=>Object.assign({x:230,bas:0,bakis:0,kolL:0,kolR:0,mood:'worried',walk:false},o);
const B14=[[0,bz({})],[1.2,bz({})],[1.5,bz({bas:7,bakis:28,kolL:14,mood:'scared'})],[2.6,bz({bas:7,bakis:28,mood:'scared'})],[2.8,bz({bas:7,bakis:28,mood:'scared',walk:true})],[4.2,bz({x:400,bas:7,bakis:28,mood:'scared',walk:true})],[4.3,bz({x:400,bas:7,bakis:28,mood:'scared'})],[5.2,bz({x:400,bas:9,bakis:34,kolR:-55,mood:'scared'})],[8,bz({x:400,bas:9,bakis:34,kolR:-55,mood:'scared'})]];
S[14]={zoom:[1,2.7,540,602],
 ciz(g){g.innerHTML=Cz.brick('#16262b','#0d181b')+`<rect y="1420" width="1080" height="500" fill="#2a1d12"/><path d="M0 1420H1080" stroke="#111" stroke-width="10"/>`+kapiDuvari()+Cz.kapi(290,300,500,1120,'k14')+`<circle id="dl14" cx="540" cy="602" r="76" fill="#e8c76a" opacity=".12"/>
  <g id="ey14" opacity="0"><circle cx="512" cy="604" r="15" fill="#f3f6f4"/><circle cx="568" cy="604" r="15" fill="#f3f6f4"/><circle cx="512" cy="604" r="4" fill="#111"/><circle cx="568" cy="604" r="4" fill="#111"/></g><clipPath id="cp14"><circle cx="540" cy="602" r="80"/></clipPath><g id="fc14" clip-path="url(#cp14)" opacity="0"><rect x="450" y="512" width="180" height="180" fill="#0a0f14"/></g>`;
  Rigs.golgesiz(g.querySelector('#fc14'),{x:540,y:610,s:.36});rigB14=Rigs.bekci(g,{x:230,y:862,s:.55,mood:'worried'})},
 hook(lt){knock(lt,[1.4,2.6,3.8],'k14',290,300,'dl14');
  const p=kf(B14,lt);rigB14.parentNode.setAttribute('transform',`translate(${p.x} 862) scale(.55)`);Rigs.poz(rigB14,p);
  const face=lt>=7.0&&lt<7.6;$('fc14').setAttribute('opacity',face?1:0);$('ey14').setAttribute('opacity',face?0:clamp((lt-6.0)/.5,0,1)*.9)}};

/* S15: oylama kartı */
S[15]={
 ciz(g){g.innerHTML=Cz.brick('#10181d','#0a1013')+`<g opacity=".3">${kapiDuvari()}${Cz.kapi(290,300,500,1120)}</g><g id="cd15"><rect x="90" y="470" width="900" height="870" rx="44" fill="#efe6cc" stroke="#111" stroke-width="10"/>`+
  Cz.txt(540,578,'00:41 · KAPI ÇALIYOR',{size:46,fill:P.red,anchor:'middle'})+Cz.txt(540,716,'NE YAPARSIN?',{size:104,fill:'#1a1208',anchor:'middle'})+
  `<g id="ba15" opacity="0"><rect x="130" y="790" width="820" height="130" rx="26" fill="#2f9d57" stroke="#111" stroke-width="8"/><g transform="translate(205 855)"><ellipse rx="46" ry="28" fill="#fff" stroke="#111" stroke-width="6"/><circle r="16" fill="#111"/><circle cx="5" cy="-5" r="5" fill="#fff"/></g>${Cz.txt(540,880,'DELİKTEN BAK',{size:68,fill:'#fff',anchor:'middle'})}</g>`+
  `<g id="bb15" opacity="0"><rect x="130" y="950" width="820" height="130" rx="26" fill="#d6453a" stroke="#111" stroke-width="8"/><g transform="translate(205 1015)"><circle cx="-16" r="18" fill="none" stroke="#fff" stroke-width="9"/><path d="M2 0 H50 M34 0 V16 M50 0 V12" stroke="#fff" stroke-width="9" stroke-linecap="round"/></g>${Cz.txt(540,1040,'KAPIYI AÇ',{size:68,fill:'#fff',anchor:'middle'})}</g>`+
  `<g id="bt15" opacity="0">`+Cz.txt(540,1160,'Kapıdaki sence kim?',{size:46,fill:'#2a1a10',anchor:'middle',cls:'hand'})+Cz.txt(540,1230,'Seçimini yoruma yaz · Çoğunluk sonraki bölümü belirler',{size:27,fill:'#5a4a3a',anchor:'middle'})+`</g></g>
  <g id="fo15" opacity="0"><rect x="90" y="1380" width="900" height="110" rx="26" fill="#f6c63a" stroke="#111" stroke-width="8"/>${Cz.tower(150,1470,.09,true)}${Cz.txt(540,1452,'2. GECEYİ GÖRMEK İÇİN TAKİP ET',{size:44,fill:'#1a1208',anchor:'middle'})}</g>`},
 hook(lt){const k=ease(lt/.6);const c=$('cd15');c.setAttribute('transform',`translate(0 ${(1-k)*140})`);c.setAttribute('opacity',k);fade('ba15',lt,1.2);fade('bb15',lt,1.8);fade('bt15',lt,2.6);fade('fo15',lt,3.4)}};
})();
