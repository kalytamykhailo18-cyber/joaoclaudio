import type { CollectionConfig } from "payload";
import { seoField, slugField } from "../fields/shared";
import { revalidateChange, revalidateDelete } from "../hooks/revalidate";

// Pilar — região do corpo (coluna, ombro, joelho, quadril, dor crônica).
export const Regions: CollectionConfig = {
  slug: "regions",
  admin: { useAsTitle: "name", group: "Conteúdo", defaultColumns: ["name", "slug"] },
  labels: { singular: "Região (pilar)", plural: "Regiões (pilares)" },
  access: { read: () => true },
  hooks: { afterChange: [revalidateChange], afterDelete: [revalidateDelete] },
  fields: [
    { name: "name", type: "text", label: "Nome", required: true },
    slugField(),
    { name: "h1", type: "text", label: "H1", required: true },
    { name: "intro", type: "textarea", label: "Introdução", required: true },
    { name: "order", type: "number", label: "Ordem de exibição", defaultValue: 0 },
    seoField,
  ],
};
