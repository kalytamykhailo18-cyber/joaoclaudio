import Link from "next/link";
import { getRegions, getUI } from "@/lib/content";
import Reveal from "@/components/Reveal";

export default async function NotFound() {
  const [regions, ui] = await Promise.all([getRegions(), getUI()]);
  const nf = ui.notFound;
  return (
    <section className="page-hero" style={{ minHeight: "80vh", display: "grid", alignItems: "center" }}>
      <div className="wrap" style={{ textAlign: "center", maxWidth: 720, margin: "0 auto" }}>
        <Reveal as="span" className="eyebrow" index={0}>{nf.eyebrow}</Reveal>
        <Reveal as="h1" index={1} style={{ margin: "16px 0" }}>{nf.title}</Reveal>
        <Reveal as="p" index={2} style={{ margin: "0 auto 28px" }}>{nf.text}</Reveal>
        <Reveal as="div" className="related" index={3} style={{ justifyContent: "center" }}>
          {regions.map((r) => (
            <Link className="chip" href={`/${r.slug}`} key={r.slug} style={{ color: "#fff", borderColor: "var(--line-d)" }}>
              {r.name} →
            </Link>
          ))}
          <Link className="chip" href="/tratamentos" style={{ color: "#fff", borderColor: "var(--line-d)" }}>
            {nf.tratamentos}
          </Link>
        </Reveal>
        <Reveal as="div" index={4} style={{ marginTop: 32 }}>
          <Link className="btn btn-gold" href="/">{nf.button}</Link>
        </Reveal>
      </div>
    </section>
  );
}
