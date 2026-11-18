import { business, placeId } from './site';

export type Review = {
  id: string;
  author: string;
  authorUrl?: string;
  avatar?: string;
  rating: number;
  relativeTime: string;
  text: string;
  url: string;
  photos: string[];
  meta?: string;
};

export type ReviewData = {
  rating: number;
  count: number;
  reviews: Review[];
  source: 'google-live' | 'curated';
};

const CID_HEX = '0xae29b121f1c2e105';
/** Deep link that opens one specific review on Google Maps. */
export const reviewLink = (reviewId: string) =>
  `https://www.google.com/maps/reviews/data=!4m6!14m5!1m4!2m3!1s${reviewId}!2m1!1s0x0:${CID_HEX}`;

// Real reviews from the Google Business listing, copied unedited (Nov 2026).
// Used when the live Places API is not configured or unavailable.
export const curatedReviews: Review[] = [
  {
    id: 'ChdDSUhNMG9nS0VJQ0FnSURSNExhNzhBRRAB',
    author: 'Ujwal Raj',
    authorUrl: 'https://www.google.com/maps/contrib/102285807496284058969/reviews',
    avatar: 'https://lh3.googleusercontent.com/a/ACg8ocKSzhSf7M7zX3neZYi4nx-t8OKY50eu3PVP8QkaWtaAgm9J=w96-h96-p-rp-mo-br100',
    rating: 5,
    relativeTime: '3 years ago',
    meta: 'Ceramic coating',
    text: 'SHINE SQUAD has done a fantastic job as promised in completing  the ceramic coating for my car which is 5 years old and now it looks brand new. Great job chandu bhai and  team of #SHINESQUAD',
    url: reviewLink('ChdDSUhNMG9nS0VJQ0FnSURSNExhNzhBRRAB'),
    photos: [
      'https://lh3.googleusercontent.com/grass-cs/AABkmLfDjUp4-KERjFA4NTSK18zIXf_rd-bL0_RiD3XNQuKrRU8bGj9dfBUyw855Id4idSEIwdUb3f1HYDT-egNt7X-OTwuC601-5EmI0qclW1z3W00bI0PFvQUh1t2VhoCz-u4VX8bx=w300-h450-p-k-no',
      'https://lh3.googleusercontent.com/grass-cs/AABkmLeMkQkPsudfH5wWRv1GlEpIXU_VZDGL6T10DAoKSnY9zcNZumqrO3EHYn024S_vqViZE49eWOVBevJCxhv4LmWaM_YxK9yS2IHiqxn-tCii8yjEWpCQ3jvIRvHiEm2WbbZ4J9bH=w300-h225-p-k-no',
      'https://lh3.googleusercontent.com/grass-cs/AABkmLc3DNLSZUrc9IJVj6LpvmB1-1v2HLGfc7ASNhWXqLIUnYlglfG7qAP9IIpmEN-NOv4UTjpg8wFNzafDWgiNjI4xsSpbHUEsYdDOMbQlZUk0w5_r9OkV7X6wYvYyJu34JyD7plxN=w300-h225-p-k-no',
    ],
  },
  {
    id: 'ChZDSUhNMG9nS0VJQ0FnSURacUtDa1VREAE',
    author: 'nishanthkumar pippalapally',
    authorUrl: 'https://www.google.com/maps/contrib/107834885995411286212/reviews',
    avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjWeep2vFqfYdoP49mk9gHKjqCyg2jm47MIwtCyCl87AbTNkCHhBWA=w96-h96-p-rp-mo-br100',
    rating: 5,
    relativeTime: '3 years ago',
    meta: 'LED lamps & horns',
    text: 'Installed 200W LED LAMPS in VOLVO S60 & HORNS. Pricing and quality service is amazing. Now will be a regular customer and recommend everyone for shine squad and car jewel ⭐️⭐️⭐️⭐️⭐️',
    url: reviewLink('ChZDSUhNMG9nS0VJQ0FnSURacUtDa1VREAE'),
    photos: [
      'https://lh3.googleusercontent.com/grass-cs/AABkmLegFAy420JWSPSY15y0j_K4euq5kMUplbeUkZ6HW8AnWfF31oDFe-hsA0U4l_km-PWH1JFDImezlMZU4xpyqiUYT0_UNlF-KYqpoRK4rtRrMJKXHpTJ4E42K0Gys3f4s0LqeanA6A=w300-h450-p-k-no',
      'https://lh3.googleusercontent.com/grass-cs/AABkmLdmDX2aCf7uzviy4togLawfg4dPRJ9tNhjj1w0PfKJAuELOEwGcpF7_7_oOvJvonr-am_d9dfUv06jC-7DlfX3yIHfv5bkasDw4uxc9lWL60C6ZRtTfAUt-7UU2nMSum5Wnd7H9=w300-h450-p-k-no',
    ],
  },
  {
    id: 'ChZDSUhNMG9nS0VJQ0FnSUNSOFl2VUpBEAE',
    author: 'Pranav Lall',
    authorUrl: 'https://www.google.com/maps/contrib/109196826587893633470/reviews',
    avatar: 'https://lh3.googleusercontent.com/a/ACg8ocIi1BvrJ-m2vKDXA1fGa_rx9GCAJmiTjbLlyJEpu7roM4syPQ=w96-h96-p-rp-mo-br100',
    rating: 5,
    relativeTime: '3 years ago',
    meta: 'Accessories',
    text: 'Great place! Great service.. had am amazing experience getting my new Kia Carens done up with accessories! Really recommended for all your car needs.',
    url: reviewLink('ChZDSUhNMG9nS0VJQ0FnSUNSOFl2VUpBEAE'),
    photos: [
      'https://lh3.googleusercontent.com/grass-cs/AABkmLcVmCfl68LLHFLgLjhvgsQq_4zt9ctJQib40xzPPz8v6LgzsVP_nq1CJQCfXQ2n8VpfvVsGsm03MmuMZhFkzFeFuKgPZ0iq91YjyFYHNb9CPDf2YQjRiQgtfj0CnE_hksOn-xscmQ=w600-h450-p-k-no',
    ],
  },
  {
    id: 'ChdDSUhNMG9nS0VJQ0FnSUNael9MaGl3RRAB',
    author: 'NRN ENTERPRISES',
    authorUrl: 'https://www.google.com/maps/contrib/107784813592243186486/reviews',
    avatar: 'https://lh3.googleusercontent.com/a/ACg8ocJ2js21T700x8IhznZ-4yWS7cfac5Rg5_fNWi7XTfRLfuOnqQ=w96-h96-p-rp-mo-br100',
    rating: 5,
    relativeTime: '3 years ago',
    meta: 'Honda Elevate build',
    text: 'First modification first vehicle in hyderabad for Honda Elevate.   Excellent outstanding job.',
    url: reviewLink('ChdDSUhNMG9nS0VJQ0FnSUNael9MaGl3RRAB'),
    photos: [
      'https://lh3.googleusercontent.com/grass-cs/AABkmLcB7a2LlbRBr8Or8kScTFnXXBoEVljCdruEZS8hp75A11KqkB9mM1L3TJv8pFRNI4kOJtymzkmnJ_MG5cq3rYPNEJJR2NyF-ENW0qtVHHj8lBldfwuG_1HVDwfnxmR5Y-1-RYUy=w300-h225-p-k-no',
      'https://lh3.googleusercontent.com/grass-cs/AABkmLeORafei9WB0LByPVeeirSTv9NNovwgAheHi3nuN8b1psoEYB6sdW1sFM37y6HIt-ZONVemxiWYrUrho0zroDSE15_0xLMWlEA3Ktu_So-nbaEEUlLgTQ_wv1qebKwbPUNWnkWmRQ=w300-h225-p-k-no',
      'https://lh3.googleusercontent.com/grass-cs/AABkmLf6l0zXpW_wUCFtQS4H7-HwKvNhif7Q0XA4MbwT_h4kkKbuSZ20Xus1MyIP9XYxProjHPD1eTqMwIu8cR7DAWlnFOE50BOn2riFVWmNafVcrxpAhy74-MEU1NUPU4TGScbXAaKn=w300-h225-p-k-no',
    ],
  },
];

type PlacesReview = {
  name?: string;
  rating?: number;
  relativePublishTimeDescription?: string;
  text?: { text?: string };
  originalText?: { text?: string };
  authorAttribution?: { displayName?: string; uri?: string; photoUri?: string };
  googleMapsUri?: string;
};

/** Live reviews from Google Places API (New), fetched at build time. Falls back to curated reviews. */
export async function getReviews(): Promise<ReviewData> {
  const key = process.env.GOOGLE_MAPS_API_KEY;
  const fallback: ReviewData = { rating: business.rating.value, count: business.rating.count, reviews: curatedReviews, source: 'curated' };
  if (!key || !placeId) return fallback;
  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${placeId}?languageCode=en`, {
      headers: { 'X-Goog-Api-Key': key, 'X-Goog-FieldMask': 'rating,userRatingCount,reviews,googleMapsUri' },
      cache: 'force-cache', // fetched once per build; a daily Cloudflare deploy hook keeps it fresh
    });
    if (!res.ok) return fallback;
    const data = (await res.json()) as { rating?: number; userRatingCount?: number; reviews?: PlacesReview[]; googleMapsUri?: string };
    const live: Review[] = (data.reviews ?? [])
      .filter((r) => (r.rating ?? 0) >= 4 && (r.originalText?.text || r.text?.text))
      .map((r, i) => ({
        id: r.name ?? String(i),
        author: r.authorAttribution?.displayName ?? 'Google user',
        authorUrl: r.authorAttribution?.uri,
        avatar: r.authorAttribution?.photoUri,
        rating: r.rating ?? 5,
        relativeTime: r.relativePublishTimeDescription ?? '',
        text: r.originalText?.text ?? r.text?.text ?? '',
        url: r.googleMapsUri ?? data.googleMapsUri ?? '',
        photos: [],
      }));
    // Merge: live first, then curated ones not already present.
    const names = new Set(live.map((r) => r.author.toLowerCase()));
    const merged = [...live, ...curatedReviews.filter((r) => !names.has(r.author.toLowerCase()))];
    return {
      rating: data.rating ?? fallback.rating,
      count: data.userRatingCount ?? fallback.count,
      reviews: merged,
      source: 'google-live',
    };
  } catch {
    return fallback;
  }
}
