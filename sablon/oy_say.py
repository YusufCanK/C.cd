#!/usr/bin/env python3
"""Yorumlardan A/B oylarını sayar ve degiskenler.json'a yazar.
Kullanım: python3 sablon/oy_say.py 01 yorumlar/*.txt [--kaydet]
Her .txt dosyası: bir platformun yorumları, her satır bir yorum (kopyala-yapıştır).
Dosya adı platformu belirtir: instagram.txt, tiktok.txt, youtube.txt. Anket sonuçları için: anket-instagram.txt içine "A=120 B=95" yaz.
Kural: Kişi başı tek oy sayılamaz (kullanıcı adı yoksa); satır başı bir oy. Hem A hem B içeren satır sayılmaz."""
import sys,re,json,pathlib
K=pathlib.Path(__file__).resolve().parent.parent
bol=sys.argv[1];dosyalar=[a for a in sys.argv[2:] if not a.startswith('--')]
def oy(satir):
    t=satir.lower().strip()
    if not t:return None
    tok=set(re.findall(r'[\wçğıöşü]+|🔦|🪓',t))
    a=any(k in tok for k in ('a','fener','🔦'));b=any(k in tok for k in ('b','balta','🪓'))
    return 'A' if a and not b else 'B' if b and not a else None
toplam={'A':0,'B':0};detay={}
for f in dosyalar:
    p=pathlib.Path(f);ad=p.stem;txt=p.read_text(encoding='utf-8')
    if ad.startswith('anket'):
        m={k:int(v) for k,v in re.findall(r'([AB])\s*=\s*(\d+)',txt)};d={'A':m.get('A',0),'B':m.get('B',0)}
    else:
        d={'A':0,'B':0}
        for s in txt.splitlines():
            r=oy(s)
            if r:d[r]+=1
    detay[ad]=d;toplam['A']+=d['A'];toplam['B']+=d['B']
for k,v in detay.items():print(f'{k:20s} A={v["A"]:5d}  B={v["B"]:5d}')
print(f'{"TOPLAM":20s} A={toplam["A"]:5d}  B={toplam["B"]:5d}')
kazanan='A' if toplam['A']>toplam['B'] else 'B' if toplam['B']>toplam['A'] else 'BERABERE'
print('Kazanan:',kazanan)
if '--kaydet' in sys.argv:
    D=K/'story'/'degiskenler.json';v=json.load(open(D))
    v.setdefault('oylar',{})[f'bolum-{bol}']={'detay':detay,'toplam':toplam,'kazanan':kazanan}
    json.dump(v,open(D,'w'),ensure_ascii=False,indent=2);print('kaydedildi:',D)
