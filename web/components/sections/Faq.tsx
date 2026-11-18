'use client';

import { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { whatsappLink } from '@/lib/site';
import { WhatsApp } from '../Icons';

export default function Faq({ items, title = 'Questions people ask us', id = 'faq' }: { items: { q: string; a: string }[]; title?: string; id?: string }) {
  const [open, setOpen] = useState<number | null>(0);
  const uid = useId();
  return (
    <section className="section section--paper" id={id} aria-labelledby={`${uid}-h`}>
      <div className="wrap faq-grid">
        <div className="faq-side">
          <p className="eyebrow reveal">FAQ</p>
          <h2 className="h2 reveal" id={`${uid}-h`}>
            {title}
          </h2>
          <div className="card">
            <p className="h3" style={{ margin: 0 }}>Still curious?</p>
            <p style={{ margin: 0, color: 'var(--mist)' }}>Send us a photo of your car on WhatsApp and we&rsquo;ll tell you what it needs.</p>
            <a className="btn btn--primary" href={whatsappLink('Hi Shine Squad, I have a question about my car.')} target="_blank" rel="noopener noreferrer" data-track="click_whatsapp" style={{ justifySelf: 'start' }}>
              <WhatsApp /> Ask on WhatsApp
            </a>
          </div>
        </div>
        <div>
          {items.map((f, i) => {
            const isOpen = open === i;
            return (
              <div className="faq-item" key={f.q}>
                <h3 style={{ margin: 0 }}>
                  <button
                    type="button"
                    className="faq-q"
                    aria-expanded={isOpen}
                    aria-controls={`${uid}-a${i}`}
                    id={`${uid}-q${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    {f.q}
                    <span className="faq-q__icon" aria-hidden="true">
                      <ChevronDown />
                    </span>
                  </button>
                </h3>
                <div className="faq-a" data-open={isOpen} id={`${uid}-a${i}`} role="region" aria-labelledby={`${uid}-q${i}`} hidden={false} inert={!isOpen}>
                  <div>
                    <p>{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
