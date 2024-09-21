import { cn } from "@/lib/utils"

type SeparatorTextProps = {
	className?: string
	children: React.ReactNode
}

export function SeparatorText(props: SeparatorTextProps) {
	return (
		<div
			className={cn("text-tertiary-foreground uppercase text-nowrap pointer-events-none select-none", props.className)}
		>
			{props.children}
		</div>
	)
}
