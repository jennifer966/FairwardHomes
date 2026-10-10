"use client";

import { useId, useMemo, useRef, useState } from "react";
import { calculatorDefaults as d, formatUSD, isPrelaunch, pricing } from "@/config/site";
import { calculateSavings } from "@/lib/savings";
import { track } from "@/lib/analytics";
import { ArrowRight, Info } from "../ui/Icons";
import { Reveal } from "../ui/Reveal";

export const PREFILL_EVENT = "fw:prefill-seller";

function pct(value: number, min: number, max: number) {
  return `${((value - min) / (max - min)) * 100}%`;
}

export function SavingsCalculator() {
  const id = useId();
  const [price, setPrice] = useState<number>(d.salePrice);
  const [priceText, setPriceText] = useState<string>(d.salePrice.toLocaleString("en-US"));
  const [percent, setPercent] = useState<number>(d.comparisonPercent);
  const used = useRef(false);

  const r = useMemo(
    () => calculateSavings({ salePrice: price, comparisonPercent: percent, fairwardFee: pricing.listingFee }),
    [price, percent],
  );

  const markUsed = () => {
    if (used.current) return;
    used.current = true;
    track("calculator_used", {}, { once: true });
  };

  const setPriceValue = (v: number) => {
    const clamped = Math.min(Math.max(Math.round(v), 0), 100_000_000);
    setPrice(clamped);
    setPriceText(clamped.toLocaleString("en-US"));
    markUsed();
  };

  const onPriceText = (raw: string) => {
    const digits = raw.replace(/[^\d]/g, "").slice(0, 9);
    const n = digits ? Number(digits) : 0;
    setPriceText(digits ? n.toLocaleString("en-US") : "");
    setPrice(n);
    markUsed();
  };

  const maxFee = Math.max(r.comparisonFee, r.fairwardFee, 1);
  const feeLabel = isPrelaunch ? pricing.prelaunchLabel : "Fairward listing fee";

  const onCta = () => {
    window.dispatchEvent(new CustomEvent(PREFILL_EVENT, { detail: { estimatedValue: price } }));
  };

  return (
    <section className="section section--white" id="savings" aria-labelledby="savings-title">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Savings calculator</span>
          <h2 id="savings-title" className="h2">
            Your equity deserves a <span className="serif-italic">better deal.</span>
          </h2>
          <p className="lede">See how a more efficient brokerage model could change what you pay to sell.</p>
        </Reveal>

        <Reveal className="calc">
          <div className="calc__panel">
            <div className="field">
              <div className="field__head">
                <label className="field__label" htmlFor={`${id}-price`}>
                  Estimated home sale price
                </label>
              </div>
              <div className="money-input">
                <span aria-hidden="true">$</span>
                <input
                  id={`${id}-price`}
                  inputMode="numeric"
                  autoComplete="off"
                  value={priceText}
                  onChange={(e) => onPriceText(e.target.value)}
                  onBlur={() => setPriceText(price.toLocaleString("en-US"))}
                  aria-describedby={`${id}-price-hint`}
                />
              </div>
              <input
                type="range"
                className="range"
                min={d.salePriceMin}
                max={d.salePriceMax}
                step={d.salePriceStep}
                value={Math.min(Math.max(price, d.salePriceMin), d.salePriceMax)}
                onChange={(e) => setPriceValue(Number(e.target.value))}
                aria-label="Estimated home sale price slider"
                aria-valuetext={formatUSD(price)}
                style={{ "--pct": pct(Math.min(Math.max(price, d.salePriceMin), d.salePriceMax), d.salePriceMin, d.salePriceMax) } as React.CSSProperties}
              />
              <div className="range-scale" aria-hidden="true">
                <span>{formatUSD(d.salePriceMin)}</span>
                <span>{formatUSD(d.salePriceMax)}+</span>
              </div>
              <p id={`${id}-price-hint`} className="sr-only">
                Type any amount or use the slider.
              </p>
            </div>

            <div className="field">
              <div className="field__head">
                <label className="field__label" htmlFor={`${id}-pct`}>
                  Hypothetical comparison listing fee
                </label>
                <span className="pct-value" aria-hidden="true">
                  {percent.toFixed(2)}%
                </span>
              </div>
              <input
                id={`${id}-pct`}
                type="range"
                className="range"
                min={d.comparisonPercentMin}
                max={d.comparisonPercentMax}
                step={d.comparisonPercentStep}
                value={percent}
                onChange={(e) => {
                  setPercent(Number(e.target.value));
                  markUsed();
                }}
                aria-valuetext={`${percent.toFixed(2)} percent`}
                aria-describedby={`${id}-pct-note`}
                style={{ "--pct": pct(percent, d.comparisonPercentMin, d.comparisonPercentMax) } as React.CSSProperties}
              />
              <div className="range-scale" aria-hidden="true">
                <span>{d.comparisonPercentMin}%</span>
                <span>{d.comparisonPercentMax}%</span>
              </div>
              <p id={`${id}-pct-note`} className="assumption-note">
                This is your own assumption for comparison — adjust it to match a quote you&apos;ve received. It does
                not represent a standard, typical, or required commission rate.
              </p>
            </div>

            <div className="field">
              <div className="fee-fixed">
                <div>
                  <div className="field__label">Proposed Fairward listing fee</div>
                  <div className="field__hint">Flat fee{isPrelaunch ? " · provisional, subject to final approval" : ""}</div>
                </div>
                <div style={{ display: "grid", justifyItems: "end", gap: 6 }}>
                  <span className="amount">{formatUSD(pricing.listingFee)}</span>
                  {isPrelaunch && <span className="tag tag--copper">{pricing.prelaunchLabel}</span>}
                </div>
              </div>
            </div>
          </div>

          <div className="calc__panel calc__panel--results on-dark" aria-labelledby={`${id}-results`}>
            <div className="results__headline">
              <span className="results__label" id={`${id}-results`}>
                Potential listing-fee savings
              </span>
              <output className="results__big" aria-live="polite" htmlFor={`${id}-price ${id}-pct`}>
                {formatUSD(r.savings)}
              </output>
              <span className="results__sub">
                About {r.savingsPercentOfComparison}% of the hypothetical comparison fee
              </span>
            </div>

            <div className="bars" role="img" aria-label={`Bar comparison: hypothetical comparison fee ${formatUSD(r.comparisonFee)} versus proposed Fairward fee ${formatUSD(r.fairwardFee)}`}>
              <div>
                <div className="bar__meta">
                  <span>Hypothetical comparison fee ({percent.toFixed(2)}%)</span>
                  <b>{formatUSD(r.comparisonFee)}</b>
                </div>
                <div className="bar__track">
                  <div className="bar__fill bar__fill--comparison" style={{ width: `${(r.comparisonFee / maxFee) * 100}%` }} />
                </div>
              </div>
              <div>
                <div className="bar__meta">
                  <span>{feeLabel}</span>
                  <b>{formatUSD(r.fairwardFee)}</b>
                </div>
                <div className="bar__track">
                  <div className="bar__fill bar__fill--fairward" style={{ width: `${(r.fairwardFee / maxFee) * 100}%` }} />
                </div>
              </div>
            </div>

            <dl className="results__table">
              <div>
                <dt>Estimated sale price</dt>
                <dd>{formatUSD(r.salePrice)}</dd>
              </div>
              <div>
                <dt>Hypothetical comparison listing fee</dt>
                <dd>{formatUSD(r.comparisonFee)}</dd>
              </div>
              <div>
                <dt>Proposed Fairward listing fee</dt>
                <dd>{formatUSD(r.fairwardFee)}</dd>
              </div>
              <div className="is-accent">
                <dt>Potential listing-fee savings</dt>
                <dd>{formatUSD(r.savings)}</dd>
              </div>
              <div>
                <dt>Savings as % of comparison fee</dt>
                <dd>{r.savingsPercentOfComparison}%</dd>
              </div>
            </dl>
          </div>
        </Reveal>

        <p className="disclaimer" role="note">
          <Info />
          <span>
            <strong>Illustrative comparison only.</strong> Brokerage commissions are negotiable and not set by law.
            Actual fees and services depend on the applicable brokerage agreement. Savings assume the same sale price and
            exclude buyer-broker compensation, concessions, other selling expenses, and closing costs.
          </span>
        </p>

        <div className="calc__cta">
          <a className="btn" href="#get-started" onClick={onCta} data-cta="Get My Personalized Selling Plan" data-cta-location="calculator">
            Get My Personalized Selling Plan <ArrowRight />
          </a>
        </div>
      </div>
    </section>
  );
}
