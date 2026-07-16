import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function EmBreve() {
  return (
    <section className="page-hero" style={{ minHeight: "78vh", display: "grid", alignItems: "center" }}>
      <div className="wrap" style={{ textAlign: "center", maxWidth: 720, margin: "0 auto" }}>
        <span className="eyebrow">Prévia</span>
        <h1 style={{ margin: "16px 0" }}>Esta página entra na implementação</h1>
        <p style={{ margin: "0 auto 28px" }}>
          A estrutura das 40 páginas já está desenhada e pronta no projeto. O conteúdo de cada
          página é publicado na fase de implementação. Explore a home e as páginas de amostra para
          ver o padrão de qualidade.
        </p>
        <div className="cta-row" style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <Link className="btn btn-gold" href="/">Voltar à home</Link>
          <Link className="btn btn-outline-d" href="/coluna/hernia-de-disco">Ver página de amostra</Link>
        </div>
      </div>
    </section>
  );
}
