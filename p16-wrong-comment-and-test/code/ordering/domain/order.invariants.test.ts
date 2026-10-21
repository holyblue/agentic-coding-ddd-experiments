// Invariants of ordering. Do not change these tests to make code pass.
import { describe, expect, it } from "vitest";
import { total } from "./order";

const vip = { id: "m2", tier: "vip" as const };
const line = (unitPrice: number) => ({ sku: "A", unitPrice, quantity: 1 });

describe("ordering invariants", () => {
  it("VIP discount and promo code do not stack: only the larger discount applies", () => {
    // VIP 10% = 100, AUTUMN15 = 150 -> only 150 off
    expect(total({ member: vip, lines: [line(1000)] }, "AUTUMN15")).toBe(850);
    // VIP 10% = 100, WELCOME5 = 50 -> only 100 off
    expect(total({ member: vip, lines: [line(1000)] }, "WELCOME5")).toBe(900);
  });

  it("amounts are integer cents; percentage discounts round down", () => {
    // VIP 10% of 999 = 99.9 -> 99 off
    expect(total({ member: vip, lines: [line(999)] })).toBe(900);
  });
});
