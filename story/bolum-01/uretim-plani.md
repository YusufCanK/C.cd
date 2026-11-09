# Bölüm 1 üretim planı (rig sistemi)

Yöntem: parçalı SVG karakter + kodla animasyon. Düz görsel üretimi **yok**.

## Hazır
- Deniz rig (prototip: sahne 4), Ela rig (prototip: sahne 7)
- Ağız senkronu: `sablon/lipsync.js`
- Ses: sahne 4 (Deniz), sahne 7 (Ela)

## Yapılacak varlıklar (SVG)
**Arka planlar:** (1) sisli metropol silueti, (2) gece sokağı + Sisli siluetleri, (3) kesinti kolajı (pencere, TV, radyo), (4) oturma odası ✅, (5) dershane ✅, (6) mutfak/buzdolabı, (7) merdiven boşluğu, (8) kapı önü + karanlık koridor.
**Eşyalar:** pusula, telefon (%4 pil, mesaj balonu), baba fotoğrafı, Ela çizimi (buzdolabı), fener, balta.
**Karakter pozları:** Deniz (ön ✅, 3/4 bakış, korkmuş yüz), Sisli siluet (kambur, parlayan göz), Ela ✅, anı sahnesi (Deniz+Ela kanepe).
**Ekran katmanları (şablon):** altyazı, seçim kartı (fener | balta + "Kim?"), "BÖLÜM 1" başlığı.

## Ses
| Sahne | Durum |
|---|---|
| 4, 7 | ✅ hazır |
| 1,2,3,5,6,9,10,11,12,13,14,15,16,17 | Üretilmedi. Deniz sesi (Tagi İlbeyli), eleven_v4 + etiketler, **tek deneme**. Yaklaşık 70 sn konuşma, tahmini maliyet ~1300-1500 kredi. **Üretimden önce `estimate_only` ile gerçek rakam gösterilip onay alınacak.** |

## Efekt ve müzik
Her sahne için `sahneler.json` içinde `ses_efekt` yazılı. Müzik: lisanslı veya üretilmiş, `muzik-sfx/` altına. **Sessiz render yok.**

## Sıra
1. Senaryo ve sahne listesi onayı (revizyon 4, kontrol bekliyor)
2. Sahne 1-3 (dünya) arka plan + animasyon
3. Kalan sahneler
4. Ses üretimi (maliyet onayı sonrası)
5. Montaj, altyazı, seçim kartı
6. Prototip değerlendirme → onay → kapak
