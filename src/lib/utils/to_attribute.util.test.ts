import { describe, expect, it } from "vitest"

import { toAttribute } from "@/lib/utils"

describe("toAttribute", () => {
	it('should return "true" when passed a true input', () => {
		const result = toAttribute(true)
		expect(result).toBe("true")
	})

	it("should return undefined when passed a false input", () => {
		const result = toAttribute(false)
		expect(result).toBe(undefined)
	})

	it('should return the string "hello" when passed the string "hello"', () => {
		const result = toAttribute("hello")
		expect(result).toBe("hello")
	})

	it("should return undefined when passed null", () => {
		const result = toAttribute(null)
		expect(result).toBe(undefined)
	})

	it("should return undefined when passed undefined", () => {
		const result = toAttribute(undefined)
		expect(result).toBe(undefined)
	})

	it('should return the stringified number "123" when passed the number 123', () => {
		const result = toAttribute(123)
		expect(result).toBe("123")
	})

	it('should return the stringified object "[object Object]" when passed an object', () => {
		const result = toAttribute({ foo: "bar" })
		expect(result).toBe("[object Object]")
	})

	it('should return the stringified array "1,2,3" when passed an array', () => {
		const result = toAttribute([1, 2, 3])
		expect(result).toBe("1,2,3")
	})
})
