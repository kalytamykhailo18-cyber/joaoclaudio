import Link from "next/link";
import type { Metadata } from "next";
import { getPages, getPosts, getUI } from "@/lib/content";
import Breadcrumb from "@/components/Breadcrumb";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";
import InlineEdit, { InlinePencil, InlineAdd } from "@/components/inline/InlineEdit";
import { BreadcrumbSchema } from "@/components/Schema";

export const metadata: Metadata = {
  title: "Blog de Ortopedia e Dor Crônica",
  description:
    "Conteúdo educativo sobre dor crônica, coluna, joelho, ombro e quadril — do Dr. João Cláudio Miranda, ortopedista em Goiânia.",
  alternates: { canonical: "/blog" },
};

const fmtDate = (iso: string) =>
  new Date(iso + "T00:00:00").toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

export const revalidate = 60; // ISR: posts do CMS refletem no índice

export default async function BlogIndex() {
  const [{ blogIndex: h }, posts, ui] = await Promise.all([getPages(), getPosts(), getUI()]);
  const ch = ui.chips;
  const bl = ui.blog;
  return (
    <>
      <InlineEdit
        globalSlug="pages"
        title="Editar: Blog (topo)"
        fields={[
          { name: "blogIndex.eyebrow", label: "Rótulo", type: "text", value: h.eyebrow },
          { name: "blogIndex.h1", label: "Título (H1)", type: "text", value: h.h1 },
          { name: "blogIndex.p", label: "Descrição", type: "textarea", value: h.p },
        ]}
      >
        <section className="page-hero">
          <div className="wrap">
            <Reveal as="div" index={0}>
              <Breadcrumb items={[{ name: "Início", url: "/" }, { name: "Blog" }]} />
            </Reveal>
            <Reveal as="span" className="eyebrow" index={1}>{h.eyebrow}</Reveal>
            <Reveal as="h1" index={2}>{h.h1}</Reveal>
            <Reveal as="p" index={3}>{h.p}</Reveal>
          </div>
        </section>
      </InlineEdit>

      <section>
        <div className="wrap">
          <div className="cards">
            {posts.map((p, i) => (
              <Reveal as={Link} className="card" href={`/blog/${p.slug}`} key={p.slug} index={i}>
                <div className="num">{p.category.label}</div>
                <h3 style={{ fontSize: 22 }}>{p.title}</h3>
                <p>{p.excerpt}</p>
                <span className="arrow-link">{ch.lerArtigo}</span>
                <span style={{ display: "block", marginTop: 16, fontSize: 12.5, color: "#8a8a8a" }}>
                  {p.publishedAt ? fmtDate(p.publishedAt) : ""} · {p.readMinutes} {bl.minLeitura}
                </span>
                <InlinePencil
                  collection="posts"
                  id={p.id}
                  canDelete
                  title={`Editar: ${p.title}`}
                  fields={[
                    { name: "title", label: "Título", type: "text", value: p.title },
                    { name: "excerpt", label: "Resumo (índice)", type: "textarea", value: p.excerpt },
                    { name: "category.label", label: "Categoria (rótulo)", type: "text", value: p.category.label },
                    { name: "category.href", label: "Categoria (link)", type: "text", value: p.category.href },
                    { name: "publishedAt", label: "Data (AAAA-MM-DD)", type: "text", value: p.publishedAt },
                  ]}
                />
              </Reveal>
            ))}
            <InlineAdd
              collection="posts"
              label="Adicionar post"
              title="Novo post do blog"
              fields={[
                { name: "title", label: "Título", type: "text", value: "" },
                { name: "excerpt", label: "Resumo (índice)", type: "textarea", value: "" },
                { name: "category.label", label: "Categoria (rótulo)", type: "text", value: "" },
                { name: "category.href", label: "Categoria (link, ex.: /coluna)", type: "text", value: "" },
                { name: "publishedAt", label: "Data (AAAA-MM-DD)", type: "text", value: "" },
                { name: "slug", label: "Slug (URL — deixe vazio para gerar do título)", type: "text", value: "" },
              ]}
            />
          </div>
        </div>
      </section>

      <CtaBand />
      <BreadcrumbSchema items={[{ name: "Início", url: "/" }, { name: "Blog", url: "/blog" }]} />
    </>
  );
}
