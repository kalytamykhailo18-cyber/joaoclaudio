import type { Metadata } from "next";
import { whatsappLink } from "@/content/site";
import { getSiteSettings, getPages, getUI } from "@/lib/content";
import Breadcrumb from "@/components/Breadcrumb";
import Reveal from "@/components/Reveal";
import ClinicMap from "@/components/ClinicMap";
import InlineEdit from "@/components/inline/InlineEdit";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getPages();
  return {
    title: seo.contatoTitle,
    description: seo.contatoDescription,
    alternates: { canonical: "/contato" },
  };
}

export const revalidate = 60;

export default async function ContatoPage() {
  const [site, pages, ui] = await Promise.all([getSiteSettings(), getPages(), getUI()]);
  const h = pages.contato;
  const cl = ui.contact;
  return (
    <>
      <InlineEdit
        globalSlug="pages"
        title="Editar: Contato (topo)"
        fields={[
          { name: "contato.eyebrow", label: "Rótulo", type: "text", value: h.eyebrow },
          { name: "contato.h1", label: "Título (H1)", type: "text", value: h.h1 },
          { name: "contato.lead", label: "Parágrafo de abertura", type: "textarea", value: h.lead },
          { name: "contato.proseHeading", label: "Título do bloco de contato", type: "text", value: h.proseHeading },
          { name: "contato.whatsappBtn", label: "Botão WhatsApp", type: "text", value: h.whatsappBtn },
          { name: "contato.phoneBtn", label: "Botão telefone", type: "text", value: h.phoneBtn },
          { name: "contato.note", label: "Nota (mapa/formulário)", type: "textarea", value: h.note },
          { name: "seo.contatoTitle", label: "SEO — Meta title (Google)", type: "text", value: pages.seo.contatoTitle },
          { name: "seo.contatoDescription", label: "SEO — Meta description (Google)", type: "textarea", value: pages.seo.contatoDescription },
        ]}
      >
        <section className="page-hero">
          <div className="wrap">
            <Reveal as="div" index={0}>
              <Breadcrumb items={[{ name: "Início", url: "/" }, { name: "Contato" }]} />
            </Reveal>
            <Reveal as="span" className="eyebrow" index={1}>{h.eyebrow}</Reveal>
            <Reveal as="h1" index={2}>{h.h1}</Reveal>
            <Reveal as="p" index={3}>{h.lead}</Reveal>
          </div>
        </section>
      </InlineEdit>

      <InlineEdit
        globalSlug="site-settings"
        title="Editar: Dados de contato da clínica"
        fields={[
          { name: "doctor", label: "Nome do médico", type: "text", value: site.doctor },
          { name: "address", label: "Endereço completo", type: "textarea", value: site.address },
          { name: "phone", label: "Telefone", type: "text", value: site.phone },
          { name: "whatsapp", label: "WhatsApp (só números, com DDI)", type: "text", value: site.whatsapp },
          { name: "instagram", label: "Instagram", type: "text", value: site.instagram },
        ]}
      >
        <section>
          <div className="wrap prose">
            <Reveal as="h2" index={0}>{h.proseHeading}</Reveal>
            <Reveal as="p" index={1}><strong>{cl.endereco}</strong> {site.address}</Reveal>
            <Reveal as="p" index={2}><strong>{cl.telefone}</strong> {site.phone}</Reveal>
            <Reveal as="p" index={3}><strong>{cl.instagram}</strong> {site.instagram}</Reveal>
            <Reveal as="div" className="cta-row" index={4} style={{ display: "flex", gap: 14, marginTop: 24, flexWrap: "wrap" }}>
              <a className="btn btn-wa" href={whatsappLink(site.whatsapp)} target="_blank" rel="noopener">
                {h.whatsappBtn}
              </a>
              <a className="btn btn-outline-l" href={`tel:${site.phone.replace(/\D/g, "")}`}>
                {h.phoneBtn}
              </a>
            </Reveal>
            <Reveal as="p" index={5} style={h.note.trim().startsWith("[") ? { color: "#8a94a8", fontStyle: "italic", marginTop: 28 } : { marginTop: 28 }}>
              {h.note}
            </Reveal>
          </div>
        </section>
      </InlineEdit>

      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <ClinicMap address={site.address} clinicName={site.clinicName ?? site.doctor} />
        </div>
      </section>
    </>
  );
}
