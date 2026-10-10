import { z } from "zod";
import {
  buyerRanges,
  buyerTimelines,
  sellerInterests,
  sellerStatuses,
  sellerTimelines,
} from "../../config/content";

const trimmed = (max: number) => z.string().trim().max(max);

const attribution = z
  .object({
    utm_source: trimmed(120).optional(),
    utm_medium: trimmed(120).optional(),
    utm_campaign: trimmed(160).optional(),
    utm_term: trimmed(160).optional(),
    utm_content: trimmed(160).optional(),
    referrer: trimmed(300).optional(),
    landing_path: trimmed(300).optional(),
  })
  .partial()
  .default({});

/** Fields shared by every form for spam prevention and attribution. */
const meta = {
  /** Honeypot: must stay empty. Hidden from people, often filled by bots. */
  website: z.string().max(200).optional().default(""),
  /** Client timestamp (ms) when the form was first rendered. */
  startedAt: z.number().int().nonnegative(),
  source: trimmed(80).optional().default("landing"),
  attribution,
  consentEmailMarketing: z.boolean().default(false),
  consentSms: z.boolean().default(false),
};

const name = trimmed(120).min(2, "Please enter your name.");
const email = z.email("Please enter a valid email address.").trim().max(254).toLowerCase();

export const sellerLeadSchema = z.object({
  leadType: z.literal("seller"),
  fullName: name,
  email,
  phone: trimmed(32)
    .regex(/^[0-9+().\-\s]*$/, "Please enter a valid phone number.")
    .optional()
    .or(z.literal("")),
  propertyAddress: trimmed(200).min(5, "Please enter the property address."),
  zip: z
    .string()
    .trim()
    .regex(/^\d{5}(-\d{4})?$/, "Please enter a valid ZIP code."),
  estimatedValue: trimmed(40).optional().or(z.literal("")),
  timeline: z.enum(sellerTimelines, { message: "Please choose a timeline." }),
  sellingStatus: z.enum(sellerStatuses, { message: "Please choose your current status." }),
  interest: z.enum(sellerInterests).default("Seller Plan"),
  ...meta,
});

export const buyerLeadSchema = z.object({
  leadType: z.literal("buyer"),
  fullName: name,
  email,
  preferredArea: trimmed(120).min(2, "Please enter a preferred area."),
  purchaseRange: z.enum(buyerRanges).optional().or(z.literal("")),
  timeline: z.enum(buyerTimelines, { message: "Please choose a timeline." }),
  ...meta,
});

export const leadSchema = z.discriminatedUnion("leadType", [sellerLeadSchema, buyerLeadSchema]);

export type SellerLead = z.infer<typeof sellerLeadSchema>;
export type BuyerLead = z.infer<typeof buyerLeadSchema>;
export type Lead = z.infer<typeof leadSchema>;

export const leadStatuses = ["new", "contacted", "qualified", "not_a_fit", "archived"] as const;
export type LeadStatus = (typeof leadStatuses)[number];

/** Consent language snapshotted with each lead so the record shows what was agreed to. */
export const consentText = {
  email:
    "Send me occasional email updates about Fairward, including launch news. I can unsubscribe at any time.",
  sms: "Send me text messages about Fairward updates. Message and data rates may apply. Reply STOP to opt out. Consent is not a condition of any service.",
} as const;
