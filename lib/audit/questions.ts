import type {
	Industry,
	IndustryChallenge,
	QuestionStep,
	FollowUpQuestion,
} from "@/types/audit"

// Follow-up question templates
const createFollowUpQuestions = (challengeLabel: string): FollowUpQuestion[] => [
	{
		id: "current-handling",
		type: "current-handling",
		label: `How are you currently handling ${challengeLabel.toLowerCase()}?`,
		options: [
			{ value: "manual", label: "Manual work" },
			{ value: "basic-software", label: "Using basic software" },
			{ value: "advanced-tools", label: "Using advanced tools" },
			{ value: "outsourced", label: "Outsourced" },
			{ value: "not-addressed", label: "Not addressed at all" },
		],
	},
	{
		id: "frequency",
		type: "frequency",
		label: "How frequently does this issue impact your operations?",
		options: [
			{ value: "daily", label: "Daily" },
			{ value: "several-times-week", label: "Several times a week" },
			{ value: "weekly", label: "Weekly" },
			{ value: "occasionally", label: "Occasionally" },
			{ value: "rarely", label: "Rarely" },
		],
	},
	{
		id: "impact",
		type: "impact",
		label: "What level of business impact does this challenge create?",
		options: [
			{ value: "low", label: "Low" },
			{ value: "medium", label: "Medium" },
			{ value: "high", label: "High" },
			{ value: "critical", label: "Critical" },
		],
	},
	{
		id: "pain-score",
		type: "pain-score",
		label: "How painful is this problem today? (1-5 scale)",
		options: [
			{ value: "1", label: "1 - Not painful" },
			{ value: "2", label: "2 - Slightly painful" },
			{ value: "3", label: "3 - Moderately painful" },
			{ value: "4", label: "4 - Very painful" },
			{ value: "5", label: "5 - Extremely painful" },
		],
	},
]

// Industry challenges
export const industryChallenges: Record<Industry, IndustryChallenge[]> = {
	ecommerce: [
		{
			id: "manual-order-processing",
			label: "Manual order processing and fulfillment",
			followUpQuestions: createFollowUpQuestions("order processing"),
		},
		{
			id: "high-support-volume",
			label: "High customer support volume",
			followUpQuestions: createFollowUpQuestions("customer support"),
		},
		{
			id: "inventory-accuracy",
			label: "Inventory accuracy issues",
			followUpQuestions: createFollowUpQuestions("inventory management"),
		},
		{
			id: "poor-forecasting",
			label: "Poor demand forecasting",
			followUpQuestions: createFollowUpQuestions("demand forecasting"),
		},
		{
			id: "ineffective-ads",
			label: "Ineffective ad targeting",
			followUpQuestions: createFollowUpQuestions("ad targeting"),
		},
		{
			id: "low-conversion",
			label: "Low conversion rates",
			followUpQuestions: createFollowUpQuestions("conversion rates"),
		},
		{
			id: "manual-reporting",
			label: "Manual reporting and analytics",
			followUpQuestions: createFollowUpQuestions("reporting"),
		},
		{
			id: "content-creation",
			label: "Poor product content creation workflow",
			followUpQuestions: createFollowUpQuestions("content creation"),
		},
		{
			id: "limited-personalization",
			label: "Limited personalization for customers",
			followUpQuestions: createFollowUpQuestions("personalization"),
		},
		{
			id: "scattered-data",
			label: "Data scattered across tools (Shopify, CRM, ads)",
			followUpQuestions: createFollowUpQuestions("data consolidation"),
		},
	],
	agency: [
		{
			id: "slow-onboarding",
			label: "Slow client onboarding process",
			followUpQuestions: createFollowUpQuestions("client onboarding"),
		},
		{
			id: "manual-reporting",
			label: "Manual reporting and deliverables",
			followUpQuestions: createFollowUpQuestions("reporting"),
		},
		{
			id: "content-bottlenecks",
			label: "Bottlenecks in content creation",
			followUpQuestions: createFollowUpQuestions("content creation"),
		},
		{
			id: "inefficient-pm",
			label: "Inefficient project management workflows",
			followUpQuestions: createFollowUpQuestions("project management"),
		},
		{
			id: "capacity-tracking",
			label: "Difficulty tracking capacity vs demand",
			followUpQuestions: createFollowUpQuestions("capacity planning"),
		},
		{
			id: "poor-data-consolidation",
			label: "Poor data consolidation across tools",
			followUpQuestions: createFollowUpQuestions("data consolidation"),
		},
		{
			id: "proposal-creation",
			label: "Time-consuming proposal/contract creation",
			followUpQuestions: createFollowUpQuestions("proposal creation"),
		},
		{
			id: "inconsistent-communication",
			label: "Inconsistent client communication",
			followUpQuestions: createFollowUpQuestions("client communication"),
		},
		{
			id: "manual-research",
			label: "Manual research processes",
			followUpQuestions: createFollowUpQuestions("research"),
		},
		{
			id: "limited-automation",
			label: "Limited automation in delivery pipelines",
			followUpQuestions: createFollowUpQuestions("delivery automation"),
		},
	],
	saas: [
		{
			id: "high-support",
			label: "High product support volume",
			followUpQuestions: createFollowUpQuestions("product support"),
		},
		{
			id: "manual-qa",
			label: "Manual QA and bug triage",
			followUpQuestions: createFollowUpQuestions("QA processes"),
		},
		{
			id: "poor-documentation",
			label: "Poor internal documentation quality",
			followUpQuestions: createFollowUpQuestions("documentation"),
		},
		{
			id: "slow-onboarding",
			label: "Slow onboarding for new users",
			followUpQuestions: createFollowUpQuestions("user onboarding"),
		},
		{
			id: "low-visibility",
			label: "Low visibility into product usage",
			followUpQuestions: createFollowUpQuestions("product analytics"),
		},
		{
			id: "manual-pipelines",
			label: "Manual data pipelines",
			followUpQuestions: createFollowUpQuestions("data pipelines"),
		},
		{
			id: "slow-releases",
			label: "Slow release cycles",
			followUpQuestions: createFollowUpQuestions("release management"),
		},
		{
			id: "fragmented-analytics",
			label: "Fragmented analytics setup",
			followUpQuestions: createFollowUpQuestions("analytics"),
		},
		{
			id: "manual-customer-success",
			label: "Manual customer success workflows",
			followUpQuestions: createFollowUpQuestions("customer success"),
		},
		{
			id: "limited-personalization",
			label: "Limited personalization inside the product",
			followUpQuestions: createFollowUpQuestions("product personalization"),
		},
	],
	healthcare: [
		{
			id: "manual-scheduling",
			label: "Manual appointment scheduling",
			followUpQuestions: createFollowUpQuestions("appointment scheduling"),
		},
		{
			id: "triage-inefficiencies",
			label: "Patient triage inefficiencies",
			followUpQuestions: createFollowUpQuestions("patient triage"),
		},
		{
			id: "admin-workload",
			label: "Heavy admin workload for staff",
			followUpQuestions: createFollowUpQuestions("administrative tasks"),
		},
		{
			id: "manual-records",
			label: "Manual medical records processing",
			followUpQuestions: createFollowUpQuestions("medical records"),
		},
		{
			id: "long-wait-times",
			label: "Long wait times",
			followUpQuestions: createFollowUpQuestions("wait times"),
		},
		{
			id: "inaccurate-forecasting",
			label: "Inaccurate demand forecasting",
			followUpQuestions: createFollowUpQuestions("demand forecasting"),
		},
		{
			id: "compliance-documentation",
			label: "Difficulty managing documentation compliance",
			followUpQuestions: createFollowUpQuestions("compliance"),
		},
		{
			id: "manual-billing",
			label: "Manual billing and insurance tasks",
			followUpQuestions: createFollowUpQuestions("billing"),
		},
		{
			id: "poor-follow-up",
			label: "Poor patient follow-up workflows",
			followUpQuestions: createFollowUpQuestions("patient follow-up"),
		},
	],
	education: [
		{
			id: "manual-grading",
			label: "Manual grading and assessments",
			followUpQuestions: createFollowUpQuestions("grading"),
		},
		{
			id: "inefficient-course-creation",
			label: "Inefficient course creation workflows",
			followUpQuestions: createFollowUpQuestions("course creation"),
		},
		{
			id: "personalization-difficulty",
			label: "Difficulty personalizing learning paths",
			followUpQuestions: createFollowUpQuestions("learning personalization"),
		},
		{
			id: "manual-onboarding",
			label: "Manual student onboarding",
			followUpQuestions: createFollowUpQuestions("student onboarding"),
		},
		{
			id: "poor-engagement-tracking",
			label: "Poor student engagement tracking",
			followUpQuestions: createFollowUpQuestions("engagement tracking"),
		},
		{
			id: "time-consuming-content",
			label: "Time-consuming content creation",
			followUpQuestions: createFollowUpQuestions("content creation"),
		},
		{
			id: "manual-admin",
			label: "Manual administrative tasks",
			followUpQuestions: createFollowUpQuestions("administrative tasks"),
		},
		{
			id: "ineffective-communication",
			label: "Ineffective communication with students/parents",
			followUpQuestions: createFollowUpQuestions("communication"),
		},
		{
			id: "limited-analytics",
			label: "Limited analytics for performance insights",
			followUpQuestions: createFollowUpQuestions("performance analytics"),
		},
	],
	finance: [
		{
			id: "manual-compliance",
			label: "Manual compliance and reporting",
			followUpQuestions: createFollowUpQuestions("compliance"),
		},
		{
			id: "fraud-detection",
			label: "Fraud detection gaps",
			followUpQuestions: createFollowUpQuestions("fraud detection"),
		},
		{
			id: "manual-risk-scoring",
			label: "Manual risk scoring",
			followUpQuestions: createFollowUpQuestions("risk assessment"),
		},
		{
			id: "high-support-load",
			label: "Heavy customer support load",
			followUpQuestions: createFollowUpQuestions("customer support"),
		},
		{
			id: "slow-onboarding",
			label: "Slow onboarding/KYC",
			followUpQuestions: createFollowUpQuestions("onboarding"),
		},
		{
			id: "fragmented-data",
			label: "Fragmented data between systems",
			followUpQuestions: createFollowUpQuestions("data integration"),
		},
		{
			id: "manual-transaction-classification",
			label: "Manual transaction classification",
			followUpQuestions: createFollowUpQuestions("transaction processing"),
		},
		{
			id: "lack-predictive-insights",
			label: "Lack of predictive insights",
			followUpQuestions: createFollowUpQuestions("predictive analytics"),
		},
		{
			id: "inefficient-document-processing",
			label: "Inefficient document processing",
			followUpQuestions: createFollowUpQuestions("document processing"),
		},
		{
			id: "poor-process-automation",
			label: "Poor process automation in operations",
			followUpQuestions: createFollowUpQuestions("process automation"),
		},
	],
	hospitality: [
		{
			id: "manual-booking",
			label: "Manual booking management",
			followUpQuestions: createFollowUpQuestions("booking management"),
		},
		{
			id: "high-service-volume",
			label: "High customer service volume",
			followUpQuestions: createFollowUpQuestions("customer service"),
		},
		{
			id: "static-pricing",
			label: "Pricing strategy not dynamic",
			followUpQuestions: createFollowUpQuestions("pricing strategy"),
		},
		{
			id: "poor-review-tracking",
			label: "Poor guest review sentiment tracking",
			followUpQuestions: createFollowUpQuestions("review tracking"),
		},
		{
			id: "inefficient-operations",
			label: "Inefficient housekeeping or operations planning",
			followUpQuestions: createFollowUpQuestions("operations planning"),
		},
		{
			id: "manual-checkin",
			label: "Manual check-in/out processes",
			followUpQuestions: createFollowUpQuestions("check-in processes"),
		},
		{
			id: "ineffective-marketing",
			label: "Ineffective marketing personalization",
			followUpQuestions: createFollowUpQuestions("marketing"),
		},
		{
			id: "poor-forecasting",
			label: "Poor demand forecasting",
			followUpQuestions: createFollowUpQuestions("demand forecasting"),
		},
		{
			id: "manual-reporting",
			label: "Manual reporting",
			followUpQuestions: createFollowUpQuestions("reporting"),
		},
	],
	"real-estate": [
		{
			id: "manual-screening",
			label: "Manual tenant screening",
			followUpQuestions: createFollowUpQuestions("tenant screening"),
		},
		{
			id: "slow-valuation",
			label: "Slow property valuation processes",
			followUpQuestions: createFollowUpQuestions("property valuation"),
		},
		{
			id: "manual-maintenance",
			label: "Manual maintenance tracking",
			followUpQuestions: createFollowUpQuestions("maintenance tracking"),
		},
		{
			id: "inefficient-scheduling",
			label: "Inefficient appointment scheduling",
			followUpQuestions: createFollowUpQuestions("appointment scheduling"),
		},
		{
			id: "high-admin-workload",
			label: "High admin workload for agents",
			followUpQuestions: createFollowUpQuestions("administrative tasks"),
		},
		{
			id: "limited-lead-automation",
			label: "Limited automation in lead management",
			followUpQuestions: createFollowUpQuestions("lead management"),
		},
		{
			id: "poor-data-visibility",
			label: "Poor data visibility across listings",
			followUpQuestions: createFollowUpQuestions("data visibility"),
		},
		{
			id: "manual-document-processing",
			label: "Manual document processing",
			followUpQuestions: createFollowUpQuestions("document processing"),
		},
		{
			id: "difficulty-forecasting",
			label: "Difficulty forecasting rental demand",
			followUpQuestions: createFollowUpQuestions("demand forecasting"),
		},
	],
	manufacturing: [
		{
			id: "manual-quality-control",
			label: "Manual quality control processes",
			followUpQuestions: createFollowUpQuestions("quality control"),
		},
		{
			id: "inefficient-forecasting",
			label: "Inefficient demand forecasting",
			followUpQuestions: createFollowUpQuestions("demand forecasting"),
		},
		{
			id: "unplanned-downtime",
			label: "Unplanned downtime",
			followUpQuestions: createFollowUpQuestions("downtime management"),
		},
		{
			id: "manual-inventory",
			label: "Manual inventory tracking",
			followUpQuestions: createFollowUpQuestions("inventory tracking"),
		},
		{
			id: "poor-supply-chain-visibility",
			label: "Poor supply chain visibility",
			followUpQuestions: createFollowUpQuestions("supply chain"),
		},
		{
			id: "manual-reporting",
			label: "Manual reporting",
			followUpQuestions: createFollowUpQuestions("reporting"),
		},
		{
			id: "slow-scheduling",
			label: "Slow production scheduling",
			followUpQuestions: createFollowUpQuestions("production scheduling"),
		},
		{
			id: "limited-maintenance-automation",
			label: "Limited maintenance automation",
			followUpQuestions: createFollowUpQuestions("maintenance"),
		},
		{
			id: "poor-documentation",
			label: "Poor documentation workflows",
			followUpQuestions: createFollowUpQuestions("documentation"),
		},
		{
			id: "high-operational-labor",
			label: "High operational labor for repetitive tasks",
			followUpQuestions: createFollowUpQuestions("repetitive tasks"),
		},
	],
	retail: [
		{
			id: "manual-inventory-counts",
			label: "Manual inventory counts",
			followUpQuestions: createFollowUpQuestions("inventory management"),
		},
		{
			id: "poor-customer-insights",
			label: "Poor customer behavior insights",
			followUpQuestions: createFollowUpQuestions("customer analytics"),
		},
		{
			id: "inefficient-scheduling",
			label: "Inefficient scheduling and staffing",
			followUpQuestions: createFollowUpQuestions("staffing"),
		},
		{
			id: "long-checkout",
			label: "Long checkout times",
			followUpQuestions: createFollowUpQuestions("checkout processes"),
		},
		{
			id: "manual-reporting",
			label: "Manual reporting",
			followUpQuestions: createFollowUpQuestions("reporting"),
		},
		{
			id: "ineffective-personalization",
			label: "Ineffective marketing personalization",
			followUpQuestions: createFollowUpQuestions("marketing"),
		},
		{
			id: "no-realtime-stock",
			label: "No real-time stock tracking",
			followUpQuestions: createFollowUpQuestions("inventory tracking"),
		},
		{
			id: "manual-supplier-coordination",
			label: "Manual supplier coordination",
			followUpQuestions: createFollowUpQuestions("supplier management"),
		},
		{
			id: "limited-purchasing-analytics",
			label: "Limited analytics for purchasing patterns",
			followUpQuestions: createFollowUpQuestions("purchasing analytics"),
		},
	],
	nonprofit: [
		{
			id: "manual-donor-management",
			label: "Manual donor management",
			followUpQuestions: createFollowUpQuestions("donor management"),
		},
		{
			id: "inefficient-grant-workflows",
			label: "Inefficient grant application workflows",
			followUpQuestions: createFollowUpQuestions("grant applications"),
		},
		{
			id: "poor-campaign-tracking",
			label: "Poor campaign performance tracking",
			followUpQuestions: createFollowUpQuestions("campaign tracking"),
		},
		{
			id: "manual-volunteer-scheduling",
			label: "Manual volunteer scheduling",
			followUpQuestions: createFollowUpQuestions("volunteer management"),
		},
		{
			id: "low-data-visibility",
			label: "Low data visibility across programs",
			followUpQuestions: createFollowUpQuestions("data visibility"),
		},
		{
			id: "manual-stakeholder-reporting",
			label: "Manual reporting to stakeholders",
			followUpQuestions: createFollowUpQuestions("reporting"),
		},
		{
			id: "ineffective-segmentation",
			label: "Ineffective segmentation for outreach",
			followUpQuestions: createFollowUpQuestions("outreach"),
		},
		{
			id: "limited-automation",
			label: "Limited automation for recurring tasks",
			followUpQuestions: createFollowUpQuestions("task automation"),
		},
		{
			id: "heavy-admin-burden",
			label: "Heavy admin burden on small teams",
			followUpQuestions: createFollowUpQuestions("administrative tasks"),
		},
	],
	legal: [
		{
			id: "manual-contract-review",
			label: "Manual contract review",
			followUpQuestions: createFollowUpQuestions("contract review"),
		},
		{
			id: "document-heavy-workflows",
			label: "Document-heavy workflows",
			followUpQuestions: createFollowUpQuestions("document management"),
		},
		{
			id: "manual-case-research",
			label: "Manual case research",
			followUpQuestions: createFollowUpQuestions("legal research"),
		},
		{
			id: "time-consuming-intake",
			label: "Time-consuming client intake",
			followUpQuestions: createFollowUpQuestions("client intake"),
		},
		{
			id: "compliance-monitoring-gaps",
			label: "Compliance monitoring gaps",
			followUpQuestions: createFollowUpQuestions("compliance"),
		},
		{
			id: "slow-document-summarization",
			label: "Slow document summarization",
			followUpQuestions: createFollowUpQuestions("document processing"),
		},
		{
			id: "low-case-automation",
			label: "Low automation in case management",
			followUpQuestions: createFollowUpQuestions("case management"),
		},
		{
			id: "manual-billing",
			label: "Manual billing",
			followUpQuestions: createFollowUpQuestions("billing"),
		},
		{
			id: "poor-knowledge-base",
			label: "Poor knowledge base quality",
			followUpQuestions: createFollowUpQuestions("knowledge management"),
		},
	],
	media: [
		{
			id: "manual-video-editing",
			label: "Manual video editing workflows",
			followUpQuestions: createFollowUpQuestions("video editing"),
		},
		{
			id: "slow-content-production",
			label: "Slow content production cycles",
			followUpQuestions: createFollowUpQuestions("content production"),
		},
		{
			id: "manual-subtitle-creation",
			label: "Manual subtitle creation",
			followUpQuestions: createFollowUpQuestions("subtitle creation"),
		},
		{
			id: "poor-sentiment-insights",
			label: "Poor social sentiment insights",
			followUpQuestions: createFollowUpQuestions("sentiment analysis"),
		},
		{
			id: "manual-content-tagging",
			label: "Manual content tagging",
			followUpQuestions: createFollowUpQuestions("content tagging"),
		},
		{
			id: "poor-personalization",
			label: "Poor personalization for viewers",
			followUpQuestions: createFollowUpQuestions("personalization"),
		},
		{
			id: "manual-reporting",
			label: "Manual reporting",
			followUpQuestions: createFollowUpQuestions("reporting"),
		},
		{
			id: "inefficient-asset-management",
			label: "Inefficient asset management",
			followUpQuestions: createFollowUpQuestions("asset management"),
		},
		{
			id: "difficulty-scaling",
			label: "Difficulty scaling content operation",
			followUpQuestions: createFollowUpQuestions("content scaling"),
		},
	],
	energy: [
		{
			id: "manual-compliance-reporting",
			label: "Manual compliance reporting",
			followUpQuestions: createFollowUpQuestions("compliance"),
		},
		{
			id: "inefficient-forecasting",
			label: "Inefficient demand forecasting",
			followUpQuestions: createFollowUpQuestions("demand forecasting"),
		},
		{
			id: "unplanned-maintenance",
			label: "Unplanned maintenance",
			followUpQuestions: createFollowUpQuestions("maintenance"),
		},
		{
			id: "manual-field-reporting",
			label: "Manual field reporting",
			followUpQuestions: createFollowUpQuestions("field reporting"),
		},
		{
			id: "scattered-data",
			label: "Data scattered across systems",
			followUpQuestions: createFollowUpQuestions("data integration"),
		},
		{
			id: "poor-energy-analytics",
			label: "Poor energy usage analytics",
			followUpQuestions: createFollowUpQuestions("energy analytics"),
		},
		{
			id: "manual-customer-service",
			label: "Manual customer service workflows",
			followUpQuestions: createFollowUpQuestions("customer service"),
		},
		{
			id: "limited-predictive-insights",
			label: "Limited predictive insights",
			followUpQuestions: createFollowUpQuestions("predictive analytics"),
		},
		{
			id: "high-operational-overhead",
			label: "High operational overhead",
			followUpQuestions: createFollowUpQuestions("operational efficiency"),
		},
	],
	construction: [
		{
			id: "manual-project-scheduling",
			label: "Manual project scheduling",
			followUpQuestions: createFollowUpQuestions("project scheduling"),
		},
		{
			id: "poor-safety-monitoring",
			label: "Poor site safety monitoring",
			followUpQuestions: createFollowUpQuestions("safety monitoring"),
		},
		{
			id: "manual-blueprint-analysis",
			label: "Manual blueprint analysis",
			followUpQuestions: createFollowUpQuestions("blueprint analysis"),
		},
		{
			id: "high-admin-overhead",
			label: "High administrative overhead",
			followUpQuestions: createFollowUpQuestions("administrative tasks"),
		},
		{
			id: "slow-permit-workflows",
			label: "Slow permit or documentation workflows",
			followUpQuestions: createFollowUpQuestions("permit processing"),
		},
		{
			id: "ineffective-cost-estimation",
			label: "Ineffective cost estimation",
			followUpQuestions: createFollowUpQuestions("cost estimation"),
		},
		{
			id: "poor-resource-planning",
			label: "Poor resource planning",
			followUpQuestions: createFollowUpQuestions("resource planning"),
		},
		{
			id: "manual-reporting",
			label: "Manual reporting",
			followUpQuestions: createFollowUpQuestions("reporting"),
		},
		{
			id: "inconsistent-communication",
			label: "Inconsistent communication flows",
			followUpQuestions: createFollowUpQuestions("communication"),
		},
	],
	transportation: [
		{
			id: "inefficient-route-planning",
			label: "Inefficient route planning",
			followUpQuestions: createFollowUpQuestions("route planning"),
		},
		{
			id: "manual-shipment-tracking",
			label: "Manual shipment tracking",
			followUpQuestions: createFollowUpQuestions("shipment tracking"),
		},
		{
			id: "unplanned-fleet-maintenance",
			label: "Unplanned fleet maintenance",
			followUpQuestions: createFollowUpQuestions("fleet maintenance"),
		},
		{
			id: "manual-documentation",
			label: "Manual documentation",
			followUpQuestions: createFollowUpQuestions("documentation"),
		},
		{
			id: "poor-forecasting",
			label: "Poor demand forecasting",
			followUpQuestions: createFollowUpQuestions("demand forecasting"),
		},
		{
			id: "inefficient-warehouse",
			label: "Inefficient warehouse workflows",
			followUpQuestions: createFollowUpQuestions("warehouse operations"),
		},
		{
			id: "limited-delay-visibility",
			label: "Limited visibility into delays",
			followUpQuestions: createFollowUpQuestions("delay tracking"),
		},
		{
			id: "manual-customer-updates",
			label: "Manual customer updates",
			followUpQuestions: createFollowUpQuestions("customer communication"),
		},
		{
			id: "ineffective-load-optimization",
			label: "Ineffective load optimization",
			followUpQuestions: createFollowUpQuestions("load optimization"),
		},
	],
	agriculture: [
		{
			id: "manual-crop-monitoring",
			label: "Manual crop monitoring",
			followUpQuestions: createFollowUpQuestions("crop monitoring"),
		},
		{
			id: "poor-yield-prediction",
			label: "Poor yield prediction",
			followUpQuestions: createFollowUpQuestions("yield prediction"),
		},
		{
			id: "inefficient-irrigation",
			label: "Inefficient irrigation management",
			followUpQuestions: createFollowUpQuestions("irrigation"),
		},
		{
			id: "manual-pest-detection",
			label: "Manual pest detection",
			followUpQuestions: createFollowUpQuestions("pest management"),
		},
		{
			id: "supply-chain-visibility",
			label: "Supply chain visibility gaps",
			followUpQuestions: createFollowUpQuestions("supply chain"),
		},
		{
			id: "manual-reporting",
			label: "Manual reporting",
			followUpQuestions: createFollowUpQuestions("reporting"),
		},
		{
			id: "inefficient-storage",
			label: "Inefficient storage and inventory",
			followUpQuestions: createFollowUpQuestions("inventory management"),
		},
		{
			id: "low-predictive-insights",
			label: "Low predictive insights",
			followUpQuestions: createFollowUpQuestions("predictive analytics"),
		},
		{
			id: "limited-farm-automation",
			label: "Limited automation on farms",
			followUpQuestions: createFollowUpQuestions("farm automation"),
		},
	],
	beauty: [
		{
			id: "manual-scheduling",
			label: "Manual appointment scheduling",
			followUpQuestions: createFollowUpQuestions("appointment scheduling"),
		},
		{
			id: "inventory-mismanagement",
			label: "Inventory mismanagement",
			followUpQuestions: createFollowUpQuestions("inventory management"),
		},
		{
			id: "poor-retention-data",
			label: "Poor customer retention data",
			followUpQuestions: createFollowUpQuestions("customer retention"),
		},
		{
			id: "manual-reporting",
			label: "Manual reporting",
			followUpQuestions: createFollowUpQuestions("reporting"),
		},
		{
			id: "ineffective-personalization",
			label: "Ineffective personalization",
			followUpQuestions: createFollowUpQuestions("personalization"),
		},
		{
			id: "limited-marketing-automation",
			label: "Limited automation in marketing",
			followUpQuestions: createFollowUpQuestions("marketing automation"),
		},
		{
			id: "high-frontline-workload",
			label: "High frontline staff workload",
			followUpQuestions: createFollowUpQuestions("staff workload"),
		},
		{
			id: "poor-product-forecasting",
			label: "Poor forecasting for product demand",
			followUpQuestions: createFollowUpQuestions("demand forecasting"),
		},
		{
			id: "manual-client-records",
			label: "Manual handling of client records",
			followUpQuestions: createFollowUpQuestions("client records"),
		},
	],
	other: [],
}

// Universal question steps
export const universalQuestions: QuestionStep[] = [
	{
		id: "role",
		type: "role",
		label: "What best describes your role?",
		required: true,
		options: [
			{ value: "ceo", label: "CEO / Founder" },
			{ value: "operations", label: "Operations Manager" },
			{ value: "marketing", label: "Marketing Manager" },
			{ value: "sales", label: "Sales Manager" },
			{ value: "tech", label: "Tech / Product Lead" },
			{ value: "other", label: "Other" },
		],
	},
	{
		id: "company-size",
		type: "company-size",
		label: "What is your company size?",
		required: true,
		options: [
			{ value: "micro", label: "1–9 employees" },
			{ value: "small", label: "10–49 employees" },
			{ value: "medium", label: "50–249 employees" },
			{ value: "large", label: "250+ employees" },
		],
	},
	{
		id: "workflow-maturity",
		type: "workflow-maturity",
		label: "How would you describe your current workflow maturity? (1 = messy, 5 = well-structured)",
		required: true,
		options: [
			{ value: "1", label: "1" },
			{ value: "2", label: "2" },
			{ value: "3", label: "3" },
			{ value: "4", label: "4" },
			{ value: "5", label: "5" },
		],
	},
	{
		id: "sop-level",
		type: "sop-level",
		label: "Do you use documented SOPs or workflows?",
		required: true,
		options: [
			{ value: "fully-documented", label: "Yes, fully documented" },
			{ value: "some-documented", label: "Some, but not consistent" },
			{ value: "informal", label: "Only informal processes" },
			{ value: "none", label: "No" },
		],
	},
	{
		id: "integration-level",
		type: "integration-level",
		label: "How integrated is your current software stack?",
		required: true,
		options: [
			{ value: "highly-integrated", label: "Highly integrated" },
			{ value: "partially-integrated", label: "Partially integrated" },
			{ value: "mostly-siloed", label: "Mostly siloed" },
			{ value: "completely-siloed", label: "Completely siloed" },
		],
	},
	{
		id: "data-quality",
		type: "data-quality",
		label: "How clean and accessible is your operational data?",
		required: true,
		options: [
			{ value: "very-clean", label: "Very clean and organized" },
			{ value: "moderately-organized", label: "Moderately organized" },
			{ value: "somewhat-messy", label: "Somewhat messy" },
			{ value: "very-messy", label: "Very messy / scattered" },
			{ value: "not-sure", label: "Not sure" },
		],
	},
	{
		id: "tools",
		type: "tools",
		label: "Which tools do you currently use?",
		required: false,
		multiSelect: true,
		options: [
			{ value: "google-workspace", label: "Google Workspace" },
			{ value: "excel", label: "Excel" },
			{ value: "slack", label: "Slack" },
			{ value: "crm", label: "CRM" },
			{ value: "notion", label: "Notion" },
			{ value: "zapier", label: "Zapier" },
			{ value: "monday", label: "Monday.com" },
			{ value: "hubspot", label: "HubSpot" },
			{ value: "shopify", label: "Shopify" },
			{ value: "industry-specific", label: "Industry-specific tools" },
			{ value: "none", label: "None" },
		],
	},
	{
		id: "technical-capability",
		type: "technical-capability",
		label: "Do you have in-house technical capabilities (developers or data analysts)?",
		required: true,
		options: [
			{ value: "fully-capable", label: "Yes, fully capable" },
			{ value: "some-technical", label: "Some technical team members" },
			{ value: "no-technical", label: "No technical staff" },
		],
	},
	{
		id: "team-openness",
		type: "team-openness",
		label: "How comfortable is your team with adopting new tools or technologies?",
		required: true,
		options: [
			{ value: "very-open", label: "Very open and fast to adapt" },
			{ value: "open-with-guidance", label: "Open but need guidance" },
			{ value: "hesitant", label: "Hesitant or limited" },
		],
	},
	{
		id: "website",
		type: "website",
		label: "Company website (optional but recommended)",
		description: "If you don't have a company link, please describe your business or add a competitor link",
		required: false,
		placeholder: "https://example.com",
	},
	{
		id: "industry",
		type: "industry",
		label: "Select your industry",
		required: true,
		options: [
			{ value: "ecommerce", label: "Ecommerce" },
			{ value: "agency", label: "Agency/Consulting" },
			{ value: "saas", label: "SaaS/Tech" },
			{ value: "healthcare", label: "Healthcare & Medical Services" },
			{ value: "education", label: "Education & EdTech" },
			{ value: "finance", label: "Financial Services / FinTech" },
			{ value: "hospitality", label: "Hospitality & Tourism" },
			{ value: "real-estate", label: "Real Estate & Property Management" },
			{ value: "manufacturing", label: "Manufacturing & Supply Chain" },
			{ value: "retail", label: "Retail (Physical Stores)" },
			{ value: "nonprofit", label: "Nonprofit & NGOs" },
			{ value: "legal", label: "Legal & Compliance Services" },
			{ value: "media", label: "Media & Entertainment" },
			{ value: "energy", label: "Energy & Utilities" },
			{ value: "construction", label: "Construction & Architecture" },
			{ value: "transportation", label: "Transportation & Logistics" },
			{ value: "agriculture", label: "Agriculture & Food Production" },
			{ value: "beauty", label: "Beauty & Wellness" },
			{ value: "other", label: "Other" },
		],
	},
]

export function getChallengesForIndustry(industry: Industry): IndustryChallenge[] {
	return industryChallenges[industry] || []
}

export function getQuestionSteps(): QuestionStep[] {
	return universalQuestions
}




