#!/usr/bin/env python3
"""Yayın sayfası: bütün bölümlerin videosu, kapağı ve yayın metinleri (kopyala düğmeli) tek sayfada.
Kullanım: python3 sablon/yayin_sayfasi.py  ->  story/kanallar/sayfa/index.html (+ videolar ve kapaklar, git dışı)
Sonra Artifact olarak aynı dosya yoluyla yeniden yayınlanır (link değişmez):
  https://claude.ai/artifact/DAgLcxtANarZURwDFo84o3  (capabilities: downloads)
Metinler story/bolum-NN/yayin-paketi.md içindeki '## Başlık' + '> satırlar' bloklarından okunur."""
import re,json,html,shutil,subprocess,pathlib
K=pathlib.Path(__file__).resolve().parent.parent;O=K/'story'/'kanallar'/'sayfa';O.mkdir(parents=True,exist_ok=True)
SINIR=14*1024*1024  # artifact dosya sınırı 15 MB, pay bırak
def bloklar(md):
    out=[];bas=None;sat=[]
    for l in md.splitlines():
        if l.startswith('## '):
            if bas and sat:out.append((bas,'\n'.join(sat).strip()))
            bas=re.sub(r'\s*\(.*?\)\s*$','',l[3:]).strip();sat=[]
        elif bas and l.startswith('>'):sat.append(l[1:].lstrip(' ') if len(l)>1 else '')
    if bas and sat:out.append((bas,'\n'.join(sat).strip()))
    return out
bolumler=[]
for B in sorted(K.glob('story/bolum-*'),reverse=True):
    v=B/'cikti.mp4'
    if not v.exists():continue
    n=int(B.name.split('-')[1]);S=json.loads((B/'sahneler.json').read_text());ad=S.get('baslik') if isinstance(S.get('baslik'),str) and len(S.get('baslik',''))<30 else None
    hedef=O/f'kat9-bolum{n}.mp4'
    if not hedef.exists() or hedef.stat().st_mtime<v.stat().st_mtime:
        if v.stat().st_size<=SINIR:subprocess.run(['ffmpeg','-v','error','-y','-i',str(v),'-c','copy','-movflags','+faststart',str(hedef)],check=True)
        else:subprocess.run(['ffmpeg','-v','error','-y','-i',str(v),'-c:v','libx264','-crf','25','-preset','slow','-pix_fmt','yuv420p','-c:a','aac','-b:a','128k','-movflags','+faststart',str(hedef)],check=True)
    if (B/'kapak.png').exists():shutil.copy(B/'kapak.png',O/f'kapak{n}.png')
    md=(B/'yayin-paketi.md').read_text() if (B/'yayin-paketi.md').exists() else ''
    ilk=md.splitlines()[0] if md else '';m=re.search(r'"(.+?)"',ilk)
    bolumler.append({'n':n,'ad':m.group(1) if m else (ad or ''),'metin':bloklar(md),'kapak':(O/f'kapak{n}.png').exists()})
kanal=bloklar((K/'story/kanallar/kurulum.md').read_text()) if (K/'story/kanallar/kurulum.md').exists() else []
e=html.escape
def metin_kart(baslik,txt,anahtar):
    return f'<div class="metin"><div class="mb"><b>{e(baslik)}</b><button class="kopya" data-k="{anahtar}">Kopyala</button></div><textarea readonly id="{anahtar}" rows="{min(16,sum(max(1,-(-len(x)//34)) for x in txt.splitlines())+1)}">{e(txt)}</textarea></div>'
kartlar=[]
for b in bolumler:
    n=b['n'];m=''.join(metin_kart(bas,txt,f'b{n}m{i}') for i,(bas,txt) in enumerate(b['metin']) if bas.lower()!='oy sayımı')
    kp=f' poster="kapak{n}.png"' if b['kapak'] else ''
    kd=f'<button class="ikinci" data-dosya="kapak{n}.png">Kapağı kaydet</button>' if b['kapak'] else ''
    kartlar.append(f'''<section class="kart"><h2>Bölüm {n}{' · '+e(b['ad']) if b['ad'] else ''}</h2>
<video controls playsinline preload="metadata"{kp} src="kat9-bolum{n}.mp4"></video>
<div class="dugmeler"><button class="ana" data-dosya="kat9-bolum{n}.mp4">Videoyu kaydet</button>{kd}</div><div class="durum"></div>
<h3>Yayın metinleri</h3>{m or '<p class="not">Bu bölüm için yayın metni yok.</p>'}</section>''')
kb=[(bas,txt) for bas,txt in kanal if 'Biyografi' in bas]
kanal_html=''
if kanal:
    bio=(K/'story/kanallar/kurulum.md').read_text();sec=bio[bio.find('## 2. Biyografi'):bio.find('## 3.')]
    parcalar=re.findall(r'\*\*(.+?):\*\*\n((?:>.*\n?)+)',sec)
    kanal_html='<section class="kart"><h2>Kanal biyografileri</h2>'+''.join(metin_kart(p,'\n'.join(x[1:].lstrip(' ') for x in t.strip().splitlines()),f'k{i}') for i,(p,t) in enumerate(parcalar))+'</section>'
sayfa=f'''<title>Kat 9 Videoları</title>
<style>
:root{{--bg:#f5f6f8;--kart:#fff;--yazi:#141a20;--ikincil:#5b6670;--vurgu:#e64b3c;--cizgi:#e1e5ea;--alan:#f0f2f5}}
@media (prefers-color-scheme:dark){{:root:not([data-theme="light"]){{--bg:#0b141d;--kart:#14212d;--yazi:#eef3f7;--ikincil:#9fb0bf;--cizgi:#22313f;--alan:#0f1922}}}}
:root[data-theme="dark"]{{--bg:#0b141d;--kart:#14212d;--yazi:#eef3f7;--ikincil:#9fb0bf;--cizgi:#22313f;--alan:#0f1922}}
*{{box-sizing:border-box}}body{{margin:0;background:var(--bg);color:var(--yazi);font:16px/1.5 system-ui,-apple-system,"Segoe UI",sans-serif}}
main{{max-width:560px;margin:0 auto;padding:20px 16px 40px}}h1{{font-size:22px;margin:4px 0}}h2{{font-size:18px;margin:0 0 10px}}h3{{font-size:15px;margin:18px 0 8px;color:var(--ikincil)}}
.not{{color:var(--ikincil);font-size:14px;margin:0 0 18px}}.kart{{background:var(--kart);border:1px solid var(--cizgi);border-radius:16px;padding:14px;margin-bottom:18px}}
video{{width:100%;aspect-ratio:9/16;max-height:70vh;background:#000;border-radius:12px;display:block}}
.dugmeler{{display:flex;gap:10px;flex-wrap:wrap;margin-top:12px}}button{{min-height:44px;border-radius:10px;border:0;font:600 15px system-ui,sans-serif;cursor:pointer;padding:0 14px}}
.dugmeler button{{flex:1 1 160px}}button.ana{{background:var(--vurgu);color:#fff}}button.ikinci,button.kopya{{background:transparent;color:var(--yazi);border:1px solid var(--cizgi)}}
.durum{{font-size:13px;color:var(--ikincil);margin-top:8px;min-height:1em}}.metin{{margin-bottom:12px}}.mb{{display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:6px}}
textarea{{width:100%;background:var(--alan);color:var(--yazi);border:1px solid var(--cizgi);border-radius:10px;padding:10px;font:14px/1.45 system-ui,sans-serif;resize:vertical}}
</style>
<main><h1>Kat 9 videoları</h1>
<p class="not">Videoyu kaydetmek için düğmeye bas ve onayla (iPhone'da paylaş menüsünden "Videoyu Kaydet"). Metinleri "Kopyala" ile al, yayında yapıştır.</p>
{''.join(kartlar)}{kanal_html}</main>
<script>
let indir=null;(async()=>{{try{{indir=await claude.use("downloads")}}catch(e){{indir=null}}}})();
document.querySelectorAll('button[data-dosya]').forEach(b=>b.addEventListener('click',async()=>{{
 const dosya=b.dataset.dosya,durum=b.closest('.kart').querySelector('.durum');
 if(!indir){{durum.innerHTML='Bu görünümde kaydetme kullanılamıyor. <a href="'+dosya+'" download>Buradan aç</a> ve uzun basıp kaydet.';return}}
 b.disabled=true;durum.textContent='Hazırlanıyor…';
 try{{const blob=await (await fetch(dosya)).blob();durum.textContent='Onay penceresini kabul et.';const r=await indir.save({{filename:dosya,data:blob}});durum.textContent=r.status==='saved'?'Kaydedildi.':'Gönderildi.'}}
 catch(e){{const c=e&&e.code;durum.textContent=c==='declined'?'Vazgeçildi.':c==='rate_limited'?'Bir pencere zaten açık, birazdan tekrar dene.':'Kaydedilemedi ('+(c||'hata')+').'}}
 finally{{b.disabled=false}}}}));
document.querySelectorAll('button.kopya').forEach(b=>b.addEventListener('click',async()=>{{
 const t=document.getElementById(b.dataset.k);let ok=false;
 try{{await navigator.clipboard.writeText(t.value);ok=true}}catch(e){{}}
 if(!ok){{t.focus();t.select();try{{ok=document.execCommand('copy')}}catch(e){{}}}}
 b.textContent=ok?'Kopyalandı':'Seçildi, kopyala';setTimeout(()=>b.textContent='Kopyala',1800)}}));
</script>
'''
(O/'index.html').write_text(sayfa)
print('sayfa:',O/'index.html',[b['n'] for b in bolumler],[(f.name,f.stat().st_size//1024) for f in sorted(O.glob('*')) if f.suffix!='.html'])
