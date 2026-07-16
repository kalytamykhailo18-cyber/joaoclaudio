import { NextResponse, type NextRequest } from "next/server";

// ── Preview lock ─────────────────────────────────────────────
// Enquanto o projeto está em prévia (antes da implementação formal),
// só a home + páginas de amostra ficam visíveis. As demais páginas
// internas mostram o placeholder /em-breve, protegendo o entregável.
// Desbloqueio próprio: acessar com ?unlock=<TOKEN> (grava cookie).

const SAMPLE = new Set(["/coluna/hernia-de-disco", "/tratamentos/medicina-regenerativa"]);
const isConditionPage = (p: string) => /^\/(coluna|ombro|joelho|quadril)\/[^/]+$/.test(p);
const isTreatmentDetail = (p: string) =>
  /^\/tratamentos\/[^/]+$/.test(p) || /^\/tratamentos\/[^/]+\/[^/]+$/.test(p);

export function middleware(req: NextRequest) {
  const token = process.env.PREVIEW_UNLOCK_TOKEN;
  const { pathname, searchParams } = req.nextUrl;

  // Bypass do dono do projeto
  if (token) {
    if (searchParams.get("unlock") === token) {
      const res = NextResponse.redirect(new URL(pathname, req.url));
      res.cookies.set("preview_unlock", token, { httpOnly: true, path: "/", maxAge: 60 * 60 * 24 * 30 });
      return res;
    }
    if (req.cookies.get("preview_unlock")?.value === token) return NextResponse.next();
  }

  const locked = (isConditionPage(pathname) || isTreatmentDetail(pathname)) && !SAMPLE.has(pathname);
  if (locked) {
    return NextResponse.rewrite(new URL("/em-breve", req.url));
  }
  return NextResponse.next();
}

export const config = {
  // exclui assets, admin, api, arquivos e o próprio placeholder
  matcher: ["/((?!_next/|admin|api|media/|em-breve|favicon|.*\\.).*)"],
};
