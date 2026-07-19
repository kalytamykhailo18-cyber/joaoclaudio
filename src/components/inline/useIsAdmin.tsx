"use client";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

// Estado de admin em UM contexto compartilhado, lido de um cookie leve (jc_admin)
// UMA única vez — sem chamada de rede. Visitantes anônimos não têm o cookie, então
// não há fetch de auth, nem lápis, e o editor pesado nem é baixado (code-split).
// jc_admin é apenas dica de UI: toda gravação continua protegida pela API do Payload.
const AdminContext = createContext<boolean>(false);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState(false);
  useEffect(() => {
    setAdmin(document.cookie.split("; ").some((c) => c === "jc_admin=1"));
  }, []);
  return <AdminContext.Provider value={admin}>{children}</AdminContext.Provider>;
}

export function useIsAdmin(): boolean {
  return useContext(AdminContext);
}
