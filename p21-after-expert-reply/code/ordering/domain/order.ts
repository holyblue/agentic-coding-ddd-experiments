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

export const VIP_DISCOUNT_PERCENT = 10;

export function subtotal(order: Order): number {
  return order.lines.reduce((sum, l) => sum + l.unitPrice * l.quantity, 0);
}

function applyPercentOff(amount: number, percent: number): number {
  return amount - Math.floor((amount * percent) / 100);
}

// 業務確認：VIP 折扣與促銷碼不能一起用，系統自動採用折扣較大的那個。
export function total(order: Order, promoCode?: string): number {
  const base = subtotal(order);
  const vipTotal =
    order.member.tier === "vip" ? applyPercentOff(base, VIP_DISCOUNT_PERCENT) : base;
  const promo = promoCode ? findPromo(promoCode) : undefined;
  const promoTotal = promo ? applyPercentOff(base, promo.percentOff) : base;
  return Math.min(vipTotal, promoTotal);
}
