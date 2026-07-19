// ─────────────────────────────────────────────────────────────
// Blog — 5 posts pilares (Etapa 1 §2). Estrutura + briefing prontos;
// o texto clínico final é revisado/fornecido pelo Dr. João Cláudio
// ou pelo redator médico. Cada post linka para o cluster da categoria.
// TODO(handoff): estas entradas viram a coleção "Posts" no Payload CMS.
// ─────────────────────────────────────────────────────────────

export type PostSection = { h2: string; body: string[] };

export type Post = {
  id?: string | number;  // id do documento no CMS (para edição inline)
  slug: string;
  title: string;         // <title> / H1
  metaTitle: string;
  description: string;   // meta description
  keyword: string;       // keyword-alvo principal
  excerpt: string;       // resumo no índice
  category: { label: string; href: string }; // cluster de origem
  publishedAt: string;   // ISO (data fixa, editável no CMS)
  readMinutes: number;
  sections: PostSection[];
  faq?: { q: string; a: string }[];
};

// Nota de revisão clínica exibida no corpo enquanto o texto final não é aprovado.
export const CLINICAL_REVIEW_NOTE =
  "Conteúdo educativo em revisão clínica pelo Dr. João Cláudio Miranda. Esta página não substitui uma consulta médica.";

export const posts: Post[] = [
  {
    slug: "o-que-e-dor-cronica-quando-procurar-especialista",
    title: "O que é dor crônica e quando procurar um especialista",
    metaTitle: "O Que É Dor Crônica e Quando Procurar um Especialista",
    description:
      "Entenda o que caracteriza a dor crônica, por que ela persiste e em que momento procurar um ortopedista especializado em dor em Goiânia.",
    keyword: "o que é dor crônica",
    excerpt:
      "Dor que dura mais de três meses tem características próprias — e um caminho de tratamento diferente da dor aguda. Entenda quando buscar ajuda especializada.",
    category: { label: "Dor crônica", href: "/dor-cronica" },
    publishedAt: "2025-01-14",
    readMinutes: 6,
    sections: [
      {
        h2: "O que define uma dor como crônica",
        body: [
          "A dor crônica é aquela que persiste por mais de três meses, ultrapassando o tempo esperado de cicatrização de uma lesão. Diferente da dor aguda — que é um alerta útil do corpo —, a dor crônica pode se manter mesmo depois de a causa inicial ter sido tratada.",
          "Por isso, ela exige uma abordagem que investigue a origem real do incômodo, e não apenas o alívio momentâneo do sintoma.",
        ],
      },
      {
        h2: "Por que a dor persiste",
        body: [
          "Fatores mecânicos (articulares, discais, musculares), inflamatórios e de sensibilização do sistema nervoso podem manter a dor ativa. Identificar qual predomina é o que orienta o tratamento correto.",
        ],
      },
      {
        h2: "Quando procurar um especialista",
        body: [
          "Vale buscar avaliação quando a dor dura semanas sem melhora, limita atividades do dia a dia, interfere no sono ou retorna sempre que os analgésicos são suspensos.",
          "Um ortopedista especializado em dor consegue definir a causa com exame clínico e imagem, priorizando as opções sem cirurgia sempre que possível.",
        ],
      },
    ],
    faq: [
      { q: "Dor crônica tem cura?", a: "Muitos casos têm controle e melhora significativa quando a causa é identificada e tratada corretamente. O objetivo é devolver função e qualidade de vida." },
      { q: "Preciso conviver com a dor?", a: "Não. Conviver com dor persistente não deve ser encarado como normal — há tratamento para a maioria das causas." },
    ],
  },
  {
    slug: "hernia-de-disco-precisa-de-cirurgia",
    title: "Hérnia de disco precisa de cirurgia?",
    metaTitle: "Hérnia de Disco Precisa de Cirurgia? Entenda as Opções",
    description:
      "A maioria das hérnias de disco melhora sem cirurgia. Entenda quando a operação é realmente indicada e quais são os tratamentos conservadores.",
    keyword: "hérnia de disco precisa de cirurgia",
    excerpt:
      "A cirurgia é a exceção, não a regra. Veja quando a hérnia de disco responde ao tratamento conservador e quando a operação é realmente indicada.",
    category: { label: "Coluna", href: "/coluna/hernia-de-disco" },
    publishedAt: "2025-01-28",
    readMinutes: 7,
    sections: [
      {
        h2: "A cirurgia é a exceção",
        body: [
          "Na maioria dos casos, a hérnia de disco melhora com tratamento conservador conduzido corretamente: controle da dor, fisioterapia orientada e, quando indicado, procedimentos guiados por ultrassom.",
          "A cirurgia fica reservada para situações específicas — e a decisão é sempre individual.",
        ],
      },
      {
        h2: "Quando a cirurgia é indicada",
        body: [
          "Sinais de alerta como perda progressiva de força, alterações de controle de bexiga ou intestino, ou dor incapacitante que não responde ao tratamento conservador bem conduzido, podem indicar avaliação cirúrgica.",
        ],
      },
      {
        h2: "O caminho conservador",
        body: [
          "Antes de pensar em operar, vale esgotar as opções não cirúrgicas com acompanhamento adequado. A infiltração guiada por ultrassom e a medicina regenerativa ampliam esse leque de forma minimamente invasiva.",
        ],
      },
    ],
    faq: [
      { q: "Toda hérnia de disco dói?", a: "Não. Muitas hérnias são achados de exame e não causam sintomas. O tratamento é guiado pela clínica, não apenas pela imagem." },
    ],
  },
  {
    slug: "artrose-de-joelho-tratamento-sem-cirurgia",
    title: "Artrose de joelho: tratamento sem cirurgia",
    metaTitle: "Artrose de Joelho: Tratamento Sem Cirurgia",
    description:
      "Conheça as opções modernas para tratar a artrose de joelho sem cirurgia — da viscossuplementação à medicina regenerativa — e adiar a prótese.",
    keyword: "artrose de joelho sem cirurgia",
    excerpt:
      "Reduzir a dor e adiar a prótese é possível. Conheça as opções não cirúrgicas para a artrose de joelho e para quem elas são indicadas.",
    category: { label: "Joelho", href: "/joelho/artrose" },
    publishedAt: "2025-02-11",
    readMinutes: 6,
    sections: [
      {
        h2: "Por que a artrose dói",
        body: [
          "A artrose desgasta a cartilagem que protege a articulação, gerando dor, rigidez e limitação ao caminhar. O objetivo do tratamento é reduzir a dor, preservar a função e adiar — ou evitar — a prótese.",
        ],
      },
      {
        h2: "Opções sem cirurgia",
        body: [
          "Medidas de reforço muscular e controle de peso, viscossuplementação (que lubrifica a articulação) e medicina regenerativa compõem o arsenal conservador, indicado especialmente em casos iniciais e moderados.",
        ],
      },
      {
        h2: "Para quem é indicado",
        body: [
          "A escolha depende do grau da artrose, dos sintomas e da resposta individual, sempre definidos em avaliação com exame e imagem.",
        ],
      },
    ],
    faq: [
      { q: "Dá para evitar a prótese?", a: "Em muitos casos é possível adiar a prótese com tratamento conservador, sobretudo quando a artrose é diagnosticada cedo." },
    ],
  },
  {
    slug: "medicina-regenerativa-funciona-o-que-dizem-as-evidencias",
    title: "Medicina regenerativa funciona? O que dizem as evidências",
    metaTitle: "Medicina Regenerativa Funciona? O Que Dizem as Evidências",
    description:
      "O que é a medicina regenerativa em ortopedia, para quais casos é indicada e o que a evidência atual mostra sobre resultados. Entenda com clareza.",
    keyword: "medicina regenerativa funciona",
    excerpt:
      "Entre o exagero e o ceticismo, o que a evidência realmente mostra sobre a medicina regenerativa na ortopedia — e para quais casos ela faz sentido.",
    category: { label: "Tratamentos", href: "/tratamentos/medicina-regenerativa" },
    publishedAt: "2025-02-25",
    readMinutes: 7,
    sections: [
      {
        h2: "O que é medicina regenerativa",
        body: [
          "A medicina regenerativa reúne procedimentos que estimulam a recuperação natural das articulações e tecidos, aplicados com precisão — muitas vezes guiados por ultrassom.",
        ],
      },
      {
        h2: "Para quais casos faz sentido",
        body: [
          "É mais utilizada em artrose inicial e moderada, lesões tendíneas e articulares selecionadas, sempre com indicação individualizada e expectativa realista de resultado.",
        ],
      },
      {
        h2: "O que esperar",
        body: [
          "Os resultados variam conforme o caso e o grau da lesão. Uma avaliação criteriosa é o que separa a indicação adequada da promessa exagerada.",
        ],
      },
    ],
    faq: [
      { q: "Medicina regenerativa serve para qualquer dor?", a: "Não. A indicação é específica e depende do diagnóstico. Nem todo caso se beneficia — por isso a avaliação é essencial." },
    ],
  },
  {
    slug: "infiltracao-guiada-por-ultrassom-o-que-esperar",
    title: "Infiltração guiada por ultrassom: o que esperar",
    metaTitle: "Infiltração Guiada por Ultrassom: O Que Esperar",
    description:
      "Como é a infiltração guiada por ultrassom, por que a precisão importa e o que esperar do procedimento e da recuperação. Guia simples e direto.",
    keyword: "infiltração guiada por ultrassom o que esperar",
    excerpt:
      "Precisão milimétrica e recuperação ambulatorial. Entenda como funciona a infiltração guiada por ultrassom e o que esperar antes e depois.",
    category: { label: "Tratamentos", href: "/tratamentos/infiltracao-guiada-por-ultrassom" },
    publishedAt: "2025-03-11",
    readMinutes: 5,
    sections: [
      {
        h2: "Por que a precisão importa",
        body: [
          "Guiar a aplicação por ultrassom permite levar a medicação exatamente ao ponto da dor, com mais segurança e menos desconforto do que a técnica às cegas.",
        ],
      },
      {
        h2: "Como é o procedimento",
        body: [
          "É realizado em ambiente ambulatorial, costuma ser rápido e minimamente desconfortável. Na maioria dos casos o paciente retoma as atividades logo em seguida, conforme orientação.",
        ],
      },
      {
        h2: "O que esperar depois",
        body: [
          "A resposta varia conforme a condição tratada. O acompanhamento define se e quando novas aplicações são necessárias.",
        ],
      },
    ],
    faq: [
      { q: "A infiltração guiada dói?", a: "O desconforto costuma ser pequeno. A orientação por ultrassom torna o procedimento mais preciso e confortável." },
    ],
  },
];

// ── Helpers ──────────────────────────────────────────────────
export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
export const allPostParams = posts.map((p) => ({ slug: p.slug }));
export const postsByDateDesc = [...posts].sort((a, b) =>
  a.publishedAt < b.publishedAt ? 1 : -1,
);
