"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import AuditIntro from "./audit-intro"
import AuditWizard from "./audit-wizard"

interface AuditPageClientProps {
	locale: string
}

export default function AuditPageClient({ locale }: AuditPageClientProps) {
	const router = useRouter()
	const searchParams = useSearchParams()
	const [hasStarted, setHasStarted] = useState(false)

	const handleBegin = () => {
		// Clear any step param from URL when starting
		const params = new URLSearchParams(searchParams.toString())
		params.delete("step")
		router.push(`/${locale}/audit?${params.toString()}`, { scroll: false })
		setHasStarted(true)
	}

	if (!hasStarted) {
		return <AuditIntro onBegin={handleBegin} />
	}

	return (
		<section className='container py-12 md:py-16'>
			<div className='max-w-4xl mx-auto'>
				<AuditWizard locale={locale} />
			</div>
		</section>
	)
}

