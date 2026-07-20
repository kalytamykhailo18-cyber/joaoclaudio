"use client";
import Link from "next/link";
import { useMemo, useState } from "react";

export type SearchItem = { label: string; href: string; group?: string };

// Busca interna client-side (sem backend): filtra a lista de páginas conhecidas
// conforme o visitante digita. Usada na página 404 para recuperar o visitante —
// leva-o à página certa em vez de perdê-lo. Normaliza acentos para casar "artrose"
// com "ártrose", "coluna" com "cóluna", etc.
const norm = (s: string) =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

export default function SiteSearch({
  items,
  placeholder,
  emptyText,
}: {
  items: SearchItem[];
  placeholder: string;
  emptyText: string;
}) {
  const [q, setQ] = useState("");
  const results = useMemo(() => {
    const term = norm(q.trim());
    if (!term) return [];
    return items.filter((it) => norm(it.label).includes(term)).slice(0, 8);
  }, [q, items]);

  return (
    <div className="site-search">
      <input
        type="search"
        className="site-search-input"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        autoComplete="off"
      />
      {q.trim() && (
        <ul className="site-search-results">
          {results.length > 0 ? (
            results.map((it) => (
              <li key={it.href}>
                <Link href={it.href}>
                  <span>{it.label}</span>
                  {it.group && <em>{it.group}</em>}
                </Link>
              </li>
            ))
          ) : (
            <li className="site-search-empty">{emptyText}</li>
          )}
        </ul>
      )}
    </div>
  );
}
