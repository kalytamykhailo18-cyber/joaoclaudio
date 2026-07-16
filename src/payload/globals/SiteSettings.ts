import type { GlobalConfig } from "payload";

// Dados institucionais editáveis pelo médico — alimentam header, footer e Schema local.
export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Configurações do site",
  admin: { group: "Administração" },
  access: { read: () => true },
  fields: [
    { name: "doctor", type: "text", label: "Nome do médico", defaultValue: "Dr. João Cláudio Miranda" },
    { name: "specialty", type: "text", label: "Especialidade", defaultValue: "Ortopedia · Medicina da Dor" },
    { name: "city", type: "text", label: "Cidade", defaultValue: "Goiânia" },
    { name: "phone", type: "text", label: "Telefone" },
    { name: "whatsapp", type: "text", label: "WhatsApp (só números, com DDI)" },
    { name: "instagram", type: "text", label: "Instagram" },
    { name: "address", type: "textarea", label: "Endereço completo" },
    {
      name: "credentials",
      type: "array",
      label: "Credenciais (faixa de autoridade)",
      fields: [
        { name: "short", type: "text", label: "Sigla", required: true },
        { name: "label", type: "text", label: "Descrição", required: true },
      ],
    },
    { name: "heroPhoto", type: "upload", relationTo: "media", label: "Foto do médico (hero)" },
  ],
};
