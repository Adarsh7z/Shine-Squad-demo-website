import { NextResponse } from 'next/server';
import { z } from 'zod';

export const runtime = 'nodejs';

const Lead = z.object({
  name: z.string().trim().min(2).max(60),
  phone: z.string().regex(/^[6-9]\d{9}$/),
  services: z.array(z.string().max(40)).max(8).default([]),
  company: z.string().max(0).optional().default(''), // honeypot must be empty
  elapsed: z.number().min(2000), // humans take more than 2 seconds
  page: z.string().max(300).optional().default(''),
  source: z.string().max(40).optional().default('site'),
  car: z.string().max(80).optional(),
  message: z.string().max(1000).optional(),
});

// Simple in-memory rate limit (per server instance): 5 leads per IP per hour.
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 3_600_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'bad_json' }, { status: 400 });
  }
  const parsed = Lead.safeParse(body);
  if (!parsed.success) {
    // Bots (honeypot / too fast) get a silent success so they don't retry.
    const b = body as { company?: string; elapsed?: number };
    if ((b?.company && b.company.length > 0) || (typeof b?.elapsed === 'number' && b.elapsed < 2000)) {
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ ok: false, error: 'invalid' }, { status: 422 });
  }
  if (limited(ip)) return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 });

  const lead = parsed.data;
  const when = new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' }).format(new Date());
  const phone = `+91${lead.phone}`;
  const services = lead.services.join(', ') || 'Not specified';

  const deliveries: Promise<boolean>[] = [];

  // 1) Email to the owner via Resend
  if (process.env.RESEND_API_KEY && process.env.LEAD_TO_EMAIL) {
    const wa = `https://wa.me/91${lead.phone}?text=${encodeURIComponent(`Hi ${lead.name}, this is Shine Squad about your consultation request.`)}`;
    deliveries.push(
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: process.env.LEAD_FROM_EMAIL || 'Shine Squad Website <onboarding@resend.dev>',
          to: [process.env.LEAD_TO_EMAIL],
          subject: `New consultation: ${lead.name} · ${phone}`,
          html: `<div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.6">
            <h2 style="margin:0 0 12px">New free consultation request</h2>
            <p><b>Name:</b> ${esc(lead.name)}<br/><b>Phone:</b> <a href="tel:${phone}">${phone}</a><br/><b>Interested in:</b> ${esc(services)}${lead.car ? `<br/><b>Car:</b> ${esc(lead.car)}` : ''}${lead.message ? `<br/><b>Message:</b> ${esc(lead.message)}` : ''}<br/><b>Received:</b> ${when} IST<br/><b>Page:</b> ${esc(lead.page)}</p>
            <p><a href="tel:${phone}" style="background:#FFC21A;color:#0A0A0B;padding:10px 16px;border-radius:6px;text-decoration:none;font-weight:600">Call now</a>
            &nbsp; <a href="${wa}" style="background:#25D366;color:#fff;padding:10px 16px;border-radius:6px;text-decoration:none;font-weight:600">WhatsApp</a></p></div>`,
        }),
      }).then((r) => r.ok).catch(() => false)
    );
  }

  // 2) Append a row to the Google Sheet (Apps Script web app)
  if (process.env.LEAD_SHEET_WEBHOOK) {
    deliveries.push(
      fetch(process.env.LEAD_SHEET_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ when, name: lead.name, phone, services, car: lead.car ?? '', message: lead.message ?? '', page: lead.page, source: lead.source }),
      }).then((r) => r.ok).catch(() => false)
    );
  }

  if (deliveries.length === 0) {
    // Not configured yet (local development). Log so the lead is visible in server logs.
    console.info('[lead] (no delivery configured)', { when, ...lead, phone });
    return NextResponse.json({ ok: true, delivered: 0 });
  }

  const results = await Promise.all(deliveries);
  const delivered = results.filter(Boolean).length;
  if (delivered === 0) {
    console.error('[lead] delivery failed', { when, name: lead.name, phone });
    return NextResponse.json({ ok: false, error: 'delivery_failed' }, { status: 502 });
  }
  return NextResponse.json({ ok: true, delivered });
}
