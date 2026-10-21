import { describe, expect, it } from "vitest";
import { getMember, hasBeenMemberForYear, memberDiscountPercent } from "./contract";

describe("membership contract", () => {
  it("gives each tier its discount", () => {
    expect(memberDiscountPercent("regular")).toBe(0);
    expect(memberDiscountPercent("vip")).toBe(10);
  });

  it("finds a member by id", () => {
    expect(getMember("m2")).toEqual({ id: "m2", tier: "vip" });
    expect(getMember("nope")).toBeUndefined();
  });

  it("knows whether a member has been a member for a year", () => {
    expect(hasBeenMemberForYear("m1", "2026-10-15")).toBe(true);
    expect(hasBeenMemberForYear("m3", "2026-10-15")).toBe(false);
    expect(hasBeenMemberForYear("m3", "2027-08-19")).toBe(false);
    expect(hasBeenMemberForYear("m3", "2027-08-20")).toBe(true);
    expect(hasBeenMemberForYear("nope", "2026-10-15")).toBe(false);
  });

  it("counts a returning member from the rejoin date", () => {
    expect(hasBeenMemberForYear("m4", "2027-05-04")).toBe(false);
    expect(hasBeenMemberForYear("m4", "2027-05-05")).toBe(true);
  });
});
