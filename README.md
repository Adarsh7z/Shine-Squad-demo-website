# Shine Squad: demo website

A premium website for **Shine Squad** (a unit of Car Jewel), a car protection, detailing and accessories showroom on Minister Road, Secunderabad, next to KIMS Hospital.

| Folder / file | What it is |
|---|---|
| [`web/`](web/) | The website: Next.js 15 + TypeScript. Setup, environment keys and deployment: [`web/README.md`](web/README.md) |
| [`assets/`](assets/) | Source photos (owner's store photos) and Car Jewel YouTube build thumbnails |
| [`SHINE-SQUAD-WEBSITE-PROMPT.md`](SHINE-SQUAD-WEBSITE-PROMPT.md) | The full design and build brief |
| [`LAUNCH-CHECKLIST.md`](LAUNCH-CHECKLIST.md) | Items the owner needs to confirm before going live |

## Quick start

```bash
cd web
npm install
npm run dev   # http://localhost:3100
```

## Highlights

- Hero with a **Free Car Consultation** booking bar (name + Indian mobile number), wired to `/api/lead` with spam protection and a WhatsApp follow-up
- **Clickable Google reviews**: every card opens that exact review on Google Maps; live via the Places API when keys are set, with real saved reviews as a fallback
- Scroll-driven "What actually sits on your paint" layer story with a live water-beading demo
- Recent builds from the Car Jewel YouTube channel, playable in place
- 12 SEO service pages, LocalBusiness/FAQ/Service structured data, sitemap and robots
- Lighthouse (production build): desktop 100/100/100/100, mobile 91/100/100/100
