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
    body: "See which updates are most likely to pay off, organize your property information, and build your marketing with AI tools, with licensed review of pricing and anything that goes public.",
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
    id: "worth-updating",
    question: "Which updates are worth doing before I sell?",
    answer: {
      intro: "In general, the updates that tend to pay off before a sale are the ones buyers notice in photos and inspections:",
      points: [
        "Fix what an inspector would flag first: leaks, broken fixtures, safety items and deferred maintenance.",
        "Fresh, light neutral paint and updated lighting are usually low cost and visible in every photo.",
        "Curb appeal sets the cover photo: trim landscaping, repair fences, refresh the front door.",
        "Large remodels such as a full kitchen often cost more than they add, and many buyers prefer to choose their own finishes.",
        "In your plan, the Prep & ROI Advisor turns this into a ranked list for your home, with estimated costs.",
      ],
      handoff:
        "How an update could affect your list price is a pricing judgment your licensed professional confirms with recent comparable sales before you spend.",
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
      criterion: "AI prep and marketing tools",
      cells: [
        { text: "Seller finds and pays for their own tools", level: "limited" },
        { text: "Varies by brokerage and agent", level: "partial" },
        { text: "Update ROI advisor and Marketing Studio, with licensed review", level: "strong" },
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

/**
 * AI Prep & Marketing Studio section. Everything in the two mockups is
 * sample data and is labeled as such on the page. Rules for this copy:
 * - Never promise a return, a sale price or "maximum" results.
 * - Pricing effects are confirmed by a licensed professional, never by AI.
 * - Nothing goes public without seller and broker approval.
 */
export type PrepItem = {
  item: string;
  cost: string;
  potential: "High" | "Medium" | "Low";
  call: "Do first" | "Worth considering" | "Skip";
  why: string;
};

export const aiStudio = {
  prep: {
    title: "Prep & ROI Advisor",
    body: "Walk through your home with your phone. AI reviews every room, then ranks the updates most likely to pay off before you list, with estimated costs, and flags the ones that probably won't.",
    source: "From 46 photos and a 5-minute questionnaire",
    items: [
      {
        item: "Repaint main living areas in a light neutral",
        cost: "$2,800–$4,200",
        potential: "High",
        call: "Do first",
        why: "Bold colors show in 9 of 14 listing photos",
      },
      {
        item: "Replace 5 dated light fixtures",
        cost: "$600–$1,100",
        potential: "High",
        call: "Do first",
        why: "Low cost, visible in most rooms",
      },
      {
        item: "Repair side fence; refresh front planting",
        cost: "$900–$1,800",
        potential: "Medium",
        call: "Worth considering",
        why: "Sets the cover photo and first impression",
      },
      {
        item: "Full kitchen remodel",
        cost: "$45,000+",
        potential: "Low",
        call: "Skip",
        why: "Likely to cost more than it adds; buyers may prefer their own choices",
      },
    ] as PrepItem[],
    review: "Your licensed professional checks the likely price effect against recent comparable sales before you spend.",
  },
  marketing: {
    title: "Marketing Studio",
    body: "Turn your photos, facts and walkthrough into a complete campaign: listing copy, staged and original photos, a floor plan, video and social posts, all from one library.",
    draftLabel: "Listing description · draft",
    draft:
      "Light pours through south-facing windows in this updated three-bedroom home, with a refreshed kitchen that opens to a shaded backyard patio.",
    facts: ["3 bd · 2 ba · 1,840 sq ft (county record)", "South-facing living room", "Kitchen updated 2022 (receipts)"],
    assets: [
      { label: "Photo review", value: "32 photos checked" },
      { label: "Virtual staging", value: "Labeled · originals linked" },
      { label: "Floor plan", value: "Draft measurements" },
      { label: "Video", value: "Wide and vertical cuts" },
      { label: "Social and email", value: "6 posts ready to review" },
      { label: "Property page", value: "With QR flyer" },
    ],
    stages: ["AI draft", "You approve", "Broker review", "Published"],
    currentStage: 2,
  },
  roles: [
    {
      who: "AI does the heavy lifting",
      body: "Reviews every room, estimates update costs, drafts listing copy from verified facts, stages photos, cuts video, builds social posts, and checks drafts for privacy issues and fair-housing language.",
    },
    {
      who: "You stay in control",
      body: "You choose which updates to make, approve every fact and image, and decide what goes into your campaign.",
    },
    {
      who: "Licensed professionals sign off",
      body: "They review anything that affects your price, and approve every public listing and ad with the required brokerage and altered-photo disclosures.",
    },
  ],
} as const;

/**
 * "What you'll pay" section. One row per cost category on a seller's closing
 * statement. `example` is filled in by the component where a number can be
 * stated honestly; otherwise `exampleText` explains where the figure comes from.
 */
export type CostRow = {
  id: "listing-fee" | "buyer-agent" | "transfer-tax" | "escrow-title" | "other";
  title: string;
  body: string;
  decidedBy: string;
  exampleText?: string;
};

export const costRows: CostRow[] = [
  {
    id: "listing-fee",
    title: "Fairward listing fee",
    body: "Our proposed flat fee for listing, marketing preparation, showing coordination, offer review, negotiation and brokerage supervision.",
    decidedBy: "Your listing agreement",
  },
  {
    id: "buyer-agent",
    title: "Buyer's agent compensation",
    body: "What the buyer's own agent is paid. The buyer agrees to it with their agent, and may ask you to cover some or all of it in their offer.",
    decidedBy: "You, if a buyer asks",
    exampleText: "Your choice",
  },
  {
    id: "transfer-tax",
    title: "Transfer taxes",
    body: "Charged by the county, plus the city inside Sacramento city limits, when the deed records.",
    decidedBy: "Set by law; who pays is in the contract",
  },
  {
    id: "escrow-title",
    title: "Escrow and title",
    body: "Escrow services, the owner's title insurance policy and recording. Customs and quotes vary by company.",
    decidedBy: "Your contract and the companies' quotes",
    exampleText: "Quoted for your sale",
  },
  {
    id: "other",
    title: "Repairs, credits and payoffs",
    body: "Any repairs or credits you agree to with the buyer, your mortgage payoff, and prorated property taxes or HOA dues.",
    decidedBy: "Your negotiation and your lender",
    exampleText: "Depends on your sale",
  },
];

export const buyerAgentExplainer = {
  title: "Who pays the buyer's agent now?",
  points: [
    "Since August 17, 2024, offers to pay buyers' agents can no longer be posted on the MLS.",
    "In California, buyers now sign a written agreement with their own agent that sets the agent's pay, no later than when they make an offer. Many agents ask for it before the first tour.",
    "A buyer may ask you to cover some or all of that pay as part of their offer. You can accept, counter or say no. You can also decide ahead of time whether you're open to it.",
  ],
  handoff:
    "Whether to offer it, and how much, is a pricing and strategy decision you'll make with your licensed professional. All compensation is negotiable and not set by law.",
} as const;

/** "Selling in Sacramento" section: local differences sellers should plan for. */
export const localNotes = [
  {
    title: "City limits change your transfer tax",
    body: "Sacramento County charges $1.10 per $1,000 of the sale price. Inside Sacramento city limits, the city adds $2.75 per $1,000. It's the only city in the county with its own transfer tax, and a Sacramento mailing address doesn't always mean city limits.",
  },
  {
    title: "Rivers and levees mean hazard disclosures",
    body: "Much of the region sits near the Sacramento and American rivers. California requires a Natural Hazard Disclosure when a home is in a mapped flood zone, dam inundation area, fire hazard zone or earthquake zone. Getting the report early puts the findings in front of buyers before they make offers.",
  },
  {
    title: "Newer neighborhoods may carry special taxes",
    body: "Many newer communities pay for roads, schools and parks through Mello-Roos (Community Facilities District) taxes or assessment bonds. Sellers must make a good-faith effort to get the official notice for each one and give it to the buyer.",
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
    q: "How will Fairward use AI to prepare and market my home?",
    a: [
      "Two tools are in development. The Prep & ROI Advisor reviews photos of every room and your answers to a short questionnaire, then ranks the updates most likely to pay off before you list, with estimated costs, and flags the ones that probably won't. The Marketing Studio drafts your listing copy from verified facts, reviews and stages photos, and builds a floor plan, video, social posts and a property page.",
      "AI does the analysis and drafting; you decide what to do and approve every draft. A licensed professional reviews anything that affects your price and approves every public listing and ad. Virtually staged or edited photos are labeled, with the originals available, as California law requires. Estimates are not appraisals, and no tool can promise a return on an update.",
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
    q: "Do I have to pay the buyer's agent?",
    a: [
      "Not automatically. Buyers now sign a written agreement with their own agent that sets what that agent is paid. A buyer may ask you to cover some or all of it as part of their offer, and you can accept, counter or decline, just as with any other term.",
      "Offering to pay can widen your pool of buyers, and declining keeps more of your proceeds. Your licensed professional will walk through that trade-off with you for your home and market. All compensation is negotiable and not set by law.",
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
