import { describe, expect, it, vi } from "vitest"

import { attachEvent } from "@/lib/utils"

describe("attachEvent", () => {
	it("should attach an event listener to a DOM element", () => {
		const mockListener = vi.fn()
		const mockElement = document.createElement("button")
		attachEvent(mockElement, "click", mockListener)
		mockElement.dispatchEvent(new Event("click"))

		expect(mockListener).toHaveBeenCalled()
	})

	it("should attach an event listener to the window object", () => {
		const mockListener = vi.fn()
		attachEvent(window, "resize", mockListener)
		window.dispatchEvent(new Event("resize"))

		expect(mockListener).toHaveBeenCalled()
	})

	it("should return a function to remove the event listener from a DOM element", () => {
		const mockListener = vi.fn()
		const mockElement = document.createElement("div")
		const removeListener = attachEvent(mockElement, "click", mockListener)
		removeListener()

		mockElement.dispatchEvent(new Event("click"))
		expect(mockListener).not.toHaveBeenCalled()
	})

	it("should return a function to remove the event listener from the window object", () => {
		const mockListener = vi.fn()
		const removeListener = attachEvent(window, "resize", mockListener)
		removeListener()
		window.dispatchEvent(new Event("resize"))

		expect(mockListener).not.toHaveBeenCalled()
	})
})
