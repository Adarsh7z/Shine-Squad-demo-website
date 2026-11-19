import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { offerGroups, serviceLabels } from '@/lib/site';

/** The offer: two ruled groups of names, each a link to its page, beside the tall-small pair of photographs. */
export default function Services() {
  return (
    <section className="section ground-alt" id="services" aria-labelledby="services-h" style={{ ['--hm' as string]: 2 }}>
      <div className="wrap">
        <div className="head-row">
          <h2 className="t-h2" id="services-h">
            Protection, upgrades and repairs
          </h2>
          <div className="head-row__side">
            <p>Twelve services, all fitted in our Minister Road studio. Touch the films, leathers and finishes before you choose.</p>
            <Link href="#builds" className="link--arrow">
              See recent builds <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
        <div className="grid offer">
          <div className="offer__groups">
            {offerGroups.map((g) => (
              <div key={g.label}>
                <h3 className="t-label group__label">{g.label}</h3>
                <ul className="rows">
                  {g.slugs.map((slug) => (
                    <li key={slug}>
                      <Link href={`/services/${slug}`}>
                        {serviceLabels[slug]} <ArrowRight aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="offer__photos">
            <Link href="/services/seat-covers-mats" className="ph ph--link offer__tall">
              <Image src="/images/store/seat-covers-wall.webp" alt="Wall of leatherette seat covers and floor mats in the showroom" fill sizes="(min-width: 1024px) 384px, (min-width: 640px) 400px, 100vw" />
            </Link>
            <Link href="/services/audio-video" className="ph ph--link offer__small">
              <Image src="/images/store/audio-shelf.webp" alt="Shelf of JBL and Moco speakers and amplifiers" fill sizes="(min-width: 1024px) 180px, 50vw" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
