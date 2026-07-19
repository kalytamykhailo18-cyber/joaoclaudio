import { cache } from "react";
import { getPayload } from "payload";
import config from "@payload-config";
import * as seed from "@/content/clusters";
import type { Region, Condition, Treatment } from "@/content/clusters";
import { site as defaultSite } from "@/content/site";
import * as blogSeed from "@/content/blog";
import type { Post } from "@/content/blog";
import { homeDefault, type HomeContent } from "@/content/home";
import { pagesDefault, type PagesContent } from "@/content/pages";
import { uiDefault, type UIContent } from "@/content/ui";

export type SiteData = typeof defaultSite;

// Conteúdo da home vindo do global "home" do Payload, mesclado sobre os
// defaults (campos vazios mantêm o default). Fallback total em erro.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mergeSection<T extends Record<string, any>>(def: T, cur: any): T {
  const out = { ...def };
  if (cur) for (const k of Object.keys(def)) if (cur[k]) (out as Record<string, unknown>)[k] = cur[k];
  return out;
}

export const getHomePage = cache(async (): Promise<HomeContent> => {
  try {
    const p = await pl();
    const h = await p.findGlobal({ slug: "home", depth: 1 });
    if (!h) return homeDefault;
    // heroPhoto é upload de topo (relação media): usa a URL se houver.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const photoUrl = (h.heroPhoto as any)?.url ?? "";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const stepItems = (h.stepItems as any[])?.length ? (h.stepItems as any[]) : homeDefault.stepItems;
    return {
      hero: { ...mergeSection(homeDefault.hero, h.hero), photoUrl },
      intro: mergeSection(homeDefault.intro, h.intro),
      areas: mergeSection(homeDefault.areas, h.areas),
      band: mergeSection(homeDefault.band, h.band),
      steps: mergeSection(homeDefault.steps, h.steps),
      treatments: mergeSection(homeDefault.treatments, h.treatments),
      quote: mergeSection(homeDefault.quote, h.quote),
      stepItems,
    };
  } catch {
    return homeDefault;
  }
});

// Textos da interface (nav, breadcrumb, chips, rótulos, 404, login, editor…) do
// global "ui", mesclados sobre os defaults de ui.ts (grupo a grupo). Fallback total.
export const getUI = cache(async (): Promise<UIContent> => {
  try {
    const p = await pl();
    const g = await p.findGlobal({ slug: "ui" });
    if (!g) return uiDefault;
    const out = {} as UIContent;
    for (const k of Object.keys(uiDefault) as (keyof UIContent)[]) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (out as any)[k] = mergeSection(uiDefault[k] as any, (g as any)[k]);
    }
    return out;
  } catch {
    return uiDefault;
  }
});

// Conteúdo das páginas estáticas vindo do global "pages", mesclado sobre os
// defaults de pages.ts (cada grupo campo-a-campo). Fallback total em erro.
export const getPages = cache(async (): Promise<PagesContent> => {
  try {
    const p = await pl();
    const g = await p.findGlobal({ slug: "pages" });
    if (!g) return pagesDefault;
    const out = {} as PagesContent;
    for (const k of Object.keys(pagesDefault) as (keyof PagesContent)[]) {
      const def = pagesDefault[k];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const cur = (g as any)[k];
      // Arrays (ex.: dorCronicaFaq): usa o do CMS se houver itens, senão o default.
      if (Array.isArray(def)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (out as any)[k] = Array.isArray(cur) && cur.length ? cur : def;
      } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (out as any)[k] = mergeSection(def as any, cur);
      }
    }
    return out;
  } catch {
    return pagesDefault;
  }
});

// Configurações do site (nome, contato, credenciais) do global SiteSettings do
// Payload, mesclado sobre os defaults de site.ts. Fallback total em erro.
// `cache` dedup por render (layout + página + componentes = 1 consulta).
export const getSiteSettings = cache(async (): Promise<SiteData> => {
  try {
    const p = await pl();
    const s = await p.findGlobal({ slug: "site-settings" });
    if (!s) return defaultSite;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const creds = (s.credentials as any[]) ?? [];
    return {
      ...defaultSite,
      doctor: s.doctor || defaultSite.doctor,
      specialty: s.specialty || defaultSite.specialty,
      city: s.city || defaultSite.city,
      phone: s.phone || defaultSite.phone,
      whatsapp: s.whatsapp || defaultSite.whatsapp,
      instagram: s.instagram || defaultSite.instagram,
      address: s.address || defaultSite.address,
      credentials: creds.length
        ? creds.map((c) => ({ short: c.short, label: c.label }))
        : defaultSite.credentials,
    };
  } catch {
    return defaultSite;
  }
});

// Camada de conteúdo: lê do Payload (CMS) e, em QUALQUER erro ou base vazia,
// cai de volta para src/content/clusters.ts. Assim o site nunca quebra, e o
// médico edita o conteúdo das páginas pelo /admin (refletido via ISR).

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function pl(): Promise<any> {
  return getPayload({ config });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const relSlug = (x: any): string | undefined =>
  x && typeof x === "object" ? x.slug : undefined;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapTreatment(d: any): Treatment {
  return {
    id: d.id,
    slug: d.slug, name: d.name, short: d.short, tag: d.tag ?? "", h1: d.h1,
    title: d.seo?.title ?? d.name, description: d.seo?.description ?? "",
    keyword: d.seo?.keyword ?? "", intro: d.intro, howWorks: d.howWorks ?? "",
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapPost(d: any): Post {
  return {
    id: d.id,
    slug: d.slug,
    title: d.title,
    metaTitle: d.seo?.title ?? d.title,
    description: d.seo?.description ?? d.excerpt ?? "",
    keyword: d.seo?.keyword ?? "",
    excerpt: d.excerpt ?? "",
    category: { label: d.category?.label ?? "Blog", href: d.category?.href ?? "/blog" },
    publishedAt: d.publishedAt ?? "",
    readMinutes: d.readMinutes ?? 5,
    // Corpo em textarea → parágrafos (separados por linha em branco).
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sections: (d.sections ?? []).map((s: any) => ({
      h2: s.h2,
      body: String(s.body ?? "").split(/\n\s*\n/).map((x: string) => x.trim()).filter(Boolean),
    })),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    faq: (d.faq ?? []).map((f: any) => ({ q: f.q, a: f.a })),
  };
}

export async function getPosts(): Promise<Post[]> {
  try {
    const p = await pl();
    const res = await p.find({ collection: "posts", sort: "-publishedAt", limit: 200 });
    return res.docs.length ? res.docs.map(mapPost) : blogSeed.postsByDateDesc;
  } catch {
    return blogSeed.postsByDateDesc;
  }
}

export async function getPost(slug: string): Promise<Post | undefined> {
  try {
    const p = await pl();
    const res = await p.find({ collection: "posts", where: { slug: { equals: slug } }, limit: 1 });
    return res.docs.length ? mapPost(res.docs[0]) : blogSeed.getPost(slug);
  } catch {
    return blogSeed.getPost(slug);
  }
}

export async function getPostParams(): Promise<{ slug: string }[]> {
  try {
    const p = await pl();
    const res = await p.find({ collection: "posts", limit: 200, depth: 0 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return res.docs.length ? res.docs.map((d: any) => ({ slug: d.slug })) : blogSeed.allPostParams;
  } catch {
    return blogSeed.allPostParams;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapCondition(d: any): Condition {
  return {
    id: d.id,
    slug: d.slug, name: d.name, h1: d.h1,
    title: d.seo?.title ?? d.name, description: d.seo?.description ?? "",
    keyword: d.seo?.keyword ?? "", intro: d.intro,
    whatIs: d.whatIs ?? "", howTreat: d.howTreat ?? "",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    siblings: (d.siblings ?? []).map(relSlug).filter(Boolean) as string[],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    treatments: (d.treatments ?? []).map(relSlug).filter(Boolean) as string[],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    faq: (d.faq ?? []).map((f: any) => ({ q: f.q, a: f.a })),
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function conditionsForRegion(p: any, regionId: unknown): Promise<Condition[]> {
  const res = await p.find({
    collection: "conditions",
    where: { region: { equals: regionId } },
    depth: 1, limit: 100, sort: "id",
  });
  return res.docs.map(mapCondition);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function mapRegion(p: any, d: any): Promise<Region> {
  return {
    id: d.id,
    slug: d.slug, name: d.name, h1: d.h1,
    title: d.seo?.title ?? d.name, description: d.seo?.description ?? "",
    keyword: d.seo?.keyword ?? "", intro: d.intro,
    conditions: await conditionsForRegion(p, d.id),
  };
}

export async function getTreatments(): Promise<Treatment[]> {
  try {
    const p = await pl();
    const res = await p.find({ collection: "treatments", sort: "order", limit: 100 });
    return res.docs.length ? res.docs.map(mapTreatment) : seed.treatments;
  } catch {
    return seed.treatments;
  }
}

export async function getTreatment(slug: string): Promise<Treatment | undefined> {
  try {
    const p = await pl();
    const res = await p.find({ collection: "treatments", where: { slug: { equals: slug } }, limit: 1 });
    return res.docs.length ? mapTreatment(res.docs[0]) : seed.getTreatment(slug);
  } catch {
    return seed.getTreatment(slug);
  }
}

export async function getRegions(): Promise<Region[]> {
  try {
    const p = await pl();
    const res = await p.find({ collection: "regions", sort: "order", limit: 100 });
    if (!res.docs.length) return seed.regions;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return Promise.all(res.docs.map((d: any) => mapRegion(p, d)));
  } catch {
    return seed.regions;
  }
}

export async function getRegion(slug: string): Promise<Region | undefined> {
  try {
    const p = await pl();
    const res = await p.find({ collection: "regions", where: { slug: { equals: slug } }, limit: 1 });
    return res.docs.length ? mapRegion(p, res.docs[0]) : seed.getRegion(slug);
  } catch {
    return seed.getRegion(slug);
  }
}

export async function getCondition(regionSlug: string, condSlug: string): Promise<Condition | undefined> {
  try {
    const p = await pl();
    const region = await p.find({ collection: "regions", where: { slug: { equals: regionSlug } }, limit: 1 });
    if (!region.docs.length) return seed.getCondition(regionSlug, condSlug);
    const res = await p.find({
      collection: "conditions",
      where: { and: [{ slug: { equals: condSlug } }, { region: { equals: region.docs[0].id } }] },
      depth: 1, limit: 1,
    });
    return res.docs.length ? mapCondition(res.docs[0]) : seed.getCondition(regionSlug, condSlug);
  } catch {
    return seed.getCondition(regionSlug, condSlug);
  }
}

// generateStaticParams a partir do CMS (com fallback ao semente). Combinado com
// dynamicParams=true, páginas novas criadas no /admin passam a existir sem rebuild.
export async function getRegionParams(): Promise<{ region: string }[]> {
  try {
    const p = await pl();
    const res = await p.find({ collection: "regions", limit: 200, depth: 0 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return res.docs.length ? res.docs.map((d: any) => ({ region: d.slug })) : seed.allRegionParams;
  } catch {
    return seed.allRegionParams;
  }
}

export async function getConditionParams(): Promise<{ region: string; condition: string }[]> {
  try {
    const p = await pl();
    const res = await p.find({ collection: "conditions", limit: 500, depth: 1 });
    if (!res.docs.length) return seed.allConditionParams;
    return res.docs
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((d: any) => ({ region: relSlug(d.region), condition: d.slug }))
      .filter((x: { region?: string }) => x.region) as { region: string; condition: string }[];
  } catch {
    return seed.allConditionParams;
  }
}

export async function getTreatmentParams(): Promise<{ treatment: string }[]> {
  try {
    const p = await pl();
    const res = await p.find({ collection: "treatments", limit: 200, depth: 0 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return res.docs.length ? res.docs.map((d: any) => ({ treatment: d.slug })) : seed.allTreatmentParams;
  } catch {
    return seed.allTreatmentParams;
  }
}

// Netos (tratamento × condição) são definidos em código (conjunto fixo).
export const applications = seed.applications;
