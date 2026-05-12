"use server"

import { sendContactEmail } from "@/lib/contact/send-email"

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
 * Submits contact form data by sending a notification email via Resend (no database dependency)
 */
export async function submitContactForm(
	data: ContactFormData,
): Promise<ContactFormResponse> {
	try {
		console.log("📧 [CONTACT] Sending contact inquiry from:", data.email)

		const result = await sendContactEmail(data)

		if (!result.success) {
			console.error("📧 [CONTACT] Email send failed:", result.error)
			return {
				success: false,
				error: result.error || "Failed to submit form. Please try again later.",
			}
		}

		console.log("📧 [CONTACT] Email sent successfully, message ID:", result.messageId)
		return {
			success: true,
			message: "Thank you! Your message has been sent successfully.",
		}
	} catch (error) {
		console.error("📧 [CONTACT] Unexpected error:", error)
		return {
			success: false,
			error:
				error instanceof Error
					? error.message
					: "An unexpected error occurred. Please try again later.",
		}
	}
}
