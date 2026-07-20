import type { Metadata } from "next";
import { site } from "@/content/site";
import { getSiteSettings, getPages } from "@/lib/content";
import Breadcrumb from "@/components/Breadcrumb";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";
import InlineEdit, { InlineArrayItem, InlineArrayAdd } from "@/components/inline/InlineEdit";
import { BreadcrumbSchema } from "@/components/Schema";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getPages();
  return {
    title: seo.sobreTitle,
    description: seo.sobreDescription,
    alternates: { canonical: "/sobre" },
  };
}

export const revalidate = 60;

export default async function SobrePage() {
  const [site, pages] = await Promise.all([getSiteSettings(), getPages()]);
  const h = pages.sobre;
  const creds = pages.sobreCreds;
  const lead = h.lead.replace("O médico", `O ${site.doctor}`);
  const bioIsPlaceholder = h.bio.trim().startsWith("[");
  return (
    <>
      <InlineEdit
        globalSlug="pages"
        title="Editar: Sobre (topo)"
        fields={[
          { name: "sobre.eyebrow", label: "Rótulo", type: "text", value: h.eyebrow },
          { name: "sobre.h1", label: "Título (H1)", type: "text", value: h.h1 },
          { name: "sobre.lead", label: "Parágrafo de abertura", type: "textarea", value: lead },
          { name: "seo.sobreTitle", label: "SEO — Meta title (Google)", type: "text", value: pages.seo.sobreTitle },
          { name: "seo.sobreDescription", label: "SEO — Meta description (Google)", type: "textarea", value: pages.seo.sobreDescription },
        ]}
      >
        <section className="page-hero">
          <div className="wrap">
            <Reveal as="div" index={0}>
              <Breadcrumb items={[{ name: "Início", url: "/" }, { name: "O médico" }]} />
            </Reveal>
            <Reveal as="span" className="eyebrow" index={1}>{h.eyebrow}</Reveal>
            <Reveal as="h1" index={2}>{h.h1}</Reveal>
            <Reveal as="p" index={3}>{lead}</Reveal>
          </div>
        </section>
      </InlineEdit>

      <InlineEdit
        globalSlug="pages"
        title="Editar: Sobre (biografia)"
        fields={[
          { name: "sobre.credsHeading", label: "Título das credenciais", type: "text", value: h.credsHeading },
          { name: "sobre.bio", label: "Biografia", type: "textarea", value: h.bio },
        ]}
      >
        <section>
          <div className="wrap prose">
            <Reveal as="h2" index={0}>{h.credsHeading}</Reveal>
            <ul style={{ listStyle: "none", display: "grid", gap: 12, marginTop: 8 }}>
              {creds.map((cr, i) => (
                <Reveal as="li" className="inline-rel" index={i} key={i}>
                  ✓ {cr.text}
                  <InlineArrayItem
                    globalSlug="pages"
                    field="sobreCreds"
                    items={creds}
                    index={i}
                    title={`Editar credencial ${i + 1}`}
                    itemFields={[{ name: "text", label: "Credencial", type: "text" }]}
                  />
                </Reveal>
              ))}
            </ul>
            <InlineArrayAdd
              globalSlug="pages"
              field="sobreCreds"
              items={creds}
              label="Credencial"
              title="Nova credencial"
              itemFields={[{ name: "text", label: "Credencial", type: "text" }]}
            />
            <Reveal as="p" index={1} style={bioIsPlaceholder ? { color: "#8a94a8", fontStyle: "italic", marginTop: 24 } : { marginTop: 24 }}>
              {h.bio}
            </Reveal>
          </div>
        </section>
      </InlineEdit>

      <CtaBand />
      <BreadcrumbSchema items={[{ name: "Início", url: "/" }, { name: "O médico", url: "/sobre" }]} />
    </>
  );
}
