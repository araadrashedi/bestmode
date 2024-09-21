/**
 * Checks if the given input is null or undefined.
 *
 * @param {unknown} input - The value to check.
 * @example
 * console.log(isNil(null));       // true
 * console.log(isNil(undefined));  // true
 * console.log(isNil(10));         // false
 * console.log(isNil(""));         // false
 */
export function isNil(input: unknown): input is null | undefined {
	return input === null || input === undefined
}
