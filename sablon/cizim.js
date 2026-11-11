/* Ortak çizim yardımcıları (SVG metni döndürür). Bölümlerden bağımsızdır; her bölümün sahne-cizim.js dosyası bunları kullanır.
   Düz 2D vektör, kalın siyah kontur, düz renkler (karakterler/stil.md). Tuval 1080×1920. */
(function(root){
function rng(seed){let s=seed>>>0;return()=>((s=(s*1664525+1013904223)>>>0)/4294967296)}
const P={ink:'#111',lamp:'#f6d56a',orange:'#ef7d32',cream:'#efe6cc',red:'#c4443a',wood:'#6b4a2c',navy:'#1d2b4a',teal:'#1f4a4f',slate:'#5b6b7a'};
const Cz={P,rng,
 txt(x,y,s,o){o=o||{};return `<text x="${x}" y="${y}" font-size="${o.size||40}" fill="${o.fill||'#fff'}" text-anchor="${o.anchor||'start'}" class="${o.cls||''}" ${o.extra||''}>${s}</text>`},
 duz(c){return `<rect width="1080" height="1920" fill="${c}"/>`},
 brick(c1,c2){let s=`<rect width="1080" height="1920" fill="${c1}"/>`;for(let y=0;y<1920;y+=96){s+=`<path d="M0 ${y}H1080" stroke="${c2}" stroke-width="5" opacity=".6"/>`;for(let x=((y/96)%2)*80;x<1080;x+=160)s+=`<path d="M${x} ${y}V${y+96}" stroke="${c2}" stroke-width="5" opacity=".6"/>`}return s},
 planks(c1,c2){let s=`<rect width="1080" height="1920" fill="${c1}"/>`;for(let x=0;x<1080;x+=135)s+=`<path d="M${x} 0V1920" stroke="${c2}" stroke-width="7" opacity=".7"/>`;return s},
 rain(n,seed){const r=rng(seed||7),tile=[];for(let i=0;i<n;i++)tile.push([r()*1180-50,r()*160]);let s='<g class="rain"><g opacity=".45" stroke="#b9d3e6" stroke-width="3" stroke-linecap="round">';for(let row=0;row<14;row++)tile.forEach(([x,y])=>{s+=`<path d="M${x.toFixed(0)} ${(y+row*160-160).toFixed(0)} l-8 40"/>`});return s+'</g></g>'},
 sea(y,c,wc){let s=`<rect y="${y}" width="1080" height="${1920-y}" fill="${c}"/>`;for(let i=0;i<7;i++){const yy=y+50+i*70;s+=`<path class="wv wv${i%2}" d="M-240 ${yy} q60 -24 120 0${' t120 0'.repeat(13)}" fill="none" stroke="${wc}" stroke-width="7" stroke-linecap="round" opacity="${(.5-i*.04).toFixed(2)}"/>`}return s},
 moon(x,y,r){return `<circle cx="${x}" cy="${y}" r="${r}" fill="#efe8cf" stroke="#111" stroke-width="8"/><circle cx="${x-r*.3}" cy="${y-r*.2}" r="${r*.18}" fill="#d9d1b4"/><circle cx="${x+r*.25}" cy="${y+r*.3}" r="${r*.13}" fill="#d9d1b4"/>`},
 /* fener kulesi. Lamba merkezi yerel (0,-618): Cz.lamba(x,y,s) */
 tower(x,y,s,on,id){return `<g ${id?`id="${id}"`:''} transform="translate(${x} ${y}) scale(${s})">
  <path d="M-300 0 Q-230 -70 -130 -55 L140 -55 Q240 -70 310 0 Z" fill="#26313c" stroke="#111" stroke-width="10" stroke-linejoin="round"/>
  <path d="M-92 -55 L-58 -540 L58 -540 L92 -55 Z" fill="#ece7d3"/>
  <path d="M-84 -150 L-76 -230 L76 -230 L84 -150 Z" fill="#c4443a"/><path d="M-68 -330 L-63 -410 L63 -410 L68 -330 Z" fill="#c4443a"/>
  <path d="M-92 -55 L-58 -540 L58 -540 L92 -55 Z" fill="none" stroke="#111" stroke-width="10" stroke-linejoin="round"/>
  <rect x="-100" y="-566" width="200" height="30" rx="8" fill="#2b2b30" stroke="#111" stroke-width="8"/>
  <rect x="-54" y="-670" width="108" height="104" fill="${on?'#f6d56a':'#1b2733'}" stroke="#111" stroke-width="9"/>
  <path d="M-54 -618 H54 M0 -670 V-566" stroke="#111" stroke-width="6"/>
  <path d="M-72 -670 L0 -750 L72 -670 Z" fill="#c4443a" stroke="#111" stroke-width="9" stroke-linejoin="round"/>
  <rect x="-26" y="-130" width="52" height="75" rx="26" fill="#5a4029" stroke="#111" stroke-width="7"/></g>`},
 lamba(x,y,s){return [x,y-618*s]},
 ray(lx,ly,ang,len,half,op,id){return `<path ${id?`id="${id}"`:''} d="M${lx} ${ly} L${lx+len} ${ly-half} L${lx+len} ${ly+half} Z" transform="rotate(${ang} ${lx} ${ly})" fill="#f6d56a" opacity="${op}"/>`},
 /* ahşap kapı + yuvarlak delik; delik merkezi (x+w/2, y+h*0.27) */
 kapi(x,y,w,h,id){let s=`<g ${id?`id="${id}"`:''} transform="translate(${x} ${y})"><rect width="${w}" height="${h}" fill="#6b4a2c" stroke="#111" stroke-width="12"/>`;for(let i=1;i<5;i++)s+=`<path d="M${w*i/5} 0V${h}" stroke="#4a3320" stroke-width="7"/>`;
  s+=`<rect x="0" y="${h*.16}" width="${w}" height="46" fill="#2b2b30" stroke="#111" stroke-width="8"/><rect x="0" y="${h*.72}" width="${w}" height="46" fill="#2b2b30" stroke="#111" stroke-width="8"/>`;
  for(let i=0;i<6;i++){s+=`<circle cx="${40+i*(w-80)/5}" cy="${h*.16+23}" r="9" fill="#8a8a92" stroke="#111" stroke-width="4"/><circle cx="${40+i*(w-80)/5}" cy="${h*.72+23}" r="9" fill="#8a8a92" stroke="#111" stroke-width="4"/>`}
  s+=`<circle cx="${w*.5}" cy="${h*.27}" r="104" fill="#2b2b30" stroke="#111" stroke-width="12"/><circle cx="${w*.5}" cy="${h*.27}" r="80" fill="#0a0f14" stroke="#111" stroke-width="8"/>`;
  s+=`<circle cx="${w*.84}" cy="${h*.55}" r="22" fill="#d9a441" stroke="#111" stroke-width="7"/></g>`;return s},
 /* telsiz: 800×560, merkez (0,0); id+'w' dalga formu, id+'g' ekran parıltısı */
 telsiz(id){let g='';for(let i=0;i<12;i++)g+=`<path d="M-350 ${-210+i*38} H-30" stroke="#111" stroke-width="7"/>`;
  return `<g id="${id}"><path d="M330 -280 L430 -540" stroke="#111" stroke-width="12" stroke-linecap="round"/><circle cx="430" cy="-545" r="14" fill="#c4443a" stroke="#111" stroke-width="6"/>
  <rect x="-400" y="-280" width="800" height="560" rx="46" fill="#4a4540" stroke="#111" stroke-width="12"/>
  <rect x="-370" y="-250" width="360" height="500" rx="24" fill="#2e2a27" stroke="#111" stroke-width="8"/>${g}
  <rect id="${id}g" x="30" y="-250" width="340" height="190" rx="14" fill="#0e2a1a" stroke="#111" stroke-width="10"/>
  <text x="200" y="-190" text-anchor="middle" font-size="46" font-weight="900" fill="#7dffa0">KANAL 16</text>
  <path id="${id}w" d="M60 -112 H340" fill="none" stroke="#7dffa0" stroke-width="7" stroke-linecap="round"/>
  <circle cx="110" cy="90" r="60" fill="#2b2b30" stroke="#111" stroke-width="10"/><path d="M110 90 L110 48" stroke="#d9a441" stroke-width="10" stroke-linecap="round"/>
  <circle cx="290" cy="90" r="60" fill="#2b2b30" stroke="#111" stroke-width="10"/><path d="M290 90 L322 66" stroke="#d9a441" stroke-width="10" stroke-linecap="round"/>
  <rect x="60" y="190" width="280" height="22" rx="8" fill="#2b2b30" stroke="#111" stroke-width="6"/></g>`},
 dalga(x0,x1,y,amp,t,sk){let d=`M${x0} ${y}`;const n=40;for(let i=1;i<=n;i++){const x=x0+(x1-x0)*i/n,e=Math.sin(i*.9+t*18)*Math.sin(i*.37+t*7)*amp*(sk===undefined?1:sk);d+=` L${x.toFixed(1)} ${(y+e).toFixed(1)}`}return d},
 saat(r,id){let s=`<circle r="${r}" fill="#efe6cc" stroke="#111" stroke-width="14"/>`;for(let i=0;i<12;i++){const a=i*Math.PI/6,x1=Math.sin(a)*(r-18),y1=-Math.cos(a)*(r-18),x2=Math.sin(a)*(r-(i%3?46:70)),y2=-Math.cos(a)*(r-(i%3?46:70));s+=`<path d="M${x1.toFixed(1)} ${y1.toFixed(1)} L${x2.toFixed(1)} ${y2.toFixed(1)}" stroke="#111" stroke-width="${i%3?8:14}" stroke-linecap="round"/>`}
  return `<g id="${id}">${s}<g id="${id}h"><path d="M0 0 V${-r*.5}" stroke="#111" stroke-width="22" stroke-linecap="round"/></g><g id="${id}m"><path d="M0 0 V${-r*.78}" stroke="#111" stroke-width="14" stroke-linecap="round"/></g><g id="${id}s"><path d="M0 24 V${-r*.85}" stroke="#c4443a" stroke-width="7" stroke-linecap="round"/></g><circle r="20" fill="#111"/></g>`},
 /* yırtık kenar noktaları (defter ve kâğıt için ortak) */
 ZZ:[[0,0],[40,34],[80,6],[120,40],[160,10],[200,44],[240,14],[280,40]]
};
root.Cz=Cz;
})(typeof self!=='undefined'?self:this);
