import type { Category } from "@/config/post-categories"

export type BlogPost = {
	id: string
	title: string
	text: string
	category: Category
	imageUrl: string
}
