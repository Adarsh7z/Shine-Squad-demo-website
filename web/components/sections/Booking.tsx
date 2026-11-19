import Image from 'next/image';
import { MAIN_ACTION, business, links } from '@/lib/site';
import ConsultForm from '../ConsultForm';

/** The booking: the head row, then a photograph beside the WhatsApp form on the alternate ground. */
export default function Booking({ source = 'home', service }: { source?: string; service?: string }) {
  return (
    <section className="section" id="book" aria-labelledby="book-h" style={{ ['--hm' as string]: 2 }}>
      <div className="wrap">
        <div className="head-row">
          <h2 className="t-h2" id="book-h">
            {MAIN_ACTION}
          </h2>
          <div className="head-row__side">
            <p>Tell us your car and what you have in mind. We reply on WhatsApp with a time to come in and see the materials.</p>
          </div>
        </div>
        <div className="grid book-grid">
          <div className="ph book__photo">
            <Image src="/images/store/alloy-wheels-wall.webp" alt="Wall of alloy wheels in the Shine Squad showroom" fill sizes="588px" />
          </div>
          <div className="book__form">
            <ConsultForm source={source} service={service} />
          </div>
          <div className="book__alt">
            <p className="muted">Prefer to talk first?</p>
            <a className="btn btn--block" href={links.tel} data-track="click_call">
              Call {business.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
