type PostLayoutProps = {
	children: React.ReactNode
}

export function PostLayout(props: PostLayoutProps) {
	return (
		<main className="mx-auto max-w-2xl py-12 lg:py-32 min-h-screen">
			<h1 className="sr-only">Bestmode</h1>
			{props.children}
		</main>
	)
}
