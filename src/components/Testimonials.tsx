"use client";
import { useCallback, useEffect, useState, type CSSProperties } from "react";
import { useUI } from "@/components/UIProvider";

type Item = { name: string; meta: string; avatar: string; text: string };

// Depoimentos de demonstração para o layout. Avatares de um serviço de fotos
// aleatórias (randomuser.me). Serão substituídos pelas avaliações reais do
// Google (Places API) quando o place_id + API key forem conectados.
const DEMO_ITEMS: Item[] = [
  { name: "Marcos Antônio", meta: "Goiânia · Dor lombar", avatar: "https://randomuser.me/api/portraits/men/32.jpg", text: "Convivi anos com dor na lombar achando que só cirurgia resolveria. Com o tratamento certo, voltei a caminhar e a dormir sem dor." },
  { name: "Luciana Ferreira", meta: "Goiânia · Artrose de joelho", avatar: "https://randomuser.me/api/portraits/women/44.jpg", text: "A medicina regenerativa adiou minha prótese. Sinto muito menos dor e recuperei a rotina de caminhadas." },
  { name: "Rafael Souza", meta: "Aparecida de Goiânia · Ombro", avatar: "https://randomuser.me/api/portraits/men/75.jpg", text: "Tinha dor no ombro havia meses. As ondas de choque resolveram sem precisar operar. Atendimento muito atencioso." },
  { name: "Patrícia Gomes", meta: "Goiânia · Hérnia de disco", avatar: "https://randomuser.me/api/portraits/women/68.jpg", text: "Cheguei com muita dor pela hérnia. O diagnóstico foi preciso e o tratamento conservador me devolveu qualidade de vida." },
  { name: "Eduardo Lima", meta: "Goiânia · Dor cervical", avatar: "https://randomuser.me/api/portraits/men/45.jpg", text: "A infiltração guiada por ultrassom foi certeira. Alívio rápido e acompanhamento impecável do início ao fim." },
  { name: "Camila Ribeiro", meta: "Trindade · Bursite no quadril", avatar: "https://randomuser.me/api/portraits/women/26.jpg", text: "Explicação clara, plano de tratamento honesto e resultado real. Voltei a deitar de lado sem dor pela primeira vez em anos." },
  { name: "Fernando Alves", meta: "Goiânia · Lesão de menisco", avatar: "https://randomuser.me/api/portraits/men/51.jpg", text: "Achei que ia parar de correr. O tratamento certo me manteve ativo, sem cirurgia. Recomendo de olhos fechados." },
  { name: "Juliana Castro", meta: "Senador Canedo · Tendinite", avatar: "https://randomuser.me/api/portraits/women/90.jpg", text: "Médico humano e muito técnico. Cada etapa explicada com calma. A dor no ombro que me travava sumiu." },
];

export default function Testimonials({
  items,
  eyebrow = "Depoimentos",
  heading = "Histórias de quem voltou a viver sem dor.",
  note = "Depoimentos ilustrativos de layout, serão substituídos pelas avaliações reais do Google.",
}: {
  items?: Item[];
  eyebrow?: string;
  heading?: string;
  note?: string;
}) {
  const realNote = useUI().testimonials.realNote;
  const demo = !items || items.length === 0;
  const data = demo ? DEMO_ITEMS : items;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [mobile, setMobile] = useState(false);
  const n = data.length;

  useEffect(() => {
    const calc = () => setMobile(window.innerWidth < 720);
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  const next = useCallback(() => setActive((a) => (a + 1) % n), [n]);
  const prev = () => setActive((a) => (a - 1 + n) % n);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 4500);
    return () => clearInterval(id);
  }, [paused, next]);

  // menor deslocamento circular (para o efeito passar pelas bordas suavemente)
  const offsetOf = (i: number) => {
    let d = i - active;
    if (d > n / 2) d -= n;
    if (d < -n / 2) d += n;
    return d;
  };

  const cardStyle = (off: number): CSSProperties => {
    const abs = Math.abs(off);
    const maxVisible = mobile ? 0 : 1;
    const hidden = abs > maxVisible;
    const scale = off === 0 ? 1.1 : 0.86;
    const shift = mobile ? off * 92 : off * 96; // % da largura do card — espalha até as bordas
    return {
      transform: `translateX(calc(-50% + ${shift}%)) scale(${hidden ? 0.7 : scale})`,
      opacity: hidden ? 0 : off === 0 ? 1 : 0.72,
      zIndex: 10 - abs,
      pointerEvents: off === 0 ? "auto" : "none",
    };
  };

  return (
    <section
      className="testi-carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="wrap">
        <span className="eyebrow">{eyebrow}</span>
        <h2>{heading}</h2>

        <div className="tc-stage">
          {data.map((t, i) => {
            const off = offsetOf(i);
            return (
              <article
                className={`tc-card${off === 0 ? " is-active" : ""}`}
                style={cardStyle(off)}
                key={i}
                aria-hidden={off !== 0}
              >
                <div className="tc-inner">
                  <div className="tc-stars" aria-label="5 de 5 estrelas">★★★★★</div>
                  <p className="tc-text">&ldquo;{t.text}&rdquo;</p>
                  <div className="tc-user">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={t.avatar} alt={t.name} width={50} height={50} loading="lazy" />
                    <div>
                      <b>{t.name}</b>
                      <span>{t.meta}</span>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="tc-controls">
          <button className="tc-arrow" onClick={prev} aria-label="Depoimento anterior">‹</button>
          <div className="tc-dots">
            {data.map((_, i) => (
              <button
                key={i}
                className={`tc-dot${i === active ? " on" : ""}`}
                onClick={() => setActive(i)}
                aria-label={`Ir para o depoimento ${i + 1}`}
              />
            ))}
          </div>
          <button className="tc-arrow" onClick={next} aria-label="Próximo depoimento">›</button>
        </div>

        {demo ? (
          <p className="tc-note">{note}</p>
        ) : (
          <p className="tc-note">{realNote}</p>
        )}
      </div>
    </section>
  );
}
