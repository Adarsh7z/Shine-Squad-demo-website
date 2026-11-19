'use client';

import { ArrowUpRight } from 'lucide-react';
import { business, links } from '@/lib/site';
import OpenStatus from '../OpenStatus';

/** Visit: address, phone and hours beside the owner's Google map (shown in the site's dark tones). */
export default function Visit({ headingLevel = 2 }: { headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? 'h2' : 'h3';
  return (
    <section className="visit" id="visit" aria-labelledby="visit-h">
      <div className="wrap visit__grid">
        <div className="visit__info">
          <div style={{ display: 'grid', gap: 18 }}>
            <OpenStatus />
            <H className="serif t-xl" id="visit-h" data-lines>
              Visit the Studio
            </H>
          </div>
          <dl className="visit__rows">
            <div className="visit__row">
              <dt>Address</dt>
              <dd>
                <a href={links.maps} target="_blank" rel="noopener noreferrer" data-track="click_map">
                  {business.address.line1.replace(', Plot No. 70', '')}, {business.address.line2}, {business.address.city} {business.address.postal}
                </a>
              </dd>
            </div>
            <div className="visit__row">
              <dt>Landmark</dt>
              <dd>{business.landmark}</dd>
            </div>
            <div className="visit__row">
              <dt>Hours</dt>
              <dd>
                Monday to Saturday, 10 am – 10 pm
                <br />
                <span className="muted">Sunday closed</span>
              </dd>
            </div>
            <div className="visit__row">
              <dt>Phone</dt>
              <dd>
                <a href={links.tel} data-track="click_call">
                  {business.phoneDisplay}
                </a>
              </dd>
            </div>
          </dl>
          <div className="visit__actions">
            <a className="cta" href={links.directions} target="_blank" rel="noopener noreferrer" data-track="click_directions">
              Get directions <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="visit__map">
          <iframe src={links.mapEmbed} title="Shine Squad on Google Maps, Minister Road, Secunderabad" loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
        </div>
      </div>
    </section>
  );
}
