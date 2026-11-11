export type TransferTaxRates = {
  /** County documentary transfer tax in dollars per $500 of value, or fraction thereof. */
  countyPer500: number;
  /** Additional city tax as a fraction of the sale price (0.00275 = 0.275%). */
  cityRate: number;
};

export type TransferTaxResult = {
  county: number;
  /** City tax that applies only inside city limits. */
  city: number;
  /** County tax plus city tax, for a home inside city limits. */
  insideCity: number;
};

/**
 * Transfer taxes on a sale. The county tax is charged per $500 "or
 * fractional part thereof", so partial $500 increments round up. Assumes no
 * loans are assumed by the buyer (assumed loans reduce the taxable value).
 */
export function calculateTransferTax(salePrice: number, rates: TransferTaxRates): TransferTaxResult {
  const price = Number.isFinite(salePrice) && salePrice > 0 ? salePrice : 0;
  const county = Math.round(Math.ceil(price / 500) * rates.countyPer500 * 100) / 100;
  const city = Math.round(price * rates.cityRate * 100) / 100;
  return { county, city, insideCity: Math.round((county + city) * 100) / 100 };
}
