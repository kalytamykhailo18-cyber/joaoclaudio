# Site — Dr. João Cláudio Miranda

Site de captação de pacientes (ortopedia e dor crônica, Goiânia). **Next.js 15 (App
Router) + Payload CMS 3 + PostgreSQL.** Objetivo: ser encontrado no Google e converter
o visitante em consulta agendada.

**Produção:** https://joaoclaudiomiranda.com

## Stack

- **Next.js 15** (SSG/ISR, App Router) + **React 19** + **TypeScript** + **Tailwind**
- **Payload CMS 3** (Postgres) — conteúdo editável; sem painel `/admin` separado
- **Edição inline**: o médico edita cada página no próprio site após login em `/entrar`
- Deploy: **VPS** (Node 20, PostgreSQL 16, pm2, nginx, HTTPS/Let's Encrypt)

## Rodar localmente

```bash
cp .env.example .env      # preencha DATABASE_URI, PAYLOAD_SECRET, etc.
npm install
npm run dev               # http://localhost:3000
```

## Build de produção

```bash
npm run build
npm start                 # ou via pm2: pm2 start "npm start" --name joaoclaudio
```

## Variáveis de ambiente

Todas descritas em [`.env.example`](.env.example). Principais:

| Variável | Para quê |
|---|---|
| `DATABASE_URI` | conexão PostgreSQL (CMS) |
| `PAYLOAD_SECRET` | chave secreta do Payload |
| `NEXT_PUBLIC_SITE_URL` | URL pública (canonical/sitemap) |
| `NEXT_PUBLIC_GA_ID` / `NEXT_PUBLIC_GTM_ID` | Google Analytics 4 / Tag Manager |
| `NEXT_PUBLIC_GADS_ID` + `_LABEL_*` | Google Ads (conversões/remarketing) — opcional |
| `GOOGLE_PLACES_API_KEY` / `GOOGLE_PLACE_ID` | avaliações ao vivo do Google — opcional |

## Estrutura

- `src/app/(frontend)/` — páginas do site (40 rotas em cluster: pilares, condições,
  tratamentos, tratamento×condição, institucionais, blog, legais)
- `src/lib/content.ts` — camada de dados: lê do Payload e cai para os defaults de
  código em caso de erro/base vazia (o site nunca quebra)
- `src/content/` — defaults de conteúdo (clusters, home, páginas, UI, site)
- `src/payload/` — coleções e globais do CMS + hooks de revalidação
- `src/components/inline/` — editor inline (lápis, modal, CRUD, upload)
- `src/middleware.ts` — aplica os redirecionamentos 301/302 da coleção `redirects`
- `scripts/backup.sh` — backup diário (banco + mídia), retenção 7 dias

## Documentação

- [`docs/MANUAL-CMS-INLINE.md`](docs/MANUAL-CMS-INLINE.md) — como o médico edita o site
- [`docs/BACKUP-RESTORE.md`](docs/BACKUP-RESTORE.md) — backup e restauração
- [`docs/Etapa1_Arquitetura_SEO.md`](docs/Etapa1_Arquitetura_SEO.md) — arquitetura SEO em cluster
- `overview/briefings-40.md` — briefings SEO das 40 páginas
- [`deploy/nginx-joaoclaudiomiranda.conf`](deploy/nginx-joaoclaudiomiranda.conf) — config nginx de produção

## Notas de operação

- **Editar conteúdo:** login em `/entrar`, depois lápis em cada seção. Ver o manual.
- **Redirecionamentos:** tela em `/redirecionamentos` (logado).
- **Novo campo/coleção no CMS:** exige sincronizar o schema do Postgres no deploy
  antes de reiniciar a app.
- **Titularidade:** código, CMS, banco, domínio e infraestrutura são do cliente.
