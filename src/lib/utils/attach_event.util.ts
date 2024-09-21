/**
 * Attaches an event listener to the given node.
 *
 * @param {Element | Window} node - The DOM element to attach the event to
 * @param {string} type - The type of event to listen for
 * @param {EventListener} listener - The event listener function
 * @example
 * attachEvent(document.body, "click", () => console.log("clicked"))
 */
export function attachEvent(node: Element | Window, type: string, listener: EventListener) {
	node.addEventListener(type, listener)
	return () => node.removeEventListener(type, listener)
}
