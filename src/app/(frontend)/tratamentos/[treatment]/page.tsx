import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getTreatment,
  getCondition,
  getRegion,
  allTreatmentParams,
  applications,
} from "@/content/clusters";
import Breadcrumb from "@/components/Breadcrumb";
import CtaBand from "@/components/CtaBand";
import { BreadcrumbSchema, MedicalTherapySchema } from "@/components/Schema";

export const dynamicParams = false;
export function generateStaticParams() {
  return allTreatmentParams;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ treatment: string }>;
}): Promise<Metadata> {
  const { treatment } = await params;
  const t = getTreatment(treatment);
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
  const t = getTreatment(treatment);
  if (!t) notFound();

  // netos deste tratamento (tratamento × condição)
  const apps = applications
    .filter((a) => a.treatment === t.slug)
    .map((a) => ({ region: getRegion(a.region), condition: getCondition(a.region, a.condition) }))
    .filter((a) => a.region && a.condition);

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <Breadcrumb
            items={[
              { name: "Início", url: "/" },
              { name: "Tratamentos", url: "/tratamentos" },
              { name: t.name },
            ]}
          />
          <span className="eyebrow">Tratamento</span>
          <h1>{t.h1}</h1>
          <p>{t.intro}</p>
        </div>
      </section>

      <section>
        <div className="wrap prose">
          <h2>Como funciona</h2>
          <p>{t.intro}</p>
          <p style={{ color: "#8a6a2f", fontStyle: "italic" }}>
            [Espaço reservado para o conteúdo clínico — indicações, como é o procedimento, resultados
            esperados e recuperação — preenchido a partir do briefing de SEO.]
          </p>

          {apps.length > 0 && (
            <>
              <h2>Aplicações por condição</h2>
              <div className="related">
                {apps.map((a) => (
                  <Link
                    className="chip"
                    href={`/tratamentos/${t.slug}/${a.condition!.slug}`}
                    key={a.condition!.slug}
                  >
                    {t.short} para {a.condition!.name.toLowerCase()} →
                  </Link>
                ))}
              </div>
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
