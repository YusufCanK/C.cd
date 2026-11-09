#!/usr/bin/env python3
"""Sisli ses imzası (Kat 9'a özgü): derin, boğuk hırıltı + içinde kuru, kesik solunum, düzensiz nefes aralıkları.
Kodla sentezlenir (kredi harcamaz). Seri boyunca aynı fonksiyon kullanılır.
Kullanım: python3 sablon/sisli_ses.py cikti.wav [uzun|motif]"""
import numpy as np,sys,wave
SR=44100
def _rs(seed):return np.random.RandomState(seed)
def bp(x,lo,hi):
    X=np.fft.rfft(x);f=np.fft.rfftfreq(len(x),1/SR)
    m=np.clip((f-lo)/max(lo*.25,15),0,1)*np.clip((hi-f)/max(hi*.25,15),0,1);return np.fft.irfft(X*m,len(x))
def lp(x,fc):return bp(x,1,fc)
def env(n,a,r):
    e=np.ones(n);ai=max(1,int(a*SR));ri=max(1,int(r*SR))
    e[:ai]=np.linspace(0,1,ai)[:min(ai,n)] if ai<=n else e[:ai]
    if ri<n:e[-ri:]=np.minimum(e[-ri:],np.linspace(1,0,ri))
    return e
def hirilti(d,rs,f0=60):
    """derin, boğuk, pürüzlü hırıltı (ses teli titreşimi + jitter + gırtlak gürültüsü)"""
    n=int(d*SR);t=np.arange(n)/SR
    walk=np.cumsum(rs.randn(n));walk=walk/np.max(np.abs(walk)+1e-9)
    f=f0+9*np.sin(2*np.pi*.6*t)+6*walk                      # düzensiz perde
    ph=np.cumsum(f)/SR;saw=2*(ph%1)-1
    x=np.tanh(2.2*saw)                                      # çarpık, gırtlaksı dalga
    x*=1+.7*np.sign(np.sin(2*np.pi*(26+4*walk)*t))*.5       # düşük frekanslı pürüz (vokal fry)
    x=bp(x,60,520)+.55*bp(x,300,900)*np.sin(np.pi*np.minimum(1,t/d))
    x+=.35*bp(rs.randn(n),120,700)*(.5+.5*np.sin(2*np.pi*2.3*t+walk))   # gırtlak hışırtısı
    return x*env(n,.18,.55)
def kuru_nefes(rs,n_patlama=4):
    """kuru, kesik solunum: kısa, keskin başlangıçlı, dar bantlı hışırtılar (arada tıkırtı)"""
    out=[];t=0.0;seg=[]
    for k in range(n_patlama):
        d=rs.uniform(.045,.12);x=bp(rs.randn(int(d*SR)),rs.uniform(1500,2600),rs.uniform(5200,7600))
        x=x*env(len(x),.004,d*.6)*rs.uniform(.6,1)
        x+=.5*bp(rs.randn(int(d*SR)),500,1100)*env(len(x),.004,d*.5)            # boğaz çıtırtısı
        seg.append((t,x));t+=d+rs.uniform(.05,.17)
    y=np.zeros(int(t*SR)+1000)
    for s,x in seg:y[int(s*SR):int(s*SR)+len(x)]+=x
    return y
def yankı(x,taps=((.17,.4),(.41,.22),(.78,.12))):
    y=np.zeros(len(x)+int(1.0*SR));y[:len(x)]+=x
    for dt,g in taps:y[int(dt*SR):int(dt*SR)+len(x)]+=x*g
    return y
def nefes_dongusu(rs,yakin=1.0):
    """bir düzensiz solunum döngüsü: kuru kesik soluk + boğuk hırıltı"""
    ink=kuru_nefes(rs,rs.randint(3,6))
    gap=rs.uniform(.12,.3);hr=hirilti(rs.uniform(.9,1.5),rs)
    # hırıltının üstünde arada kuru bir kesik soluk (imzanın ayırt edici parçası)
    ek=kuru_nefes(rs,2)*.55
    n=len(ink)+int(gap*SR)+len(hr);y=np.zeros(n+len(ek)+SR)
    y[:len(ink)]+=ink*.8;a=len(ink)+int(gap*SR);y[a:a+len(hr)]+=hr*1.0
    b=a+int(len(hr)*rs.uniform(.45,.7));y[b:b+len(ek)]+=ek
    # yakınlık: uzakta karanlık/kısık, yakında açık ve yüksek
    # uzakta daha kısık ama kuru kesik solunum (yüksek bant) KORUNUR: imza uzaktan da tanınsın
    fc=2600+5400*yakin;y=lp(y,fc) if yakin<.95 else y
    return y*(.3+.7*yakin)
def imza(sure=9.0,seed=11):
    rs=_rs(seed);N=int((sure+1.2)*SR);m=np.zeros(N)
    starts=[.35,3.15,6.0] if sure>=8 else [.2]
    for i,s in enumerate(starts):
        yakin=(i+1)/len(starts) if len(starts)>1 else 1.0
        c=nefes_dongusu(rs,yakin);c=yankı(c);a=int(s*SR);m[a:a+len(c)]+=c[:N-a]
    m+=.04*lp(rs.randn(N),90)*np.linspace(.2,1,N)    # uzaktan alçak uğultu
    m=m[:int(sure*SR)];m*=env(len(m),.1,.6)
    return np.tanh(m/np.max(np.abs(m))*1.5)/np.tanh(1.5)*.89
if __name__=='__main__':
    out=sys.argv[1];mod=sys.argv[2] if len(sys.argv)>2 else 'uzun'
    x=imza(9.0 if mod=='uzun' else 3.0)
    w=wave.open(out,'wb');w.setnchannels(1);w.setsampwidth(2);w.setframerate(SR);w.writeframes((x*32767).astype(np.int16).tobytes());w.close()
    print('tamam',out,round(len(x)/SR,1),'sn')
