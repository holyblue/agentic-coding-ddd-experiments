import { findMemberRecord } from "../domain/memberRepository";

export const MEMBER_TIERS = ["regular", "vip"] as const;

export type MemberTier = (typeof MEMBER_TIERS)[number];

export interface Member {
  id: string;
  tier: MemberTier;
}

export function getMember(id: string): Member | undefined {
  const record = findMemberRecord(id);
  return record && { id: record.id, tier: record.tier };
}

export function memberDiscountPercent(tier: MemberTier): number {
  switch (tier) {
    case "vip":
      return 10;
    default:
      return 0;
  }
}
