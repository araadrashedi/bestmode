/**
 * Checks if two values are deeply equal.
 *
 * @template T
 * @param {T} x - The first value to compare.
 * @param {T} y - The second value to compare.
 * @example
 * console.log(isEqual({ a: 1, z: [7,8] }, { a: 1, z: [7,8] }));  // true
 * console.log(isEqual({ a: 1, b: 3 }, { a: 1, c: 4 }));          // false
 */
export function isEqual<T>(x: T, y: T) {
	if (Object.is(x, y)) {
		return true
	}
	if (x instanceof Date && y instanceof Date) {
		return x.getTime() === y.getTime()
	}
	if (x instanceof RegExp && y instanceof RegExp) {
		return x.toString() === y.toString()
	}
	if (typeof x !== "object" || x === null || typeof y !== "object" || y === null) {
		return false
	}

	const keysX = Reflect.ownKeys(x)
	const keysY = Reflect.ownKeys(y)
	if (keysX.length !== keysY.length) {
		return false
	}
	for (let idx = 0; idx < keysX.length; idx++) {
		if (!Reflect.has(y, keysX[idx])) {
			return false
		}
		if (!isEqual(x[keysX[idx] as keyof T], y[keysX[idx] as keyof T])) {
			return false
		}
	}

	return true
}
