import { isEqual } from "./is_equal.util"
import { isNil } from "./is_nil.util"

const isArray = Array.isArray

/**
 * Checks if the provided input is an object.
 *
 * @param {unknown} input - The value to check.
 * @return {input is object}
 */
function isObject(input: unknown): input is object {
	return !isNil(input) && !isArray(input) && typeof input === "object"
}

/**
 * Recursively combine two values of the same type into a single value.
 * If the values are arrays, it concatenates them and removes duplicates.
 * If the values are objects, it merges their properties recursively.
 *
 * @template T
 * @param {unknown} initial - The initial value.
 * @param {unknown} override - The value to merge into the initial value.
 * @return {T}
 * @example
 * console.log(union({ a: 1, b: 2, z: [7,8] }, { a: 3, c: 4, z: [8,9] }));  // { a: 3, b: 2, c: 4, z: [7,8,9] }
 */
export function merge<T>(initial: unknown, override: unknown): T {
	if (isArray(initial) && isArray(override)) {
		const output = [...initial]
		for (const entry of override) {
			if (!initial.some((i) => isEqual(i, entry))) {
				output.push(entry)
			}
		}
		return output as T
	}

	if (isObject(initial) && isObject(override)) {
		const output = { ...initial } as T
		for (const key in override) {
			output[key as keyof T] = merge(initial[key as keyof typeof initial], override[key as keyof typeof override])
		}
		return output
	}

	return override as T
}
