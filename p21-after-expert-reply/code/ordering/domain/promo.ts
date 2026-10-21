export interface PromoCode {
  code: string;
  percentOff: number;
}

const PROMO_CODES: PromoCode[] = [
  { code: "AUTUMN15", percentOff: 15 },
  { code: "WELCOME5", percentOff: 5 },
];

export function findPromo(code: string): PromoCode | undefined {
  return PROMO_CODES.find((p) => p.code === code.toUpperCase());
}
