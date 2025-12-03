"use client"

import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"

interface AuditIntroProps {
	onBegin: () => void
}

export default function AuditIntro({ onBegin }: AuditIntroProps) {
	const t = useTranslations("AuditPage.hero")

	return (
		<section className='container py-16 md:py-24 min-h-[60vh] flex items-center justify-center'>
			<div className='max-w-3xl mx-auto text-center'>
				<h1 className='text-4xl md:text-5xl font-bold text-neutral-900 mb-6'>
					{t("title")}
				</h1>
				<p className='text-lg text-neutral-700 mb-8'>{t("description")}</p>
				<div className='flex justify-center'>
					<Button onClick={onBegin} size='lg' withIcon>
						{t("beginButton")}
					</Button>
				</div>
			</div>
		</section>
	)
}

