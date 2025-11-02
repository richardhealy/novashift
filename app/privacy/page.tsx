import Cta from "@/components/cta"
import ScrollableMenu from "./_components/scrollable-menu"

export default function PrivacyPage() {
	return (
		<>
			<div className='h-[400px] w-full bg-neutral-900 text-white text-center text-2xl flex items-center justify-center'>
				HERO
			</div>
			<ScrollableMenu />
			<Cta
				title='Prefer to skip the form and book time directly?'
				firstBtnText='Get Free Consultation'
			/>
		</>
	)
}
