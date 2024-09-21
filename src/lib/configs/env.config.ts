import { isEmpty, isNil } from "@/lib/utils"

const accessToken = import.meta.env.VITE_BETTERMODE_ACCESS_TOKEN
if (isNil(accessToken) || isEmpty(accessToken)) {
	throw new Error("BETTERMODE_ACCESS_TOKEN is not defined in .env")
}

const spaceId = import.meta.env.VITE_BETTERMODE_SPACE_ID
if (isNil(spaceId) || isEmpty(spaceId)) {
	throw new Error("VITE_BETTERMODE_SPACE_ID is not defined in .env")
}

export const env = Object.freeze({
	ACCESS_TOKEN: accessToken,
	SPACE_IDS: [spaceId],
})
