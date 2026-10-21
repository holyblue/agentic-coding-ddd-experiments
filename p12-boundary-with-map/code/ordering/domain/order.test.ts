import { describe, expect, it } from "vitest";
import { subtotal, total } from "./order";

const regular = { id: "m1", tier: "regular" as const };
const vip = { id: "m2", tier: "vip" as const };
const line = (unitPrice: number, quantity = 1) => ({ sku: "A", unitPrice, quantity });

describe("order", () => {
  it("adds up the lines", () => {
    const order = { member: regular, lines: [line(1000, 2)] };
    expect(subtotal(order)).toBe(2000);
    expect(total(order)).toBe(2000);
  });

  it("gives VIP members a discount", () => {
    expect(total({ member: vip, lines: [line(1000)] })).toBe(900);
  });

  it("applies a promo code", () => {
    expect(total({ member: regular, lines: [line(1000)] }, "AUTUMN15")).toBe(850);
    expect(total({ member: regular, lines: [line(1000)] }, "nope")).toBe(1000);
  });

  it("VIP with a promo code gets the larger discount", () => {
    expect(total({ member: vip, lines: [line(1000)] }, "AUTUMN15")).toBe(850);
    expect(total({ member: vip, lines: [line(1000)] }, "WELCOME5")).toBe(900);
  });
});
