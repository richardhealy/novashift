import { notFound } from "next/navigation"
import { Suspense } from "react"
import { getAllPosts, getPostById } from "@/actions/blog"
import Cta from "@/components/cta"
import Loader from "@/components/loader"
import PostItem from "@/components/post-item"
import MorePostsSection from "./sections/more-posts"

export default async function PostPage({
	params,
}: {
	params: Promise<{ id: string }>
}) {
	const { id } = await params
	const posts = await getAllPosts()
	const post = await getPostById(id)

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
