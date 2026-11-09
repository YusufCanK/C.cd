# Interaktif Hikaye Projesi: Plan

Reels serisi (içerik hesabı) + arkasında mobil uygulama.
Format: kısa bölümler, her bölüm sonunda seçim, izleyici oyları bir sonraki bölümü belirler.

> Not: Referans hesap yalnızca format ilhamıdır. Karakterler, konsept adı, kapak düzeni ve görsel kimlik **özgün** olacak. Birebir kopya yok.

---

## 1. Konsept (doldurulacak)

- Çalışma adı: **Sisli Kıyı**
- Tür: **Hayatta kalma** (karar: kullanıcı)
- Ana karakter: **Deniz**, 17 yaş, sahil kasabasında bakkalın kızı. Boynunda eski bir pusula. Hedef: kayıp kardeşini bulmak.
- Seçim mekaniği: **Eşya seçimi** (karar: kullanıcı). Her bölüm sonunda karakter elindeki iki eşyadan birini yanına alır; seçilen eşya sonraki bölümün riskini ve fırsatlarını belirler. Alınmayan eşya kaybolur.
- Hikaye evreni ve ton: Türkiye'de bir sahil kasabasında salgın. Enfekte insanlara **"Sisli"** denir; gündüz uyurlar, geceleri ışık ve sese tepki verirler. Ton: gerilimli ve karanlık, aralarda insani anlar. Gore yok.
- Hedef kitle ve dil: _Türkçe (ileride başka dil?)_

## 2. Hedefler

1. 2 haftada 10+ Reels yayınla, ilgiyi ölç (izlenme, yorum, oy sayısı).
2. Talep görünürse uygulama MVP'sini çıkar.
3. Üretim hattını şablonlaştır: yeni bölüm ≈ 20-30 dk.

## 3. Bölüm formatı (1 dk Reels)

- Süre: 55-60 sn, dikey 9:16
- Senaryo: ~130-150 kelime
- İlk 3 sn: hook
- Son 5 sn: cliffhanger + seçim sorusu
- 10-12 sahne, her biri ~5 sn
- Sabit kapak şablonu, büyük "BÖLÜM X" başlığı
- Altyazı, müzik ve efekt zorunlu

## 4. Üretim hattı (bir bölüm için)

| # | Adım | Çıktı | Onay |
|---|------|-------|------|
| 1 | Senaryo yaz (LLM, karakter bilgisiyle) | `story/bolum-XX/senaryo.md` | Evet |
| 2 | Sahne listesi (sahne başı bir cümle + görsel tarifi) | `story/bolum-XX/sahneler.json` | Evet |
| 3 | Sahne görselleri (karakter referansı + sabit stil prompt'u) | `story/bolum-XX/gorseller/` | Evet |
| 4 | Seslendirme (ElevenLabs, **kullanıcının seçtiği ses**) | `story/bolum-XX/ses/` | Evet |
| 5 | Transkript, kelime zamanlaması, altyazı | `story/bolum-XX/altyazi.json` | - |
| 6 | Hareket: zoom/pan, katman animasyonu; 2-3 kilit sahnede görselden kısa video | `story/bolum-XX/klipler/` | - |
| 7 | Montaj ve render (müzik + efekt + seslendirme dahil) | `story/bolum-XX/cikti.mp4` | Evet |
| 8 | Kapak görseli | `story/bolum-XX/kapak.png` | Evet |

Kural: **Sessiz video render edilmez.** Her render seslendirme ve efekt içerir.

## 5. Repo yapısı (öneri)

```
/
├── PLAN.md
├── CLAUDE.md              # Claude Code kuralları
├── karakterler/           # karakter sheet'leri, stil prompt'u
├── sablon/                # kapak, başlık, altyazı, geçiş şablonları
├── story/
│   └── bolum-01/ ...      # senaryo, sahneler, gorseller, ses, klipler, cikti
├── muzik-sfx/             # lisanslı/üretilmiş müzik ve efektler
└── app/                   # mobil uygulama (MVP aşamasında)
```

## 6. Mobil uygulama (MVP)

- Ekranlar: hikaye listesi, sahne (metin + görsel + ses), seçim butonları, ilerleme kaydı
- Hikaye verisi JSON/veritabanında; yeni bölüm için uygulama güncellemesi gerekmez
- Teknoloji: Flutter veya React Native, arka uç Supabase
- Gelir: ilk bölümler ücretsiz; sonrası abonelik veya bölüm başına ödeme
- Başlama koşulu: Reels'te talep kanıtlandıktan sonra

## 7. Yol haritası

1. **Hafta 0:** Konsept, ana karakter, stil prompt'u, ses seçimi
2. **Hafta 1:** Bölüm 1-3 üretimi, şablonların kurulması
3. **Hafta 2:** Yayın başlar, günlük/gün aşırı Reels, yorum ve oy takibi
4. **Hafta 3-4:** Veriyi değerlendir, hikaye yönünü belirle, uygulama kararı
5. **Sonrası:** MVP uygulama, hesap ve uygulamayı birbirine bağla

## 8. Ölçüm

- Her Reels için: izlenme, izlenme süresi, yorum, oy sayısı, profil ziyareti, takipçi artışı
- Karar eşiği (uygulamaya geçmek için): _TBD_ (örn. 2 haftada X takipçi ve bölüm başına Y oy)

## 9. Açık sorular

- [x] Konsept ve tür (tamamlandı)
- [x] Karakter tarifi (görsel stil tarifi `karakterler/` altında yazılacak)
- [x] Seçim mekaniği (eşya seçimi)
- [ ] ElevenLabs sesi (kullanıcı seçecek)
- [ ] Hesap adı ve marka kimliği
- [ ] Uygulama gelir modeli
