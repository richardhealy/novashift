import fs from "fs/promises"
import path from "path"
import type { BlogData } from "@/types/blog"

export async function getBlogData(): Promise<BlogData> {
	try {
		// JSON лежит в /public/get-blog.json
		const filePath = path.join(process.cwd(), "public", "get-blog.json")
		const fileContents = await fs.readFile(filePath, "utf-8")
		return JSON.parse(fileContents)
	} catch (error) {
		console.error("Error reading blog data:", error)
		throw new Error("Failed to load blog data.")
	}
}
