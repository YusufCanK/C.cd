#!/usr/bin/env python3
"""Bölüm ses karışımı: konuşmalar (zaman çizelgesine göre) + sentezlenmiş efektler + müzik yatağı.
Kullanım: python3 sablon/ses_mix.py story/bolum-01 cikti.wav
Not: Efekt ve müzik kodla SENTEZLENİR (yer tutucu kalitesinde); lisanslı ses kütüphanesiyle değiştirilebilir."""
import json,subprocess,sys,pathlib,numpy as np
SR=44100;rs=np.random.RandomState(7)
class W(np.ndarray):
    # farklı uzunluktaki sesleri toplarken kısa olanı sıfırla doldurur
    def __new__(cls,a):return np.asarray(a,dtype=float).view(cls)
    def _p(s,o):
        o=np.asarray(o,dtype=float)
        if o.ndim==0:return np.asarray(s),o
        n=max(len(s),len(o));a=np.zeros(n);b=np.zeros(n);a[:len(s)]=np.asarray(s);b[:len(o)]=o;return a,b
    def __add__(s,o):a,b=s._p(o);return W(a+b)
    __radd__=__add__
def wrap(f):
    def g(*a,**k):return W(f(*a,**k))
    return g
B=pathlib.Path(sys.argv[1]);out=sys.argv[2];D=json.load(open(B/'zaman-cizelgesi.json'));SC={s['id']:s for s in D['sahneler']};TOT=D['toplam']+.5
N=int(TOT*SR)
def load(p):
    r=subprocess.run(['ffmpeg','-v','error','-i',str(p),'-f','f32le','-ac','1','-ar',str(SR),'-'],capture_output=True,check=True).stdout
    return np.frombuffer(r,dtype=np.float32).astype(np.float64)
def T(t):return int(t*SR)
def add_(*xs):
    n=max(len(x) for x in xs);y=np.zeros(n)
    for x in xs:y[:len(x)]+=x
    return y
def put(buf,x,t,g=1.0):
    i=T(t)
    if i>=len(buf):return
    j=min(len(buf),i+len(x));buf[i:j]+=x[:j-i]*g
@wrap
def noise(d):return rs.randn(int(d*SR))
@wrap
def bp(x,lo,hi):
    X=np.fft.rfft(x);f=np.fft.rfftfreq(len(x),1/SR);m=np.clip((f-lo)/max(lo*.2,20),0,1)*np.clip((hi-f)/max(hi*.2,20),0,1);return np.fft.irfft(X*m,len(x))
@wrap
def env(n,a,r):
    e=np.ones(n);ai=int(a*SR);ri=int(r*SR)
    if ai>0:e[:ai]=np.linspace(0,1,min(ai,n))[:min(ai,n)]
    if ri>0:e[-ri:]=np.minimum(e[-ri:],np.linspace(1,0,min(ri,n))[:min(ri,n)]) if ri<=n else e
    return e
@wrap
def tone(f,d,a=.01,r=.1,kind='sine'):
    t=np.arange(int(d*SR))/SR
    if kind=='sine':x=np.sin(2*np.pi*f*t)
    elif kind=='saw':x=2*((f*t)%1)-1
    elif kind=='tri':x=2*np.abs(2*((f*t)%1)-1)-1
    else:x=np.sign(np.sin(2*np.pi*f*t))
    return x*env(len(x),a,r)
@wrap
def sweep(f0,f1,d,a=.02,r=.2,kind='sine'):
    t=np.arange(int(d*SR))/SR;f=f0+(f1-f0)*t/d;ph=2*np.pi*np.cumsum(f)/SR
    x=np.sin(ph) if kind=='sine' else (2*((ph/(2*np.pi))%1)-1);return x*env(len(x),a,r)
@wrap
def click(f=2200,d=.04,g=1):return (tone(f,d,.001,.03)+noise(d)*.3*env(int(d*SR),.0005,.03))*g
@wrap
def thud(f=60,d=.35):return sweep(f*2,f*.7,d,.002,.25)+bp(noise(d),40,400)*.6*env(int(d*SR),.001,.2)
@wrap
def swell(d,lo,hi,peak=.5):
    x=bp(noise(d),lo,hi);e=np.sin(np.linspace(0,np.pi,len(x)))**1.5;return x*e*peak
@wrap
def echo(x,taps=((0.22,.5),(0.47,.3),(0.8,.18),(1.2,.1))):
    y=np.zeros(len(x)+int(1.5*SR));y[:len(x)]+=x
    for dt,g in taps:y[int(dt*SR):int(dt*SR)+len(x)]+=x*g
    return y
def heart(buf,t0,t1,period,g=.5):
    t=t0
    while t<t1:
        put(buf,thud(55,.22),t,g);put(buf,thud(48,.2),t+period*.28,g*.7);t+=period
def breath(buf,t0,t1,period=2.6,g=.35):
    t=t0
    while t<t1:
        put(buf,swell(1.0,350,1800,1),t,g);put(buf,swell(1.2,250,1200,1),t+1.1,g*.8);t+=period
def jingle(buf,t,d,g=.22):
    for _ in range(int(d*9)):
        put(buf,tone(rs.uniform(2400,5200),.12,.001,.1)*.6,t+rs.uniform(0,d),g)
def steps(buf,times,g=.4):
    for t in times:put(buf,bp(noise(.12),80,900)*env(int(.12*SR),.002,.1)*3,t,g);put(buf,thud(70,.1),t,g*.5)
voice=np.zeros(N);sfx=np.zeros(N);mus=np.zeros(N)
# ---- konuşmalar ----
for s in D['sahneler']:
    S=s['baslangic']
    if 'ses' in s:
        x=load(B/s['ses']['dosya']);rms=np.sqrt(np.mean(x**2))+1e-9;x=x*(0.11/rms);put(voice,x,S+s['ses']['baslangic'])
    if 'fisilti' in s:
        p=B/s['fisilti']['dosya']
        if p.exists():
            x=load(p);rms=np.sqrt(np.mean(x**2))+1e-9;w=x*(0.09/rms);put(voice,w,S+s['fisilti']['baslangic']);put(sfx,echo(W(w),((.2,.45),(.45,.28),(.8,.15))),S+s['fisilti']['baslangic'],.5)
# ---- efektler ve müzik: bölüme özel dosya (story/bolum-NN/efektler.py) ----
SABLON=pathlib.Path(__file__).resolve().parent
def sc(i,t):return SC[i]['baslangic']+t
@wrap
def pad(freqs,d,g=.5,det=.4):
    t=np.arange(int(d*SR))/SR;x=np.zeros(len(t))
    for f in freqs:
        for dd in (-det,0,det):x+=np.sin(2*np.pi*(f+dd)*t)
    x/=len(freqs)*3;return x*env(len(x),1.2,1.2)*g
def mseg(i0,i1,x_fn):
    t0=SC[i0]['baslangic'];t1=SC[i1]['baslangic']+SC[i1]['sure'];d=t1-t0;put(mus,x_fn(d),t0,1)
_ef=B/'efektler.py'
if _ef.exists():exec(compile(_ef.read_text(),str(_ef),'exec'),globals())
else:print('UYARI: efektler.py yok, sadece konuşma')
# ---- karışım ----
venv=np.convolve(np.abs(voice),np.ones(int(.12*SR))/int(.12*SR),mode='same');venv=np.clip(venv/0.08,0,1)
sfx=np.tanh(sfx*1.6)/1.6*0.75  # efekt tepelerini yumuşak sınırla
mus=mus*(1-.6*venv)
mix=voice*1.7+sfx+mus*0.14
mix=np.tanh(mix*1.2)/np.tanh(1.2)
mix=mix/np.max(np.abs(mix))*0.89
st=np.stack([mix,mix],1);i16=(st*32767).astype(np.int16)
import wave
w=wave.open(out,'wb');w.setnchannels(2);w.setsampwidth(2);w.setframerate(SR);w.writeframes(i16.tobytes());w.close()
print('ses karışımı tamam',round(TOT,1),'sn, tepe',round(float(np.max(np.abs(mix))),2))
