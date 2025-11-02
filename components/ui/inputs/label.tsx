import type React from "react"
import { forwardRef } from "react"
import { cn } from "@/lib/utils"

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
	children: React.ReactNode
}

const Label = forwardRef<HTMLLabelElement, LabelProps>(
	({ className, htmlFor, children, ...props }, ref) => {
		return (
			<label
				ref={ref}
				htmlFor={htmlFor}
				className={cn("input-label", className)}
				{...props}
			>
				{children}
			</label>
		)
	},
)

Label.displayName = "Label"

export { Label }
