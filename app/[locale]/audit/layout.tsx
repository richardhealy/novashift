// Audit layout - footer is intentionally omitted
// This layout is nested within the [locale] layout, so we just render children
export default function AuditLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return <>{children}</>
}

