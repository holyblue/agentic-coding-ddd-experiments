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

  it("applies a promo code", () => {
    const order = { member: regular, lines: [{ sku: "A", unitPrice: 1000, quantity: 1 }] };
    expect(total(order, "AUTUMN15")).toBe(850);
  });

  it("matches promo codes case-insensitively", () => {
    const order = { member: regular, lines: [{ sku: "A", unitPrice: 1000, quantity: 1 }] };
    expect(total(order, "welcome5")).toBe(950);
  });

  it("ignores an unknown promo code", () => {
    const order = { member: regular, lines: [{ sku: "A", unitPrice: 1000, quantity: 1 }] };
    expect(total(order, "NOPE")).toBe(1000);
    expect(total(order, "")).toBe(1000);
  });

  it("stacks the promo code on top of the VIP discount", () => {
    const order = { member: vip, lines: [{ sku: "A", unitPrice: 1000, quantity: 1 }] };
    // 1000 -> VIP 900 -> AUTUMN15 765
    expect(total(order, "AUTUMN15")).toBe(765);
  });

  it("rounds the promo discount down to the cent", () => {
    const order = { member: regular, lines: [{ sku: "A", unitPrice: 33, quantity: 1 }] };
    // 33 * 15% = 4.95 -> 折扣 4
    expect(total(order, "AUTUMN15")).toBe(29);
  });
});
