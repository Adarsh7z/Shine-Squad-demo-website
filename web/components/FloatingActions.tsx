'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ArrowRight, Phone } from 'lucide-react';
import { MAIN_ACTION, business, links } from '@/lib/site';

/**
 * The phone bar: the main action full width, with a call button.
 * It waits until the hero's button has scrolled away and steps aside while the booking form is on screen.
 */
export default function FloatingActions() {
  const pathname = usePathname();
  const [heroVisible, setHeroVisible] = useState(true);
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    const heroBtn = document.querySelector('.hero .btn, .page-head .btn--primary');
    const form = document.getElementById('book');
    setHeroVisible(!!heroBtn);
    setFormVisible(false);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.target === heroBtn) setHeroVisible(e.isIntersecting);
          if (e.target === form) setFormVisible(e.isIntersecting);
        }
      },
      { threshold: 0 }
    );
    if (heroBtn) io.observe(heroBtn);
    if (form) io.observe(form);
    return () => io.disconnect();
  }, [pathname]);

  const show = !heroVisible && !formVisible;
  return (
    <nav className="actionbar" aria-label="Quick actions" data-show={show} aria-hidden={!show} inert={!show ? true : undefined}>
      <a href={links.tel} className="icon-btn" aria-label={`Call ${business.phoneDisplay}`} data-track="click_call">
        <Phone aria-hidden="true" />
      </a>
      <a href="/#book" className="btn btn--primary">
        {MAIN_ACTION} <ArrowRight className="arrow" aria-hidden="true" />
      </a>
    </nav>
  );
}
