# 03 · Website: Technical Reference

## Stack
- **Next.js 15.5** (App Router), **React 19**, **TypeScript** (strict).
- Plain CSS design system in `src/app/globals.css`, with brand tokens as CSS variables. No Tailwind.
- Fonts via `next/font/google`: Newsreader and DM Sans.
- **Zod 4** validation, shared by the client and the server.
- **Supabase** (`@supabase/supabase-js`), used only on the server with the secret/service key.
- Node 20+ (CI and Amplify use Node 20).

## Scripts
| Command | Purpose |
| --- | --- |
| `npm run dev` | Local dev server |
| `npm run build` / `npm start` | Production build / serve |
| `npm run lint` | ESLint (flat config, `next/core-web-vitals` + TypeScript) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | Calculator unit tests (`node --test`, `tests/savings.test.ts`) |

## File map
```
src/
  config/
    site.ts          ← business constants: mode, pricing, inclusions, calculator defaults,
                        compliance/DRE placeholders, broker bio, logo, imagery, nav
    content.ts       ← page copy: steps, comparison table, assistant answers, FAQs, form options
  lib/
    savings.ts       ← pure calculator logic (tested)
    analytics.ts     ← client event dispatcher (none | first-party), consent hook
    analytics-events.ts
    attribution.ts   ← UTM + referrer host, sessionStorage only (no cookies)
    supabase-admin.ts← server-only Supabase client (service role / secret key)
    leads/
      schema.ts      ← Zod schemas, consent text (snapshotted per lead), statuses
      store.ts       ← Supabase insert/list/update; dev-file fallback (.data/leads.jsonl)
      notify.ts      ← optional Resend email notification
      spam.ts        ← hashed-IP rate limit, honeypot, min fill time
  app/
    layout.tsx       ← fonts, metadata, noindex in prelaunch, structured data only when live
    page.tsx         ← section order
    api/leads/route.ts   ← POST lead: origin check, size cap, validation, spam, store, notify
    api/events/route.ts  ← first-party analytics sink (opt-in)
    admin/leads/     ← protected lead list + status updates (server action)
    privacy | terms | accessibility ← draft legal pages
    robots.ts, sitemap.ts, icon.svg
  components/
    sections/        ← Header, Hero, HeroDashboard, SavingsCalculator, HowItWorks, Assistant,
                        Comparison, Pricing, Expertise, GetStarted, Buyers, Faq, FinalCta, Footer
    forms/           ← SellerForm (2-step), BuyerForm, shared helpers
    ui/              ← Wordmark, Icons, Reveal, ArchImage (SVG placeholders), TrackOnView, PrelaunchBanner
  middleware.ts      ← Basic auth for /admin and optional site-wide preview password; X-Robots-Tag
supabase/migrations/ ← SQL schema
amplify.yml          ← AWS Amplify build settings
```

## Page sections (in order)
1. Prelaunch banner (prelaunch mode only).
2. Sticky header: Sell, Buy, How It Works, Pricing, FAQ, Get Started. Accessible mobile menu with focus trap.
3. **Hero:** "Sell smarter. Keep more." plus a seller dashboard mockup labeled *Sample data*.
4. **Savings calculator:** sale price (input + slider), hypothetical comparison % (0.5–6%, default 2.5%), the proposed $2,995 fee, live results, a bar comparison and the full disclaimer. Its CTA pre-fills the seller form with the estimated value.
5. **How it works:** 4 steps with role tags (You / Platform / Licensed review).
6. **Assistant demo:** 3 predefined questions with labeled general answers and a licensed hand-off.
7. **Comparison:** FSBO vs. traditional brokerage vs. Fairward (table on desktop, cards on mobile) with an illustrative note.
8. **Pricing:** Fairward Guided Selling, $2,995 flat listing fee, *Proposed Pilot Pricing*, 9 inclusions, notes on separate costs and negotiability.
9. **Expertise** (navy): three pillars and a broker profile slot (placeholder until real details are supplied).
10. **Get started:** 2-step seller form.
11. **Buyers:** secondary section and buyer interest form.
12. **FAQ:** 10 questions; unsettled policies show "Final service terms coming soon".
13. **Final CTA** (navy).
14. **Footer:** a compliance block with placeholders ("To be provided"), Equal Housing Opportunity, and legal links.

## Modes and switches (`src/config/site.ts` + env)
- `NEXT_PUBLIC_SITE_MODE`: `prelaunch` (default) or `live`. **Live is ignored** until `liveModeBlockers()` returns nothing: `approvedForLive`, brokerage name, responsible broker and DRE #, address, plus privacy, terms, service-terms and pricing approvals.
- `NEXT_PUBLIC_LEAD_CAPTURE`:
  - `test` (default): stores leads with `is_test = true`.
  - `enabled`: only after legal and privacy review.
  - `disabled`: forms don't submit.
- **Prelaunch effects:** banner, "proposed" labels, noindex (meta, header and robots), no structured data, footer prelaunch notice.

## Lead capture flow
1. **Seller form step 1:** name, email, ZIP.
2. **Seller form step 2:** address, timeline, selling status, interest, optional value and phone, optional unchecked email/SMS consent. SMS consent counts only if a phone number is given.
3. **POST `/api/leads`:** same-origin check, 8 KB cap, Zod validation, hashed-IP rate limit (5 per 10 min per instance), honeypot and minimum fill time. Bots are dropped silently.
4. **Store:** Supabase `leads` with UTM fields, referrer host, landing path, site mode and a consent text snapshot.
5. **Notify:** via Resend if configured; otherwise `notification_status = not_configured`.
6. **Without Supabase:** dev writes to `.data/leads.jsonl`; production returns 503 rather than losing the lead.

## Analytics
- **Events:** `page_viewed`, `calculator_used`, `primary_cta_clicked` (via `data-cta` attributes), `seller_form_started`, `seller_form_submitted`, `buyer_form_submitted`, `pricing_viewed`, `faq_interaction`, `assistant_demo_used`.
- **`NEXT_PUBLIC_ANALYTICS=first-party`:** stores cookieless events (no IP or user agent). No third-party tracking is loaded. A future consent-gated tool can opt in via `window.__fwAnalyticsConsent` plus `dataLayer`.

## Security headers
`X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options: DENY`, `Permissions-Policy`, HSTS. `/admin/*` is protected by HTTP Basic auth (`ADMIN_PASSWORD`) and returns 404 when no password is set.

## Verified so far
Typecheck, lint, unit tests and production build all pass. Seller and buyer submissions were verified end to end against the live Supabase project (rows inserted, admin status update persisted, public key denied).
