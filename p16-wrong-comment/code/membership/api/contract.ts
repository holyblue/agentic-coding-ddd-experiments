export type MemberTier = "regular" | "vip";

export interface Member {
  id: string;
  tier: MemberTier;
}
