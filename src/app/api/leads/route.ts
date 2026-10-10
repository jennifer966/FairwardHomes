import { NextResponse } from "next/server";
import { leadCapture, siteMode } from "@/config/site";
import { leadSchema } from "@/lib/leads/schema";
import { clientIp, looksAutomated, rateLimited } from "@/lib/leads/spam";
import { saveLead, storageMode, toRow, updateNotificationStatus } from "@/lib/leads/store";
import { emailConfigured, notifyNewLead } from "@/lib/leads/notify";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 8_000;

function json(status: number, body: Record<string, unknown>) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(req: Request) {
  if (leadCapture === "disabled") {
    return json(503, {
      ok: false,
      error: "We're not accepting inquiries yet. Please check back soon.",
    });
  }

  // Same-origin check: browsers always send Origin on cross-site POSTs.
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  if (origin && host && new URL(origin).host !== host) {
    return json(403, { ok: false, error: "Invalid request origin." });
  }

  const raw = await req.text();
  if (raw.length > MAX_BODY_BYTES) return json(413, { ok: false, error: "Request too large." });

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return json(400, { ok: false, error: "Invalid request." });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path.join(".");
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return json(422, { ok: false, error: "Please review the highlighted fields.", fieldErrors });
  }
  const lead = parsed.data;

  if (rateLimited(clientIp(req.headers))) {
    return json(429, { ok: false, error: "Too many submissions. Please try again later." });
  }

  // Quietly accept likely bot submissions without storing them.
  if (looksAutomated(lead)) return json(200, { ok: true });

  if (storageMode() === "unconfigured") {
    console.error("[leads] Storage not configured: set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.");
    return json(503, {
      ok: false,
      error: "We couldn't save your request right now. Please try again later.",
    });
  }

  const isTest = leadCapture === "test";
  try {
    const row = toRow(lead, { isTest, siteMode });
    const { id } = await saveLead(row, emailConfigured() ? "pending" : "not_configured");
    if (emailConfigured()) {
      const status = await notifyNewLead(lead, isTest);
      await updateNotificationStatus(id, status);
    }
    return json(200, { ok: true });
  } catch (err) {
    console.error("[leads] Failed to save lead:", err instanceof Error ? err.message : err);
    return json(500, {
      ok: false,
      error: "Something went wrong saving your request. Please try again.",
    });
  }
}
