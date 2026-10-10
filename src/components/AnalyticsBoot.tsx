"use client";

import { useEffect } from "react";
import { captureAttribution } from "@/lib/attribution";
import { track } from "@/lib/analytics";

/**
 * Captures campaign attribution, fires `page_viewed`, and tracks clicks on
 * any element marked with `data-cta` as `primary_cta_clicked`.
 */
export function AnalyticsBoot() {
  useEffect(() => {
    document.documentElement.classList.remove("no-js");
    captureAttribution();
    track("page_viewed", {}, { once: true });

    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-cta]");
      if (!el) return;
      track("primary_cta_clicked", {
        cta: el.dataset.cta ?? "",
        location: el.dataset.ctaLocation ?? "",
      });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
