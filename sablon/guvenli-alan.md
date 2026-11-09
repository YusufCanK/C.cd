# Reels güvenli alanı ve yazı boyutları (şablon kuralı)

**DURUM: TAHMİNİ, gerçek Instagram Reels arayüzünde TEST EDİLMEDİ.** Bu ortamdan Instagram'a erişim ve gerçek arayüz önizlemesi yok. Aşağıdaki ölçüler yaygın tasarım rehberlerine ve tahmine dayanır; cihaza, Instagram sürümüne ve hesap arayüzüne göre değişebilir.

## Varsayılan ölçüler (1080 x 1920 kare)
| Bölge | Sınır | Nedeni (tahmin) |
|---|---|---|
| Üst | ilk 270 px boş | durum çubuğu, kamera/başlık |
| Alt | 1500 px'ten sonrası boş | kullanıcı adı, açıklama, müzik, alt çubuk |
| Sağ | alt yarıda sağdaki ~120 px (y 1100-1500) | beğen/yorum/paylaş düğmeleri |

Rozet, durum paneli ve altyazı bu çerçevenin **içinde** kalır; birbiriyle ve karakter yüzleriyle çakışmaz.

## Yazı boyutları
Video 1080 px genişlikte, telefonda ≈ 390 pt'ye ölçeklenir (≈ 0,36). Okunabilir alt sınır ≈ 12-13 pt ≈ **34-36 px**.
- Durum paneli: hedef/kat/mesafe **36 px**, etiket **30 px**, gün **32 px**, saat **84 px**, geri sayım **90 px**.
- Altyazı: 76 px (3 satıra kadar).
- 390 px genişlikte (gerçek telefon boyutu) önizlemede okunabilirliği kontrol edildi.

## Gerçek test nasıl yapılır (kullanıcı)
1. Render sonrası videoyu Instagram'a **"Sadece ben"** ya da taslak olarak yükle.
2. Reels önizlemesinde üst, alt ve sağ arayüzün paneli/altyazıyı kapatıp kapatmadığına bak.
3. Kapatıyorsa `sablon/bolum_veri.py` / `prototip/bolum01.html` içindeki konumları kaydır; önizleme sayfasındaki "Güvenli alan" kutusu kılavuz verir.
