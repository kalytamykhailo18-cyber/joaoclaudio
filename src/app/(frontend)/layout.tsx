import type { Metadata } from "next";
import Script from "next/script";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RouteProgress from "@/components/RouteProgress";
import WhatsAppFab from "@/components/WhatsAppFab";
import Analytics from "@/components/Analytics";
import { PhysicianSchema } from "@/components/Schema";
import { site } from "@/content/site";
import { getRegions, getTreatments, getSiteSettings, getUI } from "@/lib/content";
import { SiteProvider } from "@/components/SiteProvider";
import { UIProvider } from "@/components/UIProvider";
import { AdminProvider } from "@/components/inline/useIsAdmin";

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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [regions, treatments, settings, ui] = await Promise.all([
    getRegions(),
    getTreatments(),
    getSiteSettings(),
    getUI(),
  ]);
  return (
    <html lang="pt-BR" className={`${playfair.variable} ${montserrat.variable}`}>
      <body>
        {/* Google Tag Manager */}
        {GTM_ID && (
          <>
            <Script id="gtm" strategy="afterInteractive" dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`,
            }} />
            <noscript>
              <iframe
                title="Google Tag Manager"
                src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
                height="0"
                width="0"
                style={{ display: "none", visibility: "hidden" }}
              />
            </noscript>
          </>
        )}
        {/* Ativa o estado inicial escondido dos itens ANTES do primeiro paint
            (sem flash). Sem JS, a classe nunca é adicionada → conteúdo visível. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('reveal-ready')",
          }}
        />
        <AdminProvider>
          <UIProvider value={ui}>
          <SiteProvider value={settings}>
            <RouteProgress />
            <Header regions={regions} treatments={treatments} />
            <main>{children}</main>
            <Footer regions={regions} treatments={treatments} />
            <WhatsAppFab />
            <Analytics />
            <PhysicianSchema />
          </SiteProvider>
          </UIProvider>
        </AdminProvider>
      </body>
    </html>
  );
}
