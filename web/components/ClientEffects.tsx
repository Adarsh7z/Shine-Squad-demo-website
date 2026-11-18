'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function track(event: string, params: Record<string, unknown> = {}) {
  try {
    window.gtag?.('event', event, params);
    window.dataLayer?.push({ event, ...params });
  } catch {
    /* analytics must never break the page */
  }
}

/**
 * Page-wide quiet motion layer:
 * - hero entrance trigger
 * - pointer-follow specular highlight on .gloss cards (fine pointers only)
 * - one-time reveal for section headings (.reveal) and the process line (.steps)
 * - click tracking via [data-track]
 */
export default function ClientEffects() {
  const pathname = usePathname();

  useEffect(() => {
    // Hero entrance: once per visit, after first paint.
    const hero = document.querySelector<HTMLElement>('.hero[data-enter]');
    if (hero && !hero.classList.contains('is-entered')) {
      requestAnimationFrame(() => requestAnimationFrame(() => hero.classList.add('is-entered')));
    }

    // Reveal headings + process line once.
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.1 }
    );
    document.querySelectorAll('.reveal, .steps').forEach((el) => io.observe(el));

    // Specular highlight follows the pointer across glossy cards.
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>('.gloss');
      if (!el) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        el.style.setProperty('--gx', String(Math.min(1, Math.max(0, (e.clientX - r.left) / r.width))));
      });
    };
    if (fine) document.addEventListener('pointermove', onMove, { passive: true });

    // Analytics for calls, WhatsApp, directions, reviews.
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>('[data-track]');
      if (el) track(el.dataset.track!, { href: (el as HTMLAnchorElement).href });
    };
    document.addEventListener('click', onClick);

    return () => {
      io.disconnect();
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('click', onClick);
      cancelAnimationFrame(raf);
    };
  }, [pathname]);

  return null;
}
