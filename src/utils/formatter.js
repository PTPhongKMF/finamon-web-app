import { m } from "../i18n/paraglide/messages";

export function formatVND(amount) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}

export function shortenNumber(num) {
  if (num >= 1e9) {
    const billionPart = (num / 1e9).toFixed(1);
    return `${billionPart}${m["symbol.billionShort"]()} đ`;
  }
  if (num >= 1e6) {
    const millionPart = (num / 1e6).toFixed(1);
    return `${millionPart}${m["symbol.millionShort"]()} đ`;
  }
  if (num >= 1e3) {
    const thousandPart = (num / 1e3).toFixed(1);
    return `${thousandPart}${m["symbol.thousandShort"]()} đ`;
  }
  
  return formatVND(num);
}