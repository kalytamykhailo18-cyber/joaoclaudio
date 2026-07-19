"use client";
import { createContext, useContext, type ReactNode } from "react";
import { uiDefault, type UIContent } from "@/content/ui";

// Disponibiliza os textos da interface (do global "ui") aos componentes client
// (login, editor, header…). Componentes server usam getUI() direto.
const UIContext = createContext<UIContent>(uiDefault);

export function UIProvider({ value, children }: { value: UIContent; children: ReactNode }) {
  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI(): UIContent {
  return useContext(UIContext);
}
