'use client';

import { useEffect, useState } from 'react';
import { getOpenStatus, type OpenStatus as S } from '@/lib/hours';

/** Live open/closed status in Asia/Kolkata. Renders a neutral line until mounted to avoid hydration mismatch. */
export function useOpenStatus() {
  const [status, setStatus] = useState<S | null>(null);
  useEffect(() => {
    const tick = () => setStatus(getOpenStatus());
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, []);
  return status;
}

export default function OpenStatus({ compact = false }: { compact?: boolean }) {
  const s = useOpenStatus();
  if (!s) {
    return (
      <span className="status">
        <span className="dot" aria-hidden="true" /> Mon–Sat · 10 AM – 10 PM
      </span>
    );
  }
  return (
    <span className="status" aria-live="polite">
      <span className={`dot${s.open ? ' dot--ok' : ''}`} aria-hidden="true" />
      <strong>{s.label}</strong>
      {!compact && s.detail ? <span>· {s.detail}</span> : null}
    </span>
  );
}
