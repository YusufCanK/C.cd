# Kat 9 nasıl yapılıyor? Üretim rehberi

Bu dosya, Kat 9 gibi interaktif ve oylamalı kısa animasyon bölümlerinin baştan sona nasıl üretildiğini anlatır: hikâye, görsel, animasyon, ses, render, yayın. Örnekler Kat 9 Bölüm 1'den.

---

## 1. Büyük resim

```
Hikâye ──► Sahne verisi ──► Ses (ElevenLabs) ──► Önizleme (tarayıcı) ──► Render (video) ──► Yayın + oylama
  │            │                 │                     │                      │                   │
senaryo.md  sahneler.json   ses/*.mp3            Artifact linki          cikti.mp4        degiskenler.json
```

- **Her ok bir onay noktasıdır.** Senaryo, sahneler, ses (önce kredi tahmini), önizleme, render ve kapak; kullanıcı onaylamadan bir sonraki adıma geçilmez.
- **Videonun tamamı kodla üretilir.** Karakterler, arka planlar ve animasyon tarayıcıda çizilen SVG grafiklerdir. Yapay zekâ yalnızca seslendirmede kullanılır (ElevenLabs). Efekt sesleri ve müzik de kodla sentezlenir.
- **Neden böyle:** Yapay zekâ görsel üreticileri her karede karakteri biraz farklı çizer. Kod ile çizilen karakter her bölümde birebir aynı kalır, sınırsız poz verilebilir ve görsel üretimine kredi harcanmaz.

---

## 2. Hikâye

### Katmanlar (`story/sezon-plani.md`)
| Katman | Kat 9'daki karşılığı |
|---|---|
| Ana hikâye (sezon boyu sabit) | Deniz, kardeşi Ela'ya ulaşmaya çalışıyor |
| Sezon gizemi | Sis nereden geldi? Ela neden dönüşmedi? |
| Bölümün sorunu | Bölüm 1: kapıda bir Sisli var |
| Mini amaç | Bölüm 1: merdiven boşluğuna ulaşmak |
| Bölüm sonu | Yeni bilgi, yaklaşma ya da daha büyük bir tehlike |
| İzleyici seçimi (A/B) | Mini amaca nasıl ulaşılacağı: fener mi, balta mı? |

### Bölüm iskeleti (her bölümde aynı)
1. **Hook (ilk 3–5 sn):** En gergin an ya da güçlü bir cümle.
2. **Dünya ve hedef:** İlk 15 sn içinde "ne oldu, şimdi ne yapmalı" söylenir. Ekrandaki panel de bölümün hedefini gösterir.
3. **Engel:** Somut tehlike.
4. **Yeni bilgi:** Dünya ya da sır hakkında küçük bir parça.
5. **Cliffhanger ve A/B seçimi:** İki seçeneğin de bedeli olur, bariz bir doğru cevap olmaz. Yanına bir teori sorusu eklenir ("o şey sence kim?").

### Dünya kuralları
Dünya kuralları önceden yazılır (`sezon-plani.md`): sisi soluyan dönüşür, Sisliler gündüz uyuşuk, gece avlanır, Sisliler konuşmaz. Senaryo bu kurallarla çelişemez. Kat 9'da ilk taslakta "gün doğmadan varmalıyım" mantığı kuralla çelişiyordu, revizyon 7'de düzeltildi.

### Gizem ipuçları
`story/ela-sirri-ipuclari.md` dosyası iki şeyi tutar:
- Finalde açılacak sırrın gerçeği (sadece yazarlar bilir).
- Bölüm bölüm hangi ipucunun verileceği. Her ipucunun dallanma durumunda kullanılacak bir yedek sahnesi vardır.

### Dallanma (oylama)
1. Bölüm yayınlanır.
2. Oylar toplanır.
3. **Sadece kazanan dalın** sonraki bölümü üretilir.
4. Seçimler ve sonuçları `story/degiskenler.json` dosyasında saklanır.

### Çalışma yöntemi
Senaryo Claude ve ChatGPT'nin karşılıklı eleştirisiyle gelişti. Kullanıcı mesajları ikisi arasında taşıdı. En faydalı kural: **"Zayıf fikri sırf biri söyledi diye kabul etme."**

---

## 3. Görsel stil ve karakterler

- **Stil kararı (`karakterler/stil.md`):** Düz 2D vektör çizgi film, kalın siyah kontur, düz renkler, iri kafalı sade karakterler, sade arka planlar.
- **Karakter rig'leri (`sablon/rigs.js`):**
  - Deniz ve Ela parçalı SVG olarak çizilir: kafa, kaşlar, gözler, ağız, gövde ve kollar ayrı katmanlardır.
  - Duygular kaş ve göz pozisyonlarıyla verilir (korkmuş, endişeli vb.).
  - Ağız 4 şekil arasında değişir (kapalı, az açık, açık, "o").
- **Sisli üreteci (`sablon/sisli.js`):**
  - Her Sisli farklı görünür: boy, kilo, kıyafet, yara.
  - Hazır ayarlar: Ahmet Amca, Bakkal Cemal, Hemşire Ayşe.
  - Çizgi film üslubunda kan ve yırtık serbest, grafik şiddet yok (`karakterler/sisli.md`).
- **Mekânlar:** Koridor, merdiven boşluğu, daire, sokak. Hepsi kodla çizilen basit geometriler. Örnek: koridor, perspektifli dört duvar ve kapılardan oluşur.
- **Kapak (`prototip/kapak.html`):** Sabit şablon, "BÖLÜM N" başlığı ve seçim kutusu. Instagram profil ızgarası 3:4 kırptığı için önemli içerik ortada tutulur.

---

## 4. Animasyon

- **Motor (`sablon/motor.js`):**
  - Her sahne bir SVG grubudur.
  - Zaman çizelgesine göre doğru sahne görünür, kamera hafifçe yakınlaşır.
  - Altyazılar ve durum paneli (gün, saat, hedef, gün doğumuna kalan süre) zamanla güncellenir.
- **Deterministik kare üretimi:** `window.__renderAt(T)` sayfayı tam olarak T. saniyedeki hâline getirir. Bu sayede her kare tek tek ve hatasız alınabilir.
- **Ağız senkronu (`sablon/lipsync.js`):**
  - Ses dosyası 33 ms'lik parçalar hâlinde analiz edilir: ses yüksekliği ve frekans dağılımı.
  - Her parça için 4 ağız şeklinden biri seçilir.
  - Ela'nın ve Deniz'in konuşmaları bununla oynatılır.
- **Altyazı zamanlaması (`sablon/bolum_veri.py`):**
  - Cümleler, seste gerçekten oluşan sessizlik boşluklarına oturtulur.
  - Büyük harf, satır başına en fazla 22 karakter.
- **Güvenli alan (`sablon/guvenli-alan.md`):**
  - Reels arayüzü üstü, altı ve sağı kapatır. Panel üstte, altyazı 1500 px'in üstünde, sağ alt boş tutulur.
  - Bu değerler **tahminidir**. Gerçek kontrol, videoyu "Sadece ben" olarak yükleyerek yapılır.
- **Hareket dili:**
  - Akıcı animasyon değil, poz değişimi, hafif kamera hareketi ve kısa geçişler (0,25 sn karartma).
  - Kritik anlarda ardışık pozlar ya da çizgi roman paneli kullanılır.
  - Hız çizgisi gibi efektler sadece en önemli 2–3 anda kullanılır, yoksa gürültü olur.

---

## 5. Ses

### Konuşma: ElevenLabs
- **Model:** `eleven_v4`, duygu etiketleriyle. Örnek: `[nervous] [trembling voice] Abi, ben iyiyim!`
- **Sesleri kullanıcı seçer.** Kayıtlar `karakterler/sesler.json` dosyasında:

| Karakter | Ses |
|---|---|
| Anlatıcı | Tagi İlbeyli |
| Ela | Çağlayan |
| Deniz (konuşurken) | Mahmut |

- **Her karakterin sesi ayrıdır.** Farklı dizilerde aynı ses kullanılmaz.
- **Tasarruf kuralları:**
  - Her üretimde tek deneme yapılır.
  - Önce `estimate_only` ile kredi tahmini alınır. **Tahmin son metin ve etiketlerle alınmalı**, çünkü etiketler de ücretlendiriliyor.
- **Maliyet örnekleri (gerçek):**
  - Kısa bir replik ~20–50 kredi.
  - 2 cümlelik anlatıcı satırı ~120–180 kredi.
  - 1 dakikalık özet ~880 kredi.
  - En ucuz model (flash) bu seslerde v4 ile aynı fiyatı çıkardı. Tasarrufun yolu metni kısaltmak.

### Efekt ve müzik: kodla sentez (`sablon/ses_mix.py`)
- Gürültü süzgeçleri ve ton sweep'leriyle üretilir: kalp atışı, düdük, adım, kapı, anahtar şıngırtısı, kalabalık.
- Müzik, sahnenin duygusuna göre değişen akor yatağıdır (pad).
- Konuşma sırasında müzik ve efektler otomatik kısılır (ducking).
- **Sisli ses imzası (`sablon/sisli_ses.py`):**
  - Derin, boğuk hırıltı ve kuru, kesik bir solunum.
  - Uzaktan yakına yaklaşır.
  - Seri boyunca aynı imza kullanılır.
- **Dürüst sınır:** Sentez sesler yer tutucu kalitesindedir. Lisanslı bir efekt ve müzik kütüphanesiyle değiştirilebilir.

---

## 6. Render (video)

```bash
python3 sablon/bolum.py render 01 --onayli
```

Komut sırasıyla şunları yapar:
1. `bolum_veri.py`: Ses dosyalarından zaman çizelgesini çıkarır (sahne süreleri, altyazı, ağız hareketi).
2. `bolum_derle.py`: Şablon ve sahne parçalarından tek bir sayfa oluşturur.
3. `ses_mix.py`: Konuşma, efekt ve müziği tek bir ses dosyasında birleştirir.
4. `render_kareler.js`: Playwright ile 4 paralel tarayıcı açar ve 30 fps, 1080×1920 kareleri alır. Bölüm 1 (~109 sn, 3.278 kare) yaklaşık 1,5–2 dakika sürer.
5. `ffmpeg`: Kareleri ve sesi H.264 + AAC formatında `cikti.mp4` dosyasına birleştirir.

**Kurallar:**
- Render, kullanıcı onayı olmadan yapılmaz (`--onayli` bayrağı).
- Sessiz video render edilmez.

---

## 7. Önizleme ve kontrol

- `bolum.py onizle NN` komutu sayfayı derler. Sayfa Artifact olarak (özel link) yayınlanır. Kaydırıcı, oynat düğmesi ve güvenli alan katmanı vardır.
- **Kontrol sırası:** Önce sessiz önizleme, sonra ses, sonra render. Değişiklikler önce önizlemede yapılır, render en sona kalır.
- **Telefon ölçeği kontrolü:** Kareler 390 px genişliğe küçültülüp yazıların okunurluğuna bakılır. Panel yazıları bu kontrolden sonra 28 px'ten 36 px'e büyütüldü.

---

## 8. Yayın ve oylama

- **Kanallar (`story/kanallar/kurulum.md`):**
  - Instagram Reels, TikTok ve YouTube Shorts, aynı saatte (öneri: 19:00–21:00).
  - Profil görseli, biyografiler, gönderi metni ve sabitlenmiş oy yorumu hazır.
  - Yüklerken "yapay zekâ ile üretildi" etiketi açılır.
- **Oylama:**
  - Yorumlarda "A/B", "fener/balta" ya da 🔦/🪓. Instagram'da ayrıca Story anketi.
  - Oylama 48 saat sürer (ilk bölümde takipçi olmadığı için uzatıldı).
- **Sayım:** `python3 sablon/oy_say.py 01 yorumlar/*.txt --kaydet`. Sonuç `degiskenler.json` dosyasına yazılır.
- **Ölçüm:** İzlenme, tamamlama oranı, yorum ve oy sayısı, takipçi artışı. Başarı ölçütü katılım.

---

## 9. Komutlar özeti

| Komut | İş | Kredi |
|---|---|---|
| `python3 sablon/bolum.py yeni 02` | Yeni bölüm klasörü ve şablonlar | 0 |
| `python3 sablon/bolum.py kontrol 01` | Eksik ses ve süre kontrolü | 0 |
| `python3 sablon/bolum.py onizle 01` | Zaman çizelgesi ve önizleme sayfası | 0 |
| `python3 sablon/bolum.py render 01 --onayli` | Video (sadece onaydan sonra) | 0 |
| `python3 sablon/sisli_ses.py out.wav` | Sisli ses imzası | 0 |
| `python3 sablon/oy_say.py 01 yorumlar/*.txt --kaydet` | Oy sayımı | 0 |

Kredi sadece ElevenLabs seslendirmesinde harcanır.

---

## 10. Dosya haritası

```
CLAUDE.md, PLAN.md          kurallar ve genel plan
NASIL-YAPILIYOR.md          bu rehber
karakterler/                stil tarifi, karakter dosyaları, sesler.json
story/
  sezon-plani.md            dünya kuralları, 10 bölümlük plan
  ela-sirri-ipuclari.md     gizem ve ipucu dağılımı
  degiskenler.json          seçimler, oylar, yayın kaydı
  kanallar/                 hesap kurulumu, profil görselleri
  bolum-01/                 senaryo, sahneler.json, zaman çizelgesi, kapak, cikti.mp4, ses/ (git dışı)
sablon/                     motor, rig'ler, Sisli üreteci, lipsync, ses karışımı, render, oy sayımı
prototip/                   bölüm şablonu, sahne parçaları, kapak, önizleme derleyici
```

Ses ve video dosyaları `.gitignore` ile GitHub'a gönderilmez, sadece çalışılan bilgisayarda durur.

---

## 11. Öğrenilen dersler

1. **Plansız senaryo en pahalısıdır.** Önce dünya kuralları ve sezon planı, sonra bölüm.
2. **Her bölümün kendi mini amacı olmalı.** "Ela'ya ulaş" tek başına 10 bölüm taşımaz.
3. **Görselin iyi olması, hikâyenin anlatıldığı anlamına gelmez.** "Dünyaya ne oldu, şu an hedef ne" ilk 15 saniyede söylenmeli.
4. **Kredi tahmini son metinle alınmalı.** Duygu etiketleri de ücretlendirilir.
5. **Render en sona kalır.** Değişiklik önizlemede yapılır. Gereksiz render zaman kaybıdır.
6. **Test edilemeyen her şey "tahmini" diye yazılır.** Güvenli alan, ses kalitesi ve dinlenemeyen sesler buna dahil.

## 12. Bilinen sınırlar

- `bolum_derle.py` ve `ses_mix.py` hâlâ Bölüm 1'e özel sahne kancalarına bağlı. Bölüm 2 başlamadan önce sahne ve efekt tanımlarını veriye taşımak gerekiyor (`CLAUDE.md`, "Bilinen sınır").
- Efekt ve müzik sentez kalitesinde.
- Reels güvenli alanı gerçek arayüzde test edilmedi.
