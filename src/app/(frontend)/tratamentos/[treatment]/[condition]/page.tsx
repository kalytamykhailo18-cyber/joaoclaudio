import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getTreatment,
  getCondition,
  getRegion,
  applications,
} from "@/content/clusters";
import { site } from "@/content/site";
import Breadcrumb from "@/components/Breadcrumb";
import CtaBand from "@/components/CtaBand";
import { BreadcrumbSchema, MedicalTherapySchema } from "@/components/Schema";

export const dynamicParams = false;
export function generateStaticParams() {
  return applications.map((a) => ({ treatment: a.treatment, condition: a.condition }));
}

// Resolve a região que contém a condição do neto (a condição pode existir em mais de uma região;
// usamos a região definida na aplicação para evitar ambiguidade).
function resolve(treatmentSlug: string, conditionSlug: string) {
  const app = applications.find(
    (a) => a.treatment === treatmentSlug && a.condition === conditionSlug,
  );
  if (!app) return null;
  const treatment = getTreatment(treatmentSlug);
  const region = getRegion(app.region);
  const condition = getCondition(app.region, conditionSlug);
  if (!treatment || !region || !condition) return null;
  return { treatment, region, condition };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ treatment: string; condition: string }>;
}): Promise<Metadata> {
  const { treatment, condition } = await params;
  const r = resolve(treatment, condition);
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
  const r = resolve(treatmentSlug, conditionSlug);
  if (!r) notFound();
  const { treatment, region, condition } = r;
  const h1 = `${treatment.short} para ${condition.name}`;

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <Breadcrumb
            items={[
              { name: "Início", url: "/" },
              { name: "Tratamentos", url: "/tratamentos" },
              { name: treatment.short, url: `/tratamentos/${treatment.slug}` },
              { name: condition.name },
            ]}
          />
          <span className="eyebrow">Tratamento aplicado</span>
          <h1>{h1}</h1>
          <p>
            {treatment.intro} Indicado para {condition.name.toLowerCase()}, com procedimento guiado e
            recuperação ambulatorial em {site.city}.
          </p>
        </div>
      </section>

      <section>
        <div className="wrap prose">
          <h2>Por que {treatment.short.toLowerCase()} para {condition.name.toLowerCase()}</h2>
          <p>
            {condition.intro} {treatment.intro}
          </p>
          <p style={{ color: "#8a6a2f", fontStyle: "italic" }}>
            [Página transacional — destino de campanha de Google Ads. Conteúdo clínico específico
            preenchido a partir do briefing de SEO.]
          </p>
          <div className="related">
            <Link className="chip" href={`/${region.slug}/${condition.slug}`}>
              Sobre {condition.name.toLowerCase()} →
            </Link>
            <Link className="chip" href={`/tratamentos/${treatment.slug}`}>
              Sobre {treatment.short.toLowerCase()} →
            </Link>
          </div>
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
