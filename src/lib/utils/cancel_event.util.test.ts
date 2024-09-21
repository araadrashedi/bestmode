// @ts-nocheck

import { describe, expect, it, vi } from "vitest"

import { cancelEvent, noop } from "@/lib/utils"

describe("cancelEvent", () => {
	it("should do nothing if the event is null", () => {
		const logSpy = vi.spyOn(console, "error").mockImplementation(noop)
		expect(() => cancelEvent(null)).not.toThrow()
		logSpy.mockRestore()
	})

	it("should do nothing if the event is undefined", () => {
		const logSpy = vi.spyOn(console, "error").mockImplementation(noop)
		expect(() => cancelEvent(undefined)).not.toThrow()
		logSpy.mockRestore()
	})

	it("should call stopPropagation on a standard event", () => {
		const mockEvent = {
			stopPropagation: vi.fn(),
			preventDefault: vi.fn(),
			returnValue: undefined,
			cancelBubble: false,
		}

		cancelEvent(mockEvent)
		expect(mockEvent.stopPropagation).toHaveBeenCalled()
	})

	it("should call preventDefault on a standard event", () => {
		const mockEvent = {
			stopPropagation: vi.fn(),
			preventDefault: vi.fn(),
			returnValue: undefined,
			cancelBubble: false,
		}

		cancelEvent(mockEvent)
		expect(mockEvent.preventDefault).toHaveBeenCalled()
	})

	it("should set returnValue to false on a standard event", () => {
		const mockEvent = {
			stopPropagation: vi.fn(),
			preventDefault: vi.fn(),
			returnValue: undefined,
			cancelBubble: false,
		}

		cancelEvent(mockEvent)
		expect(mockEvent.returnValue).toBe(false)
	})

	it("should set cancelBubble to true on a standard event", () => {
		const mockEvent = {
			stopPropagation: vi.fn(),
			preventDefault: vi.fn(),
			returnValue: undefined,
			cancelBubble: false,
		}

		cancelEvent(mockEvent)
		expect(mockEvent.cancelBubble).toBe(true)
	})

	it("should cancel a React synthetic event", () => {
		const mockEvent = {
			stopPropagation: vi.fn(),
			preventDefault: vi.fn(),
			originalEvent: {
				stopPropagation: vi.fn(),
				preventDefault: vi.fn(),
				returnValue: undefined,
				cancelBubble: false,
			},
		}

		cancelEvent(mockEvent as unknown as React.BaseSyntheticEvent)
		expect(mockEvent.originalEvent.stopPropagation).toHaveBeenCalled()
	})

	it("should call preventDefault on a React synthetic event", () => {
		const mockEvent = {
			stopPropagation: vi.fn(),
			preventDefault: vi.fn(),
			originalEvent: {
				stopPropagation: vi.fn(),
				preventDefault: vi.fn(),
				returnValue: undefined,
				cancelBubble: false,
			},
		}

		cancelEvent(mockEvent as unknown as React.BaseSyntheticEvent)
		expect(mockEvent.originalEvent.preventDefault).toHaveBeenCalled()
	})

	it("should set returnValue to false on a React synthetic event", () => {
		const mockEvent = {
			stopPropagation: vi.fn(),
			preventDefault: vi.fn(),
			originalEvent: {
				stopPropagation: vi.fn(),
				preventDefault: vi.fn(),
				returnValue: undefined,
				cancelBubble: false,
			},
		}

		cancelEvent(mockEvent as unknown as React.BaseSyntheticEvent)
		expect(mockEvent.originalEvent.returnValue).toBe(false)
	})

	it("should set cancelBubble to true on a React synthetic event", () => {
		const mockEvent = {
			stopPropagation: vi.fn(),
			preventDefault: vi.fn(),
			originalEvent: {
				stopPropagation: vi.fn(),
				preventDefault: vi.fn(),
				returnValue: undefined,
				cancelBubble: false,
			},
		}

		cancelEvent(mockEvent as unknown as React.BaseSyntheticEvent)
		expect(mockEvent.originalEvent.cancelBubble).toBe(true)
	})

	it("should handle errors gracefully", () => {
		const mockEvent = {
			stopPropagation: vi.fn(),
			preventDefault: vi.fn(),
			// Missing originalEvent to simulate error
		}
		const logSpy = vi.spyOn(console, "error").mockImplementation(noop)
		expect(() => cancelEvent(mockEvent)).not.toThrow()
		logSpy.mockRestore()
	})
})
