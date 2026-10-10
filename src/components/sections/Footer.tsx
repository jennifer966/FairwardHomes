import Link from "next/link";
import { brand, compliance, isPrelaunch, siteMode } from "@/config/site";
import { EqualHousing } from "../ui/Icons";
import { Wordmark } from "../ui/Wordmark";

function Value({ v }: { v: string | null }) {
  return v ? <>{v}</> : <span className="tbd">To be provided</span>;
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer on-dark">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Wordmark tone="light" />
            <p className="footer-tagline">{brand.tagline.replace(/\.$/, "")}</p>
            <p>{brand.domain}</p>
          </div>
          <nav className="footer-col" aria-labelledby="footer-explore">
            <h2 id="footer-explore">Explore</h2>
            <ul>
              <li>
                <Link href="/#sell">Sell</Link>
              </li>
              <li>
                <Link href="/#buy">Buy</Link>
              </li>
              <li>
                <Link href="/#how-it-works">How It Works</Link>
              </li>
              <li>
                <Link href="/#pricing">Pricing</Link>
              </li>
              <li>
                <a href={compliance.contactEmail ? `mailto:${compliance.contactEmail}` : "/#get-started"}>Contact</a>
              </li>
            </ul>
          </nav>
          <nav className="footer-col" aria-labelledby="footer-legal">
            <h2 id="footer-legal">Legal</h2>
            <ul>
              <li>
                <Link href="/privacy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms">Terms</Link>
              </li>
              <li>
                <Link href="/accessibility">Accessibility</Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="compliance" aria-label="Brokerage licensing and advertising disclosures">
          <div style={{ display: "grid", gap: 14 }}>
            {isPrelaunch && (
              <p>
                <strong style={{ color: "var(--copper-light)" }}>Prelaunch concept.</strong> Fairward is an emerging
                concept in private prelaunch review. It is not yet offering brokerage services to the public, and
                nothing on this site is an offer of brokerage services. Names, pricing, services, and terms are
                proposals subject to final approval.
              </p>
            )}
            <dl>
              <dt>Brokerage</dt>
              <dd>
                <Value v={compliance.brokerageName} />
              </dd>
              <dt>Entity</dt>
              <dd>
                <Value v={compliance.legalEntityName} />
              </dd>
              <dt>Responsible broker</dt>
              <dd>
                <Value v={compliance.responsibleBrokerName} />
              </dd>
              <dt>Broker DRE #</dt>
              <dd>
                <Value v={compliance.responsibleBrokerDreNumber} />
              </dd>
              {compliance.corporationDreNumber && (
                <>
                  <dt>Corporation DRE #</dt>
                  <dd>{compliance.corporationDreNumber}</dd>
                </>
              )}
              <dt>Office</dt>
              <dd>
                <Value v={compliance.businessAddress} />
              </dd>
            </dl>
            <p>
              All brokerage commissions and fees are negotiable and are not set by law. Fee comparisons on this site are
              illustrative only. Fairward does not provide legal or tax advice.
            </p>
            {compliance.additionalDisclosures.map((d) => (
              <p key={d}>{d}</p>
            ))}
          </div>
          <div className="eho">
            <EqualHousing />
            <p>
              Equal Housing Opportunity. Fairward is committed to complying with federal, state, and local fair housing
              laws, including the Fair Housing Act and California&apos;s Fair Employment and Housing Act. We do not
              discriminate on the basis of any protected characteristic.
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © {year} {compliance.legalEntityName ?? brand.name}. All rights reserved.
          </span>
          <span>{siteMode === "prelaunch" ? "Private prelaunch preview" : brand.domain}</span>
        </div>
      </div>
    </footer>
  );
}
