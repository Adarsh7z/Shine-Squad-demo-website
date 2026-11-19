/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { ArrowRight, ArrowUp } from 'lucide-react';
import { MAIN_ACTION, business, links } from '@/lib/site';
import { cine } from '@/lib/cine';

/** The finale: one last ask over the two Thar Roxx builds, then the small print. */
export default function Footer() {
  const year = new Date().getFullYear();
  const p = cine('thar');
  return (
    <footer className="finale" id="contact" data-finale>
      <div className="finale__bg" aria-hidden="true" data-finale-bg>
        <img src={p.src} srcSet={p.srcSet} sizes="100vw" width={p.width} height={p.height} alt="" loading="lazy" decoding="async" />
      </div>
      <div className="finale__main">
        <p className="caps muted">Are you ready to</p>
        <p className="serif t-hero" data-lines>
          Make It
          <br />
          Shine
        </p>
        <Link href="/#book" className="cta">
          {MAIN_ACTION} <ArrowRight aria-hidden="true" />
        </Link>
      </div>
      <div className="wrap finale__foot">
        <a href="#main" className="finale__top caps" data-top>
          Back to top <ArrowUp aria-hidden="true" />
        </a>
        <div className="finale__cols">
          <span>
            © {year} {business.name} · A unit of {business.parent}, since {business.parentSince}
          </span>
          <nav aria-label="Footer">
            <a href={links.tel} data-track="click_call">
              {business.phoneDisplay}
            </a>
            <a href={links.maps} target="_blank" rel="noopener noreferrer">
              Minister Road, next to KIMS
            </a>
            <Link href="/contact">Contact</Link>
            <Link href="/privacy">Privacy</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
