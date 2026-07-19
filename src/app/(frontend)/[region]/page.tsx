import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getRegion, getRegionParams, getPages } from "@/lib/content";
import Breadcrumb from "@/components/Breadcrumb";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";
import InlineEdit, { InlinePencil, InlineAdd } from "@/components/inline/InlineEdit";
import { BreadcrumbSchema, MedicalSpecialtySchema } from "@/components/Schema";

export const dynamicParams = true; // páginas novas no CMS renderizam sem rebuild
export const revalidate = 60; // ISR: edições no /admin aparecem em ~60s
export function generateStaticParams() {
  return getRegionParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ region: string }>;
}): Promise<Metadata> {
  const { region } = await params;
  const r = await getRegion(region);
  if (!r) return {};
  return {
    title: r.title,
    description: r.description,
    alternates: { canonical: `/${r.slug}` },
  };
}

export default async function RegionPage({ params }: { params: Promise<{ region: string }> }) {
  const { region } = await params;
  const [r, pages] = await Promise.all([getRegion(region), getPages()]);
  if (!r) notFound();
  const lbl = pages.regionPage;

  return (
    <>
      <InlineEdit
        collection="regions"
        id={r.id}
        title={`Editar: ${r.name}`}
        fields={[
          { name: "name", label: "Nome", type: "text", value: r.name },
          { name: "h1", label: "Título (H1)", type: "text", value: r.h1 },
          { name: "intro", label: "Introdução", type: "textarea", value: r.intro },
          { name: "seo.title", label: "Meta title (SEO)", type: "text", value: r.title },
          { name: "seo.description", label: "Meta description (SEO)", type: "textarea", value: r.description },
        ]}
      >
        <section className="page-hero">
          <div className="wrap">
            <Reveal as="div" index={0}>
              <Breadcrumb items={[{ name: "Início", url: "/" }, { name: r.name }]} />
            </Reveal>
            <InlineEdit
              globalSlug="pages"
              title="Editar: Rótulo do hero (todas as páginas de região)"
              fields={[{ name: "regionPage.careEyebrow", label: "Rótulo do hero", type: "text", value: lbl.careEyebrow }]}
            >
              <Reveal as="span" className="eyebrow" index={1}>{lbl.careEyebrow}</Reveal>
            </InlineEdit>
            <Reveal as="h1" index={2}>{r.h1}</Reveal>
            <Reveal as="p" index={3}>{r.intro}</Reveal>
          </div>
        </section>
      </InlineEdit>

      <section>
        <div className="wrap">
          <InlineEdit
            globalSlug="pages"
            title="Editar: Rótulos das condições"
            fields={[
              { name: "regionPage.condsEyebrow", label: "Rótulo das condições", type: "text", value: lbl.condsEyebrow },
              { name: "regionPage.condsHeadingPrefix", label: "Título das condições (prefixo)", type: "text", value: lbl.condsHeadingPrefix },
              { name: "regionPage.cardCta", label: "Texto do link do card", type: "text", value: lbl.cardCta },
            ]}
          >
            <div className="sec-head">
              <Reveal as="span" className="eyebrow" index={0}>{lbl.condsEyebrow}</Reveal>
              <Reveal as="h2" index={1}>{lbl.condsHeadingPrefix} {r.name.toLowerCase()}.</Reveal>
            </div>
          </InlineEdit>
          <div className="cards">
            {r.conditions.map((c, i) => (
              <Reveal as={Link} className="card" href={`/${r.slug}/${c.slug}`} key={c.slug} index={i}>
                <div className="num">{String(i + 1).padStart(2, "0")}</div>
                <h3>{c.name}</h3>
                <p>{c.intro}</p>
                <span className="arrow-link">{lbl.cardCta}</span>
                <InlinePencil
                  collection="conditions"
                  id={c.id}
                  canDelete
                  title={`Editar: ${c.name}`}
                  fields={[
                    { name: "name", label: "Nome", type: "text", value: c.name },
                    { name: "h1", label: "H1 (página da condição)", type: "text", value: c.h1 },
                    { name: "intro", label: "Descrição / introdução", type: "textarea", value: c.intro },
                  ]}
                />
              </Reveal>
            ))}
            <InlineAdd
              collection="conditions"
              preset={{ region: r.id }}
              label="Adicionar condição"
              title={`Nova condição em ${r.name}`}
              fields={[
                { name: "name", label: "Nome", type: "text", value: "" },
                { name: "h1", label: "H1 (página da condição)", type: "text", value: "" },
                { name: "intro", label: "Descrição / introdução", type: "textarea", value: "" },
                { name: "slug", label: "Slug (URL — deixe vazio para gerar do nome)", type: "text", value: "" },
              ]}
            />
          </div>
        </div>
      </section>

      <CtaBand />

      <BreadcrumbSchema items={[{ name: "Início", url: "/" }, { name: r.name, url: `/${r.slug}` }]} />
      <MedicalSpecialtySchema name={r.name} description={r.description} />
    </>
  );
}
