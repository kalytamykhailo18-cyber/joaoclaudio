import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getTreatment,
  getCondition,
  getRegion,
  getTreatmentParams,
  getPages,
  applications,
} from "@/lib/content";
import Breadcrumb from "@/components/Breadcrumb";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";
import InlineEdit from "@/components/inline/InlineEdit";
import { BreadcrumbSchema, MedicalTherapySchema } from "@/components/Schema";

export const dynamicParams = true; // páginas novas no CMS renderizam sem rebuild
export const revalidate = 60; // ISR: edições no /admin aparecem em ~60s
export function generateStaticParams() {
  return getTreatmentParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ treatment: string }>;
}): Promise<Metadata> {
  const { treatment } = await params;
  const t = await getTreatment(treatment);
  if (!t) return {};
  return {
    title: t.title,
    description: t.description,
    alternates: { canonical: `/tratamentos/${t.slug}` },
  };
}

export default async function TreatmentPage({
  params,
}: {
  params: Promise<{ treatment: string }>;
}) {
  const { treatment } = await params;
  const [t, pages] = await Promise.all([getTreatment(treatment), getPages()]);
  if (!t) notFound();
  const lbl = pages.treatmentPage;
  // Texto exibido = campo do CMS ou, se vazio, um padrão próprio (não repete o hero).
  // O editor recebe exatamente esse texto, para que a caixa reflita o que está na página.
  const howWorks =
    t.howWorks ||
    "O procedimento é indicado após avaliação individual e realizado em ambiente ambulatorial, com técnica precisa e orientação de recuperação para cada paciente.";

  // netos deste tratamento (tratamento × condição)
  const apps = (
    await Promise.all(
      applications
        .filter((a) => a.treatment === t.slug)
        .map(async (a) => ({
          region: await getRegion(a.region),
          condition: await getCondition(a.region, a.condition),
        })),
    )
  ).filter((a) => a.region && a.condition);

  return (
    <>
      <InlineEdit
        collection="treatments"
        id={t.id}
        title={`Editar: ${t.name}`}
        fields={[
          { name: "name", label: "Nome", type: "text", value: t.name },
          { name: "short", label: "Nome curto", type: "text", value: t.short },
          { name: "h1", label: "Título (H1)", type: "text", value: t.h1 },
          { name: "intro", label: "Introdução", type: "textarea", value: t.intro },
          { name: "seo.title", label: "Meta title (SEO)", type: "text", value: t.title },
          { name: "seo.description", label: "Meta description (SEO)", type: "textarea", value: t.description },
        ]}
      >
        <section className="page-hero">
          <div className="wrap">
            <Reveal as="div" index={0}>
              <Breadcrumb
                items={[
                  { name: "Início", url: "/" },
                  { name: "Tratamentos", url: "/tratamentos" },
                  { name: t.name },
                ]}
              />
            </Reveal>
            <InlineEdit
              globalSlug="pages"
              title="Editar: Rótulo do hero (todas as páginas de tratamento)"
              fields={[{ name: "treatmentPage.eyebrow", label: "Rótulo do hero", type: "text", value: lbl.eyebrow }]}
            >
              <Reveal as="span" className="eyebrow" index={1}>{lbl.eyebrow}</Reveal>
            </InlineEdit>
            <Reveal as="h1" index={2}>{t.h1}</Reveal>
            <Reveal as="p" index={3}>{t.intro}</Reveal>
          </div>
        </section>
      </InlineEdit>

      <section>
        <div className="wrap prose">
          <InlineEdit
            globalSlug="pages"
            title="Editar: Título 'Como funciona' (todas as páginas de tratamento)"
            fields={[{ name: "treatmentPage.howHeading", label: "Título", type: "text", value: lbl.howHeading }]}
          >
            <Reveal as="h2" index={0}>{lbl.howHeading}</Reveal>
          </InlineEdit>
          <InlineEdit
            collection="treatments"
            id={t.id}
            title={`Editar conteúdo: ${t.name}`}
            fields={[
              { name: "howWorks", label: "Parágrafo — Como funciona", type: "textarea", value: howWorks },
            ]}
          >
            <Reveal as="p" index={1}>{howWorks}</Reveal>
          </InlineEdit>

          {apps.length > 0 && (
            <>
              <InlineEdit
                globalSlug="pages"
                title="Editar: Título 'Aplicações' (todas as páginas de tratamento)"
                fields={[{ name: "treatmentPage.appsHeading", label: "Título", type: "text", value: lbl.appsHeading }]}
              >
                <Reveal as="h2" index={0}>{lbl.appsHeading}</Reveal>
              </InlineEdit>
              <Reveal as="div" className="related" index={1}>
                {apps.map((a) => (
                  <Link
                    className="chip"
                    href={`/tratamentos/${t.slug}/${a.condition!.slug}`}
                    key={a.condition!.slug}
                  >
                    {t.short} para {a.condition!.name.toLowerCase()} →
                  </Link>
                ))}
              </Reveal>
            </>
          )}
        </div>
      </section>

      <CtaBand />
      <BreadcrumbSchema
        items={[
          { name: "Início", url: "/" },
          { name: "Tratamentos", url: "/tratamentos" },
          { name: t.name, url: `/tratamentos/${t.slug}` },
        ]}
      />
      <MedicalTherapySchema name={t.name} description={t.description} />
    </>
  );
}
