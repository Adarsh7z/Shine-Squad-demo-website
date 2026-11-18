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
          <h2>What happens when you consult us</h2>
          <p>The consultation form doesn&rsquo;t send or store anything on this website. When you tap &ldquo;Consult on WhatsApp&rdquo;, it opens WhatsApp with a message containing the details you typed (your name, phone number and, if you add them, your car and the services you&rsquo;re interested in). Nothing is shared until you press Send in WhatsApp yourself.</p>
          <h2>How we use it</h2>
          <p>Only to reply to you about your car. We don&rsquo;t sell your details, share them with advertisers, or add you to marketing lists.</p>
          <h2>Deleting your details</h2>
          <p>Ask us any time and we&rsquo;ll delete our WhatsApp conversation with you.</p>
          <h2>Third-party services</h2>
          <p>Reviews and maps come from Google. WhatsApp is run by Meta. Build videos play from YouTube only when you press play. Those services have their own privacy policies.</p>
          <h2>Contact</h2>
          <p>Questions or deletion requests: call or WhatsApp us on {business.phoneDisplay}.</p>
        </div>
      </div>
    </section>
  );
}
