import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getTreatment,
  getCondition,
  getRegion,
  applications,
  getSiteSettings,
  getPages,
  getUI,
} from "@/lib/content";
import { site } from "@/content/site";
import Breadcrumb from "@/components/Breadcrumb";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";
import InlineEdit from "@/components/inline/InlineEdit";
import { BreadcrumbSchema, MedicalTherapySchema } from "@/components/Schema";

export const dynamicParams = true; // combos válidos renderizam on-demand; inválidos → 404 custom
export const revalidate = 60; // ISR: edições no CMS aparecem em ~60s
export function generateStaticParams() {
  return applications.map((a) => ({ treatment: a.treatment, condition: a.condition }));
}

// Resolve a região que contém a condição do neto (a condição pode existir em mais de uma região;
// usamos a região definida na aplicação para evitar ambiguidade).
async function resolve(treatmentSlug: string, conditionSlug: string) {
  const app = applications.find(
    (a) => a.treatment === treatmentSlug && a.condition === conditionSlug,
  );
  if (!app) return null;
  const treatment = await getTreatment(treatmentSlug);
  const region = await getRegion(app.region);
  const condition = await getCondition(app.region, conditionSlug);
  if (!treatment || !region || !condition) return null;
  return { treatment, region, condition };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ treatment: string; condition: string }>;
}): Promise<Metadata> {
  const { treatment, condition } = await params;
  const r = await resolve(treatment, condition);
  if (!r) return {};
  const title = `${r.treatment.short} para ${r.condition.name} em ${site.city}`;
  return {
    title,
    description: `${r.treatment.name} aplicada a ${r.condition.name.toLowerCase()} em ${site.city}. ${r.treatment.intro} Agende sua avaliação.`,
    alternates: { canonical: `/tratamentos/${treatment}/${condition}` },
  };
}

export default async function ApplicationPage({
  params,
}: {
  params: Promise<{ treatment: string; condition: string }>;
}) {
  const { treatment: treatmentSlug, condition: conditionSlug } = await params;
  const r = await resolve(treatmentSlug, conditionSlug);
  if (!r) notFound();
  const { treatment, region, condition } = r;
  const h1 = `${treatment.short} para ${condition.name}`;
  const [site, pages, ui] = await Promise.all([getSiteSettings(), getPages(), getUI()]);
  const lbl = pages.txPage;
  const ch = ui.chips;

  return (
    <>
      {/* Rótulo e conector do hero são rótulos compartilhados de TODAS as páginas
          tratamento × condição. A descrição (do tratamento) e o "O que é" (da
          condição) são editados nas próprias páginas — mesma fonte de conteúdo. */}
      <InlineEdit
        globalSlug="pages"
        title="Editar: Rótulo do hero (todas as páginas tratamento × condição)"
        fields={[
          { name: "txPage.eyebrow", label: "Rótulo do hero", type: "text", value: lbl.eyebrow },
        ]}
      >
        <section className="page-hero">
          <div className="wrap">
            <Reveal as="div" index={0}>
              <Breadcrumb
                items={[
                  { name: "Início", url: "/" },
                  { name: "Tratamentos", url: "/tratamentos" },
                  { name: treatment.short, url: `/tratamentos/${treatment.slug}` },
                  { name: condition.name },
                ]}
              />
            </Reveal>
            <Reveal as="span" className="eyebrow" index={1}>{lbl.eyebrow}</Reveal>
            <Reveal as="h1" index={2}>{h1}</Reveal>
            <Reveal as="p" index={3}>
              {treatment.intro} Indicado para {condition.name.toLowerCase()}, {lbl.heroConnector} {site.city}.
            </Reveal>
          </div>
        </section>
      </InlineEdit>

      <section>
        <div className="wrap prose">
          <Reveal as="h2" index={0}>Por que {treatment.short} para {condition.name.toLowerCase()}</Reveal>
          <Reveal as="p" index={1}>{condition.intro}</Reveal>
          <InlineEdit
            globalSlug="pages"
            title="Editar: Parágrafo de conteúdo (todas as páginas tratamento × condição)"
            fields={[
              { name: "txPage.prosePlaceholder", label: "Parágrafo de conteúdo", type: "textarea", value: lbl.prosePlaceholder },
            ]}
          >
            <Reveal as="p" index={2}>{lbl.prosePlaceholder}</Reveal>
          </InlineEdit>
          <Reveal as="div" className="related" index={3}>
            <Link className="chip" href={`/${region.slug}/${condition.slug}`}>
              {ch.sobre} {condition.name.toLowerCase()} →
            </Link>
            <Link className="chip" href={`/tratamentos/${treatment.slug}`}>
              {ch.sobre} {treatment.short} →
            </Link>
          </Reveal>
        </div>
      </section>

      <CtaBand />
      <BreadcrumbSchema
        items={[
          { name: "Início", url: "/" },
          { name: "Tratamentos", url: "/tratamentos" },
          { name: treatment.short, url: `/tratamentos/${treatment.slug}` },
          { name: condition.name, url: `/tratamentos/${treatment.slug}/${condition.slug}` },
        ]}
      />
      <MedicalTherapySchema name={h1} description={treatment.description} />
    </>
  );
}
