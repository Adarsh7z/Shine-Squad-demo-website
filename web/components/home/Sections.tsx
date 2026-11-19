/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { MAIN_ACTION, business } from '@/lib/site';
import { cine, type CineName } from '@/lib/cine';

function Pic({ name, alt, sizes, eager, className }: { name: CineName; alt: string; sizes: string; eager?: boolean; className?: string }) {
  const p = cine(name);
  return (
    <img
      className={className}
      src={p.src}
      srcSet={p.srcSet}
      sizes={sizes}
      width={p.width}
      height={p.height}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : undefined}
      decoding="async"
    />
  );
}

function Book({ solid }: { solid?: boolean }) {
  return (
    <Link href="#book" className={`cta${solid ? ' cta--solid' : ''}`}>
      {MAIN_ACTION} <ArrowRight aria-hidden="true" />
    </Link>
  );
}

/* 1 · Hero: the headline over the red i20 in the bay */
export function Hero() {
  return (
    <section className="hero" data-hero aria-labelledby="hero-h">
      <div className="hero__glow" aria-hidden="true" />
      <h1 className="hero__title serif t-hero" id="hero-h" data-hero-title>
        <span className="l1">Every Car Deserves</span>
        <span className="l2" data-blur>
          To Shine
        </span>
      </h1>
      <div className="hero__car" data-hero-car>
        <Pic name="i20" alt="Red Hyundai i20 with a deep gloss under the hexagon lights of the Shine Squad bay" sizes="(min-width: 1100px) 1180px, 170vw" eager />
      </div>
      <div className="hero__foot" data-hero-foot>
        <p className="caps">Ceramic · PPF · Detailing · Accessories</p>
        <a href="#book" className="cta">
          {MAIN_ACTION} <ArrowRight aria-hidden="true" />
        </a>
        <p className="hero__scroll caps" aria-hidden="true">
          Scroll <i />
        </p>
      </div>
    </section>
  );
}

/* 2 · Statement, with a trail of photographs moving past it */
const trail: { name: CineName; x: number; w: number; alt: string }[] = [
  { name: 'storefront-sign', x: 10, w: 20, alt: '' },
  { name: 'audio-shelf', x: 60, w: 17, alt: '' },
  { name: 'xuv700', x: 30, w: 30, alt: '' },
  { name: 'seat-covers-wall', x: 74, w: 19, alt: '' },
  { name: 'lighting-shelf', x: 22, w: 16, alt: '' },
  { name: 'vitara', x: 50, w: 28, alt: '' },
  { name: 'alloy-wheels-wall', x: 6, w: 18, alt: '' },
  { name: 'care-products', x: 66, w: 17, alt: '' },
];
export function Statement() {
  return (
    <section className="statement" data-statement aria-label="What we do">
      <div className="trail" aria-hidden="true">
        {trail.map((t) => (
          <div className="trail__img" key={t.name} style={{ left: `${t.x}%`, width: `calc(${t.w}vw * var(--trail-k, 1))`, aspectRatio: t.name === 'xuv700' || t.name === 'vitara' ? '16 / 10' : '4 / 5' }}>
            <Pic name={t.name} alt={t.alt} sizes="22vw" />
          </div>
        ))}
      </div>
      <h2 className="statement__text serif t-l" data-lines>
        We Don&rsquo;t Just Clean Cars
        <span className="l2">We Make Them Shine</span>
      </h2>
    </section>
  );
}

/* 3 · Approach: the studio, the brands we fit, how we work */
export function Approach() {
  return (
    <section className="approach" data-approach aria-labelledby="approach-h">
      <div className="approach__bg" data-reveal-bg>
        <Pic name="showroom" alt="The Shine Squad signboard over the open shop floor on Minister Road" sizes="100vw" />
      </div>
      <div className="wrap">
        <h2 className="serif t-xl" id="approach-h" data-lines>
          Our Approach
          <br />
          To Every Car
        </h2>
        <div className="approach__foot">
          <ul className="brands" aria-label="Brands we fit" data-fade>
            <li>JBL</li>
            <li>Pioneer</li>
            <li>Moco</li>
            <li>Turtle Wax</li>
            <li>Top Gear</li>
          </ul>
          <div className="approach__copy" data-fade>
            <p className="lede">Every job starts with your car in front of us: real samples of films, leathers and finishes to touch, and the scope and price agreed before any work begins.</p>
            <Book />
          </div>
        </div>
      </div>
    </section>
  );
}

/* 4 · Steps: three stages of a job, pinned */
const steps: { title: string; text: string; pic: CineName; alt: string }[] = [
  { title: 'Inspect', text: 'Your car comes into the bay. We check the paint, cabin and lights under studio light and show you real samples before you choose.', pic: 'seat-covers-wall', alt: 'Wall of seat-cover samples in the showroom' },
  { title: 'Craft', text: 'Decontamination and correction first, then coating, film or fitting, panel by panel, with photo updates on WhatsApp while we work.', pic: 'care-products', alt: 'Shelves of Turtle Wax car-care products in the showroom' },
  { title: 'Deliver', text: 'You collect the car at the agreed time, with a walk-round of the work and a printed guide to caring for it.', pic: 'vitara', alt: 'White Maruti Grand Vitara ready for collection after its refit' },
];
export function Steps() {
  return (
    <section className="steps" data-steps aria-labelledby="steps-h">
      <h2 className="sr-only" id="steps-h">
        How a job works
      </h2>
      <div className="steps__bg" aria-hidden="true">
        {steps.map((s) => (
          <Pic key={s.title} name={s.pic} alt="" sizes="40vw" />
        ))}
      </div>
      <div className="steps__inner">
        <div className="steps__card">
          {steps.map((s) => (
            <Pic key={s.title} name={s.pic} alt={s.alt} sizes="(min-width: 768px) 34vw, 60vw" />
          ))}
        </div>
        <div className="steps__text">
          {steps.map((s, i) => (
            <div className="step" key={s.title}>
              <p className="step__count caps">
                <b>0{i + 1}</b> / 03
              </p>
              <h3 className="serif t-xl">{s.title}</h3>
              <p className="lede">{s.text}</p>
              <Book />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 5 · Manifesto: the words light up as they pass */
export function Manifesto() {
  return (
    <section className="manifesto" data-manifesto aria-labelledby="manifesto-h">
      <div className="wrap manifesto__grid">
        <div className="manifesto__words">
          <h2 className="serif t-l" id="manifesto-h" data-words>
            A car should turn heads before it moves. Every panel, stitch and light is finished by hand.
          </h2>
          <p className="lede" data-fade>
            Shine Squad is a unit of {business.parent}, fitting cars on Minister Road since {business.parentSince}. Coatings, film, wraps, interiors, wheels, lighting and audio, all under one roof.
          </p>
          <div data-fade>
            <Book />
          </div>
        </div>
        <div className="manifesto__pic" data-parallax>
          <Pic name="alloy-wheels-wall" alt="Wall of alloy wheels in the Shine Squad showroom" sizes="(min-width: 900px) 34vw, 72vw" />
        </div>
      </div>
    </section>
  );
}

/* 6 · Services: pinned split, the photograph wipes in as each service arrives */
const svcs: { slug: string; title: string; text: string; pic: CineName; alt: string }[] = [
  { slug: 'ceramic-coating', title: 'Coating & PPF', text: 'Ceramic, graphene and paint protection film that keep a deep gloss and take the stone chips for you.', pic: 'xuv700', alt: 'Silver Mahindra XUV700 under the hexagon lights of the bay' },
  { slug: 'car-wrapping', title: 'Wraps & Tint', text: 'A new colour or finish with the paint safe underneath, and sun film for a cooler cabin with less glare.', pic: 'storefront-sign', alt: 'Black Mahindra XUV700 with tinted windows at the Shine Squad door' },
  { slug: 'seat-covers-mats', title: 'Interiors', text: 'Seat covers, floor mats and full leather wraps. Touch every grade on the wall before you choose.', pic: 'seat-covers-wall', alt: 'Wall of seat covers and floor mats in the showroom' },
  { slug: 'alloy-wheels', title: 'Wheels', text: 'A wall of alloy designs, sized and fitted for your car, with the stance it deserves.', pic: 'alloy-wheels-wall', alt: 'Wall of alloy wheels in the showroom' },
  { slug: 'lighting-upgrades', title: 'Lighting', text: 'Brighter headlights, projectors, DRLs and ambient light, wired cleanly and properly.', pic: 'lighting-shelf', alt: 'Shelf of LED headlamps and tail lamps' },
  { slug: 'audio-video', title: 'Audio', text: 'Speakers, amplifiers and Android screens with 360° cameras, from JBL, Pioneer and Moco.', pic: 'audio-shelf', alt: 'Shelf of JBL and Moco speakers and amplifiers' },
];
function SvcActions({ slug }: { slug: string }) {
  return (
    <div className="svc__actions">
      <Book />
      <Link className="textlink" href={`/services/${slug}`}>
        See the details <ArrowUpRight aria-hidden="true" />
      </Link>
    </div>
  );
}
export function Services() {
  return (
    <section className="services" id="services" data-services aria-labelledby="services-h">
      <h2 className="sr-only" id="services-h">
        Services
      </h2>
      <div className="services__pin">
        <p className="services__index caps" aria-hidden="true">
          <span>Service</span> <b data-svc-index>01</b> <span>/ 0{svcs.length}</span>
        </p>
        <div className="services__text">
          {svcs.map((s) => (
            <div className="svc" key={s.slug}>
              <h3 className="svc__title serif" data-chars>
                {s.title}
              </h3>
              <p className="lede">{s.text}</p>
              <SvcActions slug={s.slug} />
            </div>
          ))}
        </div>
        <div className="services__media">
          {svcs.map((s) => (
            <Pic key={s.slug} name={s.pic} alt={s.alt} sizes="50vw" />
          ))}
        </div>
      </div>
      <div className="wrap services__list">
        {svcs.map((s, i) => (
          <article className="svc-item" key={s.slug}>
            <div className="svc-item__pic">
              <Pic name={s.pic} alt={s.alt} sizes="(min-width: 768px) 45vw, 100vw" />
            </div>
            <div className="svc-item__text">
              <p className="caps muted">Service 0{i + 1}</p>
              <h3 className="serif t-xl">{s.title}</h3>
              <p className="lede">{s.text}</p>
              <SvcActions slug={s.slug} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* 7 · Dull ends here */
export function Dull() {
  return (
    <section className="dull" data-dull aria-labelledby="dull-h">
      <p className="dull__word" aria-hidden="true" data-dull-word>
        Dull
      </p>
      <div className="dull__pic" data-dull-pic>
        <Pic name="xuv700" alt="Silver Mahindra XUV700 with a deep gloss under the bay lights" sizes="100vw" />
      </div>
      <div className="dull__end" data-dull-end>
        <h2 className="serif t-xl" id="dull-h">
          <span className="sr-only">Dull paint </span>Ends Here
        </h2>
        <p className="lede" style={{ textAlign: 'center' }}>
          Coatings and film that keep the paint looking new for years, applied in our own bay next to KIMS.
        </p>
        <Book />
      </div>
    </section>
  );
}

/* 8 · Previous builds */
export function Builds() {
  return (
    <section className="feature" id="builds" data-feature aria-labelledby="builds-h">
      <div className="feature__bg" data-zoom>
        <Pic name="i20" alt="Red Hyundai i20 build in the Shine Squad bay" sizes="100vw" />
      </div>
      <div className="feature__text" data-fade>
        <p className="caps muted">Car Jewel on YouTube</p>
        <h2 className="serif t-xl" id="builds-h">
          Previous Builds
        </h2>
        <p className="lede">Porsche Cayenne, Mercedes E250, Thar Roxx, XUV700 and more, each one filmed in our bay for the Car Jewel channel.</p>
        <a className="cta" href={business.youtube} target="_blank" rel="noopener noreferrer" data-track="click_youtube">
          Watch the builds <ArrowUpRight aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
