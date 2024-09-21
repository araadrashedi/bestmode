/**
 * Checks if the given input array or string is empty.
 *
 * @param {Array<unknown> | String} input - The value to check.
 * @example
 * console.log(isEmpty([]));         // true
 * console.log(isEmpty(""));         // true
 * console.log(isEmpty([1, 2]));     // false
 * console.log(isEmpty("foo"));      // false
 * console.log(isEmpty(undefined));  // false
 * console.log(isEmpty(null));       // false
 */
export function isEmpty(input: Array<unknown> | string) {
	return input?.length === 0
}
