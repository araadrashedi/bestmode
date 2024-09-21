import { cn } from "@/lib/utils"
import { describe, expect, it } from "vitest"

describe("cn", () => {
	it("should merge multiple class names into a single string", () => {
		const result = cn("pt-4 mb-2", "pb-2 width-full", "mt-1")
		expect(result).toBe("pt-4 mb-2 pb-2 width-full mt-1")
	})

	it("should handle duplicate class names", () => {
		const result = cn("p-4", "p-4", "mt-1")
		expect(result).toBe("p-4 mt-1")
	})

	it("should return an empty string when no inputs are provided", () => {
		const result = cn()
		expect(result).toBe("")
	})

	it("should handle undefined and null inputs", () => {
		const result = cn("p-4", undefined, null, "mt-1")
		expect(result).toBe("p-4 mt-1")
	})
})
