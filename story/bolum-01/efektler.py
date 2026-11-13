# Bölüm 1 sahne efektleri ve müzik yatağı (sablon/ses_mix.py tarafından çalıştırılır).
# Kullanılabilir: put, sfx, mus, SC, sc(i,t), noise, bp, env, tone, sweep, click, thud, swell, echo, heart, breath, jingle, steps, pad, mseg, np, SR, pathlib, sys
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
jingle(sfx,sc(14,2.7),.7)
# 15
heart(sfx,sc(15,0),sc(15,SC[15]['sure']),.9,.3);jingle(sfx,sc(15,1.8),.8)
put(sfx,thud(42,1.2)*1.2,sc(15,SC[15]['sure']-.9),.55)
# Sisli ses imzası (onaylı örnek, sahne 14-15)
import importlib.util
_sp=importlib.util.spec_from_file_location('sisli_ses',str(SABLON/'sisli_ses.py'));_m=importlib.util.module_from_spec(_sp);_sys_argv=sys.argv;sys.argv=['x'];_sp.loader.exec_module(_m);sys.argv=_sys_argv
_im=np.asarray(_m.imza(sure=11.0,seed=11),dtype=float);_im=_im/(np.max(np.abs(_im))+1e-9)
put(sfx,_im,sc(14,1.0),.55)
# 16
put(sfx,thud(48,.8)*1.4,sc(16,0),.6);heart(sfx,sc(16,.1),sc(16,3),.45,.4);put(sfx,tone(3500,2.2,.5,1.2)*.5,sc(16,.4),.05)
# 17
for k,t in enumerate((.1,.3,.55)):put(sfx,bp(noise(.35),400,3500)*np.sin(np.linspace(0,np.pi,int(.35*SR))),sc(17,t),.3);put(sfx,click(1100+k*300,.05),sc(17,t+.25),.3)
put(sfx,thud(45,1.4)*1.4,sc(17,1.1),.5);put(sfx,swell(4,70,500,1),sc(17,.8),.22)
# ---- müzik yatağı ----
mseg(1,3,lambda d:pad([55,77.8],d,.7)+pad([110],d,.15))                       # karanlık drone
mseg(4,6,lambda d:pad([55,110,130.8,164.8],d,.55))                            # Am pad
mseg(7,7,lambda d:pad([110,164.8],d,.25))
mseg(9,9,lambda d:pad([110,138.6,164.8,220],d,.6)+pad([329.6],d,.12))           # sıcak
mseg(10,12,lambda d:pad([55,82.4,116.5],d,.65))                                # gerilim
mseg(13,13,lambda d:pad([55,77.8,116.5],d,.7))
mseg(14,15,lambda d:pad([49,73.4,103.8],d,.8)+swell(d,300,2200,.35))           # yükselen
mseg(16,17,lambda d:pad([49,69.3,98,138.6],d,.85)+swell(d,200,3000,.4))
