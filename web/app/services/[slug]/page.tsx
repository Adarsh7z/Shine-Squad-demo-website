import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { MAIN_ACTION, SITE_URL, business, getService, groups, links, serviceLabels, services } from '@/lib/site';
import { getReviews } from '@/lib/reviews';
import Reviews from '@/components/sections/Reviews';
import Booking from '@/components/sections/Booking';

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

/** One photograph per service, from the owner's store photos and the bay's build stills. */
const photo: Record<string, { src: string; alt: string }> = {
  'ceramic-coating': { src: '/images/builds/pQ68arJMB6w.webp', alt: 'Silver Mahindra XUV700 under the hexagon lights of the detailing bay' },
  'paint-protection-film': { src: '/images/builds/i20-studio.webp', alt: 'Red Hyundai i20 with a deep gloss under the bay lights' },
  'teflon-coating': { src: '/images/builds/5pT7spDdFXU.webp', alt: 'White Maruti Grand Vitara with a fresh polish' },
  'car-wrapping': { src: '/images/builds/i20-studio.webp', alt: 'Red Hyundai i20 in the detailing bay' },
  'window-tinting': { src: '/images/store/storefront-xuv700.webp', alt: 'Black Mahindra XUV700 with tinted windows outside the shop' },
  'detail-spa-restoration': { src: '/images/store/care-products.webp', alt: 'Shelves of Turtle Wax car-care products' },
  'audio-video': { src: '/images/store/audio-shelf.webp', alt: 'Shelf of JBL and Moco speakers and amplifiers' },
  'seat-covers-mats': { src: '/images/store/seat-covers-wall.webp', alt: 'Wall of seat covers and floor mats in the showroom' },
  'lighting-upgrades': { src: '/images/store/lighting-shelf.webp', alt: 'Shelf of LED headlamps and tail lamps' },
  'alloy-wheels': { src: '/images/store/alloy-wheels-wall.webp', alt: 'Wall of alloy wheels in the showroom' },
  'electrical-headlight-repair': { src: '/images/store/lighting-shelf.webp', alt: 'Shelf of headlamps and lighting parts' },
  maintenance: { src: '/images/store/care-products.webp', alt: 'Shelves of car-care products and oils' },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  const title = `${s.name} in Secunderabad, Hyderabad`;
  const description = `${s.short} ${s.name} at Shine Squad, Minister Road, Secunderabad (next to KIMS). Free consultation with real samples. Call ${business.phoneDisplay}.`.slice(0, 160);
  return {
    title,
    description,
    keywords: s.keywords,
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: { title: `${title} | Shine Squad`, description },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();
  const reviews = await getReviews();
  const related = services.filter((x) => x.group === s.group && x.slug !== s.slug);
  const pic = photo[s.slug];

  const ld = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: s.name,
      serviceType: s.name,
      description: s.intro,
      provider: { '@id': `${SITE_URL}/#business` },
      areaServed: ['Secunderabad', 'Hyderabad'],
      url: `${SITE_URL}/services/${s.slug}`,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: groups[s.group].title, item: `${SITE_URL}/#services` },
        { '@type': 'ListItem', position: 3, name: s.name, item: `${SITE_URL}/services/${s.slug}` },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: s.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ];

  return (
    <>
      <section className="page-head" aria-labelledby="svc-h">
        <div className="wrap page-head__grid">
          <div>
            <Link className="crumb" href="/#services">
              <ArrowLeft aria-hidden="true" /> All services
            </Link>
            <h1 className="serif t-xl" id="svc-h" data-lines>
              {s.name}
            </h1>
            <p className="lede" style={{ maxWidth: '46ch', fontSize: 17 }}>
              {s.intro}
            </p>
            <div className="page-head__actions">
              <a href="#book" className="cta cta--solid">
                {MAIN_ACTION} <ArrowRight aria-hidden="true" />
              </a>
              <a href={links.tel} className="cta" data-track="click_call">
                Call {business.phoneDisplay}
              </a>
            </div>
          </div>
          <div className="page-photo" data-fade>
            <Image src={pic.src} alt={pic.alt} fill priority sizes="(min-width: 1024px) 588px, 100vw" />
          </div>
        </div>
      </section>

      <section className="block" aria-labelledby="inc-h">
        <div className="wrap split">
          <div>
            <h2 className="serif t-l" id="inc-h" data-lines>
              What the work includes
            </h2>
            <p className="lede">We inspect your car first, then agree the exact scope, price and ready time with you before any work starts.</p>
          </div>
          <ol className="ruled">
            {s.includes.map((item, i) => (
              <li key={item}>
                <span className="n">{String(i + 1).padStart(2, '0')}</span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="block" aria-labelledby="why-h">
        <div className="wrap split">
          <h2 className="serif t-l" data-lines id="why-h">
            What you get from {serviceLabels[s.slug].toLowerCase()}
          </h2>
          <div className="why">
            {s.why.map((w) => (
              <div key={w.title}>
                <h3>{w.title}</h3>
                <p>{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="block" aria-labelledby="qa-h">
        <div className="wrap split">
          <h2 className="serif t-l" data-lines id="qa-h">
            Questions about {serviceLabels[s.slug].toLowerCase()}
          </h2>
          <div className="qa">
            {s.faqs.map((f) => (
              <div key={f.q}>
                <h3>{f.q}</h3>
                <p>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="block" aria-labelledby="rel-h">
          <div className="wrap split">
            <h2 className="serif t-l" data-lines id="rel-h">
              More in {groups[s.group].title.toLowerCase()}
            </h2>
            <ul className="rows">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link href={`/services/${r.slug}`}>
                    {serviceLabels[r.slug]} <ArrowRight aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <Reviews data={reviews} />
      <Booking source={`service:${s.slug}`} service={s.name} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}
