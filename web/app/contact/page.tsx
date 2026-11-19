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
        <div className="wrap grid page-head__grid">
          <h1 className="t-h1" id="contact-h">
            Contact Shine Squad on Minister Road
          </h1>
          <div className="page-head__side">
            <p>
              Call or WhatsApp {business.phoneDisplay}, Monday to Saturday, 10 am to 10 pm. Or send your details and we reply on WhatsApp.
            </p>
            <div className="page-head__actions">
              <a href="#book" className="btn btn--primary">
                {MAIN_ACTION} <ArrowRight className="arrow" aria-hidden="true" />
              </a>
              <a href={links.tel} className="btn" data-track="click_call">
                Call {business.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </section>
      <Visit />
      <section className="block--alt" aria-labelledby="faq-h">
        <div className="wrap grid split">
          <h2 className="t-h2" id="faq-h">
            Questions customers ask
          </h2>
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
