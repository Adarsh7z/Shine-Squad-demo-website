'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ArrowUpRight, Play } from 'lucide-react';
import { builds, business } from '@/lib/site';
import { YouTube } from '../Icons';

function BuildCard({ id, title, work, big }: { id: string; title: string; work: string; big?: boolean }) {
  const [play, setPlay] = useState(false);
  return (
    <article className="card card--link gloss build">
      <div className="build__media zoom">
        {play ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
            title={`${title}: build video`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button type="button" onClick={() => setPlay(true)} aria-label={`Play video: ${title}, ${work}`} style={{ all: 'unset', position: 'absolute', inset: 0, cursor: 'pointer' }}>
            <Image src={`/images/builds/${id}.webp`} alt="" fill sizes={big ? '(min-width: 1100px) 760px, 100vw' : '(min-width: 1100px) 420px, (min-width: 720px) 50vw, 100vw'} style={{ objectFit: 'cover' }} />
            <span className="build__play" aria-hidden="true">
              <Play fill="currentColor" />
            </span>
          </button>
        )}
      </div>
      <div className="build__body">
        <strong>{title}</strong>
        <span>{work}</span>
      </div>
    </article>
  );
}

export default function Builds() {
  const shown = builds.slice(0, 6);
  return (
    <section className="section" id="builds" aria-labelledby="builds-h">
      <div className="wrap">
        <div className="section-head section-head--split">
          <div>
            <p className="eyebrow reveal">Recent builds</p>
            <h2 className="h2 reveal" id="builds-h">
              Builds that came out of our bay
            </h2>
          </div>
          <div style={{ display: 'grid', gap: 20, justifyItems: 'start' }}>
            <p className="lead reveal">
              From a Porsche Cayenne&rsquo;s red leather interior to a matte-black Thar Roxx. Every build is filmed by our Car Jewel team. Press play to watch.
            </p>
            <a className="link" href={business.youtube} target="_blank" rel="noopener noreferrer">
              <YouTube style={{ width: 18, height: 18, color: '#FF0033' }} /> More builds on YouTube <ArrowUpRight className="arrow arrow--diag" aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="builds-grid">
          {shown.map((b, i) => (
            <BuildCard key={b.id} {...b} big={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
