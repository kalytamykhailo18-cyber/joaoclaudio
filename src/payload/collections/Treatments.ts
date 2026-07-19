import type { CollectionConfig } from "payload";
import { seoField, slugField, faqField } from "../fields/shared";
import { revalidateChange, revalidateDelete } from "../hooks/revalidate";

// Tratamentos (medicina regenerativa, infiltração guiada, ondas de choque, viscossuplementação).
export const Treatments: CollectionConfig = {
  slug: "treatments",
  admin: { useAsTitle: "name", group: "Conteúdo", defaultColumns: ["name", "slug"] },
  labels: { singular: "Tratamento", plural: "Tratamentos" },
  access: { read: () => true },
  hooks: { afterChange: [revalidateChange], afterDelete: [revalidateDelete] },
  fields: [
    { name: "name", type: "text", label: "Nome", required: true },
    { name: "short", type: "text", label: "Nome curto", required: true },
    { name: "tag", type: "text", label: "Rótulo (ex.: Regenerativa)" },
    slugField(),
    { name: "h1", type: "text", label: "H1", required: true },
    { name: "intro", type: "textarea", label: "Introdução", required: true },
    { name: "howWorks", type: "textarea", label: "Parágrafo — Como funciona" },
    { name: "body", type: "richText", label: "Conteúdo clínico (avançado)" },
    { name: "order", type: "number", label: "Ordem", defaultValue: 0 },
    faqField,
    seoField,
  ],
};
