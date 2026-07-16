import Link from "next/link";
import type { Metadata } from "next";
import { treatments } from "@/content/clusters";
import Breadcrumb from "@/components/Breadcrumb";
import CtaBand from "@/components/CtaBand";
import { BreadcrumbSchema } from "@/components/Schema";

export const metadata: Metadata = {
  title: "Tratamentos de Dor Sem Cirurgia",
  description:
    "Tratamentos modernos de dor em Goiânia: medicina regenerativa, infiltração guiada por ultrassom, ondas de choque e viscossuplementação.",
  alternates: { canonical: "/tratamentos" },
};

export default function TreatmentsIndex() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <Breadcrumb items={[{ name: "Início", url: "/" }, { name: "Tratamentos" }]} />
          <span className="eyebrow">Tratamentos</span>
          <h1>Tecnologia a serviço do alívio da dor</h1>
          <p>Recursos modernos que tratam a causa da dor e adiam — ou evitam — a cirurgia.</p>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="cards" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
            {treatments.map((t) => (
              <Link className="card" href={`/tratamentos/${t.slug}`} key={t.slug}>
                <div className="num">{t.tag}</div>
                <h3>{t.name}</h3>
                <p>{t.intro}</p>
                <span className="arrow-link">Saiba mais →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
      <BreadcrumbSchema items={[{ name: "Início", url: "/" }, { name: "Tratamentos", url: "/tratamentos" }]} />
    </>
  );
}
