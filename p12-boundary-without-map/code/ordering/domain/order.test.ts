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

  describe("LOYAL10", () => {
    const asOf = "2026-10-15";
    const m3 = { id: "m3", tier: "regular" as const }; // 2026-08-20 入會，未滿一年
    const m4 = { id: "m4", tier: "vip" as const }; // 退會後 2026-05-05 重新入會，未滿一年

    it("gives 10% off to a member of at least one year", () => {
      expect(total({ member: regular, lines: [line(1000)] }, "LOYAL10", asOf)).toBe(900);
      expect(total({ member: regular, lines: [line(1000)] }, "loyal10", asOf)).toBe(900);
    });

    it("is invalid for a member of less than one year", () => {
      expect(total({ member: m3, lines: [line(1000)] }, "LOYAL10", asOf)).toBe(1000);
    });

    it("counts from the rejoin date for a returning member", () => {
      // 雖然最早 2020 年就入會，但目前這段會籍未滿一年，視為無效促銷碼（VIP 折扣照舊）
      expect(total({ member: m4, lines: [line(1000)] }, "LOYAL10", asOf)).toBe(900);
      expect(total({ member: m4, lines: [line(1000)] }, "LOYAL10", "2027-05-05")).toBe(900);
    });

    it("is invalid for an unknown member", () => {
      const ghost = { id: "nope", tier: "regular" as const };
      expect(total({ member: ghost, lines: [line(1000)] }, "LOYAL10", asOf)).toBe(1000);
    });

    it("does not stack with the VIP discount", () => {
      expect(total({ member: vip, lines: [line(1000)] }, "LOYAL10", asOf)).toBe(900);
    });

    it("becomes valid on the one-year anniversary", () => {
      expect(total({ member: m3, lines: [line(1000)] }, "LOYAL10", "2027-08-19")).toBe(1000);
      expect(total({ member: m3, lines: [line(1000)] }, "LOYAL10", "2027-08-20")).toBe(900);
    });
  });
});
