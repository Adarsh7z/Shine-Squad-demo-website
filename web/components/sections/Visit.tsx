'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Accessibility, Copy, MapPin, Navigation, Phone } from 'lucide-react';
import { business, dayNames, fullAddress, hours, links, whatsappLink } from '@/lib/site';
import { fmt12 } from '@/lib/hours';
import OpenStatus, { useOpenStatus } from '../OpenStatus';
import { WhatsApp } from '../Icons';

function CopyAddress() {
  const [copied, setCopied] = useState(0);
  return (
    <span className="copy-btn">
      <button
        type="button"
        className="icon-btn"
        aria-label="Copy address"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(`Shine Squad, ${fullAddress}`);
            setCopied(Date.now());
          } catch {
            /* clipboard blocked */
          }
        }}
      >
        <Copy aria-hidden="true" />
      </button>
      {copied ? (
        <span key={copied} className="toast" role="status">
          Copied
        </span>
      ) : null}
    </span>
  );
}

function MapFacade() {
  const [live, setLive] = useState(false);
  return (
    <div className="map">
      {live ? (
        <iframe src={links.mapEmbed} title="Shine Squad on Google Maps" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
      ) : (
        <div className="map__facade">
          <svg className="map__roads" viewBox="0 0 1200 480" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <g fill="none" stroke="rgba(255,255,255,0.09)" strokeWidth="14" strokeLinecap="round">
              <path d="M-20 150 C 300 120, 520 210, 1220 170" />
              <path d="M420 -20 L 660 500" />
            </g>
            <g fill="none" stroke="rgba(255,194,26,0.22)" strokeWidth="18" strokeLinecap="round">
              <path d="M200 520 L 560 250 L 1220 -20" />
            </g>
            <g fill="rgba(255,255,255,0.35)" style={{ font: '500 13px var(--font-mono)', letterSpacing: '0.12em' }}>
              <text x="780" y="120" transform="rotate(-24 780 120)">MINISTER ROAD</text>
              <text x="40" y="132">P.G. ROAD</text>
            </g>
            <g>
              <rect x="700" y="300" width="150" height="70" rx="8" fill="rgba(255,107,94,0.10)" stroke="rgba(255,107,94,0.35)" />
              <text x="775" y="341" textAnchor="middle" fill="rgba(255,255,255,0.55)" style={{ font: '500 12px var(--font-mono)', letterSpacing: '0.1em' }}>KIMS HOSPITAL</text>
            </g>
          </svg>
          <div className="map__center">
            <span className="map__pin" aria-hidden="true">
              <span>SS</span>
            </span>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
              <button type="button" className="btn" onClick={() => setLive(true)}>
                <MapPin aria-hidden="true" /> Load interactive map
              </button>
              <a className="btn btn--primary" href={links.directions} target="_blank" rel="noopener noreferrer" data-track="click_directions">
                <Navigation aria-hidden="true" /> Get directions
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Visit() {
  const status = useOpenStatus();
  const today = status?.today;
  const order = [1, 2, 3, 4, 5, 6, 0];
  return (
    <section className="section section--raised hairline-top" id="visit" aria-labelledby="visit-h">
      <div className="wrap">
        <div className="visit-grid">
          <div className="frame visit-photo zoom">
            <Image src="/images/store/storefront-street.webp" alt="Shine Squad shopfront on Minister Road with the black-and-yellow signboard" fill sizes="(min-width: 1024px) 520px, 100vw" style={{ objectPosition: '50% 45%' }} />
            <span className="pill">Look for the yellow sign</span>
          </div>
          <div className="info">
            <div>
              <p className="eyebrow reveal">Visit the studio</p>
              <h2 className="h2 reveal" id="visit-h">
                Find us next to KIMS Hospital
              </h2>
            </div>
            <div className="info__block">
              <span className="mono">Address</span>
              <div className="addr">
                <address style={{ fontStyle: 'normal' }}>
                  {business.address.line1},<br />
                  {business.address.line2},<br />
                  {business.address.city}, {business.address.region} {business.address.postal}
                </address>
                <CopyAddress />
              </div>
              <span className="body" style={{ fontSize: '0.92rem' }}>
                {business.landmark} · Plus code {business.plusCode}
              </span>
            </div>
            <div className="info__block">
              <span className="mono" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                Hours <OpenStatus />
              </span>
              <table className="hours">
                <caption className="sr-only">Opening hours</caption>
                <tbody>
                  {order.map((d) => {
                    const h = hours[d];
                    return (
                      <tr key={d} className={today === d ? 'today' : ''}>
                        <td>{dayNames[d]}</td>
                        <td>{h ? `${fmt12(h.open)} – ${fmt12(h.close)}` : 'Closed'}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <span className="body" style={{ fontSize: '0.84rem' }}>
                Holiday hours can differ. Call ahead if you&rsquo;re unsure.
              </span>
            </div>
            <div className="info__block">
              <div className="btn-row">
                <a className="btn btn--primary btn--xl" href={links.directions} target="_blank" rel="noopener noreferrer" data-track="click_directions">
                  <Navigation aria-hidden="true" /> Get directions
                </a>
                <a className="btn btn--xl" href={links.tel} data-track="click_call">
                  <Phone aria-hidden="true" /> Call the studio
                </a>
                <a className="btn btn--xl" href={whatsappLink('Hi Shine Squad, I would like to visit the studio.')} target="_blank" rel="noopener noreferrer" data-track="click_whatsapp">
                  <WhatsApp style={{ color: '#25D366' }} /> WhatsApp us
                </a>
              </div>
            </div>
            <div className="info__block">
              <span className="mono">We accept</span>
              <div className="pay">
                {business.payments.map((p) => (
                  <span key={p}>{p}</span>
                ))}
              </div>
              <span className="body" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: '0.9rem', marginTop: 6 }}>
                <Accessibility size={16} aria-hidden="true" /> Wheelchair-accessible entrance
              </span>
            </div>
          </div>
        </div>
        <MapFacade />
      </div>
    </section>
  );
}
