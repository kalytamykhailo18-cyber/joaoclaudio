import Link from "next/link";
import type { Metadata } from "next";
import { getRegions, getTreatments, getPages, getUI } from "@/lib/content";
import Breadcrumb from "@/components/Breadcrumb";
import CtaBand from "@/components/CtaBand";
import FaqInline from "@/components/FaqInline";
import Reveal from "@/components/Reveal";
import InlineEdit, { InlinePencil, InlineAdd } from "@/components/inline/InlineEdit";
import { BreadcrumbSchema, MedicalSpecialtySchema, FaqSchema } from "@/components/Schema";

export const metadata: Metadata = {
  title: "Tratamento para Dor Crônica em Goiânia",
  description:
    "Dor crônica que não passa? Diagnóstico preciso e tratamento especializado em Goiânia para coluna, joelho, ombro e quadril, com abordagem sem cirurgia como 1ª opção.",
  alternates: { canonical: "/dor-cronica" },
};

export const revalidate = 60; // ISR: cards refletem o CMS

export default async function DorCronicaPage() {
  const [regions, treatments, pages, ui] = await Promise.all([
    getRegions(),
    getTreatments(),
    getPages(),
    getUI(),
  ]);
  const h = pages.dorCronica;
  const faq = pages.dorCronicaFaq;
  return (
    <>
      <InlineEdit
        globalSlug="pages"
        title="Editar: Dor crônica (topo)"
        fields={[
          { name: "dorCronica.eyebrow", label: "Rótulo", type: "text", value: h.eyebrow },
          { name: "dorCronica.h1", label: "Título (H1)", type: "text", value: h.h1 },
          { name: "dorCronica.lead", label: "Parágrafo de abertura", type: "textarea", value: h.lead },
        ]}
      >
        <section className="page-hero">
          <div className="wrap">
            <Reveal as="div" index={0}>
              <Breadcrumb items={[{ name: "Início", url: "/" }, { name: "Dor crônica" }]} />
            </Reveal>
            <Reveal as="span" className="eyebrow" index={1}>{h.eyebrow}</Reveal>
            <Reveal as="h1" index={2}>{h.h1}</Reveal>
            <Reveal as="p" index={3}>{h.lead}</Reveal>
          </div>
        </section>
      </InlineEdit>

      <InlineEdit
        globalSlug="pages"
        title="Editar: Dor crônica (introdução)"
        fields={[
          { name: "dorCronica.introH2", label: "Título", type: "text", value: h.introH2 },
          { name: "dorCronica.introP1", label: "Parágrafo 1", type: "textarea", value: h.introP1 },
          { name: "dorCronica.introP2", label: "Parágrafo 2", type: "textarea", value: h.introP2 },
        ]}
      >
        <section>
          <div className="wrap prose">
            <Reveal as="h2" index={0}>{h.introH2}</Reveal>
            <Reveal as="p" index={1}>{h.introP1}</Reveal>
            <Reveal as="p" index={2}>{h.introP2}</Reveal>
          </div>
        </section>
      </InlineEdit>

      <section>
        <div className="wrap">
          <InlineEdit
            globalSlug="pages"
            title="Editar: Dor crônica (áreas)"
            fields={[
              { name: "dorCronica.areasEyebrow", label: "Rótulo", type: "text", value: h.areasEyebrow },
              { name: "dorCronica.areasHeading", label: "Título", type: "text", value: h.areasHeading },
            ]}
          >
            <div className="sec-head">
              <Reveal as="span" className="eyebrow" index={0}>{h.areasEyebrow}</Reveal>
              <Reveal as="h2" index={1}>{h.areasHeading}</Reveal>
            </div>
          </InlineEdit>
          <div className="cards">
            {regions.map((r, i) => (
              <Reveal as={Link} className="card" href={`/${r.slug}`} key={r.slug} index={i}>
                <div className="num">{String(i + 1).padStart(2, "0")}</div>
                <h3>{r.name}</h3>
                <p>{r.conditions.map((c) => c.name).join(", ")}.</p>
                <span className="arrow-link">{ui.chips.verCondicoes}</span>
                <InlinePencil
                  collection="regions"
                  id={r.id}
                  canDelete
                  title={`Editar: ${r.name}`}
                  fields={[
                    { name: "name", label: "Nome da área", type: "text", value: r.name },
                    { name: "h1", label: "H1 (página da área)", type: "text", value: r.h1 },
                    { name: "intro", label: "Introdução (página da área)", type: "textarea", value: r.intro },
                  ]}
                />
              </Reveal>
            ))}
            <Reveal as={Link} className="card" href="/tratamentos" style={{ background: "var(--navy-deep)" }} index={regions.length}>
              <div className="num" style={{ color: "var(--gold-lite)" }}>→</div>
              <h3 style={{ color: "#fff" }}>{h.promoTitle}</h3>
              <p style={{ color: "#bdbdbd" }}>
                {treatments.map((t) => t.short).join(", ")}.
              </p>
              <span className="arrow-link light">{ui.chips.explorar}</span>
            </Reveal>
            <InlineAdd
              collection="regions"
              label="Adicionar área"
              title="Nova área do corpo"
              fields={[
                { name: "name", label: "Nome da área", type: "text", value: "" },
                { name: "h1", label: "H1 (página da área)", type: "text", value: "" },
                { name: "intro", label: "Introdução", type: "textarea", value: "" },
                { name: "slug", label: "Slug (URL — deixe vazio para gerar do nome)", type: "text", value: "" },
              ]}
            />
          </div>
        </div>
      </section>

      <section className="bg-off">
        <div className="wrap prose">
          <Reveal as="h2" index={0}>{h.faqHeading}</Reveal>
          <FaqInline items={faq} target={{ globalSlug: "pages", field: "dorCronicaFaq" }} />
        </div>
      </section>

      <CtaBand />

      <BreadcrumbSchema items={[{ name: "Início", url: "/" }, { name: "Dor crônica", url: "/dor-cronica" }]} />
      <MedicalSpecialtySchema
        name="Tratamento de Dor Crônica"
        description="Diagnóstico e tratamento de dor crônica ortopédica em Goiânia — coluna, joelho, ombro e quadril."
      />
      <FaqSchema faq={faq} />
    </>
  );
}
