"use client"
import { useTranslations } from "next-intl"
import Cta from "@/components/cta"
import ContactsSection from "./sections/contacts"

export default function ContactUsPage() {
	const t = useTranslations("ContactPage.cta")
	return (
		<>
			<ContactsSection />
			<Cta title={t("title")} firstBtnText={t("button")} />
		</>
	)
}
