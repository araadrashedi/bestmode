import { CalendarIcon, UserIcon } from "lucide-react"

import { Image } from "@/lib/features/image"
import { LikeButton } from "@/lib/features/like_button"
import { Badge } from "@/lib/uikit/badge"
import { Card } from "@/lib/uikit/card"
import { Skeleton } from "@/lib/uikit/skeleton"
import { toRelativeTime } from "@/lib/utils"

import { parseContentString } from "./parse_content_string.helper"

type ArticleProps = Post

export function Article(props: ArticleProps) {
	const cover = props.fields.find((field) => field.key === "coverImage")
	const medias = cover?.relationEntities?.medias ?? []
	const firstMedia = medias[0] ?? {}
	const owner = props.owner.member

	return (
		<Card.Root className="border-none shadow-none">
			<div className="w-full mt-6 px-6 lg:px-0 relative after:absolute after:inset-0 after:rounded-sm after:bg-gradient-to-t after:from-background after:from-0% after:to-20%">
				<Image
					variant="cover"
					dominantColorHex={firstMedia.dominantColorHex}
					alt={props.title}
					src={firstMedia.url}
					srcset={firstMedia.urls}
				/>
			</div>

			<Card.Header className="space-y-4 pb-4">
				<div className="flex items-center gap-2">
					<div className="text-sm text-tertiary-foreground">
						<Badge className="gap-1" variant="outline">
							<CalendarIcon className="size-[1.25em]" />
							<span className="capitalize">
								<span className="sr-only">Published at:</span>
								{toRelativeTime(props.publishedAt)}
							</span>
						</Badge>
					</div>
					<div className="text-sm text-tertiary-foreground">
						<Badge className="gap-1" variant="outline">
							<UserIcon className="size-[1.25em]" />
							<span>
								<span className="sr-only">Created by:</span>
								{owner?.name}
							</span>
						</Badge>
					</div>
				</div>

				<Card.Title className="text-3xl font-bold text-balance">{props.title}</Card.Title>
			</Card.Header>
			<Card.Content className="pb-4">
				<article
					className="prose dark:prose-invert max-w-full text-pretty"
					// biome-ignore lint/security/noDangerouslySetInnerHtml: the content is sanitized by the backend
					dangerouslySetInnerHTML={parseContentString(props)}
				/>
			</Card.Content>
			<Card.Footer className="flex items-center gap-1">
				<LikeButton postId={props.id} reactions={props.reactions} reactionsCount={props.reactionsCount} />
			</Card.Footer>
		</Card.Root>
	)
}

//
// Skeleton
Article.Skeleton = () => {
	return (
		<Card.Root className="border-none shadow-none">
			<div className="w-full max-h-[288px] aspect-[21/9] mt-6 px-6 lg:px-0 relative after:absolute after:inset-0 after:rounded-sm after:bg-gradient-to-t after:from-background after:from-0% after:to-20%">
				<Skeleton className="w-full h-full object-cover rounded-lg" />
			</div>

			<Card.Header className="space-y-4 pb-4">
				<div className="flex items-center gap-2">
					<Skeleton className="rounded-full h-[26px] w-[110px]" />
					<Skeleton className="rounded-full h-[26px] w-[140px]" />
				</div>

				<Card.Title className="space-y-2">
					<Skeleton className="h-[31px] w-[80%]" />
					<Skeleton className="h-[31px] w-[70%]" />
				</Card.Title>
			</Card.Header>
			<Card.Content className="pb-4">
				<div className="space-y-4 py-2">
					<Skeleton className="h-4 w-ful" />
					<Skeleton className="h-4 w-ful" />
					<Skeleton className="h-4 w-[98%]" />
					<Skeleton className="h-4 w-ful" />
					<Skeleton className="h-4 w-[90%]" />
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-[80%]" />
					<Skeleton className="h-4 w-ful" />
					<Skeleton className="h-4 w-ful" />
					<Skeleton className="h-4 w-[98%]" />
					<Skeleton className="h-4 w-ful" />
					<Skeleton className="h-4 w-[90%]" />
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-[50%]" />
				</div>
			</Card.Content>
			<Card.Footer className="mt-auto flex items-center gap-1">
				<LikeButton.Skeleton />
			</Card.Footer>
		</Card.Root>
	)
}
