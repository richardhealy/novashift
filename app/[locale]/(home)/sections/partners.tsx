"use client"
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import Image from "next/image"
import { Autoplay } from "swiper/modules"
import { useTranslations } from "next-intl"
import { TypographyH5 } from "@/components/ui/typography"
import useMediaQuery from "@/hooks/useMediaQuery"

interface LogoSlide {
	id: string
	src: string
	alt: string
}

const slides: LogoSlide[] = [
	{
		id: "agasdgasgd",
		src: "/images/home/partner-logo-1.svg",
		alt: "partner logo",
	},
	{
		id: "asdgasdehrgadg",
		src: "/images/home/partner-logo-2.svg",
		alt: "partner logo",
	},
	{
		id: "b4rthn4rnt",
		src: "/images/home/partner-logo-3.svg",
		alt: "partner logo",
	},
	{
		id: "asdgasdhagnn",
		src: "/images/home/partner-logo-4.svg",
		alt: "partner logo",
	},
	{
		id: "agas23dgasgd",
		src: "/images/home/partner-logo-1.svg",
		alt: "partner logo",
	},
	{
		id: "asdgasderdehrgadg",
		src: "/images/home/partner-logo-2.svg",
		alt: "partner logo",
	},
	{
		id: "b4rthn364rnt",
		src: "/images/home/partner-logo-3.svg",
		alt: "partner logo",
	},
	{
		id: "asdgasdfghhagnn",
		src: "/images/home/partner-logo-4.svg",
		alt: "partner logo",
	},
]

export default function PartnersSection() {
	const isDesktop = useMediaQuery("(min-width: 768px)")
	const t = useTranslations("HomePage.partners")
	return (
		<section className='py-12 bg-[#0F172A] relative z-0 after:absolute after:bg-linear-(--swiper-left-gradient) after:w-[355px] after:h-[185px] after:left-0 after:bottom-0 after:z-10 before:absolute before:bg-linear-(--swiper-right-gradient) before:w-[355px] before:h-[185px] before:right-0 before:bottom-0 before:z-10 after:hidden md:after:block before:hidden md:before:block'>
			<div className='relative'>
				<TypographyH5 className='text-blue-100 lg:text-xl font-medium xl:text-xl text-center'>
					{t("title")}
				</TypographyH5>
				<div className='mt-2.5 md:mt-6 relative '>
					{isDesktop ? (
						<Swiper
							className='ease-linear! partners-swiper'
							modules={[Autoplay]}
							loop={true}
							speed={3000}
							spaceBetween={120}
							autoplay={{
								delay: 0,

								disableOnInteraction: false,
							}}
							breakpoints={{
								768: {
									slidesPerView: 3,
								},
								992: {
									slidesPerView: 4,
								},
								1336: {
									slidesPerView: 5,
								},
								1548: {
									slidesPerView: 7,
								},
							}}
						>
							{slides.map((slide) => (
								<SwiperSlide key={slide.id}>
									<div className='flex items-center justify-center h-[50px] py-14'>
										<Image
											className='w-auto h-auto md:w-full object-cover'
											src={slide.src}
											alt={slide.alt}
											width={200}
											height={35}
										/>
									</div>
								</SwiperSlide>
							))}
						</Swiper>
					) : (
						<div className='flex items-center flex-wrap justify-center'>
							{slides.slice(0, 4).map((slide) => (
								<div className='px-3 py-[20px] md:p-[30px]' key={slide.id}>
									<Image
										className='w-auto md:w-full object-cover'
										src={slide.src}
										alt={slide.alt}
										width={200}
										height={35}
									/>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</section>
	)
}
