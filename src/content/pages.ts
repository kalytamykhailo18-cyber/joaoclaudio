// Conteúdo textual das páginas estáticas (heróis e blocos). É o fallback e a base
// de exibição; quando o global "pages" do Payload existir, sobrescreve estes valores
// (edição inline por seção). Campos vazios mantêm o default.
export const pagesDefault = {
  // Rodapé (compartilhado em todo o site).
  footer: {
    tagline: "Referência em ortopedia e tratamento da dor crônica em Goiânia, com foco em recuperação funcional e atendimento humano.",
    colAreas: "Áreas",
    colTreatments: "Tratamentos",
    colMore: "Mais",
    colContact: "Contato",
    reviewsSuffix: "avaliações no Google",
    rights: "Todos os direitos reservados",
  },
  // Páginas legais (política de privacidade, cookies, termos).
  legal: {
    eyebrow: "Documento legal",
    privacy: "Respeitamos a sua privacidade. Os dados que você informa são usados apenas para contato e agendamento e não são compartilhados com terceiros sem a sua autorização. Para solicitar acesso, correção ou exclusão dos seus dados, fale com a clínica.",
    cookies: "Este site utiliza cookies para melhorar a sua navegação e medir o desempenho das páginas. Ao continuar navegando, você concorda com o uso de cookies. É possível desativá-los nas configurações do seu navegador.",
    terms: "O conteúdo deste site tem caráter informativo e educativo e não substitui uma consulta médica. Ao utilizá-lo, você concorda em fazê-lo de forma lícita e responsável. Para orientação sobre o seu caso, agende uma avaliação.",
  },
  // Bloco de avaliações do Google (home).
  reviews: {
    eyebrow: "Reconhecimento dos pacientes",
    heading: "A confiança de quem já foi atendido.",
    verified: "Perfil verificado",
    fallbackQuote: "Convivi anos com dor no joelho achando que só a cirurgia resolveria. Com o tratamento certo, voltei a caminhar e a dormir sem dor. Atendimento humano do começo ao fim.",
    button: "Ver avaliações no Google",
  },
  // Carrossel de depoimentos (home).
  testimonials: {
    eyebrow: "Depoimentos",
    heading: "Histórias de quem voltou a viver sem dor.",
    note: "Depoimentos ilustrativos de layout, serão substituídos pelas avaliações reais do Google.",
  },
  // Faixa de CTA (aparece em quase todas as páginas).
  cta: {
    eyebrow: "Agende sua avaliação",
    h2main: "Descubra a origem",
    h2serif: "da sua dor.",
    button: "Falar no WhatsApp",
  },
  // Índice de tratamentos (/tratamentos).
  // SEO editável (title/description) das páginas estáticas/institucionais.
  // Servido como default via mergeSection; sobrescrito quando o médico edita inline.
  seo: {
    homeTitle: "Dr. João Cláudio Miranda — Ortopedia e Tratamento da Dor | Goiânia",
    homeDescription:
      "Referência em ortopedia e tratamento da dor crônica em Goiânia. Coluna, joelho, ombro e quadril com medicina regenerativa e infiltrações guiadas por ultrassom.",
    sobreTitle: "Sobre o Dr. João Cláudio Miranda",
    sobreDescription:
      "Conheça o Dr. João Cláudio Miranda — ortopedista especializado em dor crônica em Goiânia. Titular SBOT, perito TRF1, membro IASP, professor e coordenador.",
    contatoTitle: "Contato e Localização em Goiânia",
    contatoDescription:
      "Endereço, telefone e WhatsApp do consultório do Dr. João Cláudio Miranda no Setor Marista, Goiânia. Fale conosco e agende sua avaliação.",
    agendarTitle: "Agendar Consulta com Ortopedista em Goiânia",
    agendarDescription:
      "Agende sua avaliação com o Dr. João Cláudio Miranda em Goiânia. Atendimento por WhatsApp e telefone, com horário que cabe na sua rotina.",
    depoimentosTitle: "Depoimentos de Pacientes",
    depoimentosDescription:
      "A avaliação de quem já foi atendido pelo Dr. João Cláudio Miranda em Goiânia — 5,0 estrelas e centenas de avaliações no Google.",
    dorCronicaTitle: "Tratamento para Dor Crônica em Goiânia",
    dorCronicaDescription:
      "Dor crônica que não passa? Diagnóstico preciso e tratamento especializado em Goiânia para coluna, joelho, ombro e quadril, com abordagem sem cirurgia como 1ª opção.",
    blogTitle: "Blog de Ortopedia e Dor Crônica",
    blogDescription:
      "Conteúdo educativo sobre dor crônica, coluna, joelho, ombro e quadril — do Dr. João Cláudio Miranda, ortopedista em Goiânia.",
    tratamentosTitle: "Tratamentos de Dor Sem Cirurgia",
    tratamentosDescription:
      "Tratamentos modernos de dor em Goiânia: medicina regenerativa, infiltração guiada por ultrassom, ondas de choque e viscossuplementação.",
  },
  treatmentsIndex: {
    eyebrow: "Tratamentos",
    h1: "Tecnologia a serviço do alívio da dor",
    p: "Recursos modernos que tratam a causa da dor e adiam — ou evitam — a cirurgia.",
  },
  // Índice do blog (/blog).
  blogIndex: {
    eyebrow: "Blog",
    h1: "Conhecimento que tira você da dor",
    p: "Artigos claros sobre dor crônica e ortopedia — para você entender sua condição e as opções de tratamento antes mesmo da consulta.",
  },
  // Sobre o médico (/sobre).
  sobre: {
    eyebrow: "O médico",
    h1: "Autoridade médica com escuta de gente",
    lead: "O médico dedica sua prática ao tratamento da dor crônica e das doenças ortopédicas, unindo diagnóstico preciso, técnicas modernas e uma relação próxima com cada paciente.",
    credsHeading: "Formação e credenciais",
    bio: "O Dr. João Cláudio Miranda é médico especialista em cirurgia ortopédica, trauma musculoesquelético e dor crônica, com mais de 15 anos dedicados ao tratamento da dor e das doenças do aparelho locomotor. Formou-se em serviços de referência de Goiânia — o Hospital de Urgências de Goiânia (HUGO) e o Centro Estadual de Reabilitação e Readaptação (CRER). É titular da Sociedade Brasileira de Ortopedia e Traumatologia (SBOT), membro da IASP (Associação Internacional para o Estudo da Dor) e perito da Justiça Federal (TRF1), além de coordenador de Ortopedia e Traumatologia do Hospital Amparo, em Goiânia. Sua prática prioriza o diagnóstico preciso e as opções sem cirurgia sempre que possível, com um plano de tratamento individual para cada paciente — do diagnóstico ao acompanhamento.",
  },
  // Credenciais listadas na página Sobre (array editável).
  sobreCreds: [
    { text: "Título de Especialista (TEOT) · CRM-GO 22.782 · RQE 15206" },
    { text: "Titular da Sociedade Brasileira de Ortopedia e Traumatologia (SBOT)" },
    { text: "Membro da IASP, associação internacional para o estudo da dor" },
    { text: "Perito da Justiça Federal (TRF1)" },
    { text: "Coordenador de Ortopedia e Traumatologia do Hospital Amparo (Goiânia)" },
    { text: "Formação em serviços de referência: HUGO e CRER (Goiânia)" },
  ],
  // Contato (/contato).
  contato: {
    eyebrow: "Contato",
    h1: "Agende sua avaliação",
    lead: "Marque uma avaliação e receba um plano de tratamento pensado para o seu caso.",
    proseHeading: "Fale com a clínica",
    whatsappBtn: "Falar no WhatsApp",
    phoneBtn: "Ligar agora",
    note: "Atendemos em Goiânia com horário marcado. Envie uma mensagem no WhatsApp ou ligue, e a equipe retorna com os horários disponíveis.",
  },
  // Agendar (/agendar).
  agendar: {
    eyebrow: "Agende sua avaliação",
    h1: "Comece hoje a tratar a origem da sua dor",
    lead: "Agende uma avaliação com o médico e receba um plano de tratamento pensado para o seu caso.",
    stepsEyebrow: "Como funciona",
    stepsHeading: "Do primeiro contato ao plano de tratamento.",
    stepsSub: "Um caminho simples e direto, do agendamento à consulta.",
    locHeading: "Onde fica a clínica",
    locNote: "Atendimento com horário marcado. Fale pelo WhatsApp para confirmar o melhor dia e horário.",
  },
  // Passos do agendamento (array editável).
  agendarSteps: [
    { t: "Fale com a clínica", d: "Envie uma mensagem no WhatsApp ou ligue. A equipe retorna com os horários disponíveis." },
    { t: "Escolha o melhor horário", d: "Agende a avaliação no dia e período que couberem na sua rotina." },
    { t: "Avaliação com o médico", d: "Diagnóstico preciso com exame clínico e análise de imagem para identificar a origem da dor." },
    { t: "Plano de tratamento", d: "Você sai da consulta com um plano individual, priorizando as opções sem cirurgia." },
  ],
  // Depoimentos (/depoimentos).
  depoimentos: {
    eyebrow: "Reconhecimento dos pacientes",
    h1: "A confiança de quem já foi atendido",
    lead: "A reputação da clínica é construída consulta a consulta. Veja a avaliação real dos pacientes no perfil verificado do Google.",
    note: "As avaliações individuais dos pacientes são exibidas diretamente do perfil oficial do Google, garantindo autenticidade. Clique abaixo para ler todas.",
    button: "Ver avaliações no Google",
  },
  // Rótulos compartilhados das páginas de região (/[region]).
  regionPage: {
    careEyebrow: "Área de cuidado",
    condsEyebrow: "Condições que tratamos",
    condsHeadingPrefix: "Encontre a sua condição em",
    cardCta: "Ver tratamento →",
  },
  // Rótulos compartilhados das páginas de tratamento (/tratamentos/[treatment]).
  treatmentPage: {
    eyebrow: "Tratamento",
    howHeading: "Como funciona",
    appsHeading: "Aplicações por condição",
  },
  // Rótulos das páginas tratamento × condição (/tratamentos/[treatment]/[condition]).
  txPage: {
    eyebrow: "Tratamento aplicado",
    heroConnector: "com procedimento guiado e recuperação ambulatorial em",
    prosePlaceholder: "O procedimento é indicado após avaliação individual e realizado em ambiente ambulatorial, com técnica precisa e orientação de recuperação para cada paciente. Agende uma avaliação para confirmar se é a melhor opção para o seu caso.",
  },
  // Dor crônica (/dor-cronica).
  dorCronica: {
    eyebrow: "Dor crônica",
    h1: "Tratamento para Dor Crônica em Goiânia",
    lead: "A dor que persiste por mais de três meses tem causa e tratamento. O primeiro passo é o diagnóstico preciso, que define a origem e orienta a conduta, sempre priorizando as opções sem cirurgia.",
    introH2: "Cada dor tem uma origem específica",
    introP1: "Dor crônica não é um diagnóstico único: pode vir da coluna, do joelho, do ombro ou do quadril, com mecanismos diferentes. Encontrar a causa exata é o que separa o alívio temporário do resultado que dura.",
    introP2: "Abaixo, escolha a região da sua dor para ver as condições e os tratamentos indicados.",
    faqHeading: "Perguntas frequentes",
    areasEyebrow: "Áreas de cuidado",
    areasHeading: "Onde está a sua dor?",
    promoTitle: "Tratamentos",
  },
  // FAQ da página de dor crônica (array editável).
  dorCronicaFaq: [
    { q: "O que é considerado dor crônica?", a: "É a dor que persiste por mais de três meses, além do tempo esperado de recuperação de uma lesão. Ela exige investigar a causa, e não apenas aliviar o sintoma." },
    { q: "Dor crônica sempre precisa de cirurgia?", a: "Não. Na maioria dos casos, o tratamento conservador e os procedimentos guiados resolvem, e a cirurgia fica reservada para situações específicas." },
    { q: "Qual especialista trata dor crônica?", a: "Um ortopedista com foco em medicina da dor consegue diagnosticar a origem e conduzir o tratamento, priorizando as opções sem cirurgia." },
  ],
};

export type PagesContent = typeof pagesDefault;
