import Image from "next/image"
import Link from "next/link"
import ButtonIcon from "@/components/ui/button-icon"
import { TypographyH3 } from "@/components/ui/typography"
import { ROUTES } from "@/config/routes"

export default function PlanningSection() {
	return (
		<section className='pt-10 pb-20 md:py-[100px] bg-[#0D63EC]'>
			<div className='container max-w-[1000px]'>
				<TypographyH3 className='text-white text-center'>
					AI Solution Design & Planning
				</TypographyH3>
				<p className='text-blue-800 text-xl font-bold text-center tracking-[0.2px] mt-2.5'>
					Already have something in mind? Let's shape it.
				</p>
				<p className='text-white text-center text-xl font-medium tracking-[0.2px] mt-8'>
					For businesses that already have a solution or direction in mind. We
					help validate, shape, and scope your idea—ensuring it’s technically
					feasible, strategically sound, and ready for implementation. You’ll
					walk away with a clear plan, roadmap, and budget.
				</p>

				<ul className='mt-8 grid gap-4 md:grid-cols-2'>
					<li className='flex items-start gap-2.5'>
						<Image
							src={"/images/icons/check-line.svg"}
							width={20}
							height={20}
							alt='check icon'
						/>
						<p className='text-white'>
							<b>Scope</b>: Targeted engagements focused on a defined use case
							or solution area.
						</p>
					</li>
					<li className='flex items-start gap-2.5'>
						<Image
							src={"/images/icons/check-line.svg"}
							width={20}
							height={20}
							alt='check icon'
						/>
						<p className='text-white'>
							<b>Activities</b>: Discovery calls, deep-dive sessions, solution
							validation, technical planning, and cross-team workshops.
						</p>
					</li>
					<li className='flex items-start gap-2.5'>
						<Image
							src={"/images/icons/check-line.svg"}
							width={20}
							height={20}
							alt='check icon'
						/>
						<p className='text-white'>
							<b>What you receive</b>: TA clear solution brief with roadmap,
							cost estimate, feasibility analysis, and implementation plan.
						</p>
					</li>
					<li className='flex items-start gap-2.5'>
						<Image
							src={"/images/icons/check-line.svg"}
							width={20}
							height={20}
							alt='check icon'
						/>
						<p className='text-white'>
							<b>Time & effort</b>: Typically 1–3 weeks depending on project
							size and scope.
						</p>
					</li>
				</ul>

				<Link
					href={ROUTES.CONTACT_US}
					className='btn btn-md btn-primary-dark with-icon mt-8 mx-auto'
				>
					Schedule a Scoping Call
					<ButtonIcon iconColor='#1F2937' />
				</Link>
			</div>
		</section>
	)
}
