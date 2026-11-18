'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import type { Review } from '@/lib/reviews';
import { GoogleG, Star } from '../Icons';

const palette = ['#FFC21A', '#7DD3FC', '#A7F3D0', '#FCA5A5', '#C4B5FD', '#FDBA74'];
const colourFor = (s: string) => palette[[...s].reduce((a, c) => a + c.charCodeAt(0), 0) % palette.length];

function Avatar({ name, src }: { name: string; src?: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <span className="avatar">
      {src && !failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="" width={44} height={44} loading="lazy" referrerPolicy="no-referrer" onError={() => setFailed(true)} />
      ) : (
        <span className="avatar__fallback" style={{ background: colourFor(name) }} aria-hidden="true">
          {name.trim().charAt(0).toUpperCase()}
        </span>
      )}
      <GoogleG className="avatar__g" />
    </span>
  );
}

function Photos({ photos }: { photos: string[] }) {
  const [ok, setOk] = useState<boolean[]>(() => photos.map(() => true));
  const visible = photos.slice(0, 3).filter((_, i) => ok[i]);
  if (!visible.length) return null;
  return (
    <span className="review__photos" aria-hidden="true">
      {photos.slice(0, 3).map((p, i) =>
        ok[i] ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={p} src={p} alt="" loading="lazy" referrerPolicy="no-referrer" onError={() => setOk((cur) => cur.map((v, k) => (k === i ? false : v)))} />
        ) : null
      )}
    </span>
  );
}

export default function ReviewRail({ reviews, count, allUrl }: { reviews: Review[]; count: number; allUrl: string }) {
  const track = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [progress, setProgress] = useState(0);

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft >= max - 4);
    setProgress(max > 0 ? el.scrollLeft / max : 1);
  }, []);

  useEffect(() => {
    update();
    const el = track.current;
    if (!el) return;
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [update]);

  const scrollByCard = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('.review');
    const step = card ? card.offsetWidth + parseFloat(getComputedStyle(el).columnGap || '20') : el.clientWidth * 0.8;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollBy({ left: dir * step, behavior: reduce ? 'auto' : 'smooth' });
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.target !== track.current) return;
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      scrollByCard(1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      scrollByCard(-1);
    }
  };

  return (
    <div>
      <div className="rail-head">
        <p className="mono" style={{ color: 'var(--smoke)', margin: 0 }}>
          <span className="hint-long">Swipe or use the arrows · tap a review to open it on Google</span>
          <span className="hint-short">Swipe for more →</span>
        </p>
        <div className="rail-head__btns">
          <button type="button" className="icon-btn" data-dir="prev" aria-label="Previous reviews" aria-disabled={atStart} onClick={() => scrollByCard(-1)}>
            <ArrowLeft aria-hidden="true" />
          </button>
          <button type="button" className="icon-btn" data-dir="next" aria-label="Next reviews" aria-disabled={atEnd} onClick={() => scrollByCard(1)}>
            <ArrowRight aria-hidden="true" />
          </button>
        </div>
      </div>

      <div ref={track} className="rail" role="region" aria-label="Google reviews of Shine Squad" tabIndex={0} onKeyDown={onKey} data-at-end={atEnd}>
        {reviews.map((r) => (
          <a
            key={r.id}
            href={r.url}
            target="_blank"
            rel="noopener noreferrer"
            className="card card--link gloss review"
            data-track="click_review"
          >
            <span className="review__head">
              <Avatar name={r.author} src={r.avatar} />
              <span>
                <span className="review__name" style={{ display: 'block' }}>{r.author}</span>
                <span className="review__time">{r.relativeTime} · Google</span>
              </span>
            </span>
            <span className="stars" aria-label={`${r.rating} out of 5 stars`}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} style={{ opacity: i < r.rating ? 1 : 0.2 }} />
              ))}
            </span>
            <p className="review__text">{r.text}</p>
            <Photos photos={r.photos} />
            <span className="review__foot">
              <span className="tag">{r.meta ?? 'Google review'}</span>
              <span className="review__cta">
                Read on Google <ArrowUpRight aria-hidden="true" />
                <span className="sr-only"> (opens in a new tab)</span>
              </span>
            </span>
          </a>
        ))}
        <a href={allUrl} target="_blank" rel="noopener noreferrer" className="card card--link gloss review review--more" data-track="click_review">
          <ArrowUpRight className="big" aria-hidden="true" />
          <span className="h3" style={{ display: 'block' }}>
            See all {count} reviews on Google
          </span>
          <span className="body">Read every review, including photos from customers, on our Google Maps listing.</span>
        </a>
      </div>
      <div className="rail-progress" aria-hidden="true">
        <i style={{ transform: `scaleX(${Math.max(0.08, progress)})` }} />
      </div>
    </div>
  );
}
