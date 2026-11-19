import Hero from '@/components/Hero';
import Visit from '@/components/sections/Visit';
import Services from '@/components/sections/Services';
import Builds from '@/components/sections/Builds';
import Reviews from '@/components/sections/Reviews';
import Booking from '@/components/sections/Booking';
import { getReviews } from '@/lib/reviews';

/*
  tasteskill plan (place): hero · visit · services (tall-small) · builds (photo-chapters) · reviews · booking · footer.
  Deal: brand colours from the shopfront, Albert Sans, nav-cards, footer-columns, surface-pairs, arrow buttons,
  the client's own mark, type moment "name" (footer). Full plan: .taste-skill/plan.md
*/
export default async function Home() {
  const reviews = await getReviews();
  return (
    <>
      <Hero />
      <Visit />
      <Services />
      <Builds />
      <Reviews data={reviews} />
      <Booking />
    </>
  );
}
