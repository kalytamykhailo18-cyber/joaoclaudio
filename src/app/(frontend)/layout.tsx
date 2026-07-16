import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFab from "@/components/WhatsAppFab";
import { PhysicianSchema } from "@/components/Schema";
import { site } from "@/content/site";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default: `${site.doctor} — Ortopedia e Tratamento da Dor | ${site.city}`,
    template: `%s | ${site.doctor}`,
  },
  description:
    "Referência em ortopedia e tratamento da dor crônica em Goiânia. Coluna, joelho, ombro e quadril com medicina regenerativa e infiltrações guiadas por ultrassom.",
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "pt_BR", siteName: site.doctor },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${playfair.variable} ${montserrat.variable}`}>
      <body>
        <div className="note">
          Prévia de desenvolvimento · {site.doctor} — foto, contato e depoimentos são placeholders para revisão
        </div>
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppFab />
        <PhysicianSchema />
      </body>
    </html>
  );
}
