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

export function total(order: Order, promoCode?: string): number {
  const sub = subtotal(order);
  const vipDiscount =
    order.member.tier === "vip" ? Math.floor((sub * VIP_DISCOUNT_PERCENT) / 100) : 0;
  const promo = promoCode === undefined ? undefined : findPromo(promoCode);
  const promoDiscount = promo ? Math.floor((sub * promo.percentOff) / 100) : 0;
  // VIP 折扣與促銷碼不疊加，只取較大者。
  return sub - Math.max(vipDiscount, promoDiscount);
}
