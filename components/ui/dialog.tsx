"use client"

import { useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { cn } from "@/lib/utils"

interface DialogProps {
	isOpen: boolean
	onClose: () => void
	children: React.ReactNode
	className?: string
}

export function Dialog({ isOpen, onClose, children, className }: DialogProps) {
	const overlayRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden"
		} else {
			document.body.style.overflow = "unset"
		}
		return () => {
			document.body.style.overflow = "unset"
		}
	}, [isOpen])

	// Close on escape key
	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose()
		}
		document.addEventListener("keydown", handleEscape)
		return () => document.removeEventListener("keydown", handleEscape)
	}, [onClose])

	// Close on click outside
	const handleClickOutside = (e: React.MouseEvent) => {
		if (e.target === overlayRef.current) {
			onClose()
		}
	}

	if (!isOpen) return null

	return createPortal(
		<div
			ref={overlayRef}
			className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200'
			onClick={handleClickOutside}
		>
			<div
				className={cn(
					"bg-white rounded-2xl p-6 shadow-xl max-w-md w-full relative animate-in zoom-in-95 duration-200",
					className,
				)}
			>
				<button
					onClick={onClose}
					className='absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors'
					aria-label='Close'
				>
					<svg
						width='24'
						height='24'
						viewBox='0 0 24 24'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M18 6L6 18M6 6L18 18'
							stroke='currentColor'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
						/>
					</svg>
				</button>
				{children}
			</div>
		</div>,
		document.body,
	)
}

