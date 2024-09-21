import { ChevronUpIcon } from "lucide-react"
import React from "react"

import { Button } from "@/lib/uikit/button"
import { attachEvent, isClient } from "@/lib/utils"

const THRESHOLD = 300 as const

/**
 * It displays a button to scroll the page to the top.
 *
 * ## Behavior:
 * - The button appears when the user scrolls down more than a specified threshold (default: `300`).
 * - It is placed at the bottom-right of the viewport.
 * - Clicking the button scrolls the page smoothly to the top.
 *
 * ## Example:
 * ```tsx
 * import { ScrollUpButton } from '@/lib/features/ScrollUpButton';
 *
 * function App() {
 *   return (
 *     <div>
 *       <ScrollUpButton />
 *     </div>
 *   );
 * }
 * ```
 */
export function ScrollUpButton() {
	const [showScrollButton, setShowScrollButton] = React.useState(false)

	const handleScroll = React.useCallback(() => {
		const scrollY = window.scrollY || document.documentElement.scrollTop
		setShowScrollButton(scrollY > THRESHOLD)
	}, [])

	React.useEffect(() => attachEvent(window, "scroll", handleScroll), [handleScroll])

	return (
		showScrollButton && (
			<Button
				className="size-8 md:size-10 gap-2 rounded-full select-none border-transparent fixed end-4 bottom-4 md:bottom-8 md:end-8 opacity-80 hover:opacity-100"
				size="icon"
				title="Scroll up"
				onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
			>
				<ChevronUpIcon className="size-4 md:size-6" />
				<span className="sr-only">Scroll up</span>
			</Button>
		)
	)
}
