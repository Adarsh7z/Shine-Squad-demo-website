import { ArrowUpRight, PenLine } from 'lucide-react';
import { links } from '@/lib/site';
import type { ReviewData } from '@/lib/reviews';
import { GoogleG, Star } from '../Icons';
import ReviewRail from './ReviewRail';

export default function Reviews({ data }: { data: ReviewData }) {
  const pct = Math.max(0, Math.min(100, (data.rating / 5) * 100));
  return (
    <section className="section" id="reviews" aria-labelledby="reviews-h">
      <div className="wrap">
        <div className="section-head section-head--split">
          <div>
            <p className="eyebrow eyebrow--both reveal">Testimonials</p>
            <h2 className="h2 reveal" id="reviews-h">
              Hear from our happy customers
            </h2>
            <p className="lead reveal" style={{ marginTop: 20 }}>
              Real reviews from our Google listing. Tap any card to read it on Google Maps.
            </p>
          </div>
          <div className="rating-card">
            <div className="rating-card__top">
              <GoogleG className="rating-card__g" />
              <span className="rating-card__num">{data.rating.toFixed(1)}</span>
              <span style={{ display: 'grid', gap: 6 }}>
                <span className="stars-precise" role="img" aria-label={`${data.rating.toFixed(1)} out of 5 stars`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} />
                  ))}
                  <span className="stars-precise__fill" style={{ width: `${pct}%` }} aria-hidden="true">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} />
                    ))}
                  </span>
                </span>
                <span style={{ fontSize: '0.88rem', color: 'var(--mist)' }}>Based on {data.count} Google reviews</span>
              </span>
            </div>
            <div className="rating-card__btns">
              <a href={links.reviews} target="_blank" rel="noopener noreferrer" className="btn btn--primary" data-track="click_review">
                Read all reviews on Google <ArrowUpRight className="arrow" aria-hidden="true" />
              </a>
              <a href={links.writeReview} target="_blank" rel="noopener noreferrer" className="btn" data-track="click_write_review">
                <PenLine aria-hidden="true" /> Write a review
              </a>
            </div>
          </div>
        </div>

        <ReviewRail reviews={data.reviews} count={data.count} allUrl={links.reviews} />

        <p className="attribution">
          <GoogleG /> Reviews and rating from Google. Shown as written by customers.
        </p>
      </div>
    </section>
  );
}
