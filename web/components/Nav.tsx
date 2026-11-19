'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Phone, X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { MAIN_ACTION, business, links, whatsappLink } from '@/lib/site';
import { WhatsApp, YouTube } from './Icons';
import OpenStatus from './OpenStatus';

const menuLinks = [
  { href: '/#services', label: 'Services', n: '01' },
  { href: '/#builds', label: 'Builds', n: '02' },
  { href: '/#reviews', label: 'Reviews', n: '03' },
  { href: '/#visit', label: 'Visit', n: '04' },
  { href: '/#book', label: 'Book', n: '05' },
];

function Mark({ onClick }: { onClick?: () => void }) {
  return (
    <Link href="/" className="mark" onClick={onClick}>
      <span className="mark__tile" aria-hidden="true">
        SS
      </span>
      <span className="mark__word">SHINE SQUAD</span>
    </Link>
  );
}

/** The top bar: contact icons left, the mark centred, the main action and the menu right; a scroll line bottom left. */
export default function Nav() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const reduce = useReducedMotion();
  const burger = useRef<HTMLButtonElement>(null);
  const first = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    html.classList.add('lenis-stopped');
    window.dispatchEvent(new CustomEvent('ss:lenis', { detail: 'stop' }));
    const t = window.setTimeout(() => first.current?.focus(), 80);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => {
      html.classList.remove('lenis-stopped');
      window.dispatchEvent(new CustomEvent('ss:lenis', { detail: 'start' }));
      window.clearTimeout(t);
      document.removeEventListener('keydown', onKey);
      burger.current?.focus();
    };
  }, [open]);

  const close = () => setOpen(false);
  const ease = [0.77, 0, 0.175, 1] as const;

  return (
    <>
      <header className="bar" data-solid={solid}>
        <div className="bar__left">
          <a className="bar__icon" href={links.tel} aria-label={`Call ${business.phoneDisplay}`} data-track="click_call">
            <Phone aria-hidden="true" />
          </a>
          <a className="bar__icon" href={whatsappLink('Hi Shine Squad, I would like to book a free consultation.')} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp Shine Squad" data-track="click_whatsapp">
            <WhatsApp />
          </a>
          <a className="bar__icon bar__icon--yt" href={business.youtube} target="_blank" rel="noopener noreferrer" aria-label="Car Jewel on YouTube" data-track="click_youtube">
            <YouTube />
          </a>
        </div>
        <Mark />
        <div className="bar__right">
          <Link href="/#book" className="cta bar__book">
            {MAIN_ACTION}
          </Link>
          <button ref={burger} className="bar__menu" aria-expanded={open} aria-controls="menu" onClick={() => setOpen(true)}>
            <span className="caps">Menu</span>
            <span className="burger" aria-hidden="true">
              <i />
              <i />
            </span>
            <span className="sr-only">Open menu</span>
          </button>
        </div>
      </header>
      <div className="progress" aria-hidden="true">
        <i data-progress />
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu"
            className="menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={reduce ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
            animate={reduce ? { opacity: 1 } : { clipPath: 'inset(0 0 0% 0)' }}
            exit={reduce ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)', transition: { duration: 0.5, ease } }}
            transition={{ duration: 0.7, ease }}
          >
            <div className="menu__head">
              <Mark onClick={close} />
              <button className="menu__close caps" onClick={close}>
                Close <X aria-hidden="true" />
              </button>
            </div>
            <nav className="menu__links" aria-label="Menu">
              {menuLinks.map((l, i) => (
                <motion.div key={l.href} initial={reduce ? false : { opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25 + i * 0.06, ease: [0.23, 1, 0.32, 1] }}>
                  <Link ref={i === 0 ? first : undefined} href={l.href} onClick={close}>
                    <span>{l.n}</span>
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="menu__foot">
              <p>
                <OpenStatus /> · Minister Road, next to KIMS
              </p>
              <a className="cta" href={links.tel} data-track="click_call">
                Call {business.phoneDisplay} <ArrowUpRight aria-hidden="true" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
