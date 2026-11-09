#!/usr/bin/env python3
"""Bir bölümün zaman çizelgesini ses dosyalarından üretir (sahne süreleri, altyazı zamanları, ağız hareketi).
Kullanım: python3 sablon/bolum_veri.py story/bolum-01  -> story/bolum-01/zaman-cizelgesi.json"""
import json,re,subprocess,sys,pathlib
kok=pathlib.Path(__file__).resolve().parent.parent
B=pathlib.Path(sys.argv[1]);S=json.load(open(B/'sahneler.json'))['sahneler']
def sure(p):return float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',str(p)]).decode())
def visemes(mp3):
    wav='/tmp/_v.wav';subprocess.run(['ffmpeg','-v','error','-y','-i',str(mp3),'-ac','1','-ar','16000','-c:a','pcm_s16le',wav],check=True)
    return json.loads(subprocess.check_output(['node',str(kok/'sablon'/'lipsync_cli.js'),wav]).decode())
def TRUP(s):return s.replace('i','İ').replace('ı','I').upper()
def wrap(t,maxc=22):
    w=t.split();lines=[];cur=''
    for x in w:
        if cur and len(cur)+1+len(x)>maxc:lines.append(cur);cur=x
        else:cur=(cur+' '+x).strip()
    if cur:lines.append(cur)
    return lines
LEAD=.2
# sahne başına: kuyruk (ses bittikten sonra bekleme), en az süre, ek
CFG={1:(.6,3.6),2:(.5,0),3:(.4,0),4:(1.6,0),5:(.5,0),6:(.45,0),7:(.5,0),8:(0,4.0),9:(.4,0),10:(.5,0),11:(.5,0),12:(.4,0),13:(.6,0),14:(.5,0),15:(.9,0),16:(0,3.0),17:(.8,0)}
WHISPER_DUR=1.3
wp=B/'ses'/'sahne15-fisilti.mp3'
if wp.exists():WHISPER_DUR=round(sure(wp),2)
# durum paneli: (saat, kalan, kat, uzaklık, eşya); None = panel gizli. Gün doğumu 06:50 varsayımı.
HUD_SAAT={1:'05:41',2:'05:41',3:'05:41',4:'05:41',5:'05:41',6:'05:41',7:'05:41',9:'05:43',10:'05:43',11:'05:45',12:'05:47',13:'05:47',14:'05:49',15:'05:49',16:'05:49'}
def hud(i):
    if i not in HUD_SAAT:return None
    h,m=map(int,HUD_SAAT[i].split(':'));kalan=(6*60+50)-(h*60+m)
    return {'gun':3,'saat':HUD_SAAT[i],'kalan':f'{kalan//60}:{kalan%60:02d}','kat':'9 / 9','uzak':'14 KM','esya':'?' if i>=13 else '—'}
out=[];t=0.0
for s in S:
    i=s['id'];ses=B/'ses'/(f'sahne{i:02d}-ela.mp3' if i==7 else f'sahne{i:02d}-anlatici.mp3')
    tail,minimum=CFG[i];sc={'id':i,'konusmaci':s['konusmaci'],'ses_efekt':s.get('ses_efekt','')}
    if ses.exists():
        d=sure(ses);v=visemes(ses);sc['ses']={'dosya':str(ses.relative_to(B)),'baslangic':LEAD,'sure':round(d,3)}
        dur=LEAD+d+tail
        if i==15:
            sc['fisilti']={'baslangic':round(LEAD+d+.5,2),'sure':WHISPER_DUR,'dosya':'ses/sahne15-fisilti.mp3'};dur=LEAD+d+.5+WHISPER_DUR+tail
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
        if i==15:sent=[re.sub(r'\s*\.\.\.\s*Deniz\.?','',x).strip() for x in sent];sent=[x for x in sent if x];n=len(sent)
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
            caps.append({'t0':round(LEAD+a,2),'t1':round(LEAD+z,2),'satir':wrap(TRUP(x)),'konusan':'ela' if i==7 else 'anlatici'})
        sc['altyazi']=caps
        if i in (7,16):sc['agiz']=v
        if i==13:  # fener / balta vurgusu için cümle sınırları
            sc['vurgu']=[c['t0'] for c in caps]
        if i==15:sc['altyazi'].append({'t0':sc['fisilti']['baslangic'],'t1':sc['fisilti']['baslangic']+WHISPER_DUR+.4,'satir':['…DENİZ.'],'konusan':'fisilti'})
    else:
        dur=minimum;sc['sessiz']=True;sc['altyazi']=[]
    sc['hud']=hud(i);sc['baslangic']=round(t,2);sc['sure']=round(dur,2);t+=dur;out.append(sc)
json.dump({'toplam':round(t,2),'sahneler':out},open(B/'zaman-cizelgesi.json','w'),ensure_ascii=False)
print('toplam',round(t,1),'sn')
for sc in out:print(sc['id'],sc['baslangic'],sc['sure'],[ (c['t0'],c['t1'],' / '.join(c['satir'])) for c in sc['altyazi']][:4])
