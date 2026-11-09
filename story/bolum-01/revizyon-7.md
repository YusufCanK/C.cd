# Revizyon 7: dünya kuralı ve bölüm hedefi (TASLAK, ses/render yok)

Konuşma hızı mevcut anlatıcı seslerinden ölçüldü: sahne 2 için 1,64 kelime/sn, sahne 11 için 1,86 kelime/sn.

| Sahne | Metin | Kelime | Tahmini süre | Şu anki süre | Kredi (tahmin) |
|---|---|---|---|---|---|
| 2 uzun | Sisi soluyan insanlar dakikalar içinde dönüşüyor. Şimdiye kadar bunun bir istisnasını görmedim. Gündüz uyuşuklar, geceleri ışığı ve sesi arıyorlar. Biz onlara Sisli dedik. | 22 | ~13,4 sn | 8,5 sn | ~209 |
| 2 kısa | Sisi soluyan dakikalar içinde dönüşüyor. İstisna görmedim. Gündüz uyuşuklar, gece ışığı ve sesi arıyorlar. Onlara Sisli dedik. | 16 | ~9,8 sn | 8,5 sn | ~156 |
| 11 | Gün doğunca Sisliler yavaşlıyor. O zamana kadar dokuz kat inmeliyim. | 10 | ~5,4 sn | 7,5 sn | ~84 |

- "Üç gün önce şehre gri bir sis çöktü" cümlesi sahne 1'de zaten var, sahne 2'den çıkarıldı.
- "Asansör çalışmıyor" görselde yoktu. Seslendirmeden çıkarıldı. Sahne 11'e görsel ipucu eklenecek: asansör kapısında "ARIZALI" bandı (kredi yok).
- Bölüm süresi: kısa sürümle ~106,1 sn, uzun sürümle ~109,7 sn (şu an 106,9).

## Güncelleme (ChatGPT seçimi: kısa sürüm ve metin düzeltmesi)
| Sahne | Metin | Kelime | Tahmini süre | Kredi |
|---|---|---|---|---|
| 2 seçilen | Sisi soluyanlar dakikalar içinde dönüşüyor. Şimdiye kadar dönüşmeyen birini görmedim. Gündüz uyuşuklar, gece ışığa ve sese yöneliyorlar. Biz onlara Sisli dedik. | 21 | ~12,8 sn | ~198 |
| 2 kısaltılmış seçenek | Sisi soluyan dakikalar içinde dönüşüyor. Dönüşmeyen birini görmedim. Gündüz uyuşuklar, gece ışığa ve sese yöneliyorlar. Onlara Sisli dedik. | 18 | ~11,0 sn | ~175 (oranla) |
| 11 | Gün doğunca Sisliler yavaşlıyor. O zamana kadar dokuz kat inmeliyim. | 10 | ~5,4 sn | ~84 |

Seçilen metinle toplam ~282 kredi, bölüm ~109,1 sn. Kısaltılmış seçenekle ~259 kredi, ~107,3 sn.

## Kesinleşen metin (ChatGPT ve Claude, ses/render yok)
Bölüm 1'in gerçek bitişi: Deniz daire kapısını açar (sahne 14). Koridordaki Sisli, merdiven ile Deniz'in arasındadır (sahne 15-16). Seçim (sahne 17), Deniz'in merdivene nasıl geçeceğini belirler. Mini amaç bölüm içinde konur, engellenir, Bölüm 2 başında çözülür.

| Sahne | Metin | Kelime | Tahmini süre | Kredi |
|---|---|---|---|---|
| 2 | Sisi soluyanlar dakikalar içinde dönüşüyor. Dönüşmeyen birini görmedim. Gündüz uyuşuklar, gece ışığa ve sese yöneliyorlar. Onlara Sisli dedik. | 18 | ~11,0 sn (şu an 8,5) | ~180 |
| 11 | Gün doğunca Sisliler yavaşlıyor. O zamana kadar aşağı inmeliyim. Önce koridorun sonundaki merdivene. | 13 | ~7,0 sn (şu an 7,5) | ~116 |

Toplam ~296 kredi, bölüm ~108,9 sn. Panel: HEDEF: MERDİVEN BOŞLUĞUNA ULAŞ (sığdığı ölçüldü).

## Üretim (kullanıcı onaylı)
- Sesler üretildi: sahne 2 = 180 kredi (10,84 sn), sahne 11 = 125 kredi (7,55 sn). **Toplam 305 kredi.** Tahmin 296'ydı: sahne 11 tahmini "merdivene" metniyle yapılmıştı, kesin metin "merdiven boşluğuna" olunca +9 kredi.
- Eski sesler: `ses/ham/rev6/`.
- Render: `cikti.mp4`, 109,27 sn, 1080x1920, ses var.
