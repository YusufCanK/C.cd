# Claude Code Kuralları: Interaktif Hikaye Projesi

Önce `PLAN.md` dosyasını oku. Proje bu planı izler.

## Çalışma kuralları

- Dil: Türkçe. Kısa ve net yaz.
- Her bölüm `story/bolum-XX/` altında üretilir. Klasör yapısı PLAN.md bölüm 5'teki gibidir.
- Onay noktalarında (senaryo, sahneler, görseller, ses, final render, kapak) dur ve kullanıcıdan onay iste.

## Ses ve video

- **Ses:** ElevenLabs sesini kullanıcı seçer. Kullanıcı bir ses seçmeden konuşma üretme.
- **Üretim tasarrufu:** Konuşma/görsel üretiminde her seferinde **tek deneme** (generations_count=1) üret. Pahalı modellerde (örn. v4 konuşma, gemini görsel) önce estimate_only ile maliyeti göster. Kullanıcı açıkça isterse birden fazla.
- **Konuşma modeli:** eleven_v4 + duyguya göre etiketler ([nervous], [trembling voice] vb.). Sesler: `karakterler/sesler.json`.
- **Yeniden render:** Videoyu (kare üretimi, ses karışımı, mp4) yeniden render etmeden önce kullanıcıya sor. Kullanıcı onay vermeden render etme. Değişiklikleri önce önizleme sayfasında ve kod olarak yap.
- **Sessiz video yok:** Her render seslendirme ve efekt içermeli. Sesi olmayan bir videoyu render etme.
- Format: dikey 9:16, 80-90 sn, altyazı ve sabit kapak şablonu.
- Karakter tutarlılığı için her görsel prompt'u `karakterler/` altındaki stil tarifini birebir içermeli.

## Özgünlük

- Referans hesabın karakterlerini, adını, logosunu ve sayaç/kapak kutusunu kopyalama. Yalnızca genel format (kısa bölümler, oylamalı devam) ve **görsel stil** ilham kaynağıdır.
- Görsel stil kararı (kullanıcı): düz 2D vektör çizgi film, kalın siyah kontur, düz renkler, iri kafalı sade karakterler, sade arka planlar. Gerçekçi veya boyama tarzı kullanma. Stile referansa yakın gidilebilir; karakterler, isimler ve marka özgün kalır.

## İçerik

- Sisli'ler (zombiler) eski insanlardır, her biri farklı görünür (`sablon/sisli.js`, `karakterler/sisli.md`). Çizgi film üslubunda kan izi, ısırık, yırtık kıyafet serbest; detaylı/grafik gore yok.

## Teknik

- Şablonlanabilir olanı koda dök: yeni bölüm, mevcut şablona sadece senaryo ve sahne verisi vererek üretilebilmeli.
- Büyük dosyalar (video, ses) için `.gitignore` kullan veya Git LFS tercih et.
- Gizli anahtarları (API key) repoya koyma; `.env` kullan.

## Seri üretim sistemi

- Tek giriş: `python3 sablon/bolum.py yeni|kontrol|onizle|render NN`. `render` yalnızca kullanıcı onayından sonra `--onayli` ile çalıştırılır.
- Sıra (her ok bir onay noktası): senaryo → sahneler.json → ses (önce kredi tahmini) → önizleme (Artifact) → render → kapak/yayın paketi.
- Önceki seçim ve durum: `story/degiskenler.json`, `story/durum-sistemi.md`. Sisli ses imzası: `sablon/sisli_ses.py`.
- Bilinen sınır: `bolum_derle.py` ve `ses_mix.py` hâlâ Bölüm 1 sahne kancalarına (`prototip/parca/`, sahne bazlı efektler) bağlı; Bölüm 2 için sahne/efekt tanımlarını veriye taşıma işi yapılacak.
