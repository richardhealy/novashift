"use client"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/routing"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import ButtonIcon from "@/components/ui/button-icon"
import { TypographyH3, TypographyH6 } from "@/components/ui/typography"
import { ROUTES } from "@/config/routes"
import { cn } from "@/lib/utils"

export default function OfferSection() {
	const t = useTranslations("AIStrategyPage.offer")
	const [isExpandedFree, setIsExpandedFree] = useState(false)
	const [isExpandedPaid, setIsExpandedPaid] = useState(false)
	return (
		<section className='py-20 md:py-[100px]' id='offer-section'>
			<div className='container'>
				<div className='grid md:grid-cols-2 gap-8 md:gap-10 lg:gap-20'>
					<div className='space-y-4'>
						<TypographyH3>{t("title")}</TypographyH3>
						<p className='font-bold text-blue-500 text-xl tracking-[0.2px]'>
							{t("subtitle")}
						</p>
					</div>
					<p className='font-medium text-xl tracking-[0.2px]'>
						{t("description")}
					</p>
				</div>

				<div className='grid md:grid-cols-2 gap-6 mt-[60px] items-start'>
					<div className='rounded-2xl border border-neutral-500 bg-linear-(--home-service-card-gradient) p-6  overflow-hidden relative'>
						{/* Badge */}
						<div className='py-[11px] px-5 font-bold text-blue-800 leading-[1.6] tracking-[0.16px] bg-blue-100 rounded-full max-w-fit ml-auto rtl:mr-auto rtl:ml-0'>
							{t("free.badge")}
						</div>

						<div className='grid -mt-14 md:-mt-12 z-0'>
							<Image
								className='max-w-[230px] block mx-auto md:max-w-[377px] md:h-[409px] xl:max-w-[477px] xl:h-[509px] md:absolute md:right-[-230px] rtl:md:left-[-230px] rtl:md:right-[unset] md:top-20 xl:top-0 md:-z-10 rtl:scale-x-[-1]'
								src={"/images/ai-strategy/strategy-1.png"}
								alt='strategy image'
								width={464}
								height={488}
							/>

							<div className='md:max-w-[75%] xl:max-w-[350px]'>
								<div className='mt-4 md:mt-0'>
									<TypographyH6 className='text-2xl text-balance'>
										{t("free.title")}
									</TypographyH6>
									<p className='text-sm text-blue-500 font-semibold tracking-[0.14px] mt-1'>
										{t("free.subtitle")}
									</p>
									<p className='mt-4'>
										{t("free.description")}
									</p>
								</div>

								<div
									className={cn(
										"grid grid-rows-[0fr] transition-all duration-500 ",
										isExpandedFree && "grid-rows-[1fr]",
									)}
								>
									<div className='overflow-hidden'>
										<ul className='mt-6 pl-2.5 rtl:pr-2.5 rtl:pl-0 pb-6'>
											<li className='relative pl-[13px] rtl:pr-[13px] rtl:pl-0 not-last:mb-4 before:absolute before:top-2.5 before:left-0 rtl:before:right-0 rtl:before:left-auto before:size-1 before:rounded-full before:bg-neutral-900'>
												<b className='text-neutral-900'>{t("free.scope")}:</b> {t("free.scopeText")}
											</li>
											<li className='relative pl-[13px] rtl:pr-[13px] rtl:pl-0 not-last:mb-4 before:absolute before:top-2.5 before:left-0 rtl:before:right-0 rtl:before:left-auto before:size-1 before:rounded-full before:bg-neutral-900'>
												<b className='text-neutral-900'>{t("free.activities")}:</b> {t("free.activitiesText")}
											</li>
											<li className='relative pl-[13px] rtl:pr-[13px] rtl:pl-0 not-last:mb-4 before:absolute before:top-2.5 before:left-0 rtl:before:right-0 rtl:before:left-auto before:size-1 before:rounded-full before:bg-neutral-900'>
												<b className='text-neutral-900'>{t("free.whatYouReceive")}:</b> {t("free.whatYouReceiveText")}
											</li>
											<li className='relative pl-[13px] rtl:pr-[13px] rtl:pl-0 not-last:mb-4 before:absolute before:top-2.5 before:left-0 rtl:before:right-0 rtl:before:left-auto before:size-1 before:rounded-full before:bg-neutral-900'>
												<b className='text-neutral-900'>{t("free.timeEffort")}:</b> {t("free.timeEffortText")}
											</li>
											<li className='relative pl-[13px] rtl:pr-[13px] rtl:pl-0 not-last:mb-4 before:absolute before:top-2.5 before:left-0 rtl:before:right-0 rtl:before:left-auto before:size-1 before:rounded-full before:bg-neutral-900'>
												<b className='text-neutral-900'>{t("free.outcome")}:</b> {t("free.outcomeText")}
											</li>
										</ul>
									</div>
								</div>

								<div className='flex items-center gap-4 mt-4 md:mt-6'>
									<Link
										href={ROUTES.CONTACT_US}
										className='btn btn-md btn-secondary !px-2.5 rtl:!px-2 with-icon icon-sm text-sm pl-6 rtl:pr-8 rtl:pl-0'
									>
										{t("free.button")}
										<ButtonIcon iconColor='#1F2937' />
									</Link>
									<Button
										variant={"outline-dark"}
										className='text-sm px-6'
										onClick={() => setIsExpandedFree(!isExpandedFree)}
									>
										{isExpandedFree ? t("free.readLess") : t("free.readMore")}
									</Button>
								</div>
							</div>
						</div>
					</div>
					<div className='rounded-2xl border border-neutral-500 bg-linear-(--home-service-card-gradient) p-6  overflow-hidden relative'>
						{/* Badge */}
						<div className='py-[11px] px-5 font-bold text-blue-800 leading-[1.6] tracking-[0.16px] bg-blue-100 rounded-full max-w-fit ml-auto rtl:mr-auto rtl:ml-0'>
							{t("paid.badge")}
						</div>

						<div className='grid -mt-7 md:-mt-12 z-0'>
							<Image
								className='max-w-[212px] block mx-auto md:max-w-[464px] md:h-[488px] md:absolute md:right-[-306px] rtl:md:left-[-306px] rtl:md:right-[unset] xl:right-[-206px] rtl:xl:left-[-206px] rtl:xl:right-[unset] md:top-[100px] md:-z-10 rtl:scale-x-[-1]'
								src={"/images/ai-strategy/strategy-2.png"}
								alt='strategy image'
								width={464}
								height={488}
							/>

							<div className='md:max-w-[75%] xl:max-w-[360px]'>
								<div className='mt-4 md:mt-0'>
									<TypographyH6 className='text-2xl text-balance'>
										{t("paid.title")}
									</TypographyH6>
									<p className='text-sm text-blue-500 font-semibold tracking-[0.14px] mt-1'>
										{t("paid.subtitle")}
									</p>
									<p className='mt-4'>
										{t("paid.description")}
									</p>
								</div>

								<div
									className={cn(
										"grid grid-rows-[0fr] transition-all duration-500 ",
										isExpandedPaid && "grid-rows-[1fr]",
									)}
								>
									<div className='overflow-hidden'>
										<ul className='mt-6 pl-2.5 rtl:pr-2.5 rtl:pl-0 pb-6'>
											<li className='relative pl-[13px] rtl:pr-[13px] rtl:pl-0 not-last:mb-4 before:absolute before:top-2.5 before:left-0 rtl:before:right-0 rtl:before:left-auto before:size-1 before:rounded-full before:bg-neutral-900'>
												<b className='text-neutral-900'>{t("paid.scope")}:</b> {t("paid.scopeText")}
											</li>
											<li className='relative pl-[13px] rtl:pr-[13px] rtl:pl-0 not-last:mb-4 before:absolute before:top-2.5 before:left-0 rtl:before:right-0 rtl:before:left-auto before:size-1 before:rounded-full before:bg-neutral-900'>
												<b className='text-neutral-900'>{t("paid.activities")}:</b> {t("paid.activitiesText")}
											</li>
											<li className='relative pl-[13px] rtl:pr-[13px] rtl:pl-0 not-last:mb-4 before:absolute before:top-2.5 before:left-0 rtl:before:right-0 rtl:before:left-auto before:size-1 before:rounded-full before:bg-neutral-900'>
												<b className='text-neutral-900'>{t("paid.whatYouReceive")}:</b> {t("paid.whatYouReceiveText")}
											</li>
											<li className='relative pl-[13px] rtl:pr-[13px] rtl:pl-0 not-last:mb-4 before:absolute before:top-2.5 before:left-0 rtl:before:right-0 rtl:before:left-auto before:size-1 before:rounded-full before:bg-neutral-900'>
												<b className='text-neutral-900'>{t("paid.timeEffort")}:</b> {t("paid.timeEffortText")}
											</li>
											<li className='relative pl-[13px] rtl:pr-[13px] rtl:pl-0 not-last:mb-4 before:absolute before:top-2.5 before:left-0 rtl:before:right-0 rtl:before:left-auto before:size-1 before:rounded-full before:bg-neutral-900'>
												<b className='text-neutral-900'>{t("paid.outcome")}:</b> {t("paid.outcomeText")}
											</li>
										</ul>
									</div>
								</div>

								<div className='flex items-center gap-4 mt-4 md:mt-6'>
									<Link
										href={ROUTES.CONTACT_US}
										className='btn btn-md btn-secondary !px-2.5 rtl:!px-2 with-icon icon-sm text-sm pl-6 rtl:pr-8 rtl:pl-0'
									>
										{t("paid.button")}
										<ButtonIcon iconColor='#1F2937' />
									</Link>
									<Button
										variant={"outline-dark"}
										className='text-sm px-6'
										onClick={() => setIsExpandedPaid(!isExpandedPaid)}
									>
										{isExpandedPaid ? t("paid.readLess") : t("paid.readMore")}
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
