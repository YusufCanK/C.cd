#!/usr/bin/env python3
"""Prototip HTML'ini yayın biçimine çevirir (lipsync.js ve sesi gömer, iskelet etiketlerini çıkarır).
Kullanım: python3 prototip/build_yayin.py <kaynak.html> <çıktı.html> <başlık> <işaretçi> <mp3>"""
import re,sys,pathlib,base64
k=pathlib.Path(__file__).resolve().parent
src,out,title_txt,marker,mp3=sys.argv[1:6]
s=(k/src).read_text()
s=s.replace('<script src="../sablon/lipsync.js"></script>',"<script>"+(k.parent/"sablon"/"lipsync.js").read_text()+"</script>")
style=re.search(r"<style>.*?</style>",s,re.S).group(0).replace(":root{--T:6s}",":root{--T:6s;color-scheme:dark}")
body=re.search(r"<body>(.*)</body>",s,re.S).group(1)
m=pathlib.Path(mp3) if pathlib.Path(mp3).is_absolute() else k.parent/mp3
if m.exists(): body=body.replace(marker,"data:audio/mpeg;base64,"+base64.b64encode(m.read_bytes()).decode())
pathlib.Path(out).write_text(f"<title>{title_txt}</title>\n"+style+"\n"+body)
