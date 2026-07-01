import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines conditional classes and merges Tailwind classes safely.
 *
 * Example:
 *
 * cn(
 *   "px-4 py-2",
 *   isActive && "bg-primary",
 *   className,
 * );
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
