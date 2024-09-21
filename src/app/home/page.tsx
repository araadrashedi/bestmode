import React from "react"
import { Navigate } from "react-router-dom"

import { PostCard } from "@/app/home/components"
import { useGetPosts } from "@/lib/api"
import { Button } from "@/lib/uikit/button"
import { Separator } from "@/lib/uikit/separator"
import { isNil, range } from "@/lib/utils"

export function HomePage() {
	const { data, loading, error, fetchMore } = useGetPosts()
	const [isLoadingMore, setIsLoadingMore] = React.useState(false)

	if (!isNil(error) && isNil(data)) {
		return (
			<>
				<h4 className="text-3xl font-bold leading-9 tracking-tight test-foreground">Something went wrong!</h4>
				<p className="test-secondary-foreground">Details: {error.message}</p>
			</>
		)
	}
	if (!loading && isNil(data)) {
		return <Navigate to="/not-found" />
	}

	const handleFetchMore = async () => {
		setIsLoadingMore(true)
		await fetchMore({ variables: { after: data?.posts.pageInfo.endCursor } }).catch(console.log)
		setIsLoadingMore(false)
	}

	// TODO: add virtual list
	return (
		<div className="space-y-8">
			<div className="grid gap-8 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
				{!isNil(data)
					? data.posts.nodes.filter((node) => !isNil(node)).map((post) => <PostCard key={post.id} {...post} />)
					: range(6).map((key) => <PostCard.Skeleton key={key} />)}

				{isLoadingMore && range(6).map((key) => <PostCard.Skeleton key={key} />)}
			</div>

			<div className="flex justify-center">
				{!loading && !isLoadingMore && !isNil(data) && data.posts.pageInfo.hasNextPage ? (
					<Button size="lg" disabled={loading || isLoadingMore} onClick={handleFetchMore}>
						Show more
					</Button>
				) : (
					!loading &&
					!isLoadingMore && (
						<Separator.Root className="gap-2">
							<Separator.Text>
								<small className="px-2">Reached the end</small>
							</Separator.Text>
						</Separator.Root>
					)
				)}
			</div>
		</div>
	)
}
