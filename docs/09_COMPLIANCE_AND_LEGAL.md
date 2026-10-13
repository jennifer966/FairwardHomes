# 09 · Compliance & Legal

> **Not legal advice.** Everything here reflects product-design assumptions. A qualified California real estate attorney and the responsible broker must confirm every item before public launch.

## Launch status
- Fairward is **not yet approved** as a licensed brokerage name or for public advertising.
- The site runs in **prelaunch mode**: proposed pricing labels, noindex, no structured data, and a footer saying no brokerage services are being offered.
- **Live mode** turns on only when an authorized administrator supplies and approves: brokerage identity, DRE information, service terms, pricing, disclosures, privacy policy and permissions (`liveModeBlockers()` in `src/config/site.ts`).

## Content rules (enforced in copy and config)
- **Never** claim that AI replaces licensed professionals, or that AI independently performs licensed activities.
- **Never** use absolute claims: "guaranteed savings", "no hidden costs", "zero risk", "fully automated closing".
- **Fees:** all brokerage fees are negotiable and not set by law. Fee comparisons are **illustrative** and use a **user-adjustable hypothetical** rate, never a "standard" or "typical" commission.
- **Calculator disclaimer (verbatim):** "Illustrative comparison only. Brokerage commissions are negotiable and not set by law. Actual fees and services depend on the applicable brokerage agreement. Savings assume the same sale price and exclude buyer-broker compensation, concessions, other selling expenses, and closing costs."
- **No fabrication** of reviews, ratings, statistics, transaction counts, service availability, team members, broker identities or credentials. Use visible placeholders.
- **Unsettled policies** show "Final service terms coming soon".
- **Fee payment timing** isn't stated until the lawful structure is confirmed.
- **Buyer credits:** no specific amounts; "where eligible, subject to lender approval and final written terms".
- **Fair housing:** the Equal Housing Opportunity statement in the footer, a language check on generated copy, and no school-quality or demographic claims.

## Privacy and consent
- Marketing consent is **optional and unchecked**. SMS consent counts only with a phone number and is never automatic.
- The exact consent text is snapshotted with each lead.
- No third-party tracking. First-party analytics are cookieless and store no IP address or user agent.
- Lead data is reachable only by the server. Supabase RLS is enabled with no policies and privileges are revoked from `anon` and `authenticated`.
- The Privacy Policy, Terms and Accessibility pages are **drafts**. The privacy policy needs CCPA/CPRA review.

## Items requiring counsel or broker confirmation
1. **Brokerage name approval** (DRE fictitious business name / DBA) and advertising disclosures: license number placement, responsible broker.
2. **Service scope, listing agreement** terms, cancellation and "what if it doesn't sell", **fee payment timing**.
3. **Disclosure rules engine.** TDS exemptions; the SPQ is required by C.A.R. purchase agreements rather than statute; NHD, lead paint, earthquake booklet, Megan's Law notice; trust, estate and new-construction variations.
4. **Broker's visual inspection disclosure** duties.
5. **Altered images (AB 723, effective Jan 1, 2026)** and MLS-specific photo rules.
6. **MLS publication timing:** Clear Cooperation, delayed marketing and office-exclusive options under the rules of the MLS Fairward actually joins.
7. **Buyer-broker compensation.** Seller decisions are kept off the MLS; permitted off-MLS communication; written authorization.
8. **Buyer representation agreements** before touring; required content and forms.
9. **Dual agency** disclosure and consent workflow.
10. **Showings for buyers without an agent:** ID verification, accompaniment and representation disclosure.
11. **Supervision.** Written supervision policy; review requirements for salesperson documents; locked cells in the authority matrix.
12. **Record retention.** At least 3 years for brokerage records (Bus. & Prof. Code §10148), litigation holds, and the period of consumer access.
13. **Assistant guardrails.** Wording that separates general information from advice; logging of handoffs.
14. **SMS/TCPA, CAN-SPAM, CCPA/CPRA** compliance for communications and data.
15. **Wire-fraud protection** language and escrow coordination.
16. **Equal Housing / fair housing** materials and policy.

## Placeholders to fill (in `src/config/site.ts` → `compliance`, `broker`)
Legal entity name · brokerage name · responsible broker name and DRE # · corporation DRE # · business address · contact email and phone · additional disclosures · approval flags (privacy, terms, service terms, pricing, `approvedForLive`) · broker photo, bio and credentials.
