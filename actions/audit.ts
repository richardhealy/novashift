"use server"

import { sendAuditEmail } from "@/lib/audit/send-email"
import type { AuditResponse, ScoringResult, ReportData } from "@/types/audit"

export type AuditSubmissionResponse = {
	success: boolean
	message?: string
	error?: string
}

/**
 * Sends the audit report PDF to the user via email (no database dependency)
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
	if (!email) {
		return {
			success: false,
			error: "An email address is required to send the report.",
		}
	}

	try {
		console.log("📧 [SUBMIT AUDIT] Sending report email to:", email)
		const emailResult = await sendAuditEmail(email, reportData, scores)

		if (!emailResult.success) {
			console.error("📧 [SUBMIT AUDIT] Email send failed:", emailResult.error)
			return {
				success: false,
				error: emailResult.error || "Failed to send report email. Please try again.",
			}
		}

		console.log("📧 [SUBMIT AUDIT] Email sent successfully, message ID:", emailResult.messageId)
		return {
			success: true,
			message: "Report sent successfully.",
		}
	} catch (error) {
		console.error("📧 [SUBMIT AUDIT] Unexpected error:", error)
		return {
			success: false,
			error: error instanceof Error ? error.message : "An unexpected error occurred. Please try again.",
		}
	}
}

