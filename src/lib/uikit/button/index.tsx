import { type VariantProps, cva } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib/utils"

export const buttonVariants = cva(
	"inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring focus-visible:ring-ring/80 focus-visible:ring-offset-2 focus-visible:ring-offset-background transition motion-safe:duration-200 disabled:pointer-events-none disabled:opacity-50",
	{
		variants: {
			variant: {
				default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
				secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
				link: "text-primary underline-offset-4 hover:underline",
			},
			size: {
				default: "h-9 px-4 py-2",
				sm: "h-8 rounded-md px-3 text-xs",
				lg: "h-10 rounded-md px-8",
				icon: "",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	}
)

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
	const { className, variant, size, type = "button", ...rest } = props

	return <button className={cn(buttonVariants({ variant, size, className }))} type={type} ref={ref} {...rest} />
})
Button.displayName = "Button"
