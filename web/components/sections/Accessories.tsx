import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { whatsappLink } from '@/lib/site';
import { WhatsApp } from '../Icons';

const tiles = [
  { href: '/services/seat-covers-mats', img: '/images/store/seat-covers-wall.webp', label: 'Seats & mats', title: 'Seat covers and floor mats', alt: 'Display wall of custom seat covers in teal, white, black and blue, with floor mats below' },
  { href: '/services/audio-video', img: '/images/store/audio-shelf.webp', label: 'Audio', title: 'Speakers, amps, Android screens', alt: 'Glass shelves of JBL and JL Audio speakers and Moco LED lighting boxes' },
  { href: '/services/alloy-wheels', img: '/images/store/alloy-wheels-wall.webp', label: 'Wheels', title: 'A wall of alloys', alt: 'Wall of alloy wheels in black, chrome and red-accented finishes' },
  { href: '/services/lighting-upgrades', img: '/images/store/lighting-shelf.webp', label: 'Lighting', title: 'Lamps, DRLs, tail lights', alt: 'Shelves of tail lamps, DRLs and lighting kits' },
  { href: '/services/detail-spa-restoration', img: '/images/store/care-products.webp', label: 'Care', title: 'Car-care range', alt: 'Turtle Wax shampoos, sprays and polishes on glass shelves' },
];

const brands = ['JBL', 'JL Audio', 'Pioneer', 'Moco', 'Turtle Wax', 'Top Gear'];

export default function Accessories() {
  return (
    <section className="section section--raised hairline-top" id="accessories" aria-labelledby="acc-h">
      <div className="wrap">
        <div className="section-head section-head--split">
          <div>
            <p className="eyebrow reveal">The showroom</p>
            <h2 className="h2 reveal" id="acc-h">
              Touch it before you choose it
            </h2>
          </div>
          <div style={{ display: 'grid', gap: 20, justifyItems: 'start' }}>
            <p className="lead reveal">
              Our team walks you through real samples: leatherette grades, mat textures, speaker sizes, film shades. You choose with your hands, not from a catalogue.
            </p>
            <a
              className="btn"
              href={whatsappLink("Hi Shine Squad, I'm looking for accessories for my car. What do you have in stock today?")}
              target="_blank"
              rel="noopener noreferrer"
              data-track="click_whatsapp"
            >
              <WhatsApp style={{ color: '#25D366' }} /> Ask for today&rsquo;s stock on WhatsApp
            </a>
          </div>
        </div>
        <div className="acc-grid">
          {tiles.map((t, i) => (
            <Link key={t.href} href={t.href} className="card card--link gloss acc-tile zoom">
              <Image src={t.img} alt={t.alt} fill sizes={i === 0 ? '(min-width: 1024px) 540px, 100vw' : '(min-width: 1024px) 420px, 50vw'} style={{ objectPosition: '50% 40%' }} />
              <span className="acc-tile__label">
                <span className="mono">{t.label}</span>
                <strong>
                  {t.title} <ArrowUpRight aria-hidden="true" />
                </strong>
              </span>
            </Link>
          ))}
        </div>
        <div className="brands" aria-label="Brands on our shelves">
          <span className="mono">Brands on our shelves</span>
          {brands.map((b) => (
            <span key={b} className="b">
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
