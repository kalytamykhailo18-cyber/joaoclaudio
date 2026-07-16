import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getRegion, allRegionParams } from "@/content/clusters";
import { site } from "@/content/site";
import Breadcrumb from "@/components/Breadcrumb";
import CtaBand from "@/components/CtaBand";
import { BreadcrumbSchema, MedicalConditionSchema } from "@/components/Schema";

export const dynamicParams = false;
export function generateStaticParams() {
  return allRegionParams;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ region: string }>;
}): Promise<Metadata> {
  const { region } = await params;
  const r = getRegion(region);
  if (!r) return {};
  return {
    title: r.title,
    description: r.description,
    alternates: { canonical: `/${r.slug}` },
  };
}

export default async function RegionPage({ params }: { params: Promise<{ region: string }> }) {
  const { region } = await params;
  const r = getRegion(region);
  if (!r) notFound();

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <Breadcrumb items={[{ name: "Início", url: "/" }, { name: r.name }]} />
          <span className="eyebrow">Área de cuidado</span>
          <h1>{r.h1}</h1>
          <p>{r.intro}</p>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Condições que tratamos</span>
            <h2>Encontre a sua condição em {r.name.toLowerCase()}.</h2>
          </div>
          <div className="cards">
            {r.conditions.map((c, i) => (
              <Link className="card" href={`/${r.slug}/${c.slug}`} key={c.slug}>
                <div className="num">{String(i + 1).padStart(2, "0")}</div>
                <h3>{c.name}</h3>
                <p>{c.intro}</p>
                <span className="arrow-link">Ver tratamento →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />

      <BreadcrumbSchema items={[{ name: "Início", url: "/" }, { name: r.name, url: `/${r.slug}` }]} />
      <MedicalConditionSchema name={r.name} description={r.description} />
    </>
  );
}
