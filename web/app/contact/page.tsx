import type { Metadata } from 'next';
import ConsultForm from '@/components/ConsultForm';
import Visit from '@/components/sections/Visit';

export const metadata: Metadata = {
  title: 'Contact & directions',
  description: 'Call, WhatsApp or visit Shine Squad on Minister Road, Secunderabad, next to KIMS Hospital. Open Mon–Sat, 10 AM – 10 PM.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <>
      <section className="page-hero" aria-labelledby="contact-h">
        <div className="hero__bg" aria-hidden="true" />
        <div className="wrap page-hero__grid">
          <div style={{ display: 'grid', gap: 24 }}>
            <p className="eyebrow" style={{ margin: 0 }}>Contact</p>
            <h1 className="h1" id="contact-h" style={{ fontSize: 'clamp(2.4rem, 4vw + 0.8rem, 4.6rem)' }}>
              Talk to the studio
            </h1>
            <p className="lead">
              Leave your name and number and we&rsquo;ll call you back to fix a time, or call and WhatsApp us directly. Free consultations, Monday to Saturday.
            </p>
          </div>
          <div id="book">
            <ConsultForm source="contact" />
          </div>
        </div>
      </section>
      <Visit />
    </>
  );
}
