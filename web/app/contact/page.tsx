import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { MAIN_ACTION, business, faqs, links } from '@/lib/site';
import Visit from '@/components/sections/Visit';
import Booking from '@/components/sections/Booking';

export const metadata: Metadata = {
  title: 'Contact and directions',
  description: 'Call, WhatsApp or visit Shine Squad on Minister Road, Secunderabad, next to KIMS Hospital. Open Monday to Saturday, 10 am to 10 pm.',
  alternates: { canonical: '/contact' },
};

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
};

export default function ContactPage() {
  return (
    <>
      <section className="page-head" aria-labelledby="contact-h">
        <div className="wrap page-head__grid">
          <div>
            <p className="caps muted">Contact</p>
            <h1 className="serif t-xl" id="contact-h" data-lines>
              Talk to the Studio
            </h1>
          </div>
          <div style={{ display: 'grid', gap: 26, justifyItems: 'start', alignContent: 'end' }}>
            <p className="lede" style={{ fontSize: 17 }}>
              Call or WhatsApp {business.phoneDisplay}, Monday to Saturday, 10 am to 10 pm. Or send your details below and we reply on WhatsApp.
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
        </div>
      </section>
      <Visit />
      <section className="block" aria-labelledby="faq-h">
        <div className="wrap split">
          <div>
            <h2 className="serif t-l" id="faq-h" data-lines>
              Questions Customers Ask
            </h2>
          </div>
          <div className="qa">
            {faqs.map((f) => (
              <div key={f.q}>
                <h3>{f.q}</h3>
                <p>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Booking source="contact" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
    </>
  );
}
