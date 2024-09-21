import { isEqual } from "@/lib/utils"
import { describe, expect, it } from "vitest"

describe("isEqual", () => {
	it("should return true for identical primitives", () => {
		const result = isEqual(1, 1)
		expect(result).toBe(true)
	})

	it("should return false for different primitives", () => {
		const result = isEqual(1, 2)
		expect(result).toBe(false)
	})

	it("should return true for identical objects", () => {
		const obj1 = { a: 1, b: { c: 2 } }
		const obj2 = { a: 1, b: { c: 2 } }
		const result = isEqual(obj1, obj2)
		expect(result).toBe(true)
	})

	it("should return false for different objects", () => {
		const obj1 = { a: 1, b: { c: 2 } }
		const obj2 = { a: 1, b: { c: 3 } }
		const result = isEqual(obj1, obj2)
		expect(result).toBe(false)
	})

	it("should handle arrays", () => {
		const result = isEqual([1, 2, 3], [1, 2, 3])
		expect(result).toBe(true)
	})

	it("should return false for different arrays", () => {
		const result = isEqual([1, 2, 3], [1, 2, 4])
		expect(result).toBe(false)
	})

	it("should handle nested structures", () => {
		const obj1 = { a: [1, 2, { d: 4 }] }
		const obj2 = { a: [1, 2, { d: 4 }] }
		const result = isEqual(obj1, obj2)
		expect(result).toBe(true)
	})

	it("should return false for different types", () => {
		const result = isEqual({ a: 1 }, [1, 2])
		expect(result).toBe(false)
	})

	it("should return true for two identical dates", () => {
		const date1 = new Date(2023, 0, 1)
		const date2 = new Date(2023, 0, 1)
		const result = isEqual(date1, date2)
		expect(result).toBe(true)
	})

	it("should return false for two different dates", () => {
		const date1 = new Date(2023, 0, 1)
		const date2 = new Date(2023, 0, 2)
		const result = isEqual(date1, date2)
		expect(result).toBe(false)
	})

	it("should return true for identical regex patterns", () => {
		const regex1 = /abc/i
		const regex2 = /abc/i
		const result = isEqual(regex1, regex2)
		expect(result).toBe(true)
	})

	it("should return false for different regex patterns", () => {
		const regex1 = /abc/i
		const regex2 = /def/i
		const result = isEqual(regex1, regex2)
		expect(result).toBe(false)
	})

	it("should return false for identical patterns with different flags", () => {
		const regex1 = /abc/i // case-insensitive
		const regex2 = /abc/g // global
		const result = isEqual(regex1, regex2)
		expect(result).toBe(false)
	})
})
