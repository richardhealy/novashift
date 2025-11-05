// Home Page Case Item
export interface CaseStudiesItem {
	id: string
	title: string
	description: string
	imageUrl: string
}

// Cases Page Accordion Items
export interface CaseAccordionItem {
	id: string
	title: string
	text: string | { content: string; key?: string }[]
}
export interface CaseAccordionProps {
	accordionData: CaseAccordionItem[]
	imageUrl: string
	imageClass?: string
	reverse?: boolean
}
