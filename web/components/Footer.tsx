import Link from 'next/link';
import { Phone, MapPin } from 'lucide-react';
import { business, fullAddress, groups, links, services, whatsappLink, type ServiceGroup } from '@/lib/site';
import { WhatsApp, YouTube } from './Icons';
import Wordmark from './Wordmark';

export default function Footer() {
  const order: ServiceGroup[] = ['protection', 'upgrades', 'restoration'];
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__grid">
          <div className="footer__brand">
            <Wordmark />
            <p>
              {business.tagline} Car protection, detailing and accessories on Minister Road, Secunderabad. A unit of {business.parent}, {business.parentLine.toLowerCase()} since {business.parentSince}.
            </p>
            <span className="footer__telugu" lang="te">{business.telugu}</span>
            <div className="footer__social">
              <a className="icon-btn" href={business.youtube} target="_blank" rel="noopener noreferrer" aria-label="Car Jewel on YouTube">
                <YouTube />
              </a>
              <a className="icon-btn" href={whatsappLink()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp Shine Squad" data-track="click_whatsapp">
                <WhatsApp />
              </a>
              <a className="icon-btn" href={links.maps} target="_blank" rel="noopener noreferrer" aria-label="Shine Squad on Google Maps">
                <MapPin aria-hidden="true" />
              </a>
            </div>
          </div>
          {order.map((g) => (
            <div key={g}>
              <h2>{groups[g].title}</h2>
              <ul>
                {services
                  .filter((s) => s.group === g)
                  .map((s) => (
                    <li key={s.slug}>
                      <Link className="link link--bare" href={`/services/${s.slug}`}>
                        {s.name}
                      </Link>
                    </li>
                  ))}
                {g === 'restoration' && (
                  <>
                    <li style={{ marginTop: 18 }}>
                      <a className="link link--bare" href={links.tel} data-track="click_call">
                        <Phone size={14} aria-hidden="true" /> {business.phoneDisplay}
                      </a>
                    </li>
                    <li>
                      <a className="link link--bare" href={links.directions} target="_blank" rel="noopener noreferrer" data-track="click_directions">
                        <MapPin size={14} aria-hidden="true" /> Get directions
                      </a>
                    </li>
                  </>
                )}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer__bottom">
          <span>
            © {new Date().getFullYear()} Shine Squad · {fullAddress}
          </span>
          <span style={{ display: 'flex', gap: 20 }}>
            <Link className="link link--bare" href="/contact">Contact</Link>
            <Link className="link link--bare" href="/privacy">Privacy</Link>
            <span>Made in Hyderabad</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
