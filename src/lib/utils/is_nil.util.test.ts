import { describe, expect, it } from "vitest"

import { isNil } from "@/lib/utils"

describe("isNil", () => {
	it("should return true for null", () => {
		expect(isNil(null)).toBe(true)
	})

	it("should return true for undefined", () => {
		expect(isNil(undefined)).toBe(true)
	})

	it("should return false for numbers", () => {
		expect(isNil(10)).toBe(false)
	})

	it("should return false for empty string", () => {
		expect(isNil("")).toBe(false)
	})

	it("should return false for boolean values", () => {
		expect(isNil(false)).toBe(false)
		expect(isNil(true)).toBe(false)
	})

	it("should return false for objects", () => {
		expect(isNil({})).toBe(false)
		expect(isNil([])).toBe(false)
	})
})
