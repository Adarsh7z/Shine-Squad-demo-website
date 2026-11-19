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
 * The hero's one entrance on load (also after client-side navigation) and click tracking via [data-track].
 * Nothing fades in on scroll.
 */
export default function ClientEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>('.hero[data-enter]');
    if (hero && !hero.classList.contains('is-entered')) {
      requestAnimationFrame(() => requestAnimationFrame(() => hero.classList.add('is-entered')));
    }

    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>('[data-track]');
      if (el) track(el.dataset.track!, { href: (el as HTMLAnchorElement).href });
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [pathname]);

  return null;
}
