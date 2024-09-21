import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
	const { className, type, ...rest } = props
	return (
		<input
			type={type}
			className={cn(
				"flex  w-full rounded-md border border-tertiary bg-tertiary px-6 py-3 text-sm shadow-sm transition motion-safe:duration-200 placeholder:text-tertiary-foreground focus-visible:outline-none focus-visible:ring focus-visible:ring-ring/80 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
				className
			)}
			ref={ref}
			{...rest}
		/>
	)
})
Input.displayName = "Input"
