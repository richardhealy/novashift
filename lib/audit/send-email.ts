import { Resend } from "resend"
import { renderToStream } from "@react-pdf/renderer"
import { PDFTemplate } from "@/lib/audit/pdf-template"
import type { ReportData, ScoringResult } from "@/types/audit"

export async function sendAuditEmail(
	email: string,
	reportData: ReportData,
	scores: ScoringResult,
): Promise<{ success: boolean; error?: string; messageId?: string }> {
	try {
		const apiKey = process.env.RESEND_API_KEY
		if (!apiKey) {
			console.error("📧 [SEND EMAIL] RESEND_API_KEY is not set")
			return {
				success: false,
				error: "Email service is not configured",
			}
		}

		const resend = new Resend(apiKey)

		// Generate PDF
		console.log("📧 [SEND EMAIL] Generating PDF...")
		const pdfStream = await renderToStream(
			PDFTemplate({ reportData, scores }),
		)

		// Convert stream to buffer
		const chunks: Uint8Array[] = []
		for await (const chunk of pdfStream as any) {
			chunks.push(chunk)
		}
		const buffer = Buffer.concat(chunks)

		console.log("📧 [SEND EMAIL] PDF generated, size:", buffer.length, "bytes")

		// Send email with PDF attachment
		const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev"
		const fromName = process.env.RESEND_FROM_NAME || "NovaShift"

		console.log("📧 [SEND EMAIL] Sending email to:", email, "from:", fromEmail)

		const { data, error } = await resend.emails.send({
			from: `${fromName} <${fromEmail}>`,
			to: [email],
			subject: "Your AI Readiness Audit Report - NovaShift",
			html: `
				<!DOCTYPE html>
				<html>
					<head>
						<meta charset="utf-8">
						<meta name="viewport" content="width=device-width, initial-scale=1.0">
					</head>
					<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
						<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
							<h1 style="color: white; margin: 0; font-size: 28px;">Your AI Readiness Report</h1>
						</div>
						<div style="background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px;">
							<p style="font-size: 16px; margin-bottom: 20px;">
								Thank you for completing the AI & Automation Readiness Audit!
							</p>
							<p style="font-size: 16px; margin-bottom: 20px;">
								Your personalized report is attached to this email. This comprehensive analysis includes:
							</p>
							<ul style="font-size: 16px; margin-bottom: 20px; padding-left: 20px;">
								<li>Your AI Readiness Score: <strong>${scores.totalScore}/100</strong></li>
								<li>Industry-specific AI landscape analysis</li>
								<li>Key AI opportunities tailored to your business</li>
								<li>Quick wins you can implement in 0-3 months</li>
								<li>Long-term strategic projects for 3-12 months</li>
							</ul>
							<p style="font-size: 16px; margin-bottom: 20px;">
								We're here to help you on your AI transformation journey. If you'd like to discuss your results or explore how NovaShift can help implement these recommendations, feel free to reach out.
							</p>
							<div style="text-align: center; margin-top: 30px;">
								<a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://novashift.ai'}/contact-us" style="display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600;">
									Book a Free Strategy Session
								</a>
							</div>
							<p style="font-size: 14px; color: #6b7280; margin-top: 30px; border-top: 1px solid #e5e7eb; padding-top: 20px;">
								Best regards,<br>
								<strong>The NovaShift Team</strong>
							</p>
						</div>
					</body>
				</html>
			`,
			attachments: [
				{
					filename: `ai-readiness-report-${Date.now()}.pdf`,
					content: buffer,
				},
			],
		})

		if (error) {
			console.error("📧 [SEND EMAIL] Resend error:", error)
			return {
				success: false,
				error: error.message || "Failed to send email",
			}
		}

		console.log("📧 [SEND EMAIL] Email sent successfully:", data)

		return {
			success: true,
			messageId: data?.id,
		}
	} catch (error) {
		console.error("📧 [SEND EMAIL] Error:", error)
		return {
			success: false,
			error:
				error instanceof Error
					? error.message
					: "Failed to send email",
		}
	}
}




