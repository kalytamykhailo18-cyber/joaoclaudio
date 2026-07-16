import { site, whatsappLink } from "@/content/site";

export default function CtaBand() {
  return (
    <section className="cta" id="agendar">
      <div className="wrap">
        <span className="eyebrow">Agende sua avaliação</span>
        <h2>
          Descubra a origem<span className="serif-it">da sua dor.</span>
        </h2>
        <div className="cta-row">
          <a className="btn btn-wa" href={whatsappLink()} target="_blank" rel="noopener">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 004.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2z" /></svg>
            Falar no WhatsApp
          </a>
          <a className="btn btn-outline-d" href={`tel:${site.phone.replace(/\D/g, "")}`}>{site.phone}</a>
        </div>
      </div>
    </section>
  );
}
