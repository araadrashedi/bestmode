/**
 * Returns an array of numbers from 0 to exclusive upper.
 *
 * @param {number} upper - The upper limit of the range (exclusive).
 * @example
 * console.log(range(5));  // [0, 1, 2, 3, 4]
 */
export function range(upper: number) {
	console.assert(upper >= 0, `Expected "upper" to be a non-negative integer. Received ${upper}.`)
	return Array.from({ length: upper }, (_, idx) => idx)
}
