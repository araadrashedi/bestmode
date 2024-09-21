import { Button } from "@/lib/uikit/button"
import { attachEvent, isClient } from "@/lib/utils"
import { MoonStarIcon, SunIcon } from "lucide-react"
import React from "react"

const DARK_MODE_KEY = "dark_mode" as const

/**
 * A toggle button that switches between light and dark theme modes.
 *
 * ## Behavior:
 * - Initializes the theme based on the value stored in `localStorage` (`dark_mode_KEY`).
 * - Updates the `document.documentElement`'s class list to apply the dark mode class if `isDarkMode` is true.
 * - Toggles the theme mode when the button is clicked, and updates the `localStorage` accordingly.
 * - Listens for changes to the `localStorage` and updates the theme if it detects a change.
 *
 * ### Example:
 * ```jsx
 * import { ThemeModeToggle } from '@/lib/features/ThemeModeToggle';
 *
 * function App() {
 *   return (
 *     <div>
 *       <ThemeModeToggle />
 *     </div>
 *   );
 * }
 * ```
 */
export function ThemeModeToggle() {
	const [isDarkMode, setIsDarkMode] = React.useState(() => isClient() && localStorage.getItem(DARK_MODE_KEY) === "true")

	//
	//
	React.useEffect(
		() =>
			attachEvent(window, "storage", (event) => {
				const { key, newValue } = event as StorageEvent
				if (key !== DARK_MODE_KEY) {
					return
				}

				setIsDarkMode(newValue === "true")
			}),
		[]
	)
	React.useEffect(() => {
		isDarkMode ? document.documentElement.classList.add("dark") : document.documentElement.classList.remove("dark")
	}, [isDarkMode])

	return (
		<Button
			className="size-8 md:size-10 gap-2 rounded-full select-none fixed start-4 bottom-4 md:bottom-8 md:start-8 opacity-80 hover:opacity-100"
			size="icon"
			title={isDarkMode ? "Enable light mode" : "Enable dark mode"}
			onClick={() =>
				setIsDarkMode((prev) => {
					const next = !prev
					localStorage.setItem(DARK_MODE_KEY, String(next))
					return next
				})
			}
		>
			{isDarkMode ? <MoonStarIcon className="size-4 md:size-6" /> : <SunIcon className="size-4 md:size-6" />}
			<span className="sr-only">Change theme</span>
		</Button>
	)
}
