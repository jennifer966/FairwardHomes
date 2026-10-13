# 12 · Roadmap & Open Items

## Now (prelaunch)
1. **Deploy** the website to Amplify on a password-protected preview; create a `main` branch via pull request.
2. **Legal workstream:** work through the counsel list in doc 09 (name approval, agreements, disclosures, privacy).
3. **Brand assets:** final logo SVG, licensed photography, broker profile.
4. **Supabase housekeeping:** delete the `claude-test` key; add the `converted` status and `transaction_id` to leads.
5. **Codex vs. Claude comparison:** push Codex's site to its own branch; compare against the brief (design, compliance, security, mobile, editability); pick a base and port the best parts. See doc 13.

## Next (design and validation)
- **Seller app prototype v2:** six-stage header, "Today" action center, live net proceeds, Ready-for-MLS screen, exception flow, co-seller permissions.
- **Marketing Studio demo:** Capture Guide, Interactive Floor Plan, Guided Tour, Campaign Builder.
- **Broker console:**
  - buyer files and buyer review items
  - exceptions list
  - reply-time escalation
  - compliance calendar
  - "as seller sees it" preview
- **Internal specification document:** the 60 steps mapped to stages, gates, rules, owners, exception paths and legal-confirmation items.
- **Customer research:** test the prototype with Sacramento homeowners (including FSBO sellers).

## Later (build)
- **Real platform (web):** auth, roles and RLS per doc 10, transactions, vault, deadline engine, review queue, inbox, calendar, time tracking.
- **Mobile app:** React Native/Expo on the same backend; TestFlight first.
- **Integrations:** e-signature, MLS (via the brokerage's MLS), escrow/title, calendar sync, email/SMS (with consent), Resend.
- **Marketing Studio advanced:** RoomPlan scanning (iOS), video processing, Matterport/Zillow 3D tours.
- **Buyer experience:** buyer representation workflow, tours and offers.

## Business decisions needed
- Service limits and add-ons at $2,995 (included hours or showings; exception pricing; complex-sale packages).
- Fee payment timing (lawful structure).
- MLS membership and the rules that apply.
- Hiring plan: when to add associate brokers, salespersons or a coordinator.
- Expansion criteria beyond Sacramento.
