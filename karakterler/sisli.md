# Sisli'ler (üretici + tanınabilir karakterler)

**Kural:** Her Sisli eski bir insandır. Aynı kalıptan klon yok. Kalabalık sahnelerde her Sisli farklı görünür; bazıları **tanınabilir** (Deniz ve izleyici onları tanır).

## Üretici (`sablon/sisli.js`)
`Sisli.random(tohum)` farklı bir Sisli üretir. Çeşitlenen özellikler:
- **Beden:** boy (kısa/uzun), kilo (zayıf/normal/göbekli), baş büyüklüğü
- **Ten:** gri-mavi, yeşilimsi gri, sıcak gri tonları
- **Saç:** kel, kısa, uzun, kenarlarda saç; şapka/bone
- **Kıyafet:** tişört, gömlek, elbise/etek, önlük, kravat, çizgili; **yırtık etek ve paçalar**; kısa/uzun/kolsuz
- **Ayakkabı:** ayakkabılı, **tek ayakkabılı, çıplak ayaklı**
- **Yaralar (çizgi film üslubunda):** göğüs/karın kan lekesi, kol ve boyunda **ısırık izi**, yanak çizikleri, baş yarası, **eksik ön kol**
- **Yüz:** ağzı açık/dişli ya da sakin, gözlük (bazen çatlak), bıyık
- **Göz:** siyah çukurda parlayan göz; beyaz, sarımsı veya kırmızımsı parıltı, ışıkta titreşir

Yeni bölümde sadece `Sisli.random(tohum)` veya bir preset çağrılır. Aynı tohum aynı Sisli'yi verir (tutarlılık).

## Tanınabilir Sisli'ler (presets)
| Ad | Kim | Ayırt edici |
|---|---|---|
| **Ahmet Amca** (çalışma adı) | Apartman komşusu, **Bölüm 1 koridorundaki Sisli** | Kel tepe, yan beyaz saç, beyaz bıyık, çatlak yuvarlak gözlük, bej ev hırkası, pijama pantolon, kahverengi terlik, **boynunda ısırık**, elinde **anahtar demeti** (şıngırtı) |
| **Bakkal Cemal** | Mahalle bakkalı | Kısa, kilolu, koyu bıyık, lekeli beyaz önlük, tek ayakkabı, kolunda ısırık, dişlerini gösteren ifade |
| **Hemşire Ayşe** | Semt kliniği | Uzun, zayıf, beyaz hemşire bonesi, turkuaz üniforma, çıplak ayak, göğüste kan lekesi, **sol ön kol yok** |

## Tanınabilirlik kuralı
- Tanınan Sisli'nin yüzü hâlâ "o insanı" andırır: bıyık, gözlük, saç, kıyafet.
- Deniz tanıdığı birini görünce **yüz ifadesi** değişir (şaşkınlık, üzüntü). Bu duygusal bir an yaratır ve izleyiciyi hikâyeye bağlar.
- **Ahmet Amca'nın kimliği Bölüm 1'de söylenmez.** İzleyici "bu apartmandan biri" diye düşünür, sonraki bölümlerde Deniz tanır.
- **Sisli konuşmaz** (ChatGPT kararı). Yankı kuralı ana gizem değil.
- **Ses imzası:** derin, boğuk hırıltı + içinde kuru, kesik solunum; düzensiz nefes. Seri boyunca tutarlı.
- Sisli'ler **düşmandır**: karşılaşınca kaç ya da savaş. Tanınan yüz tehdidi azaltmaz.

## İçerik sınırı
Çizgi film üslubunda kan izi, ısırık ve yaralar serbest. **Detaylı, grafik gore yok** (platform kuralları ve geniş kitle için). Eksik uzuvlar stilize ve kısa süreli gösterilir.
