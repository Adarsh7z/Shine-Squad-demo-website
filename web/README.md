# Shine Squad: website

The website for **Shine Squad** (a unit of Car Jewel): car protection, detailing and accessories on Minister Road, Secunderabad.

Built with Next.js 15 (App Router) + TypeScript, plain CSS design tokens (`app/globals.css`) and Motion for small UI transitions. All business facts live in **one file: `lib/site.ts`**.

## Run it locally

```bash
cd web
npm install
npm run dev          # http://localhost:3100
```

Production build:

```bash
npm run build && npm start   # http://localhost:3100
```

## What's on the site

| Page | What it does |
|---|---|
| `/` | Hero + **Free Car Consultation** booking bar, proof strip, services, the "What actually sits on your paint" layer story with a live water-beading demo, recent builds (Car Jewel YouTube videos that play in place), accessories showroom, how a visit works, **clickable Google reviews**, visit/hours/map, FAQ, final CTA |
| `/services/[slug]` | 12 service pages (ceramic, PPF, Teflon, wraps, tint, audio, seat covers, lighting, alloys, detail spa, electrical, maintenance), each with its own SEO title, schema and consultation form |
| `/contact` | Long-form consultation + visit block |
| `/privacy` | Plain-language privacy note |
| `/api/lead` | Receives consultation requests (validated, honeypot + timing spam checks, rate-limited) |

## Environment variables

Copy `.env.example` to `.env.local` (or add them in Vercel → Project → Settings → Environment Variables).

| Variable | Needed for | How to get it |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs, sitemap, share previews | The live domain, e.g. `https://shinesquad.in` |
| `GOOGLE_PLACE_ID` | Live reviews, the "Write a review" link, directions pin | Search "Shine Squad Minister Road" in Google's **Place ID Finder** (developers.google.com/maps/documentation/places/web-service/place-id). Starts with `ChIJ…` |
| `GOOGLE_MAPS_API_KEY` | Live Google rating + reviews (refreshed daily) | Google Cloud Console → enable **Places API (New)** → create an API key → restrict it to Places API |
| `RESEND_API_KEY`, `LEAD_TO_EMAIL`, `LEAD_FROM_EMAIL` | Emailing each booking to the owner | resend.com → API key; verify the sending domain for `LEAD_FROM_EMAIL` |
| `LEAD_SHEET_WEBHOOK` | Logging each booking in a Google Sheet | See "Leads sheet" below |

**Without these keys the site still works:** reviews fall back to the real reviews saved in `lib/reviews.ts`, and bookings are accepted and written to the server log. Add at least one lead channel (email or sheet) **before launch** so no booking is missed.

### Leads sheet (Google Apps Script)

1. Create a Google Sheet with the headers: `When | Name | Phone | Services | Car | Message | Page | Source`.
2. Extensions → Apps Script, paste:

```js
function doPost(e) {
  const d = JSON.parse(e.postData.contents);
  SpreadsheetApp.getActiveSheet().appendRow([d.when, d.name, d.phone, d.services, d.car, d.message, d.page, d.source]);
  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
}
```

3. Deploy → New deployment → Web app → Execute as **Me**, access **Anyone** → copy the URL into `LEAD_SHEET_WEBHOOK`.

## Deploy (Vercel)

1. Push this folder to a GitHub repo, then import it in Vercel with the **root directory set to `web`**.
2. Add the environment variables above, then deploy.
3. Point the domain at Vercel.
4. In the **Google Business Profile**, set the website to `https://<domain>/?utm_source=google&utm_medium=gbp`, and add the link to the Instagram and YouTube bios.

## Editing content

- **Phone, address, hours, services, builds, FAQs:** `lib/site.ts`
- **Fallback Google reviews:** `lib/reviews.ts` (copy new reviews unedited from Google; each `id` is the review id from Maps, which makes the card open that exact review)
- **Photos:** drop new files in `../assets/photos`, then run `npm run images` (it applies the same colour grade to every photo and rebuilds the share image)

## Quality bar (measured with Lighthouse 12 on the production build)

| | Performance | Accessibility | Best practices | SEO |
|---|---|---|---|---|
| Desktop | 100 | 100 | 100 | 100 |
| Mobile (throttled slow 4G) | 91 | 100 | 100 | 100 |

## Credits

Photos: the owner's own store photos. Build thumbnails and videos: the Car Jewel YouTube channel (@CarJewelHyd). Fonts: Archivo (subset, OFL), Geist and Geist Mono (OFL).
