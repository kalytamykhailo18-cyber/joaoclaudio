import type { Metadata } from "next";
import { whatsappLink } from "@/content/site";
import { getSiteSettings, getPages, getUI } from "@/lib/content";
import Breadcrumb from "@/components/Breadcrumb";
import Reveal from "@/components/Reveal";
import InlineEdit, { InlineArrayItem, InlineArrayAdd } from "@/components/inline/InlineEdit";
import { BreadcrumbSchema } from "@/components/Schema";

export const metadata: Metadata = {
  title: "Agendar Consulta com Ortopedista em Goiânia",
  description:
    "Agende sua avaliação com o Dr. João Cláudio Miranda em Goiânia. Atendimento por WhatsApp e telefone, com horário que cabe na sua rotina.",
  alternates: { canonical: "/agendar" },
};

export const revalidate = 60;

export default async function AgendarPage() {
  const [site, pages, ui] = await Promise.all([getSiteSettings(), getPages(), getUI()]);
  const h = pages.agendar;
  const cl = ui.contact;
  const lead = h.lead.replace("com o médico", `com o ${site.doctor}`);
  const steps = pages.agendarSteps;
  return (
    <>
      <InlineEdit
        globalSlug="pages"
        title="Editar: Agendar (topo)"
        fields={[
          { name: "agendar.eyebrow", label: "Rótulo", type: "text", value: h.eyebrow },
          { name: "agendar.h1", label: "Título (H1)", type: "text", value: h.h1 },
          { name: "agendar.lead", label: "Parágrafo de abertura", type: "textarea", value: lead },
        ]}
      >
        <section className="page-hero">
          <div className="wrap">
            <Reveal as="div" index={0}>
              <Breadcrumb items={[{ name: "Início", url: "/" }, { name: "Agendar" }]} />
            </Reveal>
            <Reveal as="span" className="eyebrow" index={1}>{h.eyebrow}</Reveal>
            <Reveal as="h1" index={2}>{h.h1}</Reveal>
            <Reveal as="p" index={3}>{lead}</Reveal>
            <Reveal as="div" className="cta-row" index={4} style={{ display: "flex", gap: 14, marginTop: 26, flexWrap: "wrap" }}>
            <a className="btn btn-wa" href={whatsappLink(site.whatsapp)} target="_blank" rel="noopener">
              Agendar pelo WhatsApp
            </a>
            <a className="btn btn-outline-d" href={`tel:${site.phone.replace(/\D/g, "")}`}>
              {site.phone}
            </a>
          </Reveal>
          </div>
        </section>
      </InlineEdit>

      <section>
        <div className="wrap approach">
          <InlineEdit
            globalSlug="pages"
            title="Editar: Agendar (passos)"
            fields={[
              { name: "agendar.stepsEyebrow", label: "Rótulo dos passos", type: "text", value: h.stepsEyebrow },
              { name: "agendar.stepsHeading", label: "Título dos passos", type: "text", value: h.stepsHeading },
              { name: "agendar.stepsSub", label: "Subtítulo dos passos", type: "text", value: h.stepsSub },
            ]}
          >
            <div>
              <Reveal as="span" className="eyebrow" index={0}>{h.stepsEyebrow}</Reveal>
              <Reveal as="h2" index={1}>{h.stepsHeading}</Reveal>
              <Reveal as="p" index={2}>{h.stepsSub}</Reveal>
            </div>
          </InlineEdit>
          <div className="steps">
            {steps.map((s, i) => (
              <Reveal as="div" className="step inline-rel" key={i} index={i}>
                <div className="n">{i + 1}</div>
                <div>
                  <b>{s.t}</b>
                  <span>{s.d}</span>
                </div>
                <InlineArrayItem
                  globalSlug="pages"
                  field="agendarSteps"
                  items={steps}
                  index={i}
                  title={`Editar passo ${i + 1}`}
                  itemFields={[
                    { name: "t", label: "Título", type: "text" },
                    { name: "d", label: "Descrição", type: "textarea" },
                  ]}
                />
              </Reveal>
            ))}
            <InlineArrayAdd
              globalSlug="pages"
              field="agendarSteps"
              items={steps}
              label="Passo"
              title="Novo passo"
              itemFields={[
                { name: "t", label: "Título", type: "text" },
                { name: "d", label: "Descrição", type: "textarea" },
              ]}
            />
          </div>
        </div>
      </section>

      <section className="bg-off">
        <div className="wrap prose">
          <InlineEdit
            globalSlug="pages"
            title="Editar: Agendar (localização)"
            fields={[{ name: "agendar.locHeading", label: "Título da localização", type: "text", value: h.locHeading }]}
          >
            <Reveal as="h2" index={0}>{h.locHeading}</Reveal>
          </InlineEdit>
          <Reveal as="p" index={1}><strong>{cl.endereco}</strong> {site.address}</Reveal>
          <Reveal as="p" index={2}><strong>{cl.telefone}</strong> {site.phone}</Reveal>
          <Reveal as="p" index={3} style={{ marginTop: 12 }}>{h.locNote}</Reveal>
        </div>
      </section>

      <BreadcrumbSchema items={[{ name: "Início", url: "/" }, { name: "Agendar", url: "/agendar" }]} />
    </>
  );
}
