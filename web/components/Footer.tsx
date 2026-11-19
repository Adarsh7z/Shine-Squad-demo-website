import Link from 'next/link';
import { business, links, offerGroups, serviceLabels, whatsappLink } from '@/lib/site';
import Wordmark from './Wordmark';

/** footer.closing, one screen: the columns and legal row, then the name set wide (the dealt type moment). */
export default function Footer() {
  const year = new Date().getFullYear();
  const picks = [...offerGroups[0].slugs.slice(0, 3), ...offerGroups[1].slugs.slice(0, 3)];
  return (
    <footer className="closing" id="contact">
      <div className="wrap closing__wrap">
        <div>
          <div className="closing__cols">
            <div className="closing__brand">
              <Wordmark ink />
              <p>
                A unit of {business.parent}, {business.parentLine.toLowerCase()}, since {business.parentSince}.
              </p>
            </div>
            <div>
              <p className="t-label closing__head">Visit</p>
              <div className="closing__list">
                <a href={links.maps} target="_blank" rel="noopener noreferrer" data-track="click_map">
                  Minister Road, next to KIMS
                </a>
                <span>Monday to Saturday, 10 am – 10 pm</span>
                <span>Sunday closed</span>
              </div>
            </div>
            <div>
              <p className="t-label closing__head">Contact</p>
              <div className="closing__list">
                <a className="tnum" href={links.tel} data-track="click_call">
                  {business.phoneDisplay}
                </a>
                <a href={whatsappLink('Hi Shine Squad, I would like to book a free consultation.')} target="_blank" rel="noopener noreferrer" data-track="click_whatsapp">
                  WhatsApp
                </a>
                <a href={business.youtube} target="_blank" rel="noopener noreferrer" data-track="click_youtube">
                  YouTube
                </a>
              </div>
            </div>
            <div>
              <p className="t-label closing__head">Services</p>
              <div className="closing__list">
                {picks.map((slug) => (
                  <Link key={slug} href={`/services/${slug}`}>
                    {serviceLabels[slug]}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="closing__legal">
            <span>
              © {year} {business.name}
            </span>
            <nav aria-label="Legal">
              <Link href="/privacy">Privacy</Link>
              <Link href="/contact">Contact</Link>
            </nav>
          </div>
        </div>
        <p className="closing__name" aria-hidden="true">
          Shine Squad
        </p>
      </div>
    </footer>
  );
}
