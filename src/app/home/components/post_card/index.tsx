import { CalendarIcon } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

import { Image } from "@/lib/features/image"
import { LikeButton } from "@/lib/features/like_button"
import { Badge } from "@/lib/uikit/badge"
import { Card } from "@/lib/uikit/card"
import { Skeleton } from "@/lib/uikit/skeleton"
import { toRelativeTime } from "@/lib/utils"

type PostCardProps = Post

export function PostCard(props: PostCardProps) {
	const navigate = useNavigate()
	const link = `/${props.id}/${props.slug}`

	const cover = props?.fields.find((field) => field.key === "coverImage")
	const medias = cover?.relationEntities?.medias ?? []
	const firstMedia = medias[0] ?? {}

	const handleOnKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
		if (event.key !== "Enter" && event.key !== " ") {
			return
		}
		if ((event.target as HTMLElement).isSameNode(event.currentTarget)) {
			navigate(link)
		}
	}

	return (
		<Card.Root
			className="h-full flex flex-col focus-visible:ring focus-visible:ring-ring/80 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus:outline-none transition motion-safe:duration-200 cursor-pointer"
			tabIndex={0}
			onClick={() => navigate(link)}
			onKeyDown={handleOnKeyDown}
			role="link"
			aria-label={`View ${props.title}`}
		>
			<div className="w-full p-1 pb-0 relative after:absolute after:inset-0 after:rounded-sm after:bg-gradient-to-t after:from-background after:from-0% after:to-20%">
				<Image
					variant="post"
					alt={props.title}
					dominantColorHex={firstMedia.dominantColorHex}
					src={firstMedia.url}
					srcset={firstMedia.urls}
				/>
			</div>
			<Card.Header className="space-y-4 pb-4">
				<div className="text-sm text-tertiary-foreground">
					<Badge className="gap-1">
						<CalendarIcon className="size-[1.25em]" />
						<span className="capitalize">
							<span className="sr-only">Published at:</span>
							{toRelativeTime(props.publishedAt)}
						</span>
					</Badge>
				</div>
				<Card.Title className="text-xl text-balance">
					<Link to={link} aria-label={`View ${props.title}`} tabIndex={-1}>
						{props.title}
					</Link>
				</Card.Title>
			</Card.Header>
			<Card.Content className="flex-1 pb-4">
				<Link to={link} aria-label={`View ${props.title}`} tabIndex={-1}>
					<p className="prose dark:prose-invert break-words line-clamp-5 text-balance">{props.description}</p>
				</Link>
			</Card.Content>

			<Card.Footer className="flex items-center gap-1">
				<LikeButton postId={props.id} reactions={props.reactions} reactionsCount={props.reactionsCount} />
			</Card.Footer>
		</Card.Root>
	)
}

//
// Skeleton
PostCard.Skeleton = () => {
	return (
		<Card.Root className="h-full">
			<div className="w-full max-h-[393px] xl:max-h-[246px] aspect-[3/2] p-1 pb-0 relative after:absolute after:inset-0 after:rounded-sm after:bg-gradient-to-t after:from-background after:from-0% after:to-20%">
				<Skeleton className="w-full h-full rounded-lg" />
			</div>
			<Card.Header className="space-y-4 pb-4">
				<div className="text-sm text-tertiary-foreground">
					<Skeleton className="h-[26px] w-32 rounded-full" />
				</div>
				<Card.Title className="space-y-2">
					<Skeleton className="h-6 w-[85%]" />
					<Skeleton className="h-6 w-[75%] md:hidden xl:block" />
				</Card.Title>
			</Card.Header>
			<Card.Content className="flex-1 pb-4">
				<div className="space-y-3 py-2">
					<Skeleton className="h-4 w-ful" />
					<Skeleton className="h-4 w-[98%]" />
					<Skeleton className="h-4 w-[90%] md:hidden xl:block" />
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-[80%] md:hidden xl:block" />
				</div>
			</Card.Content>
			<Card.Footer className="flex items-center gap-1">
				<LikeButton.Skeleton />
			</Card.Footer>
		</Card.Root>
	)
}
