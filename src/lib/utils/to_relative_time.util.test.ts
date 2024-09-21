import { toMilliseconds, toRelativeTime } from "@/lib/utils"
import { describe, expect, it } from "vitest"

describe("toRelativeTime", () => {
	it('should return "now" for the current time', () => {
		const now = Date.now()
		const result = toRelativeTime(now)
		expect(result).toBe("now")
	})

	it('should return "5 minutes ago" for 5 minutes in the past', () => {
		const fiveMinutesAgo = Date.now() - toMilliseconds(5, "minute")
		const result = toRelativeTime(fiveMinutesAgo)
		expect(result).toBe("5 minutes ago")
	})

	it('should return "1 hour ago" for 1 hour in the past', () => {
		const oneHourAgo = Date.now() - toMilliseconds(1, "hour")
		const result = toRelativeTime(oneHourAgo)
		expect(result).toBe("1 hour ago")
	})

	it('should return "1 day ago" for 1 day in the past', () => {
		const oneDayAgo = Date.now() - toMilliseconds(1, "day")
		const result = toRelativeTime(oneDayAgo)
		expect(result).toBe("yesterday")
	})

	it('should return "2 weeks ago" for 2 weeks in the past', () => {
		const twoWeeksAgo = Date.now() - toMilliseconds(2, "week")
		const result = toRelativeTime(twoWeeksAgo)
		expect(result).toBe("2 weeks ago")
	})

	it('should return "1 year ago" for 366 days in the past', () => {
		const oneYearAgo = Date.now() - toMilliseconds(366, "day")
		const result = toRelativeTime(oneYearAgo)
		expect(result).toBe("last year")
	})

	it('should return "1 months ago" for 6 weeks in the past', () => {
		const sixWeeksAgo = Date.now() - toMilliseconds(6, "week")
		const result = toRelativeTime(sixWeeksAgo)
		expect(result).toBe("last month")
	})
})
