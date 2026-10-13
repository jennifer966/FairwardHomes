# Fairward — FairwardHomes.com

> **Full project documentation:** start at [`docs/00_START_HERE.md`](docs/00_START_HERE.md). Design prototypes are in [`prototypes/`](prototypes/). Guidance for AI assistants: [`CLAUDE.md`](CLAUDE.md).

Prelaunch landing page and lead capture for **Fairward**, a proposed California real estate brokerage. Tagline: *A Fairer Way Forward.*

> **Status: private prelaunch prototype.** The Fairward name, brokerage advertising authorization, services, fees and legal disclosures still need final approval. The site ships in **prelaunch mode**: pricing is labeled as proposed, it is `noindex`, and lead capture stores **test** data by default.

## Stack

- Next.js 15 (App Router) · React 19 · TypeScript
- Plain CSS design system (`src/app/globals.css`) with brand tokens, plus Newsreader and DM Sans via `next/font`
- Zod validation, shared by client and server
- Supabase (Postgres + RLS) for leads and optional first-party analytics

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in what you have
npm run dev                  # http://localhost:3000
```

Without Supabase credentials in development, leads are written to `.data/leads.jsonl` (gitignored). In production, missing credentials make the lead API return a 503. Leads are never silently dropped.

| Script | Purpose |
| --- | --- |
| `npm run dev` / `build` / `start` | Next.js |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript |
| `npm test` | Calculator unit tests (`node --test`) |

## Where to edit things

| What | File |
| --- | --- |
| Mode, pricing, fee, inclusions, calculator defaults, brokerage/DRE details, broker bio, logo, photography | `src/config/site.ts` |
| Steps, comparison table, assistant demo answers, FAQs, form options | `src/config/content.ts` |
| Consent wording (snapshotted with each lead) | `src/lib/leads/schema.ts` |
| Privacy / Terms / Accessibility drafts | `src/app/{privacy,terms,accessibility}/page.tsx` |

**Logo:** put the transparent SVG in `public/brand/` and set `brand.logo.src` (and `srcOnDark` for the navy footer). Until then the typographic `fairward.` placeholder is shown.

**Photography:** set `imagery.*.src` to licensed images in `public/images/`. Until then, illustrated placeholders are shown and labeled as placeholders.

## Prelaunch vs. live mode

`NEXT_PUBLIC_SITE_MODE=live` takes effect **only** when `liveModeBlockers()` returns nothing. That requires `compliance.approvedForLive`, the brokerage name, the responsible broker and their DRE number, the business address, and approval flags for privacy, terms, service terms and pricing. Otherwise the site stays in prelaunch.

In prelaunch mode:
- A prelaunch banner is shown, prices are labeled *Proposed Pilot Pricing*, and the footer states that no brokerage services are being offered.
- Pages are `noindex` (meta tag, `X-Robots-Tag` header and robots.txt), and no structured data is published.
- `PREVIEW_PASSWORD` can optionally put the whole site behind a password for reviewers.

`NEXT_PUBLIC_LEAD_CAPTURE` controls forms separately: `test` stores leads flagged `is_test`, `enabled` collects real expressions of interest (only after legal and privacy review), and `disabled` turns submissions off.

## Lead capture & security

- `POST /api/leads` checks same-origin, caps body size, validates with Zod, rate-limits per hashed IP, and silently drops submissions that trip the honeypot or the minimum fill time.
- Supabase schema: `supabase/migrations/20261010000000_init_leads.sql`. RLS is **enabled with no policies** and privileges are revoked from `anon` and `authenticated`, so lead data is only reachable through the server-side service-role key.
- Marketing consent checkboxes are optional and unchecked. SMS consent only counts when a phone number is given, and the exact consent wording is saved with the lead.
- Email notifications go out via Resend only when `RESEND_API_KEY`, `LEAD_NOTIFICATION_FROM` and `LEAD_NOTIFICATION_TO` are set. Otherwise each lead is recorded with `notification_status = not_configured`.
- `/admin/leads` is a minimal internal view with status updates, behind HTTP Basic auth (`ADMIN_PASSWORD`). It returns 404 when no password is set.

Apply the migration with the Supabase CLI (`supabase db push`) or paste it into the SQL editor.

## Analytics

Events: `page_viewed`, `calculator_used`, `primary_cta_clicked`, `seller_form_started`, `seller_form_submitted`, `buyer_form_submitted`, `pricing_viewed`, `faq_interaction`, `assistant_demo_used`.

UTM parameters and the referring host are kept in `sessionStorage` (no cookies) and attached to leads. With `NEXT_PUBLIC_ANALYTICS=first-party`, events go to `/api/events` and are stored without IP or user-agent. No third-party tracking is loaded. A consent-gated integration can opt in by setting `window.__fwAnalyticsConsent = true` and providing `window.dataLayer`.

## Deploying on AWS Amplify

`amplify.yml` holds the build settings. Amplify doesn't pass console environment variables to the running Next.js server, so the build copies the ones the site needs into `.env.production`.

1. In AWS Amplify, choose **Create new app**, connect GitHub, and select this repository and branch. Amplify detects Next.js and `amplify.yml`.
2. Under **Environment variables**, add the values from `.env.example`. At minimum set `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` (a dedicated secret key for production), `ADMIN_PASSWORD`, `NEXT_PUBLIC_SITE_URL`, `RATE_LIMIT_SALT`, and `PREVIEW_PASSWORD` while in private review.
3. Deploy. After that, every push to the connected branch rebuilds and redeploys automatically.
4. Under **Hosting → Custom domains**, add `fairwardhomes.com` (and `www`), then follow the DNS steps. If the domain is in Route 53 this is automatic; otherwise add the records Amplify shows at your registrar. Amplify issues the SSL certificate.

After changing an environment variable, redeploy so the change takes effect.

## Content guardrails

No fabricated reviews, statistics, team members, credentials or addresses. No guaranteed-savings or "AI replaces agents" claims. Fee comparisons are illustrative and use a user-adjustable hypothetical rate. Policy that isn't settled yet is shown as **"Final service terms coming soon."**

## Before public launch

- [ ] Brokerage name and advertising approval; fill in `compliance.*` and set `approvedForLive`
- [ ] Counsel-approved Privacy Policy (CCPA/CPRA), Terms and disclosures
- [ ] Final pricing, inclusions and payment timing (`pricing.paymentTiming`)
- [ ] Broker photo, bio and verified credentials (`broker.*`)
- [ ] Final logo SVG and licensed photography
- [ ] Supabase project and migration applied; email provider configured
- [ ] Set `NEXT_PUBLIC_LEAD_CAPTURE=enabled`, then `NEXT_PUBLIC_SITE_MODE=live`
