/**
 * Editable page copy for structured content blocks (steps, comparison,
 * assistant demo, FAQs). Headline copy lives with each section component.
 *
 * Content rules (do not remove):
 * - Never claim AI replaces licensed real estate professionals.
 * - No guaranteed savings, results, rebates or "no hidden costs" claims.
 * - No fabricated reviews, statistics, team members or credentials.
 * - Where policy is not yet established, set `pending: true` so the
 *   "Final service terms coming soon" notice is displayed.
 */

export const steps = [
  {
    n: "01",
    title: "Tell us about your home",
    body: "Enter your property address, basic details, and selling goals. Start with a guided digital onboarding experience.",
  },
  {
    n: "02",
    title: "Prepare your listing",
    body: "Organize your property information, review pricing research, and prepare marketing materials through the platform, with appropriate licensed review.",
  },
  {
    n: "03",
    title: "Manage the sale",
    body: "Coordinate showings, receive updates, organize offers, and stay informed about your transaction through one streamlined dashboard.",
  },
  {
    n: "04",
    title: "Close with confidence",
    body: "Track milestones and deadlines while licensed professionals provide required advice, review, negotiation, and transaction oversight.",
  },
] as const;

export type AssistantSample = {
  id: string;
  question: string;
  answer: { intro: string; points: string[]; handoff: string };
};

/** Predefined educational responses for the assistant demonstration. */
export const assistantSamples: AssistantSample[] = [
  {
    id: "before-listing",
    question: "What should I do before listing my home?",
    answer: {
      intro: "Here's a general checklist many California sellers work through before going on the market:",
      points: [
        "Gather documents: deed, recent property tax bill, HOA documents, permits and any past inspection reports.",
        "Start your seller disclosures early. California requires several, including the Transfer Disclosure Statement where applicable.",
        "Review recent comparable sales nearby to understand the current market.",
        "Address small repairs, declutter, and plan for photography.",
        "Decide on your ideal timeline and where you'll move next.",
      ],
      handoff:
        "Pricing strategy and which disclosures apply to your property are decisions to make with your licensed professional.",
    },
  },
  {
    id: "receive-offer",
    question: "What happens when I receive an offer?",
    answer: {
      intro: "Typically, an offer moves through a few stages:",
      points: [
        "You review the price, deposit, financing, contingencies, and proposed closing date — not just the headline number.",
        "You can accept, reject, or counter. Multiple offers can be compared side by side in your dashboard.",
        "Once accepted, contingency periods begin (commonly inspection, appraisal, and loan), each with its own deadline.",
        "Your timeline updates automatically so you can see what's due and when.",
      ],
      handoff:
        "Evaluating offer terms and negotiating a counteroffer call for professional judgment — a licensed professional reviews these with you.",
    },
  },
  {
    id: "selling-expenses",
    question: "What expenses should I expect when selling?",
    answer: {
      intro: "Common categories of selling costs include:",
      points: [
        "Your listing brokerage fee (all brokerage fees are negotiable).",
        "Any buyer-broker compensation you choose to offer or agree to.",
        "Escrow and title fees, and county or city transfer taxes.",
        "Pre-sale repairs, staging, or credits negotiated with the buyer.",
        "Payoff of your existing mortgage and any prorated property taxes or HOA dues.",
      ],
      handoff:
        "Actual amounts depend on your property, location and agreements. An estimated net sheet should be reviewed with a licensed professional.",
    },
  },
];

export type ComparisonCell = { text: string; level: "strong" | "partial" | "limited" };

export const comparison: {
  columns: [string, string, string];
  rows: { criterion: string; cells: [ComparisonCell, ComparisonCell, ComparisonCell] }[];
} = {
  columns: ["For Sale By Owner", "Traditional Brokerage", "Fairward"],
  rows: [
    {
      criterion: "MLS listing exposure",
      cells: [
        { text: "Usually requires a separate paid entry service", level: "limited" },
        { text: "Typically included", level: "strong" },
        { text: "MLS listing coordination", level: "strong" },
      ],
    },
    {
      criterion: "Digital transaction dashboard",
      cells: [
        { text: "Seller assembles their own tools", level: "limited" },
        { text: "Varies by brokerage", level: "partial" },
        { text: "Central to the experience", level: "strong" },
      ],
    },
    {
      criterion: "Routine workflow automation",
      cells: [
        { text: "Mostly manual", level: "limited" },
        { text: "Varies by brokerage", level: "partial" },
        { text: "Reminders, checklists and milestone tracking", level: "strong" },
      ],
    },
    {
      criterion: "Licensed professional representation",
      cells: [
        { text: "None unless separately hired", level: "limited" },
        { text: "Yes, per listing agreement", level: "strong" },
        { text: "Yes, scope defined by package and agreement", level: "strong" },
      ],
    },
    {
      criterion: "Negotiation support",
      cells: [
        { text: "Seller negotiates directly", level: "limited" },
        { text: "Typically agent-led", level: "strong" },
        { text: "Licensed professional advice and negotiation", level: "strong" },
      ],
    },
    {
      criterion: "Seller involvement",
      cells: [
        { text: "Seller handles everything", level: "partial" },
        { text: "Often agent-managed", level: "partial" },
        { text: "Seller-directed, professionally supported", level: "strong" },
      ],
    },
    {
      criterion: "Transparent pricing",
      cells: [
        { text: "No listing fee; other costs vary", level: "partial" },
        { text: "Negotiable; structures vary", level: "partial" },
        { text: "Published proposed flat listing fee", level: "strong" },
      ],
    },
    {
      criterion: "Access to professional support",
      cells: [
        { text: "Must be arranged separately", level: "limited" },
        { text: "Through your agent", level: "strong" },
        { text: "At defined stages of the sale", level: "strong" },
      ],
    },
  ],
};

export const comparisonNote =
  "General comparison for illustration. Services and fees vary widely among brokerages and individual agreements, and all brokerage commissions are negotiable. The scope of Fairward's professional services will depend on the selected package and signed agreements.";

export const techPillars = [
  {
    title: "Intelligent Technology",
    body: "Organized workflows, information, reminders, and transaction visibility.",
  },
  {
    title: "Licensed Professionals",
    body: "Human review, representation, advice, and negotiation where required.",
  },
  {
    title: "Transparent Economics",
    body: "Clearly explained brokerage fees and responsibilities.",
  },
] as const;

export const buyerFeatures = [
  "Guided property research",
  "Digital transaction experience",
  "Licensed brokerage support",
  "Transparent compensation",
  "Potential buyer credits where eligible",
] as const;

export const buyerCreditsNote =
  "Any buyer credit would be subject to lender approval, applicable law, and final written terms. No specific credit amount is offered at this time.";

export type Faq = { q: string; a: string[]; pending?: boolean };

export const faqs: Faq[] = [
  {
    q: "Is Fairward a real estate brokerage?",
    a: [
      "Fairward is being developed as a California real estate brokerage that pairs a guided digital experience with licensed professional representation.",
      "Fairward is currently in a private prelaunch phase. Brokerage identity and licensing details will be published here once they are finalized and approved.",
    ],
    pending: true,
  },
  {
    q: "How is Fairward different from FSBO?",
    a: [
      "With a For Sale By Owner approach, you typically handle marketing, showings, offers, negotiation and paperwork on your own.",
      "Fairward is designed so that you can stay closely involved in the routine parts of your sale through a guided platform, while licensed professionals provide representation, advice, negotiation and oversight at the stages that call for it.",
    ],
  },
  {
    q: "Will I still work with a licensed real estate professional?",
    a: [
      "Yes. Licensed professionals are central to the Fairward model. Technology helps with organization and education; it does not replace professional advice, representation or supervision.",
      "The exact scope of professional services will be defined in the selected package and your signed listing agreement.",
    ],
  },
  {
    q: "How can Fairward charge lower fees?",
    a: [
      "Much of the time in a typical sale goes into routine coordination — collecting information, scheduling, reminders and status updates. Fairward is designed to streamline that work through technology, so professional time can be focused where judgment and experience matter most.",
      "Fees are always negotiable, and any savings depend on your situation and the comparison you choose.",
    ],
  },
  {
    q: "What parts of the sale will I manage myself?",
    a: [
      "Sellers are expected to help with tasks such as providing property information, preparing the home for photos and showings, coordinating access, and responding to updates through the dashboard.",
      "The precise division of responsibilities will be documented before you sign anything.",
    ],
    pending: true,
  },
  {
    q: "Does Fairward help with negotiations and contracts?",
    a: [
      "Yes — the proposed service includes licensed professional advice and negotiation, along with review of offers and contract terms. Fairward does not provide legal or tax advice; you may wish to consult an attorney or tax professional for those questions.",
    ],
  },
  {
    q: "Are there additional costs beyond the listing fee?",
    a: [
      "Yes. Selling a home typically involves other expenses, such as any buyer-broker compensation you choose to offer or agree to, escrow and title fees, transfer taxes, repairs or credits, and loan payoff.",
      "Any additional Fairward charges or optional services would be clearly disclosed in writing before you commit.",
    ],
  },
  {
    q: "What happens if my home doesn't sell?",
    a: [
      "Policies for listing terms, cancellation and any fees if a home does not sell have not yet been finalized. They will be clearly explained in the listing agreement before you sign.",
    ],
    pending: true,
  },
  {
    q: "Is Fairward available throughout California?",
    a: [
      "Fairward plans to begin in the Sacramento region and may expand to other California markets over time. Service availability will be confirmed at launch.",
    ],
    pending: true,
  },
  {
    q: "Is my information secure?",
    a: [
      "Information you submit is transmitted over an encrypted connection and stored in an access-restricted database. It is used to respond to your inquiry and is not sold.",
      "You won't receive marketing texts unless you separately opt in, and you can ask us to delete your information at any time.",
    ],
  },
];

export const sellerTimelines = [
  "As soon as possible",
  "Within 3 months",
  "3–6 months",
  "6–12 months",
  "Just exploring",
] as const;

export const sellerStatuses = [
  "Considering Selling",
  "FSBO",
  "Previously Listed",
  "Other",
] as const;

export const sellerInterests = ["Seller Plan", "General Consultation"] as const;

export const buyerTimelines = [
  "Within 3 months",
  "3–6 months",
  "6–12 months",
  "Just exploring",
] as const;

export const buyerRanges = [
  "Under $400,000",
  "$400,000 – $600,000",
  "$600,000 – $800,000",
  "$800,000 – $1,000,000",
  "$1,000,000 – $1,500,000",
  "Over $1,500,000",
] as const;
