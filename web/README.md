# Shine Squad: website

The website for **Shine Squad** (a unit of Car Jewel): car protection, detailing and accessories on Minister Road, Secunderabad.

Built with Next.js 15 (App Router) + TypeScript as a **static export**: `npm run build` produces plain HTML, CSS, JS and images in `out/`, so it runs on Cloudflare Pages (or any static host) with no server. All business facts live in **one file: `lib/site.ts`**.

## Run it locally

```bash
cd web
npm install
npm run dev          # http://localhost:3100
```

Production build (creates `out/`):

```bash
npm run build
npx serve out        # optional: preview the exact files Cloudflare will host
```

## Design

A dark, cinematic, scroll-driven site:

- **Look:** black ground, warm white type, the signboard yellow only on the logo tile and focus rings. Display type Instrument Serif, text Albert Sans. Photos share one dark grade (`npm run images` writes them to `public/images/cine`).
- **Home page scenes:** hero (blurred headline over the i20) · statement with a trail of photos · approach · three pinned steps (Inspect, Craft, Deliver) · manifesto whose words light up · pinned services with image wipes · "Dull / Ends Here" · previous builds · Google reviews · visit + map · WhatsApp booking · finale.
- **Motion:** `components/Motion.tsx` (loaded after the page is interactive by `components/MotionLoader.tsx`) uses GSAP 3.13 with ScrollTrigger and SplitText, and Lenis for smooth scrolling. Pinned scenes snap to their steps.
- **Accessibility:** with `prefers-reduced-motion` nothing animates or pins (the `html.motion` class is never set) and every scene reads complete. Hover effects only apply to real pointers.

## How "Book a free consultation" works (no backend)

The booking form checks the name and the 10-digit Indian mobile number, then opens **WhatsApp** to Shine Squad's number (+91 70131 46997) with this message ready to send:

```
Hi Shine Squad! 👋
I'm Ravi Kumar (Phone: +91 98765 43210).
I'd like a free consultation for my Hyundai Creta 2023.
Interested in: Ceramic, PPF.
Please let me know a good time to visit. Thank you!
(Sent from the Shine Squad website)
```

- Blank details are left out. On a service page, that service is added automatically.
- Phones open the WhatsApp app; computers open WhatsApp Web.
- After tapping, the customer sees a preview of the message, plus a "WhatsApp didn't open? Tap here" fallback.
- The message builder is `buildConsultMessage()` in `components/ConsultForm.tsx`.

## Deploy on Cloudflare Pages

1. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git** → pick `Adarsh7z/Shine-Squad-demo-website`.
2. Fill in:

| Field | Value |
|---|---|
| Production branch | `main` |
| Framework preset | `Next.js (Static HTML Export)` |
| Build command | `npm run build` |
| Build output directory | `out` |
| Root directory (advanced) | `web` |
| Environment variable | `NODE_VERSION` = `22` |

3. **Save and Deploy** (about 2–3 minutes). The site goes live at `https://<project-name>.pages.dev`.
4. Every push to `main` redeploys automatically.

`public/_headers` sets long-lived caching for scripts and images.

### Optional environment variables (Pages → Settings → Variables and Secrets)

| Variable | Effect |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs, sitemap and share previews use the real domain |
| `GOOGLE_MAPS_API_KEY` + `GOOGLE_PLACE_ID` | Rating and reviews are fetched live from Google **at build time**. Without them, the 4 real saved reviews in `lib/reviews.ts` are shown |

To keep live reviews fresh, create a **Deploy Hook** (Pages → Settings → Builds) and call it once a day, for example from a free cron service.

## Phase 2 (optional): also record every lead in a Google Sheet

Keeps WhatsApp **and** logs each enquiry, so no lead is lost even if the customer never presses Send.

1. **Sheet:** new Google Sheet with the headers `Time | Name | Phone | Car | Services | Page`.
2. **Apps Script** (Extensions → Apps Script):

   ```js
   function doPost(e) {
     const d = JSON.parse(e.postData.contents);
     if (d.secret !== 'CHANGE-ME-TO-A-LONG-RANDOM-WORD') return ContentService.createTextOutput('no');
     SpreadsheetApp.getActiveSheet().appendRow([new Date(), d.name, "'" + d.phone, d.car, d.services, d.page]);
     return ContentService.createTextOutput('ok');
   }
   ```

   Deploy → New deployment → **Web app**, execute as **Me**, access **Anyone**. Copy the `/exec` URL.
3. **Cloudflare secrets** (Pages → Settings → Variables and Secrets): `LEAD_SHEET_WEBHOOK` = the `/exec` URL, `LEAD_SECRET` = the same random word.
4. **Pages Function:** add `web/functions/api/lead.js`. Cloudflare runs files in `functions/` as server code automatically, even on a static site.

   ```js
   export async function onRequestPost({ request, env }) {
     const b = await request.json().catch(() => ({}));
     const ok = typeof b.name === 'string' && b.name.trim().length >= 2 && /^[6-9]\d{9}$/.test(b.phone || '') && !b.company;
     if (!ok) return new Response('bad request', { status: 400 });
     await fetch(env.LEAD_SHEET_WEBHOOK, {
       method: 'POST',
       body: JSON.stringify({ secret: env.LEAD_SECRET, name: b.name.trim(), phone: '+91' + b.phone, car: b.car || '', services: (b.services || []).join(', '), page: b.page || '' }),
     });
     return new Response('ok');
   }
   ```

5. **Form:** in `ConsultForm.tsx` `onSubmit`, just before `window.open(...)`, add one line. `sendBeacon` delivers the data in the background, so WhatsApp still opens instantly:

   ```ts
   navigator.sendBeacon('/api/lead', new Blob([JSON.stringify({ name, phone: d, car, services, page: location.pathname })], { type: 'application/json' }));
   ```

6. Push. Test once: a new row should appear in the sheet, and WhatsApp should still open.

## Editing content

- **Phone, address, hours, services, builds, FAQs:** `lib/site.ts`
- **Saved Google reviews:** `lib/reviews.ts` (copy new reviews unedited from Google; each `id` is the Maps review id, which makes the card open that exact review)
- **Photos:** put new files in `../assets/photos`, then run `npm run images`. It applies the same colour grade and writes 480/708 px (store) and 480/828/1280 px (builds) WebP versions; `lib/image-loader.ts` picks the right size per screen.

## Credits

Photos: the owner's own store photos. Build thumbnails and videos: the Car Jewel YouTube channel (@CarJewelHyd). Fonts: Archivo (subset, OFL), Geist and Geist Mono (OFL).
