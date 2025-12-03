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
    | "other";

export interface FollowUpQuestion {
    id: string;
    type: string;
    label: string;
    options: { value: string; label: string }[];
}

export interface IndustryChallenge {
    id: string;
    label: string;
    followUpQuestions: FollowUpQuestion[];
}

export interface QuestionStep {
    id: string;
    label: string;
    type: string;
    options?: { value: string; label: string }[];
    required?: boolean;
    multiSelect?: boolean;
    description?: string;
    placeholder?: string;
}

export interface AuditResponse {
    role: string;
    industry: Industry;
    companySize: string;
    workflowMaturity: string;
    sopLevel: string;
    integrationLevel: string;
    dataQuality: string;
    tools: string[];
    technicalCapability: string;
    teamOpenness: string;
    websiteUrl?: string;
    selectedChallenges: string[];
    challengeResponses: Record<string, any>;
}
