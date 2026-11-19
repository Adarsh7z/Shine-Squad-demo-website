'use client';

import dynamic from 'next/dynamic';

/** GSAP, ScrollTrigger, SplitText and Lenis load as their own chunk, after the page is interactive. */
const Motion = dynamic(() => import('./Motion'), { ssr: false });

export default function MotionLoader() {
  return <Motion />;
}
