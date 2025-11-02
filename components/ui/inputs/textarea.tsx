import type React from "react"
import { forwardRef } from "react"
import { cn } from "@/lib/utils"

interface TextareaProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ className, ...props }, ref) => {
		return (
			<textarea className={cn("input-field", className)} ref={ref} {...props} />
		)
	},
)

Textarea.displayName = "Textarea"

export { Textarea }
