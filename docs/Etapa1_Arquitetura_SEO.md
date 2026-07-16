# Etapa 1 — Arquitetura de SEO em Cluster + Briefings

**Projeto:** Site premium — Clínica de Ortopedia e Dor Crônica (Dr. João Cláudio Miranda)
**Entregável:** Arquitetura SEO em cluster das 40 páginas iniciais + template de briefing por página
**Referência de qualidade:** newyorkfacialplasticsurgery.com (inspiração, não cópia)
**Stack:** Next.js 14 (SSG/ISR) + CMS integrado + PostgreSQL + Cloudflare CDN

---

## 1. Lógica da arquitetura

O site não é um catálogo de páginas soltas. É uma **rede de clusters** onde cada página reforça o ranking das outras. O paciente busca pela *dor específica* dele ("dor lombar que não passa", "infiltração no joelho Goiânia"), cai na página exata, e um clique o leva ao WhatsApp.

Três níveis de página, cada um com uma função de SEO distinta:

| Nível | O que é | Intenção de busca | Exemplo |
|---|---|---|---|
| **Pilar** | Página-mãe de uma região/tema. Texto de autoridade, ampla, linka para todas as filhas. | Informacional ampla | `/coluna` |
| **Filha** | Condição específica dentro do pilar. Otimizada para o termo exato. | Informacional + comercial | `/coluna/hernia-de-disco` |
| **Neto** | Tratamento aplicado a uma condição. Página de **alta intenção** (paciente pronto para agendar). | Transacional / local | `/tratamentos/medicina-regenerativa/artrose-do-joelho` |

**Regra de ouro do link interno:** filha sempre linka de volta para a mãe e lateralmente para tratamentos relacionados; neto linka para a condição que trata e para o tratamento genérico. Nenhuma página fica órfã. Isso concentra autoridade nos pilares e distribui intenção para os netos.

---

## 2. Mapa de clusters (visão de árvore)

```
/  (Home)
│
├── Dor crônica ......................... /dor-cronica            [PILAR GUARDA-CHUVA]
│
├── COLUNA .............................. /coluna                 [PILAR]
│   ├── Hérnia de disco ................. /coluna/hernia-de-disco
│   ├── Dor lombar (lombalgia) .......... /coluna/dor-lombar
│   ├── Dor cervical (cervicalgia) ...... /coluna/dor-cervical
│   └── Dor ciática ..................... /coluna/dor-ciatica
│
├── OMBRO ............................... /ombro                  [PILAR]
│   ├── Lesão do manguito rotador ....... /ombro/manguito-rotador
│   ├── Capsulite adesiva ............... /ombro/capsulite-adesiva
│   └── Tendinite calcária .............. /ombro/tendinite-calcaria
│
├── JOELHO .............................. /joelho                 [PILAR]
│   ├── Artrose do joelho ............... /joelho/artrose
│   ├── Lesão meniscal .................. /joelho/lesao-meniscal
│   └── Lesão ligamentar (LCA) .......... /joelho/lesao-ligamentar
│
├── QUADRIL ............................. /quadril                [PILAR]
│   ├── Artrose do quadril (coxartrose) . /quadril/artrose
│   └── Bursite trocantérica ............ /quadril/bursite-trocanterica
│
├── TRATAMENTOS ......................... /tratamentos            [PILAR]
│   ├── Medicina regenerativa ........... /tratamentos/medicina-regenerativa
│   ├── Infiltração guiada por US ....... /tratamentos/infiltracao-guiada-por-ultrassom
│   ├── Terapia por ondas de choque ..... /tratamentos/ondas-de-choque
│   ├── Viscossuplementação ............. /tratamentos/viscossuplementacao
│   │
│   └── NETOS (tratamento × condição — alta intenção)
│       ├── Regenerativa p/ artrose de joelho .. /tratamentos/medicina-regenerativa/artrose-do-joelho
│       ├── Infiltração US p/ dor lombar ....... /tratamentos/infiltracao-guiada-por-ultrassom/dor-lombar
│       ├── Ondas de choque p/ tendinite ....... /tratamentos/ondas-de-choque/tendinite-calcaria
│       └── Regenerativa p/ lesão meniscal ..... /tratamentos/medicina-regenerativa/lesao-meniscal
│
├── INSTITUCIONAL
│   ├── Sobre o médico .................. /sobre
│   ├── Contato e localização ........... /contato
│   ├── Agendamento ..................... /agendar
│   ├── Depoimentos ..................... /depoimentos
│   └── Blog (index) .................... /blog
│
├── BLOG (5 posts pilares)
│   ├── /blog/o-que-e-dor-cronica-quando-procurar-especialista
│   ├── /blog/hernia-de-disco-precisa-de-cirurgia
│   ├── /blog/artrose-de-joelho-tratamento-sem-cirurgia
│   ├── /blog/medicina-regenerativa-funciona-o-que-dizem-as-evidencias
│   └── /blog/infiltracao-guiada-por-ultrassom-o-que-esperar
│
└── LEGAIS
    ├── /politica-de-privacidade
    ├── /politica-de-cookies
    └── /termos-de-uso

+ Página 404 personalizada (não indexada) com busca interna e links para os pilares.
```

---

## 3. Tabela mestre das 40 páginas

Cada linha vira um registro no CMS (uma entrada de conteúdo) e um item no sitemap.

| # | URL | Tipo | Cluster | Keyword-alvo principal | Intenção |
|---|---|---|---|---|---|
| 1 | `/` | Home | — | ortopedista dor crônica Goiânia | Marca / navegacional |
| 2 | `/dor-cronica` | Pilar | Dor crônica | tratamento para dor crônica | Informacional |
| 3 | `/coluna` | Pilar | Coluna | dor na coluna tratamento | Informacional |
| 4 | `/coluna/hernia-de-disco` | Filha | Coluna | hérnia de disco tratamento sem cirurgia | Inform. + comercial |
| 5 | `/coluna/dor-lombar` | Filha | Coluna | dor lombar crônica tratamento | Inform. + comercial |
| 6 | `/coluna/dor-cervical` | Filha | Coluna | dor cervical tratamento | Inform. + comercial |
| 7 | `/coluna/dor-ciatica` | Filha | Coluna | dor ciática tratamento | Inform. + comercial |
| 8 | `/ombro` | Pilar | Ombro | dor no ombro especialista | Informacional |
| 9 | `/ombro/manguito-rotador` | Filha | Ombro | lesão do manguito rotador tratamento | Inform. + comercial |
| 10 | `/ombro/capsulite-adesiva` | Filha | Ombro | ombro congelado tratamento | Inform. + comercial |
| 11 | `/ombro/tendinite-calcaria` | Filha | Ombro | tendinite calcária ombro tratamento | Inform. + comercial |
| 12 | `/joelho` | Pilar | Joelho | dor no joelho especialista | Informacional |
| 13 | `/joelho/artrose` | Filha | Joelho | artrose no joelho tratamento sem cirurgia | Inform. + comercial |
| 14 | `/joelho/lesao-meniscal` | Filha | Joelho | lesão de menisco tratamento | Inform. + comercial |
| 15 | `/joelho/lesao-ligamentar` | Filha | Joelho | lesão de ligamento do joelho | Inform. + comercial |
| 16 | `/quadril` | Pilar | Quadril | dor no quadril especialista | Informacional |
| 17 | `/quadril/artrose` | Filha | Quadril | artrose do quadril tratamento | Inform. + comercial |
| 18 | `/quadril/bursite-trocanterica` | Filha | Quadril | bursite no quadril tratamento | Inform. + comercial |
| 19 | `/tratamentos` | Pilar | Tratamentos | tratamento de dor sem cirurgia | Comercial |
| 20 | `/tratamentos/medicina-regenerativa` | Filha | Tratamentos | medicina regenerativa ortopedia | Comercial |
| 21 | `/tratamentos/infiltracao-guiada-por-ultrassom` | Filha | Tratamentos | infiltração guiada por ultrassom | Comercial |
| 22 | `/tratamentos/ondas-de-choque` | Filha | Tratamentos | terapia por ondas de choque | Comercial |
| 23 | `/tratamentos/viscossuplementacao` | Filha | Tratamentos | viscossuplementação joelho | Comercial |
| 24 | `/tratamentos/medicina-regenerativa/artrose-do-joelho` | Neto | Tratamentos×Joelho | medicina regenerativa artrose joelho Goiânia | **Transacional** |
| 25 | `/tratamentos/infiltracao-guiada-por-ultrassom/dor-lombar` | Neto | Tratamentos×Coluna | infiltração para dor lombar Goiânia | **Transacional** |
| 26 | `/tratamentos/ondas-de-choque/tendinite-calcaria` | Neto | Tratamentos×Ombro | ondas de choque tendinite calcária | **Transacional** |
| 27 | `/tratamentos/medicina-regenerativa/lesao-meniscal` | Neto | Tratamentos×Joelho | tratamento regenerativo menisco | **Transacional** |
| 28 | `/sobre` | Institucional | — | Dr. João Cláudio Miranda ortopedista | Marca / autoridade |
| 29 | `/contato` | Institucional | — | ortopedista Goiânia contato | Local / navegacional |
| 30 | `/agendar` | Institucional | — | agendar consulta ortopedista Goiânia | **Transacional** |
| 31 | `/depoimentos` | Institucional | — | (prova social — reforço de conversão) | Confiança |
| 32 | `/blog` | Institucional | — | blog ortopedia dor crônica | Informacional |
| 33 | `/blog/o-que-e-dor-cronica-quando-procurar-especialista` | Blog | Dor crônica | o que é dor crônica | Informacional |
| 34 | `/blog/hernia-de-disco-precisa-de-cirurgia` | Blog | Coluna | hérnia de disco precisa cirurgia | Informacional |
| 35 | `/blog/artrose-de-joelho-tratamento-sem-cirurgia` | Blog | Joelho | artrose joelho sem cirurgia | Informacional |
| 36 | `/blog/medicina-regenerativa-funciona-o-que-dizem-as-evidencias` | Blog | Tratamentos | medicina regenerativa funciona | Informacional |
| 37 | `/blog/infiltracao-guiada-por-ultrassom-o-que-esperar` | Blog | Tratamentos | como é a infiltração guiada | Informacional |
| 38 | `/politica-de-privacidade` | Legal | — | — | Conformidade |
| 39 | `/politica-de-cookies` | Legal | — | — | Conformidade |
| 40 | `/termos-de-uso` | Legal | — | — | Conformidade |

> **Escala futura (100+):** cada nova condição entra como filha de um pilar existente; cada novo par tratamento×condição entra como neto. Zero refactor — só uma nova entrada no CMS seguindo o template.

---

## 4. Regras de link interno (o motor do cluster)

1. **Home** linka para os 5 pilares (Dor crônica, Coluna, Ombro, Joelho, Quadril) + Tratamentos + Sobre + Agendar.
2. **Pilar** linka para *todas* as suas filhas + para os tratamentos mais relevantes daquela região.
3. **Filha** linka de volta para a mãe (breadcrumb + no corpo), lateralmente para 2–3 filhas irmãs, e para o(s) neto(s) de tratamento aplicável.
4. **Neto** linka para a condição que trata (filha) e para o tratamento genérico (filha de Tratamentos). É a página que recebe o tráfego de Google Ads.
5. **Blog** cada post linka para o pilar/filha da sua categoria (contexto → conversão).
6. **CTA de agendamento (WhatsApp)** presente em 100% das páginas, fixo no header e no rodapé.

Âncoras sempre descritivas (`tratamento para hérnia de disco`), nunca "clique aqui".

---

## 5. Mapa de Schema.org por tipo de página

| Tipo de página | Schema aplicado |
|---|---|
| Home | `Physician` + `MedicalClinic` + `LocalBusiness` (NAP, horário, geo) |
| Pilar (região) | `MedicalSpecialty` + `BreadcrumbList` |
| Filha (condição) | `MedicalCondition` + `BreadcrumbList` (+ `FAQPage` se tiver FAQ) |
| Neto (tratamento×condição) | `MedicalTherapy` / `MedicalProcedure` + `BreadcrumbList` (+ `FAQPage`) |
| Tratamento | `MedicalTherapy` + `BreadcrumbList` |
| Sobre | `Physician` (credenciais: SBOT, perito TRF1, IASP, professor) |
| Blog post | `MedicalWebPage` / `Article` + `BreadcrumbList` |
| Contato | `LocalBusiness` (NAP + geo + `openingHours`) |

`FAQPage` entra em toda página que tiver bloco de perguntas frequentes → habilita rich snippet no Google.

---

## 6. Template de briefing por página

Este é o formato entregue para **cada uma das 40 páginas**. É o documento que você (ou o redator médico) preenche com o conteúdo clínico correto — a estrutura de SEO já vem pronta.

```
────────────────────────────────────────────────────────
BRIEFING SEO — [Nome da página]
────────────────────────────────────────────────────────
URL:                /caminho/semantico
Tipo:               Pilar | Filha | Neto | Institucional | Blog
Cluster:            [ex.: Coluna]
Página-mãe:         [URL da mãe, se houver]

── Meta ──────────────────────────────────────────────
Title tag (≤ 60 car.):        [keyword + marca]
Meta description (≤ 155 car.): [benefício + CTA + local]
Slug canônico:                 /caminho/semantico

── Alvo de busca ─────────────────────────────────────
Keyword principal:      [termo exato]
Keywords secundárias:   [3–6 variações e long-tail]
Intenção:               Informacional | Comercial | Transacional
Volume/dificuldade:     [preenchido no keyword research — Ahrefs/SEMrush]

── Estrutura de conteúdo ─────────────────────────────
H1:                     [1 único, com a keyword principal]
H2 sugeridos:
   • O que é [condição]
   • Sintomas / quando procurar um especialista
   • Causas
   • Como o Dr. João Cláudio trata (opções sem cirurgia primeiro)
   • Tratamentos relacionados  → [links internos p/ netos]
   • Perguntas frequentes (FAQ)  → alimenta FAQPage Schema
   • Agende sua avaliação (CTA WhatsApp)
Termos relacionados a incluir: [entidades semânticas p/ cobertura]

── FAQ (mín. 3 perguntas, vira FAQPage Schema) ───────
   1. [pergunta] → [resposta clínica curta]
   2. ...
   3. ...

── Links internos obrigatórios ──────────────────────
Para cima (mãe):        [URL]
Laterais (irmãs):       [2–3 URLs]
Para baixo (netos):     [URLs de tratamento]
CTA:                    /agendar + WhatsApp

── Schema ────────────────────────────────────────────
[ex.: MedicalCondition + BreadcrumbList + FAQPage]

── Mídia ─────────────────────────────────────────────
Imagem hero (WebP):     [descrição + alt text com keyword]
Imagens de apoio:       [alt texts]
────────────────────────────────────────────────────────
```

---

## 7. Exemplo preenchido — página filha (alta prioridade)

```
────────────────────────────────────────────────────────
BRIEFING SEO — Hérnia de disco
────────────────────────────────────────────────────────
URL:                /coluna/hernia-de-disco
Tipo:               Filha
Cluster:            Coluna
Página-mãe:         /coluna

── Meta ──────────────────────────────────────────────
Title tag:          Hérnia de Disco: Tratamento Sem Cirurgia | Dr. João Cláudio
Meta description:   Sofre com hérnia de disco? Conheça o tratamento sem
                    cirurgia com infiltração guiada e medicina regenerativa
                    em Goiânia. Agende sua avaliação.
Slug canônico:      /coluna/hernia-de-disco

── Alvo de busca ─────────────────────────────────────
Keyword principal:      hérnia de disco tratamento sem cirurgia
Keywords secundárias:   hérnia de disco lombar, sintomas hérnia de disco,
                        hérnia de disco tem cura, tratamento hérnia de disco
                        Goiânia, hérnia de disco cervical
Intenção:               Informacional + comercial

── Estrutura de conteúdo ─────────────────────────────
H1:   Hérnia de Disco: Tratamento Sem Cirurgia
H2:   • O que é hérnia de disco
      • Sintomas: quando a dor indica hérnia
      • Hérnia de disco tem cura? (abordagem conservadora primeiro)
      • Como o Dr. João Cláudio trata sem cirurgia
      • Infiltração guiada por ultrassom para hérnia  → link neto
      • Medicina regenerativa na hérnia de disco       → link neto
      • Perguntas frequentes
      • Agende sua avaliação
Termos relacionados: disco intervertebral, nervo ciático, ressonância,
      fisioterapia, bloqueio, protrusão discal, L4-L5, L5-S1

── FAQ (→ FAQPage Schema) ────────────────────────────
   1. Hérnia de disco sempre precisa de cirurgia?
      → Não. A maioria dos casos melhora com tratamento conservador...
   2. Quanto tempo dura o tratamento sem cirurgia?
      → ...
   3. Infiltração para hérnia de disco dói?
      → ...

── Links internos obrigatórios ──────────────────────
Para cima:   /coluna
Laterais:    /coluna/dor-lombar, /coluna/dor-ciatica
Para baixo:  /tratamentos/infiltracao-guiada-por-ultrassom/dor-lombar,
             /tratamentos/medicina-regenerativa
CTA:         /agendar + WhatsApp

── Schema ────────────────────────────────────────────
MedicalCondition + BreadcrumbList + FAQPage

── Mídia ─────────────────────────────────────────────
Hero (WebP): ilustração de coluna/disco — alt: "hérnia de disco lombar"
────────────────────────────────────────────────────────
```

---

## 8. Exemplo preenchido — página neto (transacional / Google Ads)

```
────────────────────────────────────────────────────────
BRIEFING SEO — Medicina Regenerativa para Artrose de Joelho
────────────────────────────────────────────────────────
URL:                /tratamentos/medicina-regenerativa/artrose-do-joelho
Tipo:               Neto
Cluster:            Tratamentos × Joelho
Página-mãe:         /tratamentos/medicina-regenerativa

── Meta ──────────────────────────────────────────────
Title tag:          Medicina Regenerativa para Artrose de Joelho | Goiânia
Meta description:   Artrose no joelho? A medicina regenerativa pode reduzir a
                    dor e adiar a prótese. Tratamento guiado por ultrassom em
                    Goiânia com o Dr. João Cláudio. Agende.
Slug canônico:      /tratamentos/medicina-regenerativa/artrose-do-joelho

── Alvo de busca ─────────────────────────────────────
Keyword principal:      medicina regenerativa para artrose de joelho
Keywords secundárias:   tratamento artrose joelho sem cirurgia Goiânia,
                        PRP joelho, células para artrose, alternativa à
                        prótese de joelho
Intenção:               Transacional (destino de campanha de Google Ads)

── Estrutura de conteúdo ─────────────────────────────
H1:   Medicina Regenerativa para Artrose de Joelho
H2:   • Por que a artrose de joelho dói e limita
      • Como a medicina regenerativa atua na artrose
      • Para quem é indicado (e para quem não é)
      • Como é o procedimento (guiado por ultrassom, ambulatorial)
      • Resultados esperados e recuperação
      • Perguntas frequentes
      • Agende sua avaliação  (CTA forte + WhatsApp)

── FAQ (→ FAQPage Schema) ────────────────────────────
   1. Medicina regenerativa substitui a prótese de joelho?
   2. Quantas sessões são necessárias?
   3. O procedimento tem convênio/reembolso?  (ajustar conforme clínica)

── Links internos obrigatórios ──────────────────────
Para cima:   /tratamentos/medicina-regenerativa
Condição:    /joelho/artrose
Laterais:    /tratamentos/infiltracao-guiada-por-ultrassom,
             /tratamentos/viscossuplementacao
CTA:         /agendar + WhatsApp

── Schema ────────────────────────────────────────────
MedicalProcedure + BreadcrumbList + FAQPage

── Mídia ─────────────────────────────────────────────
Hero (WebP): procedimento guiado por US — alt: "medicina regenerativa joelho"
────────────────────────────────────────────────────────
```

---

## 9. Próximos passos (o que destrava a Etapa 2)

Para transformar esta arquitetura em conteúdo e código, preciso de você:

1. **Validação desta estrutura** — confirma os clusters e slugs, ou ajusta prioridade de alguma especialidade.
2. **Keyword research quantitativo** — rodo Ahrefs/SEMrush + Search Console para preencher volume/dificuldade de cada página (depende do acesso ao Search Console que solicitei).
3. **Conteúdo clínico** — os briefings ficam prontos para você ou o redator médico preencher; o texto clínico correto é o único item que só o médico entrega.
4. **Dados da clínica** — NAP (nome, endereço, telefone), WhatsApp, Instagram e horário → alimentam o Schema local e o rodapé.

Confirmada a estrutura, arranco o **design system + Home + 5 pilares** (Etapa 2).
