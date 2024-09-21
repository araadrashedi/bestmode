import { isNil } from "@/lib/utils"

/**
 * Parses the content string of a post.
 *
 * @param {Maybe<Post>} post - The post to parse the content from.
 */
export function parseContentString(post: Maybe<Post>) {
	if (isNil(post)) {
		return
	}

	const content = post.fields.find((field) => field.key === "content")?.value ?? ""
	return { __html: content.replaceAll(`\"`, "") }
}
