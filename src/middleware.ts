import { NextResponse, type NextRequest } from "next/server";

// Redirecionamentos 301/302 gerenciáveis pelo cliente (coleção `redirects` no CMS).
// O middleware lê um mapa compacto de /api/_redirects, com cache em memória (TTL)
// para não consultar o banco a cada request. Regra de ouro: FALHA ABERTA — qualquer
// erro aqui NUNCA pode quebrar o site; simplesmente segue sem redirecionar.

type Rule = { from: string; to: string; permanent: boolean };

const TTL_MS = 60_000;
let cache: { at: number; rules: Map<string, Rule> } | null = null;

function normalize(p: string): string {
  let s = (p || "/").split("#")[0].split("?")[0];
  if (!s.startsWith("/")) s = "/" + s;
  if (s.length > 1) s = s.replace(/\/+$/, "");
  return s.toLowerCase();
}

async function loadRules(origin: string): Promise<Map<string, Rule>> {
  if (cache && Date.now() - cache.at < TTL_MS) return cache.rules;
  try {
    const res = await fetch(`${origin}/api/redirect-map`, { cache: "no-store" });
    if (res.ok) {
      const data = (await res.json()) as Rule[];
      if (Array.isArray(data)) {
        const rules = new Map<string, Rule>();
        for (const r of data) {
          if (!r?.from || !r?.to) continue;
          const from = normalize(r.from);
          // Evita loop óbvio (destino igual à origem).
          if (from === normalize(r.to)) continue;
          rules.set(from, { from, to: r.to, permanent: r.permanent !== false });
        }
        // Só cacheia em SUCESSO — nunca envenena o cache com mapa vazio por falha
        // transitória de fetch (bug anterior: uma falha desligava tudo por 60s).
        cache = { at: Date.now(), rules };
        return rules;
      }
    }
  } catch {
    /* falha aberta */
  }
  // Falha: reaproveita o último cache bom, se houver; senão, vazio (sem cachear).
  return cache?.rules ?? new Map<string, Rule>();
}

export async function middleware(req: NextRequest) {
  try {
    const { pathname, origin } = req.nextUrl;
    const rules = await loadRules(origin);
    if (rules.size === 0) return NextResponse.next();

    const hit = rules.get(normalize(pathname));
    if (!hit) return NextResponse.next();

    // Destino: interno ("/...") ou URL absoluta http(s). Qualquer outra coisa é
    // ignorada (proteção contra open-redirect malformado).
    const isInternal = hit.to.startsWith("/");
    const isAbsolute = /^https?:\/\//i.test(hit.to);
    if (!isInternal && !isAbsolute) return NextResponse.next();

    const dest = isInternal ? new URL(hit.to, origin) : new URL(hit.to);
    return NextResponse.redirect(dest, hit.permanent ? 301 : 302);
  } catch {
    return NextResponse.next(); // nunca quebra a navegação
  }
}

// Não roda em assets, API, imagens do Next, nem na área de edição. Só em rotas de página.
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|brand|robots.txt|sitemap.xml|entrar).*)"],
};
