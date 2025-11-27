import { config as dotenvConfig } from "dotenv"
import { resolve } from "path"

// Load environment variables FIRST, before any other imports
dotenvConfig({ path: resolve(process.cwd(), ".env.local") })

// Verify it loaded
console.log("PAYLOAD_SECRET loaded:", !!process.env.PAYLOAD_SECRET)
console.log("DATABASE_URL loaded:", !!process.env.DATABASE_URL)

import { getPayload } from "payload"
import config from "@payload-config"
import blogData from "@/public/get-blog.json"

/**
 * Migration script to import existing blog posts from JSON into Payload CMS
 * Run this script once after setting up Payload CMS with: npm run payload migrate
 * Then run: tsx scripts/migrate-blog-data.ts
 */

async function migrateBlogData() {
	console.log("\nStarting blog data migration...")
	console.log(
		"⚠️  Note: This will import data into your existing Payload CMS database.",
	)
	console.log('⚠️  Make sure you have run "npm run payload migrate" first!\n')

	try {
		const payload = await getPayload({ config })

		// 1. Migrate Authors
		console.log("\n📝 Migrating authors...")
		const authorIdMap = new Map<string, string>()

		for (const author of blogData.authors) {
			const created = await payload.create({
				collection: "authors",
				data: {
					name: author.name,
					email: author.email,
					username: author.username,
					avatar: author.avatar,
					bio: author.bio,
					role: author.role,
					social: author.social,
					postsCount: author.postsCount,
					joinedAt: author.joinedAt,
				},
			})
			authorIdMap.set(author.id, String(created.id))
			console.log(`✓ Migrated author: ${author.name}`)
		}

		// 2. Migrate Categories
		console.log("\n📁 Migrating categories...")
		const categoryIdMap = new Map<string, string>()

		for (const category of blogData.categories) {
			const created = await payload.create({
				collection: "categories",
				data: {
					name: category.name,
					slug: category.slug,
					description: category.description,
					postsCount: category.postsCount,
				},
			})
			categoryIdMap.set(category.id, String(created.id))
			console.log(`✓ Migrated category: ${category.name}`)
		}

		// 3. Migrate Tags
		console.log("\n🏷️  Migrating tags...")
		const tagIdMap = new Map<string, string>()

		for (const tag of blogData.tags) {
			const created = await payload.create({
				collection: "tags",
				data: {
					name: tag.name,
					slug: tag.slug,
					postsCount: tag.postsCount,
				},
			})
			tagIdMap.set(tag.id, String(created.id))
			console.log(`✓ Migrated tag: ${tag.name}`)
		}

		// 4. Migrate Posts
		console.log("\n📰 Migrating posts...")

		for (const post of blogData.posts) {
			// Map category IDs
			const categoryIds = post.categories
				.map((cat) => {
					const id = categoryIdMap.get(cat.id)
					return id ? Number(id) : undefined
				})
				.filter(Boolean) as number[]

			// Map tag IDs
			const tagIds = post.tags
				.map((tag) => {
					const id = tagIdMap.get(tag.id)
					return id ? Number(id) : undefined
				})
				.filter(Boolean) as number[]

			// Map author ID
			const authorIdString = authorIdMap.get(post.author.id)
			const authorId = authorIdString ? Number(authorIdString) : undefined

			if (!authorId) {
				console.error(`✗ Skipping post "${post.title}": Author not found`)
				continue
			}

			// Convert keywords array to proper format
			const keywords = post.seo.keywords.map((keyword) => ({ keyword }))

			const created = await payload.create({
				collection: "posts",
				data: {
					title: post.title,
					slug: post.slug,
					excerpt: post.excerpt,
					content: {
						root: {
							type: "root",
							version: 1,
							direction: "ltr",
							format: "",
							indent: 0,
							children: [
								{
									type: "paragraph",
									version: 1,
									children: [
										{
											type: "text",
											text: post.content,
											version: 1,
										},
									],
								},
							],
						},
					},
					featuredImage: post.featuredImage,
					author: authorId,
					categories: categoryIds,
					tags: tagIds,
					status: post.status as "draft" | "published",
					publishedAt: post.publishedAt,
					views: post.views,
					likes: post.likes,
					commentsCount: post.commentsCount,
					readTime: post.readTime,
					seo: {
						metaTitle: post.seo.metaTitle,
						metaDescription: post.seo.metaDescription,
						keywords: keywords,
					},
				},
			})
			console.log(`✓ Migrated post: ${post.title}`)
		}

		console.log("\n✅ Migration completed successfully!")
		console.log(`\nMigrated:`)
		console.log(`  - ${blogData.authors.length} authors`)
		console.log(`  - ${blogData.categories.length} categories`)
		console.log(`  - ${blogData.tags.length} tags`)
		console.log(`  - ${blogData.posts.length} posts`)
	} catch (error) {
		console.error("❌ Migration failed:", error)
		throw error
	}
}

// Run the migration
migrateBlogData()
	.then(() => {
		console.log("\n🎉 Done!")
		process.exit(0)
	})
	.catch((error) => {
		console.error("Migration error:", error)
		process.exit(1)
	})
