import Image from 'next/image';
import { ArrowRight, Phone } from 'lucide-react';
import { business, links } from '@/lib/site';
import { GoogleG, Star } from './Icons';
import ConsultForm from './ConsultForm';

export default function Hero({ rating, count }: { rating: number; count: number }) {
  const lines = ['Ceramic, PPF &', 'upgrades for cars', 'that are loved.'];
  return (
    <section className="hero" data-enter data-hero aria-labelledby="hero-h">
      <div className="hero__bg" aria-hidden="true" />
      <div className="wrap">
        <div className="hero__grid">
          <div className="hero__copy">
            <p className="eyebrow enter-fade" style={{ ['--i' as string]: 0, margin: 0 }}>
              Secunderabad · Next to KIMS, Minister Road
            </p>
            <h1 className="h1" id="hero-h">
              {lines.map((l, i) => (
                <span className="enter-line" key={l}>
                  <span style={{ ['--i' as string]: i }}>{i === 2 ? <>that are <span className="text-signal">loved.</span></> : l}</span>
                </span>
              ))}
            </h1>
            <p className="lead">
              Ceramic, graphene and PPF protection, wraps, tints, audio, lighting and seat covers, fitted in our Minister Road studio. Come in, touch the materials, and leave with a car that looks new for years.
            </p>
            <div className="hero__ctas enter-fade" style={{ ['--i' as string]: 2 }}>
              <a href="#book" className="btn btn--primary btn--xl">
                Book a consultation <ArrowRight className="arrow" aria-hidden="true" />
              </a>
              <a href={links.tel} className="btn btn--xl" data-track="click_call">
                <Phone aria-hidden="true" /> Call {business.phoneDisplay}
              </a>
            </div>
            <div className="hero__proof enter-fade" style={{ ['--i' as string]: 3 }}>
              <a href={links.reviews} target="_blank" rel="noopener noreferrer" className="link link--bare" data-track="click_review">
                <GoogleG className="g" />
                <span className="stars" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} />
                  ))}
                </span>
                <span>
                  <b>{rating.toFixed(1)}</b> · {count} Google reviews
                </span>
              </a>
              <span className="mono">A unit of Car Jewel · since {business.parentSince}</span>
            </div>
          </div>

          <div className="hero__visual">
            <div className="frame hero__photo">
              <Image
                src="/images/store/storefront-xuv700.webp"
                alt="Black Mahindra XUV700 parked in front of the lit Shine Squad signboard on Minister Road"
                fill
                priority
                fetchPriority="high"
                sizes="(min-width: 1024px) 560px, 100vw"
              />
              <span className="sweep" aria-hidden="true" />
              <span className="pill hero__tag">
                <span className="dot dot--ok" aria-hidden="true" /> The studio, Minister Road
              </span>
            </div>
          </div>
        </div>
        <div className="consult-wrap enter-fade" style={{ ['--i' as string]: 4 }}>
          <ConsultForm variant="bar" />
        </div>
      </div>
    </section>
  );
}
