import Link from 'next/link';

export default function Wordmark({ sub = true }: { sub?: boolean }) {
  return (
    <Link href="/" className="wordmark">
      <span className="wordmark__mark" aria-hidden="true">SS</span>
      <span>
        SHINE SQUAD
        {sub ? <small>A UNIT OF CAR JEWEL</small> : null}
      </span>
    </Link>
  );
}
