import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { MAIN_ACTION } from '@/lib/site';

export default function NotFound() {
  return (
    <section className="page-head" style={{ minHeight: '90svh', display: 'grid', alignItems: 'center' }} aria-labelledby="nf-h">
      <div className="wrap" style={{ display: 'grid', gap: 26, justifyItems: 'center', textAlign: 'center' }}>
        <p className="caps muted">Page not found · 404</p>
        <h1 className="serif t-xl" id="nf-h">
          This Road Ends Here
        </h1>
        <p className="lede" style={{ textAlign: 'center' }}>
          Every service, the builds and the way to the shop are on the home page.
        </p>
        <div className="page-head__actions" style={{ justifyContent: 'center' }}>
          <Link className="cta cta--solid" href="/">
            Go to the home page <ArrowRight aria-hidden="true" />
          </Link>
          <Link className="cta" href="/#book">
            {MAIN_ACTION}
          </Link>
        </div>
      </div>
    </section>
  );
}
