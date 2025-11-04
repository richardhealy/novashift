import Image from "next/image"
import { TypographyH5 } from "@/components/ui/typography"

interface ServiceItem {
	id: string
	imageUrl: string
	title: string
	text: string
	imageClasses: string
}

const serviceItems: ServiceItem[] = [
	{
		id: "string1",
		imageUrl: "/team/service-1.png",
		title: "MVPs That Validate and Scale",
		text: "Our rapid AI MVP development doesn't just prove concepts—it creates compelling, market-ready products that win customer enthusiasm and investor confidence. We architect with scalability built-in, using technologies that support seamless transitions from startup to scale-up.",
		imageClasses: "absolute -left-1.5 -top-5 -z-10 w-[387px] h-[397px]",
	},
	{
		id: "string2",
		imageUrl: "/team/service-2.png",
		title: "AI Enhancements That Transform Existing Systems",
		text: "Turn your current digital infrastructure into a competitive advantage with our targeted AI enhancements. We seamlessly integrate customer-converting chatbots, implement intelligence around your knowledge repository, and deploy machine learning pipelines that multiply team productivity without disrupting your operations.",
		imageClasses:
			"absolute -right-[60px] md:-right-[100px] -top-5 -z-10 w-[387px] h-[397px]",
	},
	{
		id: "string3",
		imageUrl: "/team/service-3.png",
		title: "APIs That Unlock AI-Powered Intelligence",
		text: "We build custom APIs around your data and tools, making them accessible to LLMs in powerful, secure, and flexible ways. This turns siloed systems into dynamic, AI-ready resources—enabling smarter decisions, richer experiences, and unexpected value across your business.",
		imageClasses:
			"absolute -right-[60px] md:-right-[100px] -top-5 -z-10 w-[387px] h-[397px]",
	},
	{
		id: "string4",
		imageUrl: "/team/service-4.png",
		title: "Chatbots and Virtual Assistants That Redefine Engagement",
		text: "Revolutionize how customers and employees interact with your business through natural language interfaces that seemed impossible just years ago. Our AI-powered conversational interfaces don't just answer questions—they solve problems, guide decisions, and create exceptional experiences that build trust and drive efficiency.",
		imageClasses:
			"absolute -right-3.5 md:-right-12 top-1.5 -z-10 w-[326px] h-[335px]",
	},
]

export default function ServicesSection() {
	return (
		<section className='py-10 md:py-[100px]'>
			<div className='container max-w-[1368px]'>
				<div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
					{serviceItems.map((item) => (
						<div
							key={item.id}
							className='relative flex flex-col overflow-hidden rounded-2xl border border-neutral-500 p-6 pt-[280px] pb-12 z-0'
						>
							<div className={item.imageClasses}>
								<Image
									src={item.imageUrl}
									alt={item.title}
									width={387}
									height={397}
								></Image>
							</div>

							<TypographyH5 className='text-xl! text-balance md:tracking-[0.24px] text-black'>
								{item.title}
							</TypographyH5>
							<p className='text-neutral-800 tracking-[0.16px] mt-2.5'>
								{item.text}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
