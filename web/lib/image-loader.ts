// Custom next/image loader for the static export.
// `npm run images` writes each photo at a few fixed widths, e.g.
//   /images/store/audio-shelf-480.webp, /images/store/audio-shelf-708.webp
// Here we return the smallest pre-built file that is at least as wide as requested.

const WIDTHS: Record<string, number[]> = {
  '/images/store/': [480, 708],
  '/images/builds/': [480, 828, 1280],
};

export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }) {
  const folder = Object.keys(WIDTHS).find((f) => src.startsWith(f));
  if (!folder || !src.endsWith('.webp')) return src;
  const sizes = WIDTHS[folder];
  const pick = sizes.find((w) => w >= width) ?? sizes[sizes.length - 1];
  return src.replace(/\.webp$/, `-${pick}.webp`);
}
