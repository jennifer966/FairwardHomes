import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin, supabaseConfigured } from "@/lib/supabase-admin";
import { analyticsEventNames } from "@/lib/analytics-events";

export const runtime = "nodejs";

const eventSchema = z.object({
  name: z.enum(analyticsEventNames),
  path: z.string().max(300).optional(),
  props: z.record(z.string().max(60), z.union([z.string().max(200), z.number(), z.boolean()])).optional(),
  utm_source: z.string().max(120).optional(),
  utm_medium: z.string().max(120).optional(),
  utm_campaign: z.string().max(160).optional(),
  referrer_host: z.string().max(200).optional(),
});

/**
 * First-party, cookieless analytics sink. Stores no IP address, user agent,
 * or personal identifiers. Only active when NEXT_PUBLIC_ANALYTICS=first-party.
 */
export async function POST(req: Request) {
  if (process.env.NEXT_PUBLIC_ANALYTICS !== "first-party") {
    return new NextResponse(null, { status: 204 });
  }
  const text = await req.text();
  if (text.length > 4000) return new NextResponse(null, { status: 413 });
  let parsed;
  try {
    parsed = eventSchema.safeParse(JSON.parse(text));
  } catch {
    return new NextResponse(null, { status: 400 });
  }
  if (!parsed.success) return new NextResponse(null, { status: 400 });

  if (supabaseConfigured()) {
    const { name, props, ...rest } = parsed.data;
    await supabaseAdmin()
      .from("analytics_events")
      .insert({ name, props: props ?? {}, ...rest })
      .then(({ error }) => error && console.error("[events]", error.message));
  } else if (process.env.NODE_ENV !== "production") {
    console.info("[events]", parsed.data.name, parsed.data.props ?? {});
  }
  return new NextResponse(null, { status: 204 });
}
