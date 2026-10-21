import type { MemberRecord } from "./memberRecord";

const RECORDS: MemberRecord[] = [
  { id: "m1", tier: "regular", joinedAt: "2023-03-01" },
  { id: "m2", tier: "vip", joinedAt: "2021-07-15" },
  { id: "m3", tier: "regular", joinedAt: "2026-08-20" },
  { id: "m4", tier: "vip", joinedAt: "2020-01-10", leftAt: "2025-02-01", rejoinedAt: "2026-05-05" },
];

export function findMemberRecord(id: string): MemberRecord | undefined {
  return RECORDS.find((r) => r.id === id);
}
