import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { groups, services, type ServiceGroup } from '@/lib/site';
import { Glyph } from '../Icons';

export default function Services() {
  const order: ServiceGroup[] = ['protection', 'upgrades', 'restoration'];
  return (
    <section className="section" id="services" aria-labelledby="services-h">
      <div className="wrap">
        <div className="section-head section-head--split">
          <div>
            <p className="eyebrow reveal">What we do</p>
            <h2 className="h2 reveal" id="services-h">
              Three ways we look after your car
            </h2>
          </div>
          <p className="lead reveal">
            Protect the paint, upgrade the cabin, or bring a tired car back to life. Every job starts with an inspection and a clear quote.
          </p>
        </div>
        <div className="svc-grid">
          {order.map((g) => (
            <article className="card gloss svc-card" key={g}>
              <div className="svc-card__media zoom">
                <Image src={groups[g].image} alt={groups[g].alt} fill sizes="(min-width: 1024px) 420px, 100vw" style={{ objectPosition: g === 'protection' ? '50% 30%' : '50% 40%' }} />
              </div>
              <div className="svc-card__body">
                <h3 className="h3">{groups[g].title}</h3>
                <p className="body">{groups[g].line}</p>
                <ul className="svc-list">
                  {services
                    .filter((s) => s.group === g)
                    .map((s) => (
                      <li key={s.slug}>
                        <Link href={`/services/${s.slug}`}>
                          <span>
                            <Glyph name={s.glyph} className="glyph" />
                            {s.name}
                          </span>
                          <ArrowRight className="arrow" aria-hidden="true" />
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
