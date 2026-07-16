import Link from "next/link";
import { regions } from "@/content/clusters";

export default function NotFound() {
  return (
    <section className="page-hero" style={{ minHeight: "80vh", display: "grid", alignItems: "center" }}>
      <div className="wrap" style={{ textAlign: "center", maxWidth: 720, margin: "0 auto" }}>
        <span className="eyebrow">Erro 404</span>
        <h1 style={{ margin: "16px 0" }}>Página não encontrada</h1>
        <p style={{ margin: "0 auto 28px" }}>
          A página que você procura não existe ou foi movida. Encontre a sua área de cuidado:
        </p>
        <div className="related" style={{ justifyContent: "center" }}>
          {regions.map((r) => (
            <Link className="chip" href={`/${r.slug}`} key={r.slug} style={{ color: "#fff", borderColor: "var(--line-d)" }}>
              {r.name} →
            </Link>
          ))}
          <Link className="chip" href="/tratamentos" style={{ color: "#fff", borderColor: "var(--line-d)" }}>
            Tratamentos →
          </Link>
        </div>
        <div style={{ marginTop: 32 }}>
          <Link className="btn btn-gold" href="/">Voltar ao início</Link>
        </div>
      </div>
    </section>
  );
}
