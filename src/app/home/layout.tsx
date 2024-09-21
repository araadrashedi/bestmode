import { LogOutIcon } from "lucide-react"

import { useAuth } from "@/lib/providers"
import { Button } from "@/lib/uikit/button"
import { Card } from "@/lib/uikit/card"

export function HomeLayout(props: { children: React.ReactNode; className?: string }) {
	const auth = useAuth()

	return (
		<main className="mx-auto max-w-7xl py-12 lg:py-32">
			<h1 className="sr-only">Bestmode</h1>
			<Card.Root className="border-none shadow-none">
				<Card.Header className="flex-row justify-between">
					<div>
						<h2 className="text-3xl font-bold leading-9 tracking-tight">Posts</h2>
						<Card.Description>Browse and Discover the Latest Stories</Card.Description>
					</div>

					<Button
						className="gap-2 p-0 sm:px-4 sm:py-[9px] max-md:size-10"
						variant="secondary"
						size="lg"
						onClick={auth.logout}
						aria-label="Logout your account"
					>
						<LogOutIcon className="size-5" />
						<span className="max-sm:sr-only">Logout</span>
					</Button>
				</Card.Header>
				<Card.Content className={props.className}>{props.children}</Card.Content>
			</Card.Root>
		</main>
	)
}
