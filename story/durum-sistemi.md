# Seçim hafıza sistemi

Her seçim `story/degiskenler.json` içinde kaydedilir. Sonraki bölümler bu değişkenlere göre **sahne metni, eşya, diyalog ve tehlike seviyesini** değiştirir. İzleyici oyu bölüm bitince çoğunluğa göre işlenir.

## Değişkenler
| Anahtar | Tür | Anlamı |
|---|---|---|
| `esya` | liste | Deniz'in taşıdığı eşyalar |
| `tehlike` | sayı | Sisli'lerin dikkati / genel tehlike seviyesi |
| `guven_nezihe`, `guven_kaan`, `guven_selim` | sayı | Karakterin Deniz'e güveni |
| `ela_cizimleri` | liste | Deniz'in bulduğu Ela çizimleri |
| `yanki_ipuclari` | sayı | Sisli "yankı" gizemine dair toplanan ipucu |

## Örnek etkiler
| Seçim | Hemen | Sonra |
|---|---|---|
| Fener | tehlike +1, Sisli'ler Deniz'i fark eder | Karanlık katlarda görür; Selim ışığı fark edip şüphelenir |
| Balta | merdivende ses çıkar, tehlike +1 | Nezihe Teyze baltayı görünce Deniz'e güvenini kaybeder (`guven_nezihe` -1) |

## Kural
Yeni bölümün `sahneler.json` dosyası, ortak sahnelere ek olarak `varyant` alanı ile durum değişkenine bağlı kısa sahneler (20-30 sn) ve tek tek replik/eşya değişimleri taşır.

## A/B seçim anlamı (Bölüm 1)
- **A) Fener:** Işıkla yolunu bul. Sisli seni fark edebilir. (`tehlike +1`, görüş avantajı)
- **B) Balta:** Karşı koy. Gürültü diğer Sisli'leri çekebilir. (`tehlike +1`, savunma/engel kırma)
İki seçenek de hem avantaj hem risk taşır; güvenli seçenek yoktur.
