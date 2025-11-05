import type { BlogData } from "@/types/blog"

const DATA_URL = "http://localhost:3000/get-blog.json"

export async function getBlogData(): Promise<BlogData> {
	const response = await fetch(DATA_URL, { cache: "force-cache" })
	if (!response.ok) {
		throw new Error(`Failed to fetch blog data: ${response.statusText}`)
	}
	return response.json() as Promise<BlogData>
}
