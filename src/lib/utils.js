import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function darkenColor(hex, amount = 20) {
  const clamp = (val) => Math.max(0, Math.min(255, val));
  const num = parseInt(hex.replace("#", ""), 16);
  const r = clamp((num >> 16) - amount);
  const g = clamp(((num >> 8) & 0x00ff) - amount);
  const b = clamp((num & 0x0000ff) - amount);
  return `rgb(${r}, ${g}, ${b})`;
}
