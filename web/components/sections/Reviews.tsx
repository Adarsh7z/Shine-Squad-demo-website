/* eslint-disable @next/next/no-img-element */
import { ArrowUpRight } from 'lucide-react';
import { links } from '@/lib/site';
import type { Review, ReviewData } from '@/lib/reviews';
import { Star } from '../Icons';

/** Google serves review photos at any size: ask for one big enough for a 4:3 frame on a sharp screen. */
const sized = (url: string) => url.replace(/=w\d+-h\d+-p-k-no$/, '=w800-h600-p-k-no');
/** A landscape photo suits the 4:3 frame best: take the first one wider than tall, else the first. */
const pickPhoto = (photos: string[]) =>
  photos.find((p) => {
    const m = p.match(/=w(\d+)-h(\d+)/);
    return m ? Number(m[1]) > Number(m[2]) : false;
  }) ?? photos[0];

/** Real Google reviews: the customer's own photograph, their words as written, their face and name. */
export default function Reviews({ data }: { data: ReviewData }) {
  const picked: Review[] = [...data.reviews].sort((a, b) => Number(b.photos.length > 0) - Number(a.photos.length > 0)).slice(0, 3);
  return (
    <section className="section" id="reviews" aria-labelledby="reviews-h" style={{ ['--hm' as string]: 2 }}>
      <div className="wrap">
        <div className="head-row">
          <h2 className="t-h2" id="reviews-h">
            Reviews on Google
          </h2>
          <div className="head-row__side">
            <p>
              Rated <b style={{ fontWeight: 500, color: 'var(--ink)' }}>{data.rating.toFixed(1)} out of 5</b> from {data.count} Google reviews.
            </p>
            <a className="link--arrow" href={links.reviews} target="_blank" rel="noopener noreferrer" data-track="click_review">
              Read all reviews on Google <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </div>
        <ul className="reviews">
          {picked.map((r) => (
            <li key={r.id}>
              <a className="review lift" href={r.url} target="_blank" rel="noopener noreferrer" data-track="click_review">
                {r.photos[0] ? (
                  <span className="ph ph--link">
                    <img src={sized(pickPhoto(r.photos))} alt={`Photo from ${r.author}'s review`} loading="lazy" decoding="async" referrerPolicy="no-referrer" width={800} height={600} />
                  </span>
                ) : null}
                <span className="review__stars" role="img" aria-label={`${r.rating} out of 5 stars`}>
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} />
                  ))}
                </span>
                <span className="review__text">{r.text}</span>
                <span className="review__who">
                  {r.avatar ? <img src={r.avatar} alt="" width={40} height={40} loading="lazy" referrerPolicy="no-referrer" /> : null}
                  <span>
                    <span className="review__name" style={{ display: 'block' }}>
                      {r.author}
                    </span>
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
