"use client";
import Link from "next/link";
import { useState } from "react";
import { regions, treatments } from "@/content/clusters";
import { site } from "@/content/site";

export default function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <>
      <header className="site-header">
        <div className="wrap nav">
          <Link className="brand" href="/" onClick={close}>
            <b>{site.doctor.replace("Dr. ", "").toUpperCase()}</b>
            <span>{site.specialty}</span>
          </Link>
          <div className="nav-right">
            <Link className="btn btn-outline-d" href="/contato" style={{ padding: "12px 24px" }}>
              Contato
            </Link>
            <button
              className={`menu-btn${open ? " open" : ""}`}
              aria-label="Menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      <nav className={`mega${open ? " open" : ""}`} aria-hidden={!open}>
        <div className="wrap">
          {regions.map((r) => (
            <div key={r.slug}>
              <h4>
                <Link href={`/${r.slug}`} onClick={close}>{r.name}</Link>
              </h4>
              <ul>
                {r.conditions.map((c) => (
                  <li key={c.slug}>
                    <Link href={`/${r.slug}/${c.slug}`} onClick={close}>{c.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h4><Link href="/tratamentos" onClick={close}>Tratamentos</Link></h4>
            <ul>
              {treatments.map((t) => (
                <li key={t.slug}>
                  <Link href={`/tratamentos/${t.slug}`} onClick={close}>{t.name}</Link>
                </li>
              ))}
              <li><Link href="/sobre" onClick={close}>O médico</Link></li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
