'use client';

import { Accessibility, ArrowUpRight, MapPin } from 'lucide-react';
import { business, links } from '@/lib/site';
import OpenStatus, { useOpenStatus } from '../OpenStatus';

/** Screen two of a place page: how to find the shop, with the owner's Google map beside it. */
export default function Visit({ headingLevel = 2 }: { headingLevel?: 2 | 3 }) {
  const status = useOpenStatus();
  const sunday = status?.today === 0;
  const H = headingLevel === 2 ? 'h2' : 'h3';
  return (
    <section className="section" id="visit" data-place="visit" aria-labelledby="visit-h" style={{ ['--hm' as string]: 2 }}>
      <div className="wrap">
        <div className="visit__top">
          <H className="t-h2" id="visit-h">
            Visit the studio
          </H>
        </div>
        <div className="grid visit-grid">
        <div className="visit">
          <OpenStatus />
          <p className="visit__address">
            <a className="link" href={links.maps} target="_blank" rel="noopener noreferrer" data-track="click_map">
              {business.address.line1.replace(', Plot No. 70', '')}, {business.address.line2},<br />
              {business.address.city} {business.address.postal}
            </a>
          </p>
          <div className="visit__cols">
            <div>
              <div className="visit__contact">
                <a className="visit__tel link" href={links.tel} data-track="click_call">
                  {business.phoneDisplay}
                </a>
                <a className="btn" href={links.directions} target="_blank" rel="noopener noreferrer" data-track="click_directions">
                  Get directions <ArrowUpRight className="arrow" aria-hidden="true" />
                </a>
              </div>
            </div>
            <dl className="hours">
              <div data-today={status && !sunday ? '' : undefined}>
                <dt>Monday to Saturday</dt>
                <dd>10 am – 10 pm</dd>
              </div>
              <div data-today={sunday ? '' : undefined}>
                <dt>Sunday</dt>
                <dd>Closed</dd>
              </div>
            </dl>
          </div>
          <ul className="visit__rows">
            <li>
              <MapPin aria-hidden="true" /> {business.landmark}
            </li>
            <li>
              <Accessibility aria-hidden="true" /> Wheelchair-accessible entrance
            </li>
          </ul>
        </div>
        <div className="ph visit__map">
          <iframe
            src={links.mapEmbed}
            title="Shine Squad on Google Maps, Minister Road, Secunderabad"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
        </div>
      </div>
    </section>
  );
}
