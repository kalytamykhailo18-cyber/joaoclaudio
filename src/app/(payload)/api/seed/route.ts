import { getPayload } from "payload";
import config from "@payload-config";
import { NextResponse } from "next/server";
import { regions, treatments } from "@/content/clusters";
import { site } from "@/content/site";

// Seed idempotente: popula Regions, Conditions, Treatments e SiteSettings a
// partir de src/content/clusters.ts + site.ts, usando a local API do Payload.
// Protegido por token (PAYLOAD_SECRET). Roda uma vez; se já houver regiões, pula.
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const token = req.headers.get("x-seed-token");
  if (!process.env.PAYLOAD_SECRET || token !== process.env.PAYLOAD_SECRET) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const p = (await getPayload({ config })) as any;

  const existing = await p.count({ collection: "regions" });
  if (existing.totalDocs > 0) {
    return NextResponse.json({ skipped: true, reason: "already seeded", regions: existing.totalDocs });
  }

  const created = { treatments: 0, regions: 0, conditions: 0 };

  // 1) Treatments
  const tMap: Record<string, string | number> = {};
  for (let i = 0; i < treatments.length; i++) {
    const t = treatments[i];
    const doc = await p.create({
      collection: "treatments",
      data: {
        name: t.name, short: t.short, tag: t.tag, slug: t.slug, h1: t.h1,
        intro: t.intro, order: i,
        seo: { title: t.title, description: t.description, keyword: t.keyword },
      },
    });
    tMap[t.slug] = doc.id;
    created.treatments++;
  }

  // 2) Regions
  const rMap: Record<string, string | number> = {};
  for (let i = 0; i < regions.length; i++) {
    const r = regions[i];
    const doc = await p.create({
      collection: "regions",
      data: {
        name: r.name, slug: r.slug, h1: r.h1, intro: r.intro, order: i,
        seo: { title: r.title, description: r.description, keyword: r.keyword },
      },
    });
    rMap[r.slug] = doc.id;
    created.regions++;
  }

  // 3) Conditions (1ª passada: sem siblings)
  const cMap: Record<string, string | number> = {};
  for (const r of regions) {
    for (const c of r.conditions) {
      const doc = await p.create({
        collection: "conditions",
        data: {
          name: c.name, slug: c.slug, region: rMap[r.slug], h1: c.h1, intro: c.intro,
          treatments: (c.treatments ?? []).map((s) => tMap[s]).filter(Boolean),
          faq: c.faq ?? [],
          seo: { title: c.title, description: c.description, keyword: c.keyword },
        },
      });
      cMap[`${r.slug}/${c.slug}`] = doc.id;
      created.conditions++;
    }
  }

  // 4) Conditions (2ª passada: siblings, agora que temos os IDs)
  for (const r of regions) {
    for (const c of r.conditions) {
      if (c.siblings?.length) {
        const sibs = c.siblings.map((s) => cMap[`${r.slug}/${s}`]).filter(Boolean);
        await p.update({
          collection: "conditions",
          id: cMap[`${r.slug}/${c.slug}`],
          data: { siblings: sibs },
        });
      }
    }
  }

  // 5) SiteSettings (global)
  await p.updateGlobal({
    slug: "site-settings",
    data: {
      doctor: site.doctor, specialty: site.specialty, city: site.city,
      phone: site.phone, whatsapp: site.whatsapp, instagram: site.instagram,
      address: site.address,
      credentials: site.credentials.map((c) => ({ short: c.short, label: c.label })),
    },
  });

  return NextResponse.json({ ok: true, created });
}
