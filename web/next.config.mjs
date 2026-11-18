/** @type {import('next').NextConfig} */
// Static export: the whole site is built into plain files in `out/`,
// so it can be hosted on Cloudflare Pages (or any static host) with no server.
const nextConfig = {
  output: 'export',
  images: {
    // Images are pre-sized by `npm run images` (480 / 828 / 1280 px WebP);
    // this loader picks the smallest file that fits each screen.
    loader: 'custom',
    loaderFile: './lib/image-loader.ts',
    deviceSizes: [480, 708, 828, 1280],
    imageSizes: [256],
  },
  poweredByHeader: false,
  experimental: { inlineCss: true },
};
export default nextConfig;
