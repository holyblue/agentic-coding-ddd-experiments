import { describe, expect, it } from "vitest";
import { getMember, memberDiscountPercent } from "./contract";

describe("membership contract", () => {
  it("gives each tier its discount", () => {
    expect(memberDiscountPercent("regular")).toBe(0);
    expect(memberDiscountPercent("vip")).toBe(10);
  });

  it("finds a member by id", () => {
    expect(getMember("m2")).toEqual({ id: "m2", tier: "vip" });
    expect(getMember("nope")).toBeUndefined();
  });
});
