#!/usr/bin/env python3
"""Bölüm şablonunu parçalarla birleştirip derlenmiş (tek dosya) sayfayı üretir. Hiçbir sahne bu dosyaya gömülü değildir:
sahne çizimleri story/bolum-NN/sahne-cizim.js içindedir (bölüme aittir).
Kullanım: python3 sablon/bolum_derle.py story/bolum-01 prototip/bolum01.build.html [--onizleme]"""
import sys, pathlib, json
k = pathlib.Path(__file__).resolve().parent.parent
B = pathlib.Path(sys.argv[1]); out = sys.argv[2]
t = (k / 'prototip' / 'bolum.html').read_text()
css = (k / 'sablon' / 'rigs.css').read_text()
js = '\n'.join('<script>\n' + (p.read_text()) + '\n</script>' for p in [k / 'sablon' / 'rigs.js', k / 'sablon' / 'cizim.js', B / 'sahne-cizim.js', k / 'sablon' / 'motor.js'])
ctl_html = '''<div id="ctl" style="position:fixed;left:0;right:0;bottom:0;background:#0b141dcc;padding:8px 12px;display:flex;gap:10px;align-items:center;font:14px system-ui;color:#e8eef5"><button id="pp" style="padding:8px 12px">⏸</button><input id="sl" type="range" min="0" max="__MAX__" step="1" value="0" style="flex:1"><span id="tl">0.0</span><label><input type="checkbox" id="sf"> Güvenli alan</label></div>'''
ctl_js = '''<script>(function(){const sl=document.getElementById('sl'),tl=document.getElementById('tl'),pp=document.getElementById('pp');let paused=false;
pp.onclick=function(){paused=!paused;window.__manual=paused;pp.textContent=paused?'▶':'⏸';if(!paused)BOLUM.play()};
sl.oninput=()=>{paused=true;window.__manual=true;pp.textContent='▶';const T=+sl.value/10;window.__renderAt(T);tl.textContent=T.toFixed(1)};
document.getElementById('sf').onchange=e=>{document.getElementById('safe').style.display=e.target.checked?'inline':'none'}})()</script>'''
data = (B / 'zaman-cizelgesi.json').read_text()
if len(sys.argv) > 3 and sys.argv[3] == '--onizleme':
    mx = int(json.loads(data)['toplam'] * 10)
    t = t.replace('<!--ONIZLEME-->', ctl_html.replace('__MAX__', str(mx))).replace('<!--ONIZLEME_JS-->', ctl_js)
t = t.replace('/*CSS*/', css).replace('<!--SCRIPTS-->', js).replace('__DATA__', data)
pathlib.Path(out).write_text(t)
print('derlendi', len(t) // 1024, 'KB')
