import { memberDiscountPercent, type Member } from "../../membership/api/contract";
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

export function subtotal(order: Order): number {
  return order.lines.reduce((sum, l) => sum + l.unitPrice * l.quantity, 0);
}

function percentOf(amount: number, percent: number): number {
  return Math.floor((amount * percent) / 100);
}

export function total(order: Order, promoCode?: string): number {
  const sub = subtotal(order);
  const memberOff = percentOf(sub, memberDiscountPercent(order.member.tier));
  const promo = promoCode ? findPromo(promoCode) : undefined;
  const promoOff = promo ? percentOf(sub, promo.percentOff) : 0;
  if (order.member.tier === "vip" && promo) {
    return sub - Math.max(memberOff, promoOff);
  }
  return sub - memberOff - promoOff;
}
