# Fairward: Start Here

**Fairward** (FairwardHomes.com) is an emerging, technology-led California real estate brokerage. Homeowners handle the routine parts of selling through a guided digital experience, and licensed professionals provide representation, oversight, negotiation and support at the stages that call for judgment.

**Tagline:** *A Fairer Way Forward.*
**Initial market:** Sacramento, California, expanding statewide and possibly nationwide later.
**Status:** private prelaunch prototype. The brand name, brokerage advertising authorization, services, fees and legal disclosures all still need final approval.

---

## What exists today

| Asset | What it is | Where |
| --- | --- | --- |
| **Marketing website** | Next.js landing page: hero, savings calculator, how it works, assistant demo, comparison, pricing, expertise, seller and buyer lead forms, FAQ, compliance footer. Lead capture goes to Supabase. | `src/`; see [03_WEBSITE_TECHNICAL.md](03_WEBSITE_TECHNICAL.md) |
| **Database** | Supabase project with `leads` and `analytics_events` tables (RLS locked down) | `supabase/migrations/`; see [10_DATA_MODEL.md](10_DATA_MODEL.md) |
| **Hosting setup** | AWS Amplify build file and deployment guide | `amplify.yml`; see [11_DEPLOYMENT_AND_OPERATIONS.md](11_DEPLOYMENT_AND_OPERATIONS.md) |
| **Seller app prototype** | 8 clickable phone screens | `prototypes/seller-app/`; see [05_SELLER_APP_PROTOTYPE.md](05_SELLER_APP_PROTOTYPE.md) |
| **Broker console prototype** | 9 broker screens + 6 agent (salesperson) screens | `prototypes/broker-console/`; see [06_BROKER_CONSOLE.md](06_BROKER_CONSOLE.md), [07_AGENT_WORKSPACE.md](07_AGENT_WORKSPACE.md) |

## Document index

| # | Document | Read it for |
| --- | --- | --- |
| 01 | [Vision & business model](01_VISION_AND_BUSINESS.md) | What Fairward is, who it serves, the economics |
| 02 | [Brand guide](02_BRAND_GUIDE.md) | Colors, type, voice, imagery rules |
| 03 | [Website: technical](03_WEBSITE_TECHNICAL.md) | Architecture, config, lead capture, analytics |
| 04 | [Seller journey](04_SELLER_JOURNEY.md) | The 60-step master process, 6 customer stages, gates, exceptions |
| 05 | [Seller app prototype](05_SELLER_APP_PROTOTYPE.md) | Mobile app screens and next changes |
| 06 | [Broker console](06_BROKER_CONSOLE.md) | Broker screens, roles, supervision |
| 07 | [Agent workspace](07_AGENT_WORKSPACE.md) | Salesperson view and buyer clients |
| 08 | [Marketing Studio](08_MARKETING_STUDIO.md) | Capture, floor plans, tours, campaigns |
| 09 | [Compliance & legal](09_COMPLIANCE_AND_LEGAL.md) | Content rules, prelaunch/live mode, items for counsel |
| 10 | [Data model](10_DATA_MODEL.md) | Current schema and planned entities |
| 11 | [Deployment & operations](11_DEPLOYMENT_AND_OPERATIONS.md) | Supabase, Amplify, env vars, domain, updates |
| 12 | [Roadmap & open items](12_ROADMAP_AND_OPEN_ITEMS.md) | What's next, gaps, decisions needed |
| 13 | [Decisions log](13_DECISIONS_LOG.md) | Decisions made so far and why |

## Key links

| Item | Link / value |
| --- | --- |
| GitHub repo | `jennifer966/FairwardHomes` |
| Working branch | `claude/fairwardhomes-landing-il9dgg` (no `main` branch yet) |
| Supabase project | `aabmheprejtxpyjvbjhm` (org "Fairward"), `https://aabmheprejtxpyjvbjhm.supabase.co` |
| Seller app prototype (private canvas) | https://claude.ai/artifact/EazbDJ7XsMJtFCWr1A5i1f |
| Broker console + agent prototype (private canvas) | https://claude.ai/artifact/GB8dnifw1TeGYUXvjBKAib |
| Domain | FairwardHomes.com (owned; not yet pointed at hosting) |

> The prototype canvases are private to the account owner until shared from the page's Share menu.

## The one-sentence product principle

**Make selling feel extraordinarily simple to the homeowner, while the system handles the complex, compliant transaction underneath.** Sellers see statuses and decisions, never compliance jargon. They are only ever asked to *provide*, *decide* or *sign* something.
