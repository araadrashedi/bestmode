export type TimeUnit = "second" | "minute" | "hour" | "day" | "week"

const ONE_SECOND_IN_MS = 1e3 as const
const TimeUnitToMs = Object.freeze({
	second: ONE_SECOND_IN_MS,
	minute: ONE_SECOND_IN_MS * 60,
	hour: ONE_SECOND_IN_MS * 60 * 60,
	day: ONE_SECOND_IN_MS * 60 * 60 * 24,
	week: ONE_SECOND_IN_MS * 60 * 60 * 24 * 7,
	undefined: 1,
})

/**
 * Converts a time value from a given unit to milliseconds.
 *
 * @param {number} value - The time value to convert.
 * @param {TimeUnit} unit - The unit of the time value.
 * @return {number} The time value in milliseconds.
 * @example
 * console.log(toMilliseconds(1, "second"));  // 1_000
 * console.log(toMilliseconds(1, "minute"));  // 60_000
 */
export function toMilliseconds(value: number, unit: TimeUnit) {
	return value * TimeUnitToMs[unit]
}

/**
 * Converts a time value from a given unit to seconds.
 *
 * @param {number} value - The time value to convert.
 * @param {TimeUnit} unit - The unit of the time value.
 * @return {number} The time value in seconds.
 * @example
 * console.log(toSeconds(1, "minute"));  // 60
 * console.log(toSeconds(1, "hour"));    // 3600
 */
export function toSeconds(value: number, unit: Omit<TimeUnit, "second">) {
	return toMilliseconds(value, unit as TimeUnit) / ONE_SECOND_IN_MS
}
