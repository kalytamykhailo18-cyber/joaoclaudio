import { getPayload } from "payload";
import config from "@payload-config";

// Endpoint compacto com o mapa de redirecionamentos, consumido pelo middleware.
// Sempre fresco (force-dynamic): quem controla a frequência de leitura do banco é
// o cache em memória do middleware (TTL 60s). Falha silenciosa → lista vazia.
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const payload = await getPayload({ config });
    const res = await payload.find({
      collection: "redirects",
      limit: 1000,
      depth: 0,
      pagination: false,
    });
    const rules = (res.docs as Array<{ from?: string; to?: string; permanent?: boolean }>)
      .filter((d) => d.from && d.to && d.from !== d.to)
      .map((d) => ({ from: d.from as string, to: d.to as string, permanent: d.permanent !== false }));
    return Response.json(rules, {
      headers: { "Cache-Control": "public, max-age=0, s-maxage=60" },
    });
  } catch {
    return Response.json([]);
  }
}
