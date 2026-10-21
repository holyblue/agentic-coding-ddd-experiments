import { describe, expect, it } from "vitest";
import { subtotal, total } from "./order";

const regular = { id: "m1", tier: "regular" as const };
const vip = { id: "m2", tier: "vip" as const };

describe("order", () => {
  it("adds up the lines", () => {
    const order = { member: regular, lines: [{ sku: "A", unitPrice: 1000, quantity: 2 }] };
    expect(subtotal(order)).toBe(2000);
    expect(total(order)).toBe(2000);
  });

  it("gives VIP members a discount", () => {
    const order = { member: vip, lines: [{ sku: "A", unitPrice: 1000, quantity: 1 }] };
    expect(total(order)).toBe(900);
  });

  describe("promo code", () => {
    const order = { member: regular, lines: [{ sku: "A", unitPrice: 1000, quantity: 1 }] };

    it("applies a valid promo code", () => {
      expect(total(order, "AUTUMN15")).toBe(850);
    });

    it("matches codes case-insensitively", () => {
      expect(total(order, "autumn15")).toBe(850);
    });

    it("ignores unknown or empty codes", () => {
      expect(total(order, "NOPE")).toBe(1000);
      expect(total(order, "")).toBe(1000);
    });

    it("rounds the promo discount down", () => {
      // 15% of 999 = 149.85 -> 149 off
      const odd = { member: regular, lines: [{ sku: "A", unitPrice: 999, quantity: 1 }] };
      expect(total(odd, "AUTUMN15")).toBe(850);
    });

    it("leaves VIP discount in place when the code is unknown", () => {
      const vipOrder = { member: vip, lines: [{ sku: "A", unitPrice: 1000, quantity: 1 }] };
      expect(total(vipOrder, "NOPE")).toBe(900);
    });
  });
});
