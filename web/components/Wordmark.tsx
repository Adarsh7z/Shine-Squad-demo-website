import Link from 'next/link';

/** The client's own mark: the yellow SS tile and the signboard wordmark. */
export default function Wordmark({ sub = true, ink = false, onClick }: { sub?: boolean; ink?: boolean; onClick?: () => void }) {
  return (
    <Link href="/" className={`wordmark${ink ? ' wordmark--ink' : ''}`} onClick={onClick}>
      <span className="wordmark__mark" aria-hidden="true">SS</span>
      <span className="wordmark__name">
        <span className="wordmark__text">SHINE SQUAD</span>
        {sub ? <span className="wordmark__sub">A unit of Car Jewel</span> : null}
      </span>
    </Link>
  );
}
