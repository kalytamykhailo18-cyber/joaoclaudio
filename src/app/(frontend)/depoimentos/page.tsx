import type { Metadata } from "next";
import { site } from "@/content/site";
import { getPages, getUI } from "@/lib/content";
import Breadcrumb from "@/components/Breadcrumb";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";
import InlineEdit from "@/components/inline/InlineEdit";
import { BreadcrumbSchema } from "@/components/Schema";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getPages();
  return {
    title: seo.depoimentosTitle,
    description: seo.depoimentosDescription,
    alternates: { canonical: "/depoimentos" },
  };
}

export default async function DepoimentosPage() {
  const rating = site.rating.toFixed(1).replace(".", ",");
  const [{ depoimentos: h, seo }, ui] = await Promise.all([getPages(), getUI()]);
  const rl = ui.reviews;
  return (
    <>
      <InlineEdit
        globalSlug="pages"
        title="Editar: Depoimentos (topo)"
        fields={[
          { name: "depoimentos.eyebrow", label: "Rótulo", type: "text", value: h.eyebrow },
          { name: "depoimentos.h1", label: "Título (H1)", type: "text", value: h.h1 },
          { name: "depoimentos.lead", label: "Parágrafo de abertura", type: "textarea", value: h.lead },
          { name: "depoimentos.note", label: "Parágrafo explicativo", type: "textarea", value: h.note },
          { name: "depoimentos.button", label: "Botão (avaliações)", type: "text", value: h.button },
          { name: "seo.depoimentosTitle", label: "SEO — Meta title (Google)", type: "text", value: seo.depoimentosTitle },
          { name: "seo.depoimentosDescription", label: "SEO — Meta description (Google)", type: "textarea", value: seo.depoimentosDescription },
        ]}
      >
        <section className="page-hero">
          <div className="wrap">
            <Reveal as="div" index={0}>
              <Breadcrumb items={[{ name: "Início", url: "/" }, { name: "Depoimentos" }]} />
            </Reveal>
            <Reveal as="span" className="eyebrow" index={1}>{h.eyebrow}</Reveal>
            <Reveal as="h1" index={2}>{h.h1}</Reveal>
            <Reveal as="p" index={3}>{h.lead}</Reveal>
          </div>
        </section>
      </InlineEdit>

      <section className="reviews">
        <div className="wrap">
          <Reveal as="div" className="reviews-badge" index={0}>
            <div className="reviews-score">
              <span className="num">{rating}</span>
              <span className="stars" aria-label={`${rating} de 5 estrelas`}>★★★★★</span>
            </div>
            <div className="reviews-meta">
              <span className="gline">
                <strong>{site.reviewCount}</strong>&nbsp;{rl.avaliacoesGoogle}
              </span>
              <span className="verified">{rl.perfilVerificado} · {site.clinicName}</span>
            </div>
          </Reveal>

          <Reveal as="p" index={1} style={{ maxWidth: 640, margin: "34px auto 0", color: "var(--ink)" }}>
            {h.note}
          </Reveal>

          <Reveal as="div" index={2}>
            <a
              className="btn btn-outline-l"
              href={site.googleReviewsUrl}
              target="_blank"
              rel="noopener"
              style={{ marginTop: 28 }}
            >
              {h.button}
            </a>
          </Reveal>
        </div>
      </section>

      <CtaBand />
      <BreadcrumbSchema items={[{ name: "Início", url: "/" }, { name: "Depoimentos", url: "/depoimentos" }]} />
    </>
  );
}
