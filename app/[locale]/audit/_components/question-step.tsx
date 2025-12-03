"use client"

import { Input } from "@/components/ui/inputs/input"
import { Select } from "@/components/ui/inputs/select"
import { Label } from "@/components/ui/inputs/label"
import { InputGroup } from "@/components/ui/inputs/input-group"
import { InputErrorMessage } from "@/components/ui/inputs/input-error-message"
import { cn } from "@/lib/utils"
import type { QuestionStep as QuestionStepType } from "@/types/audit"

interface QuestionStepProps {
	question: QuestionStepType
	value: string | string[]
	onChange: (value: string | string[]) => void
	error?: string
}

export default function QuestionStep({
	question,
	value,
	onChange,
	error,
}: QuestionStepProps) {
	const handleSelectChange = (selectedValue: string) => {
		if (question.multiSelect && Array.isArray(value)) {
			const newValue = value.includes(selectedValue)
				? value.filter((v) => v !== selectedValue)
				: [...value, selectedValue]
			onChange(newValue)
		} else {
			onChange(selectedValue)
		}
	}

	const handleScaleClick = (scaleValue: string) => {
		onChange(scaleValue)
	}

	if (question.type === "website") {
		return (
			<div className='space-y-4'>
				<InputGroup className={cn(error && "error")}>
					<Label htmlFor={question.id}>
						{question.label}
						{question.required && <span className='text-red-500 ml-1'>*</span>}
					</Label>
					{question.description && (
						<p className='text-sm text-neutral-600 mb-2'>{question.description}</p>
					)}
					<Input
						id={question.id}
						type='text'
						value={typeof value === "string" ? value : ""}
						onChange={(e) => {
							// Don't auto-add https:// on every keystroke, let user type freely
							onChange(e.target.value)
						}}
						onBlur={(e) => {
							// Only add https:// when user leaves the field and value doesn't have protocol
							let url = e.target.value.trim()
							if (url && !url.match(/^https?:\/\//i)) {
								url = "https://" + url
								onChange(url)
							}
						}}
						placeholder={question.placeholder}
					/>
					<InputErrorMessage>{error}</InputErrorMessage>
				</InputGroup>
			</div>
		)
	}

	if (question.type === "workflow-maturity" && question.options) {
		// Scale/rating question
		return (
			<div className='space-y-4'>
				<Label htmlFor={question.id}>
					{question.label}
					{question.required && <span className='text-red-500 ml-1'>*</span>}
				</Label>
				{question.description && (
					<p className='text-sm text-neutral-600 mb-4'>{question.description}</p>
				)}
				<div className='flex gap-3 justify-center'>
					{question.options.map((option) => {
						const isSelected =
							typeof value === "string" && value === option.value
						return (
							<button
								key={option.value}
								type='button'
								onClick={() => handleScaleClick(option.value)}
								className={cn(
									"w-16 h-16 rounded-lg border-2 font-bold text-lg transition-all",
									isSelected
										? "border-blue-600 bg-blue-600 text-white"
										: "border-neutral-300 bg-white text-neutral-700 hover:border-blue-400",
								)}
							>
								{option.label}
							</button>
						)
					})}
				</div>
				{error && (
					<p className='text-sm text-red-400 font-medium mt-2'>{error}</p>
				)}
			</div>
		)
	}

	if (question.multiSelect && question.options) {
		// Multi-select question
		return (
			<div className='space-y-4'>
				<Label htmlFor={question.id}>
					{question.label}
					{question.required && <span className='text-red-500 ml-1'>*</span>}
				</Label>
				{question.description && (
					<p className='text-sm text-neutral-600 mb-4'>{question.description}</p>
				)}
				<div className='space-y-2'>
					{question.options.map((option) => {
						const isSelected =
							Array.isArray(value) && value.includes(option.value)
						return (
							<button
								key={option.value}
								type='button'
								onClick={() => handleSelectChange(option.value)}
								className={cn(
									"w-full text-left px-4 py-3 rounded-lg border-2 transition-all",
									isSelected
										? "border-blue-600 bg-blue-50 text-blue-900"
										: "border-neutral-300 bg-white text-neutral-700 hover:border-blue-400",
								)}
							>
								{option.label}
							</button>
						)
					})}
				</div>
				{error && (
					<p className='text-sm text-red-400 font-medium mt-2'>{error}</p>
				)}
			</div>
		)
	}

	if (question.options) {
		// Single select question
		return (
			<div className='space-y-4'>
				<InputGroup className={cn(error && "error")}>
					<Label htmlFor={question.id}>
						{question.label}
						{question.required && <span className='text-red-500 ml-1'>*</span>}
					</Label>
					{question.description && (
						<p className='text-sm text-neutral-600 mb-4'>{question.description}</p>
					)}
					<Select
						id={question.id}
						value={typeof value === "string" ? value : ""}
						onChange={(val) => onChange(val)}
						options={question.options}
						placeholder='Select an option'
						hasError={!!error}
					/>
					<InputErrorMessage>{error}</InputErrorMessage>
				</InputGroup>
			</div>
		)
	}

	return null
}

