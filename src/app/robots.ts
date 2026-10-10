import type { MetadataRoute } from "next";
import { brand, isPrelaunch } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  if (isPrelaunch) return { rules: { userAgent: "*", disallow: "/" } };
  return { rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/api"] }, sitemap: `${brand.url}/sitemap.xml` };
}
