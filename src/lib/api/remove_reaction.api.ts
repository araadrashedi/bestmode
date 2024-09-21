import { type ApolloCache, useMutation } from "@apollo/client"

import { getRemoveReaction } from "@/lib/api/api.mutations"
import { type GetPostResponse, type GetPostsResponse, getGetPostQuery, getGetPostsQuery } from "@/lib/api/api.queries"
import { env } from "@/lib/configs"
import { ACCESS_TOKEN_CACHE_KEY } from "@/lib/providers"
import { isNil } from "@/lib/utils"
import { findReactionIndex } from "./api.helper"

type RemoveReactionInput = {
	postId: string
}

type RemoveReactionResponse = {
	removeReaction: {
		status: "failed" | "succeeded"
		__typename: "Action"
	}
}

/**
 * Removes a reaction from a post.
 *
 * @param {RemoveReactionInput} input
 */
export function useRemoveReaction(input: RemoveReactionInput) {
	return useMutation<RemoveReactionResponse>(getRemoveReaction(), {
		variables: {
			postId: input.postId,
			reaction: "+1",
		},
		context: {
			headers: {
				"Authorization": `Bearer ${localStorage.getItem(ACCESS_TOKEN_CACHE_KEY)}`,
			},
		},
		optimisticResponse: getOptimisticResponse(),
		update: (cache, result) => {
			if (result.data?.removeReaction.status === "failed") {
				return
			}

			const existingPosts: Maybe<GetPostsResponse> = cache.readQuery({
				query: getGetPostsQuery(),
				variables: { spaceIds: env.SPACE_IDS },
			})
			if (!isNil(existingPosts)) {
				updatePostsList(cache, existingPosts, input.postId)
				return
			}

			const existingPost: Maybe<GetPostResponse> = cache.readQuery({
				query: getGetPostQuery(),
				variables: { id: input.postId },
			})
			if (!isNil(existingPost)) {
				updateSinglePostReaction(cache, existingPost, input.postId)
			}
		},
	})
}

/**
 * Returns an optimistic response object for a successful reaction removal.
 *
 */
function getOptimisticResponse(): RemoveReactionResponse {
	return {
		removeReaction: {
			status: "succeeded",
			__typename: "Action",
		},
	}
}

/**
 * Updates the reactions of a post in the cache by removing a reaction.
 *
 * @param {ApolloCache<T>} cache - The Apollo cache instance.
 * @param {GetPostResponse} existingPost - The existing post object.
 * @param {string} postId - The ID of the post.
 */
function updateSinglePostReaction<T>(cache: ApolloCache<T>, existingPost: GetPostResponse, postId: string) {
	const reactions = existingPost.post.reactions
	const reactionIndex = findReactionIndex(reactions, "+1")
	if (reactionIndex === -1) {
		return
	}

	const override = structuredClone(existingPost)
	override.post.reactionsCount -= 1
	override.post.reactions[reactionIndex].count -= 1
	override.post.reactions[reactionIndex].reacted = false
	if (override.post.reactions[reactionIndex].count === 0) {
		override.post.reactions.splice(reactionIndex, 1)
	}

	cache.writeQuery({
		query: getGetPostQuery(),
		variables: { id: postId },
		data: override,
	})
}

/**
 * Updates the reactions of a post in the cache and writes the modified posts to the Apollo cache.
 *
 * @param {ApolloCache<T>} cache - The Apollo cache instance.
 * @param {GetPostsResponse} existingPosts - The existing posts object.
 * @param {string} postId - The ID of the post.
 */
function updatePostsList<T>(cache: ApolloCache<T>, existingPosts: GetPostsResponse, postId: string) {
	const nodeIndex = existingPosts.posts.nodes.findIndex((node) => node.id === postId)
	const reactions = existingPosts.posts.nodes[nodeIndex].reactions
	const reactionIndex = findReactionIndex(reactions, "+1")
	if (reactionIndex === -1) {
		return
	}

	const override = structuredClone(existingPosts)
	override.posts.nodes[nodeIndex].reactionsCount -= 1
	override.posts.nodes[nodeIndex].reactions[reactionIndex].count -= 1
	override.posts.nodes[nodeIndex].reactions[reactionIndex].reacted = false
	if (override.posts.nodes[nodeIndex].reactions[reactionIndex].count === 0) {
		override.posts.nodes[nodeIndex].reactions.splice(reactionIndex, 1)
	}

	cache.writeQuery({
		query: getGetPostsQuery(),
		variables: { spaceIds: env.SPACE_IDS },
		data: override,
		overwrite: true,
	})
}
