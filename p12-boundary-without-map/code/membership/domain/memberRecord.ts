import type { MemberTier } from "../api/contract";

export interface MemberRecord {
  id: string;
  tier: MemberTier;
  joinedAt: string; // 第一次入會的日期，YYYY-MM-DD
  leftAt?: string; // 退會的日期
  rejoinedAt?: string; // 退會後重新入會的日期
}
