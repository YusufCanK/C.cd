// Sitedeki tüm düzenlenebilir bilgiler burada. Placeholder değerleri dükkanın gerçek bilgileriyle değiştirin.
export const site = {
  name: "Dükkan Adı",
  slogan: "Odun ateşinde et döner, annenin elinden ev yemekleri",
  phone: "+90 212 000 00 00", // gösterilecek numara
  phoneHref: "+902120000000", // tel: linki için boşluksuz
  whatsapp: "", // örn: "905320000000" (boşsa buton gizlenir)
  address: "Fatih, İstanbul",
  mapsQuery: "Fatih İstanbul", // Google Maps arama metni (tam adres yazın)
  hours: [
    { days: "Pazartesi – Cumartesi", time: "10:00 – 22:00" },
    { days: "Pazar", time: "11:00 – 21:00" },
  ],
  trendyol: "https://www.trendyol.com/", // Trendyol Yemek mağaza linki
  yemeksepeti: "https://www.yemeksepeti.com/", // Yemeksepeti restoran linki
  deliveryNote: "Fatih ve çevresine telefonla sipariş alıyoruz.",
};

export const menu = [
  {
    title: "Et Döner",
    items: [
      { name: "Et Döner Porsiyon", desc: "Pilav, közlenmiş biber ve domates ile", price: "" },
      { name: "Et Döner Ekmek Arası", desc: "Taze ekmek, soğan, domates", price: "" },
      { name: "İskender", desc: "Tereyağı, domates sosu ve yoğurtla", price: "" },
    ],
  },
  {
    title: "Ev Yemekleri",
    items: [
      { name: "Kuru Fasulye", desc: "Pilav ile", price: "" },
      { name: "Etli Nohut", desc: "Pilav ile", price: "" },
      { name: "Günün Yemeği", desc: "Her gün değişen yöresel lezzet", price: "" },
    ],
  },
  {
    title: "Yöresel",
    items: [
      { name: "Yöresel Çorba", desc: "Günlük taze", price: "" },
      { name: "Yöresel Tatlı", desc: "Ev yapımı", price: "" },
      { name: "Ayran / İçecekler", desc: "", price: "" },
    ],
  },
];
