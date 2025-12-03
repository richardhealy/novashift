"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/inputs/input"
import { Label } from "@/components/ui/inputs/label"
import { InputGroup } from "@/components/ui/inputs/input-group"
import { submitAuditSubmission } from "@/actions/audit"
import type { ScoringResult, ReportData } from "@/types/audit"
import { cn } from "@/lib/utils"

interface ResultsDisplayProps {
	results: {
		scores: ScoringResult
		reportData: ReportData
	}
	auditResponse: any
	locale: string
}

export default function ResultsDisplay({ results, auditResponse, locale }: ResultsDisplayProps) {
	const [email, setEmail] = useState("")
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [submitStatus, setSubmitStatus] = useState<{
		type: "success" | "error" | null
		message: string
	}>({ type: null, message: "" })
	const [showEmailForm, setShowEmailForm] = useState(true)

	const { scores, reportData } = results

	const getScoreColor = (score: number) => {
		if (score < 40) return "text-red-600"
		if (score < 70) return "text-yellow-600"
		if (score < 85) return "text-blue-600"
		return "text-green-600"
	}

	const getTierLabel = (tier: string) => {
		switch (tier) {
			case "not-ready":
				return "Not Ready"
			case "moderate":
				return "Moderately Ready"
			case "strong":
				return "Strong Foundation"
			case "high":
				return "High Readiness"
			default:
				return tier
		}
	}

	const handleEmailSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsSubmitting(true)
		setSubmitStatus({ type: null, message: "" })

		try {
			const result = await submitAuditSubmission(
				email,
				auditResponse.role,
				auditResponse.industry,
				auditResponse,
				scores,
				reportData,
			)

			if (result.success) {
				setSubmitStatus({
					type: "success",
					message: "Thank you! Your report will be emailed to you shortly.",
				})
				setShowEmailForm(false)
			} else {
				setSubmitStatus({
					type: "error",
					message: result.error || "Failed to submit. Please try again.",
				})
			}
		} catch (error) {
			setSubmitStatus({
				type: "error",
				message: "An unexpected error occurred. Please try again.",
			})
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<div className='w-full max-w-4xl mx-auto space-y-8'>
			{/* Score Display */}
			<div className='text-center py-8'>
				<div className='inline-block'>
					<div
						className={cn(
							"text-6xl font-bold mb-2",
							getScoreColor(scores.totalScore),
						)}
					>
						{scores.totalScore}
					</div>
					<div className='text-2xl font-semibold text-neutral-700 mb-4'>
						AI Readiness Score
					</div>
					<div
						className={cn(
							"text-lg font-medium px-4 py-2 rounded-full inline-block",
							scores.tier === "not-ready"
								? "bg-red-100 text-red-800"
								: scores.tier === "moderate"
									? "bg-yellow-100 text-yellow-800"
									: scores.tier === "strong"
										? "bg-blue-100 text-blue-800"
										: "bg-green-100 text-green-800",
						)}
					>
						{getTierLabel(scores.tier)}
					</div>
				</div>
			</div>

			{/* Score Breakdown */}
			<div className='bg-neutral-50 rounded-lg p-6'>
				<h3 className='text-lg font-semibold mb-4'>Score Breakdown</h3>
				<div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
					<div>
						<div className='text-sm text-neutral-600'>Workflow Maturity</div>
						<div className='text-xl font-bold'>{scores.workflowMaturity}/100</div>
					</div>
					<div>
						<div className='text-sm text-neutral-600'>Data Quality</div>
						<div className='text-xl font-bold'>{scores.dataQuality}/100</div>
					</div>
					<div>
						<div className='text-sm text-neutral-600'>Technical Infrastructure</div>
						<div className='text-xl font-bold'>{scores.technicalInfrastructure}/100</div>
					</div>
					<div>
						<div className='text-sm text-neutral-600'>Challenge Severity</div>
						<div className='text-xl font-bold'>{scores.challengeSeverity}/100</div>
					</div>
					<div>
						<div className='text-sm text-neutral-600'>Team Readiness</div>
						<div className='text-xl font-bold'>{scores.teamReadiness}/100</div>
					</div>
					<div>
						<div className='text-sm text-neutral-600'>Scalability Factor</div>
						<div className='text-xl font-bold'>{scores.scalabilityFactor}/100</div>
					</div>
				</div>
			</div>

			{/* Score Explanation */}
			<div className='prose max-w-none'>
				<h2 className='text-2xl font-bold mb-4'>What This Score Means</h2>
				<p className='text-neutral-700 leading-relaxed'>{reportData.scoreExplanation}</p>
			</div>

			{/* Business Summary */}
			{reportData.businessSummary && (
				<div className='prose max-w-none'>
					<h2 className='text-2xl font-bold mb-4'>About Your Business</h2>
					<p className='text-neutral-700 leading-relaxed'>{reportData.businessSummary}</p>
				</div>
			)}

			{/* Industry Landscape */}
			<div className='prose max-w-none'>
				<h2 className='text-2xl font-bold mb-4'>AI Landscape in Your Industry</h2>
				<p className='text-neutral-700 leading-relaxed'>{reportData.industryLandscape}</p>
			</div>

			{/* AI Opportunities */}
			<div className='prose max-w-none'>
				<h2 className='text-2xl font-bold mb-4'>Key AI Opportunities</h2>
				<div className='space-y-4'>
					{reportData.aiOpportunities.map((opportunity, index) => (
						<div key={index} className='border-l-4 border-blue-600 pl-4 py-2'>
							<h3 className='text-xl font-semibold mb-2'>{opportunity.title}</h3>
							<p className='text-neutral-700'>{opportunity.description}</p>
						</div>
					))}
				</div>
			</div>

			{/* Quick Wins */}
			<div className='prose max-w-none'>
				<h2 className='text-2xl font-bold mb-4'>Quick Wins (0-3 months)</h2>
				<div className='space-y-4'>
					{reportData.quickWins.map((win, index) => (
						<div key={index} className='bg-green-50 border border-green-200 rounded-lg p-4'>
							<div className='flex items-start justify-between mb-2'>
								<h3 className='text-lg font-semibold'>{win.title}</h3>
								<span className='text-sm text-green-700 font-medium'>{win.timeframe}</span>
							</div>
							<p className='text-neutral-700'>{win.description}</p>
						</div>
					))}
				</div>
			</div>

			{/* Long-Term Projects */}
			<div className='prose max-w-none'>
				<h2 className='text-2xl font-bold mb-4'>Long-Term Projects (3-12 months)</h2>
				<div className='space-y-4'>
					{reportData.longTermProjects.map((project, index) => (
						<div key={index} className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
							<div className='flex items-start justify-between mb-2'>
								<h3 className='text-lg font-semibold'>{project.title}</h3>
								<span className='text-sm text-blue-700 font-medium'>{project.timeframe}</span>
							</div>
							<p className='text-neutral-700'>{project.description}</p>
						</div>
					))}
				</div>
			</div>

			{/* ROI Snapshot */}
			{reportData.roiSnapshot && (
				<div className='bg-neutral-900 text-white rounded-lg p-6'>
					<h2 className='text-2xl font-bold mb-4'>ROI Snapshot</h2>
					<div className='text-3xl font-bold mb-2'>{reportData.roiSnapshot.estimatedSavings}</div>
					<p className='text-neutral-300'>
						Estimated annual savings based on {reportData.roiSnapshot.hoursSaved} hours saved per
						week
					</p>
				</div>
			)}

			{/* CTA */}
			<div className='bg-blue-50 border border-blue-200 rounded-lg p-6 text-center'>
				<p className='text-lg text-neutral-700 mb-4'>{reportData.cta}</p>
				<div className='flex justify-center'>
					<a href={`/${locale}/contact-us`}>
						<Button withIcon>Book a Free Strategy Session</Button>
					</a>
				</div>
			</div>

			{/* Email Capture */}
			{showEmailForm && (
				<div className='bg-white border border-neutral-300 rounded-lg p-6 shadow-lg'>
					<h3 className='text-xl font-semibold mb-4'>Get Your Full Report via Email</h3>
					<form onSubmit={handleEmailSubmit} className='space-y-4'>
						<InputGroup>
							<Label htmlFor='email'>Email Address</Label>
							<Input
								id='email'
								type='email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder='your@email.com'
								required
							/>
						</InputGroup>
						{submitStatus.type && (
							<div
								className={cn(
									"p-4 rounded-lg text-sm",
									submitStatus.type === "success"
										? "bg-green-50 text-green-800 border border-green-200"
										: "bg-red-50 text-red-800 border border-red-200",
								)}
							>
								{submitStatus.message}
							</div>
						)}
						<Button type='submit' disabled={isSubmitting} className='w-full'>
							{isSubmitting ? "Submitting..." : "Send Report to Email"}
						</Button>
					</form>
				</div>
			)}
		</div>
	)
}

