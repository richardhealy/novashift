import { TypographyH1 } from "@/components/ui/typography"
import ContactForm from "../_components/contact-form"

export default function ContactsSection() {
	return (
		<section className='pb-11 pt-[105px] md:pb-20 md:pt-[65px]'>
			<div className='container'>
				<div className='flex flex-col gap-14 md:flex-row md:justify-between'>
					<div className='flex flex-col gap-8 items-center text-center md:max-w-[300px] md:text-left md:items-start lg:max-w-[610px]'>
						<TypographyH1 className='leading-[1.4]'>
							Let's Build the Future of Your Business With AI
						</TypographyH1>
						<p className='text-xl font-medium leading-normal tracking-[0.2px]'>
							We're here to help you explore, build, and scale with AI.
						</p>
						<p className='text-xl font-medium leading-normal tracking-[0.2px]'>
							We help startups, agencies, and lean businesses build practical,
							scalable AI—from strategy to custom development. Have a project or
							idea? Let’s talk.
						</p>
					</div>
					<div className='md:max-w-[500px] md:w-full'>
						<ContactForm />
					</div>
				</div>
			</div>
		</section>
	)
}
