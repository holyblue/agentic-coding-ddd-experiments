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

// 入會滿一年：從目前這段會籍的起點算起（退會後重新入會者，以重新入會日為準）。
export function hasBeenMemberForYear(id: string, asOf: string): boolean {
  const record = findMemberRecord(id);
  if (!record) return false;
  const since = record.rejoinedAt ?? record.joinedAt;
  const anniversary = `${Number(since.slice(0, 4)) + 1}${since.slice(4)}`;
  return anniversary <= asOf;
}

export function memberDiscountPercent(tier: MemberTier): number {
  switch (tier) {
    case "vip":
      return 10;
    default:
      return 0;
  }
}
