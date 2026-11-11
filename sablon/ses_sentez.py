"""Kodla ses sentezi (numpy): efekt, ortam sesi ve müzik yatağı. YER TUTUCU kalitesindedir (lisanslı bir ses kütüphanesiyle değiştirilebilir).
Tüm fonksiyonlar düz numpy dizisi (mono, 44,1 kHz) döndürür; yerleştirme için put(), olaylar için EVENTS ve ORTAM sözlüklerine bakın."""
import numpy as np

SR = 44100
rs = np.random.RandomState(7)

def T(t): return int(round(t * SR))

def topla(*xs):
    """farklı uzunluktaki sesleri toplar (kısa olanı sıfırla doldurur)"""
    y = np.zeros(max(len(x) for x in xs))
    for x in xs: y[:len(x)] += x
    return y

def put(buf, x, t, g=1.0):
    i = T(t)
    if i >= len(buf) or len(x) == 0: return
    j = min(len(buf), i + len(x)); buf[i:j] += x[:j - i] * g

def noise(d): return rs.randn(max(1, int(d * SR)))

def bp(x, lo, hi):
    if len(x) < 8: return x
    X = np.fft.rfft(x); f = np.fft.rfftfreq(len(x), 1 / SR)
    m = np.clip((f - lo) / max(lo * .2, 20), 0, 1) * np.clip((hi - f) / max(hi * .2, 20), 0, 1)
    return np.fft.irfft(X * m, len(x))

def env(n, a, r):
    e = np.ones(n); ai = min(n, int(a * SR)); ri = min(n, int(r * SR))
    if ai > 0: e[:ai] = np.linspace(0, 1, ai)
    if ri > 0: e[n - ri:] = np.minimum(e[n - ri:], np.linspace(1, 0, ri))
    return e

def rms_norm(x, target):
    r = np.sqrt(np.mean(x ** 2)) + 1e-9
    return x * (target / r)

def tone(f, d, a=.01, r=.1, kind='sine'):
    t = np.arange(int(d * SR)) / SR
    if kind == 'sine': x = np.sin(2 * np.pi * f * t)
    elif kind == 'saw': x = 2 * ((f * t) % 1) - 1
    elif kind == 'tri': x = 2 * np.abs(2 * ((f * t) % 1) - 1) - 1
    else: x = np.sign(np.sin(2 * np.pi * f * t))
    return x * env(len(x), a, r)

def sweep(f0, f1, d, a=.02, r=.2):
    t = np.arange(int(d * SR)) / SR; f = f0 + (f1 - f0) * t / d
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * env(len(t), a, r)

def click(f=2200, d=.04):
    n = int(d * SR)
    return tone(f, d, .001, d * .75) + noise(d) * .3 * env(n, .0005, d * .75)

def thud(f=60, d=.35):
    n = int(d * SR)
    return sweep(f * 2, f * .7, d, .002, d * .7) + bp(noise(d), 40, 400) * .6 * env(n, .001, d * .55)

def swell(d, lo, hi, peak=.5):
    x = bp(noise(d), lo, hi); e = np.sin(np.linspace(0, np.pi, len(x))) ** 1.5
    return x * e * peak

def riser(d, lo, hi, peak=.5):
    x = bp(noise(d), lo, hi); return x * np.linspace(0, 1, len(x)) ** 2 * peak

def echo(x, taps=((0.18, .35), (0.4, .2), (0.7, .1))):
    y = np.zeros(len(x) + int(1.0 * SR)); y[:len(x)] += x
    for dt, g in taps: y[int(dt * SR):int(dt * SR) + len(x)] += x * g
    return y

# ---------------- ortam yatakları (süre d sn; RMS 0,05'e normalize, g ile ölçeklenir) ----------------
def yagmur(d):
    x = bp(noise(d), 1500, 9000); t = np.arange(len(x)) / SR
    return rms_norm(x * (1 + .25 * np.sin(2 * np.pi * .35 * t)), .05)

def ruzgar(d):
    x = bp(noise(d), 120, 900); t = np.arange(len(x)) / SR
    return rms_norm(x * (.55 + .45 * np.sin(2 * np.pi * .13 * t) * np.sin(2 * np.pi * .07 * t + 1)), .05)

def dalga(d):
    x = bp(noise(d), 80, 1400); t = np.arange(len(x)) / SR
    return rms_norm(x * (.5 + .5 * np.sin(2 * np.pi * t / 6.5)) ** 2, .05)

def motor(d):
    t = np.arange(int(d * SR)) / SR
    x = (2 * ((48 * t) % 1) - 1) * .8 + (2 * ((96 * t) % 1) - 1) * .3
    return rms_norm(bp(x * (1 + .4 * np.sin(2 * np.pi * 11 * t)), 40, 400), .05)

def uvlama(d):   # iç mekân alçak uğultu
    t = np.arange(int(d * SR)) / SR
    return rms_norm(np.sin(2 * np.pi * 50 * t) + .4 * np.sin(2 * np.pi * 100 * t) + .15 * bp(noise(d), 80, 400), .05)

ORTAM = {'yagmur': yagmur, 'ruzgar': ruzgar, 'dalga': dalga, 'motor': motor, 'uvlama': uvlama}

# ---------------- olaylar: f(buf, t, g, **parametre) ----------------
def vurus(buf, t, g=.5, **k):               # kapıya vuruş
    put(buf, thud(95, .3), t, g); put(buf, bp(noise(.12), 300, 2500) * env(int(.12 * SR), .001, .08) * 2, t, g * .6)
    put(buf, echo(thud(70, .25) * .4, ((.25, .3), (.55, .15))), t + .02, g * .5)

def derin_vurus(buf, t, g=.7, **k):         # başlık vuruşu
    put(buf, thud(40, .9) * 1.3, t, g); put(buf, swell(1.6, 60, 500, 1), t, g * .3)

def adim(buf, t, g=.3, **k):                # tek adım (ahşap)
    put(buf, bp(noise(.12), 80, 900) * env(int(.12 * SR), .002, .1) * 3, t, g); put(buf, thud(70, .1), t, g * .5)

def adimlar(buf, t, g=.3, aralik=.4, adet=6, **k):
    for i in range(int(adet)): adim(buf, t + i * aralik, g)

def kagit(buf, t, g=.3, **k):
    x = bp(noise(.35), 2500, 8000) * (1 + .7 * np.sin(2 * np.pi * 11 * np.arange(int(.35 * SR)) / SR)); put(buf, x * env(len(x), .02, .2), t, g)

def sayfa(buf, t, g=.4, **k):
    x = bp(noise(.5), 800, 5000); e = np.exp(-np.linspace(0, 6, len(x))); put(buf, x * e * 2, t, g)

def tiktak(buf, t, g=.25, bitis=None, **k):
    s = t
    while s < (bitis if bitis is not None else t + 5):
        put(buf, click(1800 if int(s - t) % 2 == 0 else 1300, .03), s, g); s += 1.0

def sayac(buf, t, g=.25, **k): put(buf, click(2600, .03), t, g)

def bip(buf, t, g=.35, f=1000, **k): put(buf, tone(f, .1, .002, .03), t, g)

def uyari(buf, t, g=.3, **k): put(buf, sweep(440, 220, .35, .01, .2), t, g)

def cizirti(buf, t, g=.3, bitis=None, **k):   # telsiz statiği
    d = (bitis if bitis is not None else t + 2) - t
    x = bp(noise(d), 1200, 7000); gate = np.convolve((rs.rand(len(x)) > .75).astype(float), np.ones(220) / 220, mode='same')
    put(buf, x * (.35 + 1.1 * gate) * env(len(x), .05, .15), t, g)

def zzt(buf, t, g=.5, d=.15, **k):            # elektrik titremesi
    x = bp(noise(d), 300, 6000) * (rs.rand(int(d * SR)) > .5); put(buf, x * env(len(x), .001, .05) * 2, t, g)

def sivic(buf, t, g=.5, **k): put(buf, topla(click(2200, .05), thud(130, .1) * .8), t, g)

def lamba(buf, t, g=.5, d=3.0, **k):          # lamba ısınma uğultusu
    n = int(d * SR); tt = np.arange(n) / SR; f = 60 + 50 * np.minimum(1, tt / .6)
    x = np.sin(2 * np.pi * np.cumsum(f) / SR) + .4 * np.sin(2 * np.pi * np.cumsum(2 * f) / SR)
    put(buf, x * env(n, .3, .6) * .5, t, g); put(buf, thud(55, .5) * 1.2, t, g * .8)

def duduk(buf, t, g=.25, **k):                # uzaktan tekne düdüğü
    d = 1.4; tt = np.arange(int(d * SR)) / SR; ph = 2 * np.pi * np.cumsum(175 * (1 + .01 * np.sin(2 * np.pi * 5 * tt))) / SR
    x = (np.sin(ph) + .5 * np.sin(2 * ph) + .25 * np.sin(3 * ph)) * env(len(tt), .12, .5); put(buf, bp(x, 100, 900), t, g)

def marti(buf, t, g=.3, **k):
    x = np.concatenate([sweep(1700, 2500, .18, .01, .05), sweep(2500, 1500, .35, .01, .2)]); put(buf, x * .6, t, g)

def sicrama(buf, t, g=.25, **k): put(buf, bp(noise(.4), 600, 5000) * np.exp(-np.linspace(0, 5, int(.4 * SR))), t, g)

def zil(buf, t, g=.3, **k): put(buf, echo(topla(tone(660, .9, .002, .8) * .6, tone(1320, .6, .002, .5) * .3), ((.3, .25),)), t, g)

def suhh(buf, t, g=.12, **k): put(buf, bp(noise(.6), 3000, 9000) * np.sin(np.linspace(0, np.pi, int(.6 * SR))) ** 2, t, g)

def kalp(buf, t, g=.35, bitis=None, aralik=.9, **k):
    s = t
    while s < (bitis if bitis is not None else t + 4):
        put(buf, thud(55, .22), s, g); put(buf, thud(48, .2), s + aralik * .28, g * .7)
        put(buf, bp(noise(.09), 130, 480) * env(int(.09 * SR), .001, .07) * 2.5, s, g * .8); put(buf, bp(noise(.09), 130, 480) * env(int(.09 * SR), .001, .07) * 2.0, s + aralik * .28, g * .6); s += aralik

def gicirti(buf, t, g=.2, **k):                # ahşap gıcırtı
    x = (2 * ((sweep(180, 140, .5, .05, .15) > 0).astype(float)) - 1) * .3; put(buf, bp(x + bp(noise(.5), 300, 1200) * .3, 200, 1400) * env(len(x), .05, .2), t, g)

def kart(buf, t, g=.2, **k): put(buf, riser(.5, 600, 4000, 1), t, g)

def kabarma(buf, t, g=.4, d=1.2, **k): put(buf, riser(d, 300, 3000, 1), t, g)

def sabit_vurus(buf, t, g=.5, f=42, d=1.2, **k): put(buf, thud(f, d) * 1.2, t, g)

def stinger(buf, t, g=.8, **k):                # Gölgesiz yüzü: bas vuruş + tiz kıvrım
    put(buf, thud(38, .9) * 1.4, t, g); put(buf, topla(sweep(3200, 1100, .9, .005, .6) * .4, bp(noise(.7), 1500, 8000) * np.exp(-np.linspace(0, 4, int(.7 * SR))) * .5), t, g * .7)

def akor(buf, t, g=.5, frekanslar=(110, 164.8), d=3.0, **k): put(buf, pad(frekanslar, d, 1.0), t, g)

EVENTS = {n: f for n, f in globals().items() if callable(f) and n in (
    'vurus', 'derin_vurus', 'adim', 'adimlar', 'kagit', 'sayfa', 'tiktak', 'sayac', 'bip', 'uyari', 'cizirti', 'zzt', 'sivic', 'lamba',
    'duduk', 'marti', 'sicrama', 'zil', 'suhh', 'kalp', 'gicirti', 'kart', 'kabarma', 'sabit_vurus', 'stinger', 'akor')}

# ---------------- müzik yatağı ----------------
def pad(freqs, d, g=.5, det=.4):
    t = np.arange(int(d * SR)) / SR; x = np.zeros(len(t))
    for f in freqs:
        for dd in (-det, 0, det):   # temel + oktav üstler: telefon hoparlöründe de duyulsun
            x += np.sin(2 * np.pi * (f + dd) * t) + .55 * np.sin(2 * np.pi * (2 * f + 2 * dd) * t) + .3 * np.sin(2 * np.pi * (4 * f + 3 * dd) * t)
    x /= len(freqs) * 3 * 1.4
    return x * env(len(x), 1.2, 1.2) * g
