# 05 · Seller App: Clickable Prototype

**Canvas:** https://claude.ai/artifact/EazbDJ7XsMJtFCWr1A5i1f (private)
**Source:** `prototypes/seller-app/` (8 `.dc.html` screens + `canvas.json`)
**Format:** phone screens, 390×844, Fairward brand, sample data only. Press **Play** on "1 · Welcome".

## Screens
| # | File | Screen | Interactions |
| --- | --- | --- | --- |
| 1 | `Main.dc.html` | **Welcome:** "Sell smarter. Keep more." | Get started → Onboarding; existing account → Overview |
| 2 | `Onboarding.dc.html` | **Onboarding:** address → details → goals → "Your selling plan is ready" | Step progress, editable address, chips for beds, baths, timeline and priorities |
| 3 | `Home.dc.html` | **Overview:** property, listing progress, items needing attention, milestones, estimated costs (proposed fee; others "Estimate pending"), broker card | Links to every section |
| 4 | `Prep.dc.html` | **Listing prep:** seller task checklist plus licensed review statuses | Tick tasks; progress updates |
| 5 | `Showings.dc.html` | **Showings:** requests, confirmed showings, feedback | Accept / suggest another time / undo |
| 6 | `Offers.dc.html` | **Offers:** 3 sample offers, terms, illustrative amount after listing fee and credits | Select an offer; "Review offers with my broker" |
| 7 | `Assistant.dc.html` | **Assistant:** 4 questions; general information labeled; licensed review hand-off | Pick a question |
| 8 | `Messages.dc.html` | **Broker and documents:** message thread plus document statuses | Send messages; switch tabs |

The bottom tab bar (Overview, Listing, Showings, Offers, Assistant) appears on screens 3–7.

## Content rules applied
- **Sample data:** address "1234 Sample Lane", offers and dates.
- **Broker shown as placeholders:** `[Broker name]` and "DRE # to be provided".
- **No pricing advice from the assistant:** accept, counter or decline is done with the broker.
- **Illustrative figures:** offer comparisons are labeled as such and exclude escrow, title, transfer taxes, buyer-broker compensation and payoff.
- **No fake status bars.** 44px touch targets and real buttons and links.

## Agreed changes for the next revision
1. **Six-stage header:** Explore → Prepare → Listing → Offers → Escrow → Completed.
2. **Overview becomes "Today":** needs you / waiting on others / coming next, each item showing owner, deadline, status and broker-approval flag.
3. **Live net-proceeds card** with confirmed, estimated and missing labels.
4. **"Ready for MLS" screen** showing each prerequisite and the broker's authorization.
5. **Example exception flow:** "Buyer's appraisal came in low" with options, recommendation and deadline.
6. **Co-seller permissions** on the account screen (view / approve / sign).
7. **Marketing Studio screens** (see doc 08).

## Path to a real app
- React Native (Expo), one codebase for iOS and Android, sharing the Supabase backend.
- Private testing via TestFlight. App store release waits for brokerage branding approval, a privacy policy and developer accounts (store listings count as public advertising).
