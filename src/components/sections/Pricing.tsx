import { formatUSD, isPrelaunch, pricing } from "@/config/site";
import { ArrowRight, Check } from "../ui/Icons";
import { Reveal } from "../ui/Reveal";
import { TrackOnView } from "../ui/TrackOnView";

export function Pricing() {
  const [dollars] = formatUSD(pricing.listingFee).replace("$", "").split(".");
  return (
    <section className="section" id="pricing" aria-labelledby="pricing-title">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Seller pricing</span>
          <h2 id="pricing-title" className="h2">
            Transparent pricing. <span className="serif-italic">Thoughtfully designed.</span>
          </h2>
        </Reveal>
        <TrackOnView event="pricing_viewed" />

        <div className="pricing">
          <Reveal className="price-card">
            <div className="price-card__top">
              <h3 className="h3">{pricing.packageName}</h3>
              {isPrelaunch && <span className="tag tag--copper">{pricing.prelaunchLabel}</span>}
            </div>
            <div>
              <div className="price">
                <span className="price__amount">
                  <sup>$</sup>
                  {dollars}
                </span>
                <span className="price__unit">flat listing fee</span>
              </div>
              {pricing.paymentTiming && <p className="field__hint">{pricing.paymentTiming}</p>}
            </div>
            <p className="lede" style={{ fontSize: "1.05rem" }}>
              {pricing.summary}
            </p>
            <div>
              <p className="general-label" style={{ marginBottom: 14 }}>
                {isPrelaunch ? "Proposed service highlights" : "Service highlights"}
              </p>
              <ul className="inclusions">
                {pricing.inclusions.map((item) => (
                  <li key={item}>
                    <Check />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <a className="btn" href="#get-started" data-cta="Request a Selling Plan" data-cta-location="pricing">
                Request a Selling Plan <ArrowRight />
              </a>
            </div>
          </Reveal>

          <Reveal className="price-aside" delay={120}>
            <div className="note-card">
              <h3>Separate costs</h3>
              <p>{pricing.separateCostsNote}</p>
            </div>
            <div className="note-card">
              <h3>Fees are negotiable</h3>
              <p>
                All brokerage fees are negotiable and are not set by law. Your fee, services, and responsibilities will be
                documented in a written listing agreement before you commit.
              </p>
            </div>
            {isPrelaunch && (
              <div className="note-card">
                <h3>Prelaunch notice</h3>
                <p>
                  Pricing and inclusions shown are proposals for a pilot program and remain subject to final approval.
                  Payment timing and service limitations will be confirmed in final service terms.
                </p>
              </div>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
