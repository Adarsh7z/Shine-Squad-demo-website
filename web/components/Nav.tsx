'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, ChevronDown, Menu, Phone, X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { MAIN_ACTION, business, links, serviceLabels, services } from '@/lib/site';
import Wordmark from './Wordmark';
import OpenStatus from './OpenStatus';

const navLinks = [
  { href: '/#builds', label: 'Builds' },
  { href: '/#reviews', label: 'Reviews' },
  { href: '/#visit', label: 'Visit' },
];

const cards = [
  { slug: 'ceramic-coating', image: '/images/builds/pQ68arJMB6w.webp', alt: 'Silver Mahindra XUV700 under the hexagon lights of the detailing bay' },
  { slug: 'paint-protection-film', image: '/images/builds/i20-studio.webp', alt: 'Red Hyundai i20 with a fresh gloss under the bay lights' },
  { slug: 'seat-covers-mats', image: '/images/store/seat-covers-wall.webp', alt: 'Wall of seat covers and floor mats in the showroom' },
  { slug: 'audio-video', image: '/images/store/audio-shelf.webp', alt: 'Shelf of JBL and Moco speakers and amplifiers' },
];

const ease = [0.23, 1, 0.32, 1] as const;

export default function Nav() {
  const [panel, setPanel] = useState(false);
  const [menu, setMenu] = useState(false);
  const reduce = useReducedMotion();
  const intent = useRef<number | undefined>(undefined);
  const hoverOpened = useRef(false);
  const panelBtn = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const menuFirst = useRef<HTMLAnchorElement>(null);
  const burger = useRef<HTMLButtonElement>(null);

  // Escape and outside click close the services panel
  useEffect(() => {
    if (!panel) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setPanel(false);
        panelBtn.current?.focus();
      }
    };
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!panelRef.current?.contains(t) && !panelBtn.current?.contains(t)) setPanel(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onDown);
    };
  }, [panel]);

  // Full-screen menu: lock scroll, focus the first link, Escape closes, focus returns to the button
  useEffect(() => {
    if (!menu) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const t = window.setTimeout(() => menuFirst.current?.focus(), 60);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenu(false);
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.clearTimeout(t);
      document.removeEventListener('keydown', onKey);
      burger.current?.focus();
    };
  }, [menu]);

  const openSoon = useCallback(() => {
    window.clearTimeout(intent.current);
    intent.current = window.setTimeout(() => {
      hoverOpened.current = true;
      setPanel(true);
    }, 120);
  }, []);
  const closeSoon = useCallback(() => {
    window.clearTimeout(intent.current);
    intent.current = window.setTimeout(() => {
      hoverOpened.current = false;
      setPanel(false);
    }, 180);
  }, []);
  const close = () => setPanel(false);
  const closeMenu = () => setMenu(false);

  return (
    <>
      <header className="nav" onMouseLeave={closeSoon}>
        <div className="wrap nav__inner">
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          <Wordmark sub={false} />
          <nav className="nav__links" aria-label="Main">
            <button
              ref={panelBtn}
              className="nav__link"
              aria-expanded={panel}
              aria-controls="nav-services"
              onClick={() => {
                window.clearTimeout(intent.current);
                // A click right after a hover-open keeps the panel open instead of shutting it.
                setPanel((v) => (hoverOpened.current ? true : !v));
                hoverOpened.current = false;
              }}
              onMouseEnter={openSoon}
            >
              <span className="draw">Services</span> <ChevronDown aria-hidden="true" />
            </button>
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} className="nav__link" onMouseEnter={closeSoon} onFocus={close}>
                <span className="draw">{l.label}</span>
              </Link>
            ))}
          </nav>
          <div className="nav__actions">
            <a href={links.tel} className="nav__tel" data-track="click_call">
              <Phone aria-hidden="true" /> {business.phoneDisplay}
            </a>
            <Link href="/#book" className="btn btn--signal btn--sm nav__book">
              {MAIN_ACTION} <ArrowRight className="arrow" aria-hidden="true" />
            </Link>
            <a href={links.tel} className="icon-btn nav__call" aria-label={`Call ${business.phoneDisplay}`} data-track="click_call">
              <Phone aria-hidden="true" />
            </a>
            <button ref={burger} className="icon-btn nav__menu" aria-label="Open menu" aria-expanded={menu} aria-controls="menu" onClick={() => setMenu(true)}>
              <Menu aria-hidden="true" />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {panel && (
            <motion.div
              id="nav-services"
              ref={panelRef}
              className="navpanel"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.12 } }}
              transition={{ duration: 0.24, ease }}
              onMouseEnter={() => window.clearTimeout(intent.current)}
            >
              <div className="wrap">
                <div className="navpanel__grid">
                  {cards.map((c) => {
                    const s = services.find((x) => x.slug === c.slug)!;
                    return (
                      <Link key={c.slug} href={`/services/${c.slug}`} className="navcard lift" onClick={close}>
                        <span className="ph ph--link">
                          <Image src={c.image} alt={c.alt} fill sizes="280px" />
                        </span>
                        <span className="navcard__name">{serviceLabels[c.slug]}</span>
                        <span className="navcard__line">{s.short}</span>
                      </Link>
                    );
                  })}
                </div>
                <div className="navpanel__foot">
                  <div className="navpanel__all">
                    {services
                      .filter((s) => !cards.some((c) => c.slug === s.slug))
                      .map((s) => (
                        <Link key={s.slug} href={`/services/${s.slug}`} onClick={close}>
                          {serviceLabels[s.slug]}
                        </Link>
                      ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <AnimatePresence>
        {menu && (
          <motion.div
            id="menu"
            className="menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.14 } }}
            transition={{ duration: 0.26, ease }}
          >
            <div className="menu__head">
              <div className="wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Wordmark sub={false} onClick={closeMenu} />
                <button className="icon-btn" aria-label="Close menu" onClick={closeMenu}>
                  <X aria-hidden="true" />
                </button>
              </div>
            </div>
            <nav className="wrap menu__links" aria-label="Menu">
              <Link ref={menuFirst} href="/#services" onClick={closeMenu}>
                Services <ArrowUpRight aria-hidden="true" />
              </Link>
              {navLinks.map((l) => (
                <Link key={l.href} href={l.href} onClick={closeMenu}>
                  {l.label} <ArrowUpRight aria-hidden="true" />
                </Link>
              ))}
              <Link href="/contact" onClick={closeMenu}>
                Contact <ArrowUpRight aria-hidden="true" />
              </Link>
            </nav>
            <div className="wrap menu__foot">
              <p className="menu__status">
                <OpenStatus />
              </p>
              <Link href="/#book" className="btn btn--primary btn--block" onClick={closeMenu}>
                {MAIN_ACTION} <ArrowRight className="arrow" aria-hidden="true" />
              </Link>
              <a href={links.tel} className="btn btn--block" data-track="click_call">
                <Phone aria-hidden="true" /> Call {business.phoneDisplay}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
