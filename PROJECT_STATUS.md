# PROJECT_STATUS — Site Dr. João Cláudio Miranda

> **Read this first if you're resuming the project (fresh machine or new session).**
> It is the single source of truth for *what this is, what's done, how it's built, how to redeploy, and what's next*. Everything operational that isn't obvious from the code is captured here.

Last updated: 2026-07-16.

---

## 1. What this is
Premium website for **Dr. João Cláudio Miranda**, orthopedist / chronic-pain specialist in **Goiânia, Brazil**. Freelance job via **Workana**, fixed **USD 1,800**, 4–6 weeks, **full client ownership** of all assets from day one. Visual benchmark: `newyorkfacialplasticsurgery.com` (inspiration, not copy).

Goal (client's words): a **patient-generation machine via Google** — SEO + Google Ads ready — not just a pretty site.

**Spec/business docs** (kept in the freelancer's `/home/overview`, NOT in this repo):
`conversation.txt` (full client requirements), `Joao_Proposal.md` (binding scope), `Etapa1_Arquitetura_SEO.md` (40-page SEO architecture — also copied to `docs/` here), `todo.md` (full checklist). If you don't have these, ask the owner for them.

---

## 2. Current status (snapshot)

**DONE & live (on the dev VPS):**
- Next.js 15 app, black+gold Didot design faithful to the reference teardown.
- 37 static pages (SSG): homepage, 4 region pillars, 12 condition pages, 4 treatments, 4 treatment×condition, sobre, contato, 3 legal stubs, custom 404, `/em-breve` placeholder.
- Schema.org (Physician, BreadcrumbList, MedicalCondition, MedicalTherapy, FAQPage), dynamic sitemap.xml, robots.txt, canonical, unique meta per page, semantic pt-BR URLs, internal-linking clusters, WhatsApp CTAs.
- **Payload CMS 3** integrated (admin at `/admin`), PostgreSQL, collections modeling the content (Regions, Conditions, Treatments, Posts, Media, Users) + SiteSettings global. Admin user created.
- Deployed: Node 20 + pm2 + nginx + Let's Encrypt on `dev.ustymkushnir.com`.
- **Preview lock** (this is a sales preview, not production): deep pages show `/em-breve`; `/admin`+`/api` behind nginx basic-auth. See §7.

**NOT done yet (the real remaining work):**
1. **Frontend is NOT wired to the CMS.** Public pages render from `src/content/clusters.ts` (a seed data file), NOT from the Payload DB. **This is the #1 next task** — see §9.
2. Seed the 40 pages + SiteSettings into the DB.
3. Fill the 40 per-page SEO briefings + real clinical content (client/medical writer).
4. Blog (index + 5 pillar posts).
5. Google stack: GA4 + conversion events, GTM, Search Console, Ads readiness, Google My Business (live reviews).
6. WebP images + breakpoints; Core Web Vitals 95+ audit; 301-redirect management from panel.
7. Automated backups (daily snapshot + DB dump, 7-day retention) + restore docs.
8. Real domain + Cloudflare CDN proxy + SSL on production domain.
9. Ownership handoff to client's infra/Git/Google; deliver credentials.
10. Docs: admin manual, deploy guide, expansion playbook, training screencast.
11. **Remove the preview lock** before production (delete `src/middleware.ts` or gate it by env; drop the nginx basic-auth). See §7.

Full checklist: `docs/todo.md` (or `/home/overview/todo.md`).

---

## 3. Tech stack (exact)
| Piece | Version / note |
|---|---|
| Next.js | `~15.4.11` (App Router, TS, Tailwind) — **must be 15.x**, Payload 3 requires Next ≥15 |
| React | `19` |
| Payload CMS | `^3.86` (`@payloadcms/next`, `@payloadcms/db-postgres`, `@payloadcms/richtext-lexical`) |
| Database | PostgreSQL 16 |
| Node | **20.x REQUIRED** (Payload needs ≥20.9; Next 15 fine on 20). Installed via **nvm** |
| Process mgr | pm2 |
| Web server | nginx (reverse proxy → app on `:3000`) |
| TLS | certbot / Let's Encrypt |
| Fonts | `next/font` self-hosted: Playfair Display (Didot substitute) + Montserrat |

---

## 4. Repo structure (annotated)
```
src/
  app/
    (frontend)/            # public site — its own root layout (html/body/header/footer)
      layout.tsx           # fonts, metadata, Header/Footer/WhatsAppFab/PhysicianSchema
      page.tsx             # homepage
      globals.css          # the entire design system (black+gold, Didot)
      [region]/page.tsx                    # pillar (coluna/ombro/joelho/quadril)
      [region]/[condition]/page.tsx        # condition page (FAQ, related links)
      tratamentos/page.tsx                 # treatments index
      tratamentos/[treatment]/page.tsx     # treatment page
      tratamentos/[treatment]/[condition]/page.tsx   # treatment×condition (Ads landing)
      sobre/  contato/  em-breve/          # institutional + preview placeholder
      politica-de-privacidade/ politica-de-cookies/ termos-de-uso/
      not-found.tsx  sitemap.ts  robots.ts
    (payload)/             # Payload admin + API — its own root layout
      layout.tsx
      admin/[[...segments]]/page.tsx + not-found.tsx + importMap.js
      api/[...slug]/route.ts  api/graphql/route.ts  api/graphql-playground/route.ts
  content/
    clusters.ts            # ★ THE 40-PAGE DATA — current source of truth for the frontend
    site.ts                # clinic settings (name, city, whatsapp, credentials) — placeholders
  components/              # Header, Footer, WhatsAppFab, Schema, CtaBand, Breadcrumb, LegalPage
  payload/
    collections/           # Regions, Conditions, Treatments, Posts, Media, Users
    globals/SiteSettings.ts
    fields/shared.ts       # reusable seo/faq/slug fields
  payload.config.ts        # Payload config (collections, globals, postgres, lexical)
  middleware.ts            # ★ PREVIEW LOCK (delete/disable for production)
next.config.mjs            # wrapped with withPayload(...)
tsconfig.json              # has "@payload-config" and "@/*" path aliases
.env                       # gitignored — see §6
.db-credential .admin-credential   # gitignored — DB + admin + nginx-gate passwords
```
**Multiple root layouts:** there is intentionally **no** `src/app/layout.tsx`. `(frontend)` and `(payload)` each provide their own root layout. Do not add a top-level layout.

---

## 5. Critical decisions & gotchas (hard-won — read before touching)
1. **Node 20 via nvm.** On the *dev* VPS the system Node stays 18 because another project (`mesclawave`) needs it — so the app runs under nvm's Node 20. On João's VPS you can just install Node 20 system-wide. Always `nvm use 20` before npm/build/pm2 here.
2. **Next 14 → 15 + React 19 upgrade** was required for Payload 3. All dynamic routes use **async `params`** (`const { region } = await params`) — Next 15 style. Don't revert to sync params.
3. **Payload CLI breaks under Node 20 + tsx** with `ERR_REQUIRE_ESM` / `ERR_REQUIRE_ASYNC_MODULE` (e.g. `payload generate:importmap`, `payload migrate`). **Workaround:** don't use the CLI. `next build` uses SWC and loads the config fine. `admin/importMap.js` is intentionally `export const importMap = {}` — valid because we only use built-in field types. If you add custom admin components, you'll need to populate it (try `NODE_OPTIONS=--no-experimental-require-module` or run generate under Node 22).
4. **DB schema creation.** The postgres adapter **auto-pushes** the schema in **dev mode** only. To create tables: run `next dev` once and hit any admin route, then stop it (see §8). Production `next start` does NOT push. (For a real prod flow, generate migrations — currently we use dev-push.)
5. **First admin user:** `POST /api/users/first-register` with `{email,password,name}` (allowed only when 0 users). Plain `POST /api/users` is blocked (403) by design.
6. **Palette/type = measured, not guessed.** Reference is **black + off-white + gold `#bf970f`**, Playfair Display (Didot), Montserrat, **sharp corners**. It is NOT navy. Full teardown reasoning in `docs/` if copied.
7. **Frontend ↔ CMS not wired** (see §2, §9). The CMS works but editing it does not change the live site yet.
8. **nginx htpasswd perms:** the `.htpasswd` file must be group-readable by `www-data` (`chgrp www-data ...; chmod 640`) or nginx 500s on auth.
9. **Payload + nginx basic-auth:** strip the header upstream (`proxy_set_header Authorization "";`) on `/admin` and `/api`, or Payload tries to parse the Basic header as its own token.

---

## 6. Environment variables (`.env` — recreate on new VPS, gitignored)
```
DATABASE_URI=postgres://USER:PASSWORD@127.0.0.1:5432/joaoclaudio
PAYLOAD_SECRET=<random 40+ char string>
NEXT_PUBLIC_SITE_URL=https://<production-domain>
PREVIEW_UNLOCK_TOKEN=<random>        # only needed while preview lock is active (§7)
```
Generate fresh secrets on the new VPS (do NOT reuse dev ones). The current dev values live in `.env` / `.db-credential` / `.admin-credential` on the dev box — they are per-machine and can be regenerated.

`site.ts` still holds **placeholder** clinic data (phone/whatsapp/address/instagram) — replace with real values (or move to the SiteSettings global once frontend is CMS-wired).

---

## 7. Preview lock (REMOVE for production)
This deployment is a **sales preview**, so:
- `src/middleware.ts` rewrites deep content pages to `/em-breve`. Only home, the 4 pillars, treatments index, and 2 sample pages (`/coluna/hernia-de-disco`, `/tratamentos/medicina-regenerativa`) are open. Owner bypass: `?unlock=<PREVIEW_UNLOCK_TOKEN>` (sets a cookie).
- nginx `location /admin` and `location /api` require basic-auth (`/etc/nginx/.htpasswd-joao`, user `ustym`). Password in `.admin-credential`.
- `X-Robots-Tag: noindex` header on the dev host.

**To go production:** delete `src/middleware.ts` (or make it a no-op when `NODE_ENV=production` / a `PRODUCTION=1` env is set), remove the basic-auth blocks + noindex from nginx, rebuild.

---

## 8. From-scratch deploy runbook (fresh Ubuntu 22/24 VPS)
```bash
# 1. System deps
sudo apt update && sudo apt install -y postgresql nginx certbot python3-certbot-nginx git
# 2. Node 20 (nvm) + pm2
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
. "$HOME/.nvm/nvm.sh" && nvm install 20 && nvm use 20
npm i -g pm2
# 3. Database
sudo -u postgres psql <<SQL
CREATE ROLE joaoclaudio WITH LOGIN PASSWORD 'CHOOSE_A_PASSWORD';
CREATE DATABASE joaoclaudio OWNER joaoclaudio;
SQL
# 4. Code + env
git clone https://github.com/kalytamykhailo18-cyber/joaoclaudio.git site && cd site
#   create .env (see §6) with the DB password above + a fresh PAYLOAD_SECRET
npm install
# 5. Create DB schema (dev-push), then stop
export $(grep -v '^#' .env | xargs)
npx next dev -p 3001 &            # wait ~30s, curl http://127.0.0.1:3001/admin once
#   confirm tables exist:  psql ... -c "\dt"   then kill the dev process
# 6. First admin user (dev or prod server running)
curl -X POST http://127.0.0.1:3001/api/users/first-register \
  -H 'Content-Type: application/json' \
  -d '{"email":"admin@EXAMPLE.com","password":"STRONG_PW","name":"Dr. João Cláudio"}'
# 7. Build + run
kill %1 2>/dev/null; npm run build
pm2 start npm --name joao-site -- run start -- -p 3000 && pm2 save
# 8. nginx: proxy your domain → 127.0.0.1:3000 (see mesclawave/dev configs for template),
#    then: sudo certbot --nginx -d yourdomain.com
```
Notes: build takes ~1–3 min (Payload admin bundle). If build times out in an agent, run it backgrounded. The app must run under Node 20 (ensure pm2's daemon was started with Node 20 in PATH; `pm2 kill` then restart under nvm 20 if unsure).

---

## 9. THE IMMEDIATE NEXT TASK — wire frontend to Payload
Right now `src/content/clusters.ts` is the source of truth. To make the CMS actually drive the site:
1. **Seed** the DB from `clusters.ts` (write a one-off seed using Payload local API `getPayload({config})` inside a Next route or script run under the app runtime — avoid the broken CLI). Populate Regions, Conditions, Treatments, SiteSettings.
2. **Refactor pages** (`[region]`, `[region]/[condition]`, `tratamentos/*`) to read via Payload local API instead of `clusters.ts`:
   - `generateStaticParams` → query Payload for slugs.
   - page body + `generateMetadata` → `payload.find({collection, where:{slug}})`.
   - Keep SSG + add ISR (`export const revalidate = 60`) so edits publish without a rebuild.
3. Point `Header`/`Footer`/`site.ts` reads at the SiteSettings global.
4. Verify: edit a page in `/admin` → change appears on the live route after revalidate.
Keep `clusters.ts` as the seed script's input, then it can be retired.

After that: briefings/content, blog, Google integrations, backups, CWV, remove preview lock, handoff. See `todo.md`.

---

## 10. Operational cheat-sheet
```bash
. "$HOME/.nvm/nvm.sh" && nvm use 20     # always, before npm/pm2 on the dev box
cd /home/joaoclaudio/site
export $(grep -v '^#' .env | xargs)
npm run build                            # production build
pm2 restart joao-site                    # apply new build
pm2 logs joao-site --lines 50            # debug
# DB: psql -h 127.0.0.1 -U joaoclaudio -d joaoclaudio
# Admin: /admin  (creds in .admin-credential)  | Owner preview bypass: ?unlock=<token>
```
On the **dev** box only: nginx serves `dev.ustymkushnir.com` + the bare IP (default_server); `mesclawave` is a separate project on the same box, routed by domain name — never touch it. Configs: `/etc/nginx/sites-available/{dev-ustymkushnir,joaoclaudio-preview}`.
