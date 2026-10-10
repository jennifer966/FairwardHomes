import { formatUSD, imagery, pricing } from "@/config/site";
import { calculateSavings } from "@/lib/savings";
import { ArchImage } from "../ui/ArchImage";
import { Check } from "../ui/Icons";

/**
 * Illustrative concept of the Fairward seller dashboard. All data shown is
 * sample content for demonstration — not a real property or transaction.
 */
export function HeroDashboard() {
  const sample = calculateSavings({ salePrice: 600_000, comparisonPercent: 2.5, fairwardFee: pricing.listingFee });
  return (
    <figure className="dash" aria-label="Illustrative concept of the Fairward seller dashboard, showing sample data">
      <div className="dash__window">
        <div className="dash__bar">
          <div className="dash__bar-left">
            <span className="dash__dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span className="dash__crumb">
              My sale · <b>Overview</b>
            </span>
          </div>
          <span className="tag">Sample data</span>
        </div>

        <div className="dash__body">
          <div className="dash__row">
            <section className="card" aria-label="Property overview">
              <div className="card__label">Property</div>
              <div className="prop">
                <div className="prop__img">
                  <ArchImage src={imagery.heroProperty.src} alt={imagery.heroProperty.alt} sizes="96px" />
                </div>
                <div>
                  <div className="prop__addr">1234 Sample Lane</div>
                  <div className="prop__meta">Sacramento, CA · 3 bd · 2 ba · 1,840 sq ft</div>
                </div>
              </div>
            </section>

            <section className="card" aria-label="Listing preparation progress">
              <div className="card__label">
                Listing preparation <span style={{ color: "var(--navy)" }}>72%</span>
              </div>
              <div className="progress" role="img" aria-label="72 percent complete">
                <span style={{ width: "72%" }} />
              </div>
              <ul className="prep-list">
                <li>
                  <span className="check">
                    <Check size={10} />
                  </span>
                  Property details
                </li>
                <li>
                  <span className="check">
                    <Check size={10} />
                  </span>
                  Photography scheduled
                </li>
                <li className="is-pending">
                  <span className="check check--pending" />
                  Seller disclosures
                </li>
              </ul>
            </section>
          </div>

          <div className="dash__row">
            <section className="card" aria-label="Upcoming milestones">
              <div className="card__label">Upcoming milestones</div>
              <ul className="milestones">
                <li>
                  <span className="date">
                    <small>Mar</small>14
                  </span>
                  <span>
                    <span className="what">Pricing review</span>
                    <br />
                    <span className="who">With your licensed broker</span>
                  </span>
                </li>
                <li>
                  <span className="date">
                    <small>Mar</small>18
                  </span>
                  <span>
                    <span className="what">MLS listing goes live</span>
                    <br />
                    <span className="who">After broker approval</span>
                  </span>
                </li>
                <li>
                  <span className="date">
                    <small>Mar</small>22
                  </span>
                  <span>
                    <span className="what">First open house</span>
                    <br />
                    <span className="who">Showing schedule ready</span>
                  </span>
                </li>
              </ul>
            </section>

            <section className="card" aria-label="Assistant conversation preview">
              <div className="card__label">
                Assistant <span className="tag" style={{ padding: "2px 8px" }}>General info</span>
              </div>
              <div className="chat">
                <div className="bubble bubble--user">Which disclosures do I still need?</div>
                <div className="bubble bubble--ai">
                  Two items remain on your checklist. I&apos;ve flagged them for review by your broker.
                </div>
              </div>
            </section>
          </div>

          <div className="dash__row">
            <section className="card" aria-label="Broker review status">
              <div className="card__label">Licensed review</div>
              <div className="status-row">
                <span>List price recommendation</span>
                <span className="pill pill--review">In review</span>
              </div>
              <div className="status-row">
                <span>Listing description</span>
                <span className="pill pill--done">Approved</span>
              </div>
            </section>

            <section className="card" aria-label="Estimated selling costs">
              <div className="card__label">Estimated selling costs</div>
              <div className="costs">
                <div>
                  Listing fee (proposed) <b>{formatUSD(pricing.listingFee)}</b>
                </div>
                <div>
                  Escrow &amp; title <b>Est. pending</b>
                </div>
                <div>
                  Transfer tax <b>Est. pending</b>
                </div>
                <div className="costs__total">
                  Net sheet <b>Draft</b>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <div className="dash__float" aria-hidden="true">
        <small>Illustrative listing-fee difference</small>
        <div className="num">{formatUSD(sample.savings)}</div>
        <small>at $600k vs. a hypothetical 2.5% fee</small>
      </div>

      <figcaption className="dash__caption">Product concept shown with sample data. Features in development.</figcaption>
    </figure>
  );
}
