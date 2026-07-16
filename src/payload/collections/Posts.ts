import type { CollectionConfig } from "payload";
import { seoField, slugField } from "../fields/shared";

// Blog — posts educacionais por cluster (autoridade + SEO).
export const Posts: CollectionConfig = {
  slug: "posts",
  admin: { useAsTitle: "title", group: "Conteúdo", defaultColumns: ["title", "slug", "publishedAt"] },
  labels: { singular: "Post do blog", plural: "Blog" },
  access: { read: () => true },
  versions: { drafts: true }, // preview antes de publicar
  fields: [
    { name: "title", type: "text", label: "Título", required: true },
    slugField(),
    { name: "excerpt", type: "textarea", label: "Resumo" },
    { name: "cover", type: "upload", relationTo: "media", label: "Imagem de capa" },
    { name: "body", type: "richText", label: "Conteúdo" },
    {
      name: "category",
      type: "relationship",
      relationTo: "regions",
      label: "Categoria (cluster)",
    },
    { name: "publishedAt", type: "date", label: "Publicado em" },
    seoField,
  ],
};
