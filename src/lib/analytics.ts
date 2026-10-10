"use client";

import type { AnalyticsEventName } from "./analytics-events";
import { getAttribution } from "./attribution";

type Props = Record<string, string | number | boolean>;

/**
 * Privacy-conscious analytics dispatcher.
 *
 * Providers (NEXT_PUBLIC_ANALYTICS):
 * - "none" (default): events are only logged to the console in development.
 * - "first-party": cookieless events posted to /api/events (no IP or PII stored).
 *
 * Every event is also pushed to `window.dataLayer` *only* if a consent-gated
 * third-party integration sets `window.__fwAnalyticsConsent = true`. No
 * third-party tracking is loaded by this codebase.
 */
const provider = process.env.NEXT_PUBLIC_ANALYTICS ?? "none";

declare global {
  interface Window {
    dataLayer?: unknown[];
    __fwAnalyticsConsent?: boolean;
  }
}

const once = new Set<string>();

export function track(name: AnalyticsEventName, props: Props = {}, opts: { once?: boolean } = {}) {
  if (typeof window === "undefined") return;
  if (opts.once) {
    if (once.has(name)) return;
    once.add(name);
  }

  if (window.__fwAnalyticsConsent && Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event: name, ...props });
  }

  if (provider === "first-party") {
    const a = getAttribution();
    const payload = JSON.stringify({
      name,
      path: window.location.pathname,
      props,
      utm_source: a.utm_source,
      utm_medium: a.utm_medium,
      utm_campaign: a.utm_campaign,
      referrer_host: a.referrer,
    });
    try {
      if (!navigator.sendBeacon?.("/api/events", new Blob([payload], { type: "application/json" }))) {
        void fetch("/api/events", { method: "POST", body: payload, keepalive: true });
      }
    } catch {
      /* analytics must never break the page */
    }
  } else if (process.env.NODE_ENV === "development") {
    console.debug("[analytics]", name, props);
  }
}
