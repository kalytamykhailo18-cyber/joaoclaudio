"use client";
import { createContext, useContext, type ReactNode } from "react";
import { site as defaultSite } from "@/content/site";
import type { SiteData } from "@/lib/content";

// Contexto para componentes client (Header, WhatsAppFab) lerem as configurações
// do site vindas do CMS. O layout (server) busca e fornece o valor.
const SiteContext = createContext<SiteData>(defaultSite);

export function SiteProvider({ value, children }: { value: SiteData; children: ReactNode }) {
  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite(): SiteData {
  return useContext(SiteContext);
}
