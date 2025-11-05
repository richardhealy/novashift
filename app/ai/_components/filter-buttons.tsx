import { cn } from "@/lib/utils"
import type { Category } from "@/types/blog"

interface FilterButtonsProps {
	categories: Category[]
	selectedCategory: Category
	onCategoryChange: (category: Category) => void
}

export default function FilterButtons({
	categories,
	selectedCategory,
	onCategoryChange,
}: FilterButtonsProps) {
	return (
		<div className='grid grid-cols-2 md:flex md:flex-wrap md:justify-center'>
			{categories.map((category) => (
				<button
					key={category.id}
					type='button'
					onClick={() => onCategoryChange(category)}
					className={cn(
						"py-2.5 px-5 rounded-full text-neutral-800 transition-colors font-semibold hover:text-blue-800 hover:bg-blue-50 last:col-span-2",
						selectedCategory === category && "bg-blue-100 text-blue-800",
					)}
				>
					{category.name}
				</button>
			))}
		</div>
	)
}
