import { isNil } from "./is_nil.util"

/**
 * Cancels the given event.
 *
 *
 * @param {Event | React.BaseSyntheticEvent} event - the event to be canceled
 */
export function cancelEvent(event: Event | React.BaseSyntheticEvent) {
	if (isNil(event)) {
		return
	}

	try {
		// @ts-ignore
		const ev = event.originalEvent || event
		ev.stopPropagation()
		ev.preventDefault()
		// @ts-ignore
		ev.returnValue = false
		// @ts-ignore
		ev.cancelBubble = true
	} catch (err) {
		console.log(err)
	}
}
