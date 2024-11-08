import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...tailwindClasses: ClassValue[]) {
  return twMerge(clsx(tailwindClasses));
}
