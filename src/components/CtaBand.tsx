import { whatsappLink } from "@/content/site";
import { getSiteSettings, getPages } from "@/lib/content";
import Reveal from "@/components/Reveal";
import InlineEdit from "@/components/inline/InlineEdit";

export default async function CtaBand() {
  const [site, pages] = await Promise.all([getSiteSettings(), getPages()]);
  const cta = pages.cta;
  return (
    <InlineEdit
      globalSlug="pages"
      title="Editar: Faixa de CTA"
      fields={[
        { name: "cta.eyebrow", label: "Rótulo", type: "text", value: cta.eyebrow },
        { name: "cta.h2main", label: "Título (parte 1)", type: "text", value: cta.h2main },
        { name: "cta.h2serif", label: "Título (parte itálica)", type: "text", value: cta.h2serif },
        { name: "cta.button", label: "Texto do botão", type: "text", value: cta.button },
      ]}
    >
      <section className="cta" id="agendar">
        <div className="wrap">
          <Reveal as="span" className="eyebrow" index={0}>
            {cta.eyebrow}
          </Reveal>
          <Reveal as="h2" index={1}>
            {cta.h2main} <span className="serif-it">{cta.h2serif}</span>
          </Reveal>
          <Reveal as="div" className="cta-row" index={2}>
            <a className="btn btn-wa" href={whatsappLink(site.whatsapp)} target="_blank" rel="noopener">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 004.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2z" /></svg>
              {cta.button}
            </a>
            <a className="btn btn-outline-d" href={`tel:${site.phone.replace(/\D/g, "")}`}>{site.phone}</a>
          </Reveal>
        </div>
      </section>
    </InlineEdit>
  );
}
