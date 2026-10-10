import type { Metadata, Viewport } from "next";
import { DM_Sans, Newsreader } from "next/font/google";
import { brand, compliance, isPrelaunch } from "@/config/site";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  style: ["normal", "italic"],
  weight: ["400", "500"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600"],
  display: "swap",
});

const description =
  "Fairward is a proposed California real estate brokerage pairing a guided digital selling experience with licensed professional representation and a transparent flat listing fee. Starting in Sacramento.";

export const metadata: Metadata = {
  metadataBase: new URL(brand.url),
  title: {
    default: `${brand.name} — Sell smarter. Keep more. | ${brand.tagline.replace(/\.$/, "")}`,
    template: `%s | ${brand.name}`,
  },
  description,
  applicationName: brand.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: brand.url,
    siteName: brand.name,
    title: `${brand.name} — Sell smarter. Keep more.`,
    description,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: `${brand.name} — Sell smarter. Keep more.`, description },
  // Keep the private prelaunch prototype out of search engines.
  robots: isPrelaunch ? { index: false, follow: false } : { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#F5F3ED",
  width: "device-width",
  initialScale: 1,
};

function StructuredData() {
  // Only publish organization data once real, approved brokerage details exist.
  if (isPrelaunch || !compliance.brokerageName) return null;
  const data = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: compliance.brokerageName,
    url: brand.url,
    ...(compliance.businessAddress ? { address: compliance.businessAddress } : {}),
    ...(compliance.contactEmail ? { email: compliance.contactEmail } : {}),
    areaServed: brand.initialMarket,
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${newsreader.variable} ${dmSans.variable} no-js`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
        <StructuredData />
      </body>
    </html>
  );
}
