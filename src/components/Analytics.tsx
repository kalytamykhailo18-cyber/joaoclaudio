"use client";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

// GA4 direto (gtag) + eventos de conversão do site (clique WhatsApp / telefone).
// O GTM continua instalado para tags de marketing futuras; a medição de GA4
// é feita aqui no código, de forma confiável.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

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
  // Delegação global de cliques → eventos de conversão GA4 (e dataLayer p/ GTM).
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
      const params = { link_url: href, page_path: window.location.pathname };
      window.gtag?.("event", event, params);
      window.dataLayer?.push({ event, ...params });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  if (!GA_ID) return null;
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive" dangerouslySetInnerHTML={{
        __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA_ID}',{send_page_view:true});`,
      }} />
      <PageViews />
    </>
  );
}
