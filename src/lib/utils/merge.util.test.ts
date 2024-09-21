import { describe, expect, it } from "vitest"

import { merge } from "@/lib/utils"

describe("merge", () => {
	it("should merge two objects, overriding properties", () => {
		const initial = { a: 1, b: 2 }
		const override = { a: 3, c: 4 }
		const result = merge(initial, override)
		expect(result).toEqual({ a: 3, b: 2, c: 4 })
	})

	it("should merge nested objects", () => {
		const initial = { a: { b: 1 }, c: 2 }
		const override = { a: { b: 3, d: 4 } }
		const result = merge(initial, override)
		expect(result).toEqual({ a: { b: 3, d: 4 }, c: 2 })
	})

	it("should concatenate arrays and remove duplicates", () => {
		const initial = [1, 2, 3]
		const override = [2, 3, 4]
		const result = merge(initial, override)
		expect(result).toEqual([1, 2, 3, 4])
	})

	it("should handle merging arrays and objects", () => {
		const initial = { a: [1, 2], b: { x: 10 } }
		const override = { a: [2, 3], b: { y: 20 } }
		const result = merge(initial, override)
		expect(result).toEqual({ a: [1, 2, 3], b: { x: 10, y: 20 } })
	})

	it("should return the override value when initial is not of the same type", () => {
		const initial = 42
		const override = { a: 1 }
		const result = merge(initial, override)
		expect(result).toEqual({ a: 1 })
	})

	it("should return the initial value when override is not of the same type", () => {
		const initial = { a: 1 }
		const override = 42
		const result = merge(initial, override)
		expect(result).toEqual(42)
	})
})
