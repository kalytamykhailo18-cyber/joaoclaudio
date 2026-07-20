// Textos estruturais/compartilhados de toda a interface (nav, breadcrumb, chips,
// rótulos de seção, 404, login, editor, etc.). Fonte de exibição + fallback; o
// global "ui" do Payload sobrescreve campo a campo. Nada de texto fixo nas páginas.
export const uiDefault = {
  // Navegação (header + rodapé)
  nav: {
    contato: "Contato",
    tratamentos: "Tratamentos",
    dorCronica: "Dor crônica",
    oMedico: "O médico",
    blog: "Blog",
    depoimentos: "Depoimentos",
    agendar: "Agendar",
    acesso: "Acesso",
    entrar: "Entrar",
    sair: "Sair",
    colAreas: "Áreas",
    colMais: "Mais",
    privacidade: "Política de Privacidade",
    cookies: "Cookies",
    termos: "Termos de Uso",
  },
  // Breadcrumb (rótulos raiz)
  breadcrumb: { inicio: "Início", tratamentos: "Tratamentos" },
  // Rótulos de links/chips
  chips: {
    verCondicoes: "Ver condições →",
    verTratamento: "Ver tratamento →",
    saibaMais: "Saiba mais →",
    lerArtigo: "Ler artigo →",
    explorar: "Explorar →",
    sobre: "Sobre", // prefixo de "Sobre {x} →"
    ver: "Ver", // prefixo de "Ver {x} →"
    conhecaMedico: "Conheça o médico →",
  },
  // Rótulos das páginas de condição
  conditionPage: {
    oQue: "O que é",
    comoTrata: "Como o Dr. João Cláudio trata",
    tratamentosIndicados: "Tratamentos indicados",
    perguntasFrequentes: "Perguntas frequentes",
    condicoesRelacionadas: "Condições relacionadas",
  },
  // Página 404
  notFound: {
    eyebrow: "Erro 404",
    title: "Página não encontrada",
    text: "A página que você procura não existe ou foi movida. Encontre a sua área de cuidado:",
    button: "Voltar ao início",
    tratamentos: "Tratamentos →",
    searchPlaceholder: "Buscar por dor, condição ou tratamento...",
    searchEmpty: "Nada encontrado. Tente outro termo ou volte ao início.",
  },
  // Página "em breve"
  emBreve: {
    eyebrow: "Prévia",
    title: "Esta página entra na implementação",
    text: "A estrutura das 40 páginas já está desenhada e pronta no projeto. O conteúdo de cada página é publicado na fase de implementação. Explore a home e as páginas de amostra para ver o padrão de qualidade.",
    btnHome: "Voltar à home",
    btnSample: "Ver página de amostra",
  },
  // Login (/entrar)
  login: {
    eyebrow: "Acesso restrito",
    title: "Entrar",
    sub: "Área de administração do site. Acesse com seu e-mail e senha para editar o conteúdo.",
    email: "E-mail",
    senha: "Senha",
    button: "Entrar",
    loading: "Entrando…",
    errorAuth: "E-mail ou senha incorretos.",
    errorGeneric: "Não foi possível entrar.",
  },
  // Ferramenta de edição inline (modal + confirmação)
  editor: {
    salvar: "Salvar",
    criar: "Criar",
    cancelar: "Cancelar",
    excluir: "Excluir",
    salvando: "Salvando…",
    confirmSaveTitle: "Confirmar alteração",
    confirmCreateTitle: "Confirmar criação",
    confirmDeleteTitle: "Confirmar exclusão",
    confirmSaveMsg: "Deseja salvar as alterações?",
    confirmCreateMsg: "Deseja criar este item?",
    confirmDeleteMsg: "Tem certeza que deseja excluir? Esta ação não pode ser desfeita.",
  },
  // Blog (autor + nota + rótulos)
  blog: {
    authorCreds: "Ortopedista · Titular SBOT · Perito TRF1 · Membro IASP",
    reviewNote: "Conteúdo educativo em revisão clínica pelo Dr. João Cláudio Miranda. Esta página não substitui uma consulta médica.",
    minLeitura: "min de leitura",
    perguntasFrequentes: "Perguntas frequentes",
  },
  // Carrossel de depoimentos
  testimonials: { realNote: "Avaliações reais publicadas no Google." },
  // Rótulos de contato (contato, agendar)
  contact: {
    endereco: "Endereço:",
    telefone: "Telefone:",
    instagram: "Instagram:",
    whatsapp: "WhatsApp:",
  },
  // Rótulos de avaliações (home, depoimentos, rodapé)
  reviews: {
    avaliacoesGoogle: "avaliações no Google",
    perfilVerificado: "Perfil verificado",
  },
};

export type UIContent = typeof uiDefault;
