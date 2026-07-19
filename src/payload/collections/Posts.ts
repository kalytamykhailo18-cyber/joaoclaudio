import type { CollectionConfig } from "payload";
import { seoField, slugField } from "../fields/shared";
import { revalidateChange, revalidateDelete } from "../hooks/revalidate";

// Blog — posts educacionais por cluster (autoridade + SEO). Estrutura em seções
// (h2 + corpo) e FAQ, para edição inline direta no site.
export const Posts: CollectionConfig = {
  slug: "posts",
  admin: { useAsTitle: "title", group: "Conteúdo", defaultColumns: ["title", "slug", "publishedAt"] },
  labels: { singular: "Post do blog", plural: "Blog" },
  access: { read: () => true },
  hooks: { afterChange: [revalidateChange], afterDelete: [revalidateDelete] },
  fields: [
    { name: "title", type: "text", label: "Título", required: true },
    slugField(),
    { name: "excerpt", type: "textarea", label: "Resumo (índice)" },
    {
      name: "category",
      type: "group",
      label: "Categoria (cluster)",
      fields: [
        { name: "label", type: "text", label: "Rótulo (ex.: Coluna)" },
        { name: "href", type: "text", label: "Link do cluster (ex.: /coluna)" },
      ],
    },
    { name: "publishedAt", type: "text", label: "Data (AAAA-MM-DD)" },
    { name: "readMinutes", type: "number", label: "Minutos de leitura", defaultValue: 5 },
    { name: "cover", type: "upload", relationTo: "media", label: "Imagem de capa" },
    {
      name: "sections",
      type: "array",
      label: "Seções do artigo",
      fields: [
        { name: "h2", type: "text", label: "Subtítulo (H2)", required: true },
        { name: "body", type: "textarea", label: "Texto (parágrafos separados por linha em branco)", required: true },
      ],
    },
    {
      name: "faq",
      type: "array",
      label: "Perguntas frequentes",
      fields: [
        { name: "q", type: "text", label: "Pergunta", required: true },
        { name: "a", type: "textarea", label: "Resposta", required: true },
      ],
    },
    seoField,
  ],
};
