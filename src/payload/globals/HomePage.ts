import type { Field, GlobalConfig } from "payload";
import { revalidateChange } from "../hooks/revalidate";

const section = (
  name: string,
  label: string,
  fields: { name: string; label: string; type: "text" | "textarea" }[],
): Field => ({
  name,
  type: "group",
  label,
  fields: fields.map((f) => ({ name: f.name, type: f.type, label: f.label })) as Field[],
});

// Conteúdo editável da página inicial (hero + cabeçalhos das seções + citação).
export const HomePage: GlobalConfig = {
  slug: "home",
  label: "Página inicial",
  admin: { group: "Conteúdo" },
  access: { read: () => true },
  hooks: { afterChange: [revalidateChange] },
  fields: [
    section("hero", "Hero", [
      { name: "pre", label: "Linha superior", type: "text" },
      { name: "h1", label: "Título (H1)", type: "text" },
      { name: "sub", label: "Subtítulo", type: "textarea" },
      { name: "tag", label: "Frase de destaque", type: "text" },
      { name: "btnPrimary", label: "Botão principal", type: "text" },
      { name: "btnSecondary", label: "Botão secundário", type: "text" },
    ]),
    section("intro", "Introdução", [
      { name: "eyebrow", label: "Rótulo", type: "text" },
      { name: "h2", label: "Título", type: "text" },
      { name: "p1", label: "Parágrafo 1", type: "textarea" },
      { name: "p2", label: "Parágrafo 2", type: "textarea" },
      { name: "link", label: "Link (texto)", type: "text" },
    ]),
    section("areas", "Áreas (cabeçalho)", [
      { name: "eyebrow", label: "Rótulo", type: "text" },
      { name: "h2", label: "Título", type: "text" },
      { name: "p", label: "Descrição", type: "textarea" },
      { name: "promoTitle", label: "Card promo — título", type: "text" },
      { name: "promoText", label: "Card promo — texto", type: "textarea" },
    ]),
    section("band", "Faixa (abordagem)", [
      { name: "eyebrow", label: "Rótulo", type: "text" },
      { name: "h2", label: "Título", type: "text" },
      { name: "p", label: "Descrição", type: "textarea" },
      { name: "button", label: "Botão", type: "text" },
    ]),
    section("steps", "Passos (cabeçalho)", [
      { name: "eyebrow", label: "Rótulo", type: "text" },
      { name: "h2", label: "Título", type: "text" },
      { name: "p", label: "Descrição", type: "textarea" },
    ]),
    section("treatments", "Tratamentos (cabeçalho)", [
      { name: "eyebrow", label: "Rótulo", type: "text" },
      { name: "h2", label: "Título", type: "text" },
      { name: "p", label: "Descrição", type: "textarea" },
    ]),
    section("quote", "Citação", [
      { name: "text", label: "Texto", type: "textarea" },
      { name: "cite", label: "Autor", type: "text" },
    ]),
    section("location", "Localização (home)", [
      { name: "eyebrow", label: "Rótulo", type: "text" },
      { name: "heading", label: "Título", type: "text" },
      { name: "note", label: "Texto", type: "textarea" },
      { name: "button", label: "Botão (como chegar)", type: "text" },
    ]),
    { name: "heroPhoto", type: "upload", relationTo: "media", label: "Foto do hero (médico)" } as Field,
    {
      name: "stepItems",
      type: "array",
      label: "Passos (itens)",
      fields: [
        { name: "t", type: "text", label: "Título", required: true },
        { name: "d", type: "textarea", label: "Descrição", required: true },
      ],
    } as Field,
  ],
};
