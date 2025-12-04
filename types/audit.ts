export type Industry =
	| "ecommerce"
	| "agency"
	| "saas"
	| "healthcare"
	| "education"
	| "finance"
	| "hospitality"
	| "real-estate"
	| "manufacturing"
	| "retail"
	| "nonprofit"
	| "legal"
	| "media"
	| "energy"
	| "construction"
	| "transportation"
	| "agriculture"
	| "beauty"
	| "other"

export type CompanySize = "micro" | "small" | "medium" | "large"
export type WorkflowMaturity = "1" | "2" | "3" | "4" | "5"
export type SOPLevel = "fully-documented" | "some-documented" | "informal" | "none"
export type IntegrationLevel =
	| "highly-integrated"
	| "partially-integrated"
	| "mostly-siloed"
	| "completely-siloed"
export type DataQuality =
	| "very-clean"
	| "moderately-organized"
	| "somewhat-messy"
	| "very-messy"
	| "not-sure"
export type TechnicalCapability =
	| "fully-capable"
	| "some-technical"
	| "no-technical"
export type TeamOpenness = "very-open" | "open-with-guidance" | "hesitant"
export type Frequency =
	| "daily"
	| "several-times-week"
	| "weekly"
	| "occasionally"
	| "rarely"
export type ImpactLevel = "critical" | "high" | "medium" | "low"
export type PainScore = "1" | "2" | "3" | "4" | "5"

export interface FollowUpQuestion {
	id: string
	type: string
	label: string
	options: { value: string; label: string }[]
}

export interface IndustryChallenge {
	id: string
	label: string
	followUpQuestions: FollowUpQuestion[]
}

export interface QuestionStep {
	id: string
	label: string
	type: string
	options?: { value: string; label: string }[]
	required?: boolean
	multiSelect?: boolean
	description?: string
	placeholder?: string
}

export interface AuditResponse {
	role: string
	industry: Industry
	companySize: CompanySize
	workflowMaturity: WorkflowMaturity
	sopLevel: SOPLevel
	integrationLevel: IntegrationLevel
	dataQuality: DataQuality
	tools: string[]
	technicalCapability: TechnicalCapability
	teamOpenness: TeamOpenness
	websiteUrl?: string
	selectedChallenges: string[]
	challengeResponses: Record<string, any>
}

export interface ScoringResult {
	workflowMaturity: number
	dataQuality: number
	technicalInfrastructure: number
	challengeSeverity: number
	teamReadiness: number
	scalabilityFactor: number
	totalScore: number
	tier: "not-ready" | "moderate" | "strong" | "high"
}

export interface ReportData {
	readinessScore: number
	scoreExplanation: string
	businessSummary?: string
	industryLandscape: string
	aiOpportunities: Array<{ title: string; description: string }>
	quickWins: Array<{ title: string; description: string; timeframe: string }>
	longTermProjects: Array<{
		title: string
		description: string
		timeframe: string
	}>
	roiSnapshot?: { estimatedSavings: string; hoursSaved: number }
	cta: string
}
