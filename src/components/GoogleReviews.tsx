import { site } from "@/content/site";
import Reveal from "@/components/Reveal";
import InlineEdit from "@/components/inline/InlineEdit";
import { getGoogleReviews } from "@/lib/googleReviews";
import { getPages, getUI } from "@/lib/content";

function GoogleG({ size = 22 }: { size?: number }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} aria-hidden>
      <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
      <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
      <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z" />
      <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z" />
    </svg>
  );
}

export default async function GoogleReviews() {
  const [g, pages, ui] = await Promise.all([getGoogleReviews(), getPages(), getUI()]);
  const r = pages.reviews;
  const rl = ui.reviews;
  const ratingNum = g?.rating ?? site.rating;
  const rating = ratingNum.toFixed(1).replace(".", ",");
  const total = g?.total ?? site.reviewCount;
  const featured = g?.reviews?.[0];

  return (
    <InlineEdit
      globalSlug="pages"
      title="Editar: Avaliações do Google"
      fields={[
        { name: "reviews.eyebrow", label: "Rótulo", type: "text", value: r.eyebrow },
        { name: "reviews.heading", label: "Título", type: "text", value: r.heading },
        { name: "reviews.verified", label: "Texto — perfil verificado", type: "text", value: r.verified },
        { name: "reviews.fallbackQuote", label: "Citação padrão (sem API)", type: "textarea", value: r.fallbackQuote },
        { name: "reviews.button", label: "Botão", type: "text", value: r.button },
      ]}
    >
      <section className="reviews">
        <div className="wrap">
          <Reveal as="span" className="eyebrow" index={0}>
            {r.eyebrow}
          </Reveal>
          <Reveal as="h2" index={1}>
            {r.heading}
          </Reveal>

          <Reveal as="div" className="reviews-badge" index={2}>
            <div className="reviews-score">
              <span className="num">{rating}</span>
              <span className="stars" aria-label={`${rating} de 5 estrelas`}>★★★★★</span>
            </div>
            <div className="reviews-meta">
              <span className="gline">
                <GoogleG /> <strong>{total}</strong>&nbsp;{rl.avaliacoesGoogle}
              </span>
              <span className="verified">{r.verified} · {site.clinicName}</span>
            </div>
          </Reveal>

          <Reveal as="blockquote" className="reviews-quote" index={3}>
            {featured ? `“${featured.text}”` : `“${r.fallbackQuote}”`}
          </Reveal>
          {featured && (
            <Reveal as="cite" className="reviews-cite" index={4}>
              — {featured.author}
              {featured.relative ? `, ${featured.relative}` : ""}
            </Reveal>
          )}

          <Reveal as="div" index={5}>
            <a className="btn btn-outline-l" href={site.googleReviewsUrl} target="_blank" rel="noopener">
              {r.button}
            </a>
          </Reveal>
        </div>
      </section>
    </InlineEdit>
  );
}
