import { useQuery } from "@apollo/client"

import { type GetPostsResponse, getGetPostsQuery } from "@/lib/api/api.queries"
import { env } from "@/lib/configs"
import { ACCESS_TOKEN_CACHE_KEY } from "@/lib/providers"

type GetPostsInput = {
	after?: string
}

export function useGetPosts(input?: GetPostsInput) {
	return useQuery<GetPostsResponse>(getGetPostsQuery(), {
		variables: {
			after: input?.after,
			limit: 6,
			spaceIds: env.SPACE_IDS,
			postTypeIds: ["eSLFXXqEr9WbWFJ"],
			orderByString: "publishedAt",
			reverse: true,
			filterBy: [],
		},
		context: {
			headers: {
				"Authorization": `Bearer ${localStorage.getItem(ACCESS_TOKEN_CACHE_KEY)}`,
			},
		},
	})
}
