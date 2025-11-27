interface ButtonIconProps {
	iconColor: string | undefined
}

export default function ButtonIcon({ iconColor = "white" }: ButtonIconProps) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='20'
			height='20'
			viewBox='0 0 20 20'
			fill='none'
			className='rtl:scale-x-[-1]'
		>
			<title>Button Icon</title>
			<path
				d='M5.33317 15.0001L4.1665 13.8334L12.1665 5.83341H4.99984V4.16675L14.9998 4.16675V14.1667H13.3332V7.00008L5.33317 15.0001Z'
				fill={iconColor}
			/>
		</svg>
	)
}
