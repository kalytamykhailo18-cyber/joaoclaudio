// ─────────────────────────────────────────────────────────────
// Arquitetura de SEO em cluster (Etapa 1) como dados.
// Cada entrada gera uma página estática (SSG) + item no sitemap + Schema.
// pilar (região) > filha (condição) > neto (tratamento × condição)
// TODO(handoff): estas coleções viram tabelas no Payload CMS.
// ─────────────────────────────────────────────────────────────

export type Condition = {
  slug: string;
  name: string;
  h1: string;
  title: string;        // <title> / meta title
  description: string;  // meta description
  keyword: string;      // keyword-alvo principal
  intro: string;
  siblings?: string[];  // slugs de condições irmãs (link lateral)
  treatments?: string[]; // slugs de tratamentos relacionados
  faq?: { q: string; a: string }[];
};

export type Region = {
  slug: string;
  name: string;
  h1: string;
  title: string;
  description: string;
  keyword: string;
  intro: string;
  conditions: Condition[];
};

export type Treatment = {
  slug: string;
  name: string;
  short: string;
  h1: string;
  title: string;
  description: string;
  keyword: string;
  intro: string;
  tag: string;
};

export const regions: Region[] = [
  {
    slug: "coluna",
    name: "Coluna",
    h1: "Tratamento de Dor na Coluna em Goiânia",
    title: "Dor na Coluna: Tratamento Especializado",
    description:
      "Tratamento de dor na coluna em Goiânia: hérnia de disco, dor lombar, cervical e ciática, com abordagem sem cirurgia como primeira opção.",
    keyword: "dor na coluna tratamento",
    intro:
      "A coluna concentra grande parte das dores crônicas. Com diagnóstico preciso, a maioria dos casos melhora sem cirurgia.",
    conditions: [
      {
        slug: "hernia-de-disco",
        name: "Hérnia de disco",
        h1: "Hérnia de Disco: Tratamento Sem Cirurgia",
        title: "Hérnia de Disco: Tratamento Sem Cirurgia",
        description:
          "Sofre com hérnia de disco? Conheça o tratamento sem cirurgia com infiltração guiada e medicina regenerativa em Goiânia. Agende sua avaliação.",
        keyword: "hérnia de disco tratamento sem cirurgia",
        intro:
          "A hérnia de disco causa dor, formigamento e limitação — mas a maioria dos casos responde bem ao tratamento conservador quando conduzido corretamente.",
        siblings: ["dor-lombar", "dor-ciatica"],
        treatments: ["infiltracao-guiada-por-ultrassom", "medicina-regenerativa"],
        faq: [
          { q: "Hérnia de disco sempre precisa de cirurgia?", a: "Não. A maioria dos casos melhora com tratamento conservador — medicação, fisioterapia e procedimentos guiados. A cirurgia fica reservada para casos específicos." },
          { q: "Quanto tempo dura o tratamento sem cirurgia?", a: "Varia conforme o caso, mas muitos pacientes sentem alívio significativo nas primeiras semanas de tratamento orientado." },
          { q: "A infiltração para hérnia de disco dói?", a: "O procedimento é guiado por ultrassom, minimamente desconfortável e realizado em ambiente ambulatorial." },
        ],
      },
      {
        slug: "dor-lombar",
        name: "Dor lombar",
        h1: "Dor Lombar Crônica: Tratamento em Goiânia",
        title: "Dor Lombar Crônica: Tratamento",
        description:
          "Dor lombar que não passa? Tratamento especializado em Goiânia com foco na causa da dor e recuperação funcional. Agende sua avaliação.",
        keyword: "dor lombar crônica tratamento",
        intro:
          "A dor lombar é uma das queixas mais comuns. Identificar a causa exata é o que separa o alívio temporário do resultado duradouro.",
        siblings: ["hernia-de-disco", "dor-ciatica"],
        treatments: ["infiltracao-guiada-por-ultrassom", "ondas-de-choque"],
        faq: [
          { q: "Por que minha dor lombar não passa?", a: "Dor lombar persistente costuma ter uma causa específica — discal, articular ou muscular — que precisa ser identificada por avaliação e imagem." },
          { q: "Preciso operar a coluna?", a: "Na grande maioria dos casos, não. O tratamento conservador e os procedimentos guiados resolvem a maior parte das dores lombares." },
        ],
      },
      {
        slug: "dor-cervical",
        name: "Dor cervical",
        h1: "Dor Cervical: Tratamento Especializado",
        title: "Dor Cervical (Cervicalgia): Tratamento",
        description:
          "Dor no pescoço e cervical? Tratamento especializado em Goiânia com diagnóstico preciso e abordagem sem cirurgia como primeira opção.",
        keyword: "dor cervical tratamento",
        intro:
          "A dor cervical afeta pescoço, ombros e até a cabeça. O tratamento certo devolve mobilidade e qualidade de vida.",
        siblings: ["hernia-de-disco", "dor-lombar"],
        treatments: ["infiltracao-guiada-por-ultrassom", "ondas-de-choque"],
      },
      {
        slug: "dor-ciatica",
        name: "Dor ciática",
        h1: "Dor Ciática: Tratamento Sem Cirurgia",
        title: "Dor Ciática: Tratamento em Goiânia",
        description:
          "Dor ciática que irradia pela perna? Tratamento especializado em Goiânia com infiltração guiada e abordagem conservadora. Agende.",
        keyword: "dor ciática tratamento",
        intro:
          "A ciática irradia da lombar para a perna e limita o dia a dia. Com o tratamento correto, o alívio costuma vir sem cirurgia.",
        siblings: ["hernia-de-disco", "dor-lombar"],
        treatments: ["infiltracao-guiada-por-ultrassom"],
      },
    ],
  },
  {
    slug: "ombro",
    name: "Ombro",
    h1: "Tratamento de Dor no Ombro em Goiânia",
    title: "Dor no Ombro: Tratamento Especializado",
    description:
      "Dor no ombro em Goiânia: manguito rotador, capsulite adesiva (ombro congelado) e tendinite calcária, com tratamento moderno e sem cirurgia como 1ª opção.",
    keyword: "dor no ombro especialista",
    intro:
      "O ombro é a articulação mais móvel do corpo — e uma das que mais dói quando algo não vai bem. O diagnóstico preciso guia o melhor tratamento.",
    conditions: [
      {
        slug: "manguito-rotador",
        name: "Manguito rotador",
        h1: "Lesão do Manguito Rotador: Tratamento",
        title: "Lesão do Manguito Rotador: Tratamento",
        description:
          "Dor e fraqueza no ombro? A lesão do manguito rotador tem tratamento em Goiânia — conservador, regenerativo e guiado por ultrassom. Agende.",
        keyword: "lesão do manguito rotador tratamento",
        intro:
          "A lesão do manguito rotador causa dor ao levantar o braço e fraqueza. Muitos casos melhoram sem cirurgia com o tratamento certo.",
        siblings: ["capsulite-adesiva", "tendinite-calcaria"],
        treatments: ["ondas-de-choque", "medicina-regenerativa"],
      },
      {
        slug: "capsulite-adesiva",
        name: "Capsulite adesiva",
        h1: "Capsulite Adesiva (Ombro Congelado)",
        title: "Ombro Congelado (Capsulite Adesiva): Tratamento",
        description:
          "Ombro travado e dolorido? A capsulite adesiva (ombro congelado) tem tratamento em Goiânia para recuperar movimento e aliviar a dor. Agende.",
        keyword: "ombro congelado tratamento",
        intro:
          "A capsulite adesiva enrijece o ombro e limita o movimento. O tratamento devolve a amplitude e alivia a dor de forma progressiva.",
        siblings: ["manguito-rotador", "tendinite-calcaria"],
        treatments: ["infiltracao-guiada-por-ultrassom"],
      },
      {
        slug: "tendinite-calcaria",
        name: "Tendinite calcária",
        h1: "Tendinite Calcária do Ombro: Tratamento",
        title: "Tendinite Calcária do Ombro: Tratamento",
        description:
          "Tendinite calcária no ombro? Tratamento com ondas de choque e procedimentos guiados em Goiânia, sem cirurgia na maioria dos casos. Agende.",
        keyword: "tendinite calcária ombro tratamento",
        intro:
          "O acúmulo de cálcio no tendão causa dor intensa. A terapia por ondas de choque é uma das opções mais eficazes e não invasivas.",
        siblings: ["manguito-rotador", "capsulite-adesiva"],
        treatments: ["ondas-de-choque"],
      },
    ],
  },
  {
    slug: "joelho",
    name: "Joelho",
    h1: "Tratamento de Dor no Joelho em Goiânia",
    title: "Dor no Joelho: Tratamento Especializado",
    description:
      "Dor no joelho em Goiânia: artrose, lesão meniscal e lesões ligamentares, com medicina regenerativa e abordagem sem cirurgia como primeira opção.",
    keyword: "dor no joelho especialista",
    intro:
      "O joelho sustenta o corpo e sofre com o desgaste. Da artrose à lesão de menisco, o tratamento moderno adia — ou evita — a cirurgia.",
    conditions: [
      {
        slug: "artrose",
        name: "Artrose do joelho",
        h1: "Artrose do Joelho: Tratamento Sem Cirurgia",
        title: "Artrose do Joelho: Tratamento Sem Cirurgia",
        description:
          "Artrose no joelho? Medicina regenerativa e viscossuplementação em Goiânia para reduzir a dor e adiar a prótese. Agende sua avaliação.",
        keyword: "artrose no joelho tratamento sem cirurgia",
        intro:
          "A artrose desgasta a cartilagem e causa dor ao caminhar. A medicina regenerativa pode reduzir a dor e adiar a prótese.",
        siblings: ["lesao-meniscal", "lesao-ligamentar"],
        treatments: ["medicina-regenerativa", "viscossuplementacao"],
        faq: [
          { q: "A medicina regenerativa substitui a prótese de joelho?", a: "Ela pode adiar a necessidade da prótese e melhorar a qualidade de vida, especialmente em casos iniciais e moderados." },
          { q: "Quantas sessões são necessárias?", a: "Depende do grau da artrose e da resposta individual, avaliados na consulta." },
        ],
      },
      {
        slug: "lesao-meniscal",
        name: "Lesão meniscal",
        h1: "Lesão de Menisco: Tratamento",
        title: "Lesão de Menisco: Tratamento em Goiânia",
        description:
          "Lesão de menisco? Tratamento especializado em Goiânia com abordagem conservadora e regenerativa quando indicado. Agende sua avaliação.",
        keyword: "lesão de menisco tratamento",
        intro:
          "Nem toda lesão de menisco precisa de cirurgia. A avaliação define o melhor caminho para o seu caso.",
        siblings: ["artrose", "lesao-ligamentar"],
        treatments: ["medicina-regenerativa"],
      },
      {
        slug: "lesao-ligamentar",
        name: "Lesão ligamentar",
        h1: "Lesão de Ligamento do Joelho",
        title: "Lesão de Ligamento do Joelho: Tratamento",
        description:
          "Lesão de ligamento do joelho (LCA)? Avaliação especializada em Goiânia para definir o tratamento certo — conservador ou cirúrgico. Agende.",
        keyword: "lesão de ligamento do joelho",
        intro:
          "As lesões ligamentares exigem diagnóstico preciso para definir entre reabilitação e cirurgia.",
        siblings: ["artrose", "lesao-meniscal"],
        treatments: ["medicina-regenerativa"],
      },
    ],
  },
  {
    slug: "quadril",
    name: "Quadril",
    h1: "Tratamento de Dor no Quadril em Goiânia",
    title: "Dor no Quadril: Tratamento Especializado",
    description:
      "Dor no quadril em Goiânia: artrose (coxartrose) e bursite trocantérica, com tratamento moderno e abordagem sem cirurgia como primeira opção.",
    keyword: "dor no quadril especialista",
    intro:
      "A dor no quadril limita o caminhar e o dormir. O tratamento certo devolve mobilidade e conforto.",
    conditions: [
      {
        slug: "artrose",
        name: "Artrose do quadril",
        h1: "Artrose do Quadril (Coxartrose): Tratamento",
        title: "Artrose do Quadril (Coxartrose): Tratamento",
        description:
          "Artrose no quadril? Tratamento em Goiânia com medicina regenerativa e infiltração guiada para aliviar a dor e adiar a prótese. Agende.",
        keyword: "artrose do quadril tratamento",
        intro:
          "A coxartrose causa dor na virilha e rigidez. O tratamento moderno melhora a função e adia a prótese.",
        siblings: ["bursite-trocanterica"],
        treatments: ["medicina-regenerativa", "infiltracao-guiada-por-ultrassom"],
      },
      {
        slug: "bursite-trocanterica",
        name: "Bursite trocantérica",
        h1: "Bursite Trocantérica: Tratamento",
        title: "Bursite no Quadril (Trocantérica): Tratamento",
        description:
          "Dor na lateral do quadril? A bursite trocantérica tem tratamento em Goiânia com ondas de choque e infiltração guiada. Agende sua avaliação.",
        keyword: "bursite no quadril tratamento",
        intro:
          "A bursite trocantérica causa dor na lateral do quadril, pior ao deitar de lado. Responde bem a tratamento conservador.",
        siblings: ["artrose"],
        treatments: ["ondas-de-choque", "infiltracao-guiada-por-ultrassom"],
      },
    ],
  },
];

export const treatments: Treatment[] = [
  {
    slug: "medicina-regenerativa",
    name: "Medicina regenerativa",
    short: "Regenerativa",
    tag: "Regenerativa",
    h1: "Medicina Regenerativa em Ortopedia",
    title: "Medicina Regenerativa em Ortopedia",
    description:
      "Medicina regenerativa para artrose e lesões articulares em Goiânia. Estimula a recuperação natural e adia a prótese. Agende sua avaliação.",
    keyword: "medicina regenerativa ortopedia",
    intro:
      "A medicina regenerativa estimula a recuperação natural da articulação, reduz a dor e pode adiar a cirurgia de prótese.",
  },
  {
    slug: "infiltracao-guiada-por-ultrassom",
    name: "Infiltração guiada por ultrassom",
    short: "Infiltração guiada por US",
    tag: "Precisão",
    h1: "Infiltração Guiada por Ultrassom",
    title: "Infiltração Guiada por Ultrassom",
    description:
      "Infiltração guiada por ultrassom em Goiânia: medicação aplicada com precisão no ponto exato da dor, em ambiente ambulatorial. Agende.",
    keyword: "infiltração guiada por ultrassom",
    intro:
      "A infiltração guiada por ultrassom leva a medicação ao ponto exato da dor, com precisão milimétrica e mais segurança.",
  },
  {
    slug: "ondas-de-choque",
    name: "Terapia por ondas de choque",
    short: "Ondas de choque",
    tag: "Não invasivo",
    h1: "Terapia por Ondas de Choque",
    title: "Terapia por Ondas de Choque",
    description:
      "Terapia por ondas de choque em Goiânia para tendinites e dores crônicas resistentes. Tratamento não invasivo e sem cirurgia. Agende.",
    keyword: "terapia por ondas de choque",
    intro:
      "A terapia por ondas de choque é não invasiva e eficaz para tendinites e dores crônicas que resistem a outros tratamentos.",
  },
  {
    slug: "viscossuplementacao",
    name: "Viscossuplementação",
    short: "Viscossuplementação",
    tag: "Articular",
    h1: "Viscossuplementação para Artrose",
    title: "Viscossuplementação para Artrose de Joelho",
    description:
      "Viscossuplementação em Goiânia: lubrifica a articulação, reduz o atrito e a dor na artrose de joelho. Agende sua avaliação.",
    keyword: "viscossuplementação joelho",
    intro:
      "A viscossuplementação repõe o líquido que lubrifica a articulação, reduzindo o atrito e a dor na artrose.",
  },
];

// Netos: tratamento × condição (páginas transacionais / destino de Google Ads)
export const applications: { treatment: string; region: string; condition: string }[] = [
  { treatment: "medicina-regenerativa", region: "joelho", condition: "artrose" },
  { treatment: "infiltracao-guiada-por-ultrassom", region: "coluna", condition: "dor-lombar" },
  { treatment: "ondas-de-choque", region: "ombro", condition: "tendinite-calcaria" },
  { treatment: "medicina-regenerativa", region: "joelho", condition: "lesao-meniscal" },
];

// ── Helpers ──────────────────────────────────────────────────
export const getRegion = (slug: string) => regions.find((r) => r.slug === slug);
export const getCondition = (regionSlug: string, condSlug: string) =>
  getRegion(regionSlug)?.conditions.find((c) => c.slug === condSlug);
export const getTreatment = (slug: string) => treatments.find((t) => t.slug === slug);
export const allRegionParams = regions.map((r) => ({ region: r.slug }));
export const allConditionParams = regions.flatMap((r) =>
  r.conditions.map((c) => ({ region: r.slug, condition: c.slug })),
);
export const allTreatmentParams = treatments.map((t) => ({ treatment: t.slug }));
