import type { Metadata } from "next";
import { site } from "@/content/site";
import Breadcrumb from "@/components/Breadcrumb";
import CtaBand from "@/components/CtaBand";
import { BreadcrumbSchema } from "@/components/Schema";

export const metadata: Metadata = {
  title: `Sobre o ${site.doctor}`,
  description:
    "Conheça o Dr. João Cláudio Miranda — ortopedista especializado em dor crônica em Goiânia. Titular SBOT, perito TRF1, membro IASP, professor e coordenador.",
  alternates: { canonical: "/sobre" },
};

export default function SobrePage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <Breadcrumb items={[{ name: "Início", url: "/" }, { name: "O médico" }]} />
          <span className="eyebrow">O médico</span>
          <h1>Autoridade médica com escuta de gente</h1>
          <p>
            O {site.doctor} dedica sua prática ao tratamento da dor crônica e das doenças
            ortopédicas, unindo diagnóstico preciso, técnicas modernas e uma relação próxima com cada
            paciente.
          </p>
        </div>
      </section>

      <section>
        <div className="wrap prose">
          <h2>Formação e credenciais</h2>
          <ul style={{ listStyle: "none", display: "grid", gap: 12, marginTop: 8 }}>
            <li>✓ Titular da Sociedade Brasileira de Ortopedia e Traumatologia (SBOT)</li>
            <li>✓ Perito judicial junto ao TRF1</li>
            <li>✓ Membro da IASP — associação internacional para o estudo da dor</li>
            <li>✓ Professor e coordenador de serviços de ortopedia</li>
          </ul>
          <p style={{ color: "#8a6a2f", fontStyle: "italic", marginTop: 24 }}>
            [Biografia completa e foto profissional — fornecidas por você.]
          </p>
        </div>
      </section>

      <CtaBand />
      <BreadcrumbSchema items={[{ name: "Início", url: "/" }, { name: "O médico", url: "/sobre" }]} />
    </>
  );
}
