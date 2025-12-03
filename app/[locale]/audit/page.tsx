import type { Metadata } from "next"
import AuditPageClient from "./_components/audit-page-client"

export const metadata: Metadata = {
	title: "AI Readiness Audit — NovaShift",
	description:
		"Take our free AI & Automation Readiness Audit to discover how prepared your business is for AI adoption. Get a personalized report with actionable insights.",
	openGraph: {
		title: "AI Readiness Audit — NovaShift",
		description:
			"Take our free AI & Automation Readiness Audit to discover how prepared your business is for AI adoption.",
		images: ["/og-audit.jpg"],
	},
	alternates: {
		canonical: "https://novashift.vercel.app/audit",
	},
}

export default async function AuditPage({
	params,
}: {
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params

	return <AuditPageClient locale={locale} />
}

