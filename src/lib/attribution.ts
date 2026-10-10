"use client";

export type Attribution = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  referrer?: string;
  landing_path?: string;
};

const KEY = "fw_attribution";
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;

/**
 * Captures first-touch campaign parameters for this browser session only
 * (sessionStorage — no cookies, cleared when the tab closes).
 */
export function captureAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  try {
    const existing = sessionStorage.getItem(KEY);
    if (existing) return JSON.parse(existing) as Attribution;
  } catch {
    /* storage unavailable */
  }
  const params = new URLSearchParams(window.location.search);
  const a: Attribution = { landing_path: window.location.pathname };
  for (const k of UTM_KEYS) {
    const v = params.get(k);
    if (v) a[k] = v.slice(0, 160);
  }
  if (document.referrer) {
    try {
      const ref = new URL(document.referrer);
      // Store only the referring host, never the full URL (may contain personal data).
      if (ref.host !== window.location.host) a.referrer = ref.host;
    } catch {
      /* ignore malformed referrer */
    }
  }
  try {
    sessionStorage.setItem(KEY, JSON.stringify(a));
  } catch {
    /* storage unavailable */
  }
  return a;
}

export function getAttribution(): Attribution {
  return captureAttribution();
}
