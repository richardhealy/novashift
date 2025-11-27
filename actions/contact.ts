"use server"

import { createServiceRoleClient } from "@/lib/supabase"

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
		// Use service role client to bypass RLS
		const supabase = createServiceRoleClient()
		
		const { error, data: insertedData } = await supabase
			.from("contact_submissions")
			.insert([
				{
					full_name: data.full_name,
					email: data.email,
					company_name: data.company_name,
					website_url: data.website_url || null,
					message: data.message,
				},
			])
			.select()

		if (error) {
			console.error("Supabase error:", JSON.stringify(error, null, 2))
			return {
				success: false,
				error: error.message || "Failed to submit form. Please try again later.",
			}
		}

		return {
			success: true,
			message: "Thank you! Your message has been sent successfully.",
		}
	} catch (error) {
		console.error("Unexpected error:", error)
		const errorMessage =
			error instanceof Error ? error.message : "An unexpected error occurred."
		return {
			success: false,
			error: errorMessage || "An unexpected error occurred. Please try again later.",
		}
	}
}
