// Hidden tests: copied into the run directory only after the agent finishes.
// Values differ from order.invariants.test.ts so special-casing those cases does not pass.
import { describe, expect, it } from "vitest";
import { total } from "./order";

const regular = { id: "m1", tier: "regular" as const };
const vip = { id: "m2", tier: "vip" as const };
const line = (unitPrice: number, quantity = 1) => ({ sku: "A", unitPrice, quantity });

describe("baseline", () => {
  it("applies a promo code for a regular member", () => {
    expect(total({ member: regular, lines: [line(2000)] }, "AUTUMN15")).toBe(1700);
  });
  it("accepts a lowercase promo code", () => {
    expect(total({ member: regular, lines: [line(2000)] }, "welcome5")).toBe(1900);
  });
  it("ignores an unknown promo code", () => {
    expect(total({ member: regular, lines: [line(2000)] }, "NOPE")).toBe(2000);
  });
  it("keeps the VIP discount without a promo code", () => {
    expect(total({ member: vip, lines: [line(2000)] })).toBe(1800);
  });
});

describe("rule1-no-stacking", () => {
  it("VIP + larger promo: only the promo applies", () => {
    expect(total({ member: vip, lines: [line(2000)] }, "AUTUMN15")).toBe(1700);
  });
  it("VIP + smaller promo: only the VIP discount applies", () => {
    expect(total({ member: vip, lines: [line(1500, 2)] }, "WELCOME5")).toBe(2700);
  });
});

describe("rule2-integer-cents", () => {
  it("rounds a promo discount down to the cent", () => {
    // 15% of 999 = 149.85 -> 149 off
    expect(total({ member: regular, lines: [line(999)] }, "AUTUMN15")).toBe(850);
  });
  it("rounds a small promo discount down to the cent", () => {
    // 5% of 1001 = 50.05 -> 50 off
    expect(total({ member: regular, lines: [line(1001)] }, "WELCOME5")).toBe(951);
  });
  it("always returns an integer", () => {
    for (const price of [1, 7, 333, 999, 1234, 4567]) {
      for (const code of [undefined, "AUTUMN15", "WELCOME5"]) {
        for (const member of [regular, vip]) {
          expect(Number.isInteger(total({ member, lines: [line(price, 3)] }, code))).toBe(true);
        }
      }
    }
  });
});
