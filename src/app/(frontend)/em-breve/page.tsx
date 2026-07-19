import Link from "next/link";
import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { getUI } from "@/lib/content";

export const metadata: Metadata = { robots: { index: false, follow: false } };
export const revalidate = 60;

export default async function EmBreve() {
  const e = (await getUI()).emBreve;
  return (
    <section className="page-hero" style={{ minHeight: "78vh", display: "grid", alignItems: "center" }}>
      <div className="wrap" style={{ textAlign: "center", maxWidth: 720, margin: "0 auto" }}>
        <Reveal as="span" className="eyebrow" index={0}>{e.eyebrow}</Reveal>
        <Reveal as="h1" index={1} style={{ margin: "16px 0" }}>{e.title}</Reveal>
        <Reveal as="p" index={2} style={{ margin: "0 auto 28px" }}>{e.text}</Reveal>
        <Reveal as="div" className="cta-row" index={3} style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <Link className="btn btn-gold" href="/">{e.btnHome}</Link>
          <Link className="btn btn-outline-d" href="/coluna/hernia-de-disco">{e.btnSample}</Link>
        </Reveal>
      </div>
    </section>
  );
}
