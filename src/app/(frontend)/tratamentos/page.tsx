import Link from "next/link";
import type { Metadata } from "next";
import { getTreatments, getPages, getUI } from "@/lib/content";
import Breadcrumb from "@/components/Breadcrumb";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";
import InlineEdit, { InlinePencil, InlineAdd } from "@/components/inline/InlineEdit";
import { BreadcrumbSchema } from "@/components/Schema";

export const revalidate = 60; // ISR: edições no /admin aparecem em ~60s

export const metadata: Metadata = {
  title: "Tratamentos de Dor Sem Cirurgia",
  description:
    "Tratamentos modernos de dor em Goiânia: medicina regenerativa, infiltração guiada por ultrassom, ondas de choque e viscossuplementação.",
  alternates: { canonical: "/tratamentos" },
};

export default async function TreatmentsIndex() {
  const [treatments, pages, ui] = await Promise.all([getTreatments(), getPages(), getUI()]);
  const h = pages.treatmentsIndex;
  const ch = ui.chips;
  return (
    <>
      <InlineEdit
        globalSlug="pages"
        title="Editar: Tratamentos (topo)"
        fields={[
          { name: "treatmentsIndex.eyebrow", label: "Rótulo", type: "text", value: h.eyebrow },
          { name: "treatmentsIndex.h1", label: "Título (H1)", type: "text", value: h.h1 },
          { name: "treatmentsIndex.p", label: "Descrição", type: "textarea", value: h.p },
        ]}
      >
        <section className="page-hero">
          <div className="wrap">
            <Reveal as="div" index={0}>
              <Breadcrumb items={[{ name: "Início", url: "/" }, { name: "Tratamentos" }]} />
            </Reveal>
            <Reveal as="span" className="eyebrow" index={1}>{h.eyebrow}</Reveal>
            <Reveal as="h1" index={2}>{h.h1}</Reveal>
            <Reveal as="p" index={3}>{h.p}</Reveal>
          </div>
        </section>
      </InlineEdit>

      <section>
        <div className="wrap">
          <div className="cards" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
            {treatments.map((t, i) => (
              <Reveal as={Link} className="card" href={`/tratamentos/${t.slug}`} key={t.slug} index={i}>
                <div className="num">{t.tag}</div>
                <h3>{t.name}</h3>
                <p>{t.intro}</p>
                <span className="arrow-link">{ch.saibaMais}</span>
                <InlinePencil
                  collection="treatments"
                  id={t.id}
                  canDelete
                  title={`Editar: ${t.name}`}
                  fields={[
                    { name: "name", label: "Nome", type: "text", value: t.name },
                    { name: "short", label: "Nome curto", type: "text", value: t.short },
                    { name: "tag", label: "Rótulo", type: "text", value: t.tag },
                    { name: "h1", label: "H1 (página do tratamento)", type: "text", value: t.h1 },
                    { name: "intro", label: "Descrição (card)", type: "textarea", value: t.intro },
                  ]}
                />
              </Reveal>
            ))}
            <InlineAdd
              collection="treatments"
              label="Adicionar tratamento"
              title="Novo tratamento"
              fields={[
                { name: "name", label: "Nome completo", type: "text", value: "" },
                { name: "short", label: "Nome curto", type: "text", value: "" },
                { name: "tag", label: "Rótulo (ex.: Regenerativa)", type: "text", value: "" },
                { name: "h1", label: "H1 (página do tratamento)", type: "text", value: "" },
                { name: "intro", label: "Descrição (card)", type: "textarea", value: "" },
                { name: "slug", label: "Slug (URL — deixe vazio para gerar do nome)", type: "text", value: "" },
              ]}
            />
          </div>
        </div>
      </section>

      <CtaBand />
      <BreadcrumbSchema items={[{ name: "Início", url: "/" }, { name: "Tratamentos", url: "/tratamentos" }]} />
    </>
  );
}
