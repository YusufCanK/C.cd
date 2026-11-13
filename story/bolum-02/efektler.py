# Bölüm 2 (Merdiven) efekt ve müzik yatağı. sablon/ses_mix.py tarafından çalıştırılır (kredi yok).
import importlib.util
_sp=importlib.util.spec_from_file_location('sisli_ses',str(SABLON/'sisli_ses.py'));_m=importlib.util.module_from_spec(_sp);_a=sys.argv;sys.argv=['x'];_sp.loader.exec_module(_m);sys.argv=_a
def imza(sure,seed,g,t,yakin=1.0,lp=None):
    x=np.asarray(_m.imza(sure=sure,seed=seed),dtype=float);x=x/(np.max(np.abs(x))+1e-9)
    if lp:x=bp(x,30,lp)
    put(sfx,x*yakin,t,g)
def kutu(t,g=.5):put(sfx,thud(55,.9)*1.5,t,g);put(sfx,echo(bp(noise(.25),200,3000)*env(int(.25*SR),.001,.2)),t,g*.6)
def vinlama(t,d=.9,g=.2):put(sfx,(tone(180,d,.01,.05)*(1+np.sin(2*np.pi*28*np.arange(int(d*SR))/SR))),t,g)
def cam(t,g=.5):
    put(sfx,bp(noise(.6),2500,9000)*env(int(.6*SR),.001,.5)*1.6,t,g)
    for k in range(9):put(sfx,tone(3000+k*450,.12,.001,.1),t+.05+k*.04,g*.25)
# 1: seçim kartı vuruşu ve başlık
put(sfx,swell(1.2,80,600,1),sc(1,.1),.3);put(sfx,thud(45,.8)*1.2,sc(1,2.4),.5)
# 2: Sisli yaklaşıyor, kalp
imza(6,21,.5,sc(2,0),.9);heart(sfx,sc(2,.5),sc(2,6),.75,.3)
# 3: ıska: kapı kasasına balta
put(sfx,sweep(900,300,.25,.002,.1)*.5,sc(3,.1),.4);kutu(sc(3,.35),.85);put(sfx,click(600,.08)*1.2,sc(3,.4),.5)
# 4: yankı aşağı iniyor
_g=thud(45,.6)
for _dt,_gg in ((0,1),(.35,.6),(.8,.45),(1.4,.32),(2.1,.22),(2.9,.14),(3.7,.08)):put(sfx,bp(_g,40,max(300,2500-_dt*600)),sc(4,_dt),.45*_gg)
put(sfx,swell(5,40,200,1),sc(4,0),.15)
# 5: ikinci savuruş ve düşüş
put(sfx,bp(noise(.35),400,3000)*np.sin(np.linspace(0,np.pi,int(.35*SR))),sc(5,.15),.35);put(sfx,thud(70,.3)*1.3,sc(5,.45),.7);put(sfx,thud(50,.5),sc(5,1.2),.55)
# 6: anahtarlık şıngırtısı, sessizlik
jingle(sfx,sc(6,.3),.6,.25);put(sfx,swell(8,60,250,1),sc(6,0),.08)
# 7: aşağıdan cevap (birden çok imza, uzak ve yankılı)
for k,(t,s) in enumerate([(.6,31),(1.4,32),(2.1,33),(2.9,34)]):imza(4,s,.28,sc(7,t),.8,lp=1800)
# 8: kalp atışı
heart(sfx,sc(8,0),sc(8,4),.7,.35)
# 9: sessiz adımlar, uzaktan imza
steps(sfx,[sc(9,x) for x in (.4,1.6,2.8,4.0,5.2,6.2)],.12);imza(7,41,.2,sc(9,0),.6,lp=1500)
# 10: titreşim, sonra mesaj; mesajın arkasında çok zayıf hırıltı (sezon ipucu)
vinlama(sc(10,0),.5,.25);imza(8.5,51,.05,sc(10,.3),.5,lp=1200)
# 11: titreşim bir Sisli'yi çekiyor
vinlama(sc(11,0),.4,.2);imza(5,61,.45,sc(11,.6),1.0)
# 12: yangın dolabının camı
heart(sfx,sc(12,0),sc(12,3.3),.6,.25);put(sfx,thud(90,.15)*1.2,sc(12,3.3),.6);cam(sc(12,3.4),.6);imza(3,71,.3,sc(12,4.2),.8)
# 13: maske kutusu
put(sfx,click(1200,.05)+click(800,.06)*.6,sc(13,.3),.4);put(sfx,bp(noise(.4),1500,6000)*env(int(.4*SR),.01,.3),sc(13,.6),.15)
# 14: lobi, üç Sisli, dışarıdan rüzgâr
put(sfx,swell(7,150,900,1),sc(14,0),.18);imza(7,81,.32,sc(14,.2),.9);imza(6,82,.22,sc(14,1.1),.7)
# 15: seçim
put(sfx,thud(42,1.2)*1.2,sc(15,0),.5)
# ---- müzik yatağı ----
mseg(1,2,lambda d:pad([55,77.8],d,.7))
mseg(3,5,lambda d:pad([49,73.4,103.8],d,.75)+swell(d,300,2000,.3))
mseg(6,6,lambda d:pad([110,130.8,164.8],d,.45))
mseg(7,9,lambda d:pad([46.2,69.3,98],d,.8))
mseg(10,10,lambda d:pad([110,138.6,164.8],d,.35))
mseg(11,13,lambda d:pad([55,82.4,116.5],d,.7))
mseg(14,15,lambda d:pad([49,73.4,103.8,146.8],d,.85)+swell(d,200,2600,.35))
