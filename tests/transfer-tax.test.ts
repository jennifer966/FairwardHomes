import { test } from "node:test";
import assert from "node:assert/strict";
import { calculateTransferTax } from "../src/lib/transfer-tax.ts";

const sacramento = { countyPer500: 0.55, cityRate: 0.00275 };

test("$600,000 sale: county $660, city $1,650", () => {
  const r = calculateTransferTax(600_000, sacramento);
  assert.equal(r.county, 660);
  assert.equal(r.city, 1650);
  assert.equal(r.insideCity, 2310);
});

test("county tax rounds a partial $500 up", () => {
  const r = calculateTransferTax(600_001, sacramento);
  assert.equal(r.county, 660.55);
});

test("treats invalid input as zero", () => {
  const r = calculateTransferTax(Number.NaN, sacramento);
  assert.deepEqual(r, { county: 0, city: 0, insideCity: 0 });
});
