import { useQuery } from "@apollo/client"

import { type GetPostResponse, getGetPostQuery } from "@/lib/api/api.queries"
import { ACCESS_TOKEN_CACHE_KEY } from "@/lib/providers"

type GetPostInput = {
	id: string
}

export function useGetPost(input: GetPostInput) {
	return useQuery<GetPostResponse>(getGetPostQuery(), {
		variables: { id: input.id },
		context: {
			headers: {
				"Authorization": `Bearer ${localStorage.getItem(ACCESS_TOKEN_CACHE_KEY)}`,
			},
		},
	})
}
