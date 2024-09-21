import { cn } from "@/lib/utils"

type SeparatorRootProps = {
	className?: string
	children: React.ReactNode
}

export function SeparatorRoot(props: SeparatorRootProps) {
	return (
		<div className={cn("flex items-center w-full", props.className)}>
			<div className="rounded-full flex-grow h-px bg-tertiary" />
			{props.children}
			<div className="rounded-full flex-grow h-px bg-tertiary" />
		</div>
	)
}
