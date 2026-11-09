#!/usr/bin/env python3
"""Yayın dosyası üretir: lipsync.js'i içine gömer, iskelet etiketlerini çıkarır.
Kullanım: python3 prototip/build_yayin.py <çıktı.html>"""
import re,sys,pathlib
k=pathlib.Path(__file__).resolve().parent
s=(k/"sahne4-deniz-rig.html").read_text()
js=(k.parent/"sablon"/"lipsync.js").read_text()
s=s.replace('<script src="../sablon/lipsync.js"></script>',"<script>"+js+"</script>")
title=re.search(r"<title>.*?</title>",s).group(0).replace("Kat 9: Sahne 4 rig prototipi","Deniz Rig Prototipi")
style=re.search(r"<style>.*?</style>",s,re.S).group(0).replace(":root{--T:6s}",":root{--T:6s;color-scheme:dark}")
body=re.search(r"<body>(.*)</body>",s,re.S).group(1)
pathlib.Path(sys.argv[1]).write_text(title+"\n"+style+"\n"+body)
