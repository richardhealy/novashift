"use server"

import { supabase } from "@/lib/supabase"

export type ContactFormData = {
	full_name: string
	email: string
	company_name: string
	website_url?: string
	message: string
}

export type ContactFormResponse = {
	success: boolean
	message?: string
	error?: string
}

/**
 * Submits contact form data to Supabase
 * Table name: contact_submissions
 *
 * Required Supabase table schema:
 * - id: uuid (primary key, default: gen_random_uuid())
 * - full_name: text
 * - email: text
 * - company_name: text
 * - website_url: text (nullable)
 * - message: text
 * - created_at: timestamp with time zone (default: now())
 */
export async function submitContactForm(
	data: ContactFormData,
): Promise<ContactFormResponse> {
	try {
		const { error } = await supabase.from("contact_submissions").insert([
			{
				full_name: data.full_name,
				email: data.email,
				company_name: data.company_name,
				website_url: data.website_url || null,
				message: data.message,
			},
		])

		if (error) {
			console.error("Supabase error:", error)
			return {
				success: false,
				error: "Failed to submit form. Please try again later.",
			}
		}

		return {
			success: true,
			message: "Thank you! Your message has been sent successfully.",
		}
	} catch (error) {
		console.error("Unexpected error:", error)
		return {
			success: false,
			error: "An unexpected error occurred. Please try again later.",
		}
	}
}
