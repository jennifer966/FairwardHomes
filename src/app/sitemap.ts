import type { MetadataRoute } from "next";
import { brand, isPrelaunch } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  if (isPrelaunch) return [];
  return ["", "/privacy", "/terms", "/accessibility"].map((p) => ({ url: `${brand.url}${p}`, changeFrequency: "monthly" }));
}
