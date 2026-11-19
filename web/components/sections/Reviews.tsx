/* eslint-disable @next/next/no-img-element */
import { ArrowUpRight } from 'lucide-react';
import { links } from '@/lib/site';
import type { Review, ReviewData } from '@/lib/reviews';
import { Star } from '../Icons';

/** Real Google reviews, as written, each opening that exact review on Google Maps. */
export default function Reviews({ data }: { data: ReviewData }) {
  const picked: Review[] = data.reviews.slice(0, 3);
  return (
    <section className="reviews" id="reviews" aria-labelledby="reviews-h">
      <div className="wrap">
        <div className="reviews__head">
          <div>
            <p className="caps muted">Google reviews</p>
            <h2 className="serif t-xl" id="reviews-h" data-lines>
              Rated {data.rating.toFixed(1)} by {data.count} drivers
            </h2>
          </div>
          <a className="cta" href={links.reviews} target="_blank" rel="noopener noreferrer" data-track="click_review">
            Read all reviews <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
        <ul className="reviews__grid" data-stagger>
          {picked.map((r) => (
            <li key={r.id} style={{ display: 'grid' }}>
              <a className="review" href={r.url} target="_blank" rel="noopener noreferrer" data-track="click_review">
                <span className="review__stars" role="img" aria-label={`${r.rating} out of 5 stars`}>
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} />
                  ))}
                </span>
                <span className="review__text">&ldquo;{r.text}&rdquo;</span>
                <span className="review__who">
                  {r.avatar ? <img src={r.avatar} alt="" width={36} height={36} loading="lazy" referrerPolicy="no-referrer" /> : null}
                  <span>
                    <span className="review__name">{r.author}</span>
                    <span className="review__meta">
                      {r.meta ? `${r.meta} · ` : ''}
                      {r.relativeTime}
                    </span>
                  </span>
                </span>
                <span className="sr-only">(opens on Google Maps)</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
