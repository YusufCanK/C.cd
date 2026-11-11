#!/usr/bin/env python3
"""Bir bölümün zaman çizelgesini sahneler.json'dan üretir (sahne süreleri, altyazı zamanları, ağız hareketi, panel).
Ses dosyası yoksa süreler TAHMİNİ'dir (zaman_cizelgesi.json içinde "tahmini": true). Ses dosyaları üretilince
(ses/sahneNN-*.mp3) gerçek süreler ve ağız şekilleri bu betiğe eklenir (ses aşaması).
Kullanım: python3 sablon/bolum_veri.py story/bolum-01  -> story/bolum-01/zaman-cizelgesi.json"""
import json, re, sys, pathlib

B = pathlib.Path(sys.argv[1])
SJ = json.load(open(B / 'sahneler.json'))
S = SJ['sahneler']
LEAD = .25          # sahne başladıktan sonra konuşmanın başlama gecikmesi
TAIL = .3           # son cümlenin ekranda kalma payı
STEP = .033         # ağız örnekleme adımı (Kat 9 ile aynı: 33 ms)

def TRUP(s):
    return s.replace('i', 'İ').replace('ı', 'I').upper()

def wrap(t, maxc=22):
    lines, cur = [], ''
    for x in t.split():
        if cur and len(cur) + 1 + len(x) > maxc:
            lines.append(cur); cur = x
        else:
            cur = (cur + ' ' + x).strip()
    if cur: lines.append(cur)
    return lines

def viseme_of(ch):
    c = ch.lower()
    if c in 'bmp': return 0
    if c in 'aeâ': return 2
    if c in 'ıiî': return 1
    if c in 'oöuü': return 3
    if c.isalpha(): return 1
    return 0

def pseudo_agiz(text, start, dur):
    """Metinden tahmini ağız şekilleri (ses yokken). Gerçek ses gelince lipsync ile değişir."""
    chars = [c for c in text if not c.isspace() or c == ' ']
    n = max(1, len(chars)); out = []
    k = int((start + dur) / STEP) + 1
    for i in range(k):
        t = i * STEP
        if t < start or t > start + dur: out.append(0); continue
        out.append(viseme_of(chars[min(n - 1, int((t - start) / dur * n))]))
    return out

KONUSAN = {'Anlatıcı': 'anlatici', 'Telsiz': 'telsiz', 'Reis Rıza': 'riza'}
out, t = [], 0.0
for s in S:
    i = s['id']; dur = float(s['sure_sn'])
    text = re.sub(r'\([^)]*\)', '', s.get('anlatim', '')).strip()
    sc = {'id': i, 'konusmaci': s['konusmaci'], 'ses_efekt': s.get('ses_efekt', ''), 'baslangic': round(t, 2), 'sure': round(dur, 2), 'altyazi': []}
    if text and not s.get('ses_yok'):
        say = float(s.get('tahmini_konusma_sn', 2.0))
        sent = [x.strip() for x in re.split(r'(?<=[.?!])\s+', text) if x.strip()]
        tot = sum(len(x) for x in sent); a = LEAD
        for k, x in enumerate(sent):
            z = a + say * len(x) / tot
            sc['altyazi'].append({'t0': round(a, 2), 't1': round(z + (TAIL if k == len(sent) - 1 else 0), 2),
                                  'satir': wrap(TRUP(x)), 'konusan': KONUSAN.get(s['konusmaci'], 'anlatici')})
            a = z
        if s['konusmaci'] == 'Reis Rıza':
            sc['agiz'] = pseudo_agiz(text, LEAD, say)
    p = s.get('panel')
    sc['hud'] = p
    out.append(sc); t += dur

json.dump({'toplam': round(t, 2), 'tahmini': True, 'sahneler': out}, open(B / 'zaman-cizelgesi.json', 'w'), ensure_ascii=False)
print('toplam', round(t, 1), 'sn (tahmini süreler: ses dosyası yok)')
for sc in out:
    print(sc['id'], sc['baslangic'], sc['sure'], [(c['t0'], c['t1'], ' / '.join(c['satir'])) for c in sc['altyazi']][:3])
