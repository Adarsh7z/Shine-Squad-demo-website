// Grades the owner's store photos so they sit together on the dark UI,
// copies the YouTube build thumbnails, and renders the Open Graph image.
// Usage: npm run images
import sharp from 'sharp';
import { mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const src = path.resolve(root, '..', 'assets');
const out = path.resolve(root, 'public', 'images');

const store = [
  ['01-storefront-xuv700-signboard.webp', 'storefront-xuv700'],
  ['02-storefront-signboard-street.webp', 'storefront-street'],
  ['03-audio-jbl-moco-led-shelf.webp', 'audio-shelf'],
  ['04-seat-covers-mats-topgear-wall.webp', 'seat-covers-wall'],
  ['05-alloy-wheels-wall.webp', 'alloy-wheels-wall'],
  ['06-lighting-tail-lamps-shelf.webp', 'lighting-shelf'],
  ['07-turtle-wax-care-products.webp', 'care-products'],
];

// One consistent grade: a little contrast, -10% saturation, cool shadows.
function grade(img) {
  return img
    .modulate({ saturation: 0.9, brightness: 0.98 })
    .linear(1.08, -8)
    .recomb([
      [1.0, 0.0, 0.0],
      [0.0, 1.0, 0.0],
      [0.0, 0.02, 1.02],
    ]);
}

await mkdir(path.join(out, 'store'), { recursive: true });
await mkdir(path.join(out, 'builds'), { recursive: true });

for (const [file, name] of store) {
  const input = path.join(src, 'photos', file);
  await grade(sharp(input)).webp({ quality: 88 }).toFile(path.join(out, 'store', `${name}.webp`));
  console.log('store', name);
}

const yt = path.join(src, 'youtube');
for (const f of await readdir(yt)) {
  if (!f.endsWith('.jpg')) continue;
  const name = f.replace('.jpg', '');
  await sharp(path.join(yt, f)).resize({ width: 1280, withoutEnlargement: true }).webp({ quality: 82 }).toFile(path.join(out, 'builds', `${name}.webp`));
  console.log('build', name);
}

// Open Graph image: storefront photo on the right, wordmark on black.
const W = 1200, H = 630;
const photo = await grade(sharp(path.join(src, 'photos', store[0][0])))
  .resize({ width: 520, height: 630, fit: 'cover', position: 'top' })
  .toBuffer();
const svg = `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="g" cx="20%" cy="10%" r="80%"><stop offset="0" stop-color="#2a2a30"/><stop offset="1" stop-color="#0a0a0b"/></radialGradient>
    <linearGradient id="fade" x1="0" x2="1"><stop offset="0" stop-color="#0a0a0b" stop-opacity="1"/><stop offset="1" stop-color="#0a0a0b" stop-opacity="0"/></linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <rect x="680" y="0" width="140" height="630" fill="url(#fade)"/>
  <text x="64" y="120" fill="#A6A6AD" font-family="Consolas, monospace" font-size="20" letter-spacing="3">SECUNDERABAD · MINISTER ROAD · NEXT TO KIMS</text>
  <text x="60" y="260" fill="#FFC21A" font-family="Arial Black, Arial, sans-serif" font-weight="900" font-style="italic" font-size="104" letter-spacing="-2">SHINE</text>
  <text x="60" y="370" fill="#FFC21A" font-family="Arial Black, Arial, sans-serif" font-weight="900" font-style="italic" font-size="104" letter-spacing="-2">SQUAD</text>
  <text x="64" y="440" fill="#F3F1EC" font-family="Arial, sans-serif" font-size="30">Ceramic · PPF · Wraps · Audio · Seat covers</text>
  <text x="64" y="560" fill="#F3F1EC" font-family="Arial, sans-serif" font-size="24">★ 4.8 on Google  ·  A unit of Car Jewel, since 2002</text>
</svg>`;
await sharp(Buffer.from(svg))
  .composite([{ input: photo, left: 680, top: 0 }, { input: Buffer.from(`<svg width="${W}" height="${H}"><defs><linearGradient id="f" x1="0" x2="1"><stop offset="0" stop-color="#0a0a0b"/><stop offset="1" stop-color="#0a0a0b" stop-opacity="0"/></linearGradient></defs><rect x="680" width="160" height="630" fill="url(#f)"/></svg>`), left: 0, top: 0 }])
  .jpeg({ quality: 86 })
  .toFile(path.join(root, 'app', 'opengraph-image.jpg'));
console.log('og image');
