import type { CollectionConfig } from "payload";
import { seoField, slugField, faqField } from "../fields/shared";

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
  fields: [
    { name: "name", type: "text", label: "Nome", required: true },
    slugField(),
    {
      name: "region",
      type: "relationship",
      relationTo: "regions",
      label: "Região (pilar)",
      required: true,
    },
    { name: "h1", type: "text", label: "H1", required: true },
    { name: "intro", type: "textarea", label: "Introdução", required: true },
    { name: "body", type: "richText", label: "Conteúdo clínico" },
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
