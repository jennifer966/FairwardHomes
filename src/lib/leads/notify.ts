import "server-only";
import type { Lead } from "./schema";

export function emailConfigured(): boolean {
  return Boolean(
    process.env.RESEND_API_KEY &&
      process.env.LEAD_NOTIFICATION_TO &&
      process.env.LEAD_NOTIFICATION_FROM,
  );
}

/**
 * Sends an internal new-lead notification via Resend when configured.
 * Returns the resulting notification status stored with the lead.
 * The notification intentionally omits most personal details; staff
 * review the full record in the protected lead view.
 */
export async function notifyNewLead(lead: Lead, isTest: boolean): Promise<string> {
  if (!emailConfigured()) return "not_configured";
  const subject = `${isTest ? "[TEST] " : ""}New ${lead.leadType} inquiry — Fairward`;
  const lines = [
    `Lead type: ${lead.leadType}`,
    `Name: ${lead.fullName}`,
    `Timeline: ${lead.timeline}`,
    lead.leadType === "seller" ? `ZIP: ${lead.zip}` : `Preferred area: ${lead.preferredArea}`,
    "",
    "Review the full record in the internal lead view (/admin/leads).",
  ];
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.LEAD_NOTIFICATION_FROM,
        to: process.env.LEAD_NOTIFICATION_TO!.split(",").map((s) => s.trim()),
        subject,
        text: lines.join("\n"),
      }),
    });
    return res.ok ? "sent" : `failed_${res.status}`;
  } catch {
    return "failed_network";
  }
}
