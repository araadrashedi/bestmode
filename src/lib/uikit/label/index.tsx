import { type VariantProps, cva } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib/utils"

const variants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70")

type LabelProps = React.HTMLAttributes<HTMLLabelElement> &
	VariantProps<typeof variants> & {
		htmlFor?: string
	}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>((props, ref) => {
	const { className, ...rest } = props

	return (
		<label
			ref={ref}
			className={cn(variants(), className)}
			htmlFor={props.htmlFor}
			onPointerDown={(event) => {
				//
				// only prevent text selection if clicking/touching inside the label itself
				const target = event.target as HTMLElement
				if (target.closest("button, input, select, textarea")) {
					return
				}

				props.onPointerDown?.(event)
				//
				// prevent text selection when double clicking/touching label
				if (!event.defaultPrevented && event.detail > 1) {
					event.preventDefault()
				}
			}}
			{...rest}
		/>
	)
})
Label.displayName = "Label"
