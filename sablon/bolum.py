#!/usr/bin/env python3
"""Bölüm üretim hattı (tek komut). Onay kapıları: render ve ses üretimi bayrak ister.
Kullanım:
  python3 sablon/bolum.py yeni 02            -> story/bolum-02/ iskeleti (senaryo/sahneler şablonu)
  python3 sablon/bolum.py kontrol 01         -> dosya, ses ve kural kontrolü (render yok)
  python3 sablon/bolum.py onizle 01          -> zaman çizelgesi + derlenmiş sayfa (render yok, 0 kredi)
  python3 sablon/bolum.py render 01 --onayli -> kare + ses + mp4 (SADECE kullanıcı onayından sonra)"""
import sys,json,pathlib,subprocess,shutil
K=pathlib.Path(__file__).resolve().parent.parent
def sh(*a):subprocess.run([str(x) for x in a],check=True,cwd=K)
def yol(n):return K/'story'/f'bolum-{n}'
def yeni(n):
    B=yol(n)
    if B.exists():sys.exit(f'{B} zaten var')
    (B/'ses').mkdir(parents=True)
    ref=K/'story'/'bolum-01'
    for f in ('uretim-plani.md','yayin-paketi.md'):
        if (ref/f).exists():shutil.copy(ref/f,B/f)
    (B/'senaryo.md').write_text(f'# Bölüm {n} senaryosu\n\n(Önceki bölümün seçimi: story/degiskenler.json)\n\n## Sahneler\n\n## Bölüm sonu seçimi (A/B)\n')
    json.dump({'bolum':n,'sahneler':[]},open(B/'sahneler.json','w'),ensure_ascii=False,indent=1)
    print('iskelet hazır:',B,'\nSıra: senaryo -> ONAY -> sahneler.json -> ONAY -> ses (kredi tahmini + ONAY) -> onizle -> ONAY -> render')
def kontrol(n):
    B=yol(n);ok=True
    S=json.load(open(B/'sahneler.json'))['sahneler']
    for s in S:
        i=s['id']
        if s.get('ses_yok') or s.get('konusmaci')=='-':continue
        if not any((B/'ses'/f).exists() for f in (f'sahne{i:02d}-anlatici.mp3',f'sahne{i:02d}-deniz.mp3',f'sahne{i:02d}-ela.mp3')):
            print('EKSİK SES: sahne',i);ok=False
    z=B/'zaman-cizelgesi.json'
    if z.exists():
        t=json.load(open(z))['toplam'];print('süre',t,'sn','(hedef 80-90; bölüm 1 için 106,9 kabul edildi)' if t>90 else '')
    print('tamam' if ok else 'eksik var')
def onizle(n):
    B=yol(n);sh('python3','sablon/bolum_veri.py',B);sh('python3','sablon/bolum_derle.py',B,f'prototip/bolum{n}.build.html')
    print('Önizleme derlendi. Sonraki: Artifact ile göster, ONAY al.')
def render(n):
    if '--onayli' not in sys.argv:sys.exit('Render için kullanıcı onayı gerekir: --onayli bayrağı yalnızca onaydan sonra.')
    B=yol(n);onizle(n);T=json.load(open(B/'zaman-cizelgesi.json'))['toplam']
    wav=f'/tmp/bolum{n}.wav';kd=f'/tmp/kareler{n}'
    sh('python3','sablon/ses_mix.py',B,wav);shutil.rmtree(kd,ignore_errors=True)
    sh('node','sablon/render_kareler.js',f'prototip/bolum{n}.build.html',kd,T,30,4)
    sh('ffmpeg','-v','error','-y','-framerate',30,'-i',f'{kd}/%05d.jpg','-i',wav,'-c:v','libx264','-crf',21,'-pix_fmt','yuv420p','-c:a','aac','-shortest',B/'cikti.mp4')
    print('hazır:',B/'cikti.mp4')
if __name__=='__main__':
    if len(sys.argv)<3:sys.exit(__doc__)
    {'yeni':yeni,'kontrol':kontrol,'onizle':onizle,'render':render}[sys.argv[1]](sys.argv[2])
