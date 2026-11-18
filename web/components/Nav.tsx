'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronDown, Menu, Phone, X, ArrowUpRight } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { business, groups, links, services, whatsappLink, type ServiceGroup } from '@/lib/site';
import { Glyph, WhatsApp } from './Icons';
import Wordmark from './Wordmark';
import OpenStatus from './OpenStatus';

const navLinks = [
  { href: '/#builds', label: 'Builds' },
  { href: '/#accessories', label: 'Accessories' },
  { href: '/#reviews', label: 'Reviews' },
  { href: '/#visit', label: 'Visit' },
  { href: '/#faq', label: 'FAQ' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mega, setMega] = useState(false);
  const [sheet, setSheet] = useState(false);
  const reduce = useReducedMotion();
  const intent = useRef<number | undefined>(undefined);
  const hoverOpened = useRef(false);
  const megaBtn = useRef<HTMLButtonElement>(null);
  const megaPanel = useRef<HTMLDivElement>(null);
  const sheetFirst = useRef<HTMLAnchorElement>(null);
  const burger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mega on Escape / outside click
  useEffect(() => {
    if (!mega) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMega(false);
        megaBtn.current?.focus();
      }
    };
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!megaPanel.current?.contains(t) && !megaBtn.current?.contains(t)) setMega(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onDown);
    };
  }, [mega]);

  // Mobile sheet: lock scroll, focus first link, Escape closes
  useEffect(() => {
    if (!sheet) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const t = window.setTimeout(() => sheetFirst.current?.focus(), 60);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setSheet(false);
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.clearTimeout(t);
      document.removeEventListener('keydown', onKey);
      burger.current?.focus();
    };
  }, [sheet]);

  const openSoon = useCallback(() => {
    window.clearTimeout(intent.current);
    intent.current = window.setTimeout(() => {
      hoverOpened.current = true;
      setMega(true);
    }, 120);
  }, []);
  const closeSoon = useCallback(() => {
    window.clearTimeout(intent.current);
    intent.current = window.setTimeout(() => {
      hoverOpened.current = false;
      setMega(false);
    }, 160);
  }, []);

  const order: ServiceGroup[] = ['protection', 'upgrades', 'restoration'];

  return (
    <>
      <header className="nav" data-scrolled={scrolled || mega} onMouseLeave={closeSoon}>
        <div className="wrap nav__inner">
          <Wordmark />
          <nav className="nav__links" aria-label="Main">
            <button
              ref={megaBtn}
              className="nav__link"
              aria-expanded={mega}
              aria-controls="mega-services"
              onClick={() => {
                window.clearTimeout(intent.current);
                // A click right after hover-open keeps it open instead of toggling it shut.
                setMega((v) => (hoverOpened.current ? true : !v));
                hoverOpened.current = false;
              }}
              onMouseEnter={openSoon}
            >
              Services <ChevronDown aria-hidden="true" />
            </button>
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} className="nav__link" onMouseEnter={closeSoon}>
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="nav__actions">
            <a href={links.tel} className="icon-btn" aria-label={`Call ${business.phoneDisplay}`} title={business.phoneDisplay} data-track="click_call">
              <Phone aria-hidden="true" />
            </a>
            <Link href="/#book" className="btn btn--primary nav__book">
              Consult now <ArrowRight className="arrow" aria-hidden="true" />
            </Link>
            <button ref={burger} className="icon-btn nav__burger" aria-label="Open menu" aria-expanded={sheet} onClick={() => setSheet(true)}>
              <Menu aria-hidden="true" />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mega && (
            <motion.div
              id="mega-services"
              ref={megaPanel}
              className="mega"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4, transition: { duration: 0.12 } }}
              transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
              onMouseEnter={() => window.clearTimeout(intent.current)}
            >
              <div className="wrap mega__grid">
                {order.map((g) => (
                  <div className="mega__col" key={g}>
                    <h3 className="mono" style={{ color: 'var(--smoke)' }}>{groups[g].title}</h3>
                    {services
                      .filter((s) => s.group === g)
                      .map((s) => (
                        <Link key={s.slug} href={`/services/${s.slug}`} className="mega__item" onClick={() => setMega(false)}>
                          <Glyph name={s.glyph} />
                          <span>
                            <strong>{s.name}</strong>
                            <span>{s.short}</span>
                          </span>
                        </Link>
                      ))}
                  </div>
                ))}
                <div className="card mega__promo">
                  <div>
                    <p className="eyebrow">Free consultation</p>
                    <p className="h3">Not sure what your car needs?</p>
                    <p className="body" style={{ marginTop: 10 }}>
                      Come in and see coatings, films and materials on real samples. No obligation.
                    </p>
                  </div>
                  <Link href="/#book" className="btn btn--primary" onClick={() => setMega(false)}>
                    Consult now <ArrowRight className="arrow" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <AnimatePresence>
        {sheet && (
          <motion.div
            className="sheet"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.15 } }}
            transition={{ duration: 0.26, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <div className="sheet__head">
              <Wordmark />
              <button className="icon-btn" aria-label="Close menu" onClick={() => setSheet(false)}>
                <X aria-hidden="true" />
              </button>
            </div>
            <nav className="sheet__links" aria-label="Mobile">
              <Link ref={sheetFirst} href="/#services" onClick={() => setSheet(false)}>
                Services <ArrowUpRight aria-hidden="true" />
              </Link>
              {navLinks.map((l) => (
                <Link key={l.href} href={l.href} onClick={() => setSheet(false)}>
                  {l.label} <ArrowUpRight aria-hidden="true" />
                </Link>
              ))}
              <Link href="/contact" onClick={() => setSheet(false)}>
                Contact <ArrowUpRight aria-hidden="true" />
              </Link>
            </nav>
            <div className="sheet__foot">
              <p className="mono" style={{ color: 'var(--mist)', margin: 0 }}>
                <OpenStatus />
              </p>
              <a href={links.tel} className="btn btn--primary btn--xl btn--block" data-track="click_call">
                <Phone aria-hidden="true" /> Call {business.phoneDisplay}
              </a>
              <a href={whatsappLink('Hi Shine Squad, I would like to book a free consultation.')} target="_blank" rel="noopener noreferrer" className="btn btn--xl btn--block" data-track="click_whatsapp">
                <WhatsApp style={{ color: '#25D366' }} /> WhatsApp us
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
