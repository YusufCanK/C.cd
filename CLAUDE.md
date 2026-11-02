# CLAUDE.md: Clixora Instagram içerik projesi

Bu dosya, claude.ai'deki oturumun devridir. Claude Code bu klasörü açtığında her şeyi buradan öğrenir. Dil: Türkçe, doğrudan ve eyleme dönük konuş (Tagi böyle tercih ediyor).

## 1. Kişi ve hedef

- **Tagi** (Muhammet Tagi İlbeyli), Clixora'nın tek kurucusu. Clixora, Türkiye'de randevulu işletmelere (diş klinikleri, güzellik salonları vb.) WhatsApp otomasyonu, Instagram DM otomasyonu ve AI sesli asistan sunan çok kiracılı bir SaaS.
- Clixora'nın önceki Instagram hesapları kapandı. Bu yüzden Tagi kendi adı ve fotoğrafıyla kişisel bir hesap açtı: **@tagi.ilbeyliii**, görünen ad "Tagi Clixora". İşletmelere bu hesaptan DM atıp işi gösterecek.
- **İlk hedef kitle yalnızca güzellik merkezleri.**
- **ANA HEDEF: 1 hafta içinde gerçek, ödeyen bir müşteri.**
- Hesap kurumsal görünmemeli, samimi olmalı, DM'lere hemen cevap verilebilecek gibi durmalı. 3-4 gönderi ve birkaç story ile işletme ne yaptığımızı anında anlamalı (hook'lu, sıkmadan).

## 2. Kurallar (Tagi'nin kalıcı tercihleri)

- Sahte referans, uydurma müşteri yorumu ve uydurma sonuç istatistiği yok. Videolardaki isim ve rakamlar "örnek veri (demo)" diye işaretli kalır.
- Gereksiz emoji yok, rastgele UI öğesi yok, hizalı metin.
- "Daha önce yaptım" derse, imkansız demeden önce yaklaşımı dene.
- Başka bir hesabı (@flowra.agent) ayrıca yönetiyor, o hesabın içeriğinde "Clixora" adı geçmez. Bu proje @tagi.ilbeyliii içindir, burada Clixora adı serbest.

## 3. Proje durumu (Remotion, `/clixora-reel`)

Remotion 4.0.540 + React 19 + TypeScript. Animasyonlar Remotion'un kare saatiyle sürülür. Framer Motion'dan yalnızca easing eğrileri (`cubicBezier`) kullanılır, çünkü kendi animasyonları gerçek saate bağlıdır ve kare kare render'da tutarsız çıkar.

Kompozisyonlar (`src/Root.tsx`):

| ID | Ne | Süre | Çıktı |
|---|---|---|---|
| `ClixoraReel` | İngilizce 12 sn ürün tanıtımı (ilk görev, bitti) | 360 kare | `out/clixora-reel.mp4` |
| `SalonReel` | Güzellik merkezleri için Türkçe Reel, sessiz | 520 kare (17,3 sn) | `out/salon-reel.mp4` |
| `SalonReelVO` | Aynısı, Türkçe seslendirmeli | 520 kare | `out/salon-reel-vo.mp4` |
| `CarouselSlide` | Carousel, `--props '{"slide":N}'` ile tek slayt | 1080x1350 | `out/carousel-1..6.png` |

Komutlar: `npm run dev` (Studio), `npm run render`, `npm run render:salon`, `npm run render:salon:vo`, `npm run carousel`, `npm run typecheck`. Bu bulut ortamında Chrome için `--browser-executable=/usr/bin/google-chrome` gerekti. Kendi bilgisayarında genelde gerekmez.

Önemli dosyalar:
- `src/theme.ts`: boyutlar, renkler (mor `#8B5CF6`), font aileleri, güvenli alan.
- `src/content.ts` (İngilizce) ve `src/content.salon.ts` (Türkçe salon): tüm metinler ve örnek veri. Şekil `src/contentTypes.ts`. Sahneler içeriği `ContentContext` ile alır, başka sektör/dil için yeni bir içerik dosyası yeter.
- `src/SalonComposition.tsx`: sahne zamanlaması ve `VOICEOVER` dizisi.
- `src/components/Logo.tsx`: **yer tutucu logo.** Gerçek logonun SVG'si gelince burayı değiştir.

### Font (bu oturumda değişti)
Eski Inter "çok klasik" bulundu. Şimdi: başlıkta **Bricolage Grotesque** (variable, 700), vurgu satırlarında **Instrument Serif italik** (`SERIF_SCALE = 1.16`). Türkçe karakterler doğrulandı. `background-clip:text` ile nokta/kuyruk kırpılmasın diye vurgu satırlarına dikey padding var, bunu bozma.

## 4. Salon Reel zamanlaması ve seslendirme

Seslendirme ElevenLabs ile üretildi (model `eleven_multilingual_v2`, ses "Fatih - Dynamic, Engaging and Modern", voice_id `RDNgFQdRVzvDdSV3I6nb`). Sahneler ses sürelerine göre zamanlı:

| Dosya | Metin | Süre | Başlangıç kare |
|---|---|---|---|
| `public/vo/a.mp3` | Mesai bitti ama mesajlar bitmedi. | 2,51 sn | 4 |
| `public/vo/b.mp3` | Mesajlara siz değil, asistanınız yetişsin. | 2,88 sn | 80 |
| `public/vo/c.mp3` | WhatsApp ve Instagram tek yerde. Yanıtlar, planlar, büyütür. | 5,02 sn | 168 |
| `public/vo/d.mp3` | Salonunuz için kurmamı ister misiniz? DM'den yazın. | 3,58 sn | 330 |

Sahneler: Hook 0-84, Intro 74-170, Messages 164-250, Automate 240-342, CTA 328-432, Outro 424-520.

**BEKLEYEN İŞ #1:** `public/vo/` şu an **boş**. Ses dosyaları ElevenLabs'te üretildi ama bulut ortamından indirilemedi (ağ engeli). Tagi bu 4 akıştan mp3'leri indirip `public/vo/a.mp3 ... d.mp3` olarak koyacak:
- a: `https://elevenlabs.io/app/flows/dyD3lU0Ewet4eoBncXDB`
- b: `https://elevenlabs.io/app/flows/exrbH8kiS89AMqaALxfb`
- c: `https://elevenlabs.io/app/flows/tEulA8Q55bnI71fLHmyD`
- d: `https://elevenlabs.io/app/flows/leJMTmKzAOzLhLMFynmY`

Dosyalar gelince: `npm run render:salon:vo`, sonra `ffprobe` ile süreyi/akışları doğrula, bir iki kare ve sesin hizasını kontrol et. Claude Code ElevenLabs MCP'ye bağlıysa sesleri oradan da yeniden üretebilirsin. (ElevenLabs indirme linkleri 15 dakikada sona erer, hemen indir.)

## 5. İçerik planı (4 gönderi + 6 story)

Hesap önce **herkese açık** yapılmalı (kilitliyken kimse içeriği göremez). Profil sırası: Gönderi 1, 3, 4. Gönderi 2 en son.

| # | Gönderi | Durum |
|---|---|---|
| 1 | Reel "Saat 01:47": demo WhatsApp asistanından gerçek ekran kaydı, yazı "01:47. Salon kapalı. Randevu açık." | Tagi çekecek |
| 2 | Reel, talking head 20-25 sn: kendini tanıtma (metin `GONDERI-PLANI.md`'de) | Tagi çekecek |
| 3 | Reel "Mesajlara siz değil, asistanınız yetişsin" | Video hazır, sesli render bekliyor |
| 4 | Carousel "Kaçan mesajın hesabı", 6 slayt | Hazır (`out/carousel-*.png`) |

Carousel'in 5. slaytındaki 5 randevu × 600 TL = 3.000 TL/hafta **varsayımdır**, slaytta da öyle yazıyor. Açıklama metinleri, hashtag'ler, bio önerisi, story serisi ve DM şablonu: **`GONDERI-PLANI.md`**.

### Instagram/DM stratejisi (araştırmadan)
- Profesyonel hesap (İçerik üreticisi/Girişimci), bio'da demo WhatsApp asistanı için `wa.me` ön yazılı link.
- Sadece kişiselleştirilmiş, elle atılan DM. Mesaj isteğinde ilk mesaj tek metin, link/medya yok. Otomasyon, VPN, tarayıcı eklentisi yok (hesap kapanma riski: Meta Account Integrity, ban atlatma şüphesi).
- Temkinli DM rampası: 5, 8, 10, 12, 15, 15 (günlük).
- ETK/İYS ve KVKK'ya dikkat.
- Teklif: ücretsiz kurulum, ilk ay indirimli, 14 gün iade. **Rakamlar Tagi'den henüz alınmadı.**
- Rakip fiyat bandı yaklaşık 499-5.000 TL/ay.

## 6. Açık sorular (Tagi'ye sor)
1. Demo WhatsApp asistanı canlı mı? Gönderi 1 ve bio linki ona bağlı.
2. Fiyat ve teklif (kurulum ücreti, aylık fiyat, iade süresi).
3. Gerçek Clixora logosu (SVG) var mı?
4. Sesi beğendi mi, başka bir Türkçe ses mi istiyor?

## 7. Sonraki adımlar (öncelik sırasıyla)
1. Ses dosyalarını yerleştir, `SalonReelVO`'yu render et, teslim et.
2. 6 story karesini (1080x1920) aynı tasarım diliyle üret (`GONDERI-PLANI.md`'deki seri).
3. Gönderi 1 için ekran kaydı gelince üstüne "01:47" yazı bandı ve kurgu.
4. Gönderi 2 talking head videosuna altyazı/yazı bandı ("Salonlar için mesaj asistanı").
5. DM şablonlarını güzellik merkezi alt dallarına (kaş, lazer, cilt bakımı) göre çeşitlendir.

## 8. Teknik notlar / tuzaklar
- Render sırasında font yüklenene kadar `delayRender` ile beklenir (`src/fonts.ts`). Yeni font eklersen oraya da ekle.
- Gradyan vurgu satırı (`RevealText`'te `gradientLines`, carousel'de son satır) artık serif italik. Bu satırlara ek dikey padding/negatif margin koyduk, kaldırırsan Ö/Ü/ş kırpılır.
- Arka plan parçacıkları `random()` ile tohumlu, her render birebir aynı çıkar.
- Resmi WhatsApp/Instagram logoları kullanılmadı, kanal etiketleri sade rozetler.
- Kapak karesi önerisi: Reel'de "WhatsApp ve Instagram, tek yerde" sahnesi (yaklaşık 215. kare).
