import { NextRequest, NextResponse } from "next/server"
import { renderToStream } from "@react-pdf/renderer"
import { PDFTemplate } from "@/lib/audit/pdf-template"

export async function POST(request: NextRequest) {
	try {
		const body = await request.json()
		const { reportData, scores } = body

		if (!reportData || !scores) {
			return NextResponse.json(
				{ error: "Missing reportData or scores" },
				{ status: 400 },
			)
		}

		// Generate PDF stream
		const pdfStream = await renderToStream(
			PDFTemplate({ reportData, scores }),
		)

		// Convert stream to buffer
		const chunks: Uint8Array[] = []
		for await (const chunk of pdfStream as any) {
			chunks.push(chunk)
		}
		const buffer = Buffer.concat(chunks)

		// Return PDF as response
		return new NextResponse(buffer, {
			headers: {
				"Content-Type": "application/pdf",
				"Content-Disposition": `attachment; filename="ai-readiness-report-${Date.now()}.pdf"`,
			},
		})
	} catch (error) {
		console.error("Error generating PDF:", error)
		return NextResponse.json(
			{
				error:
					error instanceof Error
						? error.message
						: "Failed to generate PDF",
			},
			{ status: 500 },
		)
	}
}




