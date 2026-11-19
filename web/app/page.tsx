import { Approach, Builds, Dull, Hero, Manifesto, Services, Statement, Steps } from '@/components/home/Sections';
import Reviews from '@/components/sections/Reviews';
import Visit from '@/components/sections/Visit';
import Booking from '@/components/sections/Booking';
import { getReviews } from '@/lib/reviews';

/*
  A cinematic, scroll-driven home page (GSAP + ScrollTrigger + SplitText, Lenis smooth scroll; components/Motion.tsx):
  hero · statement with a photo trail · approach · three pinned steps · manifesto · pinned services ·
  "Dull / Ends Here" · previous builds · reviews · visit + map · booking (WhatsApp) · finale (footer).
*/
export default async function Home() {
  const reviews = await getReviews();
  return (
    <>
      <Hero />
      <Statement />
      <Approach />
      <Steps />
      <Manifesto />
      <Services />
      <Dull />
      <Builds />
      <Reviews data={reviews} />
      <Visit />
      <Booking />
    </>
  );
}
