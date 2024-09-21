/**
 * Checks if the given input is a valid number.
 *
 * @param {unknown} input - The value to check.
 * @example
 * console.log(isNumber(123));        // true
 * console.log(isNumber(1.2));        // true
 * console.log(isNumber(-Infinity));  // true
 * console.log(isNumber(NaN));        // false
 * console.log(isNumber("7"));        // false
 * console.log(isNumber(undefined));  // false
 */
export function isNumber(input: unknown): input is number {
	return typeof input === "number" && !Number.isNaN(input)
}
