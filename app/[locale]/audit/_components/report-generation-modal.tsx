"use client"

import { useEffect, useState, useRef } from "react"
import { Dialog } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

interface ReportGenerationModalProps {
	isOpen: boolean
	isComplete?: boolean
}

type GenerationStage = 
	| "validating"
	| "calculating"
	| "analyzing"
	| "generating"
	| "finalizing"

const stages: Array<{ id: GenerationStage; label: string; description: string }> = [
	{
		id: "validating",
		label: "Validating responses",
		description: "Reviewing your assessment answers",
	},
	{
		id: "calculating",
		label: "Calculating readiness score",
		description: "Analyzing your operational maturity and capabilities",
	},
	{
		id: "analyzing",
		label: "Analyzing industry landscape",
		description: "Researching AI opportunities in your industry",
	},
	{
		id: "generating",
		label: "Generating personalized report",
		description: "Creating custom recommendations and insights",
	},
	{
		id: "finalizing",
		label: "Finalizing report",
		description: "Preparing your comprehensive AI readiness assessment",
	},
]

export default function ReportGenerationModal({ isOpen, isComplete = false }: ReportGenerationModalProps) {
	const [currentStageIndex, setCurrentStageIndex] = useState(0)
	const [progress, setProgress] = useState(0)
	const startTimeRef = useRef<number | null>(null)
	const intervalRef = useRef<NodeJS.Timeout | null>(null)
	const TARGET_DURATION = 60000 // 60 seconds in milliseconds

	// Progress timer - reaches 100% after 60 seconds
	useEffect(() => {
		if (!isOpen) {
			setCurrentStageIndex(0)
			setProgress(0)
			startTimeRef.current = null
			if (intervalRef.current) {
				clearInterval(intervalRef.current)
				intervalRef.current = null
			}
			return
		}

		// Start timer
		startTimeRef.current = Date.now()

		intervalRef.current = setInterval(() => {
			if (startTimeRef.current) {
				const elapsed = Date.now() - startTimeRef.current
				const newProgress = Math.min((elapsed / TARGET_DURATION) * 100, 100)
				setProgress(newProgress)

				// Update stage based on progress
				const stageProgress = (newProgress / 100) * stages.length
				const newStageIndex = Math.min(Math.floor(stageProgress), stages.length - 1)
				setCurrentStageIndex(newStageIndex)

				// If we've reached 100%, stop the timer
				if (newProgress >= 100) {
					if (intervalRef.current) {
						clearInterval(intervalRef.current)
						intervalRef.current = null
					}
				}
			}
		}, 100) // Update every 100ms for smooth animation

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current)
				intervalRef.current = null
			}
		}
	}, [isOpen])

	// If report completes early, smoothly animate to 100%
	useEffect(() => {
		if (isComplete && isOpen && progress < 100) {
			// Animate to 100% over 500ms
			const targetProgress = 100
			const startProgress = progress
			const duration = 500
			const startTime = Date.now()

			const animate = () => {
				const elapsed = Date.now() - startTime
				const newProgress = Math.min(
					startProgress + ((targetProgress - startProgress) * elapsed) / duration,
					100
				)
				setProgress(newProgress)

				// Update stage to final
				if (newProgress >= 100) {
					setCurrentStageIndex(stages.length - 1)
				} else {
					const stageProgress = (newProgress / 100) * stages.length
					setCurrentStageIndex(Math.min(Math.floor(stageProgress), stages.length - 1))
				}

				if (newProgress < 100) {
					requestAnimationFrame(animate)
				}
			}

			requestAnimationFrame(animate)
		}
	}, [isComplete, isOpen, progress])

	const currentStage = stages[currentStageIndex]
	const displayProgress = Math.min(progress, 100)

	return (
		<Dialog isOpen={isOpen} onClose={() => {}} className="max-w-lg max-h-[90vh] overflow-y-auto" hideCloseButton={true}>
			<div className="py-6 px-5">
				{/* Header */}
				<div className="text-center mb-6">
					<div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-3">
						<svg
							className="w-6 h-6 text-blue-600 animate-spin"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
						>
							<circle
								className="opacity-25"
								cx="12"
								cy="12"
								r="10"
								stroke="currentColor"
								strokeWidth="4"
							></circle>
							<path
								className="opacity-75"
								fill="currentColor"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
							></path>
						</svg>
					</div>
					<h2 className="text-xl font-bold text-neutral-900 mb-1">
						Generating Your AI Readiness Report
					</h2>
					<p className="text-sm text-neutral-600">
						This usually takes 30-60 seconds
					</p>
				</div>

				{/* Progress Stages */}
				<div className="space-y-2 mb-4">
					{stages.map((stage, index) => {
						const isActive = index === currentStageIndex
						const isCompleted = index < currentStageIndex
						const isPending = index > currentStageIndex

						return (
							<div
								key={stage.id}
								className={cn(
									"flex items-start gap-3 p-3 rounded-lg transition-all duration-300",
									isActive && "bg-blue-50 border-2 border-blue-200",
									isCompleted && "bg-green-50 border border-green-200",
									isPending && "bg-neutral-50 border border-neutral-200",
								)}
							>
								{/* Stage Icon */}
								<div className="flex-shrink-0 mt-0.5">
									{isCompleted ? (
										<div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
											<svg
												className="w-3 h-3 text-white"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M5 13l4 4L19 7"
												/>
											</svg>
										</div>
									) : isActive ? (
										<div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center">
											<div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
										</div>
									) : (
										<div className="w-5 h-5 rounded-full bg-neutral-300" />
									)}
								</div>

								{/* Stage Content */}
								<div className="flex-1 min-w-0">
									<div
										className={cn(
											"text-sm font-semibold mb-0.5 transition-colors",
											isActive && "text-blue-900",
											isCompleted && "text-green-900",
											isPending && "text-neutral-500",
										)}
									>
										{stage.label}
									</div>
									<div
										className={cn(
											"text-xs transition-colors",
											isActive && "text-blue-700",
											isCompleted && "text-green-700",
											isPending && "text-neutral-400",
										)}
									>
										{stage.description}
									</div>
								</div>
							</div>
						)
					})}
				</div>

				{/* Progress Bar */}
				<div className="mb-3">
					<div className="flex justify-between text-xs text-neutral-600 mb-1.5">
						<span>Progress</span>
						<span>{Math.round(displayProgress)}%</span>
					</div>
					<div className="w-full bg-neutral-200 rounded-full h-2 overflow-hidden">
						<div
							className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-300 ease-out"
							style={{
								width: `${displayProgress}%`,
							}}
						/>
					</div>
				</div>

				{/* Info Message */}
				<div className="text-center text-xs text-neutral-500 mt-4">
					<p>Please don't close this window while we generate your report.</p>
				</div>
			</div>
		</Dialog>
	)
}

