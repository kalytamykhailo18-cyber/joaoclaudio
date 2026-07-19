import type { CollectionConfig } from "payload";
import { seoField, slugField, faqField } from "../fields/shared";
import { revalidateChange, revalidateDelete } from "../hooks/revalidate";

// Filha — condição específica dentro de uma região (hérnia de disco, artrose, etc.).
export const Conditions: CollectionConfig = {
  slug: "conditions",
  admin: {
    useAsTitle: "name",
    group: "Conteúdo",
    defaultColumns: ["name", "region", "slug"],
  },
  labels: { singular: "Condição (filha)", plural: "Condições (filhas)" },
  access: { read: () => true },
  hooks: { afterChange: [revalidateChange], afterDelete: [revalidateDelete] },
  fields: [
    { name: "name", type: "text", label: "Nome", required: true },
    slugField("Slug (URL)", false),
    {
      name: "region",
      type: "relationship",
      relationTo: "regions",
      label: "Região (pilar)",
      required: true,
    },
    { name: "h1", type: "text", label: "H1", required: true },
    { name: "intro", type: "textarea", label: "Introdução", required: true },
    { name: "whatIs", type: "textarea", label: "Parágrafo — O que é" },
    { name: "howTreat", type: "textarea", label: "Parágrafo — Como o médico trata" },
    { name: "body", type: "richText", label: "Conteúdo clínico (avançado)" },
    {
      name: "siblings",
      type: "relationship",
      relationTo: "conditions",
      hasMany: true,
      label: "Condições relacionadas (link lateral)",
    },
    {
      name: "treatments",
      type: "relationship",
      relationTo: "treatments",
      hasMany: true,
      label: "Tratamentos indicados",
    },
    faqField,
    seoField,
  ],
};
