# MASTER BUILD PROMPT: Shine Squad website (Secunderabad, Hyderabad)

> Paste everything below this line into the AI builder (Claude Code, Cursor, v0, Lovable, Bolt, etc.).
> Put the folder `assets/photos/` (8 files, supplied with this prompt) in the project root before you start.
> Anything marked **[CONFIRM]** is a placeholder the owner has to check before launch. Never publish a [CONFIRM] value as fact.

---

## 0. Your role and the bar

You are a senior product designer and front-end engineer. You are building the **first website** for **Shine Squad**, a car protection, detailing and accessories showroom on Minister Road, Secunderabad. Today the business has an Instagram page and a Google Business listing. It has no website.

The site has three jobs, in this order:

1. **Turn visitors into booked consultations** (form, call, WhatsApp).
2. **Earn trust in under 10 seconds** (real storefront, real Google rating, real reviews, real showroom).
3. **Rank locally** for ceramic coating, PPF, car accessories and seat covers in Secunderabad and Hyderabad.

The quality bar: it should feel like a premium automotive brand (Porsche Design, a Rolls-Royce bespoke studio, a high-end XPEL or Gtechniq installer) built for a local Hyderabad showroom. Dark, glossy, precise and quiet, and every interaction should feel finished. It must **not** look like a ThemeForest garage template. The reference site below is a template, and our job is to do the same things far better.

Do not cut corners. Build every state of every component (default, hover, focus, active, loading, empty, error, success, disabled). Check every screen at 390, 768, 1024, 1440 and 1920 px wide.

---

## 1. Skills to install and use

Install these skills before writing any code, and read their main files in full:

| Skill | Repo | Use it for |
|---|---|---|
| **Taste Skill** (`design-taste-frontend`) | https://github.com/Leonxlnx/taste-skill.git | Anti-template discipline: copy rules, one idea per section, equal content edges, the hero entrance, the hover/press micro-interaction layer, motion tokens, its finish gate and checker scripts |
| **UI/UX Pro Max** | https://github.com/nextlevelbuilder/ui-ux-pro-max-skill.git | Its priority checklist (accessibility → touch → performance → style → layout → type → animation → forms → navigation), the UX guideline search, and its pre-delivery checklist |
| **Frontend Design** (Anthropic, optional) | the `frontend-design` plugin/skill if your environment offers it | A second opinion on bold, distinctive visual direction |

How to run UI/UX Pro Max for this brief:

```bash
python <skill>/scripts/search.py "automotive car detailing ceramic coating premium dark showroom" --design-system --motion 7 -p "Shine Squad"
python <skill>/scripts/search.py "form validation inline error phone" --domain ux
python <skill>/scripts/search.py "carousel testimonial keyboard swipe" --domain ux
python <skill>/scripts/search.py "<your stack>" --stack nextjs
```

**Conflict rules (read carefully).** The skills are guides. **This brief wins** wherever they disagree:

- **Palette:** UI/UX Pro Max suggests slate and red for automotive. **Ignore that.** Use the brand's own black and signboard yellow (section 4).
- **Contact details:** Taste Skill's house rule 9 (no real phone formats, no house numbers, contacts on `.example`) is for invented demo businesses. This is a **real business**, so show the real phone number and the full address.
- **Testimonials carousel:** Taste Skill bans carousels. The owner explicitly wants the interactive Google-review rail (section 7.8). Build it to the accessible rail spec in this brief: no autoplay by default, with swipe, arrows and keyboard support.
- **Signature moments:** Taste Skill allows 1–2 dealt moments per page on a "place" site. This brief names exactly **three signature moments** (section 6.3). Everything else follows Taste's quiet hover/press layer.
- **FAQ:** an accessible disclosure is allowed (section 7.10). Do not animate `height`. Use the `grid-template-rows: 0fr → 1fr` technique or `<details>` with `interpolate-size` and a fallback.
- **Adopt from Taste Skill without changes:** no stock "fade-up on scroll" for every card, no parallax text, no scroll-jacking, no smooth-scroll libraries, no captions under photos, no emoji icons, no violet/indigo "AI gradient", equal left and right content edges, buttons named as a verb plus an object, and a noun in every heading.

---

## 2. Verified business facts (single source of truth)

These were checked against the live Google Business listing on 18 Nov 2026. Use them exactly as written.

| Field | Value |
|---|---|
| Name | **Shine Squad** |
| Tagline (on the signboard) | **"Shines and Smiles, for miles!"** |
| Telugu name (on the signboard) | షైన్ స్క్వాడ్ |
| Parent / sister brand (on the signboard) | "A unit of **Car Jewel**, The Art of Car Design" **[CONFIRM exact wording and whether to show it]** |
| In-store partner brand (on the signboard) | **Top Gear**, seat covers, "The wow factor of your car" **[CONFIRM relationship]** |
| Google category | Auto restoration service |
| Google rating | **4.8 ★ from 59 reviews** (pull this live, see 7.8; never hard-code it except as a fallback) |
| Address | 1-8-32/70, Plot No. 70, Bapu Bagh Colony, Minister Road, Ramgopalpet, Secunderabad, Telangana 500003 |
| Landmark | Right next to **KIMS Hospital** (Krishna Institute of Medical Sciences), Minister Road |
| Plus code | CFQJ+9C Hyderabad |
| Coordinates | 17.4383964, 78.4811216 |
| Google Maps (canonical link) | https://maps.google.com/?cid=12549756595992715525 |
| Google Maps (owner's share link) | https://maps.app.goo.gl/KNBndSMX6CpzCc9LA |
| Google Place ID | **[GET IT]** from Google's Place ID Finder (developers.google.com/maps/documentation/places/web-service/place-id) by searching "Shine Squad, Minister Road". It starts with `ChIJ…`. Needed for the reviews and write-a-review links |
| "Read all reviews" link | `https://search.google.com/local/reviews?placeid=<PLACE_ID>` (until the Place ID is known, use the cid link above) |
| "Write a review" link | `https://search.google.com/local/writereview?placeid=<PLACE_ID>` |
| Phone / WhatsApp | **+91 70131 46997** → `tel:+917013146997` · `https://wa.me/917013146997` |
| Hours | **Mon–Sat 10:00 AM – 10:00 PM · Sunday closed** (Google shows Sunday closed; the owner's notes say Mon–Sat. Holiday hours can differ) |
| Accessibility | Wheelchair-accessible entrance (listed on Google) |
| Payments | Cash, UPI, Net Banking, Visa, Mastercard, RuPay |
| Instagram | **[CONFIRM handle]** |
| Email | **[CONFIRM]**, or leave it out (phone and WhatsApp are the real channels) |
| Staff named in reviews | "Chandu bhai" and team **[CONFIRM the owner's/manager's name and whether to feature them]** |

**Services (exact scope; do not add services that are not on this list):**

- **Paint protection and exterior coatings:** Ceramic, Graphene and Hybrid coatings · Paint Protection Film (PPF) · Teflon coating and polishing · Car wrapping (vinyl) · Window tinting / sun-control film
- **Accessories and custom upgrades:** Audio-video (stereos, screens, speakers, amplifiers) · Seat covers and floor mats in several material grades · LED headlights, fog lamps and interior lighting · Alloy wheels · Car-care products
- **Wash, restoration and maintenance:** Car restoration and spa (interior + exterior deep clean, surface restoration) · Electrical troubleshooting and headlight repair · Routine maintenance including oil changes

**Brands visible on the showroom shelves** (from the owner's photos): JBL, JL Audio, Moco (LED lights, horns), Turtle Wax, Top Gear seat covers. List them as "Brands on our shelves" in text. Use logos only after the owner confirms they are authorised to show them **[CONFIRM]**.

**What customers praise** (Google, Justdial): ceramic coating results, PPF work, and accessory consultations where the staff **show physical samples and explain material grades**. Make this the brand's core proof point: *"Touch the material before you choose it."*

**Known weakness:** feedback on the basic car wash is mixed. One recent 1★ review complains about a full-day turnaround and a high price for a wash. The site must therefore:
- position washing as part of the **Detail Spa / Restoration** packages, not as a cheap quick wash;
- state **duration and what is included** for every package up front (owner to fill in, [CONFIRM]);
- promise **WhatsApp progress updates** during the job (one positive review praises exactly this).

**Do not invent** client counts ("1k+ clients"), years in business, warranty lengths, prices or durations. If you need a number, use a clearly marked `[CONFIRM]` placeholder and add `data-assumed` to the element.

### ⚠ The reference site is a different company

https://shineupsquadcardetailing.com/ belongs to **"Shineup Squad"** in Gopanpalle, which is a different business. Use it **only** as a pattern reference for the appointment widget and the clickable Google-reviews section. **Never** copy its phone number, address, logo, copy, team names or photos. Its appointment form posts to a template demo's `mail.php`, so its leads are lost. Ours must actually deliver every lead (section 8).

---

## 3. Tech stack

- **Next.js (App Router, latest stable) + TypeScript**, mostly static pages, deployed on **Vercel** (free tier is enough). Static pages give speed. Server route handlers keep the Google API key and lead endpoint private.
- **Tailwind CSS (v4)** with design tokens as CSS variables (section 4). No component library look. Build the components yourself. Radix primitives (Dialog, Select, Accordion) are allowed for accessibility and must be fully restyled.
- **Motion (`motion/react`)** for component transitions. **GSAP + ScrollTrigger** only for the pinned "Protection layers" moment (6.3). Native scrolling only: no Lenis or Locomotive.
- **`next/image`** for every photo (AVIF/WebP, `sizes`, blur placeholders). **`next/font`** for fonts (self-hosted and subset).
- **Lucide** icons (1.5px stroke) for UI. Real brand SVGs for payment methods (UPI, Visa, Mastercard, RuPay) and the Google "G".
- Lint, type-check and Lighthouse CI must pass before launch.

---

## 4. Brand and design system

### 4.1 Concept: "Showroom after dark"

The site should feel like walking into the showroom at night: deep black surfaces, controlled pools of light, glossy reflections, and **signboard yellow** used sparingly, the way the yellow letters glow on the black fascia. The yellow is the only accent. It marks *action* (buttons, the active state, the rating stars, the open-now dot) and nothing decorative.

### 4.2 Colour tokens

Pull these from the real signboard (black fascia, golden-yellow letters).

```css
:root {
  /* surfaces */
  --ink-950: #0A0A0B;   /* page background, "obsidian" */
  --ink-900: #111113;   /* raised section */
  --ink-850: #17171A;   /* card */
  --ink-800: #1F1F23;   /* card hover / input */
  --line:    rgba(255,255,255,.08);   /* hairlines */
  --line-strong: rgba(255,255,255,.16);

  /* text */
  --pearl:   #F3F1EC;   /* primary text, warm white */
  --mist:    #A6A6AD;   /* secondary text (≥ 7:1 on ink-950) */
  --smoke:   #74747C;   /* tertiary / meta only (≥ 4.5:1 on ink-950, check it) */

  /* brand */
  --signal:  #FFC21A;   /* signboard yellow: CTAs, stars, focus */
  --signal-hi: #FFD45C; /* hover */
  --signal-lo: #E0A800; /* pressed */
  --on-signal: #0A0A0B; /* text on yellow (≈ 12:1) */

  /* feedback */
  --ok:   #3DDC97;
  --err:  #FF6B5E;

  /* light "paper" sections (FAQ and Visit may use them for rhythm) */
  --paper: #F4F2EE;  --paper-ink: #111113;  --paper-mist: #55555C;
}
```

Rules:
- Body text is `--pearl` on `--ink-950`. Never put grey text on grey cards below 4.5:1.
- Yellow fills only primary buttons and the final CTA band. Elsewhere yellow is a 1–2 px line, a star, a dot or a focus ring.
- At most **one** light (`--paper`) section between dark ones, for rhythm. Never alternate light and dark on every section.
- The mascot artwork (the cartoon detailer on the signboard) stays in the logo lock-up only. Do not use it as an illustration style.

### 4.3 Typography

| Role | Font (Google Fonts) | Settings |
|---|---|---|
| Display / headings | **Archivo**, variable, width axis at **125 (Expanded)**, weight 700–800 | Echoes the wide, bold signboard letters. Tracking −1% to −2% at large sizes. Never all-caps for long headings |
| Body / UI | **Geist** | 16–18 px body, line-height 1.6, weight 400/500 |
| Labels / specs / meta | **Geist Mono** | 12–13 px, uppercase, tracking +8%. Used for small labels like `CERAMIC · 9H` and `MON–SAT 10–10` |
| Telugu | **Noto Sans Telugu** | Only for the Telugu name in the footer and the Visit section |

Fluid type scale (use `clamp()`):
- Display XL (hero h1): `clamp(2.75rem, 6vw + 1rem, 6.5rem)`, line-height 0.95
- H2: `clamp(2rem, 3.2vw + 1rem, 3.75rem)`, line-height 1.02
- H3: `clamp(1.25rem, 1vw + 1rem, 1.75rem)`
- Body L: 1.125rem · Body: 1rem · Small: 0.875rem · Micro (mono): 0.75rem
- Use `text-wrap: balance` on headings and `text-wrap: pretty` on paragraphs. Keep body measure at 60–70 characters.

### 4.4 Space, grid, shape

- 12-column grid, max content width **1320 px**, side gutters `clamp(20px, 4vw, 56px)`, **equal left and right edges in every section**.
- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160. Section padding is `clamp(96px, 12vh, 160px)` top and bottom.
- Radius: **machined, not bubbly**. 6 px inputs and buttons, 10 px cards, 14 px large media frames, full pill only for chips and status pills.
- Borders: 1 px `--line`. Use shadows only on hover and on floating elements (`0 20px 60px -20px rgba(0,0,0,.6)`).
- **Gloss treatment** (the brand signature): media frames and primary cards get a 1 px inner top highlight (`inset 0 1px 0 rgba(255,255,255,.06)`) and, on hover, a faint diagonal specular highlight (a linear-gradient at 115°, transparent → rgba(255,255,255,.06) → transparent) that **moves 12% with the pointer** (fine pointer only, max 60 fps, rAF-throttled). It is subtle, like light on clear coat. No glow and no neon.

### 4.5 Photography direction

The owner's 8 photos are in `assets/photos/` (real store, real signboard):

| File | Shows | Use |
|---|---|---|
| `01-storefront-xuv700-signboard.webp` | Black XUV700 in front of the lit signboard | **Hero media frame** (portrait) and Open Graph image crop |
| `02-storefront-signboard-street.webp` | Street view of the shop front and signboard | **Visit section** ("this is what you'll see when you arrive") |
| `03-audio-jbl-moco-led-shelf.webp` | JBL/JL Audio speakers, Moco LED and horns | Accessories: Audio & Lighting |
| `04-seat-covers-mats-topgear-wall.webp` | Top Gear seat-cover and floor-mat wall | Accessories: Seats & Mats (the "touch the material" story) |
| `05-alloy-wheels-wall.webp` | Alloy wheel wall | Accessories: Wheels |
| `06-lighting-tail-lamps-shelf.webp` | Tail lamps, DRLs, lighting kits | Accessories: Lighting |
| `07-turtle-wax-care-products.webp` | Turtle Wax care range | Accessories: Care products |
| `00-reference-testimonials-widget.png` | Screenshot of the reference site's review widget | **Design reference only. Never ship it** |

**Important constraints:** these photos are roughly **708 × 850 px portrait**. Never stretch them full-bleed on desktop. Use them in portrait frames (aspect 5:6 or 4:5) at ≤ 560 px rendered width. Apply one consistent grade to all of them: slight contrast lift, −10% saturation, a cool shadow tint, so they sit together on the dark UI. Do this in CSS (`filter`) or pre-process with Sharp. Never add AI-generated car photos and present them as Shine Squad's work.

For the hero background and the before/after moment the site needs **new owner material**. Build the slots now with tasteful fallbacks (section 11 has the shot list):
- Hero loop video slot: `public/media/hero-loop.mp4` (+ `.webm`, poster `.jpg`). Until it exists, the hero uses the dark studio composition in 7.1 with no video.
- Before/after slot: `public/media/before-after/*.jpg`. Until it exists, **hide the section** (feature flag) instead of showing stock photos.

### 4.6 Iconography and imagery rules

- Lucide icons, 20 px in UI and 24 px in cards, stroke `currentColor`. No emoji anywhere.
- Each service gets a **custom monoline glyph** (24 px, 1.5 px stroke, matching Lucide): droplet-on-panel (ceramic), shield-layer (PPF), sun-with-film (tint), roll (wrap), speaker (audio), seat (seat covers), headlamp (lighting), spark-plug (electrical), oil-can (maintenance), sponge-sparkle (spa).

---

## 5. Voice and copy

**Voice:** a confident master craftsman talking to a car owner who loves their car. Plain, specific, local and warm, never salesy. Short sentences. Talk about the car and the outcome, not about "solutions".

**Banned words:** unleash, elevate, next-level, cutting-edge, world-class, one-stop solution, seamless, revolutionary, "your car deserves the best", and any "Lorem".

**Every heading contains a noun. Every button is a verb plus an object** (`Book a consultation`, `Get directions`, `Read on Google`).

**Draft copy** (use it, refine it, keep the facts):

- Hero eyebrow (mono): `SECUNDERABAD · NEXT TO KIMS, MINISTER ROAD`
- Hero h1: **"Ceramic, PPF and custom upgrades for cars that are loved."**
  Alternates: "Protection your paint can feel." / "Shines and smiles, for miles."
- Hero lead: "Ceramic, graphene and PPF protection, wraps, tints, audio, lighting and seat covers, fitted in our Minister Road studio. Come in, touch the materials, and leave with a car that looks new for years."
- Proof line (under the CTA): `★ 4.8 on Google · 59 reviews` (live) · `Mon–Sat, 10 AM – 10 PM`
- Services h2: "Three ways we look after your car"
- Protection-layers h2: "What actually sits on your paint"
- Accessories h2: "Touch it before you choose it"
- Process h2: "How a visit works"
- Reviews eyebrow: `TESTIMONIALS` · h2: **"Hear from our happy customers"** (the owner asked for this line)
- Visit h2: "Find us next to KIMS Hospital"
- Final CTA: **"Bring it in. Drive out shining."**

Copy may use one or two light Telugu/Hyderabadi touches (for example the Telugu name in the footer). Keep the main language English.

---

## 6. Interaction and motion system

### 6.1 Motion tokens

```css
--ease-out: cubic-bezier(.2,.8,.2,1);        /* every UI step */
--ease-enter: cubic-bezier(.22,1,.36,1);     /* entrances settling */
--ease-io: cubic-bezier(.65,0,.35,1);        /* travel (indicators, sliders) */
--t-press: 90ms; --t-out: 120ms; --t-in: 160ms; --t-panel: 220ms; --t-slide: 260ms; --t-image: 600ms;
```

No bounce, no overshoot. Animate only `transform`, `opacity`, `filter` and `clip-path`, never `width`, `height`, `top`, `left` or `margin`.

### 6.2 The micro-interaction layer (every page)

| Element | Rest | Hover (fine pointer only) | Press | Focus-visible |
|---|---|---|---|---|
| **Primary button** (yellow) | `--signal` fill, `--on-signal` text, 48 px tall (56 px for XL), 6 px radius, Geist 500 | fill → `--signal-hi`, lifts 1 px, the arrow icon nudges 3 px right | sinks 1 px, `scale(.985)`, fill `--signal-lo`, 90 ms | 2 px `--signal` ring, 3 px offset, no transition |
| **Secondary button** (ghost) | 1 px `--line-strong` border, pearl text | border → pearl 40%, faint fill `rgba(255,255,255,.04)`, lifts 1 px | as above | as above |
| **Text link** | pearl, 1 px hairline underline at 30% | a full underline draws left→right (160 ms) and leaves to the right on hover-out | none | ring |
| **Card that links** | `--ink-850`, 1 px line | lifts 2 px, border → `--line-strong`, specular sweep (4.4), image inside zooms 1.03 over 600 ms | `scale(.995)` | ring around the whole card |
| **Photo in a link** | grade applied | zoom 1.03 inside its frame (`overflow:hidden`), never darkens | none | |
| **Nav link** | mist | → pearl, with a 1 px underline 6 px below drawing in | | ring |
| **Input** | `--ink-800`, 1 px line, 52 px tall, floating label | border → pearl 30% | | border `--signal`, 3 px soft ring `rgba(255,194,26,.25)`, 140 ms |
| **Chip (selectable)** | outline pill | fill 4% | | ring. **Selected:** yellow 1 px border, a check icon slides in from the left, text pearl |
| **Icon button** (arrows) | 44 × 44 circle, 1 px line | fill 6%, the icon moves 2 px in its direction | scale .96 | ring |

Every hover state also has a matching `:focus-visible` state and works by touch. Touch targets are at least 44 × 44 px with 8 px spacing.

### 6.3 The three signature moments (the "wow"), and only these three

1. **Hero gloss entrance (once, on load, ~1.2 s).** The h1 rises line by line from word masks (700 ms per line, 80 ms stagger). Then the lead, the form card and the proof line fade up 12 px (60 ms stagger). The hero photo settles from `scale(1.05)` to 1. As the photo settles, **one diagonal specular light sweep** passes across the photo frame (a clip-path gradient band, 900 ms, once), like a light bar passing over fresh ceramic. No preloader and no delay before the text is readable.
2. **"What actually sits on your paint": pinned protection-layers story** (desktop ≥ 1024 px; on mobile it becomes a stacked, non-pinned sequence). The section pins for about 2.5 screens (`position: sticky` + GSAP ScrollTrigger scrub). On the left is a cross-section illustration of a car panel built in SVG, with layers stacking from the bottom: **Base paint → Clear coat → Polish / paint correction → Coating (Teflon / Ceramic / Graphene) → PPF**. Each layer slides in and highlights as its copy block on the right becomes active. A progress rail with 5 ticks shows the position. The last frame shows all layers with a comparison table (7.4). Under `prefers-reduced-motion` it becomes a static diagram with all five layers labelled.
3. **Hydrophobic water-beading demo** (inside the Ceramic card or the protection story, desktop only). A small canvas/WebGL-lite panel shows a dark glossy panel where water droplets bead and roll off. The pointer acts like a breeze that pushes droplets. Keep it cheap: under 40 droplets, a 2D canvas, paused when off-screen (IntersectionObserver), paused when the tab is hidden, and a static image under reduced motion or on low-end devices (`navigator.hardwareConcurrency <= 4`).

Everything else is calm. No fade-in-on-scroll for every card, no parallax text, no marquees, no custom cursor and no scroll hijacking. A content block may fade up once (opacity 0→1, 12 px) when it enters the viewport only if it is a section heading. Be disciplined.

### 6.4 Reduced motion and resilience

Under `prefers-reduced-motion: reduce`, turn off the entrance, the sweep, the beading animation and the pinning. Content must be fully readable with JavaScript disabled. All motion must stay at 60 fps on a mid-range Android phone (test with 4× CPU throttling).

---

## 7. Home page: section by section

Page order (each section is one or two screens tall at 1440 × 900):

`Top bar → Nav → 1 Hero + consultation → 2 Proof strip → 3 Services → 4 Protection layers (moment) → 5 Before/after (flag) → 6 Accessories showroom → 7 How a visit works → 8 Google reviews → 9 Visit the studio → 10 FAQ → 11 Final CTA → Footer`

### 7.0 Top utility bar and navigation

- **Top bar** (36 px, `--ink-900`, Geist Mono 12 px, hidden below 768 px): a live **open/closed status** computed in **Asia/Kolkata** time. It shows `● OPEN NOW · CLOSES 10 PM` (green dot) or `● CLOSED · OPENS MON 10 AM` (smoke dot), then the phone number and a "Directions" link. Hours come from one config object so they are never hard-coded twice.
- **Nav** (72 px, sticky). Transparent over the hero. After 24 px of scroll it becomes `rgba(10,10,11,.72)` with `backdrop-filter: blur(16px) saturate(140%)` and a hairline bottom border (220 ms). Left: the wordmark (built from the signboard style: wide italic yellow "SHINE SQUAD" with the mascot mark; **ask the owner for the vector logo [CONFIRM]**; until then use typeset Archivo Expanded 800 italic in `--signal`). Centre: `Services ▾ · Accessories · Reviews · Visit · FAQ`. Right: phone icon button (tooltip with the number) and a primary button **"Book a consultation"**.
- **Services mega-menu** (desktop): opens after 120 ms of hover intent or on click/Enter. It is a panel with three columns (Protection, Upgrades, Restoration), each service shown with its glyph, name and a one-line benefit. On the right sits a small card: "Not sure what you need? Free consultation →". It fades in with a 6 px drop over 220 ms, closes on Esc or outside click, and traps focus correctly.
- **Mobile:** a hamburger opens a full-screen sheet (slides down, 260 ms) with large links, the hours, and Call / WhatsApp buttons. Body scroll is locked. The first link gets focus.
- **Mobile sticky action bar** (below 768 px, fixed at the bottom, safe-area padding): four equal buttons, **Call · WhatsApp · Book · Directions**, each with an icon and a label, 56 px tall, glass background. It hides while the on-page booking form is in view so it doesn't cover the form.
- **Desktop WhatsApp pill:** bottom-right, 48 px, appears after the hero has scrolled out of view, label "Chat on WhatsApp" that expands on hover. Never show it on top of the mobile bar.

### 7.1 Hero + "Make an Appointment Or Call Us" (owner's required feature)

**Layout, desktop (≥ 1024):** min-height `100svh`. Left column (6/12): eyebrow, h1, lead, and a row with the primary button **"Book a consultation"** (scrolls to and focuses the form) plus a ghost button **"Call +91 70131 46997"**. Under that row sits the proof line: Google "G" + ★ 4.8 + "59 reviews", which links to the Google reviews, with a mono line `MON–SAT · 10 AM – 10 PM`.
Right column (6/12): the **storefront photo** (`01-storefront…`) in a tall 5:6 frame with 14 px radius. The **consultation card** overlaps the photo's lower-left corner by about 64 px, which creates depth. Behind everything, a soft radial light pool (`radial-gradient` of warm white at 6% opacity) sits top-right, as if under a studio light.

**Layout, mobile:** eyebrow → h1 → lead → storefront photo (4:5, full width) → consultation card → proof line. The card is never hidden on mobile.

**The consultation card** (it mirrors the reference site's widget, done properly):
- Header: small mono label `MAKE AN APPOINTMENT OR CALL US`, then the phone number large (Archivo 28 px) as a `tel:` link with the subline "Mon–Sat, 10 AM – 10 PM".
- Divider, then the h3 **"Free Car Consultation"** with the subline "Tell us about your car. We'll call you back to fix a time."
- Fields:
  1. **Your name** (floating label, `autocomplete="name"`, required, 2–60 characters)
  2. **Your phone number**: a fixed `+91` prefix segment plus 10 digits, `inputmode="tel"`, `autocomplete="tel-national"`. Validate with `/^[6-9]\d{9}$/` after stripping spaces. Auto-format as `70131 46997` while typing.
  3. *(optional, one row of chips)* **What's it for?** Ceramic · PPF · Tint/Wrap · Accessories · Restoration · Not sure. Multi-select; defaults to none.
- Button: full-width primary **"Book Appointment"**.
- Micro-copy under the button (12 px, mist): "No spam. We only call about your car." with a link to the privacy note.
- **States:**
  - *Invalid:* the error shows inline under the field (`--err`, icon plus text, for example "Enter a 10-digit mobile number") on blur and on submit. Focus moves to the first invalid field. `aria-invalid` and `aria-describedby` are wired.
  - *Submitting:* the button keeps its width, the label becomes a 16 px spinner plus "Booking…", and the inputs are disabled.
  - *Success:* the card content cross-fades (220 ms) to a check mark that draws itself (SVG stroke, 500 ms), the heading **"Got it, {first name}."**, the line "We'll call you on {number} shortly during working hours." **[CONFIRM the response-time promise]**, and a secondary button **"Continue on WhatsApp"** that opens `https://wa.me/917013146997?text=` with a pre-filled, URL-encoded message: `Hi Shine Squad, I'm {name}. I'd like a free consultation for {services}.`
  - *Error (network or server):* "Couldn't send that, sorry. Call us or message us on WhatsApp and we'll book you in straight away." with both buttons. The typed values are kept.
- Spam protection: a hidden honeypot field, a minimum 2-second time-to-submit check, and server-side rate limiting (5 per IP per hour). No CAPTCHA.

### 7.2 Proof strip

A slim band (`--ink-900`, hairlines top and bottom), 4 items on desktop, scrollable 2 × 2 on mobile, each a mono label over a pearl value:
`GOOGLE RATING ★ 4.8 (59)` · `OPEN MON–SAT 10–10` · `NEXT TO KIMS, MINISTER ROAD` · `CERAMIC · GRAPHENE · PPF`.
No invented counters. If the owner confirms years in business or cars served, add one item **[CONFIRM]**.

### 7.3 Services: "Three ways we look after your car"

Three large linked cards in a row (desktop), stacked on mobile. Each has a portrait photo or panel, a glyph, a title, a 2-line description, 4–6 service links, and an arrow link to the service page.

1. **Protection:** Ceramic, Graphene and Hybrid coatings · PPF · Teflon coating · Wraps · Window tint
2. **Upgrades:** Audio & video · Seat covers & mats · LED & lighting · Alloy wheels
3. **Restoration & care:** Detail Spa (interior + exterior) · Paint restoration · Electrical & headlight repair · Routine maintenance & oil change

Card hover follows 6.2 (lift, specular sweep, photo zoom). The individual service links inside a card each get their own underline-draw hover.

### 7.4 Signature moment: "What actually sits on your paint"

Built as described in 6.3 #2. The copy blocks explain each layer in two plain sentences. The final frame shows a **comparison table** (on mobile, swipeable cards with headers kept visible):

| | Teflon | Ceramic | Graphene | PPF |
|---|---|---|---|---|
| What it is | Polymer polish coat | Hard glass-like (SiO₂) coat | Ceramic with graphene, slicker & less water-spotting | Clear urethane film |
| Best for | A quick gloss boost | Gloss + easy washing | Max gloss & water behaviour | Stone-chip & scratch defence |
| Scratch / chip protection | Low | Low–medium (swirls) | Low–medium | **High** (self-heals light marks) |
| Typical life | **[CONFIRM]** | **[CONFIRM]** | **[CONFIRM]** | **[CONFIRM]** |
| Starting price | **[CONFIRM]** | **[CONFIRM]** | **[CONFIRM]** | **[CONFIRM]** |

Below the table is the CTA **"Not sure which one? Book a free consultation"**. Add the beading demo (6.3 #3) as a framed panel next to the Ceramic/Graphene step.

### 7.5 Before / after (behind a feature flag until photos exist)

An accessible comparison slider: a draggable handle with a 44 px knob and a hairline. It works with keyboard (←/→ moves 5%, Home/End) and has `role="slider"` with `aria-valuenow`. The labels `BEFORE` and `AFTER` sit in mono chips. There are 3–4 pairs (paint correction, headlight restoration, interior spa, ceramic gloss) switched by a small segmented control. Hide the whole section until real pairs are supplied.

### 7.6 Accessories showroom: "Touch it before you choose it"

The intro paragraph tells the sample story: *staff walk you through real material samples (leatherette grades, mat textures, speaker sizes, film shades) so you choose with your hands, not from a catalogue.*

Layout (desktop): an **editorial asymmetric grid** of the five showroom photos (03–07). One tall (seat covers), two medium, two small. Each tile is a linked card with a mono category label (`SEATS & MATS`, `AUDIO`, `WHEELS`, `LIGHTING`, `CARE`), a one-line description, and an arrow. Hover: photo zoom 1.03 and the label underline draws. Under the grid: a "Brands on our shelves" text row (JBL · JL Audio · Moco · Turtle Wax · Top Gear) in Geist Mono at 40% opacity, rising to 100% on hover. Logos only after [CONFIRM].
CTA: **"Ask for today's stock on WhatsApp"** (wa.me with a pre-filled "Hi, I'm looking for … for my {car}").

### 7.7 How a visit works

Four steps in a horizontal row (desktop) or a vertical timeline (mobile). Each step has a mono number (`01`–`04`), a title and two lines of copy:
1. **Consult with real samples:** see and feel coatings, films and materials.
2. **Inspect and quote:** we check the paint and give a clear price and time before work starts.
3. **Work in our bay, with updates:** progress photos on WhatsApp while we work.
4. **Handover and care guide:** we walk you round the car and explain how to look after it.

A thin yellow progress line connects the steps and draws once when the section enters view. This is a heading-level reveal, so it is allowed.

### 7.8 Google reviews (owner's VERY IMPORTANT feature)

**Goal:** show **real Google reviews** that the visitor can click and interact with. Clicking a review takes them to that review / the listing on Google Maps, like the reference site but faster, on-brand and native (no third-party iframe look).

**Section header (two columns on desktop):**
- Left: eyebrow line `── TESTIMONIALS ──` (two short yellow hairlines either side, matching the reference site's motif), h2 **"Hear from our happy customers"**.
- Right: a **rating summary card**: the Google "G" logo, **4.8** in Archivo 56 px, five stars (the 4.8 fill drawn precisely with a clip), "Based on 59 Google reviews", and two buttons: **"Read all reviews on Google"** (→ the reviews link) and ghost **"Write a review"** (→ `https://search.google.com/local/writereview?placeid=<PLACE_ID>`).

**Review rail:**
- A horizontal **scroll-snap** track (`scroll-snap-type: x mandatory`). 3.2 cards visible at 1440, 2.2 at 1024, 1.15 at 390, so the next card always peeks and signals "more". Native swipe and trackpad scrolling work.
- **Arrow buttons** (44 px icon buttons, top-right of the rail on desktop, below it on mobile) scroll by one card. Each is disabled at its end (opacity .35, `aria-disabled`).
- **Keyboard:** the track is focusable (`tabindex="0"`, `role="region"`, `aria-label="Google reviews"`), ←/→ scroll it, and each card is a link that can be tabbed to.
- **Pagination:** a thin progress bar under the rail (the track's scroll ratio), not dots.
- **Autoplay: off.** (If the owner insists: 6 s per card, pausing on hover, focus or touch, never under reduced motion, with a visible pause button.)
- **Edge fades:** a 48 px mask gradient on the left and right edges of the track (not over the arrows).

**Each review card** (`--ink-850`, 10 px radius, 24 px padding, fixed height so the row is even):
- Top row: avatar (40 px circle, the reviewer's Google photo; fallback is their initial on a colour derived from the name), name (Geist 500), a small Google "G" badge on the avatar, and `· 3 years ago` (relative time) in mist.
- Stars row (16 px, yellow).
- Review text, clamped to **6 lines** with a fade-out, followed by **"Read on Google ↗"** in signal yellow.
- If the review has photos, show up to 3 thumbnails (48 px, rounded 6 px).
- **The whole card is one link** (`<a target="_blank" rel="noopener noreferrer">`) to that review's Google Maps URL (the `googleMapsUri` from the API), or to the listing's reviews if missing. Hover: lifts 2 px, the border brightens, the specular sweep plays and the "↗" moves 2 px up-right. `aria-label="Read {name}'s review on Google (opens in new tab)"`.
- Never edit review text. Truncate only, and link to the full text.

**Data source (implement A, with B as the fallback):**

- **A, live (preferred):** **Google Places API (New)** Place Details, called server-side from a Next.js route handler (`/api/reviews`) with the field mask `rating,userRatingCount,reviews,googleMapsUri`. Each review gives `rating`, `text`, `relativePublishTimeDescription`, `authorAttribution{displayName,uri,photoUri}` and `googleMapsUri`. Cache the result for **24 hours** (`revalidate: 86400`) so API cost stays near zero. Keep the API key in `GOOGLE_MAPS_API_KEY`, restricted to the Places API. The API returns **up to 5 reviews**, so:
  - show those 5 live;
  - after them, add a final **"See all 59 reviews on Google →"** card (yellow outline, large arrow) that links to the full review list;
  - follow Google's attribution rules: show the "Google" attribution and the author name, and link to the author `uri`.
- **B, curated fallback** (used when the API is unavailable, and as seed data for development): a `data/reviews.json` file. The owner or developer copies **full, unedited** review text from the Google listing, starting with the 4★ and 5★ reviews and focusing on the ones that mention ceramic coating, PPF, accessories, LED lighting, sample-based consultation and WhatsApp updates. Verified examples on the listing as of Nov 2026 include reviews from *Ujwal Raj* (ceramic coating on a 5-year-old car, praises "Chandu bhai" and team), *Pranav Lall* (accessories for a new Kia Carens), *nishanthkumar pippalapally* (200W LED lamps and horns on a Volvo S60; pricing and quality), and *NRN ENTERPRISES* (first modified Honda Elevate in Hyderabad). Each entry: `{ author, avatarUrl?, rating, relativeTime, text, reviewUrl, photos[] }`.
- **C, no-code alternative** (only if the owner later wants a widget): Elfsight, Trustindex or Tagembed Google Reviews. This is not recommended because it is slower and off-brand.

**Do not** add `aggregateRating`/`review` schema built from Google reviews to the site's JSON-LD. Google treats that as self-serving review markup and it won't produce stars. Just show the reviews visually.

### 7.9 Visit the studio: "Find us next to KIMS Hospital"

Layout (desktop): the left column holds the street photo (`02-storefront…`, 4:5 frame) with a mono tag in the corner `LOOK FOR THE YELLOW SIGN`. The right column holds:
- Address block (full address, copyable: a small "Copy" icon button that shows a "Copied" toast for 1.6 s)
- Landmark line: "Next to KIMS Hospital on Minister Road, Ramgopalpet"
- Hours table (Mon–Sat 10–10, Sunday closed) with **today's row highlighted** and the live open-now pill
- Buttons: primary **"Get directions"** (→ `https://www.google.com/maps/dir/?api=1&destination=17.4383964,78.4811216&destination_place_id=<PLACE_ID>`), ghost **"Call the studio"**, ghost **"WhatsApp us"**
- A payments row with real logos: UPI · Visa · Mastercard · RuPay · Net Banking · Cash
- An accessibility note: "Wheelchair-accessible entrance"
- Parking note **[CONFIRM]**
- The Telugu name, షైన్ స్క్వాడ్, set small in Noto Sans Telugu

Below it, a full-width **map**. Use a *click-to-load facade*: a static, dark-styled map image (pre-rendered) with a pin and a "Load interactive map" button. On click, swap in the Google Maps Embed iframe for the place (`loading="lazy"`, `title="Shine Squad on Google Maps"`). This keeps about 500 KB of third-party JavaScript off the first load. Apply a dark map style via the Maps Embed API, or use `filter: invert(.9) hue-rotate(180deg)` only on the static facade.

### 7.10 FAQ

Two columns on desktop: the h2 and a "Still curious? WhatsApp us" card on the left, the questions on the right. Use an accessible disclosure (button + region, `aria-expanded`). Only one is open at a time. The panel opens with the `grid-template-rows` technique (220 ms) and a chevron that rotates 180°. Use real questions customers ask:

1. What's the difference between ceramic, graphene and Teflon coating?
2. Is PPF worth it on a new car, and can I do just the front?
3. How long does each service take, and can I wait or should I leave the car? **[CONFIRM durations]**
4. Will a coating hide scratches? (Honest answer: paint correction first, then coat.)
5. Can I see and feel seat-cover and mat materials before choosing? (Yes. That's what we're known for.)
6. Do you fit audio systems and LED headlights without affecting the car's warranty? **[CONFIRM wording]**
7. How do I wash my car after a ceramic coating?
8. What payment methods do you accept?
9. Are you open on Sundays? (No. Mon–Sat, 10 AM – 10 PM.)

Add `FAQPage` JSON-LD with the same text.

### 7.11 Final CTA band

A full-width **signal-yellow** band with black text. On the left: **"Bring it in. Drive out shining."** (Archivo Expanded 800, `clamp(2.5rem,5vw,5rem)`). On the right: black buttons **"Book a consultation"** and **"Call +91 70131 46997"**. A subtle oversized italic "SHINE SQUAD" wordmark sits at 6% opacity in the background, cropped off the right edge.

### 7.12 Footer

`--ink-950`, 4 columns: the brand (wordmark, tagline "Shines and Smiles, for miles!", "A unit of Car Jewel" [CONFIRM], Instagram icon link [CONFIRM handle]) · Services (links) · Visit (address, hours, directions) · Contact (phone, WhatsApp). A bottom row holds © year, Privacy, and "Made in Hyderabad". All links use the underline-draw hover. **No photo credits are needed**, since all photos are the owner's.

---

## 8. Leads: they must actually arrive

`POST /api/lead` (Next.js route handler, Edge or Node):
1. Validate with **Zod**: name, phone (Indian mobile), services[], honeypot empty, time-to-submit ≥ 2 s.
2. Rate-limit by IP (Upstash Ratelimit, or an in-memory fallback).
3. **Deliver to two channels** so that no lead is lost:
   - **Email to the owner** via Resend (`LEAD_TO_EMAIL` [CONFIRM]), subject `New consultation: {name} · {phone}`, with a one-tap `tel:` link and a `wa.me` link in the body.
   - **Append a row to a Google Sheet** (Apps Script web-app URL in `LEAD_SHEET_WEBHOOK`): timestamp in IST, name, phone, services, page and UTM source.
   - *(Optional, later)* WhatsApp Business Cloud API message to the owner.
4. Return `{ ok: true }`. On failure, return `{ ok: false }` and the UI shows the call/WhatsApp fallback.
5. Fire analytics event `generate_lead`.

Write `README.md` instructions for setting up each environment variable, and add `.env.example` with **names only, no values**.

---

## 9. Other pages

- **Service pages** (`/services/[slug]`), one template, filled per service: ceramic-coating (with graphene and hybrid), paint-protection-film, teflon-coating, car-wrapping, window-tinting, audio-video, seat-covers-mats, lighting-upgrades, alloy-wheels, detail-spa-restoration, electrical-headlight-repair, maintenance.
  Template: hero (h1 = service + "in Secunderabad", a one-line promise, the consultation card again), "What's included", "Packages" (cards with `[CONFIRM]` price/duration), "Why it matters" (2–3 points), the relevant reviews (filtered by keyword where possible), FAQ (3–5), and the final CTA. Each page has its own meta title and description.
- **/contact**: the Visit section, plus a longer form with an optional car make/model and message.
- **/privacy**: a short, plain privacy note: what the form collects, why, and how long it is kept.
- **404**: a dark page with "This road doesn't go anywhere", plus Home and Book buttons.

---

## 10. SEO, local search and analytics

- **Titles:** `Ceramic Coating, PPF & Car Accessories in Secunderabad | Shine Squad` (home). Service pages: `{Service} in Secunderabad, Hyderabad | Shine Squad`. Meta descriptions are 140–160 characters and include "Minister Road" and "near KIMS".
- **JSON-LD** (`@type: ["AutoRepair","AutoPartsStore"]`): name, image, telephone `+917013146997`, the full `PostalAddress`, `geo`, `hasMap` (the cid link), `openingHoursSpecification` (Mo–Sa 10:00–22:00), `paymentAccepted`, `areaServed` (Secunderabad, Hyderabad), `sameAs` (Instagram, Google Maps). No aggregateRating (see 7.8). Also add `Service` schema per service page, `FAQPage` and `BreadcrumbList`.
- `sitemap.xml`, `robots.txt`, canonical URLs, and Open Graph/Twitter images (1200 × 630, built from the storefront photo with the wordmark).
- Target keywords: ceramic coating Secunderabad · PPF Hyderabad · paint protection film Secunderabad · car accessories Minister Road · car seat covers Secunderabad · graphene coating Hyderabad · car window tinting Secunderabad · car audio installation Secunderabad.
- After launch, **add the website URL to the Google Business Profile** with `?utm_source=google&utm_medium=gbp` and link the Instagram bio to it.
- **Analytics:** GA4 (or Plausible) with events `generate_lead`, `click_call`, `click_whatsapp`, `click_directions`, `click_review`, `click_write_review`. Use a light cookie notice that defaults to the most privacy-preserving choice.

---

## 11. Asset shot list for the owner (send this to Shine Squad)

To make the site look as good as it can, please shoot these on a recent phone, landscape, 4K, in good light:
1. **Hero loop (8–12 s, no people's faces, slow):** a polisher on black paint, foam rinsing off, water beading and rolling on a coated bonnet, the signboard lighting up at dusk.
2. **3–4 before/after pairs from the exact same angle:** a swirled vs corrected panel, a yellowed vs restored headlight, a dirty vs cleaned interior, dull vs coated paint.
3. **The team at work** (3–4 photos), plus the bay and the sample wall (leatherette swatches, film shade samples).
4. **The logo as a vector file** (SVG/AI/PDF), from the signboard maker.
5. **3–5 finished cars** in front of the sign (like the XUV700 photo, but wider and landscape).

---

## 12. Performance and accessibility budget (hard limits)

- Lighthouse mobile: **Performance ≥ 90, Accessibility 100, Best Practices 100, SEO 100**.
- LCP ≤ 2.0 s on 4G (the hero photo is preloaded with `fetchpriority="high"`), CLS ≤ 0.05, INP ≤ 150 ms.
- JavaScript for the home page ≤ 170 KB gzipped (GSAP loaded only on desktop, dynamically, for the pinned section). Fonts: 3 families, subset, `font-display: swap`, with preloaded weights.
- **WCAG 2.2 AA:** contrast ≥ 4.5:1 (3:1 for large text and UI), visible focus everywhere, a skip link, logical heading order (one h1 per page), labels on all inputs (not only placeholders), `alt` text on every photo describing what is in it, and announced form errors (`aria-live="polite"`).
- No horizontal scroll at any width from 320 px up. Respect safe areas on iOS.

---

## 13. Definition of done (check every item)

- [ ] All facts match section 2. No phone, address, logo or copy from the other company's reference site.
- [ ] The hero shows "Make an Appointment Or Call Us" and the "Free Car Consultation" form (Your name, Your phone number, **Book Appointment**). Every state works, and a test lead arrives **by email and in the Sheet**.
- [ ] The Google reviews section shows real reviews. **Each card opens the review on Google Maps in a new tab**. "Read all reviews" and "Write a review" work. The rating and count come from the API, with a fallback.
- [ ] The open-now status is correct in IST, including Sunday closed.
- [ ] Call, WhatsApp (with pre-filled text) and Directions work on a real Android phone and a real iPhone.
- [ ] All three signature moments run smoothly and degrade under reduced motion.
- [ ] Every interactive element has hover, focus-visible, active and disabled states (6.2).
- [ ] Screens are checked at 390, 768, 1024, 1440 and 1920. Equal side edges. No overflow.
- [ ] The Lighthouse budget is met. Taste Skill's checker/finish gate and UI/UX Pro Max's pre-delivery checklist are run and pass.
- [ ] All `[CONFIRM]` items are listed in `LAUNCH-CHECKLIST.md` for the owner to sign off.
- [ ] Deployed to Vercel, with a custom domain [CONFIRM, e.g. shinesquad.in] and HTTPS. The site is added to the Google Business Profile and Instagram bio.

Build it like this is your own flagship portfolio piece.
