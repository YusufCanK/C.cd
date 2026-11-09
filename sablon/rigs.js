/* Deniz ve Ela parçalı SVG rig'leri (yeniden kullanılabilir). Rigs.deniz(parent,{x,y,s,mood,anim}) / Rigs.ela(parent,{x,y,s,phase})
   Ağız: Rigs.mouth(rigGrubu, 0-3). Nefes animasyonu azaltıldı (kullanıcı kararı). */
(function(root){
const ns='http://www.w3.org/2000/svg';
function make(parent,html,x,y,s,cls){const g=document.createElementNS(ns,'g');g.setAttribute('transform',`translate(${x||0} ${y||0}) scale(${s||1})`);const i=document.createElementNS(ns,'g');i.setAttribute('class',cls);i.innerHTML=html;g.appendChild(i);parent.appendChild(g);return i}
const DENIZ=`<g class="d-torso">
 <ellipse cx="0" cy="205" rx="150" ry="62" fill="#2f3552" stroke="#111" stroke-width="10"/>
 <path d="M-230 1100 L-250 300 Q-240 230 -150 215 L150 215 Q240 230 250 300 L230 1100 Z" fill="#3b4160" stroke="#111" stroke-width="10" stroke-linejoin="round"/>
 <path d="M-250 300 Q-240 230 -150 215 L-42 215 L-32 1100 L-230 1100 Z" fill="#86835a" stroke="#111" stroke-width="10" stroke-linejoin="round"/>
 <path d="M250 300 Q240 230 150 215 L42 215 L32 1100 L230 1100 Z" fill="#86835a" stroke="#111" stroke-width="10" stroke-linejoin="round"/>
 <path d="M-120 220 Q-170 330 -200 440" fill="none" stroke="#6c6a47" stroke-width="12" stroke-linecap="round"/><path d="M120 220 Q170 330 200 440" fill="none" stroke="#6c6a47" stroke-width="12" stroke-linecap="round"/>
 <path d="M-42 215 L-32 1100 M42 215 L32 1100" stroke="#e9e4cf" stroke-width="7" stroke-dasharray="8 8"/>
 <path d="M-48 215 Q-52 340 0 372 Q52 340 48 215" fill="none" stroke="#5b3a20" stroke-width="9"/>
 <circle cx="0" cy="392" r="30" fill="#d9a441" stroke="#111" stroke-width="8"/><path d="M0 370 L0 414 M-22 392 L22 392" stroke="#111" stroke-width="5"/>
</g>
<g class="d-armL"><path d="M-300 270 Q-310 250 -250 245 L-200 270 L-215 760 L-300 760 Z" fill="#86835a" stroke="#111" stroke-width="10" stroke-linejoin="round"/><circle cx="-258" cy="800" r="40" fill="#E0A56B" stroke="#111" stroke-width="10"/></g>
<g class="d-armR"><path d="M300 270 Q310 250 250 245 L200 270 L215 760 L300 760 Z" fill="#86835a" stroke="#111" stroke-width="10" stroke-linejoin="round"/><circle cx="258" cy="800" r="40" fill="#E0A56B" stroke="#111" stroke-width="10"/></g>
<g class="d-head">
 <rect x="-46" y="150" width="92" height="80" fill="#E0A56B" stroke="#111" stroke-width="10"/>
 <g fill="#6B4A2F" stroke="#111" stroke-width="10"><circle cx="-170" cy="-60" r="62"/><circle cx="-120" cy="-140" r="64"/><circle cx="-40" cy="-185" r="66"/><circle cx="50" cy="-190" r="66"/><circle cx="130" cy="-145" r="64"/><circle cx="175" cy="-62" r="62"/></g>
 <circle cx="-190" cy="15" r="40" fill="#E0A56B" stroke="#111" stroke-width="10"/><circle cx="190" cy="15" r="40" fill="#E0A56B" stroke="#111" stroke-width="10"/>
 <ellipse cx="0" cy="0" rx="190" ry="185" fill="#E0A56B" stroke="#111" stroke-width="10"/>
 <g fill="#6B4A2F" stroke="#111" stroke-width="10"><circle cx="-105" cy="-135" r="48"/><circle cx="-35" cy="-150" r="50"/><circle cx="45" cy="-152" r="50"/><circle cx="112" cy="-130" r="48"/></g>
 <g fill="#6B4A2F"><circle cx="-105" cy="-135" r="43"/><circle cx="-35" cy="-150" r="45"/><circle cx="45" cy="-152" r="45"/><circle cx="112" cy="-130" r="43"/></g>
 <g class="d-feat">
  <g fill="#8a5a35"><circle cx="-110" cy="120" r="4"/><circle cx="-85" cy="140" r="4"/><circle cx="-55" cy="150" r="4"/><circle cx="-20" cy="156" r="4"/><circle cx="20" cy="156" r="4"/><circle cx="55" cy="150" r="4"/><circle cx="85" cy="140" r="4"/><circle cx="110" cy="120" r="4"/><circle cx="-130" cy="90" r="4"/><circle cx="130" cy="90" r="4"/><circle cx="-70" cy="118" r="4"/><circle cx="70" cy="118" r="4"/></g>
  <ellipse cx="-80" cy="22" rx="42" ry="14" fill="#b9794a" opacity=".55"/><ellipse cx="80" cy="22" rx="42" ry="14" fill="#b9794a" opacity=".55"/>
  <g class="d-eyes"><g class="eye"><circle cx="-80" cy="-5" r="17" fill="#111"/><circle cx="-74" cy="-11" r="5" fill="#fff"/></g><g class="eye"><circle cx="80" cy="-5" r="17" fill="#111"/><circle cx="86" cy="-11" r="5" fill="#fff"/></g></g>
  <g class="d-browL"><rect x="-135" y="-70" width="100" height="24" rx="12" fill="#2a1a10" stroke="#111" stroke-width="5"/><path d="M-118 -84 L-96 -40 M-102 -84 L-80 -40" stroke="#E0A56B" stroke-width="7" stroke-linecap="round"/></g>
  <g class="d-browR"><rect x="35" y="-70" width="100" height="24" rx="12" fill="#2a1a10" stroke="#111" stroke-width="5"/></g>
  <ellipse cx="0" cy="48" rx="30" ry="24" fill="#D48F5A" stroke="#111" stroke-width="7"/>
  <g class="d-mouth" transform="translate(0 108)" stroke="#111" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" fill="none">
   <path class="m on" data-v="0" d="M-36 4 Q0 12 36 4"/><path class="m" data-v="1" d="M-38 0 Q0 46 38 0 Q0 10 -38 0Z" fill="#7a2b2b"/><path class="m" data-v="2" d="M-48 -4 Q0 84 48 -4 Q0 8 -48 -4Z" fill="#7a2b2b"/><ellipse class="m" data-v="3" cx="0" cy="14" rx="21" ry="27" fill="#7a2b2b"/>
  </g>
 </g>
</g>`;
const ELA=`<g class="e-braidL"><g fill="#4a2f1c" stroke="#111" stroke-width="9"><ellipse cx="-205" cy="95" rx="36" ry="30"/><ellipse cx="-212" cy="148" rx="34" ry="28"/><ellipse cx="-206" cy="199" rx="32" ry="27"/></g><circle cx="-198" cy="52" r="20" fill="#ef8a3c" stroke="#111" stroke-width="7"/><circle cx="-204" cy="230" r="14" fill="#ef8a3c" stroke="#111" stroke-width="6"/></g>
<g class="e-braidR"><g fill="#4a2f1c" stroke="#111" stroke-width="9"><ellipse cx="205" cy="95" rx="36" ry="30"/><ellipse cx="212" cy="148" rx="34" ry="28"/><ellipse cx="206" cy="199" rx="32" ry="27"/></g><circle cx="198" cy="52" r="20" fill="#ef8a3c" stroke="#111" stroke-width="7"/><circle cx="204" cy="230" r="14" fill="#ef8a3c" stroke="#111" stroke-width="6"/></g>
<g class="e-torso"><ellipse cx="0" cy="210" rx="140" ry="56" fill="#d9a41f" stroke="#111" stroke-width="9"/>
 <path d="M-190 1100 L-205 300 Q-195 235 -120 220 L120 220 Q195 235 205 300 L190 1100 Z" fill="#f2c230" stroke="#111" stroke-width="10" stroke-linejoin="round"/>
 <path d="M-40 232 L-34 520 M40 232 L34 520" stroke="#b68a14" stroke-width="9" stroke-linecap="round"/><circle cx="-34" cy="528" r="9" fill="#e9e4cf" stroke="#111" stroke-width="4"/><circle cx="34" cy="528" r="9" fill="#e9e4cf" stroke="#111" stroke-width="4"/></g>
<g transform="rotate(-2 0 740)"><rect x="-230" y="560" width="460" height="400" rx="14" fill="#f5f1e4" stroke="#111" stroke-width="10"/><path d="M0 560 V960" stroke="#c9c2a8" stroke-width="5"/>
 <g stroke="#2a3b4a" stroke-width="9" stroke-linecap="round" fill="none"><circle cx="-120" cy="640" r="26" fill="#f5f1e4"/><path d="M-120 666 V800 M-120 690 L-158 760 M-120 690 L-82 760 M-120 800 L-150 900 M-120 800 L-90 900"/></g>
 <path d="M-132 632 q12 -22 28 0" stroke="#6B4A2F" stroke-width="9" fill="none" stroke-linecap="round"/>
 <g stroke="#2a3b4a" stroke-width="8" stroke-linecap="round" fill="none"><circle cx="60" cy="790" r="22" fill="#f5f1e4"/><path d="M60 812 V870 M60 826 L30 856 M60 826 L90 856 M60 870 L44 914 M60 870 L76 914"/></g>
 <path d="M30 790 q-18 6 -14 30 M90 790 q18 6 14 30" stroke="#ef8a3c" stroke-width="8" fill="none" stroke-linecap="round"/><path d="M-82 760 Q-10 740 38 830" stroke="#ef8a3c" stroke-width="6" fill="none" stroke-linecap="round" stroke-dasharray="2 12"/></g>
<g class="e-armL"><path d="M-270 290 Q-278 255 -205 250 L-165 280 L-175 650 L-260 650 Z" fill="#f2c230" stroke="#111" stroke-width="10" stroke-linejoin="round"/><circle cx="-205" cy="690" r="38" fill="#E0A56B" stroke="#111" stroke-width="10"/></g>
<g class="e-armR"><path d="M270 290 Q278 255 205 250 L165 280 L175 650 L260 650 Z" fill="#f2c230" stroke="#111" stroke-width="10" stroke-linejoin="round"/></g>
<g class="e-pen"><circle cx="190" cy="690" r="38" fill="#E0A56B" stroke="#111" stroke-width="10"/><rect x="176" y="650" width="22" height="120" rx="8" fill="#ef8a3c" stroke="#111" stroke-width="7" transform="rotate(14 187 710)"/></g>
<g class="e-head"><rect x="-44" y="150" width="88" height="80" fill="#E0A56B" stroke="#111" stroke-width="10"/>
 <ellipse cx="0" cy="-30" rx="198" ry="178" fill="#4a2f1c" stroke="#111" stroke-width="10"/>
 <circle cx="-186" cy="18" r="36" fill="#E0A56B" stroke="#111" stroke-width="10"/><circle cx="186" cy="18" r="36" fill="#E0A56B" stroke="#111" stroke-width="10"/>
 <ellipse cx="0" cy="5" rx="184" ry="178" fill="#E0A56B" stroke="#111" stroke-width="10"/>
 <path d="M-186 -10 Q-196 -176 0 -186 Q196 -176 186 -10 Q160 -112 50 -128 Q-72 -138 -186 -10 Z" fill="#4a2f1c" stroke="#111" stroke-width="10" stroke-linejoin="round"/><path d="M20 -176 Q10 -140 46 -126" stroke="#111" stroke-width="7" fill="none" stroke-linecap="round"/>
 <circle cx="-105" cy="62" r="26" fill="#e27a5a" opacity=".55"/><circle cx="105" cy="62" r="26" fill="#e27a5a" opacity=".55"/>
 <path d="M88 52 Q112 40 136 56" stroke="#ef8a3c" stroke-width="12" fill="none" stroke-linecap="round" opacity=".9"/><path d="M92 72 Q112 64 130 76" stroke="#ef8a3c" stroke-width="8" fill="none" stroke-linecap="round" opacity=".75"/>
 <g class="e-eyes"><g class="eye"><ellipse cx="-72" cy="-4" rx="21" ry="25" fill="#111"/><circle cx="-65" cy="-14" r="8" fill="#fff"/><circle cx="-80" cy="6" r="4" fill="#fff"/></g><g class="eye"><ellipse cx="72" cy="-4" rx="21" ry="25" fill="#111"/><circle cx="79" cy="-14" r="8" fill="#fff"/><circle cx="64" cy="6" r="4" fill="#fff"/></g></g>
 <g class="e-browL"><rect x="-122" y="-70" width="76" height="15" rx="8" fill="#2a1a10"/></g><g class="e-browR"><rect x="46" y="-70" width="76" height="15" rx="8" fill="#2a1a10"/></g>
 <path d="M-8 44 Q0 54 10 44" stroke="#111" stroke-width="6" fill="none" stroke-linecap="round"/>
 <g class="e-mouth" transform="translate(0 100)" stroke="#111" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" fill="none">
  <g class="m on" data-v="0"><g class="smile"><path d="M-34 0 Q0 24 34 0"/><rect x="-6" y="8" width="12" height="9" fill="#fff" stroke-width="4"/></g><path class="worry" d="M-26 12 Q-8 -2 0 4 Q8 -2 26 12"/></g>
  <path class="m" data-v="1" d="M-28 0 Q0 34 28 0 Q0 8 -28 0Z" fill="#7a2b2b"/><path class="m" data-v="2" d="M-36 -4 Q0 70 36 -4 Q0 6 -36 -4Z" fill="#7a2b2b"/><ellipse class="m" data-v="3" cx="0" cy="12" rx="17" ry="24" fill="#7a2b2b"/>
 </g></g>`;
root.Rigs={
 deniz:(p,o)=>{o=o||{};const g=make(p,DENIZ,o.x,o.y,o.s,'deniz '+(o.anim||''));g.setAttribute('data-mood',o.mood||'calm');return g},
 ela:(p,o)=>{o=o||{};const g=make(p,ELA,o.x,o.y,o.s,'ela '+(o.anim||''));g.setAttribute('data-phase',o.phase||0);return g},
 mouth:(g,v)=>{g.querySelectorAll('.m').forEach(e=>e.classList.toggle('on',+e.dataset.v===v))}
};
})(typeof self!=='undefined'?self:this);
