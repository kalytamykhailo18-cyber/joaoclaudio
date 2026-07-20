"use client";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { captureAttribution, getAttribution } from "@/lib/attribution";

// GA4 direto (gtag) + eventos de conversão do site (clique WhatsApp / telefone).
// O GTM continua instalado para tags de marketing futuras; a medição de GA4
// é feita aqui no código, de forma confiável.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
// Google Ads (opcional): quando o João configurar a conta, basta preencher estas
// variáveis no .env — nenhuma mudança de código é necessária. Sem elas, nada é
// carregado (zero custo p/ o visitante). AW-XXXXXXXXX + rótulos de conversão.
const GADS_ID = process.env.NEXT_PUBLIC_GADS_ID; // ex.: AW-123456789
const GADS_LABEL: Record<string, string | undefined> = {
  whatsapp_click: process.env.NEXT_PUBLIC_GADS_LABEL_WHATSAPP,
  phone_click: process.env.NEXT_PUBLIC_GADS_LABEL_PHONE,
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

// Envia page_view nas navegações client-side (App Router). A 1ª exibição é
// enviada pelo config (send_page_view); aqui cobrimos as trocas de rota.
function PageViews() {
  const pathname = usePathname();
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    window.gtag?.("event", "page_view", {
      page_path: pathname,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname]);
  return null;
}

export default function Analytics() {
  // Captura a origem de campanha (gclid/UTM) na 1ª interação → cookie de 90 dias.
  useEffect(() => {
    captureAttribution();
  }, []);

  // Delegação global de cliques → eventos de conversão GA4 (e dataLayer p/ GTM),
  // já com a atribuição de campanha anexada e, se configurada, a conversão de Ads.
  useEffect(() => {
    if (!GA_ID) return;
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const a = target?.closest?.("a");
      if (!a) return;
      const href = a.getAttribute("href") || "";
      let event: string | null = null;
      if (/wa\.me|api\.whatsapp\.com|whatsapp/i.test(href)) event = "whatsapp_click";
      else if (href.startsWith("tel:")) event = "phone_click";
      if (!event) return;
      const params = {
        link_url: href,
        page_path: window.location.pathname,
        ...getAttribution(), // utm_source/medium/campaign/gclid → atribuição
      };
      window.gtag?.("event", event, params);
      window.dataLayer?.push({ event, ...params });
      // Conversão de Google Ads (só dispara se o João tiver configurado o rótulo).
      const label = GADS_LABEL[event];
      if (GADS_ID && label) {
        window.gtag?.("event", "conversion", { send_to: `${GADS_ID}/${label}` });
      }
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  if (!GA_ID) return null;
  const configLines = [
    `gtag('config','${GA_ID}',{send_page_view:true});`,
    GADS_ID ? `gtag('config','${GADS_ID}');` : "",
  ].join("");
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive" dangerouslySetInnerHTML={{
        __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());${configLines}`,
      }} />
      <PageViews />
    </>
  );
}
