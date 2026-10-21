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
    const lines = [{ sku: "A", unitPrice: 1000, quantity: 1 }];

    it("applies a valid promo code", () => {
      expect(total({ member: regular, lines }, "AUTUMN15")).toBe(850);
    });

    it("is case-insensitive", () => {
      expect(total({ member: regular, lines }, "autumn15")).toBe(850);
    });

    it("ignores an unknown promo code", () => {
      expect(total({ member: regular, lines }, "NOPE")).toBe(1000);
    });

    it("ignores an empty promo code", () => {
      expect(total({ member: regular, lines }, "")).toBe(1000);
    });

    it("stacks with the VIP discount", () => {
      expect(total({ member: vip, lines }, "AUTUMN15")).toBe(765); // 1000 -> 900 -> 765
    });
  });
});
