import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merges multiple class names into a single string using Tailwind's utility-first approach.
 *
 * @param {...ClassValue[]} inputs - Variable number of class names to merge
 * @example
 * console.log(cn("p-4 mb-2", "p-2 width-full", "mt-1"));  // "mb-2 p-2 width-full mt-1"
 */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}
