const ONE_SECOND_IN_MS = 1e3 as const
const TimeBoundaries: ReadonlyArray<{ bound: number; unit: Intl.RelativeTimeFormatUnit }> = Object.freeze([
	{ bound: 60, unit: "second" }, // up to 60 seconds
	{ bound: 60, unit: "minute" }, // up to 60 minutes
	{ bound: 24, unit: "hour" }, // up to 24 hours
	{ bound: 7, unit: "day" }, // up to 7 days
	{ bound: 4.35, unit: "week" }, // Approximate weeks in a month
	{ bound: 12, unit: "month" }, // up to 12 months
	{ bound: Number.POSITIVE_INFINITY, unit: "year" }, // greater than a year
])

/**
 * Converts a given date or time to a relative time string.
 *
 * @param {number | string | Date} input - The date or time to convert.
 * @return {string} The relative time string.
 * @example
 * console.log(toRelativeTime("2023-01-01T00:00:00Z")); // "1 year ago"
 */
export function toRelativeTime(input: number | string | Date) {
	const date = new Date(input).getTime()
	const span = Math.floor((Date.now() - date) / ONE_SECOND_IN_MS) // time difference in seconds

	const relative = new Intl.RelativeTimeFormat("en", { numeric: "auto" })

	let delta = span
	for (const boundary of TimeBoundaries) {
		if (Math.abs(delta) < boundary.bound) {
			return relative.format(-Math.floor(delta), boundary.unit)
		}
		delta /= boundary.bound
	}

	return relative.format(-Math.floor(delta), "year")
}
