#!/usr/bin/env python3
"""prototip/bolum01.html şablonunu parçalarla birleştirip derlenmiş sayfayı üretir.
Kullanım: python3 sablon/bolum_derle.py story/bolum-01 prototip/bolum01.build.html"""
import re,sys,pathlib
k=pathlib.Path(__file__).resolve().parent.parent
B=pathlib.Path(sys.argv[1]);out=sys.argv[2]
t=(k/'prototip'/'bolum01.html').read_text()
P=k/'prototip'/'parca'/B.name
if P.exists():  # bölüme özel parçalar: prototip/parca/bolum-NN/{sahneler.svg.html, sahneler.js, stil.css}
    oku=lambda f:(P/f).read_text() if (P/f).exists() else ''
    t=t.replace('<!--SAHNE123-->','').replace('<!--JS123-->','').replace('<!--SAHNE4_17-->',oku('sahneler.svg.html')).replace('<!--JS4_17-->',oku('sahneler.js')).replace('<!--STIL-->',oku('stil.css'))
    import json as _j;_c=_j.loads((B/'sahneler.json').read_text()).get('chip');t=t.replace('<title>Kat 9 Bölüm 1</title>',f'<title>{_c}</title>') if _c else t
old=(k/'prototip'/'sahne1-3.html').read_text()
m=re.search(r'<!-- ===== SAHNE 1.*?(?=<rect width="1080" height="1920" fill="url\(#vig\)")',old,re.S).group(0)
m=m.replace('<g class="sc sc1">','<g class="sc" id="sc1" data-id="1" style="display:none">').replace('<g class="sc sc2">','<g class="sc" id="sc2" data-id="2" style="display:none">').replace('<g class="sc sc3">','<g class="sc" id="sc3" data-id="3" style="display:none">')
m=m.replace('<g class="sub" id="s3a">','<g class="sub" id="s3a" data-sub="0">').replace('<g class="sub" id="s3b">','<g class="sub" id="s3b" data-sub="2">').replace('<g class="sub" id="s3c">','<g class="sub" id="s3c" data-sub="4">')
js=re.search(r'// sahne 1: gökdelen katmanları.*?(?=// zaman çizelgesi)',old,re.S).group(0)
t=t.replace('<!--SAHNE123-->',m).replace('<!--JS123-->',js).replace('<!--STIL-->','')
t=t.replace('<!--SAHNE4_17-->',(k/'prototip/parca/sahne4_17.svg.html').read_text()).replace('<!--JS4_17-->',(k/'prototip/parca/sahne4_17.js').read_text())
ctl_html='''<div id="ctl" style="position:fixed;left:0;right:0;bottom:0;background:#0b141dcc;padding:8px 12px;display:flex;gap:10px;align-items:center;font:14px system-ui;color:#e8eef5"><button id="pp" style="padding:8px 12px">⏸</button><input id="sl" type="range" min="0" max="__MAX__" step="1" value="0" style="flex:1"><span id="tl">0.0</span><label><input type="checkbox" id="sf"> Güvenli alan</label></div>'''
ctl_js='''<audio id="onses" preload="auto" src="__ONSES__"></audio><script>(function(){const sl=document.getElementById('sl'),tl=document.getElementById('tl'),pp=document.getElementById('pp'),A=document.getElementById('onses');
const sesVar=A&&A.getAttribute('src')&&A.getAttribute('src').startsWith('data:');let paused=false;
function loop(){if(!paused&&sesVar){const T=A.currentTime;window.__renderAt(T);sl.value=Math.round(T*10);tl.textContent=T.toFixed(1)}requestAnimationFrame(loop)}
if(sesVar){window.__manual=true;paused=true;pp.textContent='▶';loop()}
pp.onclick=function(){paused=!paused;pp.textContent=paused?'▶':'⏸';
 if(sesVar){window.__manual=true;if(paused)A.pause();else A.play()}else{window.__manual=paused;if(!paused)BOLUM.play()}};
sl.oninput=()=>{const T=+sl.value/10;if(sesVar){A.currentTime=T}else{paused=true;window.__manual=true;pp.textContent='▶'}window.__renderAt(T);tl.textContent=T.toFixed(1)};
document.getElementById('sf').onchange=e=>{document.getElementById('safe').style.display=e.target.checked?'inline':'none'}})()</script>'''
if len(sys.argv)>3 and sys.argv[3]=='--onizleme':
    import json as _j;mx=int(_j.loads((B/'zaman-cizelgesi.json').read_text())['toplam']*10)
    t=t.replace('<!--ONIZLEME-->',ctl_html.replace('__MAX__',str(mx))).replace('<!--ONIZLEME_JS-->',ctl_js)
t=t.replace('__DATA__',(B/'zaman-cizelgesi.json').read_text())
pathlib.Path(out).write_text(t)
print('derlendi',len(t)//1024,'KB')
