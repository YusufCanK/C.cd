# Claude Code Kuralları: Interaktif Hikaye Projesi

Önce `PLAN.md` dosyasını oku. Proje bu planı izler.

## Çalışma kuralları

- Dil: Türkçe. Kısa ve net yaz.
- Her bölüm `story/bolum-XX/` altında üretilir. Klasör yapısı PLAN.md bölüm 5'teki gibidir.
- Onay noktalarında (senaryo, sahneler, görseller, ses, final render, kapak) dur ve kullanıcıdan onay iste.

## Ses ve video

- **Ses:** ElevenLabs sesini kullanıcı seçer. Kullanıcı bir ses seçmeden konuşma üretme.
- **Sessiz video yok:** Her render seslendirme ve efekt içermeli. Sesi olmayan bir videoyu render etme.
- Format: dikey 9:16, 55-60 sn, altyazı ve sabit kapak şablonu.
- Karakter tutarlılığı için her görsel prompt'u `karakterler/` altındaki stil tarifini birebir içermeli.

## Özgünlük

- Referans hesabın karakterlerini, adını, kapak düzenini veya görsel kimliğini kopyalama. Yalnızca genel format (kısa bölümler, oylamalı devam) ilham kaynağıdır.

## Teknik

- Şablonlanabilir olanı koda dök: yeni bölüm, mevcut şablona sadece senaryo ve sahne verisi vererek üretilebilmeli.
- Büyük dosyalar (video, ses) için `.gitignore` kullan veya Git LFS tercih et.
- Gizli anahtarları (API key) repoya koyma; `.env` kullan.
