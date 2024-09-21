import { type VariantProps, cva } from "class-variance-authority"
import type * as React from "react"

import { cn } from "@/lib/utils"

export const badgeVariants = cva(
	"inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
	{
		variants: {
			variant: {
				default: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
				outline: "text-foreground",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	}
)

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
	return <div className={cn(badgeVariants({ variant }), className)} data-variant={variant} {...props} />
}
