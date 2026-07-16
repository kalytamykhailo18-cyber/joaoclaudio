import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getRegion,
  getCondition,
  getTreatment,
  allConditionParams,
} from "@/content/clusters";
import Breadcrumb from "@/components/Breadcrumb";
import CtaBand from "@/components/CtaBand";
import { BreadcrumbSchema, MedicalConditionSchema, FaqSchema } from "@/components/Schema";

export const dynamicParams = false;
export function generateStaticParams() {
  return allConditionParams;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ region: string; condition: string }>;
}): Promise<Metadata> {
  const { region, condition } = await params;
  const c = getCondition(region, condition);
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
  const region = getRegion(regionSlug);
  const c = getCondition(regionSlug, conditionSlug);
  if (!region || !c) notFound();

  const siblings = (c.siblings ?? [])
    .map((s) => getCondition(region.slug, s))
    .filter(Boolean);
  const relTreatments = (c.treatments ?? []).map((t) => getTreatment(t)).filter(Boolean);

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <Breadcrumb
            items={[
              { name: "Início", url: "/" },
              { name: region.name, url: `/${region.slug}` },
              { name: c.name },
            ]}
          />
          <span className="eyebrow">{region.name}</span>
          <h1>{c.h1}</h1>
          <p>{c.intro}</p>
        </div>
      </section>

      <section>
        <div className="wrap prose">
          <h2>O que é {c.name.toLowerCase()}</h2>
          <p>
            {c.intro} O diagnóstico preciso é o primeiro passo: define a causa da dor e orienta o
            tratamento mais indicado para o seu caso — sempre priorizando as opções sem cirurgia.
          </p>
          <p style={{ color: "#8a6a2f", fontStyle: "italic" }}>
            [Espaço reservado para o conteúdo clínico — preenchido a partir do briefing de SEO por
            você ou pelo redator médico.]
          </p>

          <h2>Como o {region ? "Dr. João Cláudio" : ""} trata</h2>
          <p>
            A conduta combina avaliação clínica, análise de imagem e, quando indicado, procedimentos
            guiados por ultrassom aplicados com precisão no ponto da dor.
          </p>

          {relTreatments.length > 0 && (
            <>
              <h3>Tratamentos indicados</h3>
              <div className="related">
                {relTreatments.map((t) => (
                  <Link className="chip" href={`/tratamentos/${t!.slug}`} key={t!.slug}>
                    {t!.short} →
                  </Link>
                ))}
              </div>
            </>
          )}

          {c.faq && c.faq.length > 0 && (
            <>
              <h2>Perguntas frequentes</h2>
              <div className="faq">
                {c.faq.map((f, i) => (
                  <details key={i} open={i === 0}>
                    <summary>{f.q}</summary>
                    <p>{f.a}</p>
                  </details>
                ))}
              </div>
            </>
          )}

          {siblings.length > 0 && (
            <>
              <h3>Condições relacionadas</h3>
              <div className="related">
                {siblings.map((s) => (
                  <Link className="chip" href={`/${region.slug}/${s!.slug}`} key={s!.slug}>
                    {s!.name} →
                  </Link>
                ))}
                <Link className="chip" href={`/${region.slug}`}>
                  Ver {region.name} →
                </Link>
              </div>
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
