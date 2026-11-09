# Kat 9 · Bölüm 1 "Son Mesaj": inceleme paketi (ChatGPT için)

Süre: **106.8 sn**, 17 sahne, dikey 9:16, sesli. Video: `cikti.mp4`, kapak: `kapak.png`, kare özeti: `kare-ozeti.png`.

## Proje özeti
- **Seri:** Kat 9, seçimli interaktif Reels. İzleyici yorumlarla seçim yapar, çoğunluk sonraki bölümü belirler.
- **Kurgu:** Metropolde salgın. Enfekte olanlara "Sisli" deniyor (gündüz hareketsiz, geceleri ışığa ve sese yönelir). Deniz (19) 9 katlı apartmanın en üst katında. Kardeşi Ela'ya (12) gün doğmadan ulaşmak istiyor.
- **Mekanik:** Her bölüm sonu iki eşya (Bölüm 1: fener / balta). Seçimler `degiskenler.json`'da hafızaya alınır. Yankı kuralı: Sisli duyduğu sesi tekrar eder (gizem).
- **Stil:** düz 2D vektör çizgi film, parçalı SVG karakterler, kodla animasyon.
- **Başarı ölçütü:** yorum katılımı (seçim + teori sorusu).

## Senaryo ve sahneler
| # | Başlangıç (sn) | Süre (sn) | Konuşan | Metin |
|---|---|---|---|---|
| 1 | 0.0 | 3.6 | anlatıcı | Üç gün önce şehrin üstüne sis çöktü. |
| 2 | 3.6 | 9.2 | anlatıcı | Sis'e yakalananlar gündüz hareketsiz kalıyor. Geceleri ışığı ve sesi arıyorlar. Biz onlara Sisli dedik. |
| 3 | 12.8 | 6.0 | anlatıcı | Önce internet gitti. Sonra elektrik. Dün gece radyo da sustu. |
| 4 | 18.8 | 4.6 | anlatıcı | Ben Deniz. Annem şehir dışında, ulaşamıyorum. |
| 5 | 23.4 | 4.5 | anlatıcı | Babam iki yıl önce öldü. Geriye bir pusula kaldı. |
| 6 | 27.9 | 3.8 | anlatıcı | Telefonum yüzde dört. Tek bir mesaj geliyor. |
| 7 | 31.7 | 9.6 | Ela | Abi, ben iyiyim! Seni çiziyorum, çok uzun çıktın. Gelirsin, değil mi? Abi? Pilim... |
| 8 | 41.4 | 4.0 | - | (sessizlik: telefon kararır) |
| 9 | 45.4 | 7.8 | anlatıcı | Ela benim küçük kardeşim. On iki yaşında, dünyanın en inatçı çocuğu. Üç gündür dershanede mahsur. |
| 10 | 53.1 | 8.9 | anlatıcı | Buzdolabında Ela'nın eski çizimi: ben, elimde pusulayla. Altında tek satır: Kaybolursan pusulana bak. |
| 11 | 62.1 | 8.2 | anlatıcı | Dershane şehrin öbür ucunda. Gün doğmadan varmalıyım. Önce dokuz kat inmem lazım. Asansör çalışmıyor. |
| 12 | 70.3 | 3.9 | anlatıcı | Kapıya yürüyorum. Koridor tamamen karanlık. |
| 13 | 74.2 | 11.4 | anlatıcı | Masada iki şey: fener ve babamın baltası. Fener yolu gösterir ama ışığı onları çeker. Balta korur, kapı kırar ama çıkardığı ses de onları çeker. |
| 14 | 85.6 | 4.5 | anlatıcı | Kapıyı açıyorum. Koridorda ağır bir nefes sesi. |
| 15 | 90.1 | 8.7 | anlatıcı + Ahmet Amca | Biri yavaşça dönüyor. Yüzünü göremiyorum. Sonra çok kısık bir ses duyuyorum: ...Deniz. |
| 16 | 98.7 | 3.0 | Deniz | Nasıl biliyor adımı? |
| 17 | 101.7 | 5.1 | anlatıcı | Fener mi, balta mı? Ve o şey… sence kim? |

## Sesler (her karakter ayrı)
Anlatıcı (iç ses): Tagi İlbeyli · Deniz (konuşurken, sahne 16): Mahmut Sesigüzel · Ela: CAGLAYAN · Ahmet Amca (fısıltı): Atlas The Greek. Hepsi ElevenLabs v4, etiketli.

## Bilinen sorunlar (dürüst liste)
1. **Süre:** 106,9 sn, hedef 80-90 sn. Gerçek ses yavaş (≈1,7 kelime/sn).
2. **Efekt ve müzik kodla sentezlendi** (yer tutucu kalitesinde).
3. **Sahne 16 sesi videoda eski:** yeni, daha net Deniz repliği üretildi ama videoya işlenmedi (render onayı bekliyor).
4. Ahmet Amca'nın sesi Türkçe için özel değil, telaffuz kontrolü bekliyor.
5. Sisli yüzleri basit, yüz animasyonu sınırlı. Karakterlerde yalnızca ağız, göz kırpma, nefes, kaş ve kafa hareketi var.
6. Videoyu kare kare tam izlemedik, kare özetleriyle kontrol ettik.
7. Durum paneli üst kenara yakın, Instagram arayüzünde kısmen kapanabilir.
8. Zaman ve mesafe değerleri varsayım: gün doğumu 06:50, dershane 14 km.

## ChatGPT'den istenen değerlendirme
1. **Hook (ilk 3 sn) ve ilk 15 sn:** izleyiciyi tutuyor mu? Dünya anlatımı çok yoğun mu?
2. **Tempo:** 107 sn uzun mu? Hangi sahneler kısaltılabilir/çıkarılabilir (özellikle 9, 10, 11)?
3. **Ela'nın sevdirilmesi:** sahne 7, 9, 10 yeterli mi?
4. **Cliffhanger (sahne 14-17):** "…Deniz" ve "O şey… kim?" güçlü mü? Yorum sorusu doğal mı?
5. **Gizem tutarlılığı:** Sisli'nin ismi bilmesi, yankı kuralı, Ahmet Amca'nın kimliği yeterince ipucu veriyor mu?
6. **Durum paneli:** faydalı mı, gürültü mü? Başka bilgi eklenmeli mi?
7. **Eleştirel liste:** en zayıf 3 nokta ve her biri için somut düzeltme önerisi. Genel övgü yok.

(Not: videonun kalitesini ve sesleri değerlendiremiyorsan bunu belirt, yalnızca metin ve kare özetiyle yorumla.)
