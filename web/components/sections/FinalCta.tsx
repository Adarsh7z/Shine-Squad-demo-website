import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';
import { business, links } from '@/lib/site';

export default function FinalCta() {
  return (
    <section className="cta-band" aria-labelledby="cta-h">
      <div className="wrap cta-band__inner">
        <div>
          <h2 className="h1" id="cta-h">
            Bring it in.
            <br />
            Drive out shining.
          </h2>
          <p>Free consultation, real samples, a clear quote. Mon–Sat, 10 AM to 10 PM on Minister Road.</p>
        </div>
        <div className="btn-row">
          <Link href="/#book" className="btn btn--dark btn--xl">
            Book a consultation <ArrowRight className="arrow" aria-hidden="true" />
          </Link>
          <a href={links.tel} className="btn btn--outline-dark btn--xl" data-track="click_call">
            <Phone aria-hidden="true" /> {business.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
