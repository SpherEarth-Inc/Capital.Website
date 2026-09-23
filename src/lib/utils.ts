import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCad(amount: number): string {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Root-relative path for public assets and media.
 * GitHub Pages serves the app under NEXT_PUBLIC_BASE_PATH (e.g. /Capital.Website).
 */
export function sitePath(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") ?? "";
  if (!basePath) return normalized;
  if (normalized === basePath || normalized.startsWith(`${basePath}/`)) {
    return normalized;
  }
  return `${basePath}${normalized}`;
}
