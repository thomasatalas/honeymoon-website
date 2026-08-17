# Thomas & Maggie — Honeymoon 2026

A private travel companion and keepsake for Thomas and Maggie’s September–October 2026 honeymoon from San Francisco to Ningbo, with stays in Amsterdam, Munich, Nice and Singapore.

The React/Vite site combines the real day-by-day itinerary with hotel and flight details, reservation decisions, live weather, an interactive route map, galleries and a read-only journal. The visual system uses the project’s established black, ivory and gold design language and responsive layouts.

The website is English-only for Milestone 3. `LanguageContext`, the Chinese translation files and the language-switcher component are preserved, but the switcher is intentionally hidden until the Chinese translation is comprehensive.

## Trip data

`src/data/trip.js` is the normalized source of truth for:

- destination dates and coordinates
- hotels and suites
- the complete SFO–DXB–AMS–MUC–NCE–DOH–SIN–HKG–NGB route and confirmed flight details
- morning, afternoon and evening plans
- reservations, alternatives and planning statuses
- practical destination information and map links

The legacy data modules (`destinations.js`, `itinerary.js`, `flights.js`, `hotels.js` and `journal.js`) now derive their page-specific views from that structure.

The approved hotel and airline collection contains 16 production photographs under `public/assets/official-media/`. Client-facing filenames, labels, alt text and focal positions live in `src/data/officialMedia.js`. Private provenance is kept outside the client bundle in `scripts/official-media-registry.mjs`, with the site owner’s usage decision recorded as “Approved by site owner for personal honeymoon website.”

The Hotels and Flights pages use a consistent editorial hero-plus-supporting-image composition. Product photography is presented at the airline level rather than as a guarantee for an individual flight segment.

Only operational itinerary information is included. Booking confirmation numbers, barcodes, QR codes, passport details and the source PDFs are intentionally excluded from the public site.

## Journal scope

The Milestone 3 journal is read-only. This branch does not include accounts, editing, photo uploads or cloud storage.

**Milestone 4 — Private mobile journal:** authenticated access for Thomas and Maggie, phone photo uploads, written entries, captions, drafts, published entries and durable cloud storage.

## Local development

```bash
npm install
npm run dev
```

Vite prints the local development URL, normally `http://localhost:5173`.

## Checks and production build

```bash
npm run lint
npm run validate:trip
npm run validate:media
npm run build
git diff --check
npm run preview
```

The production output is written to `dist/`.

## Main routes

- `#/` — home and date-aware travel companion
- `#/journey` — itinerary timeline
- `#/map` — interactive route map
- `#/destination/amsterdam`
- `#/destination/munich`
- `#/destination/nice`
- `#/destination/singapore`
- `#/hotels`, `#/flights`, `#/gallery`, `#/journal`
