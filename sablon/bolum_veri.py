#!/usr/bin/env python3
"""Bir bölümün zaman çizelgesini sahneler.json ve ses dosyalarından üretir (sahne süreleri, altyazı zamanları, ağız hareketi, panel).
Ses dosyası (ses/sahneNN-*.mp3) varsa GERÇEK süre ve ağız şekilleri (sablon/lipsync_cli.js, 33 ms adım) kullanılır;
yoksa süreler TAHMİNİ'dir (zaman-cizelgesi.json içinde "tahmini": true).
Kullanım: python3 sablon/bolum_veri.py story/bolum-01  -> story/bolum-01/zaman-cizelgesi.json"""
import json, re, sys, pathlib, subprocess

kok = pathlib.Path(__file__).resolve().parent.parent
B = pathlib.Path(sys.argv[1])
SJ = json.load(open(B / 'sahneler.json'))
S = SJ['sahneler']
LEAD = .25          # sahne başladıktan sonra konuşmanın başlama gecikmesi
TAIL = .3           # konuşma bittikten sonra bekleme payı
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

def sure(p):
    return float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', str(p)]).decode())

def visemes(mp3):
    wav = '/tmp/_kb_v.wav'
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', str(mp3), '-ac', '1', '-ar', '16000', '-c:a', 'pcm_s16le', wav], check=True)
    return json.loads(subprocess.check_output(['node', str(kok / 'sablon' / 'lipsync_cli.js'), wav]).decode())

def viseme_of(ch):
    c = ch.lower()
    if c in 'bmp': return 0
    if c in 'aeâ': return 2
    if c in 'ıiî': return 1
    if c in 'oöuü': return 3
    if c.isalpha(): return 1
    return 0

def pseudo_agiz(text, start, dur):
    """Metinden tahmini ağız şekilleri (ses yokken)."""
    chars = list(text); n = max(1, len(chars)); out = []
    for i in range(int((start + dur) / STEP) + 1):
        t = i * STEP
        out.append(0 if (t < start or t > start + dur) else viseme_of(chars[min(n - 1, int((t - start) / dur * n))]))
    return out

KONUSAN = {'Anlatıcı': 'anlatici', 'Telsiz': 'telsiz', 'Balıkçı (telsiz)': 'telsiz', 'Reis Rıza': 'riza', 'Reis Rıza (telsiz)': 'riza', 'Telsiz (bekçi sesi)': 'telsiz', 'Bekçi': 'anlatici'}
AGIZLI = ('Reis Rıza', 'Bekçi')   # ağzı görünen konuşmacılar (ağız şekilleri üretilir)

def ses_dosyasi(s):
    i = s['id']
    if s.get('ses_dosyasi') and (B / s['ses_dosyasi']).exists():
        return B / s['ses_dosyasi']
    g = sorted((B / 'ses').glob(f'sahne{i:02d}-*.mp3'))
    return g[0] if g else None

out, t, tahmini = [], 0.0, False
for s in S:
    i = s['id']; plan = float(s['sure_sn'])
    text = re.sub(r'\([^)]*\)', '', s.get('anlatim', '')).strip()
    sc = {'id': i, 'konusmaci': s['konusmaci'], 'ses_efekt': s.get('ses_efekt', ''), 'baslangic': round(t, 2), 'altyazi': []}
    konusan = KONUSAN.get(s['konusmaci'], 'anlatici')
    dur = plan
    if text and not s.get('ses_yok'):
        mp3 = ses_dosyasi(s)
        sent = [x.strip() for x in re.split(r'(?<=[.?!])\s+', text) if x.strip()]
        if mp3 is not None:
            d = sure(mp3); v = visemes(mp3)
            sc['ses'] = {'dosya': str(mp3.relative_to(B)), 'baslangic': LEAD, 'sure': round(d, 3)}
            dur = max(plan, LEAD + d + TAIL)
            # altyazı: cümleleri seste gerçekten oluşan sessizlik boşluklarına oturt (Kat 9 yöntemi)
            runs, st = [], None
            for k, x in enumerate(v):
                if x != 0 and st is None: st = k
                if x == 0 and st is not None: runs.append((st * STEP, k * STEP)); st = None
            if st is not None: runs.append((st * STEP, len(v) * STEP))
            gaps = [(runs[k][1], runs[k + 1][0]) for k in range(len(runs) - 1) if runs[k + 1][0] - runs[k][1] >= .12]
            b = []
            if len(sent) > 1 and runs:
                tot = sum(len(x) for x in sent); a0 = runs[0][0]; z0 = runs[-1][1]; acc = 0
                for x in sent[:-1]:
                    acc += len(x); guess = a0 + (z0 - a0) * acc / tot
                    cand = [g for g in gaps if abs((g[0] + g[1]) / 2 - guess) <= .7 and g[1] - g[0] >= .15]
                    b.append(min(((g[0] + g[1]) / 2 for g in cand), key=lambda m: abs(m - guess)) if cand else guess)
                b = sorted(b)
            t0 = max(0, (runs[0][0] if runs else 0) - .05)
            for k, x in enumerate(sent):
                a = t0 if k == 0 else b[k - 1]
                z = b[k] if k < len(b) else (runs[-1][1] if runs else d) + .35
                sc['altyazi'].append({'t0': round(LEAD + a, 2), 't1': round(LEAD + z, 2), 'satir': wrap(TRUP(x)), 'konusan': konusan})
            if s['konusmaci'].startswith(AGIZLI):
                sc['agiz'] = [0] * int(LEAD / STEP) + v     # ses başlangıcına göre hizalı
        else:
            tahmini = True
            say = float(s.get('tahmini_konusma_sn', 2.0)); tot = sum(len(x) for x in sent); a = LEAD
            for k, x in enumerate(sent):
                z = a + say * len(x) / tot
                sc['altyazi'].append({'t0': round(a, 2), 't1': round(z + (TAIL if k == len(sent) - 1 else 0), 2), 'satir': wrap(TRUP(x)), 'konusan': konusan})
                a = z
            if s['konusmaci'].startswith(AGIZLI):
                sc['agiz'] = pseudo_agiz(text, LEAD, say)
    sc['sure'] = round(dur, 2)
    sc['hud'] = s.get('panel')
    out.append(sc); t += dur

json.dump({'toplam': round(t, 2), 'tahmini': tahmini, 'sahneler': out}, open(B / 'zaman-cizelgesi.json', 'w'), ensure_ascii=False)
print('toplam', round(t, 1), 'sn', '(bazı süreler tahmini: ses dosyası eksik)' if tahmini else '(gerçek ses süreleriyle)')
for sc in out:
    plan = next(x for x in S if x['id'] == sc['id'])['sure_sn']
    ek = f"  (+{sc['sure']-plan:.2f} sn uzadı)" if sc['sure'] > plan + .01 else ''
    print(sc['id'], sc['baslangic'], sc['sure'], ek, [(c['t0'], c['t1'], ' / '.join(c['satir'])) for c in sc['altyazi']][:3])
