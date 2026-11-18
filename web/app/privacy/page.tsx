import type { Metadata } from 'next';
import { business } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy',
  description: 'How Shine Squad uses the details you share through this website.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <section className="section" aria-labelledby="privacy-h">
      <div className="wrap">
        <p className="eyebrow">Privacy</p>
        <h1 className="h2" id="privacy-h">Your details, in plain words</h1>
        <div className="prose" style={{ marginTop: 32 }}>
          <h2>What we collect</h2>
          <p>When you book a consultation we collect your name, your phone number and, if you choose, the services you&rsquo;re interested in and details about your car.</p>
          <h2>Why we collect it</h2>
          <p>Only to call or message you about your consultation and your car. We don&rsquo;t sell your details, share them with advertisers, or add you to marketing lists.</p>
          <h2>How long we keep it</h2>
          <p>We keep consultation requests for up to 12 months so we can follow up on your car&rsquo;s care, then delete them. Ask us any time and we&rsquo;ll delete your details sooner.</p>
          <h2>Third-party services</h2>
          <p>Reviews and maps come from Google. Build videos play from YouTube only when you press play. Those services have their own privacy policies.</p>
          <h2>Contact</h2>
          <p>Questions or deletion requests: call or WhatsApp us on {business.phoneDisplay}.</p>
        </div>
      </div>
    </section>
  );
}
