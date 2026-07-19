import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getSiteSettings, getPost, getPostParams, getUI } from "@/lib/content";
import Breadcrumb from "@/components/Breadcrumb";
import CtaBand from "@/components/CtaBand";
import FaqInline from "@/components/FaqInline";
import Reveal from "@/components/Reveal";
import InlineEdit, { InlineArrayItem, InlineArrayAdd } from "@/components/inline/InlineEdit";
import { BreadcrumbSchema, ArticleSchema, FaqSchema } from "@/components/Schema";

export const dynamicParams = true; // posts novos no CMS renderizam sem rebuild
export const revalidate = 60;
export function generateStaticParams() {
  return getPostParams();
}

const fmtDate = (iso: string) =>
  new Date(iso + "T00:00:00").toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = await getPost(slug);
  if (!p) return {};
  return {
    title: p.metaTitle,
    description: p.description,
    alternates: { canonical: `/blog/${p.slug}` },
    openGraph: { type: "article", title: p.metaTitle, description: p.description },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await getPost(slug);
  if (!p) notFound();
  const [site, ui] = await Promise.all([getSiteSettings(), getUI()]);
  const bl = ui.blog;
  // Itens de seção com o corpo como texto único (para edição inline).
  const editSections = p.sections.map((s) => ({ h2: s.h2, body: s.body.join("\n\n") }));

  return (
    <>
      <InlineEdit
        collection="posts"
        id={p.id}
        title={`Editar: ${p.title}`}
        fields={[
          { name: "title", label: "Título", type: "text", value: p.title },
          { name: "excerpt", label: "Resumo", type: "textarea", value: p.excerpt },
          { name: "category.label", label: "Categoria (rótulo)", type: "text", value: p.category.label },
          { name: "category.href", label: "Categoria (link)", type: "text", value: p.category.href },
          { name: "publishedAt", label: "Data (AAAA-MM-DD)", type: "text", value: p.publishedAt },
        ]}
      >
        <section className="page-hero">
          <div className="wrap">
            <Reveal as="div" index={0}>
              <Breadcrumb
                items={[
                  { name: "Início", url: "/" },
                  { name: "Blog", url: "/blog" },
                  { name: p.title },
                ]}
              />
            </Reveal>
            <Reveal as="span" className="eyebrow" index={1}>{p.category.label}</Reveal>
            <Reveal as="h1" index={2}>{p.title}</Reveal>
            <Reveal as="p" index={3} style={{ color: "#9a9a9a", fontSize: 14 }}>
              {p.publishedAt ? fmtDate(p.publishedAt) : ""} · {p.readMinutes} {bl.minLeitura}
            </Reveal>
          </div>
        </section>
      </InlineEdit>

      <section>
        <div className="wrap prose">
          <Reveal as="p" index={0} style={{ fontSize: 19, color: "var(--ink-strong)" }}>{p.excerpt}</Reveal>

          {p.sections.map((s, si) => (
            <div key={si} className="inline-rel">
              <Reveal as="h2" index={0}>{s.h2}</Reveal>
              {s.body.map((para, i) => (
                <Reveal as="p" index={i + 1} key={i}>{para}</Reveal>
              ))}
              <InlineArrayItem
                collection="posts"
                id={p.id}
                field="sections"
                items={editSections}
                index={si}
                title={`Editar seção ${si + 1}`}
                itemFields={[
                  { name: "h2", label: "Subtítulo (H2)", type: "text" },
                  { name: "body", label: "Texto (parágrafos separados por linha em branco)", type: "textarea" },
                ]}
              />
            </div>
          ))}
          <InlineArrayAdd
            collection="posts"
            id={p.id}
            field="sections"
            items={editSections}
            label="Seção"
            title="Nova seção"
            itemFields={[
              { name: "h2", label: "Subtítulo (H2)", type: "text" },
              { name: "body", label: "Texto (parágrafos separados por linha em branco)", type: "textarea" },
            ]}
          />

          <>
            <Reveal as="h2" index={0}>{bl.perguntasFrequentes}</Reveal>
            <FaqInline items={p.faq ?? []} target={{ collection: "posts", id: p.id, field: "faq" }} />
          </>

          <Reveal as="p" index={0} style={{ color: "#8a94a8", fontStyle: "italic", marginTop: 24 }}>
            {bl.reviewNote}
          </Reveal>

          {/* Autor — reforço de autoridade (E-E-A-T) */}
          <Reveal
            as="div"
            className="related"
            index={0}
            style={{ marginTop: 40, paddingTop: 28, borderTop: "1px solid var(--line-l)", flexDirection: "column", gap: 6 }}
          >
            <strong style={{ fontFamily: "var(--font-playfair), serif", fontSize: 20 }}>
              {site.doctor}
            </strong>
            <span style={{ fontSize: 14, color: "var(--ink)" }}>
              {bl.authorCreds} — {site.city}
            </span>
            <Link className="arrow-link" href="/sobre" style={{ marginTop: 8 }}>
              {ui.chips.conhecaMedico}
            </Link>
          </Reveal>

          {/* Link contextual para o cluster de origem */}
          <Reveal as="div" className="related" index={0} style={{ marginTop: 24 }}>
            <Link className="chip" href={p.category.href}>
              Ver {p.category.label.toLowerCase()} →
            </Link>
          </Reveal>
        </div>
      </section>

      <CtaBand />

      <BreadcrumbSchema
        items={[
          { name: "Início", url: "/" },
          { name: "Blog", url: "/blog" },
          { name: p.title, url: `/blog/${p.slug}` },
        ]}
      />
      <ArticleSchema
        headline={p.title}
        description={p.description}
        url={`/blog/${p.slug}`}
        datePublished={p.publishedAt}
      />
      {p.faq && p.faq.length > 0 && <FaqSchema faq={p.faq} />}
    </>
  );
}
