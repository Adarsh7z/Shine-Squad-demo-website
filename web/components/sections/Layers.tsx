'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import BeadingCanvas from './BeadingCanvas';

const steps = [
  { k: 'Layer 01', t: 'Base paint', d: 'The colour your car left the factory with. It is thin and soft, and once it is chipped it never looks the same again.' },
  { k: 'Layer 02', t: 'Clear coat', d: 'A clear layer over the colour that gives gloss and UV protection. Daily washing, dust and sun slowly scratch and dull it.' },
  { k: 'Step 03', t: 'Paint correction', d: 'Before anything goes on top, we machine-polish away swirls and light scratches, so you seal in the best version of your paint, not the damage.' },
  { k: 'Layer 04', t: 'Coating: Teflon, ceramic or graphene', d: 'A slick protective layer bonded to the clear coat. Water beads and rolls off, dirt struggles to stick, and the gloss goes deep.' },
  { k: 'Layer 05', t: 'Paint protection film', d: 'A tough, clear or matte urethane film on top. It takes stone chips and scrapes for your paint, and light marks heal with heat.' },
];

// Isometric slab helpers (viewBox 600 x 560)
const O = { x: 300, y: 370 };
const ex = { x: 0.866, y: 0.5 };
const ez = { x: -0.866, y: 0.5 };
const A = 165;
const B = 128;
const pt = (x: number, z: number, h: number) => `${(O.x + x * ex.x + z * ez.x).toFixed(1)},${(O.y + x * ex.y + z * ez.y - h).toFixed(1)}`;
function slab(h0: number, h1: number) {
  const top = [pt(-A, -B, h1), pt(A, -B, h1), pt(A, B, h1), pt(-A, B, h1)].join(' ');
  const right = [pt(A, -B, h0), pt(A, B, h0), pt(A, B, h1), pt(A, -B, h1)].join(' ');
  const left = [pt(-A, B, h0), pt(A, B, h0), pt(A, B, h1), pt(-A, B, h1)].join(' ');
  return { top, right, left };
}

const LAYERS = [
  { h: [0, 40], top: 'url(#paintTop)', side: '#141a2e', side2: '#0d1120', label: 'Base paint' },
  { h: [40, 58], top: 'rgba(225,235,255,0.18)', side: 'rgba(225,235,255,0.10)', side2: 'rgba(225,235,255,0.06)', label: 'Clear coat' },
  null, // correction (surface effect)
  { h: [58, 64], top: 'rgba(255,214,92,0.30)', side: 'rgba(255,194,26,0.55)', side2: 'rgba(255,194,26,0.35)', label: 'Coating' },
  { h: [64, 92], top: 'rgba(235,240,250,0.07)', side: 'rgba(255,255,255,0.10)', side2: 'rgba(255,255,255,0.06)', label: 'PPF' },
] as const;

const METRICS = ['Gloss', 'Water beading', 'Chip & scratch protection', 'How long it lasts'];
const COMPARE = [
  { name: 'Teflon', what: 'Polymer polish-and-seal', best: 'A quick gloss refresh', scores: [2, 2, 1, 1], hl: false },
  { name: 'Ceramic', what: 'Hard, glass-like SiO₂ layer', best: 'Gloss and easy washing', scores: [4, 4, 2, 3], hl: false },
  { name: 'Graphene', what: 'Ceramic with graphene: slicker, fewer water spots', best: 'Maximum gloss and water behaviour', scores: [5, 5, 2, 4], hl: true },
  { name: 'PPF', what: 'Clear or matte urethane film', best: 'Stone-chip and scratch defence', scores: [4, 2, 5, 5], hl: false },
];

export default function Layers() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
        }
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="section section--raised layers hairline-top" id="layers" aria-labelledby="layers-h">
      <div className="wrap">
        <div className="section-head section-head--split">
          <div>
            <p className="eyebrow reveal">Know your protection</p>
            <h2 className="h2 reveal" id="layers-h">
              What actually sits on your paint
            </h2>
          </div>
          <p className="lead reveal">Five layers, from the factory colour to the film that takes the stone chips. Scroll through to see where each treatment goes.</p>
        </div>

        <div className="layers__grid">
          <div className="layers__sticky">
            <div className="layers__stage">
              <svg className="layers__svg" viewBox="0 0 600 560" role="img" aria-label={`Cross-section of a car panel showing ${steps.slice(0, active + 1).map((s) => s.t).join(', ')}`}>
                <defs>
                  <linearGradient id="paintTop" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#2a3866" />
                    <stop offset="0.5" stopColor="#1a2347" />
                    <stop offset="1" stopColor="#0f1530" />
                  </linearGradient>
                  <radialGradient id="glow" cx="50%" cy="40%" r="50%">
                    <stop offset="0" stopColor="rgba(255,244,214,0.10)" />
                    <stop offset="1" stopColor="rgba(255,244,214,0)" />
                  </radialGradient>
                </defs>
                <ellipse cx="300" cy="440" rx="230" ry="40" fill="rgba(0,0,0,0.5)" />
                <rect width="600" height="560" fill="url(#glow)" />
                {LAYERS.map((L, i) => {
                  if (!L) return null;
                  const s = slab(L.h[0], L.h[1]);
                  const on = active >= i;
                  return (
                    <g
                      key={i}
                      className="layer-shape"
                      style={{ transform: on ? 'none' : 'translateY(-70px)', opacity: on ? 1 : 0 }}
                    >
                      <polygon points={s.left} fill={L.side} />
                      <polygon points={s.right} fill={L.side2} />
                      <polygon points={s.top} fill={L.top} stroke={active === i ? 'rgba(255,194,26,0.9)' : 'rgba(255,255,255,0.10)'} strokeWidth={active === i ? 1.5 : 1} />
                    </g>
                  );
                })}
                {/* swirl marks on the clear coat: visible before correction, gone after */}
                <g style={{ opacity: active === 1 ? 0.9 : 0, transition: 'opacity 500ms' }} stroke="rgba(255,255,255,0.55)" strokeWidth="1" fill="none">
                  {[
                    [-90, -40, 40],
                    [30, 10, 55],
                    [-20, 70, 34],
                    [100, -70, 28],
                  ].map(([x, z, r], k) => {
                    const c = pt(x, z, 58).split(',').map(Number);
                    return <ellipse key={k} cx={c[0]} cy={c[1]} rx={r} ry={r * 0.55} strokeDasharray="6 9" />;
                  })}
                </g>
                {/* water beads on the coating */}
                <g style={{ opacity: active === 3 ? 1 : 0, transition: 'opacity 500ms' }}>
                  {[
                    [-120, -60], [-40, -90], [60, -40], [120, 20], [-80, 30], [10, 60], [90, 90], [-140, 90], [150, -100], [-10, -10],
                  ].map(([x, z], k) => {
                    const c = pt(x, z, 64).split(',').map(Number);
                    const r = 5 + (k % 3) * 2;
                    return (
                      <g key={k}>
                        <ellipse cx={c[0]} cy={c[1] - r * 0.4} rx={r} ry={r * 0.8} fill="rgba(220,230,245,0.25)" stroke="rgba(255,255,255,0.5)" strokeWidth="0.8" />
                        <circle cx={c[0] - r * 0.35} cy={c[1] - r * 0.75} r={r * 0.25} fill="#fff" />
                      </g>
                    );
                  })}
                </g>
                {/* stone chip deflected by PPF */}
                <g style={{ opacity: active === 4 ? 1 : 0, transition: 'opacity 500ms' }}>
                  <path d="M120 70 L250 230" stroke="rgba(255,194,26,0.7)" strokeWidth="1.5" strokeDasharray="4 6" />
                  <path d="M250 230 L360 150" stroke="rgba(255,194,26,0.7)" strokeWidth="1.5" strokeDasharray="4 6" />
                  <polygon points="110,60 124,58 128,72 114,76" fill="#9a9aa2" />
                  <circle cx="250" cy="232" r="10" fill="none" stroke="rgba(255,194,26,0.9)" strokeWidth="1.5" />
                </g>
                <text x="28" y="44" fill="#FFC21A" style={{ font: '500 12px var(--font-mono)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                  {steps[active].k} · {steps[active].t.split(':')[0]}
                </text>
              </svg>
              <div className="layers__rail" aria-hidden="true">
                {steps.map((_, i) => (
                  <i key={i} className={i <= active ? 'on' : ''} />
                ))}
              </div>
            </div>
          </div>

          <div className="layer-steps">
            {steps.map((s, i) => (
              <div key={s.t} className={`layer-step${active === i ? ' is-active' : ''}`} data-i={i} ref={(el) => { refs.current[i] = el; }}>
                <span className="mono">{s.k}</span>
                <h3 className="h3">{s.t}</h3>
                <p className="body" style={{ maxWidth: '46ch' }}>{s.d}</p>
                {i === 3 && <BeadingCanvas />}
              </div>
            ))}
          </div>
        </div>

        <div className="compare" role="region" aria-label="Comparison of Teflon, ceramic, graphene and PPF" tabIndex={0}>
          <table>
            <thead>
              <tr>
                <th scope="col"><span className="sr-only">Property</span></th>
                <th scope="col">Teflon</th>
                <th scope="col">Ceramic</th>
                <th scope="col" className="hl">Graphene</th>
                <th scope="col">PPF</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">What it is</th>
                <td>Polymer polish-and-seal</td>
                <td>Hard, glass-like SiO₂ layer</td>
                <td>Ceramic with graphene: slicker, fewer water spots</td>
                <td>Clear or matte urethane film</td>
              </tr>
              <tr>
                <th scope="row">Best for</th>
                <td>A quick gloss refresh</td>
                <td>Gloss and easy washing</td>
                <td>Maximum gloss and water behaviour</td>
                <td>Stone-chip and scratch defence</td>
              </tr>
              {[
                ['Gloss', [2, 4, 5, 4]],
                ['Water beading', [2, 4, 5, 2]],
                ['Chip & scratch protection', [1, 2, 2, 5]],
                ['How long it lasts', [1, 3, 4, 5]],
              ].map(([label, vals]) => (
                <tr key={label as string}>
                  <th scope="row">{label as string}</th>
                  {(vals as number[]).map((v, i) => (
                    <td key={i}>
                      <span className="meter" role="img" aria-label={`${v} out of 5`}>
                        {Array.from({ length: 5 }).map((_, k) => (
                          <i key={k} className={k < v ? 'on' : ''} />
                        ))}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Phones: one swipeable card per option instead of a cramped table */}
        <div className="compare-cards" role="list" aria-label="Comparison of Teflon, ceramic, graphene and PPF">
          {COMPARE.map((c) => (
            <div className={`compare-card${c.hl ? ' compare-card--hl' : ''}`} role="listitem" key={c.name}>
              <h3 className="h3">{c.name}</h3>
              <p className="body">{c.what}</p>
              <p className="compare-card__best">
                <span className="mono">Best for</span> {c.best}
              </p>
              <dl>
                {METRICS.map((m, i) => (
                  <div key={m}>
                    <dt>{m}</dt>
                    <dd>
                      <span className="meter" role="img" aria-label={`${c.scores[i]} out of 5`}>
                        {Array.from({ length: 5 }).map((_, k) => (
                          <i key={k} className={k < c.scores[i] ? 'on' : ''} />
                        ))}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
        <p className="compare-hint mono">Swipe to compare →</p>

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 20, marginTop: 28 }}>
          <p className="body" style={{ maxWidth: '60ch' }}>
            Many owners combine them: PPF on the front for chips, a coating everywhere for gloss. We&rsquo;ll show you each one on a real panel before you decide.
          </p>
          <Link href="/#book" className="btn btn--primary">
            Not sure? Get free advice <ArrowRight className="arrow" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
