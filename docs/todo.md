# TODO — Site Dr. João Cláudio Miranda (Workana)

Working checklist mapped to the **agreed scope** (conversation + `Joao_Proposal.md`).
Contract: **USD 1,800**, single payment on approval (no upfront, escrow), **4–6 weeks**, full client ownership.

**Legend:** `[x]` done · `[~]` partial/in progress · `[ ]` pending · 🔒 blocked on João · 💰 out of paid scope (client/writer)

Live preview: **https://dev.ustymkushnir.com** · Admin (CMS): `/admin` · Code: `/home/joaoclaudio/site`

---

## 0. Contract & commercials
- [x] Proposal registered on Workana with full scope
- [x] Bid accepted, project in escrow
- [ ] 🔒 Confirm escrow **funded** before heavy work (Workana: work begins after full payment held)
- [ ] Single payment released on delivery/approval
- [ ] 30-day code warranty window (starts at launch)
- [ ] 2 months light SEO follow-up (starts at launch)

---

## Etapa 1 — Discovery + SEO architecture
- [x] Cluster architecture (pilar → filha → neto) for the 40 pages — `Etapa1_Arquitetura_SEO.md`
- [x] URL/slug map (semantic pt-BR)
- [x] Internal-linking rules
- [x] Schema.org mapping per page type
- [x] Per-page SEO briefing **template** + 2 filled examples (hérnia de disco, regenerativa×joelho)
- [ ] 🔒 Quantitative keyword research (volume/difficulty) — needs **Search Console access** (Ahrefs/SEMrush + GSC)
- [ ] Fill briefings for all **40 pages** (H1/H2/target terms/FAQ) — 2/40 done
- [ ] João validates cluster structure & slug priorities

---

## Etapa 2 — Design system + first pages
- [x] Design system in code (black + off-white + gold, Playfair/Didot + Montserrat) — faithful to NY-Facial teardown
- [x] Reusable components: header/mega-menu, hero, credential strip, cards, bands, steps, testimonial, quote, CTA, footer, WhatsApp FAB
- [x] Homepage implemented
- [x] Region pillar pages (coluna, ombro, joelho, quadril)
- [x] Pixel responsive (desktop/tablet/mobile)
- [x] Persistent scheduling CTA + WhatsApp (header, footer, floating)
- [x] Relief testimonial pattern (instead of aesthetic before/after)
- [ ] 🔒 Doctor **professional photo** in hero (slot wired, awaiting file → convert WebP + breakpoints)
- [ ] 🔒 Media/credential **logos** (real assets)

---

## Etapa 3 — 40 pages + blog
- [x] Page templates by type (pilar / filha / neto / institucional / legal)
- [x] Condition (filha) pages — 12, with prose + FAQ accordion + related links
- [x] Treatment pages (4) + grandchild treatment×condition pages (4)
- [x] Sobre, Contato pages
- [x] Legal pages **structure** (Privacidade, Cookies, Termos) — stubs
- [ ] 💰 Clinical **content** injected into all 40 (from briefings; João or medical writer)
- [ ] 💰 Legal-page **content** (João provides/reviews)
- [ ] Blog: index + post template
- [ ] 💰 5 pillar blog posts (briefing provided; clinical copy by client/writer)
- [ ] Blog: auto category by cluster, author box, comments disabled

---

## Etapa 4 — Technical SEO + Google integrations
### Technical SEO
- [x] SSG (static) pages, self-hosted fonts, minimal JS (~100 KB)
- [x] Semantic URLs
- [x] Schema.org: Physician, MedicalClinic-ish, MedicalCondition, MedicalTherapy
- [x] **FAQ Schema (FAQPage)**
- [x] **Breadcrumb Schema (BreadcrumbList)**
- [x] Dynamic **sitemap.xml**
- [x] **robots.txt**
- [x] Automatic **canonical** per page
- [x] Unique **meta tags** per page
- [x] Internal-linking cluster in code
- [x] Custom **404** with links to main specialties/treatments
- [ ] Internal search on 404 (links done; search box pending)
- [ ] WebP images + correct breakpoints (Media pipeline configured in CMS; needs real images)
- [ ] Critical CSS inline / verify no render-blocking
- [ ] **Core Web Vitals 95+** on LCP/INP/CLS — run Lighthouse audit, tune (⚠️ third-party tags can regress this)
- [ ] **301 redirects** manageable from panel (redirect collection + middleware)

### Google ecosystem
- [ ] 🔒 Google Analytics 4 + conversion events (WhatsApp click, form submit, phone click)
- [ ] 🔒 Google Tag Manager
- [ ] 🔒 Google Search Console: verify, submit sitemap, confirm indexing
- [ ] Google Ads ready: UTM handling, landing pages, remarketing tag
- [ ] Google My Business in footer (map + live reviews) — needs verified GMB

---

## CMS (Payload) — "o doutor edita sem depender de dev"
- [x] Payload 3 installed & integrated into the Next app (own panel, no external SaaS)
- [x] PostgreSQL backing store; 19 tables; admin auth (JWT + bcrypt)
- [x] Admin panel live at `/admin`; first admin user created
- [x] Collections modeling content: Regions, Conditions, Treatments, Posts (drafts/preview), Media (auto-WebP), Users; SiteSettings global
- [x] Change log / versioning (Payload built-in) + preview before publish (drafts)
- [ ] **Wire frontend → CMS** (frontend currently reads seed file `src/content/clusters.ts`, NOT the DB) ⬅️ **key next step**
- [ ] Seed the 40 pages + settings into the DB
- [ ] Editable meta tags/schema per page surfaced in admin (fields exist; confirm end-to-end)

---

## Etapa 5 — Deploy, indexing & handoff
- [x] Deployed to VPS, running under Node 20 + pm2, nginx reverse proxy
- [x] HTTPS on dev domain (Let's Encrypt) + noindex on dev host
- [ ] 🔒 Point **real domain** (joaoclaudiomiranda.com) → production
- [ ] Cloudflare CDN in front (orange-cloud proxy) — proposal architecture (SP edge)
- [ ] SSL on production domain
- [ ] Request indexing in Search Console
- [ ] pm2 boot-persistence (`pm2 startup`) — user to run (sandbox blocked auto)

### Backup (agreed)
- [ ] Daily droplet snapshot
- [ ] Daily DB dump to separate storage, **≥7-day retention**
- [ ] Restore documentation at handoff

---

## Ownership & handoff (100% client, from commit 1)
- [ ] 🔒 Source code in **João's Git** (GitHub/GitLab, his account) — currently local repo
- [ ] 🔒 CMS + DB on **João's server/infra** (currently on freelancer's dev VPS)
- [ ] 🔒 Infra (server, storage, CDN) in his cloud account
- [ ] 🔒 Domain registered in his name
- [ ] 🔒 Google integrations in **his** Google account
- [ ] Deliver **all credentials** (DB, admin, integrations) — no retention
- [ ] Confirm no IP/technical dependency on freelancer

---

## Documentation (handoff bundle)
- [~] README (pt-BR) with install instructions
- [~] `.env.example` with all variables explained (created; keep updated)
- [ ] Admin panel manual with screenshots (edit page, publish post, swap image)
- [ ] Deploy guide (production)
- [x] SEO cluster architecture doc (`Etapa1_Arquitetura_SEO.md`)
- [ ] Page-expansion playbook (add specialty without breaking SEO)
- [ ] Quick training screencast of the admin panel

---

## Post-launch (included, no extra cost)
- [ ] 30 days: fix any code bug
- [ ] 2 months light SEO: monitor GSC, adjust meta tags, fix indexing, flag new clusters

---

## 🔒 Waiting on João (unblocks the above)
- [ ] Access to **VPS** (or confirm build stays on freelancer's until handoff)
- [ ] Access to **domain registrar** (DNS at deploy)
- [ ] **Google** admin invites (GA4, GSC, GTM) — or authorization to create on his account
- [ ] Professional **photo**, credentials, media logos
- [ ] Clinic **NAP** (name, address, phone), **WhatsApp** comercial, **Instagram**, hours
- [ ] Clinical **content** per page (or approve external medical writer) + legal copy
- [ ] Any specialty to **prioritize** first
