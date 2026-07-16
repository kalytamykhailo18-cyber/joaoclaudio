import Link from "next/link";
import { regions, treatments } from "@/content/clusters";
import { site, whatsappLink } from "@/content/site";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="fgrid">
          <div>
            <Link className="brand" href="/">
              <b style={{ fontSize: 19 }}>{site.doctor.replace("Dr. ", "").toUpperCase()}</b>
              <span>{site.specialty}</span>
            </Link>
            <p style={{ maxWidth: 290, color: "#9a9a9a" }}>
              Referência em ortopedia e tratamento da dor crônica em {site.city}, com foco em
              recuperação funcional e atendimento humano.
            </p>
            <div className="social">
              <a href="#" aria-label="Instagram">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" /></svg>
              </a>
              <a href={whatsappLink()} aria-label="WhatsApp">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 004.79 1.22c5.46 0 9.9-4.45 9.9-9.91 0-5.46-4.44-9.83-9.92-9.83z" /></svg>
              </a>
            </div>
          </div>
          <div>
            <h4>Áreas</h4>
            <ul>
              {regions.map((r) => (
                <li key={r.slug}><Link href={`/${r.slug}`}>{r.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Tratamentos</h4>
            <ul>
              {treatments.map((t) => (
                <li key={t.slug}><Link href={`/tratamentos/${t.slug}`}>{t.short}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Contato</h4>
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
                {site.rating.toFixed(1).replace(".", ",")} · {site.reviewCount} avaliações no Google
              </span>
            </a>
          </div>
        </div>
        <div className="fbottom">
          <span>© {new Date().getFullYear()} {site.doctor} · Todos os direitos reservados</span>
          <span>
            <Link href="/politica-de-privacidade">Política de Privacidade</Link> ·{" "}
            <Link href="/politica-de-cookies">Cookies</Link> ·{" "}
            <Link href="/termos-de-uso">Termos de Uso</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
