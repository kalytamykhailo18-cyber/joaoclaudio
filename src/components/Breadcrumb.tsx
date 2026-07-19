"use client";
import Link from "next/link";
import { useUI } from "@/components/UIProvider";

// Breadcrumb: os rótulos raiz (Início, Tratamentos) vêm do global "ui"; os demais
// (nomes de região/condição/tratamento) já são dados dinâmicos das coleções.
export default function Breadcrumb({ items }: { items: { name: string; url?: string }[] }) {
  const bc = useUI().breadcrumb;
  const label = (it: { name: string; url?: string }) => {
    if (it.url === "/") return bc.inicio;
    if (it.url === "/tratamentos" || it.name === "Tratamentos") return bc.tratamentos;
    return it.name;
  };
  return (
    <div className="breadcrumb">
      {items.map((it, i) => (
        <span key={i}>
          {it.url ? <Link href={it.url}>{label(it)}</Link> : label(it)}
          {i < items.length - 1 && " ›"}
        </span>
      ))}
    </div>
  );
}
