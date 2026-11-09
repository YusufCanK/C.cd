# Interaktif Hikaye Projesi: Plan

Reels serisi (içerik hesabı) + arkasında mobil uygulama.
Format: kısa bölümler, her bölüm sonunda seçim, izleyici oyları bir sonraki bölümü belirler.

> Not: Referans hesap yalnızca format ilhamıdır. Karakterler, konsept adı, kapak düzeni ve görsel kimlik **özgün** olacak. Birebir kopya yok.

---

## 1. Konsept

- Çalışma adı: **Kat 9**
- Tür: **Hayatta kalma** (karar: kullanıcı)
- Ana karakter: **Deniz**, 19 yaş, 9 katlı bir apartmanın en üst katında yaşıyor. Kıvırcık kahverengi saç, yara izli kaş, hafif sakal, zeytin yeşili ceket, lacivert kapüşon, babasından kalan pusula kolye. Detaylar: `karakterler/deniz.md`.
- Amaç: Gün doğmadan apartmandan çıkıp şehrin öbür ucundaki dershanede mahsur kalan kız kardeşi **Ela'ya (12)** ulaşmak.
- Seçim mekaniği: **Eşya seçimi** (karar: kullanıcı). Her bölüm sonunda iki eşyadan biri alınır, öbürü kaybolur. Seçilen eşya sonraki bölümün riskini ve fırsatını belirler.
- Evren ve ton: Metropolde salgın. Enfekte olanlara **"Sisli"** denir; gündüz uyurlar, geceleri ışığa ve sese tepki verirler. Gerilimli ve karanlık, aralarda insani anlar. Gore yok.
- Mekan: Metropolde bir apartman (dikey harita: her kat farklı risk ve komşu). Sonra sokaklar, metro, çatılar. Görseller: `mekanlar/`.
- Görsel stil: Düz 2D vektör çizgi film, kalın siyah kontur, düz renkler (kilitli prompt: `karakterler/stil.md`).
- Sezon taslağı: 12 bölüm, **esnek** (detay: `story/sezon-taslagi.md`). Üç bölüm yayında test edilmeden sabitlenmez.
- Hikâye unsurları: Ela'nın çizimleri, Sisli davranışının aşamalı gizemi, gri karakter Selim, her bölümde yeni bilgi.
- Seçim hafızası: `story/durum-sistemi.md` ve `story/degiskenler.json`.
- Başarı ölçütü: güzel animasyon değil, **yorum katılımı** (seçim + teori sorusu).
- Yayın kuralı: üç bölüm hazır olmadan yayına başlanmaz.
- Hedef kitle ve dil: Türkçe (ileride başka dil?)

## 2. Hedefler

1. 2 haftada 10+ Reels yayınla, ilgiyi ölç (izlenme, yorum, oy sayısı).
2. Talep görünürse uygulama MVP'sini çıkar.
3. Üretim hattını şablonlaştır: yeni bölüm ≈ 20-30 dk.

## 3. Bölüm formatı (80-90 sn Reels)

- Süre: 80-90 sn, dikey 9:16
- Senaryo: ~210-240 kelime
- İlk 3 sn: hook
- Son 5 sn: cliffhanger + seçim sorusu
- 16-18 sahne, her biri ~5 sn
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
- [x] Karakter tarifi (`karakterler/deniz.md`)
- [x] Seçim mekaniği (eşya seçimi)
- [x] ElevenLabs sesleri (Deniz: Tagi İlbeyli, Ela: CAGLAYAN; `karakterler/sesler.json`)
- [ ] Hesap adı ve marka kimliği
- [ ] Uygulama gelir modeli
