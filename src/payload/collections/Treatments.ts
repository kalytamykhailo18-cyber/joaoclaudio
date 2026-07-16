import type { CollectionConfig } from "payload";
import { seoField, slugField, faqField } from "../fields/shared";

// Tratamentos (medicina regenerativa, infiltração guiada, ondas de choque, viscossuplementação).
export const Treatments: CollectionConfig = {
  slug: "treatments",
  admin: { useAsTitle: "name", group: "Conteúdo", defaultColumns: ["name", "slug"] },
  labels: { singular: "Tratamento", plural: "Tratamentos" },
  access: { read: () => true },
  fields: [
    { name: "name", type: "text", label: "Nome", required: true },
    { name: "short", type: "text", label: "Nome curto", required: true },
    { name: "tag", type: "text", label: "Rótulo (ex.: Regenerativa)" },
    slugField(),
    { name: "h1", type: "text", label: "H1", required: true },
    { name: "intro", type: "textarea", label: "Introdução", required: true },
    { name: "body", type: "richText", label: "Conteúdo clínico" },
    { name: "order", type: "number", label: "Ordem", defaultValue: 0 },
    faqField,
    seoField,
  ],
};
