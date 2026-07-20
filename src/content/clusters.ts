// ─────────────────────────────────────────────────────────────
// Arquitetura de SEO em cluster (Etapa 1) como dados.
// Cada entrada gera uma página estática (SSG) + item no sitemap + Schema.
// pilar (região) > filha (condição) > neto (tratamento × condição)
// TODO(handoff): estas coleções viram tabelas no Payload CMS.
// ─────────────────────────────────────────────────────────────

export type Condition = {
  id?: string | number; // id do documento no CMS (para edição inline)
  slug: string;
  name: string;
  h1: string;
  title: string;        // <title> / meta title
  description: string;  // meta description
  keyword: string;      // keyword-alvo principal
  intro: string;
  whatIs?: string;      // parágrafo "O que é" (editável; vazio = texto padrão)
  howTreat?: string;    // parágrafo "Como o médico trata" (editável)
  siblings?: string[];  // slugs de condições irmãs (link lateral)
  treatments?: string[]; // slugs de tratamentos relacionados
  faq?: { q: string; a: string }[];
};

export type Region = {
  id?: string | number;
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
  id?: string | number;
  slug: string;
  name: string;
  short: string;
  h1: string;
  title: string;
  description: string;
  keyword: string;
  intro: string;
  tag: string;
  howWorks?: string; // parágrafo "Como funciona" (editável; vazio = usa a introdução)
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
        whatIs:
          "A hérnia de disco acontece quando o disco entre as vértebras se desloca e passa a pressionar estruturas nervosas, gerando dor que pode irradiar para o braço ou a perna, além de formigamento e fraqueza. É mais comum nas regiões lombar e cervical. Vale saber que o tamanho da hérnia nem sempre corresponde à intensidade dos sintomas — por isso o diagnóstico combina avaliação clínica e exame de imagem para confirmar a real causa da dor.",
        howTreat:
          "O tratamento começa pelas opções sem cirurgia: controle da dor, reabilitação orientada e, quando indicado, procedimentos guiados por ultrassom aplicados com precisão perto da raiz nervosa. A medicina regenerativa pode ser considerada em casos selecionados. A cirurgia fica reservada a situações específicas, como déficit neurológico progressivo, e é sempre discutida caso a caso.",
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
        whatIs:
          "A dor lombar é a dor na parte baixa das costas, uma das queixas mais frequentes do consultório. Pode ter origem muscular, articular ou discal, e é considerada crônica quando persiste por mais de três meses. Nem toda dor lombar tem a mesma causa — identificá-la com precisão é o que orienta o tratamento certo para cada pessoa.",
        howTreat:
          "A conduta prioriza medidas conservadoras: orientação de postura e carga, fortalecimento guiado por fisioterapia e controle da dor. Quando a dor persiste, a infiltração guiada por ultrassom pode ser aplicada no ponto exato para reduzir a dor e permitir a reabilitação. O objetivo é tratar a causa, não apenas silenciar o sintoma.",
        siblings: ["hernia-de-disco", "dor-ciatica"],
        treatments: ["infiltracao-guiada-por-ultrassom", "ondas-de-choque"],
        faq: [
          { q: "Por que minha dor lombar não passa?", a: "Dor lombar persistente costuma ter uma causa específica — discal, articular ou muscular — que precisa ser identificada por avaliação e imagem." },
          { q: "Preciso operar a coluna?", a: "Na grande maioria dos casos, não. O tratamento conservador e os procedimentos guiados resolvem a maior parte das dores lombares." },
          { q: "A infiltração ajuda na dor lombar?", a: "Pode reduzir a dor em casos selecionados e permitir avançar na reabilitação; a indicação é sempre definida na avaliação." },
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
        whatIs:
          "A dor cervical, ou cervicalgia, é a dor na região do pescoço, que pode se estender para os ombros e a cabeça e, às vezes, irradiar para o braço quando há compressão de uma raiz nervosa. Costuma estar ligada à postura, à sobrecarga e a alterações da coluna cervical. A avaliação define se a origem é muscular, articular ou discal.",
        howTreat:
          "O tratamento une reabilitação, correção de postura e controle da dor, com procedimentos guiados por ultrassom quando há um ponto específico a tratar. A proposta é aliviar a dor e recuperar a mobilidade sem depender de medicação contínua, reservando abordagens maiores apenas para casos que realmente exigem.",
        siblings: ["hernia-de-disco", "dor-lombar"],
        treatments: ["infiltracao-guiada-por-ultrassom", "ondas-de-choque"],
        faq: [
          { q: "Dor cervical pode causar dor no braço?", a: "Sim. Quando há compressão de uma raiz nervosa no pescoço, a dor e o formigamento podem irradiar para o braço." },
          { q: "Quando devo fazer exame de imagem?", a: "A necessidade é definida na avaliação, de acordo com os sintomas e eventuais sinais de alerta." },
          { q: "Tem tratamento sem depender de remédio contínuo?", a: "Sim. A combinação de reabilitação e, quando indicado, procedimentos guiados busca resolver a causa e reduzir o uso prolongado de medicação." },
        ],
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
        whatIs:
          "A dor ciática é a dor que segue o trajeto do nervo ciático, descendo da região lombar para a nádega e a perna, às vezes com formigamento ou fraqueza. Na maioria das vezes é um sintoma de outra causa — como uma hérnia de disco que pressiona a raiz nervosa — e não uma doença isolada. Por isso, tratar a ciática começa por descobrir o que a provoca.",
        howTreat:
          "A abordagem inicial é conservadora: controle da dor, reabilitação e orientação de atividades. Quando a dor é intensa ou persistente, a infiltração guiada por ultrassom pode ser aplicada perto da raiz nervosa para aliviar e permitir a recuperação. A cirurgia é exceção, considerada apenas em casos selecionados.",
        siblings: ["hernia-de-disco", "dor-lombar"],
        treatments: ["infiltracao-guiada-por-ultrassom"],
        faq: [
          { q: "Ciática e hérnia de disco são a mesma coisa?", a: "Não. A ciática costuma ser um sintoma, e a hérnia de disco é uma das causas possíveis dessa dor." },
          { q: "Quanto tempo dura uma crise de ciática?", a: "Varia de pessoa para pessoa; muitas crises melhoram em semanas com o tratamento adequado." },
          { q: "Preciso operar?", a: "Na maioria dos casos, não. A cirurgia é reservada a situações específicas, definidas em conjunto na avaliação." },
        ],
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
        whatIs:
          "O manguito rotador é o conjunto de tendões que estabiliza o ombro e permite levantar e girar o braço. A lesão pode ser por desgaste ou trauma e provoca dor — muitas vezes pior à noite — e perda de força. As lesões variam de inflamação e desgaste parcial a rupturas, e o exame define a extensão de cada caso.",
        howTreat:
          "Boa parte das lesões melhora sem cirurgia, com reabilitação para recuperar força e mobilidade, controle da dor e, quando indicado, ondas de choque ou procedimentos guiados por ultrassom. A medicina regenerativa pode ser avaliada em casos selecionados. A indicação cirúrgica é discutida quando há ruptura significativa ou falha do tratamento conservador.",
        siblings: ["capsulite-adesiva", "tendinite-calcaria"],
        treatments: ["ondas-de-choque", "medicina-regenerativa"],
        faq: [
          { q: "Toda lesão do manguito precisa de cirurgia?", a: "Não. Muitas lesões melhoram com reabilitação e procedimentos guiados; a cirurgia é reservada a casos específicos." },
          { q: "Consigo recuperar a força do ombro?", a: "Na maioria dos casos, sim, com o tratamento adequado e a reabilitação orientada." },
          { q: "As ondas de choque ajudam?", a: "Podem auxiliar em casos selecionados, associadas à reabilitação, conforme a avaliação." },
        ],
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
        whatIs:
          "A capsulite adesiva, conhecida como ombro congelado, é a inflamação e o espessamento da cápsula que envolve a articulação, deixando o ombro dolorido e progressivamente rígido. Costuma evoluir em fases — dor, rigidez e recuperação — e pode durar meses. É mais frequente em algumas condições, como o diabetes, e o diagnóstico é essencialmente clínico.",
        howTreat:
          "O tratamento foca em aliviar a dor e recuperar a amplitude de movimento, com reabilitação orientada e, na fase inflamatória, infiltração guiada por ultrassom quando indicada. A evolução é gradual e o acompanhamento ajuda a encurtar o tempo de recuperação e a devolver o uso do braço no dia a dia.",
        siblings: ["manguito-rotador", "tendinite-calcaria"],
        treatments: ["infiltracao-guiada-por-ultrassom"],
        faq: [
          { q: "Ombro congelado melhora sozinho?", a: "Pode melhorar com o tempo, mas o tratamento tende a acelerar a recuperação e a reduzir a dor no processo." },
          { q: "Quanto tempo dura?", a: "Varia bastante, de alguns meses a mais de um ano, dependendo da fase e do acompanhamento." },
          { q: "A infiltração ajuda?", a: "Na fase inflamatória, pode reduzir a dor e a rigidez em casos selecionados, conforme a avaliação." },
        ],
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
        whatIs:
          "A tendinite calcária é a formação de um depósito de cálcio em um dos tendões do ombro, com frequência no manguito rotador. Pode causar dor intensa e súbita, que piora com o movimento e à noite. Nem sempre a causa é definida, e o diagnóstico é confirmado por exame de imagem que localiza a calcificação.",
        howTreat:
          "A abordagem é sem cirurgia na maioria dos casos: controle da dor, reabilitação e terapia por ondas de choque, que estimula a reabsorção do cálcio e a recuperação do tendão. Procedimentos guiados por ultrassom podem ser usados em situações específicas. A cirurgia é reservada a poucos casos que não respondem ao tratamento.",
        siblings: ["manguito-rotador", "capsulite-adesiva"],
        treatments: ["ondas-de-choque"],
        faq: [
          { q: "O que causa a tendinite calcária?", a: "É um depósito de cálcio no tendão cuja causa nem sempre é definida; o exame de imagem confirma o diagnóstico." },
          { q: "As ondas de choque resolvem?", a: "Podem reduzir a dor e ajudar a reabsorver o cálcio em casos selecionados, conforme a avaliação." },
          { q: "Preciso operar?", a: "A cirurgia é reservada aos poucos casos que não melhoram com o tratamento conservador." },
        ],
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
        whatIs:
          "A artrose do joelho, ou gonartrose, é o desgaste progressivo da cartilagem que reveste a articulação, o que gera dor, rigidez e dificuldade para caminhar, subir escadas ou levantar. Costuma avançar com o tempo e com fatores como idade, sobrecarga e lesões antigas. A artrose não tem cura, mas a dor e a progressão podem ser controladas.",
        howTreat:
          "O objetivo é reduzir a dor, preservar a função e adiar a cirurgia de prótese sempre que possível. O plano combina fortalecimento e controle de peso com opções aplicadas na articulação, como a viscossuplementação e a medicina regenerativa, indicadas conforme o grau da artrose. A prótese entra apenas nos casos avançados, discutida individualmente.",
        siblings: ["lesao-meniscal", "lesao-ligamentar"],
        treatments: ["medicina-regenerativa", "viscossuplementacao"],
        faq: [
          { q: "A medicina regenerativa substitui a prótese de joelho?", a: "Ela pode adiar a necessidade da prótese e melhorar a qualidade de vida, especialmente em casos iniciais e moderados." },
          { q: "Quantas sessões são necessárias?", a: "Depende do grau da artrose e da resposta individual, avaliados na consulta." },
          { q: "Artrose tem cura?", a: "Não tem cura, mas a dor e a progressão podem ser controladas com o tratamento adequado." },
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
        whatIs:
          "O menisco é uma estrutura de amortecimento dentro do joelho, e sua lesão pode ocorrer por trauma, em pessoas mais jovens, ou por desgaste, em quem tem mais idade. Os sintomas incluem dor, inchaço, estalos e, às vezes, sensação de travamento do joelho. O tipo de lesão orienta a conduta.",
        howTreat:
          "Nem toda lesão de menisco precisa de cirurgia — as lesões por desgaste costumam responder bem ao tratamento conservador, com reabilitação e controle da dor, e a medicina regenerativa pode ser considerada em casos selecionados. A cirurgia é indicada em lesões específicas ou quando os sintomas persistem, sempre após avaliação criteriosa.",
        siblings: ["artrose", "lesao-ligamentar"],
        treatments: ["medicina-regenerativa"],
        faq: [
          { q: "Toda lesão de menisco opera?", a: "Não. Lesões degenerativas costumam responder ao tratamento conservador; a cirurgia é reservada a casos específicos." },
          { q: "O que é o travamento do joelho?", a: "É a sensação de bloqueio ao movimentar o joelho, que deve ser avaliada por um especialista." },
          { q: "Quando a cirurgia é indicada?", a: "Em determinados tipos de lesão e quando há sintomas persistentes, conforme a avaliação." },
        ],
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
        whatIs:
          "Os ligamentos estabilizam o joelho, e o ligamento cruzado anterior (LCA) é um dos mais lesionados, geralmente em torções e atividades esportivas. A lesão pode causar dor, inchaço e sensação de que o joelho falha ou sai do lugar. A avaliação define o grau da lesão e o quanto ela compromete a estabilidade.",
        howTreat:
          "A conduta depende da estabilidade do joelho, da idade e do nível de atividade. Muitos casos evoluem bem com reabilitação para fortalecer e estabilizar a articulação; quando há instabilidade importante, a reconstrução cirúrgica pode ser indicada. A decisão é sempre individual, com metas realistas de recuperação.",
        siblings: ["artrose", "lesao-meniscal"],
        treatments: ["medicina-regenerativa"],
        faq: [
          { q: "Toda ruptura de LCA precisa de cirurgia?", a: "Não necessariamente; depende da instabilidade, da idade e do nível de atividade de cada pessoa." },
          { q: "Consigo voltar a praticar esporte?", a: "Em muitos casos, sim, após a reabilitação adequada e a liberação do especialista." },
          { q: "Quanto tempo de recuperação?", a: "Varia conforme o tipo de lesão e o tratamento escolhido, definido na avaliação." },
        ],
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
        whatIs:
          "A artrose do quadril, ou coxartrose, é o desgaste da cartilagem da articulação do quadril, que provoca dor — muitas vezes na virilha — rigidez e dificuldade para caminhar e calçar sapatos. Tende a progredir com o tempo, mas o ritmo e o impacto na vida variam bastante de pessoa para pessoa.",
        howTreat:
          "O foco é controlar a dor e preservar a mobilidade, com fisioterapia, orientação de atividades e controle de peso, além de infiltração guiada por ultrassom e medicina regenerativa quando indicadas. Muitos pacientes se mantêm bem por anos com o tratamento conservador, deixando a prótese para os casos mais avançados.",
        siblings: ["bursite-trocanterica"],
        treatments: ["medicina-regenerativa", "infiltracao-guiada-por-ultrassom"],
        faq: [
          { q: "Artrose de quadril sempre vira prótese?", a: "Não. Muitos casos são controlados por anos com tratamento conservador; a prótese fica para os casos avançados." },
          { q: "Que exercícios ajudam?", a: "Os indicados por fisioterapia, ajustados a cada caso para fortalecer e proteger a articulação." },
          { q: "A infiltração no quadril é segura?", a: "Quando guiada por imagem, é um procedimento preciso; a indicação depende da avaliação individual." },
        ],
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
        whatIs:
          "A bursite trocantérica é a inflamação da bolsa que amortece a lateral do quadril, causando dor nessa região que piora ao deitar sobre o lado afetado, subir escadas ou caminhar. Costuma estar associada à sobrecarga e a alterações do movimento, e o diagnóstico é principalmente clínico.",
        howTreat:
          "Na grande maioria das vezes melhora sem cirurgia: reabilitação para corrigir a sobrecarga, controle da dor e, quando indicado, ondas de choque ou infiltração guiada por ultrassom no ponto inflamado. O tratamento busca não só aliviar a dor, mas corrigir o que a provocou, reduzindo a chance de retorno.",
        siblings: ["artrose"],
        treatments: ["ondas-de-choque", "infiltracao-guiada-por-ultrassom"],
        faq: [
          { q: "Bursite no quadril é grave?", a: "Geralmente não é grave, mas pode ser bastante limitante e incômoda no dia a dia." },
          { q: "Melhora sem cirurgia?", a: "Sim. A grande maioria dos casos responde bem ao tratamento conservador." },
          { q: "As ondas de choque ajudam?", a: "Podem auxiliar quando associadas à reabilitação, conforme a avaliação individual." },
        ],
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
    howWorks:
      "A medicina regenerativa reúne procedimentos que estimulam a capacidade natural de recuperação dos tecidos, com o objetivo de reduzir a dor e melhorar a função de articulações e tendões. É indicada após avaliação individual — mais comumente na artrose e em algumas lesões de tendão e menisco — e aplicada em ambiente ambulatorial, muitas vezes com orientação por ultrassom. Os resultados variam conforme o caso, e a proposta é adiar ou evitar cirurgias maiores quando possível, sem promessa de cura.",
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
    howWorks:
      "Na infiltração guiada por ultrassom, o médico acompanha a agulha em tempo real na tela do aparelho e aplica a medicação exatamente no ponto que gera a dor. Essa precisão aumenta a segurança e tende a melhorar o resultado em comparação com a aplicação às cegas. O procedimento é ambulatorial, feito com anestesia local, costuma ser bem tolerado e permite retornar às atividades com orientações; o número de aplicações depende da condição tratada.",
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
    howWorks:
      "A terapia por ondas de choque usa ondas acústicas aplicadas sobre a região dolorida para estimular a circulação e a recuperação do tecido, sendo útil em tendinopatias como a tendinite calcária, a bursite e a fascite plantar. É um tratamento não invasivo, feito em sessões no consultório, com desconforto tolerável durante a aplicação. O número de sessões é definido conforme a indicação, geralmente algumas ao longo de semanas.",
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
    howWorks:
      "A viscossuplementação consiste na aplicação de ácido hialurônico dentro da articulação para melhorar a lubrificação, reduzir o atrito e aliviar a dor da artrose, com destaque para o joelho. É indicada em graus específicos de artrose, definidos na avaliação, e realizada em ambiente ambulatorial — quando necessário, guiada por ultrassom para maior precisão. O número de aplicações e a duração do efeito variam de pessoa para pessoa.",
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
