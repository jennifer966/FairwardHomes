/**
 * Fairward site configuration.
 *
 * Every business constant, price, service inclusion and legal detail used on
 * the site lives here so it can be reviewed and changed without touching
 * components. Nothing in this file may contain secrets — it is bundled into
 * the client.
 *
 * IMPORTANT: Values marked "PLACEHOLDER" must be replaced with verified,
 * approved information before LIVE mode can be enabled. See `resolveSiteMode`.
 */

export type SiteMode = "prelaunch" | "live";

/**
 * Lead capture setting.
 * - "disabled": forms render but submissions are not accepted.
 * - "test":     submissions are stored and flagged as internal test data.
 *               Use for private review before legal/privacy sign-off.
 * - "enabled":  real expressions of interest are collected. Only enable
 *               after public-facing legal and privacy review is complete.
 */
export type LeadCaptureSetting = "disabled" | "test" | "enabled";

function envMode(): SiteMode {
  return process.env.NEXT_PUBLIC_SITE_MODE === "live" ? "live" : "prelaunch";
}

function envLeadCapture(): LeadCaptureSetting {
  const v = process.env.NEXT_PUBLIC_LEAD_CAPTURE;
  return v === "enabled" || v === "disabled" ? v : "test";
}

export const brand = {
  name: "Fairward",
  wordmark: "fairward",
  tagline: "A Fairer Way Forward.",
  domain: "FairwardHomes.com",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://fairwardhomes.com",
  /**
   * Path to the final transparent SVG logo (e.g. "/brand/fairward-logo.svg").
   * Leave null to render the typographic placeholder wordmark.
   * Provide a light variant for dark (navy) backgrounds.
   */
  logo: {
    src: null as string | null,
    srcOnDark: null as string | null,
    width: 132,
    height: 28,
  },
  initialMarket: "Sacramento, California",
} as const;

export const pricing = {
  /** Proposed flat listing fee in whole US dollars. */
  listingFee: 2995,
  packageName: "Fairward Guided Selling",
  /** Label shown while in prelaunch mode. */
  prelaunchLabel: "Proposed Pilot Pricing",
  summary:
    "A technology-guided selling experience with defined licensed brokerage representation and professional support.",
  /**
   * Proposed service highlights. Treat as proposals until the actual
   * services are approved and reflected in a signed listing agreement.
   */
  inclusions: [
    "Guided digital seller onboarding",
    "MLS listing coordination",
    "Property marketing preparation",
    "Seller dashboard and transaction timeline",
    "Showing coordination",
    "Offer organization and comparison",
    "Licensed professional advice and negotiation",
    "Transaction milestone tracking",
    "Closing coordination and brokerage supervision",
  ],
  separateCostsNote:
    "Buyer-broker compensation (if any is offered or agreed), other transaction expenses, third-party charges such as escrow, title, inspections and transfer taxes, and any applicable service limitations are separate from the listing fee and will be clearly disclosed in writing.",
  /**
   * Leave null until the lawful payment structure is confirmed. When set,
   * it is displayed beneath the price (e.g. "Payable at closing").
   */
  paymentTiming: null as string | null,
} as const;

export const calculatorDefaults = {
  salePrice: 600_000,
  salePriceMin: 100_000,
  salePriceMax: 3_000_000,
  salePriceStep: 5_000,
  comparisonPercent: 2.5,
  comparisonPercentMin: 0.5,
  comparisonPercentMax: 6,
  comparisonPercentStep: 0.05,
} as const;

/**
 * Brokerage identity and compliance information.
 * Every field below is a PLACEHOLDER until verified. Do not invent values.
 */
export const compliance = {
  /** Set true only after an authorized administrator approves all details. */
  approvedForLive: false,
  legalEntityName: null as string | null, // e.g. "Example Realty, Inc."
  brokerageName: null as string | null, // DBA as approved by the California DRE
  responsibleBrokerName: null as string | null,
  responsibleBrokerDreNumber: null as string | null,
  corporationDreNumber: null as string | null,
  businessAddress: null as string | null,
  contactEmail: null as string | null,
  contactPhone: null as string | null,
  /** Additional advertising disclosures required by counsel. */
  additionalDisclosures: [] as string[],
  privacyPolicyApproved: false,
  termsApproved: false,
  serviceTermsApproved: false,
  pricingApproved: false,
} as const;

/**
 * Photography. Each slot renders a tasteful illustrated placeholder until an
 * authorized photograph is supplied (place files in /public/images and set
 * `src`). Use licensed or owned imagery only.
 */
export const imagery = {
  heroProperty: { src: null as string | null, alt: "Contemporary California home at dusk" },
  buyers: { src: null as string | null, alt: "Light-filled modern living space" },
} as const;

/** Professional profile area. Leave null until real details are supplied. */
export const broker = {
  photo: null as string | null,
  name: null as string | null,
  title: null as string | null,
  bio: null as string | null,
  credentials: [] as string[],
} as const;

export const nav = [
  { label: "Sell", href: "#sell" },
  { label: "Buy", href: "#buy" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
] as const;

/** Missing fields that block LIVE mode. */
export function liveModeBlockers(): string[] {
  const blockers: string[] = [];
  if (!compliance.approvedForLive) blockers.push("compliance.approvedForLive");
  if (!compliance.brokerageName) blockers.push("compliance.brokerageName");
  if (!compliance.responsibleBrokerName) blockers.push("compliance.responsibleBrokerName");
  if (!compliance.responsibleBrokerDreNumber)
    blockers.push("compliance.responsibleBrokerDreNumber");
  if (!compliance.businessAddress) blockers.push("compliance.businessAddress");
  if (!compliance.privacyPolicyApproved) blockers.push("compliance.privacyPolicyApproved");
  if (!compliance.termsApproved) blockers.push("compliance.termsApproved");
  if (!compliance.serviceTermsApproved) blockers.push("compliance.serviceTermsApproved");
  if (!compliance.pricingApproved) blockers.push("compliance.pricingApproved");
  return blockers;
}

/**
 * The effective mode. LIVE is only honoured when every required compliance
 * field has been supplied and approved; otherwise the site stays in
 * PRELAUNCH regardless of the environment variable.
 */
export function resolveSiteMode(): SiteMode {
  if (envMode() === "live" && liveModeBlockers().length === 0) return "live";
  return "prelaunch";
}

export const siteMode: SiteMode = resolveSiteMode();
export const isPrelaunch = siteMode === "prelaunch";
export const leadCapture: LeadCaptureSetting = envLeadCapture();

export function formatUSD(value: number, opts: { cents?: boolean } = {}): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: opts.cents ? 2 : 0,
    maximumFractionDigits: opts.cents ? 2 : 0,
  }).format(value);
}
