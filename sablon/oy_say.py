#!/usr/bin/env python3
"""Yorumlardan A/B oylarını sayar ve degiskenler.json'a yazar.
Kullanım: python3 sablon/oy_say.py 01 yorumlar/*.txt [--kaydet]
Her .txt dosyası: bir platformun yorumları, her satır bir yorum (kopyala-yapıştır).
Dosya adı platformu belirtir: instagram.txt, tiktok.txt, youtube.txt. Anket sonuçları için: anket-instagram.txt içine "A=120 B=95" yaz.
Kural: Kişi başı tek oy sayılamaz (kullanıcı adı yoksa); satır başı bir oy. Hem A hem B içeren satır sayılmaz."""
import sys,re,json,pathlib
K=pathlib.Path(__file__).resolve().parent.parent
bol=sys.argv[1];dosyalar=[a for a in sys.argv[2:] if not a.startswith('--')]
import json as _j,re as _r
_S=_j.load(open(K/'story'/f'bolum-{bol}'/'sahneler.json'))
_sec=next((x.get('secenekler') for x in _S['sahneler'] if x.get('secenekler')),None)
EK_A,EK_B={'fener','🔦'},{'balta','🪓'}
if _sec and 'A' in _sec and len(_sec['A'])<60:
    EK_A={w for w in _r.findall(r'[\wçğıöşü]+',_sec['A'].lower()) if len(w)>3}-{'dolaş','koşu'}
    EK_B={w for w in _r.findall(r'[\wçğıöşü]+',_sec['B'].lower()) if len(w)>3}
if _S.get('oy_kelimeleri'):EK_A|=set(_S['oy_kelimeleri']['A']);EK_B|=set(_S['oy_kelimeleri']['B'])
def oy(satir):
    t=satir.lower().strip()
    if not t:return None
    tok=set(re.findall(r'[\wçğıöşü]+|🔦|🪓',t))
    a=('a' in tok) or bool(tok&EK_A);b=('b' in tok) or bool(tok&EK_B)
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
