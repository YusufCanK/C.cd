#!/usr/bin/env python3
"""prototip/bolum01.html şablonunu parçalarla birleştirip derlenmiş sayfayı üretir.
Kullanım: python3 sablon/bolum_derle.py story/bolum-01 prototip/bolum01.build.html"""
import re,sys,pathlib
k=pathlib.Path(__file__).resolve().parent.parent
B=pathlib.Path(sys.argv[1]);out=sys.argv[2]
t=(k/'prototip'/'bolum01.html').read_text()
old=(k/'prototip'/'sahne1-3.html').read_text()
m=re.search(r'<!-- ===== SAHNE 1.*?(?=<rect width="1080" height="1920" fill="url\(#vig\)")',old,re.S).group(0)
m=m.replace('<g class="sc sc1">','<g class="sc" id="sc1" data-id="1" style="display:none">').replace('<g class="sc sc2">','<g class="sc" id="sc2" data-id="2" style="display:none">').replace('<g class="sc sc3">','<g class="sc" id="sc3" data-id="3" style="display:none">')
m=m.replace('<g class="sub" id="s3a">','<g class="sub" id="s3a" data-sub="0">').replace('<g class="sub" id="s3b">','<g class="sub" id="s3b" data-sub="2">').replace('<g class="sub" id="s3c">','<g class="sub" id="s3c" data-sub="4">')
js=re.search(r'// sahne 1: gökdelen katmanları.*?(?=// zaman çizelgesi)',old,re.S).group(0)
t=t.replace('<!--SAHNE123-->',m).replace('<!--JS123-->',js)
t=t.replace('<!--SAHNE4_17-->',(k/'prototip/parca/sahne4_17.svg.html').read_text()).replace('<!--JS4_17-->',(k/'prototip/parca/sahne4_17.js').read_text())
t=t.replace('__DATA__',(B/'zaman-cizelgesi.json').read_text())
pathlib.Path(out).write_text(t)
print('derlendi',len(t)//1024,'KB')
