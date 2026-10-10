"use client";

import { useEffect, useRef } from "react";
import type { AnalyticsEventName } from "@/lib/analytics-events";
import { track } from "@/lib/analytics";

/** Invisible sentinel that fires an analytics event once when scrolled into view. */
export function TrackOnView({ event }: { event: AnalyticsEventName }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        track(event, {}, { once: true });
        io.disconnect();
      }
    });
    io.observe(el);
    return () => io.disconnect();
  }, [event]);
  return <span ref={ref} aria-hidden="true" style={{ display: "block", height: 1 }} />;
}
