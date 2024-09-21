import { describe, expect, it } from "vitest"

import { noop } from "@/lib/utils"

describe("noop", () => {
	it("should return undefined", () => {
		expect(noop()).toBeUndefined()
	})

	it("should not throw an error when called", () => {
		expect(noop).not.toThrow()
	})
})
