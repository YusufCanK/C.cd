/* Kara Burun parçalı SVG rig'leri (Kat 9 rigs.js ile aynı API ve aynı çizim dili).
   Rigs.bekci(parent,{x,y,s,mood,anim})  Rigs.reis(parent,{...})  Rigs.golgesiz(parent,{...})
   Ağız: Rigs.mouth(rigGrubu, 0-3)  0 kapalı · 1 az açık · 2 açık · 3 "o"
   Her rig parçalıdır: .k-torso .k-armL .k-armR .k-head .k-feat .k-eyes .k-browL .k-browR .k-mouth
   Duygu: data-mood = calm | worried | scared (kaş ve göz pozisyonu CSS ile) */
(function(root){
const ns='http://www.w3.org/2000/svg';
function make(parent,html,x,y,s,cls){const g=document.createElementNS(ns,'g');g.setAttribute('transform',`translate(${x||0} ${y||0}) scale(${s||1})`);const i=document.createElementNS(ns,'g');i.setAttribute('class',cls);i.innerHTML=html;g.appendChild(i);parent.appendChild(g);return i}
const V0='<path class="m on" data-v="0" d="M-36 4 Q0 12 36 4"/>';
const MOUTH=(y,sc,fill,v0)=>`<g class="k-mouth" transform="translate(0 ${y}) scale(${sc})" stroke="#111" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" fill="none">${v0||V0}<path class="m" data-v="1" d="M-38 0 Q0 46 38 0 Q0 10 -38 0Z" fill="${fill}"/><path class="m" data-v="2" d="M-48 -4 Q0 84 48 -4 Q0 8 -48 -4Z" fill="${fill}"/><ellipse class="m" data-v="3" cx="0" cy="14" rx="21" ry="27" fill="${fill}"/></g>`;
const SKIN_B='#E3B48C',SKIN_R='#D9A07A',SKIN_G='#9db4b2';

/* ---------- BEKÇİ (sen): lacivert bere, koyu petrol paltosu, turuncu atkı, gaz feneri ---------- */
const BEKCI=`<g class="k-torso">
 <path d="M-230 1100 L-250 300 Q-240 230 -150 215 L150 215 Q240 230 250 300 L230 1100 Z" fill="#24535a" stroke="#111" stroke-width="10" stroke-linejoin="round"/>
 <path d="M-92 216 L0 340 L92 216" fill="#1b3f45" stroke="#111" stroke-width="9" stroke-linejoin="round"/>
 <path d="M0 340 L0 1100" stroke="#111" stroke-width="7"/>
 <g fill="#d9a441" stroke="#111" stroke-width="6"><circle cx="-24" cy="470" r="17"/><circle cx="-24" cy="580" r="17"/><circle cx="-24" cy="690" r="17"/></g>
 <path d="M-196 560 L-84 560 L-84 700 L-196 700 Z" fill="#1f474d" stroke="#111" stroke-width="8" stroke-linejoin="round"/>
 <path d="M-130 205 Q0 300 130 205 L140 268 Q0 360 -140 268 Z" fill="#ef7d32" stroke="#111" stroke-width="9" stroke-linejoin="round"/>
 <path d="M40 318 L98 520 L32 540 L2 340 Z" fill="#ef7d32" stroke="#111" stroke-width="9" stroke-linejoin="round"/>
 <path d="M52 380 L82 372 M60 430 L90 422" stroke="#c75f1d" stroke-width="7" stroke-linecap="round"/>
</g>
<g class="k-armL"><path d="M-300 270 Q-310 250 -250 245 L-200 270 L-215 760 L-300 760 Z" fill="#24535a" stroke="#111" stroke-width="10" stroke-linejoin="round"/><path d="M-298 730 L-216 730" stroke="#111" stroke-width="7"/><circle cx="-258" cy="800" r="40" fill="${SKIN_B}" stroke="#111" stroke-width="10"/></g>
<g class="k-armR"><path d="M300 270 Q310 250 250 245 L200 270 L215 760 L300 760 Z" fill="#24535a" stroke="#111" stroke-width="10" stroke-linejoin="round"/><path d="M298 730 L216 730" stroke="#111" stroke-width="7"/>
 <g class="k-lantern"><circle cx="258" cy="925" r="90" fill="#f6d56a" opacity=".22"/>
  <path d="M224 884 Q258 790 292 884" fill="none" stroke="#111" stroke-width="9" stroke-linecap="round"/>
  <path d="M212 878 L304 878 L288 850 L228 850 Z" fill="#2b2b30" stroke="#111" stroke-width="8" stroke-linejoin="round"/>
  <rect x="222" y="878" width="72" height="92" rx="10" fill="#f6d56a" stroke="#111" stroke-width="9"/>
  <path d="M258 892 Q238 924 258 954 Q278 924 258 892 Z" fill="#ef7d32" stroke="#111" stroke-width="4"/>
  <rect x="214" y="966" width="88" height="18" rx="7" fill="#2b2b30" stroke="#111" stroke-width="7"/></g>
 <circle cx="258" cy="800" r="40" fill="${SKIN_B}" stroke="#111" stroke-width="10"/></g>
<g class="k-head">
 <rect x="-46" y="150" width="92" height="80" fill="${SKIN_B}" stroke="#111" stroke-width="10"/>
 <circle cx="-190" cy="15" r="40" fill="${SKIN_B}" stroke="#111" stroke-width="10"/><circle cx="190" cy="15" r="40" fill="${SKIN_B}" stroke="#111" stroke-width="10"/>
 <ellipse cx="0" cy="0" rx="190" ry="185" fill="${SKIN_B}" stroke="#111" stroke-width="10"/>
 <path d="M-184 -96 C-196 -300 196 -300 184 -96 Z" fill="#1d2b4a" stroke="#111" stroke-width="10" stroke-linejoin="round"/>
 <path d="M-110 -150 Q-118 -190 -92 -214 M0 -160 L0 -236 M110 -150 Q118 -190 92 -214" fill="none" stroke="#2c3e66" stroke-width="9" stroke-linecap="round"/>
 <rect x="-198" y="-140" width="396" height="48" rx="24" fill="#5b6b7a" stroke="#111" stroke-width="10"/>
 <g class="k-feat">
  <ellipse cx="-80" cy="22" rx="42" ry="14" fill="#c98a5c" opacity=".5"/><ellipse cx="80" cy="22" rx="42" ry="14" fill="#c98a5c" opacity=".5"/>
  <g class="k-eyes"><g class="eye"><circle cx="-80" cy="-5" r="17" fill="#111"/><circle cx="-74" cy="-11" r="5" fill="#fff"/></g><g class="eye"><circle cx="80" cy="-5" r="17" fill="#111"/><circle cx="86" cy="-11" r="5" fill="#fff"/></g></g>
  <g class="k-browL"><rect x="-135" y="-70" width="100" height="24" rx="12" fill="#2a1a10" stroke="#111" stroke-width="5"/></g>
  <g class="k-browR"><rect x="35" y="-70" width="100" height="24" rx="12" fill="#2a1a10" stroke="#111" stroke-width="5"/></g>
  <ellipse cx="0" cy="48" rx="26" ry="21" fill="#CF9568" stroke="#111" stroke-width="7"/>
  ${MOUTH(108,1,'#7a2b2b')}
 </g>
</g>`;

/* ---------- REİS RIZA: siyah kasket, hardal muşamba, kalın beyaz bıyık, çay bardağı ---------- */
const REIS=`<g class="k-torso">
 <path d="M-250 1100 L-270 300 Q-260 230 -160 215 L160 215 Q260 230 270 300 L250 1100 Z" fill="#c9951a" stroke="#111" stroke-width="10" stroke-linejoin="round"/>
 <path d="M-110 218 L0 330 L110 218 L150 250 Q0 400 -150 250 Z" fill="#3b2f1a" stroke="#111" stroke-width="9" stroke-linejoin="round"/>
 <path d="M0 360 L0 1100" stroke="#111" stroke-width="7"/>
 <g fill="#2a2013" stroke="#111" stroke-width="6"><circle cx="-26" cy="470" r="18"/><circle cx="-26" cy="590" r="18"/><circle cx="-26" cy="710" r="18"/></g>
 <path d="M80 540 L220 540 L220 690 L80 690 Z" fill="#b5841a" stroke="#111" stroke-width="8" stroke-linejoin="round"/>
 <path d="M-170 300 Q-120 520 -150 700" fill="none" stroke="#a0720f" stroke-width="10" stroke-linecap="round"/>
</g>
<g class="k-armL"><path d="M-320 270 Q-330 250 -270 245 L-215 270 L-230 760 L-320 760 Z" fill="#c9951a" stroke="#111" stroke-width="10" stroke-linejoin="round"/><path d="M-318 730 L-231 730" stroke="#111" stroke-width="7"/><circle cx="-275" cy="800" r="42" fill="${SKIN_R}" stroke="#111" stroke-width="10"/></g>
<g class="k-armR"><path d="M320 270 Q330 250 270 245 L215 270 L230 760 L320 760 Z" fill="#c9951a" stroke="#111" stroke-width="10" stroke-linejoin="round"/><path d="M318 730 L231 730" stroke="#111" stroke-width="7"/>
 <circle cx="275" cy="812" r="42" fill="${SKIN_R}" stroke="#111" stroke-width="10"/>
 <g class="k-cay"><ellipse cx="275" cy="886" rx="58" ry="12" fill="#e9e4cf" stroke="#111" stroke-width="7"/>
  <path d="M244 784 Q244 814 254 838 Q258 866 258 876 L292 876 Q292 866 296 838 Q306 814 306 784 Z" fill="#b5432a" stroke="#111" stroke-width="8" stroke-linejoin="round" opacity=".95"/>
  <path d="M244 784 L306 784" stroke="#111" stroke-width="8" stroke-linecap="round"/>
  <path d="M262 790 Q270 760 262 736 M286 790 Q294 764 286 744" fill="none" stroke="#f1efe9" stroke-width="6" stroke-linecap="round" opacity=".8"/></g>
</g>
<g class="k-head">
 <circle cx="-190" cy="-10" r="46" fill="#eceae4" stroke="#111" stroke-width="10"/><circle cx="190" cy="-10" r="46" fill="#eceae4" stroke="#111" stroke-width="10"/>
 <rect x="-46" y="150" width="92" height="80" fill="${SKIN_R}" stroke="#111" stroke-width="10"/>
 <circle cx="-192" cy="40" r="38" fill="${SKIN_R}" stroke="#111" stroke-width="10"/><circle cx="192" cy="40" r="38" fill="${SKIN_R}" stroke="#111" stroke-width="10"/>
 <ellipse cx="0" cy="0" rx="190" ry="185" fill="${SKIN_R}" stroke="#111" stroke-width="10"/>
 <path d="M-184 -92 C-194 -252 194 -252 184 -92 Z" fill="#1a1c22" stroke="#111" stroke-width="10" stroke-linejoin="round"/>
 <circle cx="0" cy="-212" r="10" fill="#2f323b" stroke="#111" stroke-width="5"/>
 <path d="M-196 -100 Q0 -60 196 -100 L196 -74 Q0 -34 -196 -74 Z" fill="#2f323b" stroke="#111" stroke-width="10" stroke-linejoin="round"/>
 <g class="k-feat">
  <circle cx="-100" cy="48" r="26" fill="#c9684a" opacity=".45"/><circle cx="100" cy="48" r="26" fill="#c9684a" opacity=".45"/>
  <g class="k-eyes"><g class="eye"><circle cx="-76" cy="-6" r="14" fill="#111"/><circle cx="-71" cy="-11" r="4" fill="#fff"/></g><g class="eye"><circle cx="76" cy="-6" r="14" fill="#111"/><circle cx="81" cy="-11" r="4" fill="#fff"/></g></g>
  <path d="M-124 -4 L-150 -14 M-124 12 L-150 20 M124 -4 L150 -14 M124 12 L150 20" stroke="#8a5a35" stroke-width="6" stroke-linecap="round"/>
  <g class="k-browL"><rect x="-136" y="-72" width="104" height="30" rx="15" fill="#f1efe9" stroke="#111" stroke-width="6"/></g>
  <g class="k-browR"><rect x="32" y="-72" width="104" height="30" rx="15" fill="#f1efe9" stroke="#111" stroke-width="6"/></g>
  <ellipse cx="0" cy="48" rx="34" ry="28" fill="#C98A63" stroke="#111" stroke-width="7"/>
  <g fill="#9a9a96"><circle cx="-60" cy="168" r="4"/><circle cx="-30" cy="176" r="4"/><circle cx="0" cy="180" r="4"/><circle cx="30" cy="176" r="4"/><circle cx="60" cy="168" r="4"/></g>
  ${MOUTH(146,.8,'#7a2b2b')}
  <path class="k-mus" d="M0 80 Q-40 66 -95 80 Q-140 98 -128 142 Q-70 110 0 116 Q70 110 128 142 Q140 98 95 80 Q40 66 0 80 Z" fill="#f1efe9" stroke="#111" stroke-width="8" stroke-linejoin="round"/>
 </g>
</g>`;

/* ---------- GÖLGESİZ: solgun gri-yeşil, ıslak siyah saç, boş beyaz gözler, geniş sabit gülüş, damlayan su ---------- */
const GOLGESIZ=`<g class="k-torso">
 <path d="M-170 1100 L-190 300 Q-180 235 -110 218 L110 218 Q180 235 190 300 L170 1100 Z" fill="#3b4650" stroke="#111" stroke-width="10" stroke-linejoin="round"/>
 <path d="M-70 520 L-24 566 L-76 612 Z" fill="${SKIN_G}" stroke="#111" stroke-width="6" stroke-linejoin="round"/>
 <path d="M60 640 L110 690 L52 720 Z" fill="${SKIN_G}" stroke="#111" stroke-width="6" stroke-linejoin="round"/>
 <path d="M-150 250 Q-196 340 -148 430 Q-112 350 -134 262 Z" fill="#2e6b4f" stroke="#111" stroke-width="6" stroke-linejoin="round"/>
 <path d="M-150 440 Q-130 500 -154 560" fill="none" stroke="#2e6b4f" stroke-width="12" stroke-linecap="round"/>
 <path d="M-104 224 L0 300 L104 224" fill="none" stroke="#111" stroke-width="8" stroke-linejoin="round"/>
</g>
<g class="k-armL"><path d="M-250 280 Q-258 255 -200 250 L-165 275 L-185 780 L-255 780 Z" fill="#3b4650" stroke="#111" stroke-width="10" stroke-linejoin="round"/><ellipse cx="-220" cy="838" rx="34" ry="54" fill="${SKIN_G}" stroke="#111" stroke-width="10"/></g>
<g class="k-armR"><path d="M250 280 Q258 255 200 250 L165 275 L185 780 L255 780 Z" fill="#3b4650" stroke="#111" stroke-width="10" stroke-linejoin="round"/><ellipse cx="220" cy="838" rx="34" ry="54" fill="${SKIN_G}" stroke="#111" stroke-width="10"/></g>
<g class="k-head">
 <rect x="-34" y="160" width="68" height="90" fill="${SKIN_G}" stroke="#111" stroke-width="10"/>
 <circle cx="-172" cy="20" r="34" fill="${SKIN_G}" stroke="#111" stroke-width="10"/><circle cx="172" cy="20" r="34" fill="${SKIN_G}" stroke="#111" stroke-width="10"/>
 <ellipse cx="0" cy="-8" rx="176" ry="204" fill="${SKIN_G}" stroke="#111" stroke-width="10"/>
 <path d="M-176 10 Q-200 -215 0 -214 Q200 -215 176 10 Q158 -92 100 -118 Q0 -150 -100 -118 Q-158 -92 -176 10 Z" fill="#14181c" stroke="#111" stroke-width="10" stroke-linejoin="round"/>
 <path d="M-170 -30 Q-198 70 -176 170 Q-148 100 -150 0 Z" fill="#14181c" stroke="#111" stroke-width="8" stroke-linejoin="round"/>
 <path d="M170 -30 Q198 70 176 170 Q148 100 150 0 Z" fill="#14181c" stroke="#111" stroke-width="8" stroke-linejoin="round"/>
 <g class="k-feat">
  <ellipse cx="-72" cy="40" rx="46" ry="16" fill="#5d7977" opacity=".65"/><ellipse cx="72" cy="40" rx="46" ry="16" fill="#5d7977" opacity=".65"/>
  <g class="k-eyes"><g class="eye"><circle cx="-72" cy="-8" r="34" fill="#f3f6f4" stroke="#111" stroke-width="7"/><circle cx="-72" cy="-8" r="6" fill="#111"/></g><g class="eye"><circle cx="72" cy="-8" r="34" fill="#f3f6f4" stroke="#111" stroke-width="7"/><circle cx="72" cy="-8" r="6" fill="#111"/></g></g>
  <g class="k-browL"><rect x="-122" y="-78" width="92" height="12" rx="6" fill="#14181c"/></g>
  <g class="k-browR"><rect x="30" y="-78" width="92" height="12" rx="6" fill="#14181c"/></g>
  <path d="M-9 52 L0 38 L9 52" fill="none" stroke="#111" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
  ${MOUTH(118,1.25,'#1c1218','<g class="m on" data-v="0"><path d="M-48 -2 Q0 40 48 -2 Q0 14 -48 -2 Z" fill="#1c1218"/><path d="M-34 4 V16 M-17 8 V22 M0 10 V24 M17 8 V22 M34 4 V16" stroke="#e9e4cf" stroke-width="5"/></g>')}
 </g>
 <g class="k-drips" fill="#9fc3c9" stroke="#111" stroke-width="4"><path class="drip d1" d="M-20 232 Q-30 252 -20 262 Q-10 252 -20 232 Z"/><path class="drip d2" d="M30 238 Q20 258 30 268 Q40 258 30 238 Z"/></g>
</g>`;

root.Rigs={
 bekci:(p,o)=>{o=o||{};const g=make(p,BEKCI,o.x,o.y,o.s,'karakter bekci '+(o.anim||''));g.setAttribute('data-mood',o.mood||'calm');return g},
 reis:(p,o)=>{o=o||{};const g=make(p,REIS,o.x,o.y,o.s,'karakter reis '+(o.anim||''));g.setAttribute('data-mood',o.mood||'calm');return g},
 golgesiz:(p,o)=>{o=o||{};const g=make(p,GOLGESIZ,o.x,o.y,o.s,'karakter golgesiz '+(o.anim||''));g.setAttribute('data-mood',o.mood||'calm');return g},
 mouth:(g,v)=>{g.querySelectorAll('.m').forEach(e=>e.classList.toggle('on',+e.dataset.v===v))}
};
})(typeof self!=='undefined'?self:this);
