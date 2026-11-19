import { ArrowUpRight } from 'lucide-react';
import { business } from '@/lib/site';
import MomentMount from '../MomentMount';

const chapters = [
  {
    id: 'pQ68arJMB6w',
    image: '/images/builds/pQ68arJMB6w',
    alt: 'Silver Mahindra XUV700 under the hexagon lights of the detailing bay',
    title: 'Mahindra XUV700 AX7L',
    line: 'Paint protection film, ambient lighting, a body kit and a reworked interior.',
  },
  {
    id: 'wUas6KK3rPU',
    image: '/images/builds/i20-studio',
    alt: 'Red Hyundai i20 with a deep gloss under the bay lights',
    title: 'Hyundai i20, 2024',
    line: 'A custom interior, new lighting and a ceramic coating.',
  },
  {
    id: '5pT7spDdFXU',
    image: '/images/builds/5pT7spDdFXU',
    alt: 'White Maruti Grand Vitara with its doors open after an interior refit',
    title: 'Maruti Grand Vitara car interior',
    line: 'A one-of-one interior with a full leather wrap.',
  },
];

/** The place, told as photo-chapters: three builds from the bay, one large frame at a time. */
export default function Builds() {
  return (
    <section className="section" id="builds" data-moment="photo-chapters" aria-labelledby="builds-h">
      <div className="wrap mo-ph">
        <div className="mo-ph__head">
          <h2 className="t-h2" id="builds-h">
            Recent builds in photos
          </h2>
          <p>
            Every build is filmed for the Car Jewel channel.{' '}
            <a className="link" href={business.youtube} target="_blank" rel="noopener noreferrer" data-track="click_youtube">
              Watch more on YouTube
            </a>
          </p>
        </div>
        <ol className="mo-ph__list">
          {chapters.map((c, i) => (
            <li className="mo-ph__ch" key={c.id}>
              <figure className="mo-ph__pic">
                <img
                  src={`${c.image}-1280.webp`}
                  srcSet={`${c.image}-480.webp 480w, ${c.image}-828.webp 828w, ${c.image}-1280.webp 1280w`}
                  sizes={i === 1 ? '(max-width: 639px) 1280px, (min-width: 1440px) 1200px, 100vw' : '(max-width: 639px) 828px, (min-width: 1440px) 1200px, 100vw'}
                  alt={c.alt}
                  width={1280}
                  height={i === 1 ? 504 : 720}
                  loading="lazy"
                  decoding="async"
                />
              </figure>
              <h3>{c.title}</h3>
              <p>{c.line}</p>
              <a className="link--arrow" href={`https://www.youtube.com/watch?v=${c.id}`} target="_blank" rel="noopener noreferrer" data-track="click_youtube">
                Watch the build <ArrowUpRight aria-hidden="true" />
              </a>
            </li>
          ))}
        </ol>
      </div>
      <MomentMount target="builds" />
    </section>
  );
}
