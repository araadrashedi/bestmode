import { HeartIcon } from "lucide-react"

import { useAddReaction, useRemoveReaction } from "@/lib/api"
import { Button } from "@/lib/uikit/button"
import { Skeleton } from "@/lib/uikit/skeleton"
import { cancelEvent, toAttribute, toReadableNumeric } from "@/lib/utils"

type PostProps = {
	postId: string
	reactions: { reacted: boolean }[]
	reactionsCount: number
}

/**
 * Provides a button for liking a post.
 *
 * ## Behavior:
 * - Displays a thumbs-up icon that changes style based on whether the user has reacted.
 * - Toggles between adding and removing a reaction when clicked.
 * - Shows the number of reactions using a numeric output.
 * - Disables the button while the mutation is loading.
 *
 * ### Example:
 * ```tsx
 * import { LikeButton } from '@/lib/features/LikeButton';
 *
 * function Post() {
 *   const postId = "some-post-id";
 *   const reactions = [{ reacted: true }, { reacted: false }];
 *   const reactionsCount = 42;
 *
 *   return (
 *     <div>
 *       <LikeButton
 *         postId={postId}
 *         reactions={reactions}
 *         reactionsCount={reactionsCount}
 *       />
 *     </div>
 *   );
 * }
 * ```
 *
 * @param {PostProps} props
 */
export function LikeButton(props: PostProps) {
	const isReacted = props.reactions.some((reaction) => reaction.reacted)
	const [addReaction, addMutation] = useAddReaction({ postId: props.postId })
	const [removeReaction, removeMutation] = useRemoveReaction({ postId: props.postId })
	const isMutationLoading = addMutation.loading || removeMutation.loading

	const applyReaction = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		cancelEvent(event) // Prevent navigation side effect of the post card pressing
		isReacted ? removeReaction().catch(console.log) : addReaction().catch(console.log)
	}

	return (
		<Button
			className="px-4 py-[9px] gap-2 rounded-full select-none group"
			variant="secondary"
			size="lg"
			data-loading={toAttribute(isMutationLoading)}
			onClick={applyReaction}
			title="Like this post"
			aria-label={isReacted ? "Unlike" : "Like"}
		>
			<HeartIcon
				className="size-6 transition motion-safe:duration-200 data-[reacted]:stroke-red-600 group-hover:scale-[98%]"
				data-reacted={toAttribute(isReacted)}
			/>
			<span className="sr-only">Like</span>
			<output className="font-mono">{toReadableNumeric(Math.max(props.reactionsCount, 0))}</output>
		</Button>
	)
}

LikeButton.Skeleton = () => {
	return <Skeleton className="h-[42px] w-[70px] rounded-full" />
}
