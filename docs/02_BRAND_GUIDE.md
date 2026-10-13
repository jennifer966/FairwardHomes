# 02 · Brand Guide

## Identity
- **Name:** Fairward. **Domain:** FairwardHomes.com. **Tagline:** *A Fairer Way Forward.*
- **Logo direction:** Concept #3, a refined wordmark-led identity. The placeholder is the typographic `fairward.` with the period in Warm Copper.
  - Final transparent SVGs go in `public/brand/`. Set `brand.logo.src`, and `srcOnDark` for navy backgrounds, in `src/config/site.ts`.
- **Never:** roofline or house icons, generic geometric houses, arrow logos, handshake photos, gold luxury gradients, agents holding keys, robots or glowing AI imagery.

## Personality
Elegant and trustworthy · modern but not futuristic · warm and approachable · financially intelligent · confident without aggression · premium without looking expensive · exceptionally easy to navigate. The reference point is a premium consumer fintech, not a real estate agent site, a generic SaaS template or an AI startup.

## Color palette
| Token | Hex | Use |
| --- | --- | --- |
| Midnight Blue | `#223A4E` | Primary brand color, text, navigation, dark sections |
| Navy deep (derived) | `#1A2E3F` | Footer, broker sidebar |
| Navy soft (derived) | `#2C4860` | Agent sidebar, secondary dark |
| Warm Copper | `#B18162` | Accents, key numbers, rules (large text only on ivory: 3.06:1) |
| Copper deep (derived) | `#9A6A4C` | **Buttons** and small copper text (white on it: 4.63:1) |
| Copper deeper (derived) | `#85593E` | Hover, copper text on light tints |
| Copper light (derived) | `#D4A88A` | Copper text on navy (5.48:1) |
| Warm Ivory | `#F5F3ED` | Primary light background |
| Soft Sage | `#B9C9BC` | Secondary accents; tint `#E3EBE4` for "confirmed/ok" states |
| Slate Blue | `#596E81` | Secondary text (4.76:1 on ivory) |
| White | `#FFFFFF` | Cards, panels |

Use mostly ivory and white with generous space, select full-width navy sections, and copper sparingly.

### Status color language (used across all products)
- **Sage tint:** confirmed, approved, on track.
- **Copper tint:** calculated, estimated, waiting, needs review.
- **Red tint (`#FBEFED` / `#8A2F27`):** missing, exception, changes requested.
- **Gray (`#ECE8DE`):** neutral or informational.

## Typography
- **Display:** *Newsreader* (editorial serif), weights 400/500, with italic for emphasis. The italic accent phrase in headlines is set in copper ("Sell smarter. *Keep more.*").
- **Body / UI:** *DM Sans*, weights 400/500/600.
- Eyebrow labels: 11–12px, 600 weight, 0.1–0.16em letter-spacing, uppercase.

## Voice
- Clear, calm and specific. Plain language over jargon.
- Confident but never absolute: no "guaranteed", "zero risk", "fully automated closing" or "no hidden costs".
- Always distinguish **general information** from **personalized professional advice**.
- Missing facts become visible placeholders, e.g. `[Broker name]` or `DRE # [to be added]`.

## Imagery
- Tasteful, authentic California residential architecture: contemporary homes, warm natural light, calm compositions, natural materials, clean interiors.
- About 60% refined typography and interface, 40% visual storytelling. Interface and dashboard mockups are the main differentiator.
- **Current state:** illustrated SVG placeholders, captioned as placeholders. Replace them with licensed photography via `imagery.*.src` in `src/config/site.ts`.

## Accessibility standards
- WCAG 2.2 AA-minded: 4.5:1 text contrast, visible copper focus rings, 44px touch targets and keyboard navigation.
- Reduced-motion support, semantic HTML, and labels on every input.
