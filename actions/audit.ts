"use server"

import { createServiceRoleClient } from "@/lib/supabase"
import { sendAuditEmail } from "@/lib/audit/send-email"
import type { AuditResponse, ScoringResult, ReportData } from "@/types/audit"

export type AuditSubmissionResponse = {
	success: boolean
	message?: string
	error?: string
	submissionId?: string
}

/**
 * Submits audit data to Supabase and sends email with PDF report
 * Table name: audit_submissions
 */
export async function submitAuditSubmission(
	email: string | undefined,
	role: string,
	industry: string,
	responses: AuditResponse,
	scores: ScoringResult,
	reportData: ReportData,
	pdfUrl?: string,
): Promise<AuditSubmissionResponse> {
	try {
		const supabase = createServiceRoleClient()

		// First, save to database
		const { error, data: insertedData } = await supabase
			.from("audit_submissions")
			.insert([
				{
					email: email || null,
					role,
					industry,
					responses,
					scores,
					report_data: reportData,
					pdf_url: pdfUrl || null,
				},
			])
			.select()

		if (error) {
			console.error("Supabase error:", JSON.stringify(error, null, 2))
			return {
				success: false,
				error: error.message || "Failed to submit audit. Please try again later.",
			}
		}

		// If email is provided, send the PDF report via email
		if (email) {
			try {
				console.log("📧 [SUBMIT AUDIT] Sending email to:", email)
				const emailResult = await sendAuditEmail(email, reportData, scores)
				
				if (!emailResult.success) {
					console.error("📧 [SUBMIT AUDIT] Email send failed:", emailResult.error)
					// Don't fail the entire submission if email fails
					// The data is already saved to the database
				} else {
					console.log("📧 [SUBMIT AUDIT] Email sent successfully, message ID:", emailResult.messageId)
				}
			} catch (emailError) {
				console.error("📧 [SUBMIT AUDIT] Email error:", emailError)
				// Don't fail the entire submission if email fails
			}
		}

		return {
			success: true,
			message: "Audit submitted successfully.",
			submissionId: insertedData?.[0]?.id,
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

