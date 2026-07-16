// Dados institucionais da clínica — alimentam Schema.org, header e footer.
// TODO(handoff): mover para o CMS (Payload) — estes valores viram campos globais editáveis.
export const site = {
  doctor: "Dr. João Cláudio Miranda",
  specialty: "Ortopedia · Medicina da Dor",
  city: "Goiânia",
  region: "GO",
  country: "BR",
  domain: "https://joaoclaudiomiranda.com",
  // Placeholders — substituir pelos dados reais fornecidos pelo João
  phone: "(62) 0000-0000",
  whatsapp: "5562000000000",
  instagram: "@drjoaoclaudio",
  address: "Goiânia · GO (endereço a confirmar)",
  credentials: [
    { short: "SBOT", label: "Titular" },
    { short: "TRF1", label: "Perito Judicial" },
    { short: "IASP", label: "Membro · Estudo da Dor" },
    { short: "Docência", label: "Professor & Coordenador" },
    { short: "+15 anos", label: "Experiência Clínica" },
  ],
};

export const whatsappLink = (msg = "Olá, gostaria de agendar uma avaliação.") =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}`;
