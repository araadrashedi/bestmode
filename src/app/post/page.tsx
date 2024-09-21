import { ArrowLeftIcon } from "lucide-react"
import React from "react"
import { Link, Navigate, type Params, useParams } from "react-router-dom"

import { Article } from "@/app/post/components"
import { useGetPost } from "@/lib/api"
import { buttonVariants } from "@/lib/uikit/button"
import { cn, isNil } from "@/lib/utils"

export function PostPage() {
	React.useEffect(() => {
		window.scrollTo({ top: 0, behavior: "instant" })
	}, [])

	const params = useParams()
	if (!isPostPageParams(params)) {
		return <Navigate to="/" replace />
	}

	const { data, loading, error } = useGetPost(params)
	if (!isNil(error) && isNil(data)) {
		return <Navigate to="/not-found" />
	}
	if (!loading && isNil(data)) {
		return <Navigate to="/not-found" />
	}

	return (
		<div>
			<nav className="flex px-6 flex-row items-center gap-1">
				<Link
					to="/"
					className={cn(buttonVariants({ variant: "secondary" }), "size-10 p-0 rounded-full")}
					aria-label="Back to posts"
				>
					<ArrowLeftIcon className="size-5 shrink-0 mx-auto rtl:-scale-x-100" />
				</Link>
				<div className="flex-1">
					<Link
						to="/"
						className={cn(buttonVariants({ variant: "secondary" }), "h-10 px-4 py-[9px] rounded-full")}
						aria-label="Back to posts"
					>
						Back to posts
					</Link>
				</div>
			</nav>

			{!isNil(data) ? <Article {...data.post} /> : <Article.Skeleton />}
		</div>
	)
}

/**
 * Checks that the given input parameters contain an 'id' property.
 *
 * @param {Params} input - The input parameters to check.
 * @return {input is Readonly<{ id: string }>} True if the input contains an 'id' property, false otherwise.
 */
function isPostPageParams(input: Params): input is Readonly<{ id: string }> {
	return "id" in input
}
