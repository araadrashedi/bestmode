/**
 * Finds the index of a reaction in an array of reactions based on its type.
 *
 * @param {Reaction[]} reactions - The array of reactions to search in.
 * @param {"+1"} reactionType - The type of reaction to search for.
 */
export function findReactionIndex(reactions: Reaction[], reactionType: "+1") {
	return reactions.findIndex((reaction) => reaction.reacted && reaction.reaction === reactionType)
}
