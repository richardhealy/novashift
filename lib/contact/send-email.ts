import { Resend } from "resend"

export type ContactEmailData = {
	full_name: string
	email: string
	company_name: string
	website_url?: string
	message: string
}

export async function sendContactEmail(
	data: ContactEmailData,
): Promise<{ success: boolean; error?: string; messageId?: string }> {
	try {
		const apiKey = process.env.RESEND_API_KEY
		if (!apiKey) {
			console.error("📧 [CONTACT EMAIL] RESEND_API_KEY is not set")
			return {
				success: false,
				error: "Email service is not configured",
			}
		}

		const resend = new Resend(apiKey)

		const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev"
		const fromName = process.env.RESEND_FROM_NAME || "NovaShift"
		const toEmail = process.env.CONTACT_TO_EMAIL || "hello@novashift.ai"

		console.log("📧 [CONTACT EMAIL] Sending contact inquiry from:", data.email)

		const { data: result, error } = await resend.emails.send({
			from: `${fromName} <${fromEmail}>`,
			to: [toEmail],
			replyTo: data.email,
			subject: `New Inquiry from ${data.full_name} — ${data.company_name}`,
			html: `
				<!DOCTYPE html>
				<html>
					<head>
						<meta charset="utf-8">
						<meta name="viewport" content="width=device-width, initial-scale=1.0">
					</head>
					<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
						<div style="background: linear-gradient(135deg, #0f172a 0%, #084099 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
							<h1 style="color: white; margin: 0; font-size: 24px;">New Contact Inquiry</h1>
						</div>
						<div style="background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px;">
							<table style="width: 100%; border-collapse: collapse;">
								<tr>
									<td style="padding: 8px 0; font-weight: 600; width: 140px; color: #6b7280;">Name</td>
									<td style="padding: 8px 0;">${data.full_name}</td>
								</tr>
								<tr>
									<td style="padding: 8px 0; font-weight: 600; color: #6b7280;">Email</td>
									<td style="padding: 8px 0;"><a href="mailto:${data.email}" style="color: #0c59d3;">${data.email}</a></td>
								</tr>
								<tr>
									<td style="padding: 8px 0; font-weight: 600; color: #6b7280;">Company</td>
									<td style="padding: 8px 0;">${data.company_name}</td>
								</tr>
								${
									data.website_url
										? `<tr>
									<td style="padding: 8px 0; font-weight: 600; color: #6b7280;">Website</td>
									<td style="padding: 8px 0;"><a href="${data.website_url}" style="color: #0c59d3;">${data.website_url}</a></td>
								</tr>`
										: ""
								}
							</table>
							<div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid #e5e7eb;">
								<p style="font-weight: 600; color: #6b7280; margin-bottom: 8px;">Message</p>
								<p style="white-space: pre-wrap; margin: 0;">${data.message}</p>
							</div>
							<p style="font-size: 14px; color: #6b7280; margin-top: 30px; border-top: 1px solid #e5e7eb; padding-top: 20px;">
								Reply directly to this email to respond to ${data.full_name}.
							</p>
						</div>
					</body>
				</html>
			`,
		})

		if (error) {
			console.error("📧 [CONTACT EMAIL] Resend error:", error)
			return {
				success: false,
				error: error.message || "Failed to send email",
			}
		}

		console.log("📧 [CONTACT EMAIL] Sent successfully:", result)
		return {
			success: true,
			messageId: result?.id,
		}
	} catch (error) {
		console.error("📧 [CONTACT EMAIL] Error:", error)
		return {
			success: false,
			error: error instanceof Error ? error.message : "Failed to send email",
		}
	}
}
