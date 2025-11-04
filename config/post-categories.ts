export const categories = [
	"All",
	"Strategy",
	"NLP solutions",
	"Computer Vision",
	"AI Consulting",
	"Machine Learning",
	"Automation",
] as const

export type Category = (typeof categories)[number]
