#!/usr/bin/env python3
"""Bir bölümün zaman çizelgesini ses dosyalarından üretir (sahne süreleri, altyazı zamanları, ağız hareketi).
Kullanım: python3 sablon/bolum_veri.py story/bolum-01  -> story/bolum-01/zaman-cizelgesi.json"""
import json,re,subprocess,sys,pathlib
kok=pathlib.Path(__file__).resolve().parent.parent
B=pathlib.Path(sys.argv[1]);SJ=json.load(open(B/'sahneler.json'));S=SJ['sahneler'];HEDEF=SJ.get('panel_hedef',"ELA'YA ULAŞ")
def sure(p):return float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',str(p)]).decode())
def visemes(mp3):
    wav='/tmp/_v.wav';subprocess.run(['ffmpeg','-v','error','-y','-i',str(mp3),'-ac','1','-ar','16000','-c:a','pcm_s16le',wav],check=True)
    return json.loads(subprocess.check_output(['node',str(kok/'sablon'/'lipsync_cli.js'),wav]).decode())
def TRUP(s):return s.replace('i','İ').replace('ı','I').upper()
def wrap(t,maxc=None):
    maxc=maxc or ALTMAX
    w=t.split();lines=[];cur=''
    for x in w:
        if cur and len(cur)+1+len(x)>maxc:lines.append(cur);cur=x
        else:cur=(cur+' '+x).strip()
    if cur:lines.append(cur)
    return lines
LEAD=.2
# sahne başına: kuyruk (ses bittikten sonra bekleme), en az süre, ek
CFG={1:(.6,3.6),2:(.5,0),3:(.4,0),4:(1.6,0),5:(.5,0),6:(.45,0),7:(.5,0),8:(0,4.0),9:(.4,0),10:(.5,0),11:(.5,0),12:(.4,0),13:(.6,0),14:(.5,0),15:(.9,8.73),16:(0,3.0),17:(.8,0)}
WHISPER_DUR=1.3
wp=B/'ses'/'sahne15-fisilti.mp3'
if wp.exists():WHISPER_DUR=round(sure(wp),2)
# durum paneli: (saat, kalan, kat, uzaklık, eşya); None = panel gizli. Gün doğumu 06:50 varsayımı.
HUD_SAAT={1:'05:41',2:'05:41',3:'05:41',4:'05:41',5:'05:41',6:'05:41',7:'05:41',9:'05:43',10:'05:43',11:'05:45',12:'05:47',13:'05:47',14:'05:49',15:'05:49',16:'05:49'}
def hud(i):
    if i not in HUD_SAAT:return None
    h,m=map(int,HUD_SAAT[i].split(':'));kalan=(6*60+50)-(h*60+m)
    return {'gun':3,'saat':HUD_SAAT[i],'kalan':f'{kalan//60}:{kalan%60:02d}','kat':'9' if i in (11,12) else None,'uzak':'14 KM' if i==11 else None,'hedef':HEDEF}
EP1=B.name=='bolum-01'
ALTMAX=SJ.get('altyazi_max',22)
def hud2(s):
    h=s['hud']
    if h is None or h.get('gizli'):return None
    hh,mm=map(int,h['saat'].split(':'));kalan=(6*60+50)-(hh*60+mm)
    return {'gun':h.get('gun',3),'saat':h['saat'],'kalan':f'{kalan//60}:{kalan%60:02d}' if kalan>0 else '0:00','kat':h.get('kat'),'uzak':h.get('uzak'),'ek':h.get('ek'),'hedef':HEDEF}
out=[];t=0.0
for s in S:
    i=s['id'];ela=str(s.get('konusmaci','')).lower().startswith('ela')
    ses=None if s.get('ses_yok') else B/'ses'/(f'sahne{i:02d}-ela.mp3' if ela else f'sahne{i:02d}-deniz.mp3' if (B/'ses'/f'sahne{i:02d}-deniz.mp3').exists() else f'sahne{i:02d}-anlatici.mp3')
    tail,minimum=(s.get('kuyruk',.5),s.get('min_sure',0)) if ('kuyruk' in s or 'min_sure' in s or not EP1) else CFG[i];sc={'id':i,'konusmaci':s['konusmaci'],'ses_efekt':s.get('ses_efekt','')}
    if ses is not None and ses.exists():
        d=sure(ses);v=visemes(ses)
        if s.get('ses_kirp_sn'):
            d=min(d,s['ses_kirp_sn']);v=v[:int(d/.033)]
        sc['ses']={'dosya':str(ses.relative_to(B)),'baslangic':LEAD,'sure':round(d,3)}
        if s.get('ses_kirp_sn'):sc['ses']['kirp']=True
        dur=LEAD+d+tail
        dur=max(dur,minimum)
        # altyazı: cümleleri sessizlik boşluklarına göre zamanla
        text=re.sub(r'\([^)]*\)','',s['anlatim']).strip()
        sent=[x.strip() for x in re.split(r'(?<=[.?!])\s+',text) if x.strip()]
        runs=[];st=None
        for k,x in enumerate(v):
            if x!=0 and st is None:st=k
            if x==0 and st is not None:runs.append((st*.033,k*.033));st=None
        if st is not None:runs.append((st*.033,len(v)*.033))
        gaps=[(runs[k][1],runs[k+1][0]) for k in range(len(runs)-1) if runs[k+1][0]-runs[k][1]>=.12]
        n=len(sent);caps=[]
        if EP1 and i==15:sent=[re.sub(r'\s*\.\.\.\s*Deniz\.?','',x).strip() for x in sent];sent=[x for x in sent if x];n=len(sent)
        b=[]
        if n>1 and runs:
            tot=sum(len(x) for x in sent);a=runs[0][0];z=runs[-1][1];acc=0
            for x in sent[:-1]:
                acc+=len(x);guess=a+(z-a)*acc/tot
                cand=[g for g in gaps if abs((g[0]+g[1])/2-guess)<=0.7 and g[1]-g[0]>=.15]
                b.append(min(((g[0]+g[1])/2 for g in cand),key=lambda m:abs(m-guess)) if cand else guess)
            b=sorted(b)
        t0=max(0,(runs[0][0] if runs else 0)-.05)
        for k,x in enumerate(sent):
            a=t0 if k==0 else b[k-1];z=(b[k] if k<len(b) else (runs[-1][1] if runs else d)+.35)
            caps.append({'t0':round(LEAD+a,2),'t1':round(LEAD+z,2),'satir':wrap(TRUP(x)),'konusan':'ela' if ela else 'anlatici'})
        if not EP1:  # 3 satırı aşan altyazıyı 2'şer satırlık parçalara böl (süre harf oranıyla)
            yeni=[]
            for c in caps:
                L=c['satir']
                if len(L)>3:
                    parcalar=[L[k:k+2] for k in range(0,len(L),2)];top=sum(len(' '.join(x)) for x in parcalar);acc=0
                    for x in parcalar:
                        b0=c['t0']+(c['t1']-c['t0'])*acc/top;acc+=len(' '.join(x));b1=c['t0']+(c['t1']-c['t0'])*acc/top
                        yeni.append(dict(c,t0=round(b0,2),t1=round(b1,2),satir=x))
                else:yeni.append(c)
            caps=yeni
        sc['altyazi']=caps
        if s.get('agiz') or (EP1 and i in (7,16)):sc['agiz']=v
        if EP1 and i==13:  # fener / balta vurgusu için cümle sınırları
            sc['vurgu']=[c['t0'] for c in caps]
    else:
        dur=minimum;sc['sessiz']=True;sc['altyazi']=[]
        txt=re.sub(r'\([^)]*\)','',s.get('anlatim','')).strip()
        if txt and not s.get('ses_yok') and not EP1:  # ses henüz yok: tahmini altyazı (önizleme)
            sent=[x.strip() for x in re.split(r'(?<=[.?!])\s+',txt) if x.strip()];tot=sum(len(x) for x in sent);a0=LEAD;z0=max(LEAD+.5,dur-.4);acc=0
            for x in sent:
                b0=a0+(z0-a0)*acc/tot;acc+=len(x);b1=a0+(z0-a0)*acc/tot
                sc['altyazi'].append({'t0':round(b0,2),'t1':round(b1,2),'satir':wrap(TRUP(x)),'konusan':'ela' if ela else 'anlatici','tahmini':True})
    sc['hud']=hud2(s) if 'hud' in s else hud(i);sc['baslangic']=round(t,2);sc['sure']=round(dur,2);t+=dur;out.append(sc)
json.dump({'toplam':round(t,2),'sahneler':out,'baslik_karti':SJ.get('baslik_karti',{'sahne':1,'t0':0,'t1':2.9,'ust':'BÖLÜM 1','alt':'SON MESAJ'}),'chip':SJ.get('chip','KAT 9 · BÖLÜM 1')},open(B/'zaman-cizelgesi.json','w'),ensure_ascii=False)
print('toplam',round(t,1),'sn')
for sc in out:print(sc['id'],sc['baslangic'],sc['sure'],[ (c['t0'],c['t1'],' / '.join(c['satir'])) for c in sc['altyazi']][:4])
