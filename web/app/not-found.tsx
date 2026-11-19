import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { MAIN_ACTION } from '@/lib/site';

export default function NotFound() {
  return (
    <section className="page-head" style={{ minHeight: '80svh' }} aria-labelledby="nf-h">
      <div className="wrap" style={{ display: 'grid', gap: 'var(--s-5)', justifyItems: 'start', maxWidth: 720, marginInline: 'auto' }}>
        <p className="t-label muted">Page not found (404)</p>
        <h1 className="t-h1" id="nf-h">
          This page has moved or never existed
        </h1>
        <p className="t-lead muted">Every service, the builds and the way to the shop are on the home page.</p>
        <div className="page-head__actions">
          <Link className="btn btn--primary" href="/">
            Go to the home page <ArrowRight className="arrow" aria-hidden="true" />
          </Link>
          <Link className="btn" href="/#book">
            {MAIN_ACTION}
          </Link>
        </div>
      </div>
    </section>
  );
}
