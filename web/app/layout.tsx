import type { Metadata, Viewport } from 'next';
import { Albert_Sans, Instrument_Serif } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';
import ClientEffects from '@/components/ClientEffects';
import MotionLoader from '@/components/MotionLoader';
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
// Display: Instrument Serif (tall, high-contrast). Text and labels: Albert Sans.
const serif = Instrument_Serif({ subsets: ['latin'], weight: '400', variable: '--f-serif', display: 'swap' });
const albert = Albert_Sans({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--f-albert', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Ceramic Coating, PPF & Car Accessories in Secunderabad | Shine Squad',
    template: '%s | Shine Squad',
  },
  description:
    'Ceramic and graphene coating, PPF, wraps, tints, audio, lighting and seat covers on Minister Road, Secunderabad, next to KIMS. Rated 4.8 on Google. Book a free consultation on WhatsApp.',
  applicationName: 'Shine Squad',
  keywords: ['ceramic coating Secunderabad', 'PPF Hyderabad', 'car accessories Minister Road', 'car seat covers Secunderabad', 'graphene coating Hyderabad', 'car window tinting Secunderabad', 'car audio Secunderabad'],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'Shine Squad',
    title: 'Shine Squad · Ceramic, PPF & car accessories in Secunderabad',
    description: 'Car protection, detailing and accessories on Minister Road, next to KIMS Hospital. Open Monday to Saturday, 10 am to 10 pm.',
  },
  twitter: { card: 'summary_large_image' },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: '#070707',
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
    addressCountry: business.address.country,
  },
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
    <html lang="en-IN" suppressHydrationWarning className={`${archivo.variable} ${serif.variable} ${albert.variable}`}>
      <head>
        {/* Scroll motion runs only with script and without reduced motion; the class is set before first paint so pinned layouts don't jump. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('motion');",
          }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <FloatingActions />
        <ClientEffects />
        <MotionLoader />
      </body>
    </html>
  );
}
