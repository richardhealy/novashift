import Anthropic from "@anthropic-ai/sdk"
import type { Message } from "@anthropic-ai/sdk/resources/messages.mjs"

if (!process.env.ANTHROPIC_API_KEY) {
	console.warn("ANTHROPIC_API_KEY is not set. Report generation will fail.")
}

const anthropic = new Anthropic({
	apiKey: process.env.ANTHROPIC_API_KEY || "",
})

export interface GenerateReportParams {
	industry: string
	role: string
	challenges: string[]
	challengeResponses: Record<string, any>
	scores: {
		totalScore: number
		tier: string
		workflowMaturity: number
		dataQuality: number
		technicalInfrastructure: number
		challengeSeverity: number
		teamReadiness: number
	}
	websiteSummary?: string
	companySize: string
}

export interface ReportResponse {
	readinessScore: number
	scoreExplanation: string
	businessSummary?: string
	industryLandscape: string
	aiOpportunities: Array<{
		title: string
		description: string
	}>
	quickWins: Array<{
		title: string
		description: string
		timeframe: string
	}>
	longTermProjects: Array<{
		title: string
		description: string
		timeframe: string
	}>
	roiSnapshot?: {
		estimatedSavings: string
		hoursSaved: number
	}
	cta: string
}

export async function generateReport(
	params: GenerateReportParams,
): Promise<ReportResponse> {
	const prompt = buildReportPrompt(params)

	try {
		const message: Message = await anthropic.messages.create({
			model: "claude-sonnet-4-5-20250929",
			max_tokens: 4096,
			messages: [
				{
					role: "user",
					content: prompt,
				},
			],
		})

		const content = message.content[0]
		if (content.type !== "text") {
			throw new Error("Unexpected response type from Anthropic")
		}

		// Parse JSON response - handle markdown code blocks if present
		let jsonText = content.text.trim()
		
		// Remove markdown code blocks if present (```json ... ```)
		if (jsonText.startsWith("```")) {
			// Find the first ``` and remove it
			const firstBacktick = jsonText.indexOf("```")
			if (firstBacktick === 0) {
				// Remove ```json or ``` from start
				jsonText = jsonText.replace(/^```(?:json)?\s*\n?/, "")
				// Remove ``` from end
				jsonText = jsonText.replace(/\n?```\s*$/, "")
				jsonText = jsonText.trim()
			}
		}
		
		console.log("📄 [ANTHROPIC] Parsing JSON response, length:", jsonText.length)
		console.log("📄 [ANTHROPIC] First 200 chars:", jsonText.substring(0, 200))
		
		const reportData = JSON.parse(jsonText) as ReportResponse
		return reportData
	} catch (error) {
		console.error("Error generating report:", error)
		throw new Error(
			`Failed to generate report: ${error instanceof Error ? error.message : "Unknown error"}`,
		)
	}
}

function buildReportPrompt(params: GenerateReportParams): string {
	const {
		industry,
		role,
		challenges,
		challengeResponses,
		scores,
		websiteSummary,
		companySize,
	} = params

	const tierDescriptions = {
		"not-ready":
			"Not ready (0-39): Focus on basic workflow automation first. Build foundational processes before introducing AI tools.",
		moderate:
			"Moderately ready (40-69): Automations now, AI tools later. Good foundation for workflow improvements and gradual AI adoption.",
		strong: "Strong foundation (70-84): AI pilots recommended. Ready for strategic AI implementations and automation enhancements.",
		high: "High readiness (85-100): Suitable for advanced AI deployment. Excellent position for comprehensive AI transformation.",
	}

	return `You are an AI and automation consultant for NovaShift, helping businesses understand their readiness for AI adoption.

Generate a comprehensive, personalized AI Readiness Report in JSON format based on the following assessment data:

**Company Context:**
- Industry: ${industry}
- Role: ${role}
- Company Size: ${companySize}
${websiteSummary ? `- Website Summary: ${websiteSummary}` : ""}

**Selected Challenges:**
${challenges.map((c) => `- ${c}`).join("\n")}

**Challenge Details:**
${JSON.stringify(challengeResponses, null, 2)}

**Readiness Scores:**
- Total Score: ${scores.totalScore}/100 (${scores.tier})
- Workflow Maturity: ${scores.workflowMaturity}/100
- Data Quality: ${scores.dataQuality}/100
- Technical Infrastructure: ${scores.technicalInfrastructure}/100
- Challenge Severity: ${scores.challengeSeverity}/100
- Team Readiness: ${scores.teamReadiness}/100

**Tier Interpretation:**
${tierDescriptions[scores.tier as keyof typeof tierDescriptions]}

**Requirements:**

1. **Score Explanation** (200-300 words): Explain what the readiness score means for this specific company, considering their industry, challenges, and current state. Be encouraging but realistic.

2. **Business Summary** (150-200 words): ${websiteSummary ? "Use the website summary provided" : "Infer from industry and challenges"} to create a brief overview of what the business does, their key customer segments, observable strengths, and operational weak points. Tailor language to the ${role} role.

3. **Industry-Specific AI Landscape** (200-250 words): Provide a high-level overview of relevant AI tools, emerging models, best practices, and competitor adoption patterns in the ${industry} industry.

4. **Three Key AI Opportunities** (3 items): Generate exactly 3 customized AI opportunities based on:
   - Selected industry: ${industry}
   - Selected challenges: ${challenges.join(", ")}
   - Challenge follow-up answers
   - Website data (if provided)
   Each opportunity should have:
   - title: Short, compelling title
   - description: 2-3 sentences explaining the opportunity and potential impact

5. **Quick Wins** (2-3 items): Low-friction workflow automations that can be implemented in 0-3 months. Examples: lead routing, reporting automation, customer service triage, inventory alerts, document processing. Each should have:
   - title: Short title
   - description: 2-3 sentences
   - timeframe: e.g., "1-2 months"

6. **Long-Term Projects** (2-3 items): Strategic AI initiatives for 3-12 months. Examples: predictive analytics, custom AI assistants, internal AI tools, system integrations. Each should have:
   - title: Short title
   - description: 2-3 sentences
   - timeframe: e.g., "6-9 months"

7. **CTA**: Create compelling call-to-action text (2-3 sentences) encouraging them to "Book a free AI strategy session with NovaShift."

**Output Format:**
Return ONLY valid JSON in this exact structure. Do NOT wrap it in markdown code blocks. Return raw JSON only:
{
  "readinessScore": ${scores.totalScore},
  "scoreExplanation": "...",
  "businessSummary": "...",
  "industryLandscape": "...",
  "aiOpportunities": [
    {"title": "...", "description": "..."},
    {"title": "...", "description": "..."},
    {"title": "...", "description": "..."}
  ],
  "quickWins": [
    {"title": "...", "description": "...", "timeframe": "..."},
    {"title": "...", "description": "...", "timeframe": "..."}
  ],
  "longTermProjects": [
    {"title": "...", "description": "...", "timeframe": "..."},
    {"title": "...", "description": "...", "timeframe": "..."}
  ],
  "cta": "..."
}

IMPORTANT: Return ONLY the JSON object, no markdown formatting, no code blocks, no explanations before or after. Just the raw JSON.

Be specific, actionable, and tailored to this company's situation. Use NovaShift's professional but approachable tone.`
}

