// @ts-nocheck

import { describe, expect, it, vi } from "vitest"

import { noop, toReadableNumeric } from "@/lib/utils"

describe("toReadableNumeric", () => {
	it("should return the input as a string when input is less than 1,000", () => {
		const result = toReadableNumeric(999)
		expect(result).toBe("999")
	})

	it("should return a K formatted string for numbers between 1,000 and 999,999", () => {
		const result = toReadableNumeric(1500)
		expect(result).toBe("1.5K")
	})

	it("should return an M formatted string for numbers greater than or equal to 1,000,000", () => {
		const result = toReadableNumeric(1_500_000)
		expect(result).toBe("1.5M")
	})

	it("should return fallback value for invalid input", () => {
		const spy = vi.spyOn(console, "assert").mockImplementation(noop)
		const result = toReadableNumeric(Number.NaN)
		expect(result).toBe("--")
		expect(spy).toHaveBeenCalledWith(false, 'Expected "input" to be a number. Received: NaN')
		spy.mockRestore()
	})

	it("should return custom fallback value when input is invalid", () => {
		const spy = vi.spyOn(console, "assert").mockImplementation(noop)
		const result = toReadableNumeric(undefined, "N/A")
		expect(result).toBe("N/A")
		spy.mockRestore()
	})
})
