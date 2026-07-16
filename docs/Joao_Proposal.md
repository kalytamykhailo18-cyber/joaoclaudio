# Site Premium para Clínica de Ortopedia e Dor Crônica — Proposta Técnica

Proposta técnica formal para o desenvolvimento do site da clínica em Next.js com CMS integrado, otimização SEO técnica avançada, integração completa com o ecossistema Google e arquitetura escalável para 100+ páginas.

Referência de qualidade aceita: **www.newyorkfacialplasticsurgery.com** (inspiração, não cópia).

---

## 1. Objetivo do sistema

Entregar uma máquina de captação de pacientes via Google, não apenas um site bonito. Cada página é feita para ranquear em busca local por tratamento, converter o clique em agendamento e sustentar autoridade da clínica ao longo do tempo.

Três valores simultâneos:

- **Paciente**: encontra a clínica pelo Google ao buscar por sua dor específica, entra no site que carrega instantâneo, encontra o tratamento certo, agenda pelo WhatsApp em um clique.
- **Clínica**: presença digital que rankeia em dezenas de termos de tratamento simultaneamente, cresce mês a mês com novo conteúdo, cada nova página ajuda no ranking das outras (link interno por cluster).
- **Médico**: painel simples para revisar e editar conteúdo clínico direto na tela, sem precisar de dev para cada ajuste.

---

## 2. Módulos funcionais

### 2.1 Estrutura de página em cluster (SEO)

Arquitetura em cluster mãe > filha, pensada para dominar dezenas de termos correlatos:

- **Cluster mãe**: página pilar (ex.: "Dor crônica"), texto de autoridade, links para todos os filhos.
- **Cluster filho**: página específica (ex.: "Dor lombar crônica"), otimizada para o termo exato, com link de volta para a mãe e para tratamentos relacionados.
- **Cluster neto**: página de tratamento aplicado à condição (ex.: "Infiltração guiada por ultrassom para dor lombar").

Cada nível herda dado estruturado da hierarquia superior, evitando duplicação e reforçando a relevância.

### 2.2 Páginas incluídas (40 iniciais)

Escopo inicial cobre pilar + filhas para os grupos que você citou:

- Dor crônica (pilar) + coluna, hérnia de disco, dor lombar, dor cervical.
- Ombro (pilar) + manguito rotador, capsulite adesiva.
- Joelho (pilar) + artrose do joelho, lesão meniscal.
- Quadril (pilar) + condições relacionadas.
- Tratamentos (grupo): medicina regenerativa, infiltrações guiadas por ultrassom, terapia por ondas de choque.
- Institucional: home, sobre o médico, contato, blog inicial (5 posts pilares).
- Páginas legais: Política de Privacidade, Política de Cookies, Termos de Uso (estrutura pronta; você fornece ou revisa o conteúdo jurídico, e o CMS renderiza).

A estrutura suporta a expansão para 100+ páginas sem refactor; cada nova especialidade é acrescentada como filha ou neta no cluster existente.

### 2.3 Design e experiência

- Paleta clara com azul marinho, tipografia sans serif limpa, tom sofisticado sem soar frio.
- Hero por página com foco na condição buscada e CTA persistente de agendamento.
- Botão WhatsApp visível no topo e no rodapé, padrão que converte no Brasil.
- Testemunho de paciente sobre alívio da dor no lugar de before/after estético.
- Foto profissional do médico + credenciais + logos de mídia (quando você tiver).
- Blocos de tratamento com descrição clara, indicação, o que esperar, agendamento direto.
- Responsivo pixel a pixel (celular, tablet, desktop).

### 2.4 SEO técnico avançado

- **Páginas geradas estáticas** (SSG): abrem em menos de 1 segundo, mesmo em 4G fraco.
- **Imagens em WebP** com dimensão correta por breakpoint (celular, tablet, desktop).
- **CSS crítico inline** para o above-the-fold, JS mínimo, zero plugin desnecessário.
- **URLs semânticas** por especialidade e tratamento (ex.: `/tratamentos/dor-lombar-cronica`).
- **Schema.org médico completo**: Physician, MedicalClinic, MedicalSpecialty, MedicalCondition, MedicalTherapy.
- **FAQ Schema (FAQPage)** injetado nas páginas que contêm perguntas frequentes (rich snippet no Google).
- **Breadcrumb Schema (BreadcrumbList)** em todas as páginas de cluster, para navegação e SEO.
- **Sitemap.xml dinâmico** atualizado automaticamente quando você publica nova página.
- **Robots.txt** configurado corretamente para indexação seletiva.
- **Canonical tag** automático por página.
- **Redirecionamentos 301** configuráveis pelo painel para futuras alterações de URL, sem perder ranking.
- **Meta tags únicas** por página (title, description, OG), geradas pelo CMS a partir do conteúdo.
- **Estrutura de link interno em cluster** entre páginas mãe, filha e tratamento.
- **Página 404 personalizada** com busca interna e links para as principais especialidades e tratamentos (recupera visitante em vez de perder o clique).

**Meta de Core Web Vitals**: 95+ em todas as três métricas (LCP, INP, CLS).

### 2.5 Integração com ecossistema Google

- **Google Search Console** configurado, sitemap enviado, indexação verificada.
- **Google Analytics 4** com eventos de conversão configurados (clique WhatsApp, envio formulário, telefone clicado).
- **Google Tag Manager** para gerenciamento de tags, pixel e futuras campanhas.
- **Google Ads pronto**: parâmetros UTM tratados, página de destino pronta para campanha, remarketing tag preparado.
- **Google My Business** integrado no rodapé (mapa e avaliações puxadas em tempo real).

### 2.6 CMS integrado

- Painel admin visual (login com email + senha).
- Editar título, texto, imagem e schema de cada página sem código.
- Publicar novo post no blog em 5 minutos.
- Preview antes de publicar.
- Log de alterações (quem alterou, quando).
- Zero dependência de plugin externo.

### 2.7 Blog

- Estrutura pronta com 5 posts pilares iniciais (briefing por post fornecido; conteúdo clínico por você ou redator médico).
- Categoria automática por especialidade.
- Autor com foto, credencial, links para outros posts.
- Comentário desabilitado (opção regulatória em site médico).

---

## 3. Arquitetura técnica

- **Frontend**: Next.js 14+ com App Router, TypeScript, Tailwind CSS.
- **Geração**: SSG (Static Site Generation) com ISR para conteúdo atualizado.
- **CMS**: painel próprio integrado, sem SaaS proprietário.
- **Banco**: PostgreSQL para conteúdo, usuários admin e log de eventos.
- **Storage**: DigitalOcean Spaces ou similar, com Cloudflare CDN gratuito.
- **Autenticação admin**: JWT com bcrypt.

---

## 4. Etapas do projeto

**Etapa 1 — Discovery + arquitetura de SEO (5 dias)**
- Keyword research aprofundada (Ahrefs / SEMrush + Google Search Console).
- Mapeamento de clusters e termos por página.
- Briefing de conteúdo por página das 40 iniciais (H1, H2, palavras alvo, dúvidas frequentes, termos relacionados).
- Confirmação de identidade visual e referências.
- **Entregável**: documento de arquitetura SEO + briefings prontos para você ou redator médico.

**Etapa 2 — Design system e primeiras páginas (7 dias)**
- Design system em código (componentes reusáveis: hero, bloco de tratamento, cartão de condição, footer, header).
- Home + 5 páginas pilares implementadas.
- **Entregável**: identidade visual aplicada, 6 páginas em staging.

**Etapa 3 — Expansão das 40 páginas + blog (10 dias)**
- Templates de página por tipo (pilar, filha, tratamento, blog post).
- Injeção do conteúdo clínico (fornecido por você ou redator).
- 5 posts iniciais do blog.
- **Entregável**: 40 páginas + blog inicial em staging.

**Etapa 4 — SEO técnico completo + integrações Google (5 dias)**
- Schema.org médico injetado corretamente em cada tipo de página.
- Meta tags únicas, canonical, sitemap.
- Google Analytics 4, Search Console, Tag Manager configurados.
- Eventos de conversão programados.
- Teste de Core Web Vitals com meta 95+.
- **Entregável**: SEO técnico completo, integrações ativas, métricas rodando.

**Etapa 5 — Deploy, indexação e handoff (3 dias)**
- Deploy em produção no seu domínio.
- Solicitação de indexação no Search Console.
- Documentação de operação (como editar conteúdo, como publicar post novo).
- Treinamento rápido do painel admin (screencast + doc).
- **Entregável**: site em produção, indexação iniciada, código 100% seu.

**Prazo total: aproximadamente 30 dias úteis (4 a 6 semanas).**

---

## 5. Investimento

**Valor total: USD 1,800.**

Pagamento único ao aprovar a entrega na plataforma. Sem antecipado.

Cobre integralmente:

- Discovery + arquitetura de SEO em cluster.
- Keyword research + briefing das 40 páginas.
- Design + implementação das 40 páginas + blog inicial.
- Páginas legais (Política de Privacidade, Cookies, Termos de Uso) com estrutura pronta.
- Página 404 personalizada com recuperação de visitante.
- SEO técnico completo (Schema.org médico, FAQ Schema, Breadcrumb Schema, meta, sitemap, robots.txt, canonical, 301 redirects, Core Web Vitals 95+).
- Integração Google Analytics, Search Console, Tag Manager.
- Preparação para Google Ads.
- CMS integrado para edição independente.
- Backup automatizado da aplicação e do banco.
- Deploy em produção.
- Documentação e treinamento.

---

## 6. Hospedagem

Roda na sua conta de infra. Configuro tudo e entrego pronto.

- Servidor: droplet de faixa média (~USD 12 a 24/mês dependendo do volume esperado).
- Storage de imagem: ~USD 5/mês + CDN Cloudflare gratuito.
- Domínio: já é seu (ou registrado no seu nome).
- SSL: gratuito via Let's Encrypt.
- **Backup automatizado da aplicação e do banco de dados**: snapshot diário do droplet + dump do banco em storage separado, com retenção mínima de 7 dias. Documentação completa da estratégia entregue no handoff, para você conseguir restaurar sozinho ou repassar a qualquer dev.

**Custo total estimado: USD 20 a 30 por mês em operação normal.**

Alternativas suportadas: AWS, Vercel + Neon, Fly.io, ou provedor de sua preferência.

---

## 7. Manutenção e acompanhamento SEO

Incluídos sem custo extra após o lançamento:

- **30 dias de garantia sobre qualquer bug** de código entregue.
- **2 meses de acompanhamento leve de SEO**: monitoro Search Console, ajusto meta tags, corrijo problemas de indexação, aviso sobre novos clusters relevantes que aparecerem nos dados.

Após esses 2 meses, acompanhamento continua sob demanda por hora (sem retainer obrigatório) ou via retainer opcional se você quiser SEO ongoing.

---

## 8. Documentação entregue

1. **README completo** em português com instruções de instalação.
2. **`.env.example`** com todas as variáveis explicadas.
3. **Manual do painel admin** com screenshots (como editar página, como publicar post, como trocar imagem).
4. **Guia de deploy** para produção.
5. **Documentação da arquitetura SEO em cluster** (para você entender e expandir depois).
6. **Playbook de expansão de página**: como acrescentar nova especialidade sem quebrar SEO existente.

---

## 9. Titularidade

**Todos os ativos do projeto ficam sob sua titularidade desde o início.**

Ficam integralmente sob seu nome e controle, desde o commit 1:

- **Código fonte** completo, hospedado no seu repositório Git (GitHub ou GitLab na sua conta).
- **CMS integrado** instalado no seu servidor, sem SaaS proprietário, sem licença externa.
- **Banco de dados** rodando na sua infraestrutura, com backup diário sob sua conta.
- **Infraestrutura** (servidor, storage, CDN) 100% na sua conta de cloud.
- **Domínio** registrado no seu nome, no seu registrador de preferência.
- **Repositório Git** completo, com histórico limpo e acesso administrativo total pra você.
- **Integrações Google** (Analytics, Search Console, Tag Manager) na sua conta Google.
- **Credenciais de todas as integrações** entregues a você, sem retenção.

Não existe cláusula de propriedade intelectual retida do meu lado. Não existe dependência técnica de mim para o site continuar funcionando. Se em algum momento você quiser trocar de dev, o próximo profissional entra no repositório e assume sem handoff comigo.

Este ponto está formalizado neste documento e vale como parte do acordo desde o dia da aceitação da proposta.

---

## 10. Roadmap possível pós-MVP

Se a captação validar (e vai validar, se o conteúdo clínico for bom), evoluções naturais preparadas na arquitetura desde o dia 1:

- **Expansão para 100+ páginas**: cada nova especialidade ou tratamento vira nova página seguindo o template já existente. Sem refactor, sem novo dev.
- **Ferramenta de pré-diagnóstico** guiado (paciente descreve sintoma, sistema sugere página de tratamento adequada). Aumenta engajamento e conversão.
- **Área de paciente** com histórico de consulta, agendamento online direto, upload de exame. Cross-vende medicina regenerativa e ondas de choque para paciente ativo.
- **Google Ads campanha estruturada** (paid) sobre a base orgânica já ranqueada. Combinação orgânico + pago é o que domina o resultado da SERP.
- **App mobile do paciente** para acompanhamento de reabilitação e adesão ao tratamento.

Nada disso entra no MVP. Fica como base já preparada para quando você decidir expandir.

---

## 11. Resumo executivo

| Item | Detalhe |
|---|---|
| Objetivo | Máquina de captação de pacientes via Google, não apenas site bonito |
| Escopo MVP | 40 páginas em cluster + blog inicial + páginas legais + 404 personalizada + SEO técnico completo + integrações Google |
| Stack | Next.js 14 + CMS integrado + PostgreSQL + Spaces + Cloudflare CDN |
| SEO | Cluster architecture + Schema.org médico + FAQ Schema + Breadcrumb Schema + 301 redirects + Core Web Vitals 95+ |
| Backup | Snapshot diário do droplet + dump do banco, retenção 7 dias, documentação de restore |
| Cronograma | 4 a 6 semanas até produção |
| Investimento | USD 1,800 |
| Pagamento | Único ao aprovar, sem antecipado |
| Hospedagem | Sua conta, USD 20 a 30/mês |
| Garantia | 30 dias sobre bug de código |
| Acompanhamento SEO | 2 meses após lançamento, sem custo extra |
| Titularidade | Código, CMS, banco, integrações, infra, domínio e repositório 100% seus desde o commit 1 |
| Escala | Preparado para 100+ páginas sem refactor |

O que fica entregue não é um site institucional bonito. É uma estrutura de dominância de SERP local para o nicho de dor e ortopedia, com cada página trabalhando em conjunto para atrair paciente que já decidiu procurar tratamento. O contexto médico correto fica com você e o redator; a máquina técnica que faz isso ranquear e converter é o que eu entrego.
