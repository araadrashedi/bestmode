import * as React from "react"

import { cn } from "@/lib/utils"

export const CardRoot = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => (
		<div ref={ref} className={cn("rounded-xl border bg-background text-foreground shadow", className)} {...props} />
	)
)
CardRoot.displayName = "CardRoot"
