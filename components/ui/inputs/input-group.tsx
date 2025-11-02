import { cn } from "@/lib/utils"

export type Variant = "error" | "success" | undefined

interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode
	variant?: Variant
}

const InputGroup = ({
	className,
	children,
	variant,
	...props
}: InputGroupProps) => {
	const variantClass = variant ? variant : undefined

	return (
		<div
			className={cn("input-group group", variantClass, className)}
			{...props}
		>
			{children}
		</div>
	)
}

export { InputGroup }
