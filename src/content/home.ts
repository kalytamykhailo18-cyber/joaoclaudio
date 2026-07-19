// Conteúdo textual da home. É o fallback e a base de exibição; quando o global
// "home" do Payload existir, sobrescreve estes valores (edição inline por seção).
export const homeDefault = {
  hero: {
    pre: "Dr. João Cláudio Miranda, ortopedista, é referência em",
    h1: "Ortopedia e Tratamento da Dor em Goiânia",
    sub: "Especializado em dor crônica, coluna, joelho, ombro e quadril, com abordagem sem cirurgia como primeira opção.",
    tag: "Diagnóstico preciso, medicina regenerativa e infiltrações guiadas por ultrassom.",
    photoUrl: "", // foto profissional do médico (via CMS); vazio = monograma
    btnPrimary: "Agendar avaliação",
    btnSecondary: "Ver tratamentos",
  },
  intro: {
    eyebrow: "O propósito",
    h2: "Sua vida sem dor começa com o diagnóstico certo.",
    p1: "A maioria das dores crônicas melhora sem passar pela sala de cirurgia, quando a origem é identificada com precisão e o tratamento é aplicado no ponto exato.",
    p2: "É esse o caminho que o Dr. João Cláudio Miranda conduz: tecnologia moderna, mãos experientes e uma relação próxima com cada paciente.",
    link: "Conheça o médico →",
  },
  areas: {
    eyebrow: "Áreas de cuidado",
    h2: "Onde a sua dor está, o tratamento certo já existe.",
    p: "Cada região tem uma página dedicada, com as condições, os sintomas e as opções indicadas para o seu caso.",
    promoTitle: "Todos os tratamentos",
    promoText: "Medicina regenerativa, infiltrações e ondas de choque.",
  },
  band: {
    eyebrow: "A abordagem",
    h2: "Menos cirurgia. Mais precisão.",
    p: "Resultado que dura, porque trata a causa da dor, não apenas o sintoma.",
    button: "Agende sua avaliação",
  },
  steps: {
    eyebrow: "Como funciona",
    h2: "Do diagnóstico ao alívio, em quatro passos.",
    p: "Um método claro, conduzido por uma cabeça só, do primeiro exame ao acompanhamento.",
  },
  treatments: {
    eyebrow: "Tratamentos",
    h2: "Tecnologia a serviço do alívio da dor.",
    p: "Recursos modernos que tratam a causa e adiam, ou evitam, a cirurgia.",
  },
  quote: {
    text: "Meu objetivo não é apenas tratar a dor. É devolver o movimento e a qualidade de vida de cada paciente.",
    cite: "Dr. João Cláudio Miranda · Ortopedista",
  },
  stepItems: [
    { t: "Diagnóstico preciso", d: "Avaliação clínica detalhada e análise de imagem para identificar a origem real da dor." },
    { t: "Plano individual", d: "Tratamento desenhado para o seu caso — conservador primeiro, sempre que possível." },
    { t: "Procedimento guiado", d: "Infiltrações e medicina regenerativa aplicadas com precisão por ultrassom, em ambiente ambulatorial." },
    { t: "Acompanhamento", d: "Reavaliação e ajuste até você voltar a se mover sem dor." },
  ],
};

export type HomeContent = typeof homeDefault;
