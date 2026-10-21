export interface PromoCode {
  code: string;
  percentOff: number;
  requiresOneYearMember?: boolean; // 僅限入會滿一年的會員
}

const PROMO_CODES: PromoCode[] = [
  { code: "AUTUMN15", percentOff: 15 },
  { code: "WELCOME5", percentOff: 5 },
  { code: "LOYAL10", percentOff: 10, requiresOneYearMember: true },
];

export function findPromo(code: string): PromoCode | undefined {
  return PROMO_CODES.find((p) => p.code === code.toUpperCase());
}
