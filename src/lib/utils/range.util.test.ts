import { describe, expect, it, vi } from "vitest"

import { noop, range } from "@/lib/utils"

describe("range", () => {
	it("should return the array [0, 1, 2, 3, 4] when upper is 5", () => {
		const result = range(5)
		expect(result).toEqual([0, 1, 2, 3, 4])
	})

	it("should return an empty array when upper is 0", () => {
		const result = range(0)
		expect(result).toEqual([])
	})

	it("should trigger console.assert when upper is negative", () => {
		const spy = vi.spyOn(console, "assert").mockImplementation(noop)
		range(-1)
		expect(spy).toHaveBeenCalledWith(false, 'Expected "upper" to be a non-negative integer. Received -1.')
		spy.mockRestore()
	})

	it("should return an array starting with 0 for upper 1000", () => {
		const result = range(1000)
		expect(result.shift()).toBe(0)
	})

	it("should return an array ending with 999 for upper 1000", () => {
		const result = range(1000)
		expect(result.pop()).toBe(999)
	})
})
