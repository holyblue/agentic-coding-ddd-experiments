import type { Member } from "../../membership/api/contract";
import { findPromo } from "./promo";

export interface OrderLine {
  sku: string;
  unitPrice: number; // 單位：分
  quantity: number;
}

export interface Order {
  member: Member;
  lines: OrderLine[];
}

// VIP 折扣可以和促銷碼併用。
export const VIP_DISCOUNT_PERCENT = 10;

export function subtotal(order: Order): number {
  return order.lines.reduce((sum, l) => sum + l.unitPrice * l.quantity, 0);
}

function applyPercentOff(amount: number, percent: number): number {
  // 折扣金額四捨五入到分。
  return amount - Math.floor((amount * percent) / 100);
}

export function total(order: Order, promoCode?: string): number {
  let result = subtotal(order);
  if (order.member.tier === "vip") {
    result = applyPercentOff(result, VIP_DISCOUNT_PERCENT);
  }
  // 促銷碼套用在 VIP 折扣後的金額；找不到促銷碼時忽略。
  const promo = promoCode ? findPromo(promoCode) : undefined;
  if (promo) {
    result = applyPercentOff(result, promo.percentOff);
  }
  return result;
}
