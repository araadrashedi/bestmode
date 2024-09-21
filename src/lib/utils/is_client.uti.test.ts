// @ts-nocheck

import { describe, expect, it } from "vitest"

import { isClient } from "@/lib/utils"

describe("isClient", () => {
	it("should return true if window is defined", () => {
		global.window = {} as Window // Assign a mock window object
		const result = isClient()
		expect(result).toBe(true)
	})

	it("should return false if window is not defined", () => {
		// Deleting the window object to simulate a non-browser environment
		// biome-ignore lint/performance/noDelete: server side
		delete global.window
		const result = isClient()
		expect(result).toBe(false)
	})
})
