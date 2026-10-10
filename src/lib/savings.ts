export type SavingsInput = {
  salePrice: number;
  /** Hypothetical comparison listing-fee percentage, e.g. 2.5 for 2.5%. */
  comparisonPercent: number;
  /** Proposed Fairward flat listing fee in dollars. */
  fairwardFee: number;
};

export type SavingsResult = {
  salePrice: number;
  comparisonFee: number;
  fairwardFee: number;
  /** Never negative: if the flat fee exceeds the comparison fee, savings are 0. */
  savings: number;
  /** Savings as a percentage (0–100) of the hypothetical comparison fee. */
  savingsPercentOfComparison: number;
};

function clean(n: number): number {
  return Number.isFinite(n) && n > 0 ? n : 0;
}

export function calculateSavings(input: SavingsInput): SavingsResult {
  const salePrice = clean(input.salePrice);
  const pct = clean(input.comparisonPercent);
  const fairwardFee = clean(input.fairwardFee);
  const comparisonFee = Math.round(salePrice * (pct / 100));
  const savings = Math.max(0, comparisonFee - fairwardFee);
  const savingsPercentOfComparison =
    comparisonFee > 0 ? Math.round((savings / comparisonFee) * 1000) / 10 : 0;
  return { salePrice, comparisonFee, fairwardFee, savings, savingsPercentOfComparison };
}
