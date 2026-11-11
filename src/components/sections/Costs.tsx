import { buyerAgentExplainer, costRows, type CostRow } from "@/config/content";
import { calculatorDefaults, formatUSD, isPrelaunch, localMarket, pricing } from "@/config/site";
import { calculateTransferTax } from "@/lib/transfer-tax";
import { Info } from "../ui/Icons";
import { Reveal } from "../ui/Reveal";
import { TrackOnView } from "../ui/TrackOnView";

/**
 * "What you'll pay": every cost category on a seller's closing statement,
 * who decides each one, and a worked example where a figure can be stated
 * from published rates. Never totals the column, since several lines depend
 * on the individual sale.
 */
export function Costs() {
  const example = calculatorDefaults.salePrice;
  const tax = calculateTransferTax(example, localMarket.transferTax);

  function amount(row: CostRow) {
    switch (row.id) {
      case "listing-fee":
        return (
          <>
            <span className="statement__num">{formatUSD(pricing.listingFee)}</span>
            {isPrelaunch && <small>Proposed</small>}
          </>
        );
      case "transfer-tax":
        return (
          <>
            <span className="statement__num">{formatUSD(tax.insideCity)}</span>
            <small>
              County {formatUSD(tax.county)} + city {formatUSD(tax.city)}
            </small>
          </>
        );
      default:
        return <span className="statement__word">{row.exampleText}</span>;
    }
  }

  return (
    <section className="section section--white" id="costs" aria-labelledby="costs-title">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">What you&apos;ll pay</span>
          <h2 id="costs-title" className="h2">
            Every selling cost, <span className="serif-italic">in plain sight.</span>
          </h2>
          <p className="lede">
            The listing fee is one line on your closing statement. Here is every category to plan for, and who decides
            each one.
          </p>
        </Reveal>
        <TrackOnView event="costs_viewed" />

        <div className="costs-grid">
          <Reveal className="statement">
            <div className="statement__head">
              <span className="general-label">Seller costs</span>
              <span className="general-label statement__head-decides">Who decides</span>
              <span className="general-label statement__head-amount">
                Example: {formatUSD(example)} sale in Sacramento city limits
              </span>
            </div>
            <ol className="statement__rows">
              {costRows.map((row) => (
                <li className="statement__row" key={row.id}>
                  <div className="statement__what">
                    <h3>{row.title}</h3>
                    <p>{row.body}</p>
                  </div>
                  <p className="statement__decides">
                    <span className="statement__label">Who decides: </span>
                    {row.decidedBy}
                  </p>
                  <div className="statement__amount">{amount(row)}</div>
                </li>
              ))}
            </ol>
            <p className="statement__note">
              <Info size={14} />
              <span>
                Illustration only, using published tax rates (checked {localMarket.transferTax.checked}) and no loans
                taken over by the buyer. It is not legal or tax advice, and your escrow company prepares the final
                figures. All brokerage fees are negotiable.
              </span>
            </p>
          </Reveal>

          <Reveal className="explainer" delay={120}>
            <span className="tag tag--dark">Changed in 2024</span>
            <h3 className="h3">{buyerAgentExplainer.title}</h3>
            <ol className="explainer__points">
              {buyerAgentExplainer.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ol>
            <p className="explainer__handoff">{buyerAgentExplainer.handoff}</p>
          </Reveal>
        </div>

        <details className="sources">
          <summary>Sources</summary>
          <ul>
            {localMarket.sources.map((s) => (
              <li key={s.url}>
                <a className="text-link" href={s.url} target="_blank" rel="noopener noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </details>
      </div>
    </section>
  );
}
