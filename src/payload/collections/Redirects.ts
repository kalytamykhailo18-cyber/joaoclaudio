import type { CollectionConfig } from "payload";
import { revalidateChange, revalidateDelete } from "../hooks/revalidate";

// Redirecionamentos 301 gerenciáveis pelo cliente (sem painel admin: criados/editados
// via API autenticada + tela inline). Aplicados pelo middleware. Leitura pública
// (o middleware precisa consultar); escrita só para usuário logado.
const isAuthed = ({ req }: { req: { user?: unknown } }) => Boolean(req?.user);

// Normaliza um caminho: garante barra inicial, remove barra final (exceto raiz),
// tira query/hash. "Sobre/" → "/Sobre" → (from é comparado já normalizado).
function normalizePath(v: string): string {
  if (!v) return v;
  let p = v.trim();
  if (/^https?:\/\//i.test(p)) return p; // destino externo: mantém como está
  p = p.split("#")[0].split("?")[0];
  if (!p.startsWith("/")) p = "/" + p;
  if (p.length > 1) p = p.replace(/\/+$/, "");
  return p;
}

export const Redirects: CollectionConfig = {
  slug: "redirects",
  admin: { useAsTitle: "from", group: "Administração", defaultColumns: ["from", "to", "permanent"] },
  labels: { singular: "Redirecionamento", plural: "Redirecionamentos" },
  access: {
    read: () => true,
    create: isAuthed,
    update: isAuthed,
    delete: isAuthed,
  },
  hooks: { afterChange: [revalidateChange], afterDelete: [revalidateDelete] },
  fields: [
    {
      name: "from",
      type: "text",
      label: "De (caminho antigo, ex.: /pagina-antiga)",
      required: true,
      unique: true,
      hooks: { beforeValidate: [({ value }) => (value ? normalizePath(value) : value)] },
    },
    {
      name: "to",
      type: "text",
      label: "Para (caminho novo ou URL completa)",
      required: true,
      defaultValue: "/",
      hooks: { beforeValidate: [({ value }) => (value ? normalizePath(value) : value)] },
    },
    {
      name: "permanent",
      type: "checkbox",
      label: "Permanente (301). Desmarque para temporário (302).",
      defaultValue: true,
    },
  ],
};
