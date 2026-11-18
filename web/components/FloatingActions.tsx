'use client';

import { useEffect, useState } from 'react';
import { CalendarCheck, MapPin, Phone } from 'lucide-react';
import { links, whatsappLink } from '@/lib/site';
import { WhatsApp } from './Icons';

/** Mobile bottom action bar + desktop WhatsApp pill. */
export default function FloatingActions() {
  const [formInView, setFormInView] = useState(false);
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const form = document.getElementById('book');
    const hero = document.querySelector('[data-hero]');
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.target === form) setFormInView(e.isIntersecting);
          if (e.target === hero) setPastHero(!e.isIntersecting);
        }
      },
      { threshold: 0.15 }
    );
    if (form) io.observe(form);
    if (hero) io.observe(hero);
    else setPastHero(true);
    return () => io.disconnect();
  }, []);

  const wa = whatsappLink('Hi Shine Squad, I would like to book a free consultation.');

  return (
    <>
      <nav className="actionbar" aria-label="Quick actions" data-hidden={formInView}>
        <a href={links.tel} data-track="click_call">
          <Phone aria-hidden="true" />
          Call
        </a>
        <a href={wa} target="_blank" rel="noopener noreferrer" data-track="click_whatsapp">
          <WhatsApp style={{ color: '#25D366' }} />
          WhatsApp
        </a>
        <a href="/#book" className="is-primary">
          <CalendarCheck aria-hidden="true" />
          Book
        </a>
        <a href={links.directions} target="_blank" rel="noopener noreferrer" data-track="click_directions">
          <MapPin aria-hidden="true" />
          Directions
        </a>
      </nav>
      <a
        href={wa}
        target="_blank"
        rel="noopener noreferrer"
        className="wa-pill"
        data-visible={pastHero}
        aria-label="Chat on WhatsApp"
        data-track="click_whatsapp"
      >
        <WhatsApp />
        <span>Chat on WhatsApp</span>
      </a>
    </>
  );
}
