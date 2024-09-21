import { describe, expect, it } from "vitest"

import { toMilliseconds, toSeconds } from "@/lib/utils"

describe("Time Conversion Utilities", () => {
	describe("toMilliseconds", () => {
		it("should convert seconds to milliseconds", () => {
			expect(toMilliseconds(1, "second")).toBe(1000)
		})

		it("should convert minutes to milliseconds", () => {
			expect(toMilliseconds(1, "minute")).toBe(60_000)
		})

		it("should convert hours to milliseconds", () => {
			expect(toMilliseconds(1, "hour")).toBe(3_600_000)
		})

		it("should convert days to milliseconds", () => {
			expect(toMilliseconds(1, "day")).toBe(86_400_000)
		})

		it("should convert weeks to milliseconds", () => {
			expect(toMilliseconds(1, "week")).toBe(604_800_000)
		})
	})

	describe("toSeconds", () => {
		it("should convert minutes to seconds", () => {
			expect(toSeconds(1, "minute")).toBe(60)
		})

		it("should convert hours to seconds", () => {
			expect(toSeconds(1, "hour")).toBe(3600)
		})

		it("should convert days to seconds", () => {
			expect(toSeconds(1, "day")).toBe(86_400)
		})

		it("should convert weeks to seconds", () => {
			expect(toSeconds(1, "week")).toBe(604_800)
		})
	})
})
