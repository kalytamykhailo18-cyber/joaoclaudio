import Breadcrumb from "@/components/Breadcrumb";
import Reveal from "@/components/Reveal";
import InlineEdit from "@/components/inline/InlineEdit";
import { getPages } from "@/lib/content";

type DocKey = "privacy" | "cookies" | "terms";

// Página legal editável (política de privacidade, cookies, termos). O conteúdo
// vive no global "pages" (grupo legal) e é editável inline pelo médico.
export default async function LegalPage({ title, docKey }: { title: string; docKey: DocKey }) {
  const { legal } = await getPages();
  const content = legal[docKey];
  const isPlaceholder = content.trim().startsWith("[");
  const paragraphs = content.split(/\n\s*\n/).map((s) => s.trim()).filter(Boolean);

  return (
    <InlineEdit
      globalSlug="pages"
      title={`Editar: ${title}`}
      fields={[
        { name: "legal.eyebrow", label: "Rótulo", type: "text", value: legal.eyebrow },
        { name: `legal.${docKey}`, label: "Conteúdo", type: "textarea", value: content },
      ]}
    >
      <section className="page-hero" style={{ minHeight: "60vh" }}>
        <div className="wrap">
          <Reveal as="div" index={0}>
            <Breadcrumb items={[{ name: "Início", url: "/" }, { name: title }]} />
          </Reveal>
          <Reveal as="span" className="eyebrow" index={1}>
            {legal.eyebrow}
          </Reveal>
          <Reveal as="h1" index={2}>
            {title}
          </Reveal>
          {paragraphs.map((para, i) => (
            <Reveal
              as="p"
              index={3 + i}
              key={i}
              style={isPlaceholder ? { color: "#8a94a8", fontStyle: "italic" } : { marginTop: 12 }}
            >
              {para}
            </Reveal>
          ))}
        </div>
      </section>
    </InlineEdit>
  );
}
