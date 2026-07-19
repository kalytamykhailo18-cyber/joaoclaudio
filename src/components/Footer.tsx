import Link from "next/link";
import type { Region, Treatment } from "@/content/clusters";
import { whatsappLink } from "@/content/site";
import { getSiteSettings, getPages, getUI } from "@/lib/content";
import InlineEdit from "@/components/inline/InlineEdit";

export default async function Footer({
  regions,
  treatments,
}: {
  regions: Region[];
  treatments: Treatment[];
}) {
  const [site, pages, ui] = await Promise.all([getSiteSettings(), getPages(), getUI()]);
  const f = pages.footer;
  const nav = ui.nav;
  return (
    <footer className="site-footer">
      <InlineEdit
        globalSlug="pages"
        title="Editar: Rodapé"
        fields={[
          { name: "footer.tagline", label: "Descrição (rodapé)", type: "textarea", value: f.tagline },
          { name: "footer.colAreas", label: "Coluna — Áreas", type: "text", value: f.colAreas },
          { name: "footer.colTreatments", label: "Coluna — Tratamentos", type: "text", value: f.colTreatments },
          { name: "footer.colMore", label: "Coluna — Mais", type: "text", value: f.colMore },
          { name: "footer.colContact", label: "Coluna — Contato", type: "text", value: f.colContact },
          { name: "footer.reviewsSuffix", label: "Sufixo das avaliações", type: "text", value: f.reviewsSuffix },
          { name: "footer.rights", label: "Direitos reservados", type: "text", value: f.rights },
        ]}
      >
      <div className="wrap">
        <div className="fgrid">
          <div>
            <Link className="brand" href="/" aria-label={site.doctor}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/logo-white.png" alt={site.doctor} className="brand-logo footer-logo" />
            </Link>
            <p style={{ maxWidth: 290, color: "#9a9a9a" }}>{f.tagline}</p>
            <div className="social">
              <a href="#" aria-label="Instagram">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" /></svg>
              </a>
              <a href={whatsappLink(site.whatsapp)} aria-label="WhatsApp">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 004.79 1.22c5.46 0 9.9-4.45 9.9-9.91 0-5.46-4.44-9.83-9.92-9.83z" /></svg>
              </a>
            </div>
          </div>
          <div>
            <h4>{f.colAreas}</h4>
            <ul>
              <li><Link href="/dor-cronica">{nav.dorCronica}</Link></li>
              {regions.map((r) => (
                <li key={r.slug}><Link href={`/${r.slug}`}>{r.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4>{f.colTreatments}</h4>
            <ul>
              {treatments.map((t) => (
                <li key={t.slug}><Link href={`/tratamentos/${t.slug}`}>{t.short}</Link></li>
              ))}
            </ul>
            <h4 style={{ marginTop: 24 }}>{f.colMore}</h4>
            <ul>
              <li><Link href="/blog">{nav.blog}</Link></li>
              <li><Link href="/depoimentos">{nav.depoimentos}</Link></li>
              <li><Link href="/agendar">{nav.agendar}</Link></li>
            </ul>
          </div>
          <div>
            <h4>{f.colContact}</h4>
            <ul className="fcontact">
              <li>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                {site.address}
              </li>
              <li>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3-8.6A2 2 0 014.1 2h3a2 2 0 012 1.7c.1 1 .4 1.9.7 2.8a2 2 0 01-.5 2.1L8.1 9.9a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.4c.9.3 1.8.6 2.8.7a2 2 0 011.7 2z" /></svg>
                {site.phone}
              </li>
            </ul>
            <a className="rev" href={site.googleReviewsUrl} target="_blank" rel="noopener" style={{ textDecoration: "none" }}>
              <span className="stars">★★★★★</span>{" "}
              <span style={{ fontSize: 13 }}>
                {site.rating.toFixed(1).replace(".", ",")} · {site.reviewCount} {f.reviewsSuffix}
              </span>
            </a>
          </div>
        </div>
        <div className="fbottom">
          <span>© {new Date().getFullYear()} {site.doctor} · {f.rights}</span>
          <span>
            <Link href="/politica-de-privacidade">{nav.privacidade}</Link> ·{" "}
            <Link href="/politica-de-cookies">{nav.cookies}</Link> ·{" "}
            <Link href="/termos-de-uso">{nav.termos}</Link>
          </span>
        </div>
      </div>
      </InlineEdit>
    </footer>
  );
}
