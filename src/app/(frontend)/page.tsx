import Link from "next/link";
import { regions, treatments } from "@/content/clusters";
import { site } from "@/content/site";
import CtaBand from "@/components/CtaBand";

const STEPS = [
  { n: 1, t: "Diagnóstico preciso", d: "Avaliação clínica detalhada e análise de imagem para identificar a origem real da dor." },
  { n: 2, t: "Plano individual", d: "Tratamento desenhado para o seu caso — conservador primeiro, sempre que possível." },
  { n: 3, t: "Procedimento guiado", d: "Infiltrações e medicina regenerativa aplicadas com precisão por ultrassom, em ambiente ambulatorial." },
  { n: 4, t: "Acompanhamento", d: "Reavaliação e ajuste até você voltar a se mover sem dor." },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="grid">
          <div className="copy-col">
            <div className="wrap">
              <div className="copy">
                <em className="pre">{site.doctor}, ortopedista, é referência em</em>
                <h1>Ortopedia e Tratamento da Dor em {site.city}</h1>
                <p className="sub">
                  Especializado em <b>dor crônica</b>, coluna, joelho, ombro e quadril — com abordagem{" "}
                  <b>sem cirurgia</b> como primeira opção.
                </p>
                <div className="hr" />
                <p className="tag">
                  Diagnóstico preciso, medicina regenerativa e infiltrações guiadas por ultrassom.
                </p>
                <div className="cta-row">
                  <Link className="btn btn-gold" href="#agendar">Agendar avaliação</Link>
                  <Link className="btn btn-outline-d" href="/tratamentos">Ver tratamentos</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="photo">
            {/* TODO: substituir pela foto profissional do médico (WebP) */}
            <div className="ph">
              <svg width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" /></svg>
              <small>Foto profissional do médico</small>
            </div>
          </div>
        </div>
      </section>

      {/* CREDENTIAL STRIP */}
      <div className="press">
        <div className="wrap">
          {site.credentials.map((c) => (
            <div className="item" key={c.short}>
              <b>{c.short}</b>
              <span>{c.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* INTRO */}
      <section className="intro bg-off">
        <div className="wrap">
          <div>
            <span className="eyebrow">O propósito</span>
            <h2>Sua vida sem dor começa com o <em>diagnóstico certo.</em></h2>
          </div>
          <div>
            <p>A maioria das dores crônicas melhora sem passar pela sala de cirurgia — quando a origem é identificada com precisão e o tratamento é aplicado no ponto exato.</p>
            <p>É esse o caminho que o {site.doctor} conduz: tecnologia moderna, mãos experientes e uma relação próxima com cada paciente.</p>
            <Link className="arrow-link" href="/sobre">Conheça o médico →</Link>
          </div>
        </div>
      </section>

      {/* AREAS */}
      <section>
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Áreas de cuidado</span>
            <h2>Onde a sua dor está, o tratamento certo já existe.</h2>
            <p>Cada região tem uma página dedicada, com as condições, os sintomas e as opções indicadas para o seu caso.</p>
          </div>
          <div className="cards">
            {regions.map((r, i) => (
              <Link className="card" href={`/${r.slug}`} key={r.slug}>
                <div className="num">{String(i + 1).padStart(2, "0")}</div>
                <h3>{r.name}</h3>
                <p>{r.conditions.map((c) => c.name).join(", ")}.</p>
                <span className="arrow-link">Ver condições →</span>
              </Link>
            ))}
            <Link className="card" href="/tratamentos" style={{ background: "#000" }}>
              <div className="num" style={{ color: "var(--gold-lite)" }}>→</div>
              <h3 style={{ color: "#fff" }}>Todos os tratamentos</h3>
              <p style={{ color: "#bdbdbd" }}>Medicina regenerativa, infiltrações e ondas de choque.</p>
              <span className="arrow-link light">Explorar →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* APPROACH BAND */}
      <section className="band">
        <div className="wrap">
          <span className="eyebrow">A abordagem</span>
          <h2>Menos cirurgia. <em>Mais precisão.</em></h2>
          <p>Resultado que dura — porque trata a causa da dor, não apenas o sintoma.</p>
          <Link className="btn btn-gold" href="#agendar">Agende sua avaliação</Link>
        </div>
      </section>

      {/* STEPS */}
      <section>
        <div className="wrap approach">
          <div>
            <span className="eyebrow">Como funciona</span>
            <h2>Do diagnóstico ao alívio, em quatro passos.</h2>
            <p>Um método claro, conduzido por uma cabeça só — do primeiro exame ao acompanhamento.</p>
          </div>
          <div className="steps">
            {STEPS.map((s) => (
              <div className="step" key={s.n}>
                <div className="n">{s.n}</div>
                <div>
                  <b>{s.t}</b>
                  <span>{s.d}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TREATMENTS */}
      <section className="bg-off">
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow">Tratamentos</span>
            <h2>Tecnologia a serviço do alívio da dor.</h2>
            <p>Recursos modernos que tratam a causa e adiam — ou evitam — a cirurgia.</p>
          </div>
          <div className="cards" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
            {treatments.map((t) => (
              <Link className="card" href={`/tratamentos/${t.slug}`} key={t.slug}>
                <div className="num">{t.tag}</div>
                <h3 style={{ fontSize: 22 }}>{t.short}</h3>
                <p>{t.intro}</p>
                <span className="arrow-link">Saiba mais →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="testi">
        <div className="wrap">
          <span className="eyebrow">Histórias de alívio</span>
          <div className="stars">★★★★★</div>
          <p>&ldquo;Convivi anos com dor no joelho achando que só a cirurgia resolveria. Com o tratamento certo, voltei a caminhar e a dormir sem dor.&rdquo;</p>
          <cite>Paciente · {site.city} — depoimento ilustrativo</cite>
        </div>
      </section>

      {/* QUOTE */}
      <section className="quote" id="sobre">
        <div className="wrap">
          <span className="mark">&ldquo;</span>
          <blockquote>Meu objetivo não é apenas tratar a dor. É devolver o movimento e a qualidade de vida de cada paciente.</blockquote>
          <cite>{site.doctor} · Ortopedista</cite>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
