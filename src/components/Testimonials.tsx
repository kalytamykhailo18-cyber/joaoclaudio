"use client";
import { useCallback, useEffect, useState, type CSSProperties } from "react";
import { useUI } from "@/components/UIProvider";

type Item = { name: string; meta: string; avatar: string; text: string };

// Avaliações REAIS de pacientes, publicadas no perfil do Google (via Trustindex,
// jul/2026). Sem foto (não usamos fotos falsas de pessoas reais) — o avatar é a
// inicial do nome. Quando o place_id + Places API forem conectados, dá pra puxar
// as avaliações ao vivo direto do Google.
// Ordem: pacientes com foto real primeiro (melhor 1ª impressão); os demais têm o
// avatar padrão do próprio Google (círculo colorido com inicial) — tudo real.
const DEMO_ITEMS: Item[] = [
  { name: "Fabiana Carvalho", meta: "Goiânia · Google", avatar: "/reviews/fabiana.jpg", text: "Dr. João é excepcional, cuidou da condropatia do meu joelho e as dores foram melhorando sem uso de medicamentos. Super recomendo." },
  { name: "Silvia da Silva", meta: "Goiânia · Google", avatar: "/reviews/silvia.jpg", text: "Ótima experiência. O Dr. João Cláudio é um excelente médico: profissional, educado e muito humano." },
  { name: "Vanessa Melo", meta: "Goiânia · Google", avatar: "/reviews/vanessa.jpg", text: "Um dos melhores ortopedistas que já tive o prazer de conhecer, super atencioso. Nunca mais vou procurar outro médico." },
  { name: "Leandra Araujo", meta: "Goiânia · Google", avatar: "/reviews/leandra.jpg", text: "Tive uma fratura grave e perdi movimentos da mão esquerda. Ele me ajudou nos meus momentos mais difíceis. Nenhum médico é tão humano." },
  { name: "Regislaine V. de Paula", meta: "Goiânia · Google", avatar: "/reviews/regislaine.jpg", text: "Nunca na minha vida vi um médico tão cuidadoso, educado, atencioso e humano com o paciente como o Dr. João Cláudio." },
  { name: "Marinalva Arruda", meta: "Goiânia · Google", avatar: "/reviews/marinalva.jpg", text: "O Dr. João foi uma bênção na minha vida. Me trato com ele há mais de um ano e estou tendo ótimos resultados. Excelente profissional e um ser humano incrível." },
  { name: "Marcos Souza", meta: "Goiânia · Google", avatar: "/reviews/marcos.jpg", text: "Está cuidando do meu ombro e estou muito satisfeito com a compreensão, a avaliação e os resultados obtidos. Muito obrigado." },
  { name: "Eva Ferreira", meta: "Goiânia · Google", avatar: "/reviews/eva.jpg", text: "Um médico ótimo, super atencioso e prestativo, com uma recepcionista excelente. Super indico." },
];

// Iniciais para o avatar quando não há foto (pega até 2 palavras do nome).
function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter((w) => w.length > 1)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

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
                    {t.avatar ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={t.avatar} alt={t.name} width={50} height={50} loading="lazy" />
                    ) : (
                      <span className="tc-initials" aria-hidden>{initials(t.name)}</span>
                    )}
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

        {/* As avaliações são reais (Google), tanto as internas quanto as ao vivo. */}
        <p className="tc-note">{realNote}</p>
      </div>
    </section>
  );
}
