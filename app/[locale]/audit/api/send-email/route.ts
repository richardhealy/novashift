import { NextRequest, NextResponse } from "next/server"
import { sendAuditEmail } from "@/lib/audit/send-email"
import type { ReportData, ScoringResult } from "@/types/audit"

export async function POST(request: NextRequest) {
	try {
		const body = await request.json()
		const { email, reportData, scores } = body

		if (!email) {
			return NextResponse.json(
				{ error: "Email is required" },
				{ status: 400 },
			)
		}

		if (!reportData || !scores) {
			return NextResponse.json(
				{ error: "Missing reportData or scores" },
				{ status: 400 },
			)
		}

		const result = await sendAuditEmail(email, reportData, scores)

		if (!result.success) {
			return NextResponse.json(
				{ error: result.error || "Failed to send email" },
				{ status: 500 },
			)
		}

		return NextResponse.json({
			success: true,
			messageId: result.messageId,
		})
	} catch (error) {
		console.error("📧 [SEND EMAIL API] Error:", error)
		return NextResponse.json(
			{
				error:
					error instanceof Error
						? error.message
						: "Failed to send email",
			},
			{ status: 500 },
		)
	}
}

