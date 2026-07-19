import type { Field } from "payload";

// Grupo de SEO reutilizado por todas as coleções de conteúdo.
export const seoField: Field = {
  name: "seo",
  type: "group",
  label: "SEO",
  admin: { description: "Meta tags únicas por página (geradas do conteúdo, editáveis)." },
  fields: [
    { name: "title", type: "text", label: "Title tag (≤ 60 car.)", maxLength: 70 },
    { name: "description", type: "textarea", label: "Meta description (≤ 155 car.)", maxLength: 180 },
    { name: "keyword", type: "text", label: "Keyword-alvo principal" },
  ],
};

// Bloco de perguntas frequentes → alimenta o FAQPage Schema.
export const faqField: Field = {
  name: "faq",
  type: "array",
  label: "Perguntas frequentes (FAQ)",
  admin: { description: "Cada pergunta vira rich snippet (FAQPage) no Google." },
  fields: [
    { name: "q", type: "text", label: "Pergunta", required: true },
    { name: "a", type: "textarea", label: "Resposta", required: true },
  ],
};

// Slug com validação de URL amigável.
// `unique` é global; condições usam unique=false (o slug é único por região).
export const slugField = (label = "Slug (URL)", unique = true): Field => ({
  name: "slug",
  type: "text",
  label,
  required: true,
  unique,
  admin: { description: "URL semântica em minúsculas, ex.: hernia-de-disco" },
  validate: (val: unknown) =>
    typeof val === "string" && /^[a-z0-9-]+$/.test(val)
      ? true
      : "Use apenas letras minúsculas, números e hífens.",
});
