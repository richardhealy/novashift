import Breadcrumbs from "@/components/breadcrumbs"
import { TypographyH1 } from "@/components/ui/typography"
import { ROUTES } from "@/config/routes"
import type { BreadcrumbItem } from "@/types/breadcrumbs"

const TERMS_BREADCRUMBS_ITEMS: BreadcrumbItem[] = [
	{
		label: "Home",
		href: ROUTES.HOME,
		isCurrent: false,
	},
	{
		label: "Terms & Conditions",
		href: ROUTES.TERMS,
		isCurrent: true,
	},
]

export default function HeroSection() {
	return (
		<section className='bg-neutral-50 -mt-[70px] overflow-hidden md:mt-[-92px]'>
			<div className='container'>
				<div className='relative flex flex-col pt-[120px] pb-20 md:pb-[130px]'>
					<Breadcrumbs items={TERMS_BREADCRUMBS_ITEMS} />
					<div className='md:max-w-[580px] mt-[30px] mx-auto'>
						<TypographyH1 className='text-center leading-[1.4] md:leading-[1.2]!'>
							Terms & Conditions
						</TypographyH1>
						<p className='leading-normal text-neutral-700 mt-8 text-center text-xl font-medium tracking-[0.2px]'>
							Welcome to NovaShift, an AI Automation Platform designed to help
							individuals and businesses streamline workflows through artificial
							intelligence.
						</p>
					</div>
				</div>
			</div>
		</section>
	)
}
