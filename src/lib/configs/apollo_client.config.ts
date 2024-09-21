import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from "@apollo/client"
import { RetryLink } from "@apollo/client/link/retry"
import { RestLink } from "apollo-link-rest"

import { merge, toMilliseconds } from "@/lib/utils"

/**
 * Creates an instance of the Apollo Client with a retry link and HTTP link.
 *
 */
export function createApolloClient() {
	const retryLink = new RetryLink({
		delay: {
			initial: toMilliseconds(2, "second"),
			max: toMilliseconds(2, "second"),
			jitter: false,
		},
	})

	const restLink = new RestLink({
		uri: "/app.bestmode/api",
		credentials: "include",
	})

	const httpLink = new HttpLink({
		uri: "/api.bestmode",
		credentials: "include",
	})

	const client = new ApolloClient({
		ssrMode: import.meta.env.SSR,
		link: ApolloLink.from([retryLink, restLink, httpLink]),
		defaultOptions: {
			watchQuery: {
				fetchPolicy: "cache-and-network",
				nextFetchPolicy: "cache-first",
				errorPolicy: "all",
			},
		},
		cache: new InMemoryCache({
			typePolicies: {
				Query: {
					fields: {
						posts: {
							keyArgs: ["spaceIds"], // NOTE: it depends on project scope
							merge: (existing, incoming) => merge(existing, incoming),
						},
					},
				},
			},
		}),
	})

	return client
}
