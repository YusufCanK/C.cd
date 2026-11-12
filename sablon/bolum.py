#!/usr/bin/env python3
"""Kara Burun bölüm üretim hattı (tek komut). Onay kapıları: ses üretimi ve render bayrak ister.
Kullanım:
  python3 sablon/bolum.py yeni 02       -> story/bolum-02/ iskeleti (senaryo, sahneler.json, sahne-cizim.js)
  python3 sablon/bolum.py kontrol 01    -> dosya, sahne çizimi ve ses kontrolü (render yok)
  python3 sablon/bolum.py onizle 01     -> zaman çizelgesi + derlenmiş önizleme (0 kredi)
  python3 sablon/bolum.py karisim 01    -> konuşma + efekt + müzik karışımı karisim.mp3 (0 kredi)
  python3 sablon/bolum.py render 01 --onayli -> kare + ses + mp4 (cikti.mp4; 0 kredi, birkaç dakika)
Sıra (her ok bir onay noktası): senaryo -> sahneler.json -> sahne çizimi/önizleme -> ses (kredi tahmini) -> render -> kapak/yayın.
Ses üretimi ElevenLabs araçlarıyla yapılır (kredi tahmini şart). Render --onayli ile çalışır."""
import sys, json, pathlib, subprocess, re, shutil, tempfile

K = pathlib.Path(__file__).resolve().parent.parent

def sh(*a):
    subprocess.run([str(x) for x in a], check=True, cwd=K)

def yol(n):
    return K / 'story' / f'bolum-{n}'

ISKELET_CIZIM = """/* Bölüm sahne çizimleri. Ortak yardımcılar: sablon/cizim.js (Cz), karakterler: sablon/rigs.js (Rigs).
   BOLUM.sahne[id] = {zoom:[z0,z1,cx,cy], ciz(g,sc), hook(lt,sc,g), agiz(v)}  (id'ler sahneler.json ile aynı) */
(function(){
const S=(window.BOLUM=window.BOLUM||{sahne:{}}).sahne,$=id=>document.getElementById(id);
// S[1]={ciz(g){g.innerHTML=Cz.duz('#0c141b')},hook(lt){}};
})();
"""

def yeni(n):
    B = yol(n)
    if B.exists():
        sys.exit(f'{B} zaten var')
    (B / 'ses').mkdir(parents=True)
    (B / 'senaryo.md').write_text(f'# Bölüm {n} senaryosu\n\n(Önceki bölümün seçimi: story/degiskenler.json)\n\n## Sahneler\n\n## Bölüm sonu seçimi (A/B)\n')
    json.dump({'bolum': int(n), 'baslik': '', 'hedef_sn': 85, 'sahneler': []}, open(B / 'sahneler.json', 'w'), ensure_ascii=False, indent=2)
    (B / 'sahne-cizim.js').write_text(ISKELET_CIZIM)
    print('iskelet hazır:', B, '\nSıra: senaryo -> ONAY -> sahneler.json -> ONAY -> sahne-cizim.js + önizleme -> ONAY -> ses (kredi tahmini + ONAY) -> render')

def kontrol(n):
    B = yol(n); ok = True
    for f in ('senaryo.md', 'sahneler.json', 'sahne-cizim.js'):
        if not (B / f).exists():
            print('EKSİK DOSYA:', f); ok = False
    if not ok:
        sys.exit('eksik var')
    S = json.load(open(B / 'sahneler.json'))['sahneler']
    cizim = (B / 'sahne-cizim.js').read_text()
    tanimli = {int(x) for x in re.findall(r'\bS\[(\d+)\]\s*=', cizim)}
    for s in S:
        i = s['id']
        if i not in tanimli:
            print('SAHNE ÇİZİMİ YOK: sahne', i); ok = False
        if s.get('ses_yok') or s.get('konusmaci') == '-' or not s.get('anlatim'):
            continue
        if not s.get('ses_dosyasi') or not (B / s['ses_dosyasi']).exists():
            print('ses henüz yok: sahne', i, f"({s['konusmaci']})")
    z = B / 'zaman-cizelgesi.json'
    if z.exists():
        zz = json.load(open(z)); print('süre', zz['toplam'], 'sn', '(tahmini)' if zz.get('tahmini') else '', '(hedef 80-90)')
    print('çizimler tamam' if ok else 'eksik var')

def karisim(n):
    """konuşma + ortam + efekt + müzik karışımı (ses-plani.json); -14 LUFS'a normalize edilir. Kredi harcamaz."""
    B = yol(n); ham = f'/tmp/kb_ham{n}.wav'
    sh('python3', 'sablon/ses_mix.py', B, ham)
    sh('ffmpeg', '-v', 'error', '-y', '-i', ham, '-af', 'loudnorm=I=-14:TP=-1.5:LRA=11', '-ar', 44100, B / 'karisim.wav')
    sh('ffmpeg', '-v', 'error', '-y', '-i', B / 'karisim.wav', '-b:a', '128k', B / 'karisim.mp3')
    print('karışım hazır:', B / 'karisim.mp3')

def render(n):
    """kare + ses + mp4. Kullanıcı onay kuralı: ses ve görüntü onaylandığında kullanıcı soru sormadan render'a izin verdi
    (--onayli bayrağı bu izni belirtir). Sessiz video render edilmez: karışım her render'da yeniden üretilir."""
    if '--onayli' not in sys.argv:
        sys.exit('Render için kullanıcı onayı gerekir: --onayli bayrağı yalnızca onaydan sonra.')
    B = yol(n)
    sh('python3', 'sablon/bolum_veri.py', B)
    sh('python3', 'sablon/bolum_derle.py', B, f'prototip/bolum{n}.render.html')   # kontrol çubuğu ve ses gömülü değil
    karisim(n)
    T = json.load(open(B / 'zaman-cizelgesi.json'))['toplam']
    kd = tempfile.mkdtemp(prefix=f'kb_kareler{n}_')
    sh('node', 'sablon/render_kareler.js', f'prototip/bolum{n}.render.html', kd, T, 30, 4)
    sh('ffmpeg', '-v', 'error', '-y', '-framerate', 30, '-i', f'{kd}/%05d.jpg', '-i', B / 'karisim.wav', '-c:v', 'libx264', '-crf', 21, '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', '-shortest', B / 'cikti.mp4')
    shutil.rmtree(kd, ignore_errors=True)
    print('hazır:', B / 'cikti.mp4')

def onizle(n):
    B = yol(n)
    sh('python3', 'sablon/bolum_veri.py', B)
    sh('python3', 'sablon/bolum_derle.py', B, f'prototip/bolum{n}.build.html', '--onizleme')
    print(f'Önizleme derlendi: prototip/bolum{n}.build.html (tarayıcıda açılır). Sonraki: ONAY al.')

if __name__ == '__main__':
    if len(sys.argv) < 3:
        sys.exit(__doc__)
    cmd = {'yeni': yeni, 'kontrol': kontrol, 'onizle': onizle, 'karisim': karisim, 'render': render}.get(sys.argv[1])
    if cmd is None:
        sys.exit('bilinmeyen komut (yeni|kontrol|onizle|karisim|render).\n' + __doc__)
    cmd(sys.argv[2])
