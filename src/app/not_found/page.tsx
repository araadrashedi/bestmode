import { Link } from "react-router-dom"

import { buttonVariants } from "@/lib/uikit/button"
import { cn } from "@/lib/utils"

export function NotFoundPage() {
	return (
		<main className="mx-auto max-w-7xl min-h-screen py-12 lg:py-32 flex flex-col justify-center">
			<h1 className="sr-only">Bestmode</h1>
			<section className="flex flex-col items-center justify-center">
				<h2 className="text-3xl font-bold leading-9 tracking-tight test-foreground">404 - Not Found</h2>
				<p className="test-secondary-foreground">The page you are looking for was not found.</p>
				<Link to="/" className={cn(buttonVariants({ size: "lg" }), "mt-4")}>
					Back to the home page
				</Link>
			</section>
		</main>
	)
}
