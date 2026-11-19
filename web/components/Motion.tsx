'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, SplitText);

/** Strong ease-out for things entering; a gentle in-out for scrubbed travel (Emil Kowalski's rules). */
const OUT = 'expo.out';
/** Colours spelled out: GSAP cannot tween to a CSS variable (letters would go transparent mid-scrub). */
const INK = 'rgba(242, 239, 233, 1)';
const DIM = 'rgba(242, 239, 233, 0.24)';
const SCRUB = 'none';

/**
 * The scroll-driven motion layer. Lenis gives the page its weight; GSAP ScrollTrigger pins and scrubs
 * the scenes; SplitText splits headlines into masked lines, words or characters.
 * Nothing runs under prefers-reduced-motion (html never gets the .motion class), and every scene reads
 * complete without it.
 */
export default function Motion() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  // Smooth scroll, created once for the whole visit
  useEffect(() => {
    const html = document.documentElement;
    if (!html.classList.contains('motion')) return;
    ScrollTrigger.config({ ignoreMobileResize: true });
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true, anchors: { offset: 0 } });
    lenisRef.current = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    const raf = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    const onCmd = (e: Event) => ((e as CustomEvent).detail === 'stop' ? lenis.stop() : lenis.start());
    window.addEventListener('ss:lenis', onCmd);
    return () => {
      window.removeEventListener('ss:lenis', onCmd);
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // The scenes, rebuilt for every page
  useEffect(() => {
    const html = document.documentElement;
    const motion = html.classList.contains('motion');
    let ctx: gsap.Context | undefined;
    let cancelled = false;

    // The scroll line runs on every page, motion or not
    const bar = document.querySelector<HTMLElement>('[data-progress]');
    const progress = bar
      ? ScrollTrigger.create({ start: 0, end: 'max', onUpdate: (s) => gsap.set(bar, { scaleX: s.progress }) })
      : null;

    // "Back to top" through Lenis when it runs
    const onTop = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('[data-top]');
      if (!a) return;
      e.preventDefault();
      if (lenisRef.current) lenisRef.current.scrollTo(0, { duration: 1.6 });
      else window.scrollTo({ top: 0 });
      (document.querySelector('.skip-link') as HTMLElement | null)?.focus({ preventScroll: true });
    };
    document.addEventListener('click', onTop);

    if (!motion) {
      return () => {
        progress?.kill();
        document.removeEventListener('click', onTop);
      };
    }

    const build = () => {
      if (cancelled) return;
      ctx = gsap.context(() => {
        const mm = gsap.matchMedia();
        const q = <T extends Element = HTMLElement>(s: string, root: ParentNode = document) => Array.from(root.querySelectorAll<T>(s) as NodeListOf<T>);

        /* ---------- generic reveals ---------- */
        q('[data-lines]').forEach((el) => {
          if (el.closest('[data-hero]')) return;
          SplitText.create(el, {
            type: 'lines',
            mask: 'lines',
            linesClass: 'split-line',
            autoSplit: true,
            onSplit: (self) =>
              gsap.from(self.lines, {
                yPercent: 108,
                duration: 1.3,
                ease: OUT,
                stagger: 0.09,
                scrollTrigger: { trigger: el, start: 'top 88%', once: true },
              }),
          });
        });
        q('[data-fade]').forEach((el) => {
          gsap.from(el, { y: 28, autoAlpha: 0, duration: 1.2, ease: OUT, scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
        });
        q('[data-stagger]').forEach((el) => {
          gsap.from(el.children, { y: 40, autoAlpha: 0, duration: 1.2, ease: OUT, stagger: 0.1, scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
        });

        /* ---------- 1. hero ---------- */
        const hero = document.querySelector<HTMLElement>('[data-hero]');
        if (hero) {
          const title = hero.querySelector<HTMLElement>('[data-hero-title]')!;
          const l1 = title.querySelector<HTMLElement>('.l1')!;
          const l2 = title.querySelector<HTMLElement>('[data-blur]')!;
          const car = hero.querySelector<HTMLElement>('[data-hero-car]')!;
          const foot = hero.querySelector<HTMLElement>('[data-hero-foot]')!;
          const s1 = SplitText.create(l1, { type: 'words', mask: 'words' });
          const s2 = SplitText.create(l2, { type: 'chars' });
          gsap.set([title, foot], { autoAlpha: 1 });
          const intro = gsap.timeline({ defaults: { ease: OUT } });
          intro
            // the photo paints at once (it is the largest paint); it only settles and brightens
            .from(car, { scale: 1.08, yPercent: 4, filter: 'brightness(0.35)', duration: 2.2 }, 0)
            .from(s1.words, { yPercent: 110, duration: 1.4, stagger: 0.08 }, 0.25)
            .from(s2.chars, { autoAlpha: 0, filter: 'blur(16px)', x: -12, duration: 1.6, stagger: 0.07, ease: 'power3.out' }, 0.7)
            .from(foot, { autoAlpha: 0, y: 16, duration: 1.2 }, 1.2);

          gsap
            .timeline({ scrollTrigger: { trigger: hero, start: 'top top', end: '+=100%', scrub: true, pin: true, anticipatePin: 1 } })
            .to(title, { yPercent: -60, autoAlpha: 0, filter: 'blur(10px)', ease: SCRUB }, 0)
            .to(car, { scale: 1.32, yPercent: -10, ease: SCRUB }, 0)
            .to(foot, { autoAlpha: 0, ease: SCRUB, duration: 0.4 }, 0)
            .to(hero.querySelector('.hero__glow'), { autoAlpha: 0.2, ease: SCRUB }, 0);
        }

        /* ---------- 2. statement + trail ---------- */
        const st = document.querySelector<HTMLElement>('[data-statement]');
        if (st) {
          const imgs = q('.trail__img', st);
          const tl = gsap.timeline({ scrollTrigger: { trigger: st, start: 'top top', end: '+=200%', scrub: 0.6, pin: true, anticipatePin: 1 } });
          imgs.forEach((img, i) => {
            const rot = (i % 2 ? 1 : -1) * (2 + (i % 3));
            tl.fromTo(
              img,
              { y: 0, rotate: rot, scale: 0.86, autoAlpha: 0 },
              { y: () => -(window.innerHeight * 1.35 + img.offsetHeight), rotate: -rot / 2, scale: 1.04, autoAlpha: 1, ease: SCRUB, duration: 1 },
              i * 0.16
            ).to(img, { autoAlpha: 0, duration: 0.15, ease: SCRUB }, i * 0.16 + 0.85);
          });
        }

        /* ---------- 3. approach ---------- */
        const ap = document.querySelector<HTMLElement>('[data-approach]');
        if (ap) {
          const bg = ap.querySelector<HTMLElement>('[data-reveal-bg]')!;
          gsap.fromTo(
            bg,
            { clipPath: 'inset(14% 12% 14% 12%)' },
            { clipPath: 'inset(0% 0% 0% 0%)', ease: SCRUB, scrollTrigger: { trigger: ap, start: 'top bottom', end: 'top top', scrub: true } }
          );
          gsap.fromTo(bg.querySelector('img'), { scale: 1.2 }, { scale: 1, ease: SCRUB, scrollTrigger: { trigger: ap, start: 'top bottom', end: 'bottom top', scrub: true } });
        }

        /* ---------- 4. steps, pinned ---------- */
        const stp = document.querySelector<HTMLElement>('[data-steps]');
        if (stp) {
          const cards = q('.steps__card img', stp);
          const bgs = q('.steps__bg img', stp);
          const texts = q('.step', stp);
          const n = texts.length;
          const tl = gsap.timeline({
            defaults: { ease: 'power2.inOut' },
            scrollTrigger: {
              trigger: stp,
              start: 'top top',
              end: `+=${(n - 1) * 100}%`,
              scrub: 0.6,
              pin: true,
              anticipatePin: 1,
              snap: { snapTo: 'labels', duration: { min: 0.3, max: 0.8 }, delay: 0.05, ease: 'power2.inOut' },
            },
          });
          tl.addLabel('s0');
          for (let i = 1; i < n; i++) {
            const at = i - 1;
            tl.to(texts[i - 1], { autoAlpha: 0, y: -40, duration: 0.4 }, at + 0.1)
              .fromTo(cards[i], { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.8 }, at + 0.1)
              .to(cards[i - 1], { scale: 1.12, duration: 0.8 }, at + 0.1)
              .to(bgs[i], { autoAlpha: 1, duration: 0.8 }, at + 0.1)
              .fromTo(texts[i], { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.5 }, at + 0.45)
              .addLabel(`s${i}`, at + 1);
          }
        }

        /* ---------- 5. manifesto ---------- */
        const mf = document.querySelector<HTMLElement>('[data-manifesto]');
        if (mf) {
          const words = mf.querySelector<HTMLElement>('[data-words]')!;
          const sw = SplitText.create(words, { type: 'words', wordsClass: 'word' });
          gsap.fromTo(sw.words, { color: DIM }, { color: INK, stagger: 0.1, ease: SCRUB, scrollTrigger: { trigger: words, start: 'top 78%', end: 'bottom 42%', scrub: true } });
          const img = mf.querySelector<HTMLElement>('[data-parallax] img');
          if (img) gsap.fromTo(img, { yPercent: -6 }, { yPercent: 6, ease: SCRUB, scrollTrigger: { trigger: mf, start: 'top bottom', end: 'bottom top', scrub: true } });
        }

        /* ---------- 6. services, pinned (tablet and desktop) ---------- */
        mm.add('(min-width: 768px)', () => {
          const sv = document.querySelector<HTMLElement>('[data-services] .services__pin');
          if (!sv) return;
          const imgs = q('.services__media img', sv);
          const items = q('.svc', sv);
          const idx = sv.querySelector<HTMLElement>('[data-svc-index]');
          const n = items.length;
          const splits = items.map((it) => SplitText.create(it.querySelector('[data-chars]')!, { type: 'chars', charsClass: 'char' }));
          splits.forEach((s) => gsap.set(s.chars, { color: DIM }));
          const tl = gsap.timeline({
            defaults: { ease: 'power2.inOut' },
            scrollTrigger: {
              trigger: sv,
              start: 'top top',
              end: `+=${(n - 0.5) * 100}%`,
              scrub: 0.6,
              pin: true,
              anticipatePin: 1,
              snap: { snapTo: 'labels', duration: { min: 0.3, max: 0.8 }, delay: 0.05, ease: 'power2.inOut' },
              onUpdate: (self) => {
                if (idx) idx.textContent = String(Math.min(n, Math.floor(self.progress * (n - 0.5) + 0.2) + 1)).padStart(2, '0');
              },
            },
          });
          for (let i = 0; i < n; i++) {
            tl.addLabel(`v${i}`, i);
            tl.fromTo(splits[i].chars, { color: DIM }, { color: INK, stagger: 0.03, duration: 0.3, ease: SCRUB, immediateRender: false }, i);
            if (i < n - 1) {
              tl.to(items[i], { autoAlpha: 0, y: -48, duration: 0.35 }, i + 0.55)
                .fromTo(imgs[i + 1], { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.6 }, i + 0.5)
                .to(imgs[i], { scale: 1.12, duration: 0.6 }, i + 0.5)
                .fromTo(items[i + 1], { autoAlpha: 0, y: 48 }, { autoAlpha: 1, y: 0, duration: 0.4 }, i + 0.8);
            }
          }
          tl.addLabel('end', n - 0.5);
        });

        /* ---------- 7. dull ends here ---------- */
        const dl = document.querySelector<HTMLElement>('[data-dull]');
        if (dl) {
          const word = dl.querySelector<HTMLElement>('[data-dull-word]')!;
          const pic = dl.querySelector<HTMLElement>('[data-dull-pic]')!;
          const end = dl.querySelector<HTMLElement>('[data-dull-end]')!;
          const sc = SplitText.create(word, { type: 'chars' });
          // the word comes into focus while the section scrolls in, so no screen is ever empty
          gsap.from(sc.chars, { autoAlpha: 0, filter: 'blur(24px)', yPercent: 20, stagger: 0.08, ease: 'power2.out', scrollTrigger: { trigger: dl, start: 'top 85%', end: 'top 10%', scrub: 0.6 } });
          gsap
            .timeline({ scrollTrigger: { trigger: dl, start: 'top top', end: '+=160%', scrub: 0.6, pin: true, anticipatePin: 1 } })
            .to(word, { scale: 0.82, autoAlpha: 0.12, duration: 0.5, ease: SCRUB }, 0.1)
            .to(pic, { clipPath: 'inset(0% 0% 0% 0%)', autoAlpha: 1, duration: 0.6, ease: 'power2.inOut' }, 0.05)
            .fromTo(pic.querySelector('img'), { scale: 1.3 }, { scale: 1, duration: 0.9, ease: SCRUB }, 0.05)
            .to(end, { autoAlpha: 1, duration: 0.01 }, 0.6)
            .from(end.children, { y: 50, autoAlpha: 0, stagger: 0.08, duration: 0.4, ease: 'power3.out' }, 0.6);
        }

        /* ---------- 8. feature panels zoom out as they pass ---------- */
        q('[data-zoom] img').forEach((img) => {
          const sec = img.closest('section')!;
          gsap.fromTo(img, { scale: 1.3 }, { scale: 1, ease: SCRUB, scrollTrigger: { trigger: sec, start: 'top bottom', end: 'bottom top', scrub: true } });
        });

        /* ---------- finale ---------- */
        const fin = document.querySelector<HTMLElement>('[data-finale]');
        if (fin) {
          const img = fin.querySelector<HTMLElement>('[data-finale-bg] img');
          if (img) gsap.fromTo(img, { scale: 1.2, autoAlpha: 0.2 }, { scale: 1, autoAlpha: 0.6, ease: SCRUB, scrollTrigger: { trigger: fin, start: 'top bottom', end: 'bottom bottom', scrub: true } });
        }
      });
      ScrollTrigger.refresh();
    };

    const start = () => (document.fonts && document.fonts.status !== 'loaded' ? document.fonts.ready.then(build) : build());
    const raf = requestAnimationFrame(() => {
      start();
    });
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.removeEventListener('load', onLoad);
      document.removeEventListener('click', onTop);
      progress?.kill();
      ctx?.revert();
    };
  }, [pathname]);

  return null;
}
