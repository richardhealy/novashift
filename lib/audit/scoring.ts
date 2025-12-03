import type {
	AuditResponse,
	ScoringResult,
	WorkflowMaturity,
	SOPLevel,
	IntegrationLevel,
	DataQuality,
	CompanySize,
	TechnicalCapability,
	TeamOpenness,
	Frequency,
	ImpactLevel,
	PainScore,
} from "@/types/audit"

/**
 * Calculate AI Readiness Score based on weighted formula
 * Operational Maturity: 30%
 * Data Quality & Accessibility: 25%
 * Current Tooling & Integrations: 20%
 * Challenge Severity / Opportunity: 15%
 * Team Openness to Change: 10%
 */
export function calculateScore(response: AuditResponse): ScoringResult {
	// Workflow Maturity (30% weight)
	const workflowMaturity = calculateWorkflowMaturity(
		response.workflowMaturity,
		response.sopLevel,
		response.integrationLevel,
	)

	// Data Quality (25% weight)
	const dataQuality = calculateDataQualityScore(response.dataQuality)

	// Technical Infrastructure (20% weight)
	const technicalInfrastructure = calculateTechnicalInfrastructure(
		response.integrationLevel,
		response.technicalCapability,
		response.tools.length,
	)

	// Challenge Severity (15% weight)
	const challengeSeverity = calculateChallengeSeverity(response.challengeResponses)

	// Team Readiness (10% weight)
	const teamReadiness = calculateTeamReadiness(
		response.teamOpenness,
		response.technicalCapability,
	)

	// Scalability Factor (15% weight) - Note: This is part of the 100% but adjusted
	const scalabilityFactor = calculateScalabilityFactor(response.companySize)

	// Calculate weighted total
	const totalScore =
		workflowMaturity * 0.3 +
		dataQuality * 0.25 +
		technicalInfrastructure * 0.2 +
		challengeSeverity * 0.15 +
		teamReadiness * 0.1 +
		scalabilityFactor * 0.15

	// Determine tier
	const tier = getReadinessTier(totalScore)

	return {
		workflowMaturity: Math.round(workflowMaturity),
		dataQuality: Math.round(dataQuality),
		technicalInfrastructure: Math.round(technicalInfrastructure),
		challengeSeverity: Math.round(challengeSeverity),
		teamReadiness: Math.round(teamReadiness),
		scalabilityFactor: Math.round(scalabilityFactor),
		totalScore: Math.round(totalScore),
		tier,
	}
}

function calculateWorkflowMaturity(
	maturity: WorkflowMaturity,
	sopLevel: SOPLevel,
	integrationLevel: IntegrationLevel,
): number {
	// Maturity rating (1-5) -> 0-100 scale
	const maturityScore = (parseInt(maturity) / 5) * 100

	// SOP level scoring
	let sopScore = 0
	switch (sopLevel) {
		case "fully-documented":
			sopScore = 100
			break
		case "some-documented":
			sopScore = 60
			break
		case "informal":
			sopScore = 30
			break
		case "none":
			sopScore = 0
			break
	}

	// Integration level scoring
	let integrationScore = 0
	switch (integrationLevel) {
		case "highly-integrated":
			integrationScore = 100
			break
		case "partially-integrated":
			integrationScore = 60
			break
		case "mostly-siloed":
			integrationScore = 30
			break
		case "completely-siloed":
			integrationScore = 0
			break
	}

	// Average of the three components
	return (maturityScore + sopScore + integrationScore) / 3
}

function calculateDataQualityScore(dataQuality: DataQuality): number {
	switch (dataQuality) {
		case "very-clean":
			return 100
		case "moderately-organized":
			return 70
		case "somewhat-messy":
			return 40
		case "very-messy":
			return 10
		case "not-sure":
			return 30 // Conservative estimate
	}
}

function calculateTechnicalInfrastructure(
	integrationLevel: IntegrationLevel,
	technicalCapability: TechnicalCapability,
	toolsCount: number,
): number {
	// Integration score (0-50)
	let integrationScore = 0
	switch (integrationLevel) {
		case "highly-integrated":
			integrationScore = 50
			break
		case "partially-integrated":
			integrationScore = 35
			break
		case "mostly-siloed":
			integrationScore = 20
			break
		case "completely-siloed":
			integrationScore = 5
			break
	}

	// Technical capability score (0-30)
	let capabilityScore = 0
	switch (technicalCapability) {
		case "fully-capable":
			capabilityScore = 30
			break
		case "some-technical":
			capabilityScore = 15
			break
		case "no-technical":
			capabilityScore = 5
			break
	}

	// Tools count score (0-20, capped at 5+ tools)
	const toolsScore = Math.min(toolsCount * 4, 20)

	return integrationScore + capabilityScore + toolsScore
}

function calculateChallengeSeverity(
	challengeResponses: Record<
		string,
		{
			currentHandling?: string
			frequency?: Frequency
			impact?: ImpactLevel
			painScore?: PainScore
		}
	>,
): number {
	if (Object.keys(challengeResponses).length === 0) {
		return 50 // Neutral if no challenges selected
	}

	let totalSeverity = 0
	let count = 0

	for (const challengeId in challengeResponses) {
		const responses = challengeResponses[challengeId]
		let challengeScore = 0

		// Frequency score (0-30)
		if (responses.frequency) {
			switch (responses.frequency) {
				case "daily":
					challengeScore += 30
					break
				case "several-times-week":
					challengeScore += 24
					break
				case "weekly":
					challengeScore += 18
					break
				case "occasionally":
					challengeScore += 12
					break
				case "rarely":
					challengeScore += 6
					break
			}
		}

		// Impact score (0-40)
		if (responses.impact) {
			switch (responses.impact) {
				case "critical":
					challengeScore += 40
					break
				case "high":
					challengeScore += 30
					break
				case "medium":
					challengeScore += 20
					break
				case "low":
					challengeScore += 10
					break
			}
		}

		// Pain score (0-30)
		if (responses.painScore) {
			challengeScore += (parseInt(responses.painScore) / 5) * 30
		}

		totalSeverity += challengeScore
		count++
	}

	// Average severity, but invert it (higher severity = lower readiness)
	// So we convert: 100 - average severity
	const avgSeverity = count > 0 ? totalSeverity / count : 0
	return Math.max(0, 100 - avgSeverity)
}

function calculateTeamReadiness(
	teamOpenness: TeamOpenness,
	technicalCapability: TechnicalCapability,
): number {
	let opennessScore = 0
	switch (teamOpenness) {
		case "very-open":
			opennessScore = 60
			break
		case "open-with-guidance":
			opennessScore = 40
			break
		case "hesitant":
			opennessScore = 15
			break
	}

	let capabilityScore = 0
	switch (technicalCapability) {
		case "fully-capable":
			capabilityScore = 40
			break
		case "some-technical":
			capabilityScore = 25
			break
		case "no-technical":
			capabilityScore = 10
			break
	}

	return opennessScore + capabilityScore
}

function calculateScalabilityFactor(companySize: CompanySize): number {
	// Larger companies have more complexity but also more resources
	// This factor considers both readiness and potential impact
	switch (companySize) {
		case "micro":
			return 40 // Small teams, easier to adapt but limited resources
		case "small":
			return 60 // Good balance
		case "medium":
			return 75 // More resources, more complexity
		case "large":
			return 85 // Enterprise scale, high potential
	}
}

function getReadinessTier(score: number): "not-ready" | "moderate" | "strong" | "high" {
	if (score < 40) {
		return "not-ready"
	} else if (score < 70) {
		return "moderate"
	} else if (score < 85) {
		return "strong"
	} else {
		return "high"
	}
}




