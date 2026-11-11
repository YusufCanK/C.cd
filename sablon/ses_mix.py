#!/usr/bin/env python3
"""Bölüm ses karışımı: konuşmalar (zaman çizelgesine göre) + ortam sesleri + efektler + müzik yatağı.
Her şey veriyle çalışır: story/bolum-NN/ses-plani.json (ortam, olaylar, müzik). Bu dosyada bölüme özel hiçbir şey yoktur.
Kullanım: python3 sablon/ses_mix.py story/bolum-01 cikti.wav
Not: Efekt ve müzik kodla SENTEZLENİR (yer tutucu kalitesi); lisanslı ses kütüphanesiyle değiştirilebilir."""
import json, subprocess, sys, pathlib, wave
import numpy as np
sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
import ses_sentez as Z
from ses_sentez import SR, put, env, bp, echo, pad, EVENTS, ORTAM

B = pathlib.Path(sys.argv[1]); out = sys.argv[2]
D = json.load(open(B / 'zaman-cizelgesi.json')); SC = {s['id']: s for s in D['sahneler']}
PLAN = json.load(open(B / 'ses-plani.json'))
TOT = D['toplam'] + .5; N = int(TOT * SR)

def yukle(p):
    r = subprocess.run(['ffmpeg', '-v', 'error', '-i', str(p), '-f', 'f32le', '-ac', '1', '-ar', str(SR), '-'], capture_output=True, check=True).stdout
    return np.frombuffer(r, dtype=np.float32).astype(np.float64)

def aralik(s):
    """sahne numarası ya da [ilk, son] -> (başlangıç sn, bitiş sn)"""
    a, b = (s, s) if isinstance(s, int) else s
    return SC[a]['baslangic'], SC[b]['baslangic'] + SC[b]['sure']

voice = np.zeros(N); orta = np.zeros(N); sfx = np.zeros(N); mus = np.zeros(N)

# ---- konuşmalar: telsizden geçenler radyo filtresinden geçer ----
RADYO = ('Telsiz', 'Balıkçı (telsiz)')
for s in D['sahneler']:
    if 'ses' not in s: continue
    x = yukle(B / s['ses']['dosya']); x = Z.rms_norm(x, .11)
    if s['konusmaci'] in RADYO:
        x = bp(x, 380, 3400); x = np.tanh(x * 2.2) / np.tanh(2.2); x = Z.rms_norm(x, .10)
        if s['konusmaci'] == 'Telsiz': x = echo(x, ((.18, .32), (.4, .18), (.75, .08)))   # Zeki'nin taklidi: yankılı
    put(voice, x, s['baslangic'] + s['ses']['baslangic'])

# ---- ortam yatakları ----
for o in PLAN.get('ortam', []):
    t0, t1 = aralik(o['sahne']); d = t1 - t0
    x = ORTAM[o['tip']](d) * env(int(d * SR), .8, .8)
    put(orta, x, t0, o.get('g', 1))

# ---- olaylar (sahne içi göreli saniye; t sayı ya da liste) ----
for e in PLAN.get('olaylar', []):
    S0 = SC[e['sahne']]['baslangic']; f = EVENTS[e['tip']]
    par = {k: v for k, v in e.items() if k not in ('sahne', 't', 'tip', 'g', 'bitis')}
    ts = e['t'] if isinstance(e['t'], list) else [e['t']]
    for t in ts:
        kw = dict(par)
        if 'bitis' in e: kw['bitis'] = S0 + e['bitis']
        f(sfx, S0 + t, e.get('g', .3), **kw)

# ---- müzik yatağı ----
for m in PLAN.get('muzik', []):
    t0, t1 = aralik(m['sahne']); d = t1 - t0
    x = pad(m['akor'], d, 1.0)
    if m.get('ek_swell'): x = x + Z.swell(d, 300, 2200, m['ek_swell'])
    put(mus, x, t0, m.get('g', .5))

# ---- karışım: konuşma altında müzik ve ortam kısılır ----
venv = np.convolve(np.abs(voice), np.ones(int(.12 * SR)) / int(.12 * SR), mode='same'); venv = np.clip(venv / .08, 0, 1)
sfx = np.tanh(sfx * 1.6) / 1.6 * .75
orta = orta * (1 - .45 * venv); mus = mus * (1 - .6 * venv)
mix = voice * 1.7 + orta * 1.0 + sfx + mus * .3
if len(sys.argv) > 3 and sys.argv[3] == '--parcalar':   # teşhis: konuşma/ortam/efekt/müzik ayrı ayrı kaydedilir
    np.savez(out + '.parcalar.npz', konusma=voice * 1.7, ortam=orta, efekt=sfx, muzik=mus * .3)
mix = np.tanh(mix * 1.2) / np.tanh(1.2)
mix = mix / np.max(np.abs(mix)) * .89
i16 = (np.stack([mix, mix], 1) * 32767).astype(np.int16)
w = wave.open(out, 'wb'); w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(i16.tobytes()); w.close()
print('ses karışımı tamam', round(TOT, 1), 'sn, tepe', round(float(np.max(np.abs(mix))), 2))
