import { cn } from "@/lib/utils"

interface InputErrorMessageProps
	extends React.HTMLAttributes<HTMLParagraphElement> {
	children?: React.ReactNode
}

const InputErrorMessage = ({
	className,
	children,
	...props
}: InputErrorMessageProps) => {
	return (
		<p className={cn("input-error-message", className)} {...props}>
			{children}
		</p>
	)
}

export { InputErrorMessage }
