"use client"

import { usePathname } from "next/navigation"
import Footer from "@/components/footer"

export default function ConditionalFooter() {
	const pathname = usePathname()
	const isAuditPage = pathname?.includes("/audit")

	if (isAuditPage) {
		return null
	}

	return <Footer />
}




