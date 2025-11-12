import { TypographyH4 } from "@/components/ui/typography"
import type { CaseAccordionProps } from "@/types/case-studies.type"
import CaseAccordion from "../_components/case-accordion"

const data: CaseAccordionProps = {
	accordionData: [
		{
			id: "01",
			title: "The Challenge",
			text: "A development team needed to automate their entire software workflow—from task creation in Asana to code implementation in GitHub. Their goal was to build an AI assistant capable of converting project tasks into working code, managing PR feedback, and coordinating complex development operations with minimal manual input. The system needed to be secure, scalable, and reliable enough to support multiple concurrent projects without disruption.",
		},
		{
			id: "02",
			title: "Our Solution",
			text: "We built a full AI-powered development automation platform integrating Claude AI, Asana, and GitHub. The system featured a central orchestrator that managed workflow logic and multiple specialized services for project management, repository handling, and code generation. Each task ran in isolated AI-managed workspaces to ensure security and stability. Deployed with Docker and fortified with webhook verification and non-root execution, the platform delivered seamless automation—from task creation to pull request submission—with real-time feedback and error handling.",
		},
		{
			id: "03",
			title: "Results",
			text: "The client received a production-ready system that streamlined every step of their development workflow. It eliminated manual coordination, reduced delivery times, and provided a secure foundation for large-scale automation. With Claude AI orchestrating code generation and workflow management, the platform gave developers an intelligent system that handled complex operations with precision and reliability.",
		},
		{
			id: "04",
			title: "Why Our Approach Works",
			text: "Autobot showcases how advanced AI can enhance real-world engineering operations. By combining technical depth with thoughtful automation design, we created a platform that scales efficiently while maintaining security and control. Our structured, modular approach empowers development teams to move faster, collaborate more effectively, and rely on AI as a true extension of their workflow.",
		},
	],
	imageUrl: "/images/cases/accordion-3.png",
	imageClass: "aspect-square",
	reverse: true,
}

export default function DevelopmentAutomationSection() {
	return (
		<section className='py-12 md:py-20' id='ai-automation'>
			<div className='container'>
				<div className='flex flex-col gap-8 items-center text-center md:grid md:grid-cols-2 md:gap-4 md:text-left md:items-start'>
					<TypographyH4 className='md:text-4xl md:leading-[1.4]'>
						Autobot – AI-Powered Development Automation Platform
					</TypographyH4>
					<p className='text-neutral-900 text-xl tracking-[0.2px]'>
						<b className='text-neutral-black'>How we built</b>: a scalable
						system to generate high-quality marketing videos with minimal human
						input.
					</p>
				</div>

				<div className='mt-12 md:mt-[60px]'>
					<CaseAccordion
						accordionData={data.accordionData}
						imageUrl={data.imageUrl}
						imageClass={data.imageClass}
						reverse={data.reverse}
					/>
				</div>
			</div>
		</section>
	)
}
