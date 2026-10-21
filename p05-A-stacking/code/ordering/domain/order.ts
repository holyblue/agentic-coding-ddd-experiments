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

export function total(order: Order, promoCode?: string): number {
  let result = subtotal(order);
  if (order.member.tier === "vip") {
    result = applyPercentOff(result, VIP_DISCOUNT_PERCENT);
  }
  const promo = promoCode ? findPromo(promoCode) : undefined;
  if (promo) {
    result = applyPercentOff(result, promo.percentOff);
  }
  return result;
}
