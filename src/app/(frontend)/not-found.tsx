import Link from "next/link";
import { getRegions, getTreatments, getUI } from "@/lib/content";
import Reveal from "@/components/Reveal";
import SiteSearch, { type SearchItem } from "@/components/SiteSearch";

export default async function NotFound() {
  const [regions, treatments, ui] = await Promise.all([getRegions(), getTreatments(), getUI()]);
  const nf = ui.notFound;

  // Índice de páginas para a busca interna (recuperação do visitante):
  // regiões (pilares) + condições (filhas) + tratamentos + páginas-chave.
  const searchIndex: SearchItem[] = [
    ...regions.map((r) => ({ label: r.name, href: `/${r.slug}`, group: "Área" })),
    ...regions.flatMap((r) =>
      r.conditions.map((c) => ({ label: c.name, href: `/${r.slug}/${c.slug}`, group: r.name })),
    ),
    ...treatments.map((t) => ({ label: t.name, href: `/tratamentos/${t.slug}`, group: "Tratamento" })),
    { label: "Dor crônica", href: "/dor-cronica", group: "Área" },
    { label: "Sobre o médico", href: "/sobre", group: "Institucional" },
    { label: "Contato e localização", href: "/contato", group: "Institucional" },
    { label: "Agendar consulta", href: "/agendar", group: "Institucional" },
    { label: "Depoimentos", href: "/depoimentos", group: "Institucional" },
    { label: "Blog", href: "/blog", group: "Institucional" },
  ];

  return (
    <section className="page-hero" style={{ minHeight: "80vh", display: "grid", alignItems: "center" }}>
      <div className="wrap" style={{ textAlign: "center", maxWidth: 720, margin: "0 auto" }}>
        <Reveal as="span" className="eyebrow" index={0}>{nf.eyebrow}</Reveal>
        <Reveal as="h1" index={1} style={{ margin: "16px 0" }}>{nf.title}</Reveal>
        <Reveal as="p" index={2} style={{ margin: "0 auto 24px" }}>{nf.text}</Reveal>
        <Reveal as="div" index={2} style={{ maxWidth: 440, margin: "0 auto 30px" }}>
          <SiteSearch
            items={searchIndex}
            placeholder={nf.searchPlaceholder}
            emptyText={nf.searchEmpty}
          />
        </Reveal>
        <Reveal as="div" className="related" index={3} style={{ justifyContent: "center" }}>
          {regions.map((r) => (
            <Link className="chip" href={`/${r.slug}`} key={r.slug} style={{ color: "#fff", borderColor: "var(--line-d)" }}>
              {r.name} →
            </Link>
          ))}
          <Link className="chip" href="/tratamentos" style={{ color: "#fff", borderColor: "var(--line-d)" }}>
            {nf.tratamentos}
          </Link>
        </Reveal>
        <Reveal as="div" index={4} style={{ marginTop: 32 }}>
          <Link className="btn btn-gold" href="/">{nf.button}</Link>
        </Reveal>
      </div>
    </section>
  );
}
