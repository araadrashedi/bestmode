import { describe, expect, it } from "vitest"

import { isNumber } from "@/lib/utils"

describe("isNumber", () => {
	it("should return true for positive integers", () => {
		expect(isNumber(123)).toBe(true)
	})

	it("should return true for negative integers", () => {
		expect(isNumber(-123)).toBe(true)
	})

	it("should return true for positive floating-point numbers", () => {
		expect(isNumber(1.2)).toBe(true)
	})

	it("should return true for negative floating-point numbers", () => {
		expect(isNumber(-1.2)).toBe(true)
	})

	it("should return true for zero", () => {
		expect(isNumber(0)).toBe(true)
	})

	it("should return true for negative infinity", () => {
		expect(isNumber(Number.NEGATIVE_INFINITY)).toBe(true)
	})

	it("should return true for positive infinity", () => {
		expect(isNumber(Number.POSITIVE_INFINITY)).toBe(true)
	})

	it("should return false for NaN", () => {
		expect(isNumber(Number.NaN)).toBe(false)
	})

	it("should return false for strings", () => {
		expect(isNumber("7")).toBe(false)
	})

	it("should return false for undefined", () => {
		expect(isNumber(undefined)).toBe(false)
	})

	it("should return false for null", () => {
		expect(isNumber(null)).toBe(false)
	})

	it("should return false for objects", () => {
		expect(isNumber({})).toBe(false)
	})

	it("should return false for arrays", () => {
		expect(isNumber([])).toBe(false)
	})

	it("should return false for functions", () => {
		expect(isNumber(() => {})).toBe(false)
	})
})
