import { ArrowRight } from 'lucide-react';
import { MAIN_ACTION } from '@/lib/site';

/** The place hero: one still photograph of the shop with nothing on it (a layer), the words on the ground below. */
export default function Hero() {
  return (
    <section className="hero hero--place" data-enter data-hero aria-labelledby="hero-h">
      <picture className="hero__bg">
        {/* Phones and tablets: the shopfront from the signboard down, an XUV700 at the door. Wider screens: the signboard and open shop floor. */}
        <source media="(max-width: 1023px)" srcSet="/images/store/storefront-sign-480.webp 480w, /images/store/storefront-sign-708.webp 708w" sizes="100vw" />
        <source srcSet="/images/builds/storefront-wide-828.webp 828w, /images/builds/storefront-wide-1280.webp 1280w" sizes="(min-width: 1440px) 1200px, calc(100vw - 96px)" />
        <img
          src="/images/builds/storefront-wide-1280.webp"
          alt="The Shine Squad signboard and shopfront on Minister Road"
          width={1280}
          height={551}
          fetchPriority="high"
          decoding="async"
        />
      </picture>
      <div className="wrap">
        <div className="grid hero-text">
          <h1 className="t-h1 enter" id="hero-h" style={{ ['--i' as string]: 0 }}>
            Car protection studio on Minister Road
          </h1>
          <div className="hero__side enter" style={{ ['--i' as string]: 1 }}>
            <p>Ceramic, PPF, wraps and accessories next to KIMS. Monday to Saturday, 10 am to 10 pm.</p>
            <a href="#book" className="btn btn--primary">
              {MAIN_ACTION} <ArrowRight className="arrow" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
