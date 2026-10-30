import { site, menu } from "../data/site";

function OrderButtons({ big }) {
  return (
    <div className={`order ${big ? "big" : ""}`}>
      <a className="btn call" href={`tel:${site.phoneHref}`}>📞 Ara: {site.phone}</a>
      <a className="btn trendyol" href={site.trendyol} target="_blank" rel="noopener noreferrer">Trendyol Yemek</a>
      <a className="btn yemeksepeti" href={site.yemeksepeti} target="_blank" rel="noopener noreferrer">Yemeksepeti</a>
      {site.whatsapp && (
        <a className="btn whatsapp" href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
      )}
    </div>
  );
}

export default function Home() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(site.mapsQuery)}&output=embed`;
  return (
    <>
      <header className="nav">
        <strong>{site.name}</strong>
        <nav>
          <a href="#menu">Menü</a>
          <a href="#siparis">Sipariş</a>
          <a href="#iletisim">İletişim</a>
        </nav>
      </header>

      <main>
        <section className="hero">
          <h1>{site.name}</h1>
          <p>{site.slogan}</p>
          <OrderButtons big />
        </section>

        <section id="menu" className="section">
          <h2>Menü</h2>
          <div className="grid">
            {menu.map((cat) => (
              <div className="card" key={cat.title}>
                <h3>{cat.title}</h3>
                <ul>
                  {cat.items.map((it) => (
                    <li key={it.name}>
                      <div>
                        <span className="name">{it.name}</span>
                        {it.desc && <small>{it.desc}</small>}
                      </div>
                      {it.price && <span className="price">{it.price}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="siparis" className="section alt">
          <h2>Nasıl Sipariş Verirsiniz?</h2>
          <div className="grid">
            <div className="card">
              <h3>🛵 Online</h3>
              <p>Şehrin her yerinden Trendyol Yemek veya Yemeksepeti üzerinden sipariş verebilirsiniz.</p>
            </div>
            <div className="card">
              <h3>📞 Telefonla</h3>
              <p>{site.deliveryNote}</p>
            </div>
          </div>
          <OrderButtons />
        </section>

        <section id="iletisim" className="section">
          <h2>İletişim</h2>
          <div className="grid">
            <div className="card">
              <h3>Adres</h3>
              <p>{site.address}</p>
              <h3>Çalışma Saatleri</h3>
              <ul className="hours">
                {site.hours.map((h) => (
                  <li key={h.days}><span>{h.days}</span><span>{h.time}</span></li>
                ))}
              </ul>
            </div>
            <iframe
              className="map"
              title="Harita"
              src={mapSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>
      </main>

      <footer>© {new Date().getFullYear()} {site.name}</footer>

      <a className="floating-call" href={`tel:${site.phoneHref}`} aria-label="Ara">📞 Ara</a>
    </>
  );
}
