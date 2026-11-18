import Hero from '@/components/Hero';
import ProofStrip from '@/components/sections/ProofStrip';
import Services from '@/components/sections/Services';
import Layers from '@/components/sections/Layers';
import Builds from '@/components/sections/Builds';
import Accessories from '@/components/sections/Accessories';
import Process from '@/components/sections/Process';
import Reviews from '@/components/sections/Reviews';
import Visit from '@/components/sections/Visit';
import Faq from '@/components/sections/Faq';
import FinalCta from '@/components/sections/FinalCta';
import { getReviews } from '@/lib/reviews';
import { faqs } from '@/lib/site';

export const revalidate = 86400;

export default async function Home() {
  const reviews = await getReviews();
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
  return (
    <>
      <Hero rating={reviews.rating} count={reviews.count} />
      <ProofStrip rating={reviews.rating} count={reviews.count} />
      <Services />
      <Layers />
      <Builds />
      <Accessories />
      <Process />
      <Reviews data={reviews} />
      <Visit />
      <Faq items={faqs} />
      <FinalCta />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
    </>
  );
}
