import "server-only";
import { createHash } from "node:crypto";

/** Submissions faster than this after the form rendered are treated as automated. */
const MIN_FILL_MS = 2500;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

const hits = new Map<string, number[]>();

/** Hashes the client IP so raw addresses are never retained in memory or logs. */
function fingerprint(ip: string): string {
  const salt = process.env.RATE_LIMIT_SALT ?? "fairward";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex").slice(0, 32);
}

export function clientIp(headers: Headers): string {
  return (
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headers.get("x-real-ip") ||
    "unknown"
  );
}

/**
 * Best-effort, per-instance rate limit. On multi-instance or serverless
 * hosting, pair this with a platform-level limit (e.g. a WAF rule).
 */
export function rateLimited(ip: string, now = Date.now()): boolean {
  const key = fingerprint(ip);
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
  }
  return recent.length > MAX_PER_WINDOW;
}

export function looksAutomated(input: { website?: string; startedAt: number }, now = Date.now()) {
  if (input.website && input.website.trim() !== "") return true;
  const elapsed = now - input.startedAt;
  return elapsed < MIN_FILL_MS || elapsed > 24 * 60 * 60 * 1000;
}
