# 13 · Decisions Log

| Date (2026) | Decision | Why |
| --- | --- | --- |
| Oct 10 | Next.js 15 + TypeScript + plain CSS design system | Maintainable, SSR for the lead API and admin, no styling dependency risk |
| Oct 10 | All business constants, pricing and legal details in `src/config/*` | The founder can edit content without touching components |
| Oct 10 | Prelaunch/live mode, with live **gated** by compliance completeness | Prevents accidentally publishing brokerage advertising before approval |
| Oct 10 | Lead capture defaults to **test** mode | Safe internal testing before legal and privacy review |
| Oct 10 | Supabase with RLS on and no policies; server-only secret key | No public access to personal lead data |
| Oct 10 | Cookieless first-party analytics only; no third-party trackers | Privacy-first; consent framework can come later |
| Oct 10 | Illustrated SVG placeholders instead of stock photography | Avoid unlicensed or cliché imagery; clearly labeled |
| Oct 10 | Calculator uses a user-adjustable hypothetical rate (default 2.5%) | Never imply a standard commission |
| Oct 10 | Migration avoids `DROP` statements | The hosted migration tool times out on them; safer anyway |
| Oct 11 | Host on **AWS Amplify** (founder's preference) with `amplify.yml` | Amplify needs server variables written to `.env.production` at build |
| Oct 11 | Seller app prototyped first as a clickable design before any native code | Validate the experience cheaply; matches the "no live transaction system yet" scope |
| Oct 11 | Keep all 12 phases in the roadmap, but show **6 stages** to sellers | "Extraordinarily simple" for homeowners; complexity stays internal |
| Oct 11 | Formal **Ready for MLS** gate (re-closes on material changes) | Compliance as a system state, not a percentage |
| Oct 11 | Conditional (rules-based) disclosures; no AI-filled condition answers | Accuracy and liability |
| Oct 11 | Buyer-broker compensation separate from MLS data | Current MLS practice |
| Oct 11 | Exception workflows as structured playbooks | Control broker labor cost on difficult files |
| Oct 11 | Time/cost tracking on every file | Validate profitability at $2,995 |
| Oct 12 | Broker console designed multi-broker from day one | One broker now; associate brokers, salespersons and coordinators later |
| Oct 12 | Permissions per action, with locked cells for licensing rules | Supervision enforced by the system |
| Oct 12 | Transactions list + per-file workspace (fixing a single-file design) | Brokers run many files at once |
| Oct 12 | One shared sample dataset across all console screens | Consistency; caught mismatched counts in review |
| Oct 12 | Inbox ties every message to a file; assistant drafts are never auto-sent | Audit trail and licensed control of advice |
| Oct 12 | Accompanied showings for buyers without an agent | Safety, verification, representation clarity |
| Oct 13 | Agent workspace: prepare → submit → broker review → feedback loop | Salesperson supervision |
| Oct 13 | Deadline confirmation is broker-only | Corrected an earlier inconsistency |
| Oct 13 | Buyer side: agreement before touring; dual-agency check on Fairward listings | Current California practice (to be confirmed by counsel) |

## Open decision: Codex vs. Claude site
Both tools built versions of the site. Plan:
1. Put Codex's version on its own branch in this repo.
2. Deploy both as Amplify previews.
3. Score both against the original brief.
4. Choose one base and port the best parts.
5. Merge to `main` through a reviewed pull request.
