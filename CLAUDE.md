# CLAUDE.md: Working on Fairward

Read `docs/00_START_HERE.md` first. It indexes all project documentation.

## What this repo is
The Fairward (FairwardHomes.com) prelaunch marketing site: Next.js 15, React 19, TypeScript, plain CSS. Lead capture goes to Supabase. Design prototypes for the seller app and the broker/agent console are in `prototypes/` (Claude Design canvas files; not production code).

## Commands
```bash
npm install
npm run dev          # local
npm run typecheck && npm run lint && npm test && npm run build   # run all before pushing
```

## Where to change things
- Business constants, pricing, compliance placeholders, logo, imagery: `src/config/site.ts`
- Page copy (steps, comparison, assistant answers, FAQs, form options): `src/config/content.ts`
- Styling tokens: `src/app/globals.css` (`:root`)
- Lead API, validation, spam: `src/app/api/leads/route.ts`, `src/lib/leads/*`
- Schema: `supabase/migrations/` (never use DROP statements; keep migrations re-runnable)

## Non-negotiable content rules
- Never claim AI replaces licensed professionals, or that AI performs licensed activities.
- No "guaranteed", "no hidden costs", "zero risk" or "fully automated" claims.
- Fees are negotiable; comparisons are illustrative and use a user-adjustable hypothetical rate.
- Never fabricate reviews, statistics, team members, broker identities, DRE numbers, addresses or credentials. Use visible placeholders such as `[Broker name]`.
- Prices and services are "proposed" while in prelaunch mode. Don't state fee payment timing.
- Buyer credits: no amounts; "subject to lender approval and final written terms".
- Keep `NEXT_PUBLIC_SITE_MODE=live` gated by `liveModeBlockers()`.
- No third-party tracking. Marketing consent stays optional and unchecked.

## Security
- `SUPABASE_SERVICE_ROLE_KEY` is server-only; never prefix it with `NEXT_PUBLIC_`.
- `.env*` files are gitignored; never commit secrets.
- Lead tables stay RLS-on with no public policies.

## Product principle
Make selling feel extraordinarily simple for the homeowner while the system handles the complex, compliant transaction underneath. Sellers see 6 stages and plain statuses; they are only asked to provide, decide or sign.
