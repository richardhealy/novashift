"use client"

import { useState, useMemo, useEffect, useCallback } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import ProgressBar from "./progress-bar"
import QuestionStep from "./question-step"
import ResultsDisplay from "./results-display"
import ReportGenerationModal from "./report-generation-modal"
import {
	getQuestionSteps,
	getChallengesForIndustry,
} from "@/lib/audit/questions"
import type { IndustryChallenge } from "@/types/audit"
import type {
	AuditResponse,
	Industry,
	QuestionStep as QuestionStepType,
} from "@/types/audit"
import { cn } from "@/lib/utils"

interface AuditWizardProps {
	locale: string
}

type FormData = Partial<AuditResponse> & {
	selectedChallenges?: string[]
	challengeResponses?: Record<string, any>
}

export default function AuditWizard({ locale }: AuditWizardProps) {
	const router = useRouter()
	const searchParams = useSearchParams()
	const [currentStep, setCurrentStep] = useState(0)
	const [isGenerating, setIsGenerating] = useState(false)
	const [isReportComplete, setIsReportComplete] = useState(false)
	const [results, setResults] = useState<{
		scores: any
		reportData: any
		auditResponse: AuditResponse
	} | null>(null)
	const [auditResponseState, setAuditResponseState] = useState<AuditResponse | null>(null)
	const [error, setError] = useState<string | null>(null)

	const universalQuestions = getQuestionSteps()
	const [selectedIndustry, setSelectedIndustry] = useState<Industry | null>(null)
	const [selectedChallenges, setSelectedChallenges] = useState<string[]>([])
	const [challengeFollowUps, setChallengeFollowUps] = useState<
		Array<{
			challengeId: string
			challengeLabel: string
			questions: Array<{ id: string; label: string; type: string; options?: any[] }>
		}>
	>([])
	const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0)
	const [currentFollowUpQuestionIndex, setCurrentFollowUpQuestionIndex] = useState(0)

	// Build step sequence - maps step index to question/screen type
	const buildStepSequence = useMemo(() => {
		console.log("🔨 [BUILD STEP SEQUENCE] Starting...", {
			selectedIndustry,
			selectedChallenges,
			challengeFollowUpsCount: challengeFollowUps.length,
		})

		const sequence: Array<{ type: "question" | "challenge-selection" | "follow-up"; data: any }> = []

		// Add universal questions in order
		for (const question of universalQuestions) {
			sequence.push({ type: "question" as const, data: question })
		}
		console.log("📋 [BUILD STEP SEQUENCE] Universal questions added:", sequence.length)

		// If industry is selected, find industry question index and insert challenge selection + follow-ups after it
		if (selectedIndustry) {
			const industryIndex = sequence.findIndex(s => s.type === "question" && s.data.id === "industry")
			console.log("🏭 [BUILD STEP SEQUENCE] Industry selected, index:", industryIndex)

			if (industryIndex >= 0) {
				// Insert challenge selection after industry
				const challenges = getChallengesForIndustry(selectedIndustry)
				sequence.splice(industryIndex + 1, 0, {
					type: "challenge-selection" as const,
					data: { challenges, industry: selectedIndustry },
				})
				console.log("✅ [BUILD STEP SEQUENCE] Challenge selection inserted at index:", industryIndex + 1)

				// Insert follow-up questions after challenge selection
				if (selectedChallenges.length > 0 && challengeFollowUps.length > 0) {
					console.log("📝 [BUILD STEP SEQUENCE] Inserting follow-ups:", {
						selectedChallengesCount: selectedChallenges.length,
						followUpsCount: challengeFollowUps.length,
					})
					for (let i = 0; i < challengeFollowUps.length; i++) {
						const followUp = challengeFollowUps[i]
						sequence.splice(industryIndex + 2 + i, 0, {
							type: "follow-up" as const,
							data: {
								challengeId: followUp.challengeId,
								challengeLabel: followUp.challengeLabel,
								questions: followUp.questions,
								challengeIndex: i,
							},
						})
					}
					console.log("✅ [BUILD STEP SEQUENCE] Follow-ups inserted, total sequence length:", sequence.length)
				}
			}
		}

		console.log("🎯 [BUILD STEP SEQUENCE] Final sequence:", {
			totalSteps: sequence.length,
			steps: sequence.map((s, i) => ({
				index: i,
				type: s.type,
				id: s.type === "question" ? s.data.id : s.type === "follow-up" ? s.data.challengeId : "challenge-selection",
			})),
		})

		return sequence
	}, [universalQuestions, selectedIndustry, selectedChallenges, challengeFollowUps])

	// Initialize step from URL on mount - validate after sequence is built
	useEffect(() => {
		const stepParam = searchParams.get("step")
		if (stepParam) {
			const step = parseInt(stepParam, 10)
			console.log("🔗 [URL SYNC] Step param from URL:", stepParam, "parsed:", step, "sequence length:", buildStepSequence.length)
			if (!isNaN(step) && step >= 0) {
				// Validate step is within bounds
				if (step < buildStepSequence.length) {
					console.log("✅ [URL SYNC] Setting currentStep from URL:", step)
					setCurrentStep(step)
				} else {
					console.log("⚠️ [URL SYNC] Step from URL is out of bounds:", step, "max:", buildStepSequence.length - 1, "resetting to 0")
					setCurrentStep(0)
					updateStepInUrl(0)
				}
			}
		} else {
			// If no step param, ensure we start at step 0
			console.log("🔗 [URL SYNC] No step param, ensuring we start at step 0")
			if (currentStep !== 0) {
				setCurrentStep(0)
			}
			// Don't update URL if it's already clean (no step param)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [buildStepSequence.length])

	// Handle browser back/forward buttons
	useEffect(() => {
		const handlePopState = () => {
			const stepParam = new URLSearchParams(window.location.search).get("step")
			console.log("🔙 [POPSTATE] Browser navigation, step param:", stepParam)
			if (stepParam) {
				const step = parseInt(stepParam, 10)
				if (!isNaN(step) && step >= 0) {
					// Validate step is within bounds
					const validStep = Math.max(0, Math.min(step, buildStepSequence.length - 1))
					if (validStep !== step) {
						console.log("⚠️ [POPSTATE] Step out of bounds, adjusting:", step, "to", validStep)
					}
					console.log("✅ [POPSTATE] Setting currentStep from browser navigation:", validStep)
					setCurrentStep(validStep)
				}
			} else {
				// If no step param, go back to intro
				console.log("🔙 [POPSTATE] No step param, going to intro")
				router.push(`/${locale}/audit`)
			}
		}

		window.addEventListener("popstate", handlePopState)
		return () => window.removeEventListener("popstate", handlePopState)
	}, [router, locale, buildStepSequence.length])

	// Update URL when step changes (for browser back button)
	const updateStepInUrl = useCallback((step: number) => {
		// Validate step is within bounds - use a safe default if sequence not ready
		const maxStep = buildStepSequence.length > 0 ? buildStepSequence.length - 1 : 0
		const validStep = Math.max(0, Math.min(step, maxStep))
		if (validStep !== step) {
			console.log("⚠️ [UPDATE URL] Step out of bounds, adjusting:", step, "to", validStep)
		}
		const params = new URLSearchParams(searchParams.toString())
		params.set("step", validStep.toString())
		console.log("🔗 [UPDATE URL] Updating URL with step:", validStep)
		router.push(`/${locale}/audit?${params.toString()}`, { scroll: false })
	}, [router, locale, searchParams, buildStepSequence.length])

	// Build form schema dynamically
	const formSchema = useMemo(() => {
		const schema: Record<string, z.ZodTypeAny> = {
			role: z.string().min(1, "Please select your role"),
			companySize: z.string().min(1, "Please select company size"),
			workflowMaturity: z.string().min(1, "Please select workflow maturity"),
			sopLevel: z.string().min(1, "Please select SOP level"),
			integrationLevel: z.string().min(1, "Please select integration level"),
			dataQuality: z.string().min(1, "Please select data quality"),
			technicalCapability: z.string().min(1, "Please select technical capability"),
			teamOpenness: z.string().min(1, "Please select team openness"),
			industry: z.string().min(1, "Please select your industry"),
			websiteUrl: z.string().optional(),
			tools: z.array(z.string()).optional(),
			selectedChallenges: z.array(z.string()).optional(),
			challengeResponses: z.record(z.string(), z.any()).optional(),
		}
		return z.object(schema)
	}, [])

	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(formSchema),
		mode: "onChange",
		defaultValues: {
			tools: [],
			selectedChallenges: [],
			challengeResponses: {},
		},
	})

	const formValues = watch()

	// Build step list dynamically
	const steps = useMemo(() => {
		const stepList: Array<{
			type: "question" | "challenge-selection" | "follow-up"
			data: any
		}> = []

		// Add universal questions
		for (const question of universalQuestions) {
			if (question.id === "industry") {
				// Industry question triggers challenge selection
				stepList.push({ type: "question", data: question })
				// Challenge selection will be added after industry is selected
			} else {
				stepList.push({ type: "question", data: question })
			}
		}

		return stepList
	}, [universalQuestions])

	// Handle industry selection - add challenge selection step
	const handleIndustryChange = (industry: Industry) => {
		console.log("🏭 [INDUSTRY CHANGE] Industry selected:", industry)
		console.log("🏭 [INDUSTRY CHANGE] Current step before change:", currentStep)

		setValue("industry", industry)
		setSelectedIndustry(industry)
		setSelectedChallenges([])
		setChallengeFollowUps([])

		// Don't auto-advance - user must press Next
		// Ensure we're at the industry question so challenge selection appears next
		const industryQuestionIndex = universalQuestions.findIndex(q => q.id === "industry")
		console.log("🏭 [INDUSTRY CHANGE] Industry question index:", industryQuestionIndex)

		if (industryQuestionIndex >= 0) {
			// If currentStep is past the industry question, adjust it to point to industry
			// so that when they click Next, they'll see challenge selection
			if (currentStep > industryQuestionIndex) {
				console.log("🏭 [INDUSTRY CHANGE] Adjusting currentStep from", currentStep, "to", industryQuestionIndex)
				setCurrentStep(industryQuestionIndex)
				updateStepInUrl(industryQuestionIndex)
			}
		}
	}

	// Handle challenge selection
	const handleChallengeSelection = (challengeIds: string[]) => {
		setSelectedChallenges(challengeIds)
		setValue("selectedChallenges", challengeIds)
		setCurrentChallengeIndex(0) // Reset to first challenge

		// Build follow-up questions for selected challenges
		if (selectedIndustry) {
			const challenges = getChallengesForIndustry(selectedIndustry)
			const followUps: typeof challengeFollowUps = []

			for (const challengeId of challengeIds) {
				const challenge = challenges.find((c) => c.id === challengeId)
				if (challenge) {
					followUps.push({
						challengeId: challenge.id,
						challengeLabel: challenge.label,
						questions: challenge.followUpQuestions,
					})
				}
			}

			setChallengeFollowUps(followUps)
		}
	}

	// Get current step data based on currentStep index
	// Use useMemo to prevent recalculation when values change (only when currentStep or sequence changes)
	const currentStepData = useMemo(() => {
		console.log("📍 [CURRENT STEP DATA] Calculating...", {
			currentStep,
			sequenceLength: buildStepSequence.length,
			hasResults: !!results,
			selectedIndustry,
			selectedChallengesCount: selectedChallenges.length,
		})

		if (results) {
			console.log("✅ [CURRENT STEP DATA] Showing results")
			return { type: "results" as const, data: results }
		}

		// Validate currentStep is within bounds - if not, reset to last valid step
		if (currentStep < 0 || currentStep >= buildStepSequence.length) {
			console.log("⚠️ [CURRENT STEP DATA] currentStep out of bounds:", currentStep, "max:", buildStepSequence.length - 1, "sequence length:", buildStepSequence.length)
			const validStep = buildStepSequence.length > 0 ? Math.max(0, Math.min(currentStep, buildStepSequence.length - 1)) : 0
			console.log("🔧 [CURRENT STEP DATA] Resetting to valid step:", validStep)
			// Use useEffect to avoid state update during render
			if (buildStepSequence.length > 0) {
				// Return the step at the valid index for now, will be corrected on next render
				return buildStepSequence[validStep]
			}
			return null
		}

		// Get the step at currentStep index
		if (currentStep >= 0 && currentStep < buildStepSequence.length) {
			const step = buildStepSequence[currentStep]
			console.log("✅ [CURRENT STEP DATA] Step found:", {
				index: currentStep,
				type: step.type,
				id: step.type === "question" ? step.data.id : step.type === "follow-up" ? step.data.challengeId : "challenge-selection",
			})
			return step
		}

		// If we've gone past all steps, check if we should show challenge selection
		// This handles the case where user selects industry but currentStep is beyond sequence
		if (selectedIndustry && selectedChallenges.length === 0 && buildStepSequence.length > 0) {
			// Find challenge selection in the sequence
			const challengeSelectionIndex = buildStepSequence.findIndex(s => s.type === "challenge-selection")
			if (challengeSelectionIndex >= 0) {
				console.log("⚠️ [CURRENT STEP DATA] Past all steps, showing challenge selection at index:", challengeSelectionIndex)
				return buildStepSequence[challengeSelectionIndex]
			}
		}

		// If we've gone past all steps, all questions are answered
		console.log("❌ [CURRENT STEP DATA] No step data - all questions answered or error")
		return null
	}, [results, currentStep, buildStepSequence, selectedIndustry, selectedChallenges])

	// Check if we're truly at the end of all questions (including industry-specific)
	const isAtEndOfAllQuestions = useMemo(() => {
		// If sequence is empty, we're not at the end
		if (buildStepSequence.length === 0) {
			return false
		}

		// Get current step data
		const currentStepData = buildStepSequence[currentStep]

		// If we're not at the last step of the sequence, we're not at the end
		if (currentStep < buildStepSequence.length - 1) {
			console.log("🔍 [IS AT END] Not at last step:", currentStep, "of", buildStepSequence.length - 1)
			return false
		}

		// If we're at the last step, check if it's the industry question
		if (currentStepData?.type === "question" && currentStepData.data.id === "industry") {
			console.log("🔍 [IS AT END] On industry question, checking if industry selected:", selectedIndustry)
			// If we're on the industry question, we're only at the end if:
			// 1. Industry is selected
			// 2. Challenges are selected
			// 3. All follow-ups are complete (challengeFollowUps is empty, meaning all follow-ups have been answered)
			if (!selectedIndustry) {
				console.log("🔍 [IS AT END] Industry not selected yet, more questions coming")
				return false // Industry not selected yet, more questions coming
			}
			if (selectedChallenges.length === 0) {
				console.log("🔍 [IS AT END] Challenges not selected yet, more questions coming")
				return false // Challenges not selected yet, more questions coming
			}
			// Check if all follow-ups are complete
			// challengeFollowUps contains the follow-up questions that need to be answered
			// If it's not empty, we still have follow-ups to complete
			if (challengeFollowUps.length > 0) {
				console.log("🔍 [IS AT END] Follow-ups still pending:", challengeFollowUps.length)
				return false // We have follow-ups, so we're not at the end yet
			}
			console.log("🔍 [IS AT END] All industry questions complete, at the end")
		}

		// If we're on challenge selection, we're not at the end
		if (currentStepData?.type === "challenge-selection") {
			console.log("🔍 [IS AT END] On challenge selection, not at end")
			return false
		}

		// If we're on a follow-up question, we're not at the end
		if (currentStepData?.type === "follow-up") {
			console.log("🔍 [IS AT END] On follow-up question, not at end")
			return false
		}

		// Otherwise, we're at the end
		console.log("🔍 [IS AT END] At the end of all questions")
		return true
	}, [currentStep, buildStepSequence, selectedIndustry, selectedChallenges, challengeFollowUps.length])

	// Validate and fix currentStep if it's out of bounds
	useEffect(() => {
		if (buildStepSequence.length > 0 && (currentStep < 0 || currentStep >= buildStepSequence.length)) {
			const validStep = Math.max(0, Math.min(currentStep, buildStepSequence.length - 1))
			console.log("🔧 [STEP VALIDATION] Fixing out-of-bounds step:", currentStep, "->", validStep, "sequence length:", buildStepSequence.length)
			setCurrentStep(validStep)
			updateStepInUrl(validStep)
		}
	}, [currentStep, buildStepSequence.length, updateStepInUrl])



	// Calculate total steps and current progress
	// Calculate total steps and current progress
	const { totalSteps, currentProgress } = useMemo(() => {
		// Start with universal questions (always 11)
		let total = universalQuestions.length

		// If industry is selected, add challenge selection step (1 step)
		if (selectedIndustry) {
			total += 1

			// Add follow-up questions for selected challenges
			// Each challenge is 1 step in the main wizard (containing multiple internal questions)
			// Assume at least 1 challenge to prevent progress bar from jumping to 100%
			// before user selects challenges
			const challengeCount = Math.max(selectedChallenges.length, 1)
			total += challengeCount
		}

		// Current progress is currentStep + 1 (since steps are 0-indexed)
		const progress = currentStep + 1

		const percentage = total > 0 ? (progress / total) * 100 : 0
		console.log("📊 [PROGRESS] Calculating progress:", {
			currentStep,
			progress,
			total,
			percentage: Math.round(percentage),
			selectedIndustry,
			selectedChallengesCount: selectedChallenges.length,
			universalQuestionsCount: universalQuestions.length,
		})

		return { totalSteps: total, currentProgress: progress }
	}, [universalQuestions.length, currentStep, selectedIndustry, selectedChallenges.length])

	const handleNext = () => {
		console.log("➡️ [HANDLE NEXT] Called", {
			currentStep,
			sequenceLength: buildStepSequence.length,
			stepData: currentStepData ? {
				type: currentStepData.type,
				id: currentStepData.type === "question" ? currentStepData.data.id : currentStepData.type === "follow-up" ? currentStepData.data.challengeId : "challenge-selection",
			} : null,
		})

		const stepData = currentStepData

		if (!stepData) {
			console.log("✅ [HANDLE NEXT] No step data - all complete, submitting...")
			// All steps complete, trigger submission
			const formData = formValues as FormData
			console.log("📤 [HANDLE NEXT] Form data to submit:", formData)
			onSubmit(formData)
			return
		}

		if (stepData.type === "challenge-selection") {
			console.log("🎯 [HANDLE NEXT] Challenge selection step")
			// Validate challenge selection
			if (selectedChallenges.length === 0) {
				console.log("❌ [HANDLE NEXT] No challenges selected")
				setError("Please select at least one challenge")
				return
			}
			setError(null)
			const nextStep = currentStep + 1
			console.log("➡️ [HANDLE NEXT] Moving to next step:", nextStep, "of", buildStepSequence.length)
			if (nextStep < buildStepSequence.length) {
				setCurrentStep(nextStep)
				updateStepInUrl(nextStep)
				window.scrollTo({ top: 0, behavior: "smooth" })
			} else {
				console.log("✅ [HANDLE NEXT] Past all steps, submitting...")
				// All steps complete, trigger submission
				const formData = formValues as FormData
				onSubmit(formData)
			}
		} else if (stepData.type === "follow-up") {
			console.log("➡️ [HANDLE NEXT] Follow-up step")
			// Validate follow-up questions
			const questions = stepData.data.questions
			const challengeId = stepData.data.challengeId
			const responses = formValues.challengeResponses?.[challengeId] || {}

			const allAnswered = questions.every((q: any) => responses[q.id])

			if (!allAnswered) {
				console.log("❌ [HANDLE NEXT] Follow-up questions not all answered")
				setError("Please answer all questions before proceeding")
				return
			}

			setError(null)
			const nextStep = currentStep + 1
			if (nextStep < buildStepSequence.length) {
				setCurrentStep(nextStep)
				updateStepInUrl(nextStep)
				window.scrollTo({ top: 0, behavior: "smooth" })
			} else {
				console.log("✅ [HANDLE NEXT] Past all steps from follow-up, submitting...")
				const formData = formValues as FormData
				onSubmit(formData)
			}
		} else {
			console.log("❓ [HANDLE NEXT] Regular question step:", stepData.data.id)
			// Regular question - validate
			const question = stepData.data as QuestionStepType
			if (question?.required) {
				const value = formValues[question.id as keyof FormData]
				if (!value || (Array.isArray(value) && value.length === 0)) {
					console.log("❌ [HANDLE NEXT] Question not answered:", question.id)
					setError(`Please answer: ${question.label}`)
					return
				}
			}
			setError(null)
			const nextStep = currentStep + 1
			console.log("➡️ [HANDLE NEXT] Moving to next step:", nextStep, "of", buildStepSequence.length)
			if (nextStep < buildStepSequence.length) {
				setCurrentStep(nextStep)
				updateStepInUrl(nextStep)
				window.scrollTo({ top: 0, behavior: "smooth" })
			} else {
				console.log("✅ [HANDLE NEXT] Past all steps, submitting...")
				// All steps complete, trigger submission
				const formData = formValues as FormData
				onSubmit(formData)
			}
		}
	}

	const handleBack = () => {
		if (currentStep > 0) {
			const prevStep = currentStep - 1
			setCurrentStep(prevStep)
			updateStepInUrl(prevStep)
			setError(null)
		} else {
			// Go back to intro if at first step
			router.push(`/${locale}/audit`)
		}
	}

	const onSubmit = async (data: FormData) => {
		console.log("🚀 [ON SUBMIT] Starting submission...")
		console.log("📋 [ON SUBMIT] Form data:", JSON.stringify(data, null, 2))
		console.log("📋 [ON SUBMIT] Selected challenges:", selectedChallenges)
		console.log("📋 [ON SUBMIT] Challenge responses:", data.challengeResponses)
		console.log("📋 [ON SUBMIT] Current step:", currentStep, "of", buildStepSequence.length)
		console.log("📋 [ON SUBMIT] Step sequence:", buildStepSequence.map((s, i) => ({
			index: i,
			type: s.type,
			id: s.type === "question" ? s.data.id : s.type === "follow-up" ? s.data.challengeId : "challenge-selection",
		})))

		setIsGenerating(true)
		setError(null)

		try {
			// Validate required fields before building response
			// Note: form uses kebab-case IDs, so we need to access them with bracket notation
			const dataAny = data as any
			const missingFields: string[] = []
			if (!dataAny.role) missingFields.push("role")
			if (!dataAny.industry) missingFields.push("industry")
			if (!dataAny["company-size"]) missingFields.push("company-size")
			if (!dataAny["workflow-maturity"]) missingFields.push("workflow-maturity")
			if (!dataAny["sop-level"]) missingFields.push("sop-level")
			if (!dataAny["integration-level"]) missingFields.push("integration-level")
			if (!dataAny["data-quality"]) missingFields.push("data-quality")
			if (!dataAny["technical-capability"]) missingFields.push("technical-capability")
			if (!dataAny["team-openness"]) missingFields.push("team-openness")

			if (missingFields.length > 0) {
				console.error("❌ [ON SUBMIT] Missing required fields:", missingFields)
				setError(`Please complete all required questions. Missing: ${missingFields.join(", ")}`)
				setIsGenerating(false)
				return
			}

			// Build complete audit response
			// Map kebab-case form field names to camelCase API field names
			const auditResponse: AuditResponse = {
				role: dataAny.role as any,
				industry: dataAny.industry as Industry,
				companySize: dataAny["company-size"] as any,
				workflowMaturity: dataAny["workflow-maturity"] as any,
				sopLevel: dataAny["sop-level"] as any,
				integrationLevel: dataAny["integration-level"] as any,
				dataQuality: dataAny["data-quality"] as any,
				tools: dataAny.tools || [],
				technicalCapability: dataAny["technical-capability"] as any,
				teamOpenness: dataAny["team-openness"] as any,
				websiteUrl: dataAny.websiteUrl || dataAny.website,
				selectedChallenges: selectedChallenges,
				challengeResponses: dataAny.challengeResponses || {},
			}

			console.log("📤 [ON SUBMIT] Audit response to send:", JSON.stringify(auditResponse, null, 2))
			console.log("✅ [ON SUBMIT] All required fields present")

			// Call API to generate report
			const response = await fetch(`/audit/api/generate-report`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ responses: auditResponse }),
			})

			if (!response.ok) {
				const errorData = await response.json()
				throw new Error(errorData.error || "Failed to generate report")
			}

			const result = await response.json()
			console.log("✅ [ON SUBMIT] Report generated successfully:", result)

			// Mark report as complete - this will trigger smooth animation to 100%
			setIsReportComplete(true)

			// Wait a moment for progress to reach 100%, then show results
			setTimeout(() => {
				setAuditResponseState(auditResponse)
				setResults({
					...result,
					auditResponse,
				})
				setIsGenerating(false)
				setIsReportComplete(false)
				console.log("✅ [ON SUBMIT] Results set, showing results display")
			}, 600) // Small delay to allow progress animation to complete
		} catch (err) {
			console.error("❌ [ON SUBMIT] Error generating report:", err)
			setError(
				err instanceof Error ? err.message : "Failed to generate report. Please try again.",
			)
			setIsGenerating(false)
			setIsReportComplete(false)
		}
	}

	if (results) {
		return <ResultsDisplay results={results} auditResponse={results.auditResponse} locale={locale} />
	}

	if (!currentStepData) {
		return (
			<div className='w-full max-w-3xl mx-auto text-center py-12 pb-24'>
				<ProgressBar currentStep={totalSteps} totalSteps={totalSteps} percentage={100} />
				<div className='mt-8'>
					<p className='text-neutral-600 mb-6'>No more questions. Ready to submit?</p>
					<div className='flex justify-center'>
						<Button
							onClick={() => {
								// Get current form values and submit
								const formData = formValues as FormData
								onSubmit(formData)
							}}
							size='lg'
							withIcon
							disabled={isGenerating}
						>
							{isGenerating ? "Generating Report..." : "Generate Report"}
						</Button>
					</div>
					{error && (
						<div className='mt-4 p-4 rounded-lg bg-red-50 text-red-800 border border-red-200'>
							{error}
						</div>
					)}
				</div>
				{/* Floating navigation for final step */}
				<div className='fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 shadow-lg z-50'>
					<div className='container max-w-4xl mx-auto px-4 py-4'>
						<div className='flex justify-between items-center'>
							<Button
								variant='outline'
								onClick={handleBack}
							>
								Back
							</Button>
							<Button
								onClick={() => {
									const formData = formValues as FormData
									onSubmit(formData)
								}}
								withIcon
								disabled={isGenerating}
							>
								{isGenerating ? "Generating..." : "Generate Report"}
							</Button>
						</div>
					</div>
				</div>
			</div>
		)
	}

	return (
		<>
			{/* Report Generation Modal */}
			<ReportGenerationModal isOpen={isGenerating} isComplete={isReportComplete} />

			<div className='w-full max-w-3xl mx-auto pb-24'>
				<ProgressBar currentStep={currentProgress} totalSteps={totalSteps} />

				<div className='mt-8 min-h-[400px]'>
					{currentStepData.type === "challenge-selection" && (
						<ChallengeSelectionStep
							challenges={currentStepData.data.challenges}
							selectedChallenges={selectedChallenges}
							onSelect={handleChallengeSelection}
							error={error}
						/>
					)}

					{currentStepData.type === "follow-up" && (
						<FollowUpStep
							challengeLabel={currentStepData.data.challengeLabel}
							questions={currentStepData.data.questions}
							values={formValues.challengeResponses?.[currentStepData.data.challengeId] || {}}
							onChange={(values) => {
								setValue("challengeResponses", {
									...formValues.challengeResponses,
									[currentStepData.data.challengeId]: values,
								})
								// Clear error if all questions answered
								const allAnswered = currentStepData.data.questions.every((q: any) => values[q.id])
								if (allAnswered) setError(null)
							}}
							error={error}
						/>
					)}

					{currentStepData.type === "question" && (
						<QuestionStep
							question={currentStepData.data}
							value={
								(currentStepData.data.multiSelect
									? (formValues[currentStepData.data.id as keyof FormData] as string[]) || []
									: (formValues[currentStepData.data.id as keyof FormData] as string) || "") as string | string[]
							}
							onChange={(value) => {
								if (currentStepData.data.id === "industry") {
									handleIndustryChange(value as Industry)
								}
								setValue(currentStepData.data.id as keyof FormData, value as any)
								setError(null)
								// Don't auto-advance - user must press Next
							}}
							error={errors[currentStepData.data.id as keyof FormData]?.message as string}
						/>
					)}
				</div>

				{error && (
					<div className='mt-4 p-4 rounded-lg bg-red-50 text-red-800 border border-red-200'>
						{error}
					</div>
				)}

				{/* Main wizard navigation */}
				{true && (
					<div className='fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 shadow-lg z-50'>
						<div className='container max-w-4xl mx-auto px-4 py-4'>
							<div className='flex justify-between items-center'>
								<Button
									variant='outline'
									onClick={handleBack}
									disabled={currentStep === 0}
								>
									Back
								</Button>
								<Button
									onClick={
										currentStepData.type === "challenge-selection"
											? handleNext
											: isAtEndOfAllQuestions
												? () => {
													const formData = formValues as FormData
													onSubmit(formData)
												}
												: handleNext
									}
									disabled={isGenerating}
									withIcon={isAtEndOfAllQuestions}
								>
									{isGenerating
										? "Generating..."
										: isAtEndOfAllQuestions
											? "Generate Report"
											: "Next"}
								</Button>
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	)
}

// Challenge Selection Component
function ChallengeSelectionStep({
	challenges,
	selectedChallenges,
	onSelect,
	error,
}: {
	challenges: IndustryChallenge[]
	selectedChallenges: string[]
	onSelect: (ids: string[]) => void
	error?: string | null
}) {
	const handleToggle = (challengeId: string) => {
		const newSelection = selectedChallenges.includes(challengeId)
			? selectedChallenges.filter((id) => id !== challengeId)
			: [...selectedChallenges, challengeId].slice(0, 3) // Max 3 challenges
		onSelect(newSelection)
	}

	return (
		<div className='space-y-4'>
			<label className='block text-lg font-semibold mb-4'>
				Which of the following challenges best describe your current situation?
				<span className='text-sm font-normal text-neutral-600 block mt-1'>
					(Select up to 3)
				</span>
			</label>
			<div className='space-y-2'>
				{challenges.map((challenge) => {
					const isSelected = selectedChallenges.includes(challenge.id)
					const isDisabled =
						!isSelected && selectedChallenges.length >= 3
					return (
						<button
							key={challenge.id}
							type='button'
							onClick={() => handleToggle(challenge.id)}
							disabled={isDisabled}
							className={cn(
								"w-full text-left px-4 py-3 rounded-lg border-2 transition-all",
								isSelected
									? "border-blue-600 bg-blue-50 text-blue-900"
									: isDisabled
										? "border-neutral-200 bg-neutral-50 text-neutral-400 cursor-not-allowed"
										: "border-neutral-300 bg-white text-neutral-700 hover:border-blue-400",
							)}
						>
							{challenge.label}
						</button>
					)
				})}
			</div>
			{error && <p className='text-sm text-red-400 font-medium mt-2'>{error}</p>}
		</div>
	)
}

// Follow-up Questions Component
function FollowUpStep({
	challengeLabel,
	questions,
	values,
	onChange,
	error,
}: {
	challengeLabel: string
	questions: Array<{ id: string; label: string; type: string; options?: any[] }>
	values: Record<string, any>
	onChange: (values: Record<string, any>) => void
	error?: string | null
}) {
	const handleAnswer = (questionId: string, value: string) => {
		const newValues = {
			...values,
			[questionId]: value,
		}
		onChange(newValues)
	}

	return (
		<div className='space-y-8 pb-8'>
			<div className='bg-blue-50 p-4 rounded-lg border border-blue-100 mb-6'>
				<h3 className='font-semibold text-blue-900'>Challenge: {challengeLabel}</h3>
				<p className='text-sm text-blue-700 mt-1'>Please answer a few details about this challenge.</p>
			</div>

			{questions.map((question, index) => (
				<div key={question.id} className='space-y-3'>
					<label className='block text-base font-semibold text-neutral-800'>
						{index + 1}. {question.label}
					</label>

					{question.options && (
						<div className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
							{question.options.map((option) => {
								const isSelected = values[question.id] === option.value
								return (
									<button
										key={option.value}
										type='button'
										onClick={() => handleAnswer(question.id, option.value)}
										className={cn(
											"text-left px-4 py-3 rounded-lg border transition-all text-sm",
											isSelected
												? "border-blue-600 bg-blue-50 text-blue-900 font-medium"
												: "border-neutral-200 bg-white text-neutral-700 hover:border-blue-300 hover:bg-neutral-50",
										)}
									>
										{option.label}
									</button>
								)
							})}
						</div>
					)}
				</div>
			))}

			{error && <p className='text-sm text-red-500 font-medium mt-4 bg-red-50 p-3 rounded-md border border-red-100'>{error}</p>}
		</div>
	)
}

