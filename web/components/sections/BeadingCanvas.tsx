'use client';

import { useEffect, useRef } from 'react';

type Drop = { x: number; y: number; r: number; vx: number; vy: number };

/** Hydrophobic water-beading demo: droplets bead and roll off a coated panel; the pointer acts like a breeze. */
export default function BeadingCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lowEnd = (navigator.hardwareConcurrency || 8) <= 4;

    let w = 0;
    let h = 0;
    let dpr = 1;
    const drops: Drop[] = [];
    const pointer = { x: -999, y: -999, active: false };
    let raf = 0;
    let running = false;

    const rand = (a: number, b: number) => a + Math.random() * (b - a);
    const spawn = (top = false): Drop => ({
      x: rand(0, w),
      y: top ? rand(-40, -6) : rand(0, h),
      r: rand(4.5, 11),
      vx: 0,
      vy: 0,
    });

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!drops.length) {
        const n = Math.round(Math.min(60, Math.max(26, (w * h) / 4200)));
        for (let i = 0; i < n; i++) drops.push(spawn());
      }
    };

    const drawPanel = () => {
      const g = ctx.createLinearGradient(0, 0, w, h);
      g.addColorStop(0, '#26262e');
      g.addColorStop(0.55, '#0c0c0f');
      g.addColorStop(1, '#060607');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
      // studio light reflection band
      const band = ctx.createLinearGradient(0, 0, w, 0);
      band.addColorStop(0.15, 'rgba(255,255,255,0)');
      band.addColorStop(0.35, 'rgba(255,255,255,0.07)');
      band.addColorStop(0.42, 'rgba(255,255,255,0.015)');
      band.addColorStop(0.6, 'rgba(255,255,255,0)');
      ctx.fillStyle = band;
      ctx.fillRect(0, 0, w, h);
    };

    const drawDrop = (d: Drop) => {
      const r = d.r;
      // contact shadow
      ctx.beginPath();
      ctx.ellipse(d.x + r * 0.18, d.y + r * 0.28, r * 1.04, r * 0.95, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0,0,0,0.55)';
      ctx.fill();
      // lens body: darker centre, bright rim (how real beads look on dark paint)
      const g = ctx.createRadialGradient(d.x, d.y, r * 0.15, d.x, d.y, r);
      g.addColorStop(0, 'rgba(255,255,255,0.04)');
      g.addColorStop(0.7, 'rgba(210,220,235,0.12)');
      g.addColorStop(1, 'rgba(235,240,250,0.42)');
      ctx.beginPath();
      ctx.arc(d.x, d.y, r, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();
      ctx.lineWidth = 0.8;
      ctx.strokeStyle = 'rgba(255,255,255,0.32)';
      ctx.stroke();
      // caustic crescent (light focused through the bead), warm from the signboard
      ctx.beginPath();
      ctx.arc(d.x + r * 0.1, d.y + r * 0.1, r * 0.72, Math.PI * 0.1, Math.PI * 0.85);
      ctx.lineWidth = Math.max(1, r * 0.16);
      ctx.strokeStyle = 'rgba(255,214,120,0.30)';
      ctx.stroke();
      // specular highlight
      ctx.beginPath();
      ctx.ellipse(d.x - r * 0.36, d.y - r * 0.42, Math.max(0.8, r * 0.26), Math.max(0.6, r * 0.16), -0.6, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,0.92)';
      ctx.fill();
    };

    const step = () => {
      drawPanel();
      for (let i = 0; i < drops.length; i++) {
        const d = drops[i];
        // gravity grows with size: small beads cling, big ones roll
        const grav = d.r > 12 ? 0.05 + (d.r - 12) * 0.035 : 0;
        d.vy += grav;
        if (pointer.active) {
          const dx = d.x - pointer.x;
          const dy = d.y - pointer.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 90 && dist > 0.1) {
            const f = (1 - dist / 90) * 0.55;
            d.vx += (dx / dist) * f;
            d.vy += (dy / dist) * f;
          }
        }
        d.vx *= 0.9;
        d.vy *= 0.94;
        d.x += d.vx;
        d.y += d.vy;
        // merge
        for (let j = i + 1; j < drops.length; j++) {
          const o = drops[j];
          if (Math.hypot(d.x - o.x, d.y - o.y) < (d.r + o.r) * 0.82) {
            const area = d.r * d.r + o.r * o.r;
            d.r = Math.min(18, Math.sqrt(area));
            d.vx = (d.vx + o.vx) / 2;
            d.vy = (d.vy + o.vy) / 2;
            drops[j] = spawn(true);
          }
        }
        if (d.y - d.r > h || d.x < -20 || d.x > w + 20) drops[i] = spawn(true);
        drawDrop(drops[i]);
      }
    };

    const loop = () => {
      step();
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || reduce || lowEnd) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    resize();
    step(); // static frame always rendered
    const ro = new ResizeObserver(() => {
      resize();
      if (!running) step();
    });
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()), { threshold: 0.1 });
    io.observe(canvas);
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVis);

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
      pointer.active = true;
    };
    const onLeave = () => (pointer.active = false);
    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerleave', onLeave);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <div className="beading">
      <canvas ref={ref} aria-label="Water beading on a ceramic-coated panel. Move your pointer to blow the droplets." role="img" />
    </div>
  );
}
