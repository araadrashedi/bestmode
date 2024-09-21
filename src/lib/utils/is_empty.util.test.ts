// @ts-nocheck

import { describe, expect, it } from "vitest"

import { isEmpty } from "@/lib/utils"

describe("isEmpty", () => {
	it("should return true for an empty array", () => {
		const result = isEmpty([])
		expect(result).toBe(true)
	})

	it("should return true for an empty string", () => {
		const result = isEmpty("")
		expect(result).toBe(true)
	})

	it("should return false for a non-empty array", () => {
		const result = isEmpty([1, 2])
		expect(result).toBe(false)
	})

	it("should return false for a non-empty string", () => {
		const result = isEmpty("foo")
		expect(result).toBe(false)
	})

	it("should return false for undefined", () => {
		const result = isEmpty(undefined)
		expect(result).toBe(false)
	})

	it("should return false for null", () => {
		const result = isEmpty(null)
		expect(result).toBe(false)
	})
})
