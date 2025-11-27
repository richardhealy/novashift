import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const formatDate = (dateString: string): string => {
	const date = new Date(dateString)
	return new Intl.DateTimeFormat("en-US", {
		month: "long",
		day: "numeric",
		year: "numeric",
	}).format(date)
}

// Convert Western numerals to Arabic numerals
export const toArabicNumerals = (text: string): string => {
	const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩']
	return text.replace(/\d/g, (digit) => arabicNumerals[Number.parseInt(digit)])
}
