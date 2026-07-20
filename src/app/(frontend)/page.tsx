import type { Metadata } from "next";
import Link from "next/link";
import { getRegions, getTreatments, getSiteSettings, getHomePage, getPages, getUI } from "@/lib/content";
import CtaBand from "@/components/CtaBand";
import ClinicMap from "@/components/ClinicMap";
import GoogleReviews from "@/components/GoogleReviews";
import Testimonials from "@/components/Testimonials";
import Reveal from "@/components/Reveal";
import InlineEdit, { InlinePencil, InlineAdd, InlineArrayItem, InlineArrayAdd } from "@/components/inline/InlineEdit";
import { getGoogleReviews } from "@/lib/googleReviews";

export const revalidate = 60; // ISR: conteúdo, nav e cards refletem o CMS

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getPages();
  return {
    // absolute: preserva o título exato da home (sem o sufixo do template do layout)
    title: { absolute: seo.homeTitle },
    description: seo.homeDescription,
    alternates: { canonical: "/" },
  };
}

export default async function Home() {
  const [regions, treatments, site, home, pages, ui, g] = await Promise.all([
    getRegions(),
    getTreatments(),
    getSiteSettings(),
    getHomePage(),
    getPages(),
    getUI(),
    getGoogleReviews(),
  ]);
  const tst = pages.testimonials;
  const ch = ui.chips;
  const reviewItems = g?.reviews?.length
    ? g.reviews.map((r) => ({ name: r.author, meta: r.relative, avatar: r.photo, text: r.text }))
    : undefined;

  return (
    <>
      {/* HERO */}
      <InlineEdit
        globalSlug="home"
        title="Editar: Hero"
        fields={[
          { name: "hero.pre", label: "Linha superior", type: "text", value: home.hero.pre },
          { name: "hero.h1", label: "Título (H1)", type: "text", value: home.hero.h1 },
          { name: "hero.sub", label: "Subtítulo", type: "textarea", value: home.hero.sub },
          { name: "hero.tag", label: "Frase de destaque", type: "text", value: home.hero.tag },
          { name: "hero.btnPrimary", label: "Botão principal", type: "text", value: home.hero.btnPrimary },
          { name: "hero.btnSecondary", label: "Botão secundário", type: "text", value: home.hero.btnSecondary },
          { name: "heroPhoto", label: "Foto do médico (hero)", type: "image", value: home.hero.photoUrl },
        ]}
      >
        <section className="hero">
          <div className="grid">
            <div className="copy-col">
              <div className="wrap">
                <div className="copy">
                  <InlineEdit
                    globalSlug="pages"
                    title="Editar: SEO da Home (Google)"
                    fields={[
                      { name: "seo.homeTitle", label: "SEO — Meta title (Google)", type: "text", value: pages.seo.homeTitle },
                      { name: "seo.homeDescription", label: "SEO — Meta description (Google)", type: "textarea", value: pages.seo.homeDescription },
                    ]}
                  >
                    <Reveal as="em" className="pre" index={0}>{home.hero.pre}</Reveal>
                  </InlineEdit>
                  <Reveal as="h1" index={1}>{home.hero.h1}</Reveal>
                  <Reveal as="p" className="sub" index={2}>{home.hero.sub}</Reveal>
                  <Reveal as="div" className="hr" index={3} />
                  <Reveal as="p" className="tag" index={4}>{home.hero.tag}</Reveal>
                  <Reveal as="div" className="cta-row" index={5}>
                    <Link className="btn btn-gold" href="#agendar">{home.hero.btnPrimary}</Link>
                    <Link className="btn btn-outline-d" href="/tratamentos">{home.hero.btnSecondary}</Link>
                  </Reveal>
                </div>
              </div>
            </div>
            <div className="photo">
              {home.hero.photoUrl ? (
                // Foto profissional do médico, enviada pelo CMS (edição inline do hero).
                // eslint-disable-next-line @next/next/no-img-element
                <img src={home.hero.photoUrl} alt="Dr. João Cláudio Miranda" className="ph-photo" />
              ) : (
                // Foto profissional real do médico (recuperada do site antigo) como padrão,
                // até que o João envie uma nova pelo CMS inline. Ainda 100% editável.
                // eslint-disable-next-line @next/next/no-img-element
                <img src="/doctor/dr-joao-cutout.webp" alt="Dr. João Cláudio Miranda" className="ph-photo" />
              )}
            </div>
          </div>
        </section>
      </InlineEdit>

      {/* CREDENTIAL STRIP */}
      <div className="press">
        <div className="wrap">
          {site.credentials.map((c, i) => (
            <Reveal as="div" className="item inline-rel" key={`${c.short}-${i}`} index={i}>
              <b>{c.short}</b>
              <span>{c.label}</span>
              <InlineArrayItem
                globalSlug="site-settings"
                field="credentials"
                items={site.credentials}
                index={i}
                title="Editar credencial"
                itemFields={[
                  { name: "short", label: "Sigla", type: "text" },
                  { name: "label", label: "Descrição", type: "text" },
                ]}
              />
            </Reveal>
          ))}
          <InlineArrayAdd
            globalSlug="site-settings"
            field="credentials"
            items={site.credentials}
            label="Credencial"
            title="Nova credencial"
            itemFields={[
              { name: "short", label: "Sigla", type: "text" },
              { name: "label", label: "Descrição", type: "text" },
            ]}
          />
        </div>
      </div>

      {/* INTRO */}
      <InlineEdit
        globalSlug="home"
        title="Editar: Introdução"
        fields={[
          { name: "intro.eyebrow", label: "Rótulo", type: "text", value: home.intro.eyebrow },
          { name: "intro.h2", label: "Título", type: "text", value: home.intro.h2 },
          { name: "intro.p1", label: "Parágrafo 1", type: "textarea", value: home.intro.p1 },
          { name: "intro.p2", label: "Parágrafo 2", type: "textarea", value: home.intro.p2 },
          { name: "intro.link", label: "Link (texto)", type: "text", value: home.intro.link },
        ]}
      >
        <section className="intro bg-off">
          <div className="wrap">
            <div>
              <Reveal as="span" className="eyebrow" index={0}>{home.intro.eyebrow}</Reveal>
              <Reveal as="h2" index={1}>{home.intro.h2}</Reveal>
            </div>
            <div>
              <Reveal as="p" index={0}>{home.intro.p1}</Reveal>
              <Reveal as="p" index={1}>{home.intro.p2}</Reveal>
              <Reveal as={Link} className="arrow-link" href="/sobre" index={2}>{home.intro.link}</Reveal>
            </div>
          </div>
        </section>
      </InlineEdit>

      {/* AREAS */}
      <section>
        <div className="wrap">
          <InlineEdit
            globalSlug="home"
            title="Editar: Áreas (cabeçalho)"
            fields={[
              { name: "areas.eyebrow", label: "Rótulo", type: "text", value: home.areas.eyebrow },
              { name: "areas.h2", label: "Título", type: "text", value: home.areas.h2 },
              { name: "areas.p", label: "Descrição", type: "textarea", value: home.areas.p },
              { name: "areas.promoTitle", label: "Card promo — título", type: "text", value: home.areas.promoTitle },
              { name: "areas.promoText", label: "Card promo — texto", type: "textarea", value: home.areas.promoText },
            ]}
          >
            <div className="sec-head">
              <Reveal as="span" className="eyebrow" index={0}>{home.areas.eyebrow}</Reveal>
              <Reveal as="h2" index={1}>{home.areas.h2}</Reveal>
              <Reveal as="p" index={2}>{home.areas.p}</Reveal>
            </div>
          </InlineEdit>
          <div className="cards">
            {regions.map((r, i) => (
              <Reveal as={Link} className="card" href={`/${r.slug}`} key={r.slug} index={i}>
                <div className="num">{String(i + 1).padStart(2, "0")}</div>
                <h3>{r.name}</h3>
                <p>{r.conditions.map((c) => c.name).join(", ")}.</p>
                <span className="arrow-link">{ch.verCondicoes}</span>
                <InlinePencil
                  collection="regions"
                  id={r.id}
                  canDelete
                  title={`Editar: ${r.name}`}
                  fields={[
                    { name: "name", label: "Nome da área", type: "text", value: r.name },
                    { name: "h1", label: "H1 (página da área)", type: "text", value: r.h1 },
                    { name: "intro", label: "Introdução (página da área)", type: "textarea", value: r.intro },
                  ]}
                />
              </Reveal>
            ))}
            <Reveal as={Link} className="card" href="/tratamentos" style={{ background: "var(--navy-deep)" }} index={regions.length}>
              <div className="num" style={{ color: "var(--gold-lite)" }}>→</div>
              <h3 style={{ color: "#fff" }}>{home.areas.promoTitle}</h3>
              <p style={{ color: "#bdbdbd" }}>{home.areas.promoText}</p>
              <span className="arrow-link light">{ch.explorar}</span>
            </Reveal>
            <InlineAdd
              collection="regions"
              label="Adicionar área"
              title="Nova área do corpo"
              fields={[
                { name: "name", label: "Nome da área", type: "text", value: "" },
                { name: "h1", label: "H1 (página da área)", type: "text", value: "" },
                { name: "intro", label: "Introdução", type: "textarea", value: "" },
                { name: "slug", label: "Slug (URL — deixe vazio para gerar do nome)", type: "text", value: "" },
              ]}
            />
          </div>
        </div>
      </section>

      {/* APPROACH BAND */}
      <InlineEdit
        globalSlug="home"
        title="Editar: Faixa (abordagem)"
        fields={[
          { name: "band.eyebrow", label: "Rótulo", type: "text", value: home.band.eyebrow },
          { name: "band.h2", label: "Título", type: "text", value: home.band.h2 },
          { name: "band.p", label: "Descrição", type: "textarea", value: home.band.p },
          { name: "band.button", label: "Botão", type: "text", value: home.band.button },
        ]}
      >
        <section className="band">
          <div className="wrap">
            <Reveal as="span" className="eyebrow" index={0}>{home.band.eyebrow}</Reveal>
            <Reveal as="h2" index={1}>{home.band.h2}</Reveal>
            <Reveal as="p" index={2}>{home.band.p}</Reveal>
            <Reveal as="div" index={3}>
              <Link className="btn btn-gold" href="#agendar">{home.band.button}</Link>
            </Reveal>
          </div>
        </section>
      </InlineEdit>

      {/* STEPS */}
      <section>
        <div className="wrap approach">
          <InlineEdit
            globalSlug="home"
            title="Editar: Passos (cabeçalho)"
            fields={[
              { name: "steps.eyebrow", label: "Rótulo", type: "text", value: home.steps.eyebrow },
              { name: "steps.h2", label: "Título", type: "text", value: home.steps.h2 },
              { name: "steps.p", label: "Descrição", type: "textarea", value: home.steps.p },
            ]}
          >
            <div>
              <Reveal as="span" className="eyebrow" index={0}>{home.steps.eyebrow}</Reveal>
              <Reveal as="h2" index={1}>{home.steps.h2}</Reveal>
              <Reveal as="p" index={2}>{home.steps.p}</Reveal>
            </div>
          </InlineEdit>
          <div className="steps">
            {home.stepItems.map((s, i) => (
              <Reveal as="div" className="step inline-rel" key={i} index={i}>
                <div className="n">{i + 1}</div>
                <div>
                  <b>{s.t}</b>
                  <span>{s.d}</span>
                </div>
                <InlineArrayItem
                  globalSlug="home"
                  field="stepItems"
                  items={home.stepItems}
                  index={i}
                  title={`Editar passo ${i + 1}`}
                  itemFields={[
                    { name: "t", label: "Título", type: "text" },
                    { name: "d", label: "Descrição", type: "textarea" },
                  ]}
                />
              </Reveal>
            ))}
            <InlineArrayAdd
              globalSlug="home"
              field="stepItems"
              items={home.stepItems}
              label="Passo"
              title="Novo passo"
              className="inline-add-row"
              itemFields={[
                { name: "t", label: "Título", type: "text" },
                { name: "d", label: "Descrição", type: "textarea" },
              ]}
            />
          </div>
        </div>
      </section>

      {/* TREATMENTS */}
      <section className="bg-off">
        <div className="wrap">
          <InlineEdit
            globalSlug="home"
            title="Editar: Tratamentos (cabeçalho)"
            fields={[
              { name: "treatments.eyebrow", label: "Rótulo", type: "text", value: home.treatments.eyebrow },
              { name: "treatments.h2", label: "Título", type: "text", value: home.treatments.h2 },
              { name: "treatments.p", label: "Descrição", type: "textarea", value: home.treatments.p },
            ]}
          >
            <div className="sec-head center">
              <Reveal as="span" className="eyebrow" index={0}>{home.treatments.eyebrow}</Reveal>
              <Reveal as="h2" index={1}>{home.treatments.h2}</Reveal>
              <Reveal as="p" index={2}>{home.treatments.p}</Reveal>
            </div>
          </InlineEdit>
          <div className="cards" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
            {treatments.map((t, i) => (
              <Reveal as={Link} className="card" href={`/tratamentos/${t.slug}`} key={t.slug} index={i}>
                <div className="num">{t.tag}</div>
                <h3 style={{ fontSize: 22 }}>{t.short}</h3>
                <p>{t.intro}</p>
                <span className="arrow-link">{ch.saibaMais}</span>
                <InlinePencil
                  collection="treatments"
                  id={t.id}
                  canDelete
                  title={`Editar: ${t.short}`}
                  fields={[
                    { name: "name", label: "Nome completo", type: "text", value: t.name },
                    { name: "short", label: "Nome curto", type: "text", value: t.short },
                    { name: "tag", label: "Rótulo", type: "text", value: t.tag },
                    { name: "h1", label: "H1 (página do tratamento)", type: "text", value: t.h1 },
                    { name: "intro", label: "Descrição (card)", type: "textarea", value: t.intro },
                  ]}
                />
              </Reveal>
            ))}
            <InlineAdd
              collection="treatments"
              label="Adicionar tratamento"
              title="Novo tratamento"
              fields={[
                { name: "name", label: "Nome completo", type: "text", value: "" },
                { name: "short", label: "Nome curto", type: "text", value: "" },
                { name: "tag", label: "Rótulo (ex.: Regenerativa)", type: "text", value: "" },
                { name: "h1", label: "H1 (página do tratamento)", type: "text", value: "" },
                { name: "intro", label: "Descrição (card)", type: "textarea", value: "" },
                { name: "slug", label: "Slug (URL — deixe vazio para gerar do nome)", type: "text", value: "" },
              ]}
            />
          </div>
        </div>
      </section>

      {/* GOOGLE REVIEWS */}
      <GoogleReviews />

      {/* TESTIMONIALS CAROUSEL */}
      <InlineEdit
        globalSlug="pages"
        title="Editar: Depoimentos (carrossel)"
        fields={[
          { name: "testimonials.eyebrow", label: "Rótulo", type: "text", value: tst.eyebrow },
          { name: "testimonials.heading", label: "Título", type: "text", value: tst.heading },
          { name: "testimonials.note", label: "Aviso (rodapé do carrossel)", type: "text", value: tst.note },
        ]}
      >
        <Testimonials items={reviewItems} eyebrow={tst.eyebrow} heading={tst.heading} note={tst.note} />
      </InlineEdit>

      {/* QUOTE */}
      <InlineEdit
        globalSlug="home"
        title="Editar: Citação"
        fields={[
          { name: "quote.text", label: "Texto", type: "textarea", value: home.quote.text },
          { name: "quote.cite", label: "Autor", type: "text", value: home.quote.cite },
        ]}
      >
        <section className="quote" id="sobre">
          <div className="wrap">
            <Reveal as="span" className="mark" index={0}>&ldquo;</Reveal>
            <Reveal as="blockquote" index={1}>{home.quote.text}</Reveal>
            <Reveal as="cite" index={2}>{home.quote.cite}</Reveal>
          </div>
        </section>
      </InlineEdit>

      {/* LOCALIZAÇÃO — mapa em tela cheia (largura total, sem texto) */}
      <section className="loc-map-full-sec" aria-label="Localização do consultório">
        <ClinicMap address={site.address} clinicName={site.clinicName ?? site.doctor} full />
      </section>

      <CtaBand />
    </>
  );
}
