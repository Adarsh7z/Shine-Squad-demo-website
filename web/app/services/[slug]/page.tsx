import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Check, Phone } from 'lucide-react';
import { SITE_URL, business, getService, groups, links, services } from '@/lib/site';
import { getReviews } from '@/lib/reviews';
import { Glyph } from '@/components/Icons';
import ConsultForm from '@/components/ConsultForm';
import Faq from '@/components/sections/Faq';
import Reviews from '@/components/sections/Reviews';
import FinalCta from '@/components/sections/FinalCta';

export const revalidate = 86400;
export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

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
  const related = services.filter((x) => x.group === s.group && x.slug !== s.slug).slice(0, 3);

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
      <section className="page-hero" aria-labelledby="svc-h">
        <div className="hero__bg" aria-hidden="true" />
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link className="link link--bare" href="/">Home</Link> <span aria-hidden="true">/</span>
            <Link className="link link--bare" href="/#services">{groups[s.group].title}</Link> <span aria-hidden="true">/</span>
            <span aria-current="page">{s.name}</span>
          </nav>
          <div className="page-hero__grid">
            <div style={{ display: 'grid', gap: 24 }}>
              <Glyph name={s.glyph} style={{ width: 40, height: 40, color: 'var(--signal)' }} />
              <h1 className="h1" id="svc-h" style={{ fontSize: 'clamp(2.4rem, 4vw + 0.8rem, 4.6rem)' }}>
                {s.name} <span className="text-signal">in Secunderabad</span>
              </h1>
              <p className="lead">{s.intro}</p>
              <div className="hero__ctas">
                <a href="#svc-book" className="btn btn--primary btn--xl">
                  Book a free consultation <ArrowRight className="arrow" aria-hidden="true" />
                </a>
                <a href={links.tel} className="btn btn--xl" data-track="click_call">
                  <Phone aria-hidden="true" /> {business.phoneDisplay}
                </a>
              </div>
            </div>
            <div id="svc-book">
              <ConsultForm source={`service:${s.slug}`} />
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="inc-h">
        <div className="wrap two-col">
          <div>
            <p className="eyebrow">The work</p>
            <h2 className="h2" id="inc-h">What&rsquo;s included</h2>
            <p className="lead" style={{ marginTop: 20 }}>
              The exact scope and price depend on your car and its condition. We inspect it first and agree everything with you before work starts.
            </p>
          </div>
          <ul className="check-list">
            {s.includes.map((i) => (
              <li key={i}>
                <Check aria-hidden="true" /> {i}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--raised hairline-top" aria-labelledby="why-h">
        <div className="wrap">
          <p className="eyebrow">Why it matters</p>
          <h2 className="h2" id="why-h" style={{ marginBottom: 48 }}>
            What you get from it
          </h2>
          <div className="why-grid">
            {s.why.map((w, i) => (
              <div className="card" key={w.title}>
                <span className="mono text-signal">0{i + 1}</span>
                <h3 className="h3">{w.title}</h3>
                <p className="body">{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Reviews data={reviews} />
      <Faq items={s.faqs} title={`${s.name}: common questions`} id="svc-faq" />

      {related.length > 0 && (
        <section className="section" aria-labelledby="rel-h">
          <div className="wrap">
            <p className="eyebrow">Also in {groups[s.group].title}</p>
            <h2 className="h2" id="rel-h" style={{ marginBottom: 40 }}>
              Related services
            </h2>
            <div className="related">
              {related.map((r) => (
                <Link key={r.slug} href={`/services/${r.slug}`} className="card card--link gloss">
                  <Glyph name={r.glyph} className="glyph" />
                  <strong style={{ fontWeight: 600 }}>{r.name}</strong>
                  <span className="body" style={{ fontSize: '0.92rem' }}>{r.short}</span>
                  <span className="link" style={{ color: 'var(--signal)', justifySelf: 'start' }}>
                    Learn more <ArrowRight className="arrow" aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      <FinalCta />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}
