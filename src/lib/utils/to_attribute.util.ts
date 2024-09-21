/**
 * Converts a value to a string attribute if it's truthy. otherwise, returns undefined.
 *
 * @template T
 * @param {unknown} value - The value to convert.
 * @example
 * <element data-foo={toAttribute(true)} />   // <element data-foo="true" />
 * <element data-bar={toAttribute(false)} />  // <element />
 */
export function toAttribute<T extends string>(value: unknown): T | undefined {
	return value ? (value.toString() as T) : undefined
}
