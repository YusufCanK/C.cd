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
            x=load(p);rms=np.sqrt(np.mean(x**2))+1e-9;put(voice,x*(0.09/rms),S+s['fisilti']['baslangic'])
# ---- efektler (sahne başına) ----
def sc(i,t):return SC[i]['baslangic']+t
# 1
put(sfx,swell(3.6,200,900,1),sc(1,0),.5);put(sfx,thud(45,.9)*1.3,sc(1,.2),.55)
# 2
put(sfx,swell(9,200,700,1),sc(2,0),.28);put(sfx,tone(100,9,.5,.5,'square')*.5+tone(200,9,.5,.5,'sine')*.3,sc(2,0),.015)
for t in (3.0,6.3):
    m=sweep(135,92,1.8,.3,.6,'saw');mod=1+.25*np.sin(2*np.pi*5*np.arange(len(m))/SR);put(sfx,bp(m*mod,90,700),sc(2,t),.22)
steps(sfx,[sc(2,x) for x in (.6,1.5,2.2,3.4,4.1,5.2,6.0,7.1,8.0)],.18)
# 3
c3=SC[3]['altyazi'];b=c3[1]['t0'];d=c3[2]['t0']
for k in range(6):put(sfx,click(1500+k*120,.05,1),sc(3,.35+k*.27),.35)
put(sfx,bp(noise(d-b),1500,8000)*.6,sc(3,b),.16);put(sfx,click(700,.08)*.9+thud(70,.2),sc(3,d-.05),.4)
put(sfx,bp(noise(SC[3]['sure']-d-.3),900,5000)*np.linspace(1,0,int((SC[3]['sure']-d-.3)*SR)),sc(3,d),.14)
# 4
put(sfx,swell(4.5,60,300,1),sc(4,0),.2)
# 5
for k in range(8):put(sfx,click(2600,.03,1),sc(5,.3+k*.5),.22)
# 6
for t in (.5,3.1):put(sfx,tone(2000,.12,.003,.06)*.5,sc(6,t),.3)
put(sfx,tone(880,.14,.005,.1)+tone(1320,.2,.005,.15),sc(6,1.4),.3)
put(sfx,tone(80,.5,.01,.05,'square')*(1+np.sin(2*np.pi*30*np.arange(int(.5*SR))/SR)),sc(6,1.45),.12)
# 7
for t in np.arange(1.9,5.0,.55):put(sfx,bp(noise(.45),2000,7000)*(1+.7*np.sin(2*np.pi*9*np.arange(int(.45*SR))/SR))*env(int(.45*SR),.03,.1),sc(7,t),.07)
tt=SC[7]['altyazi'][-1]['t0'];put(sfx,click(900,.06)+bp(noise(.5),1000,6000)*np.linspace(.7,0,int(.5*SR)),sc(7,tt+.05),.35)
# 8
put(sfx,sweep(300,40,.9,.005,.6)+thud(50,.5),sc(8,0),.22);put(sfx,swell(3.8,40,200,1),sc(8,.2),.02)
# 10
put(sfx,tone(60,8.9,.5,.5,'sine')*.6+tone(120,8.9,.5,.5,'tri')*.25,sc(10,0),.12)
for t in (.2,4.7):put(sfx,bp(noise(.5),1500,6500)*env(int(.5*SR),.05,.3),sc(10,t),.12)
# 11
for t in (1.0,3.6,6.0):put(sfx,echo(tone(1300,.05,.001,.05)*.8+tone(650,.08,.001,.07)*.4),sc(11,t),.28)
put(sfx,swell(8,30,160,1),sc(11,0),.3)
# 12
steps(sfx,[sc(12,x) for x in (.3,.85,1.4)],.4);put(sfx,click(3500,.03,1)+tone(1500,.05,.001,.04),sc(12,1.95),.5);put(sfx,thud(90,.12)+click(900,.05),sc(12,2.45),.5)
# 13
c13=SC[13]['altyazi'];put(sfx,click(1800,.03)+click(900,.05)*.8,sc(13,c13[1]['t0']+.1),.4)
put(sfx,thud(75,.5)*1.4+bp(noise(.2),500,3000)*env(int(.2*SR),.001,.1),sc(13,c13[2]['t0']+.15),.55)
put(sfx,swell(11,40,200,1),sc(13,0),.16)
# 14
put(sfx,sweep(420,950,1.4,.02,.4)*np.sin(np.linspace(0,25,int(1.4*SR)))**2*.8,sc(14,0),.3);put(sfx,thud(60,.25),sc(14,1.35),.3)
breath(sfx,sc(14,1.2),sc(14,4.5),2.6,.3);jingle(sfx,sc(14,2.7),.7)
# 15
heart(sfx,sc(15,0),sc(15,SC[15]['sure']),.9,.3);breath(sfx,sc(15,.2),sc(15,6),2.6,.25);jingle(sfx,sc(15,1.8),.8)
put(sfx,thud(42,1.2)*1.2,sc(15,SC[15]['sure']-.9),.55)
# 16
put(sfx,thud(48,.8)*1.4,sc(16,0),.6);heart(sfx,sc(16,.1),sc(16,3),.45,.4);put(sfx,tone(3500,2.2,.5,1.2)*.5,sc(16,.4),.05)
# 17
for k,t in enumerate((.1,.3,.55)):put(sfx,bp(noise(.35),400,3500)*np.sin(np.linspace(0,np.pi,int(.35*SR))),sc(17,t),.3);put(sfx,click(1100+k*300,.05),sc(17,t+.25),.3)
put(sfx,thud(45,1.4)*1.4,sc(17,1.1),.5);put(sfx,swell(4,70,500,1),sc(17,.8),.22)
# ---- müzik yatağı ----
@wrap
def pad(freqs,d,g=.5,det=.4):
    t=np.arange(int(d*SR))/SR;x=np.zeros(len(t))
    for f in freqs:
        for dd in (-det,0,det):x+=np.sin(2*np.pi*(f+dd)*t)
    x/=len(freqs)*3;return x*env(len(x),1.2,1.2)*g
def mseg(i0,i1,x_fn):
    t0=SC[i0]['baslangic'];t1=SC[i1]['baslangic']+SC[i1]['sure'];d=t1-t0;put(mus,x_fn(d),t0,1)
mseg(1,3,lambda d:pad([55,77.8],d,.7)+pad([110],d,.15))                       # karanlık drone
mseg(4,6,lambda d:pad([55,110,130.8,164.8],d,.55))                            # Am pad
mseg(7,7,lambda d:pad([110,164.8],d,.25))
mseg(9,9,lambda d:pad([110,138.6,164.8,220],d,.6)+pad([329.6],d,.12))           # sıcak
mseg(10,12,lambda d:pad([55,82.4,116.5],d,.65))                                # gerilim
mseg(13,13,lambda d:pad([55,77.8,116.5],d,.7))
mseg(14,15,lambda d:pad([49,73.4,103.8],d,.8)+swell(d,300,2200,.35))           # yükselen
mseg(16,17,lambda d:pad([49,69.3,98,138.6],d,.85)+swell(d,200,3000,.4))
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
print('ses karışımı tamam',round(TOT,1),'sn, tepe',round(float(np.max(np.abs(mix))),2),'; fısıltı:','var' if (B/'ses/sahne15-fisilti.mp3').exists() else 'YOK')
