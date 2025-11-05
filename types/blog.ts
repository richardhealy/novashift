export interface FeaturedImage {
	url: string
	alt: string
	width: number
	height: number
}

export interface Seo {
	metaTitle: string
	metaDescription: string
	keywords: string[]
}

export interface Category {
	id: string
	name: string
	slug: string
	description?: string
	postsCount?: number
}

export interface Tag {
	id: string
	name: string
	slug: string
	postsCount?: number
}

export interface Author {
	id: string
	name: string
	email: string
	username?: string
	avatar: string
	bio: string
	role?: string
	social?: {
		twitter?: string
		github?: string
		linkedin?: string
	}
	postsCount?: number
	joinedAt?: string
}

export interface Post {
	id: string
	title: string
	slug: string
	excerpt: string
	content: string
	featuredImage: FeaturedImage
	author: Pick<Author, "id" | "name" | "email" | "avatar" | "bio">
	categories: Category[]
	tags: Tag[]
	status: "published" | "draft"
	publishedAt?: string | null
	updatedAt: string
	createdAt: string
	views: number
	likes: number
	commentsCount: number
	readTime: number
	seo: Seo
}

export interface BlogData {
	posts: Post[]
	authors: Author[]
	categories: Category[]
	tags: Tag[]
}
