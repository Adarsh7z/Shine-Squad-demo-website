import { MAIN_ACTION, business, links } from '@/lib/site';
import ConsultForm from '../ConsultForm';

/** The booking: a few words and the call option beside the WhatsApp form. */
export default function Booking({ source = 'home', service }: { source?: string; service?: string }) {
  return (
    <section className="book" id="book" aria-labelledby="book-h">
      <div className="wrap book__grid">
        <div className="book__intro">
          <p className="caps muted">Free, no obligation</p>
          <h2 className="serif t-xl" id="book-h" data-lines>
            {MAIN_ACTION}
          </h2>
          <p className="lede">Tell us your car and what you have in mind. We reply on WhatsApp with a time to come in and see the materials.</p>
          <div className="book__call">
            <span className="caps muted">Prefer to talk?</span>
            <a href={links.tel} data-track="click_call">
              {business.phoneDisplay}
            </a>
          </div>
        </div>
        <ConsultForm source={source} service={service} />
      </div>
    </section>
  );
}
