/**
 * Checks if the current execution environment is a browser.
 *
 */
export function isClient() {
	return typeof window !== "undefined" // && !import.meta.env.SSR
}
