import * as React from "react"

import { cn } from "@/lib/utils"

export const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
	({ className, ...props }, ref) => (
		<p ref={ref} className={cn("text-sm text-tertiary-foreground", className)} {...props} />
	)
)
CardDescription.displayName = "CardDescription"
