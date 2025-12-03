import { NextRequest, NextResponse } from "next/server"
import { generateReport } from "@/lib/anthropic"
import { calculateScore } from "@/lib/audit/scoring"
import type { AuditResponse, ReportData } from "@/types/audit"

export async function POST(request: NextRequest) {
	try {
		const body = await request.json()
		const auditResponse: AuditResponse = body.responses

		console.log("📥 [API] Received request body:", JSON.stringify(body, null, 2))
		console.log("📥 [API] Audit response extracted:", JSON.stringify(auditResponse, null, 2))

		// Validate required fields
		const missingFields: string[] = []
		if (!auditResponse?.role) missingFields.push("role")
		if (!auditResponse?.industry) missingFields.push("industry")
		if (!auditResponse?.companySize) missingFields.push("companySize")
		if (!auditResponse?.workflowMaturity) missingFields.push("workflowMaturity")
		if (!auditResponse?.sopLevel) missingFields.push("sopLevel")
		if (!auditResponse?.integrationLevel) missingFields.push("integrationLevel")
		if (!auditResponse?.dataQuality) missingFields.push("dataQuality")
		if (!auditResponse?.technicalCapability) missingFields.push("technicalCapability")
		if (!auditResponse?.teamOpenness) missingFields.push("teamOpenness")

		if (missingFields.length > 0) {
			console.error("❌ [API] Missing required fields:", missingFields)
			return NextResponse.json(
				{ 
					error: `Missing required fields: ${missingFields.join(", ")}`,
					missingFields,
					receivedFields: Object.keys(auditResponse || {}),
				},
				{ status: 400 },
			)
		}

		// Calculate scores
		const scores = calculateScore(auditResponse)

		// Scrape website if URL provided
		let websiteSummary: string | undefined
		if (auditResponse.websiteUrl) {
			try {
				websiteSummary = await scrapeWebsite(auditResponse.websiteUrl)
			} catch (error) {
				console.warn("Failed to scrape website:", error)
				// Continue without website summary
			}
		}

		// Get challenge labels for the report
		const { getChallengesForIndustry } = await import("@/lib/audit/questions")
		const challenges = getChallengesForIndustry(auditResponse.industry)
		const selectedChallengeLabels = challenges
			.filter((c) => auditResponse.selectedChallenges.includes(c.id))
			.map((c) => c.label)

		// Generate report using Anthropic
		const reportData: ReportData = await generateReport({
			industry: auditResponse.industry,
			role: auditResponse.role,
			challenges: selectedChallengeLabels,
			challengeResponses: auditResponse.challengeResponses,
			scores: {
				totalScore: scores.totalScore,
				tier: scores.tier,
				workflowMaturity: scores.workflowMaturity,
				dataQuality: scores.dataQuality,
				technicalInfrastructure: scores.technicalInfrastructure,
				challengeSeverity: scores.challengeSeverity,
				teamReadiness: scores.teamReadiness,
			},
			websiteSummary,
			companySize: auditResponse.companySize,
		})

		return NextResponse.json({
			scores,
			reportData,
		})
	} catch (error) {
		console.error("Error generating report:", error)
		return NextResponse.json(
			{
				error:
					error instanceof Error
						? error.message
						: "Failed to generate report",
			},
			{ status: 500 },
		)
	}
}

async function scrapeWebsite(url: string): Promise<string> {
	try {
		// Ensure URL has protocol
		const fullUrl = url.startsWith("http") ? url : `https://${url}`

		const response = await fetch(fullUrl, {
			headers: {
				"User-Agent":
					"Mozilla/5.0 (compatible; NovaShiftBot/1.0; +https://novashift.ai)",
			},
		})

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`)
		}

		const html = await response.text()

		// Simple text extraction (remove HTML tags)
		// For better parsing, you could use cheerio or jsdom
		const text = html
			.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
			.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
			.replace(/<[^>]+>/g, " ")
			.replace(/\s+/g, " ")
			.trim()
			.substring(0, 2000) // Limit to 2000 chars

		return text || "Unable to extract website content"
	} catch (error) {
		throw new Error(
			`Failed to scrape website: ${error instanceof Error ? error.message : "Unknown error"}`,
		)
	}
}

