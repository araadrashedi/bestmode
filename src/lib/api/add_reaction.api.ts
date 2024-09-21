import { type ApolloCache, useMutation } from "@apollo/client"

import { getAddReaction } from "@/lib/api/api.mutations"
import { type GetPostResponse, type GetPostsResponse, getGetPostQuery, getGetPostsQuery } from "@/lib/api/api.queries"
import { env } from "@/lib/configs"
import { ACCESS_TOKEN_CACHE_KEY } from "@/lib/providers"
import { isNil } from "@/lib/utils"

import { findReactionIndex } from "./api.helper"

type AddReactionInput = {
	postId: string
}

type AddReactionResponse = {
	addReaction: {
		status: "failed" | "succeeded"
		__typename: "Action"
	}
}

/**
 * Adds a reaction to a post.
 *
 * @param {AddReactionInput} input
 */
export function useAddReaction(input: AddReactionInput) {
	return useMutation<AddReactionResponse>(getAddReaction(), {
		variables: {
			postId: input.postId,
			input: {
				reaction: "+1",
				overrideSingleChoiceReactions: false,
			},
		},
		context: {
			headers: {
				"Authorization": `Bearer ${localStorage.getItem(ACCESS_TOKEN_CACHE_KEY)}`,
			},
		},
		optimisticResponse: getOptimisticResponse(),
		update: (cache, result) => {
			if (result.data?.addReaction.status === "failed") {
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
 * Returns an optimistic response object for a successful reaction addition.
 *
 */
function getOptimisticResponse(): AddReactionResponse {
	return {
		addReaction: {
			status: "succeeded",
			__typename: "Action",
		},
	}
}

/**
 * Updates the reactions of a post in the cache.
 *
 * @param {ApolloCache<T>} cache - The Apollo cache instance.
 * @param {GetPostResponse} existingPost - The existing post object.
 * @param {string} postId - The ID of the post.
 */
function updateSinglePostReaction<T>(cache: ApolloCache<T>, existingPost: GetPostResponse, postId: string) {
	const reactions = existingPost.post.reactions
	const reactionIndex = findReactionIndex(reactions, "+1")
	const index = reactionIndex === -1 ? reactions.length : reactionIndex

	const override = structuredClone(existingPost)
	if (reactionIndex === -1) {
		override.post.reactions.push({
			count: 0,
			reaction: "+1",
			reacted: false,
			__typename: "PostReactionDetail",
		})
	}
	override.post.reactionsCount += 1
	override.post.reactions[index].count += 1
	override.post.reactions[index].reacted = true

	cache.writeQuery({
		query: getGetPostQuery(),
		variables: { id: postId },
		data: override,
		overwrite: true,
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
	const index = reactionIndex === -1 ? reactions.length : reactionIndex

	const override = structuredClone(existingPosts)
	if (reactionIndex === -1) {
		override.posts.nodes[nodeIndex].reactions.push({
			count: 0,
			reaction: "+1",
			reacted: false,
			__typename: "PostReactionDetail",
		})
	}
	override.posts.nodes[nodeIndex].reactionsCount += 1
	override.posts.nodes[nodeIndex].reactions[index].count += 1
	override.posts.nodes[nodeIndex].reactions[index].reacted = true

	cache.writeQuery({
		query: getGetPostsQuery(),
		variables: { spaceIds: env.SPACE_IDS },
		data: override,
		overwrite: true,
	})
}
