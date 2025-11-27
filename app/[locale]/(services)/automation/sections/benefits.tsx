import Image from "next/image"
import { getTranslations } from "next-intl/server"
import { TypographyH6 } from "@/components/ui/typography"

export default async function BenefitsSection() {
	const t = await getTranslations("AutomationPage.benefits")
	return (
		<section className='py-11 md:py-[100px]'>
			<div className='container'>
				<div className='grid md:grid-cols-2 gap-6'>
					<div className='rounded-2xl border border-neutral-500 bg-linear-(--home-service-card-gradient) p-6 lg:pb-11 pt-64 overflow-hidden relative lg:pt-6'>
						<div className='grid z-0'>
							<div className='size-[450px] absolute -top-28 right-[-153px] rtl:left-[-153px] rtl:right-[unset] after:absolute after:bg-linear-(--automation-service-card-gradient) after:w-full after:h-full after:inset-0 after:z-0 lg:after:hidden lg:top-[50px] lg:right-[-243px] rtl:lg:left-[-243px] rtl:lg:right-[unset] xl:right-[-153px] rtl:xl:left-[-153px] rtl:xl:right-[unset]'>
								<Image
									className='w-full h-full -z-10 rtl:scale-x-[-1]'
									src={"/images/automation/benefit-1.png"}
									alt='strategy image'
									width={450}
									height={450}
								/>
							</div>

							<div className='md:max-w-[320px] z-0'>
								<div className='mt-4 md:mt-0'>
									<TypographyH6 className='text-2xl text-balance'>
										{t("item1.title")}
									</TypographyH6>

									<p className='mt-4'>
										{t("item1.description1")}
									</p>
									<p className='mt-4'>
										{t("item1.description2")}
									</p>
								</div>
							</div>
						</div>
					</div>

					<div className='rounded-2xl border border-neutral-500 bg-linear-(--home-service-card-gradient) p-6 lg:pb-11 pt-[334px] md:pt-64 overflow-hidden relative lg:pt-6'>
						<div className='grid z-0'>
							<div className='w-[477px] h-[509px] absolute -top-16 -right-40 rtl:-left-40 rtl:right-[unset] after:absolute after:bg-linear-(--automation-service-card-gradient) after:w-full after:h-full after:inset-0 after:z-0 lg:after:hidden lg:right-[-290px] rtl:lg:left-[-290px] rtl:lg:right-[unset] lg:top-0 xl:-right-48 rtl:xl:-left-48 rtl:xl:right-[unset]'>
								<Image
									className='w-full h-full -z-10 rtl:scale-x-[-1]'
									src={"/images/automation/benefit-2.png"}
									alt='strategy image'
									width={477}
									height={509}
								/>
							</div>

							<div className='md:max-w-[320px] z-0'>
								<div className='mt-4 md:mt-0'>
									<TypographyH6 className='text-2xl text-balance'>
										{t("item2.title")}
									</TypographyH6>

									<p className='mt-4'>
										{t("item2.description1")}
									</p>
									<p className='mt-4'>
										{t("item2.description2")}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
