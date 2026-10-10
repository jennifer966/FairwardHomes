import { test } from "node:test";
import assert from "node:assert/strict";
import { calculateSavings } from "../src/lib/savings.ts";

test("matches the documented $600,000 / 2.5% example", () => {
  const r = calculateSavings({ salePrice: 600_000, comparisonPercent: 2.5, fairwardFee: 2995 });
  assert.equal(r.comparisonFee, 15_000);
  assert.equal(r.fairwardFee, 2995);
  assert.equal(r.savings, 12_005);
  assert.equal(r.savingsPercentOfComparison, 80);
});

test("never reports negative savings", () => {
  const r = calculateSavings({ salePrice: 100_000, comparisonPercent: 1, fairwardFee: 2995 });
  assert.equal(r.comparisonFee, 1000);
  assert.equal(r.savings, 0);
  assert.equal(r.savingsPercentOfComparison, 0);
});

test("treats invalid input as zero", () => {
  const r = calculateSavings({ salePrice: Number.NaN, comparisonPercent: -2, fairwardFee: 2995 });
  assert.equal(r.comparisonFee, 0);
  assert.equal(r.savings, 0);
});
