// The cinematic photo set written by `npm run images` into /images/cine.
// Landscape stills exist at 828 and 1280 px; the owner's portrait store photos at 480 and 708 px.

const WIDE = ['i20', 'xuv700', 'thar', 'vitara', 'showroom'] as const;
const TALL = ['storefront-xuv700', 'storefront-street', 'storefront-sign', 'audio-shelf', 'seat-covers-wall', 'alloy-wheels-wall', 'lighting-shelf', 'care-products'] as const;
export type CineName = (typeof WIDE)[number] | (typeof TALL)[number];

export const CINE_SIZE: Record<CineName, [number, number]> = {
  i20: [1280, 504],
  xuv700: [1280, 720],
  thar: [1190, 263],
  vitara: [1280, 720],
  showroom: [1280, 551],
  'storefront-xuv700': [708, 849],
  'storefront-street': [708, 849],
  'storefront-sign': [708, 658],
  'audio-shelf': [708, 849],
  'seat-covers-wall': [708, 849],
  'alloy-wheels-wall': [708, 849],
  'lighting-shelf': [708, 849],
  'care-products': [708, 849],
};

/** src, srcSet and intrinsic size for one graded photo. */
export function cine(name: CineName) {
  const wide = (WIDE as readonly string[]).includes(name);
  const ws = wide ? [828, 1280] : [480, 708];
  const [width, height] = CINE_SIZE[name];
  return {
    src: `/images/cine/${name}-${ws[1]}.webp`,
    srcSet: ws.map((w) => `/images/cine/${name}-${w}.webp ${w}w`).join(', '),
    width,
    height,
  };
}
