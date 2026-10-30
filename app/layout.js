import "./globals.css";
import { site } from "../data/site";

export const metadata = {
  title: `${site.name} | Et Döner & Ev Yemekleri – Fatih`,
  description: `${site.slogan}. ${site.address}. Trendyol, Yemeksepeti veya telefonla sipariş verin.`,
};

export const viewport = { themeColor: "#b3261e" };

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
