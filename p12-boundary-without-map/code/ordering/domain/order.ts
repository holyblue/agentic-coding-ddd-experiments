import { hasBeenMemberForYear, memberDiscountPercent, type Member } from "../../membership/api/contract";
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

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

export function total(order: Order, promoCode?: string, asOf: string = today()): number {
  const sub = subtotal(order);
  const memberOff = percentOf(sub, memberDiscountPercent(order.member.tier));
  const found = promoCode ? findPromo(promoCode) : undefined;
  // 不符合資格的會員，當成無效的促銷碼
  const promo =
    found?.requiresOneYearMember && !hasBeenMemberForYear(order.member.id, asOf) ? undefined : found;
  const promoOff = promo ? percentOf(sub, promo.percentOff) : 0;
  if (order.member.tier === "vip" && promo) {
    return sub - Math.max(memberOff, promoOff);
  }
  return sub - memberOff - promoOff;
}
