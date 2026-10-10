import "server-only";
import { randomUUID } from "node:crypto";
import { appendFile, mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import { consentText, type Lead, type LeadStatus } from "./schema";
import { supabaseAdmin, supabaseConfigured } from "../supabase-admin";

export type LeadRow = {
  id: string;
  created_at: string;
  lead_type: "seller" | "buyer";
  status: LeadStatus;
  is_test: boolean;
  full_name: string;
  email: string;
  phone: string | null;
  property_address: string | null;
  zip: string | null;
  estimated_value: string | null;
  timeline: string | null;
  selling_status: string | null;
  interest: string | null;
  preferred_area: string | null;
  purchase_range: string | null;
  consent_marketing_email: boolean;
  consent_sms: boolean;
  consent_text: Record<string, string>;
  source: string;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
  utm_content: string | null;
  referrer: string | null;
  landing_path: string | null;
  site_mode: string;
  notification_status: string;
};

/** Local development fallback. Never used in production. */
const DEV_FILE = path.join(process.cwd(), ".data", "leads.jsonl");

export function storageMode(): "supabase" | "dev-file" | "unconfigured" {
  if (supabaseConfigured()) return "supabase";
  if (process.env.NODE_ENV !== "production") return "dev-file";
  return "unconfigured";
}

export function toRow(
  lead: Lead,
  opts: { isTest: boolean; siteMode: string },
): Omit<LeadRow, "id" | "created_at" | "status" | "notification_status"> {
  const a = lead.attribution ?? {};
  const consent: Record<string, string> = {};
  if (lead.consentEmailMarketing) consent.email = consentText.email;
  if (lead.consentSms) consent.sms = consentText.sms;
  const isSeller = lead.leadType === "seller";
  return {
    lead_type: lead.leadType,
    is_test: opts.isTest,
    full_name: lead.fullName,
    email: lead.email,
    phone: isSeller ? lead.phone || null : null,
    property_address: isSeller ? lead.propertyAddress : null,
    zip: isSeller ? lead.zip : null,
    estimated_value: isSeller ? lead.estimatedValue || null : null,
    timeline: lead.timeline,
    selling_status: isSeller ? lead.sellingStatus : null,
    interest: isSeller ? lead.interest : null,
    preferred_area: isSeller ? null : lead.preferredArea,
    purchase_range: isSeller ? null : lead.purchaseRange || null,
    consent_marketing_email: lead.consentEmailMarketing,
    // SMS consent only counts when a phone number was actually provided.
    consent_sms: isSeller ? Boolean(lead.consentSms && lead.phone) : false,
    consent_text: consent,
    source: lead.source,
    utm_source: a.utm_source || null,
    utm_medium: a.utm_medium || null,
    utm_campaign: a.utm_campaign || null,
    utm_term: a.utm_term || null,
    utm_content: a.utm_content || null,
    referrer: a.referrer || null,
    landing_path: a.landing_path || null,
    site_mode: opts.siteMode,
  };
}

export async function saveLead(
  row: ReturnType<typeof toRow>,
  notificationStatus: string,
): Promise<{ id: string }> {
  const mode = storageMode();
  if (mode === "supabase") {
    const { data, error } = await supabaseAdmin()
      .from("leads")
      .insert({ ...row, notification_status: notificationStatus })
      .select("id")
      .single();
    if (error) throw new Error(`Lead insert failed: ${error.message}`);
    return { id: data.id as string };
  }
  if (mode === "dev-file") {
    const full: LeadRow = {
      ...row,
      id: randomUUID(),
      created_at: new Date().toISOString(),
      status: "new",
      notification_status: notificationStatus,
    };
    await mkdir(path.dirname(DEV_FILE), { recursive: true });
    await appendFile(DEV_FILE, JSON.stringify(full) + "\n", { mode: 0o600 });
    return { id: full.id };
  }
  throw new Error("Lead storage is not configured.");
}

export async function updateNotificationStatus(id: string, status: string): Promise<void> {
  if (storageMode() !== "supabase") return;
  await supabaseAdmin().from("leads").update({ notification_status: status }).eq("id", id);
}

export async function listLeads(limit = 200): Promise<LeadRow[]> {
  const mode = storageMode();
  if (mode === "supabase") {
    const { data, error } = await supabaseAdmin()
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit);
    if (error) throw new Error(error.message);
    return data as LeadRow[];
  }
  if (mode === "dev-file") {
    try {
      const text = await readFile(DEV_FILE, "utf8");
      const rows = text
        .split("\n")
        .filter(Boolean)
        .map((l) => JSON.parse(l) as LeadRow);
      return rows.reverse().slice(0, limit);
    } catch {
      return [];
    }
  }
  return [];
}

export async function setLeadStatus(id: string, status: LeadStatus): Promise<void> {
  if (storageMode() !== "supabase") {
    throw new Error("Status updates require Supabase storage.");
  }
  const { error } = await supabaseAdmin().from("leads").update({ status }).eq("id", id);
  if (error) throw new Error(error.message);
}
