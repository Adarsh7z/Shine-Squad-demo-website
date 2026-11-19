'use client';

import { useEffect } from 'react';

type MountedEl = HTMLElement & { __moment?: { destroy?: () => void }; __momentP?: Promise<unknown> };
type MomentsModule = { mount: (el: Element) => Promise<unknown> };

/**
 * Mounts tasteskill's moment loader on one section after React has hydrated it
 * (the moment moves the section's photographs into its stage, which must not happen before hydration),
 * and puts everything back when the page unmounts.
 */
export default function MomentMount({ target }: { target: string }) {
  useEffect(() => {
    const el = document.getElementById(target) as MountedEl | null;
    if (!el) return;
    let gone = false;
    (window as unknown as { __momentsManual?: boolean }).__momentsManual = true;
    import(/* webpackIgnore: true */ '/assets/moments/moments.js' as string)
      .then((m: MomentsModule) => (gone ? undefined : m.mount(el)))
      .catch(() => {
        /* the section reads as written without the moment */
      });
    return () => {
      gone = true;
      try {
        el.__moment?.destroy?.();
      } catch {
        /* already gone */
      }
      delete el.__moment;
      delete el.__momentP;
      el.removeAttribute('data-moment-mounted');
    };
  }, [target]);
  return null;
}
