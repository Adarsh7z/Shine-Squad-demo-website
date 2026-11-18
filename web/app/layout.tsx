import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import TopBar from '@/components/TopBar';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';
import ClientEffects from '@/components/ClientEffects';
import { SITE_URL, business, fullAddress, links } from '@/lib/site';

// Archivo, instanced at width 125 (Expanded) with weights 700–800 and subset to Latin: ~19 KB instead of ~88 KB.
const archivo = localFont({
  src: './fonts/archivo-expanded.woff2',
  weight: '700 800',
  style: 'normal',
  variable: '--f-archivo',
  display: 'swap',
  declarations: [{ prop: 'font-stretch', value: '125%' }],
  fallback: ['Arial Black', 'Arial', 'sans-serif'],
});
const geist = Geist({ subsets: ['latin'], variable: '--f-geist', display: 'optional' });
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--f-geist-mono', display: 'swap', preload: false });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Ceramic Coating, PPF & Car Accessories in Secunderabad | Shine Squad',
    template: '%s | Shine Squad',
  },
  description:
    'Ceramic, graphene & PPF protection, wraps, tints, audio, lighting and seat covers on Minister Road, Secunderabad, next to KIMS. Rated 4.8 on Google. Free consultation on WhatsApp.',
  applicationName: 'Shine Squad',
  keywords: ['ceramic coating Secunderabad', 'PPF Hyderabad', 'car accessories Minister Road', 'car seat covers Secunderabad', 'graphene coating Hyderabad', 'car window tinting Secunderabad', 'car audio Secunderabad'],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'Shine Squad',
    title: 'Shine Squad · Ceramic, PPF & car accessories in Secunderabad',
    description: 'Protection, upgrades and restoration for cars that are loved. Minister Road, next to KIMS Hospital.',
  },
  twitter: { card: 'summary_large_image' },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: '#0a0a0b',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': ['AutoRepair', 'AutoPartsStore'],
  '@id': `${SITE_URL}/#business`,
  name: business.name,
  slogan: business.tagline,
  url: SITE_URL,
  image: `${SITE_URL}/opengraph-image.jpg`,
  telephone: business.phoneE164,
  priceRange: '₹₹',
  address: {
    '@type': 'PostalAddress',
    streetAddress: `${business.address.line1}, ${business.address.line2}`,
    addressLocality: business.address.city,
    addressRegion: business.address.region,
    postalCode: business.address.postal,
    addressCountry: business.address.country,
  },
  geo: { '@type': 'GeoCoordinates', latitude: business.geo.lat, longitude: business.geo.lng },
  hasMap: links.maps,
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '10:00',
      closes: '22:00',
    },
  ],
  paymentAccepted: 'Cash, UPI, Net Banking, Credit Card, Debit Card',
  currenciesAccepted: 'INR',
  areaServed: ['Secunderabad', 'Hyderabad'],
  parentOrganization: { '@type': 'Organization', name: 'Car Jewel', foundingDate: '2002' },
  sameAs: [links.maps, business.youtube, business.instagram].filter(Boolean),
  description: `Car protection, detailing and accessories at ${fullAddress}.`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" suppressHydrationWarning className={`${archivo.variable} ${geist.variable} ${geistMono.variable}`}>
      <head>
        {/* Mark JS early so entrance states apply before first paint; fall back to visible after 1.2s. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('js');(function(){function go(){var h=document.querySelector('.hero[data-enter]');if(h)requestAnimationFrame(function(){requestAnimationFrame(function(){h.classList.add('is-entered')})})}if(document.readyState!=='loading')go();else document.addEventListener('DOMContentLoaded',go)})();",
          }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <TopBar />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <FloatingActions />
        <ClientEffects />
      </body>
    </html>
  );
}
