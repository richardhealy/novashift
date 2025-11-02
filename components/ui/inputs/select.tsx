import React, {
	forwardRef,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react"
import { cn } from "@/lib/utils"

export interface Option {
	value: string
	label: string
}

export interface SelectProps
	extends Omit<
		React.ButtonHTMLAttributes<HTMLButtonElement>,
		"onChange" | "type"
	> {
	label?: string
	value?: string
	onChange?: (value: string) => void
	options: Option[]
	placeholder?: string
	required?: boolean
	hasError?: boolean
	disabled?: boolean
	className?: string
	labelClassName?: string
	triggerClassName?: string
	optionsClassName?: string
	id?: string
}

const Select = forwardRef<HTMLButtonElement, SelectProps>(
	(
		{
			label,
			value = "",
			onChange,
			options,
			placeholder = "Select option",
			required = false,
			hasError = false,
			disabled = false,
			className,
			labelClassName,
			triggerClassName,
			optionsClassName,
			id: providedId,
			...props
		},
		ref,
	) => {
		const [isOpen, setIsOpen] = useState(false)
		const containerRef = useRef<HTMLDivElement>(null)
		const generatedId = React.useId()
		const id = providedId || generatedId

		const handleToggle = (e: React.MouseEvent) => {
			e.stopPropagation()
			if (!disabled) setIsOpen((prev) => !prev)
		}

		const handleSelect = (optionValue: string) => {
			onChange?.(optionValue)
			setIsOpen(false)
		}

		const handleKeyDown = useCallback((e: KeyboardEvent) => {
			if (e.key === "Escape") {
				setIsOpen(false)
			}
		}, [])

		useEffect(() => {
			if (isOpen) {
				const handleClickOutside = (e: MouseEvent) => {
					if (
						containerRef.current &&
						!containerRef.current.contains(e.target as Node)
					) {
						setIsOpen(false)
					}
				}
				document.addEventListener("click", handleClickOutside)
				document.addEventListener("keydown", handleKeyDown)
				return () => {
					document.removeEventListener("click", handleClickOutside)
					document.removeEventListener("keydown", handleKeyDown)
				}
			}
		}, [isOpen, handleKeyDown])

		const selectedOption =
			options.find((opt) => opt.value === value)?.label || placeholder
		const isActive = isOpen ? "active" : ""

		return (
			<div
				ref={containerRef}
				className={cn(
					"group/select relative",
					isActive,
					{ error: hasError, disabled: disabled },
					className,
				)}
			>
				<button
					ref={ref}
					type='button'
					id={id}
					role='combobox'
					aria-haspopup='listbox'
					aria-expanded={isOpen}
					onClick={handleToggle}
					disabled={disabled}
					className={cn("input-field", triggerClassName)}
					{...props}
				>
					<span className='selected-option'>{selectedOption}</span>
					<svg
						className='select-icon'
						width='20'
						height='20'
						viewBox='0 0 20 20'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<title>Arrow Icon</title>
						<path
							fillRule='evenodd'
							clipRule='evenodd'
							d='M5.53783 6.25L10.0003 10.8856L14.4628 6.25L15.8337 7.67713L10.0003 13.75L4.16699 7.67713L5.53783 6.25Z'
							fill='#000316'
						/>
					</svg>
				</button>
				<ul className={cn("select-options", optionsClassName)}>
					{options.map((option) => (
						<li key={option.value}>
							<button
								type='button'
								className={cn("select-option", {
									"bg-gray-100": value === option.value,
								})}
								onClick={() => handleSelect(option.value)}
								disabled={disabled}
							>
								{option.label}
							</button>
						</li>
					))}
				</ul>
			</div>
		)
	},
)

Select.displayName = "Select"

export { Select }
