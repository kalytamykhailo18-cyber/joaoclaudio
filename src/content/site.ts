// Dados institucionais da clínica — alimentam Schema.org, header e footer.
// TODO(handoff): mover para o CMS (Payload) — estes valores viram campos globais editáveis.
export const site = {
  doctor: "Dr. João Cláudio Miranda",
  specialty: "Ortopedia · Medicina da Dor",
  city: "Goiânia",
  region: "GO",
  country: "BR",
  domain: "https://joaoclaudiomiranda.com",
  // Endereço real (Google Business Profile)
  clinicName: "Clínica ortopédica Dr. João Cláudio Miranda",
  address: "Av. Portugal, 1148 — Sala 702B, Órion Business & Health Complex, St. Marista, Goiânia - GO, 74150-030",
  street: "Av. Portugal, 1148 — Sala 702B",
  district: "Setor Marista",
  postalCode: "74150-030",
  // Google Business Profile — prova social
  rating: 5.0,
  reviewCount: 569,
  // TODO: substituir pela URL curta do perfil / place_id reais do João
  googleReviewsUrl:
    "https://www.google.com/maps/search/?api=1&query=Dr.+Jo%C3%A3o+Cl%C3%A1udio+Miranda+Goi%C3%A2nia",
  // Placeholders — ainda faltam do João
  phone: "(62) 0000-0000",
  whatsapp: "5562000000000",
  instagram: "@drjoaoclaudio",
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
