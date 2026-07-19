import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getRegion,
  getCondition,
  getTreatment,
  getConditionParams,
  getUI,
} from "@/lib/content";
import Breadcrumb from "@/components/Breadcrumb";
import CtaBand from "@/components/CtaBand";
import FaqInline from "@/components/FaqInline";
import Reveal from "@/components/Reveal";
import InlineEdit from "@/components/inline/InlineEdit";
import { BreadcrumbSchema, MedicalConditionSchema, FaqSchema } from "@/components/Schema";

export const dynamicParams = true; // páginas novas no CMS renderizam sem rebuild
export const revalidate = 60; // ISR: edições no /admin aparecem em ~60s
export function generateStaticParams() {
  return getConditionParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ region: string; condition: string }>;
}): Promise<Metadata> {
  const { region, condition } = await params;
  const c = await getCondition(region, condition);
  if (!c) return {};
  return {
    title: c.title,
    description: c.description,
    alternates: { canonical: `/${region}/${condition}` },
  };
}

export default async function ConditionPage({
  params,
}: {
  params: Promise<{ region: string; condition: string }>;
}) {
  const { region: regionSlug, condition: conditionSlug } = await params;
  const region = await getRegion(regionSlug);
  const c = await getCondition(regionSlug, conditionSlug);
  if (!region || !c) notFound();
  const ui = await getUI();
  const cp = ui.conditionPage;
  const ch = ui.chips;

  const siblings = (
    await Promise.all((c.siblings ?? []).map((s) => getCondition(region.slug, s)))
  ).filter(Boolean);
  const relTreatments = (
    await Promise.all((c.treatments ?? []).map((t) => getTreatment(t)))
  ).filter(Boolean);

  // Texto exibido = campo do CMS ou, se vazio, um padrão próprio (não repete o hero).
  // O editor recebe exatamente esse texto, para que a caixa reflita o que está na página.
  const whatIs =
    c.whatIs ||
    "O diagnóstico preciso é o primeiro passo: define a causa da dor e orienta o tratamento mais indicado para o seu caso, sempre priorizando as opções sem cirurgia.";
  const howTreat =
    c.howTreat ||
    "A conduta combina avaliação clínica, análise de imagem e, quando indicado, procedimentos guiados por ultrassom aplicados com precisão no ponto da dor.";

  return (
    <>
      <InlineEdit
        collection="conditions"
        id={c.id}
        title={`Editar: ${c.name}`}
        fields={[
          { name: "name", label: "Nome", type: "text", value: c.name },
          { name: "h1", label: "Título (H1)", type: "text", value: c.h1 },
          { name: "intro", label: "Introdução", type: "textarea", value: c.intro },
          { name: "seo.title", label: "Meta title (SEO)", type: "text", value: c.title },
          { name: "seo.description", label: "Meta description (SEO)", type: "textarea", value: c.description },
        ]}
      >
        <section className="page-hero">
          <div className="wrap">
            <Reveal as="div" index={0}>
              <Breadcrumb
                items={[
                  { name: "Início", url: "/" },
                  { name: region.name, url: `/${region.slug}` },
                  { name: c.name },
                ]}
              />
            </Reveal>
            <Reveal as="span" className="eyebrow" index={1}>{region.name}</Reveal>
            <Reveal as="h1" index={2}>{c.h1}</Reveal>
            <Reveal as="p" index={3}>{c.intro}</Reveal>
          </div>
        </section>
      </InlineEdit>

      <section>
        <div className="wrap prose">
          <InlineEdit
            collection="conditions"
            id={c.id}
            title={`Editar conteúdo: ${c.name}`}
            fields={[
              { name: "whatIs", label: "Parágrafo — O que é", type: "textarea", value: whatIs },
              { name: "howTreat", label: "Parágrafo — Como o médico trata", type: "textarea", value: howTreat },
            ]}
          >
            <div>
              <Reveal as="h2" index={0}>{cp.oQue} {c.name.toLowerCase()}</Reveal>
              <Reveal as="p" index={1}>{whatIs}</Reveal>

              <Reveal as="h2" index={3}>{cp.comoTrata}</Reveal>
              <Reveal as="p" index={4}>{howTreat}</Reveal>
            </div>
          </InlineEdit>

          {relTreatments.length > 0 && (
            <>
              <Reveal as="h3" index={0}>{cp.tratamentosIndicados}</Reveal>
              <Reveal as="div" className="related" index={1}>
                {relTreatments.map((t) => (
                  <Link className="chip" href={`/tratamentos/${t!.slug}`} key={t!.slug}>
                    {t!.short} →
                  </Link>
                ))}
              </Reveal>
            </>
          )}

          <>
            <InlineEdit
              globalSlug="ui"
              title="Editar: Títulos das páginas de condição (aplicam-se a todas)"
              fields={[
                { name: "conditionPage.oQue", label: "Prefixo 'O que é'", type: "text", value: cp.oQue },
                { name: "conditionPage.comoTrata", label: "Título 'Como o médico trata'", type: "text", value: cp.comoTrata },
                { name: "conditionPage.tratamentosIndicados", label: "Título 'Tratamentos indicados'", type: "text", value: cp.tratamentosIndicados },
                { name: "conditionPage.perguntasFrequentes", label: "Título 'Perguntas frequentes'", type: "text", value: cp.perguntasFrequentes },
                { name: "conditionPage.condicoesRelacionadas", label: "Título 'Condições relacionadas'", type: "text", value: cp.condicoesRelacionadas },
              ]}
            >
              <Reveal as="h2" index={0}>{cp.perguntasFrequentes}</Reveal>
            </InlineEdit>
            <FaqInline items={c.faq ?? []} target={{ collection: "conditions", id: c.id, field: "faq" }} />
          </>

          {siblings.length > 0 && (
            <>
              <Reveal as="h3" index={0}>{cp.condicoesRelacionadas}</Reveal>
              <Reveal as="div" className="related" index={1}>
                {siblings.map((s) => (
                  <Link className="chip" href={`/${region.slug}/${s!.slug}`} key={s!.slug}>
                    {s!.name} →
                  </Link>
                ))}
                <Link className="chip" href={`/${region.slug}`}>
                  {ch.ver} {region.name} →
                </Link>
              </Reveal>
            </>
          )}
        </div>
      </section>

      <CtaBand />

      <BreadcrumbSchema
        items={[
          { name: "Início", url: "/" },
          { name: region.name, url: `/${region.slug}` },
          { name: c.name, url: `/${region.slug}/${c.slug}` },
        ]}
      />
      <MedicalConditionSchema name={c.name} description={c.description} />
      {c.faq && c.faq.length > 0 && <FaqSchema faq={c.faq} />}
    </>
  );
}
