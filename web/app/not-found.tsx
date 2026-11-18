import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <section className="page-hero" style={{ minHeight: '70svh', display: 'grid', alignItems: 'center' }} aria-labelledby="nf-h">
      <div className="hero__bg" aria-hidden="true" />
      <div className="wrap" style={{ display: 'grid', gap: 24, justifyItems: 'start' }}>
        <p className="eyebrow" style={{ margin: 0 }}>404</p>
        <h1 className="h1" id="nf-h">This road doesn&rsquo;t go anywhere.</h1>
        <p className="lead">The page you were looking for has moved or never existed. Let&rsquo;s get you back on track.</p>
        <div className="hero__ctas">
          <Link className="btn btn--primary btn--xl" href="/">
            Back to home <ArrowRight className="arrow" aria-hidden="true" />
          </Link>
          <Link className="btn btn--xl" href="/#book">
            Consult now
          </Link>
        </div>
      </div>
    </section>
  );
}
