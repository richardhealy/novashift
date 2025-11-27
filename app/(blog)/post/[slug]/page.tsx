import { notFound } from "next/navigation"
import { Suspense } from "react"
import type { Metadata } from "next"
import { getAllPosts, getPostBySlug } from "@/actions/blog"
import Cta from "@/components/cta"
import Loader from "@/components/loader"
import PostItem from "@/components/post-item"
import MorePostsSection from "./sections/more-posts"

// Revalidate every hour (3600 seconds)
export const revalidate = 3600

// Generate static params for all blog posts at build time
export async function generateStaticParams() {
	const posts = await getAllPosts()

	return posts.map((post) => ({
		slug: post.slug,
	}))
}

// Generate dynamic metadata for SEO
export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>
}): Promise<Metadata> {
	const { slug } = await params
	const post = await getPostBySlug(slug)

	if (!post) {
		return {
			title: "Post Not Found",
		}
	}

	return {
		title: post.seo.metaTitle || post.title,
		description: post.seo.metaDescription || post.excerpt,
		keywords: post.seo.keywords,
		openGraph: {
			title: post.seo.metaTitle || post.title,
			description: post.seo.metaDescription || post.excerpt,
			images: [
				{
					url: post.featuredImage.url,
					width: post.featuredImage.width,
					height: post.featuredImage.height,
					alt: post.featuredImage.alt,
				},
			],
			type: "article",
			publishedTime: post.publishedAt || undefined,
			authors: [post.author.name],
		},
		twitter: {
			card: "summary_large_image",
			title: post.seo.metaTitle || post.title,
			description: post.seo.metaDescription || post.excerpt,
			images: [post.featuredImage.url],
		},
	}
}

export default async function PostPage({
	params,
}: {
	params: Promise<{ slug: string }>
}) {
	const { slug } = await params
	const posts = await getAllPosts()
	const post = await getPostBySlug(slug)

	if (!post) notFound()

	return (
		<>
			<Suspense fallback={<Loader />}>
				<PostItem post={post} />
				<MorePostsSection posts={posts} />
			</Suspense>
			<Cta title='Interested in a chat?' firstBtnText='Book A Call' />
		</>
	)
}
