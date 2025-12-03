"use client"

import { cn } from "@/lib/utils"

interface ProgressBarProps {
	currentStep: number
	totalSteps: number
	percentage?: number
}

export default function ProgressBar({ currentStep, totalSteps, percentage: percentageProp }: ProgressBarProps) {
	const percentage = percentageProp ?? Math.max(0, ((currentStep - 1) / totalSteps) * 100)

	return (
		<div className='w-full'>
			<div className='flex items-center justify-between mb-2'>
				<span className='text-sm font-medium text-neutral-700'>
					Step {currentStep} of {totalSteps}
				</span>
				<span className='text-sm text-neutral-500'>{Math.round(percentage)}%</span>
			</div>
			<div className='w-full h-2 bg-neutral-200 rounded-full overflow-hidden'>
				<div
					className='h-full bg-blue-600 transition-all duration-300 ease-out'
					style={{ width: `${percentage}%` }}
				/>
			</div>
		</div>
	)
}




