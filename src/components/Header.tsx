"use client";
import Link from "next/link";
import { useState } from "react";
import type { Region, Treatment } from "@/content/clusters";
import { useSite } from "@/components/SiteProvider";
import { useUI } from "@/components/UIProvider";
import InlineEdit from "@/components/inline/InlineEdit";
import { useIsAdmin } from "@/components/inline/useIsAdmin";

export default function Header({
  regions,
  treatments,
}: {
  regions: Region[];
  treatments: Treatment[];
}) {
  const site = useSite();
  const ui = useUI();
  const nav = ui.nav;
  const admin = useIsAdmin();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const logout = async () => {
    await fetch("/api/users/logout", { method: "POST", credentials: "include" });
    // Remove a dica de UI de admin.
    document.cookie = "jc_admin=; path=/; max-age=0; samesite=lax";
    // Navegação dura: recarrega a árvore para refletir o estado deslogado.
    window.location.assign("/");
  };
  return (
    <>
      <header className="site-header">
        <div className="wrap nav">
          <Link className="brand" href="/" onClick={close} aria-label={site.doctor}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/logo-white.png" alt={site.doctor} className="brand-logo" />
          </Link>
          <div className="nav-right">
            <Link className="btn btn-outline-d" href="/contato" style={{ padding: "12px 24px" }}>
              {nav.contato}
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
            <h4><Link href="/tratamentos" onClick={close}>{nav.tratamentos}</Link></h4>
            <ul>
              {treatments.map((t) => (
                <li key={t.slug}>
                  <Link href={`/tratamentos/${t.slug}`} onClick={close}>{t.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <InlineEdit
            globalSlug="ui"
            title="Editar: Textos gerais do site (menu, links e rótulos)"
            fields={[
              { name: "nav.contato", label: "Contato", type: "text", value: nav.contato },
              { name: "nav.tratamentos", label: "Tratamentos", type: "text", value: nav.tratamentos },
              { name: "nav.dorCronica", label: "Dor crônica", type: "text", value: nav.dorCronica },
              { name: "nav.oMedico", label: "O médico", type: "text", value: nav.oMedico },
              { name: "nav.blog", label: "Blog", type: "text", value: nav.blog },
              { name: "nav.depoimentos", label: "Depoimentos", type: "text", value: nav.depoimentos },
              { name: "nav.agendar", label: "Agendar", type: "text", value: nav.agendar },
              { name: "nav.acesso", label: "Acesso", type: "text", value: nav.acesso },
              { name: "nav.entrar", label: "Entrar", type: "text", value: nav.entrar },
              { name: "nav.sair", label: "Sair", type: "text", value: nav.sair },
              { name: "breadcrumb.inicio", label: "Breadcrumb — Início", type: "text", value: ui.breadcrumb.inicio },
              { name: "chips.verCondicoes", label: "Link — Ver condições", type: "text", value: ui.chips.verCondicoes },
              { name: "chips.verTratamento", label: "Link — Ver tratamento", type: "text", value: ui.chips.verTratamento },
              { name: "chips.saibaMais", label: "Link — Saiba mais", type: "text", value: ui.chips.saibaMais },
              { name: "chips.lerArtigo", label: "Link — Ler artigo", type: "text", value: ui.chips.lerArtigo },
              { name: "chips.explorar", label: "Link — Explorar", type: "text", value: ui.chips.explorar },
              { name: "chips.sobre", label: "Prefixo — Sobre", type: "text", value: ui.chips.sobre },
              { name: "chips.ver", label: "Prefixo — Ver", type: "text", value: ui.chips.ver },
              { name: "chips.conhecaMedico", label: "Link — Conheça o médico", type: "text", value: ui.chips.conhecaMedico },
              { name: "contact.endereco", label: "Rótulo — Endereço:", type: "text", value: ui.contact.endereco },
              { name: "contact.telefone", label: "Rótulo — Telefone:", type: "text", value: ui.contact.telefone },
              { name: "contact.instagram", label: "Rótulo — Instagram:", type: "text", value: ui.contact.instagram },
              { name: "reviews.avaliacoesGoogle", label: "Texto — avaliações no Google", type: "text", value: ui.reviews.avaliacoesGoogle },
              { name: "reviews.perfilVerificado", label: "Texto — Perfil verificado", type: "text", value: ui.reviews.perfilVerificado },
              { name: "blog.minLeitura", label: "Blog — 'min de leitura'", type: "text", value: ui.blog.minLeitura },
              { name: "blog.authorCreds", label: "Blog — credenciais do autor", type: "text", value: ui.blog.authorCreds },
              { name: "blog.reviewNote", label: "Blog — nota de revisão", type: "textarea", value: ui.blog.reviewNote },
            ]}
          >
            <div>
              <h4><Link href="/dor-cronica" onClick={close}>{nav.dorCronica}</Link></h4>
              <ul>
                <li><Link href="/sobre" onClick={close}>{nav.oMedico}</Link></li>
                <li><Link href="/blog" onClick={close}>{nav.blog}</Link></li>
                <li><Link href="/depoimentos" onClick={close}>{nav.depoimentos}</Link></li>
                <li><Link href="/agendar" onClick={close}>{nav.agendar}</Link></li>
                <li><Link href="/contato" onClick={close}>{nav.contato}</Link></li>
                {admin ? (
                  <li><button type="button" className="nav-linkbtn" onClick={logout}>{nav.sair}</button></li>
                ) : (
                  <li><Link href="/entrar" onClick={close}>{nav.entrar}</Link></li>
                )}
              </ul>
            </div>
          </InlineEdit>
        </div>
      </nav>
    </>
  );
}
