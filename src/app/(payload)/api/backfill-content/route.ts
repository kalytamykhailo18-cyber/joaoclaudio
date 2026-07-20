import { getPayload } from "payload";
import config from "@payload-config";
import { NextResponse } from "next/server";
import { regions, treatments } from "@/content/clusters";

// Backfill de conteúdo inicial (whatIs / howTreat / FAQ das condições, howWorks dos
// tratamentos) nos documentos JÁ EXISTENTES no banco. Diferente do seed: NÃO cria
// nada e SÓ preenche campos que estão vazios — assim jamais sobrescreve uma edição
// feita pelo médico no CMS inline. Protegido por token (PAYLOAD_SECRET).
//
//   Uso (uma vez, no deploy):
//   curl -X POST https://joaoclaudiomiranda.com/api/backfill-content \
//        -H "x-seed-token: $PAYLOAD_SECRET"
export const dynamic = "force-dynamic";

const empty = (v: unknown) => !v || (typeof v === "string" && v.trim() === "");

export async function POST(req: Request) {
  const token = req.headers.get("x-seed-token");
  if (!process.env.PAYLOAD_SECRET || token !== process.env.PAYLOAD_SECRET) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const p = (await getPayload({ config })) as any;
  const updated = { conditions: 0, treatments: 0 };
  const skipped = { conditions: 0, treatments: 0 };

  // Tratamentos: preenche howWorks se vazio.
  for (const t of treatments) {
    const found = await p.find({ collection: "treatments", where: { slug: { equals: t.slug } }, limit: 1 });
    const doc = found.docs[0];
    if (!doc) continue;
    if (t.howWorks && empty(doc.howWorks)) {
      await p.update({ collection: "treatments", id: doc.id, data: { howWorks: t.howWorks } });
      updated.treatments++;
    } else {
      skipped.treatments++;
    }
  }

  // Condições: preenche whatIs, howTreat e faq se vazios (por região + slug).
  for (const r of regions) {
    const region = await p.find({ collection: "regions", where: { slug: { equals: r.slug } }, limit: 1 });
    const regionId = region.docs[0]?.id;
    if (!regionId) continue;
    for (const c of r.conditions) {
      const found = await p.find({
        collection: "conditions",
        where: { and: [{ slug: { equals: c.slug } }, { region: { equals: regionId } }] },
        limit: 1,
      });
      const doc = found.docs[0];
      if (!doc) continue;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data: Record<string, any> = {};
      if (c.whatIs && empty(doc.whatIs)) data.whatIs = c.whatIs;
      if (c.howTreat && empty(doc.howTreat)) data.howTreat = c.howTreat;
      if (c.faq?.length && (!doc.faq || doc.faq.length === 0)) data.faq = c.faq;
      if (Object.keys(data).length) {
        await p.update({ collection: "conditions", id: doc.id, data });
        updated.conditions++;
      } else {
        skipped.conditions++;
      }
    }
  }

  return NextResponse.json({ ok: true, updated, skipped });
}
