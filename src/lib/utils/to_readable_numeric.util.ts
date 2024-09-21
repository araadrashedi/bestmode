import { isNumber } from "./is_number.util"

const ONE_MILLION = 1e6 as const
const ONE_THOUSAND = 1e3 as const

/**
 * Converts a number of reactions into a human-readable format. it prioritizes readability over precision
 *
 * @param {number} input - The number of reactions.
 * @param {string} [fallback="--"] - The fallback value to return if the input is not a number. Defaults to `"--"`.
 * @example
 * console.log(toReadableNumeric(123));      // "123"
 * console.log(toReadableNumeric(1234));     // "1.2K"
 * console.log(toReadableNumeric(1000000));  // "1M"
 * console.log(toReadableNumeric(1250489));  // "1.3M"
 * console.log(toReadableNumeric(1500000));  // "1.5M"
 */
export function toReadableNumeric(input: number, fallback = "--") {
	console.assert(isNumber(input), `Expected "input" to be a number. Received: ${input}`)

	if (!isNumber(input)) {
		return fallback
	}
	if (input >= ONE_MILLION) {
		return `${(input / ONE_MILLION).toFixed(1).replace(/\.0$/, "")}M`
	}
	if (input >= ONE_THOUSAND) {
		return `${(input / ONE_THOUSAND).toFixed(1).replace(/\.0$/, "")}K`
	}

	return input.toString()
}
