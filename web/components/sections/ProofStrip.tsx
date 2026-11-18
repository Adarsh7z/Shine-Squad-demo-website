import { Star } from '../Icons';
import { business } from '@/lib/site';

export default function ProofStrip({ rating, count }: { rating: number; count: number }) {
  const items = [
    { k: 'Google rating', v: (<><Star /> {rating.toFixed(1)} from {count} reviews</>) },
    { k: 'Car Jewel heritage', v: <>Decorating cars since {business.parentSince}</> },
    { k: 'Open', v: <>Mon–Sat · 10 AM – 10 PM</> },
    { k: 'Find us', v: <>Next to KIMS, Minister Road</> },
  ];
  return (
    <section className="proof" aria-label="At a glance">
      <div className="wrap proof__grid">
        {items.map((i) => (
          <div className="proof__item" key={i.k}>
            <span className="mono">{i.k}</span>
            <strong>{i.v}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}
