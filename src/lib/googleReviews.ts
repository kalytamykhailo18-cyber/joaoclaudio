// Busca avaliações reais do Google (Places API) quando GOOGLE_PLACES_API_KEY e
// GOOGLE_PLACE_ID estiverem configurados. Sem eles, retorna null e o site usa
// o estado atual (nota 5,0 · 569 + carrossel de demonstração) como fallback.
// Cache diário (revalidate) para respeitar a cota da API.

export type GoogleReview = {
  author: string;
  rating: number;
  text: string;
  photo: string;
  relative: string;
};

export type GoogleReviewsData = {
  rating: number;
  total: number;
  reviews: GoogleReview[];
} | null;

export async function getGoogleReviews(): Promise<GoogleReviewsData> {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  if (!key || !placeId) return null;

  try {
    const url =
      "https://maps.googleapis.com/maps/api/place/details/json" +
      `?place_id=${encodeURIComponent(placeId)}` +
      "&fields=rating,user_ratings_total,reviews" +
      "&reviews_sort=newest&language=pt-BR" +
      `&key=${encodeURIComponent(key)}`;

    const res = await fetch(url, { next: { revalidate: 86400 } });
    if (!res.ok) return null;
    const data = await res.json();
    if (data.status !== "OK" || !data.result) return null;

    const r = data.result;
    const reviews: GoogleReview[] = (r.reviews ?? [])
      .filter((rv: { text?: string }) => rv.text && rv.text.trim().length > 0)
      .map((rv: Record<string, unknown>) => ({
        author: String(rv.author_name ?? ""),
        rating: Number(rv.rating ?? 5),
        text: String(rv.text ?? ""),
        photo: String(rv.profile_photo_url ?? ""),
        relative: String(rv.relative_time_description ?? ""),
      }));

    return {
      rating: Number(r.rating ?? 5),
      total: Number(r.user_ratings_total ?? 0),
      reviews,
    };
  } catch {
    return null;
  }
}
