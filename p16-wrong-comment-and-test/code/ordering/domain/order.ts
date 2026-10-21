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

// VIP 折扣和促銷碼不疊加,只套用折扣較大的一個。
export const VIP_DISCOUNT_PERCENT = 10;

export function subtotal(order: Order): number {
  return order.lines.reduce((sum, l) => sum + l.unitPrice * l.quantity, 0);
}

function percentDiscount(amount: number, percent: number): number {
  // 折扣金額無條件捨去到分。
  return Math.floor((amount * percent) / 100);
}

export function total(order: Order, promoCode?: string): number {
  const sub = subtotal(order);
  const vipDiscount =
    order.member.tier === "vip" ? percentDiscount(sub, VIP_DISCOUNT_PERCENT) : 0;
  const promo = promoCode === undefined ? undefined : findPromo(promoCode);
  const promoDiscount = promo ? percentDiscount(sub, promo.percentOff) : 0;
  return sub - Math.max(vipDiscount, promoDiscount);
}
