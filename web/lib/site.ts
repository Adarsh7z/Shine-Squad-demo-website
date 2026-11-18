// Single source of truth for every business fact on the site.
// Verified against the Google Business listing and the Car Jewel YouTube channel (Nov 2026).

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://shinesquad.in';

export const business = {
  name: 'Shine Squad',
  tagline: 'Shines and Smiles, for miles!',
  telugu: 'షైన్ స్క్వాడ్',
  parent: 'Car Jewel',
  parentLine: 'The Art of Car Decor',
  parentSince: 2002,
  phoneDisplay: '+91 70131 46997',
  phoneE164: '+917013146997',
  whatsapp: '917013146997',
  address: {
    line1: '1-8-32/70, Plot No. 70, Bapu Bagh Colony',
    line2: 'Minister Road, Ramgopalpet',
    city: 'Secunderabad',
    region: 'Telangana',
    postal: '500003',
    country: 'IN',
  },
  landmark: 'Next to KIMS Hospital, Minister Road',
  plusCode: 'CFQJ+9C Hyderabad',
  geo: { lat: 17.4383964, lng: 78.4811216 },
  rating: { value: 4.8, count: 59 }, // fallback only; live values come from Google
  payments: ['UPI', 'Visa', 'Mastercard', 'RuPay', 'Net Banking', 'Cash'],
  wheelchairAccessible: true,
  youtube: 'https://www.youtube.com/@CarJewelHyd',
  instagram: '', // TODO(owner): add the Instagram profile URL
};

export const placeId = process.env.GOOGLE_PLACE_ID || '';

export const links = {
  tel: `tel:${business.phoneE164}`,
  maps: 'https://maps.google.com/?cid=12549756595992715525',
  reviews: placeId
    ? `https://search.google.com/local/reviews?placeid=${placeId}`
    : 'https://maps.google.com/?cid=12549756595992715525',
  writeReview: placeId
    ? `https://search.google.com/local/writereview?placeid=${placeId}`
    : 'https://maps.google.com/?cid=12549756595992715525',
  directions: `https://www.google.com/maps/dir/?api=1&destination=${17.4383964},${78.4811216}${placeId ? `&destination_place_id=${placeId}` : ''}`,
  // Owner-supplied Google Maps embed (place: Shine Squad, Minister Road)
  mapEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4272.338152825811!2d78.4811216!3d17.4383964!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9b72ff569bc9%3A0xae29b121f1c2e105!2sShine%20Squad!5e1!3m2!1sen!2sin!4v1795010350540!5m2!1sen!2sin',
};

export function whatsappLink(text?: string) {
  const base = `https://wa.me/${business.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export const fullAddress = `${business.address.line1}, ${business.address.line2}, ${business.address.city}, ${business.address.region} ${business.address.postal}`;

// 0 = Sunday ... 6 = Saturday. Times in 24h, Asia/Kolkata.
export const hours: Record<number, { open: string; close: string } | null> = {
  0: null,
  1: { open: '10:00', close: '22:00' },
  2: { open: '10:00', close: '22:00' },
  3: { open: '10:00', close: '22:00' },
  4: { open: '10:00', close: '22:00' },
  5: { open: '10:00', close: '22:00' },
  6: { open: '10:00', close: '22:00' },
};
export const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export type ServiceGroup = 'protection' | 'upgrades' | 'restoration';

export type Service = {
  slug: string;
  group: ServiceGroup;
  name: string;
  short: string;
  glyph: string;
  intro: string;
  includes: string[];
  why: { title: string; body: string }[];
  faqs: { q: string; a: string }[];
  keywords: string[];
};

export const groups: Record<ServiceGroup, { title: string; line: string; image: string; alt: string }> = {
  protection: {
    title: 'Protection',
    line: 'Coatings and film that keep the paint looking new for years.',
    image: '/images/builds/pQ68arJMB6w.webp',
    alt: 'Silver Mahindra XUV700 under hexagon studio lights in the detailing bay',
  },
  upgrades: {
    title: 'Upgrades',
    line: 'Audio, lighting, seats and wheels, fitted cleanly and wired properly.',
    image: '/images/store/seat-covers-wall.webp',
    alt: 'Wall of seat covers and floor mats in the showroom',
  },
  restoration: {
    title: 'Restoration & care',
    line: 'Deep cleaning, paint and headlight restoration, electrical fixes and servicing.',
    image: '/images/store/care-products.webp',
    alt: 'Shelves of Turtle Wax car-care products in the showroom',
  },
};

export const services: Service[] = [
  {
    slug: 'ceramic-coating',
    group: 'protection',
    name: 'Ceramic, Graphene & Hybrid Coating',
    short: 'Deep gloss and water that rolls straight off.',
    glyph: 'droplet',
    intro:
      'A hard, glass-like layer bonded to your clear coat. Washing gets easier, water beads and rolls off, and the gloss stays deep. Works on new cars and on older paint after correction.',
    includes: ['Foam wash and decontamination', 'Paint inspection under studio lights', 'Machine polish or paint correction where needed', 'Coating applied panel by panel and cured', 'Aftercare guide for the first weeks'],
    why: [
      { title: 'Gloss you can see', body: 'The coating fills the microscopic texture of the clear coat, so reflections look sharper.' },
      { title: 'Easier washing', body: 'Dust and grime stick less. A normal wash brings the shine back.' },
      { title: 'Graphene option', body: 'Graphene-infused coatings are slicker and show fewer water spots, which helps in hard-water areas.' },
    ],
    faqs: [
      { q: 'Will a coating hide scratches?', a: 'No coating hides scratches by itself. We correct the paint first, then coat it, so the finish you lock in is the best version of your paint.' },
      { q: 'Can it go on any colour?', a: 'Yes. Ceramic and graphene coatings are clear and work on every paint colour, gloss or matte (matte has its own coating).' },
      { q: 'How do I wash the car afterwards?', a: 'Use a pH-neutral shampoo and a clean microfibre mitt, avoid automatic brush washes, and dry with a soft towel. We hand you a printed care guide.' },
    ],
    keywords: ['ceramic coating Secunderabad', 'graphene coating Hyderabad'],
  },
  {
    slug: 'paint-protection-film',
    group: 'protection',
    name: 'Paint Protection Film (PPF)',
    short: 'Clear or matte film that takes the stone chips for you.',
    glyph: 'shield',
    intro:
      'A tough, clear urethane film over the paint that soaks up stone chips, key marks and light scratches. Light marks heal with heat. Choose full body, the front end only, or a matte or black finish for a new look.',
    includes: ['Full wash and clay decontamination', 'Panel-by-panel film fitting with wrapped edges', 'Gloss, matte or coloured film options', 'Front-only, partial or full-body packages', 'Post-install inspection and care guide'],
    why: [
      { title: 'Real impact protection', body: 'Coatings fight dirt; film fights stones. On Hyderabad highways the bonnet and bumper take the most hits.' },
      { title: 'Change the look', body: 'Matte or half-black film transforms a car while protecting it, and it comes off without harming the paint.' },
      { title: 'Self-healing surface', body: 'Fine swirls and light marks disappear with warmth from the sun or warm water.' },
    ],
    faqs: [
      { q: 'Can I protect only the front?', a: 'Yes. A front package covers the bumper, bonnet, fenders and mirrors, which take most stone chips.' },
      { q: 'Does PPF work on bikes?', a: 'Yes. We fit PPF on motorcycles too, from tanks to full fairings.' },
      { q: 'Can I coat over PPF?', a: 'Yes, and it is a popular combination: film for impact, coating on top for gloss and easy washing.' },
    ],
    keywords: ['PPF Hyderabad', 'paint protection film Secunderabad'],
  },
  {
    slug: 'teflon-coating',
    group: 'protection',
    name: 'Teflon Coating & Polishing',
    short: 'A fresh gloss and a protective polymer layer.',
    glyph: 'sparkle',
    intro: 'Machine polishing to lift dullness and light swirls, sealed with a polymer (Teflon) coat. A good, affordable way to refresh the paint and protect the clear coat.',
    includes: ['Wash and surface prep', 'Machine polish', 'Polymer coat application', 'Final wipe-down and inspection'],
    why: [
      { title: 'Quick refresh', body: 'Brings back shine on paint that has gone flat in the sun.' },
      { title: 'A step up later', body: 'Many owners start with Teflon and move to ceramic or PPF.' },
    ],
    faqs: [{ q: 'Teflon or ceramic?', a: 'Teflon is a polish-and-seal refresh. Ceramic is a much harder, longer-lasting layer. Come in and we will show you both on a test panel.' }],
    keywords: ['teflon coating Secunderabad'],
  },
  {
    slug: 'car-wrapping',
    group: 'protection',
    name: 'Car Wrapping',
    short: 'A new colour or finish, with the paint safe underneath.',
    glyph: 'roll',
    intro: 'Full or partial vinyl wraps (roofs, mirrors, trims, chrome delete and full colour changes) applied by hand and finished at the edges.',
    includes: ['Colour and finish consultation with samples', 'Panel prep', 'Hand-applied vinyl with tucked edges', 'Final heat-set and inspection'],
    why: [
      { title: 'Try a new look', body: 'Gloss, satin or matte colours without a permanent repaint.' },
      { title: 'Reversible', body: 'A wrap can be removed later, leaving the original paint underneath.' },
    ],
    faqs: [{ q: 'Can I wrap just the roof?', a: 'Yes. Black roofs, mirrors and chrome deletes are popular small jobs.' }],
    keywords: ['car wrapping Hyderabad'],
  },
  {
    slug: 'window-tinting',
    group: 'protection',
    name: 'Window Tinting & Sun Film',
    short: 'Cooler cabin, less glare, interior protected from UV.',
    glyph: 'sun',
    intro: 'Sun-control films that cut heat and glare and protect your dashboard and seats from UV, in shades you can hold up to the glass before you choose.',
    includes: ['Shade selection with real samples', 'Glass cleaning and prep', 'Precision-cut film installation', 'Curing guidance'],
    why: [
      { title: 'Hyderabad heat', body: 'Heat-rejecting film keeps the cabin cooler and the AC working less.' },
      { title: 'UV protection', body: 'Stops leather and plastics fading and cracking.' },
    ],
    faqs: [{ q: 'Which shade is legal?', a: 'We will explain current rules for your car and help you choose a film that complies.' }],
    keywords: ['car window tinting Secunderabad'],
  },
  {
    slug: 'audio-video',
    group: 'upgrades',
    name: 'Audio & Infotainment',
    short: 'Speakers, amps and Android screens with 360° cameras.',
    glyph: 'speaker',
    intro: 'Speakers, subwoofers, amplifiers, Android head units, 360° cameras and ambient lighting, chosen to suit your car and fitted with clean wiring. Our Car Jewel team was the first in AP and Telangana to install the Pioneer DMH-AP6650BT.',
    includes: ['Listening demo in the showroom', 'Head units, Android systems and 360° cameras', 'Speakers, subwoofers and amplifiers', 'Clean wiring and factory-style finish'],
    why: [
      { title: 'Brands on our shelves', body: 'JBL, JL Audio, Pioneer and Moco, all in stock to see and hear.' },
      { title: 'Base to top', body: 'Turn a base variant into a top-end cabin: screen, cameras, ambient light and sound.' },
    ],
    faqs: [{ q: 'Will it affect my steering controls?', a: 'We use the right adaptors so steering controls, cameras and car settings keep working.' }],
    keywords: ['car audio installation Secunderabad', 'android system car Hyderabad'],
  },
  {
    slug: 'seat-covers-mats',
    group: 'upgrades',
    name: 'Seat Covers & Floor Mats',
    short: 'Touch every grade before you choose it.',
    glyph: 'seat',
    intro: 'Custom-fit seat covers and floor mats in several grades of leatherette and fabric, from the Top Gear range on our showroom wall. Feel the materials, see the stitching, then choose.',
    includes: ['Material and colour samples in hand', 'Custom fit for your model', 'Matching floor mats and 7D mats', 'Steering wraps and accessories'],
    why: [
      { title: 'See it on the wall', body: 'Full display seats show exactly how each design looks fitted.' },
      { title: 'Made for your model', body: 'Covers are cut to your seat shape, airbag-safe and snug.' },
    ],
    faqs: [{ q: 'Can I see the materials first?', a: 'Yes. That is what we are known for: our team walks you through real samples so you choose with your hands, not from a catalogue.' }],
    keywords: ['car seat covers Secunderabad', 'car floor mats Hyderabad'],
  },
  {
    slug: 'lighting-upgrades',
    group: 'upgrades',
    name: 'LED & Lighting Upgrades',
    short: 'Brighter headlights, projectors, DRLs and ambient light.',
    glyph: 'lamp',
    intro: 'LED and projector headlamps, fog lamps, auxiliary lights, tail-lamp upgrades and ambient interior lighting, fitted and aimed properly.',
    includes: ['LED and projector headlamps', 'Fog and auxiliary lamps', 'Tail lamps and DRLs', 'Ambient interior lighting'],
    why: [
      { title: 'See and be seen', body: 'Better night visibility without blinding oncoming drivers.' },
      { title: 'Properly wired', body: 'Correct relays and wiring so nothing flickers or fails.' },
    ],
    faqs: [{ q: 'Do you aim the headlights?', a: 'Yes. Every headlight upgrade is checked and aimed before handover.' }],
    keywords: ['LED headlights Secunderabad'],
  },
  {
    slug: 'alloy-wheels',
    group: 'upgrades',
    name: 'Alloy Wheels',
    short: 'A wall of designs, sized and fitted for your car.',
    glyph: 'wheel',
    intro: 'Choose from a full wall of alloy designs, with the right size and offset for your car, fitted and balanced.',
    includes: ['Design and size consultation', 'Fitment check for your model', 'Fitting and balancing'],
    why: [{ title: 'Choose in person', body: 'See every finish on the wall before you decide.' }],
    faqs: [{ q: 'Will bigger wheels affect the ride?', a: 'We will explain the trade-offs for your car and recommend sizes that keep it comfortable.' }],
    keywords: ['alloy wheels Secunderabad'],
  },
  {
    slug: 'detail-spa-restoration',
    group: 'restoration',
    name: 'Detail Spa & Restoration',
    short: 'A deep clean inside and out, with clear timings.',
    glyph: 'sponge',
    intro: 'Interior and exterior deep cleaning, upholstery and roof-liner care, engine-bay cleaning and surface restoration. We tell you exactly what is included and when it will be ready before we start.',
    includes: ['Exterior foam wash and decontamination', 'Interior vacuum, shampoo and dressing', 'Dashboard and trim restoration', 'Clear time estimate before work starts'],
    why: [
      { title: 'Clear timings', body: 'You get the scope, price and ready time before we start, plus photo updates on WhatsApp.' },
      { title: 'Restore, not just wash', body: 'Faded trims, dull paint and tired interiors brought back properly.' },
    ],
    faqs: [{ q: 'How long does a spa take?', a: 'It depends on the car and the package. We give you an exact ready time when we inspect the car, and send updates while we work.' }],
    keywords: ['car detailing Secunderabad', 'car spa Hyderabad'],
  },
  {
    slug: 'electrical-headlight-repair',
    group: 'restoration',
    name: 'Electrical & Headlight Repair',
    short: 'Fault finding, wiring and headlight restoration.',
    glyph: 'plug',
    intro: 'Electrical troubleshooting, wiring repairs, and headlight repair and restoration for yellowed or failing lamps.',
    includes: ['Electrical fault diagnosis', 'Wiring repair', 'Headlight restoration and repair'],
    why: [{ title: 'Dedicated electrical bench', body: 'Fault finding by people who wire accessories every day.' }],
    faqs: [{ q: 'Can you fix yellow headlights?', a: 'Yes. Headlight restoration removes the yellowing and reseals the lens.' }],
    keywords: ['car electrical repair Secunderabad'],
  },
  {
    slug: 'maintenance',
    group: 'restoration',
    name: 'Routine Maintenance',
    short: 'Oil changes and basic servicing.',
    glyph: 'oil',
    intro: 'Basic servicing including oil and filter changes, handled while your car is in for other work.',
    includes: ['Oil and filter change', 'Basic checks'],
    why: [{ title: 'One visit', body: 'Combine servicing with detailing or an upgrade.' }],
    faqs: [{ q: 'Do you do full servicing?', a: 'We handle routine jobs like oil changes. Ask us about anything more involved.' }],
    keywords: ['car oil change Secunderabad'],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);

// Real builds from the Car Jewel YouTube channel.
export const builds = [
  { id: 'V_D8MGm7nAI', title: 'Porsche Cayenne', work: 'Leather interior, Android system, 360° camera, ambient light' },
  { id: 'cKz-DPvkXNs', title: 'Mercedes-Benz E250', work: 'Hybrid coating, Android with 360° camera, half-black PPF' },
  { id: 'EWiajQ6AL_U', title: 'Mahindra Thar Roxx', work: 'PPF, Bimbra bumper, alloys, auxiliary lights' },
  { id: 'pQ68arJMB6w', title: 'Mahindra XUV700 AX7L', work: 'PPF, ambient light, body kit, interior' },
  { id: 'WFctslPHg6I', title: 'Mercedes ML250 CDI', work: 'Ceramic coating, Android system, 360° camera, K4 ambient light' },
  { id: '5pT7spDdFXU', title: 'Maruti Grand Vitara', work: 'One-of-one interior, leather wrap' },
  { id: 'RbKN732P1GA', title: 'Toyota Hyryder', work: 'Base to top: alloys, audio, K4 lighting' },
  { id: 'eZ5DkD1Q6L8', title: 'Hyundai i20', work: 'Pioneer DMH-AP6650BT audio upgrade' },
  { id: '5TWGPZounhU', title: "Tata Harrier '25 Dark", work: 'Top Gear custom seat covers' },
] as const;

export const faqs = [
  { q: "What's the difference between ceramic, graphene and Teflon coating?", a: 'Teflon is a polymer polish-and-seal that refreshes gloss. Ceramic is a much harder, glass-like layer that bonds to the clear coat and makes washing easy. Graphene is a ceramic with graphene added: slicker, with fewer water spots. We will show you each one on a real panel.' },
  { q: 'Is PPF worth it on a new car, and can I do just the front?', a: 'If you drive on highways or want the paint to stay perfect, yes. PPF is the only option that stops stone chips. A front package (bumper, bonnet, fenders, mirrors) covers the panels that take most hits.' },
  { q: 'Can I see and feel materials before choosing?', a: 'Yes, and customers tell us this is what they like most. Our team walks you through real samples of coatings, films, seat-cover leatherettes and mats so you choose with your hands.' },
  { q: 'How long will my car be with you?', a: 'It depends on the service and the car. When we inspect your car we give you the scope, price and an exact ready time before any work starts, and we send photo updates on WhatsApp while we work.' },
  { q: 'Will a coating hide scratches?', a: 'Not on its own. We correct the paint first to remove swirls and light scratches, then coat it, so you lock in the best version of your paint.' },
  { q: 'Do you work on bikes too?', a: 'Yes. We fit PPF on motorcycles, from tanks to full bodies.' },
  { q: 'What payment methods do you accept?', a: 'Cash, UPI, Net Banking, and Visa, Mastercard and RuPay cards.' },
  { q: 'Are you open on Sundays?', a: 'No. We are open Monday to Saturday, 10 AM to 10 PM. Holiday hours can differ, so call ahead if you are unsure.' },
];
