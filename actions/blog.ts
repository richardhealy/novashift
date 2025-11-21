"use server"

import { getPayload } from 'payload'
import { cache } from "react"
import config from '@payload-config'
import type { Author, Category, Post, Tag } from "@/types/blog"
import { getBlogData as getBlogDataFromJSON } from "@/lib/data"

const USE_PAYLOAD = process.env.DATABASE_URL && process.env.PAYLOAD_SECRET

const getPayloadClient = cache(async () => {
  if (!USE_PAYLOAD) {
    return null
  }
  try {
    return await getPayload({ config })
  } catch (error) {
    console.error('Failed to initialize Payload:', error)
    return null
  }
})

// Helper function to simulate delay (optional - can be removed for production)
const simulateDelay = () => new Promise((resolve) => setTimeout(resolve, 100))

// Helper to convert Lexical content to plain text
function lexicalToPlainText(content: any): string {
  if (!content || !content.root || !content.root.children) {
    return ''
  }
  
  const extractText = (node: any): string => {
    if (node.type === 'text') {
      return node.text || ''
    }
    if (node.children && Array.isArray(node.children)) {
      return node.children.map(extractText).join('')
    }
    return ''
  }
  
  return content.root.children.map(extractText).join('\n')
}

// Helper to transform Payload post to app Post type
function transformPost(payloadPost: any): Post {
  const author = payloadPost.author
  const content = lexicalToPlainText(payloadPost.content)
  
  return {
    id: String(payloadPost.id),
    title: payloadPost.title,
    slug: payloadPost.slug,
    excerpt: payloadPost.excerpt,
    content: content,
    featuredImage: payloadPost.featuredImage,
    author: {
      id: String(author.id),
      name: author.name,
      email: author.email,
      avatar: author.avatar,
      bio: author.bio,
    },
    categories: (payloadPost.categories || []).map((cat: any) => ({
      id: String(cat.id),
      name: cat.name,
      slug: cat.slug,
      description: cat.description,
      postsCount: cat.postsCount,
    })),
    tags: (payloadPost.tags || []).map((tag: any) => ({
      id: String(tag.id),
      name: tag.name,
      slug: tag.slug,
      postsCount: tag.postsCount,
    })),
    status: payloadPost.status,
    publishedAt: payloadPost.publishedAt,
    updatedAt: payloadPost.updatedAt,
    createdAt: payloadPost.createdAt,
    views: payloadPost.views || 0,
    likes: payloadPost.likes || 0,
    commentsCount: payloadPost.commentsCount || 0,
    readTime: payloadPost.readTime,
    seo: {
      metaTitle: payloadPost.seo?.metaTitle || payloadPost.title,
      metaDescription: payloadPost.seo?.metaDescription || payloadPost.excerpt,
      keywords: (payloadPost.seo?.keywords || []).map((k: any) => k.keyword),
    },
  }
}

// 1. Get all posts (filtered to published only by default)
export async function getAllPosts(
  publishedOnly: boolean = true,
): Promise<Post[]> {
  const payload = await getPayloadClient()
  await simulateDelay()
  
  // Fallback to JSON if Payload is not configured
  if (!payload) {
    const data = await getBlogDataFromJSON()
    return data.posts
      .filter((post) =>
        publishedOnly
          ? post.status === "published" && post.publishedAt !== null
          : true,
      )
      .sort(
        (a, b) =>
          new Date(b.publishedAt || b.updatedAt).getTime() -
          new Date(a.publishedAt || a.updatedAt).getTime(),
      )
  }
  
  const result = await payload.find({
    collection: 'posts',
    where: publishedOnly ? {
      status: {
        equals: 'published',
      },
      publishedAt: {
        exists: true,
      },
    } : undefined,
    sort: '-publishedAt',
    depth: 2,
    limit: 100,
  })
  
  return result.docs.map(transformPost)
}

// 2. Get a single post by ID
export async function getPostById(id: string): Promise<Post | null> {
  const payload = await getPayloadClient()
  await simulateDelay()
  
  // Fallback to JSON if Payload is not configured
  if (!payload) {
    const data = await getBlogDataFromJSON()
    return data.posts.find((post) => post.id === id) || null
  }
  
  try {
    const post = await payload.findByID({
      collection: 'posts',
      id,
      depth: 2,
    })
    
    return post ? transformPost(post) : null
  } catch (error) {
    return null
  }
}

// 3. Get post by slug
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const payload = await getPayloadClient()
  await simulateDelay()
  
  // Fallback to JSON
  if (!payload) {
    const data = await getBlogDataFromJSON()
    return data.posts.find((post) => post.slug === slug && post.status === "published") || null
  }
  
  const result = await payload.find({
    collection: 'posts',
    where: {
      slug: {
        equals: slug,
      },
      status: {
        equals: 'published',
      },
    },
    depth: 2,
    limit: 1,
  })
  
  return result.docs.length > 0 ? transformPost(result.docs[0]) : null
}

// 4. Get posts by author ID
export async function getPostsByAuthor(authorId: string): Promise<Post[]> {
  const payload = await getPayloadClient()
  await simulateDelay()
  
  // Fallback to JSON
  if (!payload) {
    const data = await getBlogDataFromJSON()
    return data.posts.filter(
      (post) => post.author.id === authorId && post.status === "published",
    )
  }
  
  const result = await payload.find({
    collection: 'posts',
    where: {
      author: {
        equals: authorId,
      },
      status: {
        equals: 'published',
      },
    },
    depth: 2,
    sort: '-publishedAt',
  })
  
  return result.docs.map(transformPost)
}

// 5. Get all authors
export async function getAllAuthors(): Promise<Author[]> {
  const payload = await getPayloadClient()
  await simulateDelay()
  
  // Fallback to JSON
  if (!payload) {
    const data = await getBlogDataFromJSON()
    return data.authors
  }
  
  const result = await payload.find({
    collection: 'authors',
    limit: 100,
  })
  
  return result.docs.map((author: any) => ({
    id: String(author.id),
    name: author.name,
    email: author.email,
    username: author.username || undefined,
    avatar: author.avatar,
    bio: author.bio,
    role: author.role || undefined,
    social: author.social ? {
      twitter: author.social.twitter || undefined,
      github: author.social.github || undefined,
      linkedin: author.social.linkedin || undefined,
    } : undefined,
    postsCount: author.postsCount || undefined,
    joinedAt: author.joinedAt || undefined,
  }))
}

// 6. Get author by ID
export async function getAuthorById(authorId: string): Promise<Author | null> {
  const payload = await getPayloadClient()
  await simulateDelay()
  
  // Fallback to JSON
  if (!payload) {
    const data = await getBlogDataFromJSON()
    return data.authors.find((author) => author.id === authorId) || null
  }
  
  try {
    const author = await payload.findByID({
      collection: 'authors',
      id: authorId,
    })
    
    return author ? {
      id: String(author.id),
      name: author.name,
      email: author.email,
      username: author.username || undefined,
      avatar: author.avatar,
      bio: author.bio,
      role: author.role || undefined,
      social: author.social ? {
        twitter: author.social.twitter || undefined,
        github: author.social.github || undefined,
        linkedin: author.social.linkedin || undefined,
      } : undefined,
      postsCount: author.postsCount || undefined,
      joinedAt: author.joinedAt || undefined,
    } : null
  } catch (error) {
    return null
  }
}

// 7. Get all categories
export async function getAllCategories(): Promise<Category[]> {
  const payload = await getPayloadClient()
  await simulateDelay()
  
  // Fallback to JSON if Payload is not configured
  if (!payload) {
    const data = await getBlogDataFromJSON()
    return data.categories
  }
  
  const result = await payload.find({
    collection: 'categories',
    limit: 100,
  })
  
  return result.docs.map((cat: any) => ({
    id: String(cat.id),
    name: cat.name,
    slug: cat.slug,
    description: cat.description || undefined,
    postsCount: cat.postsCount || undefined,
  }))
}

// 8. Get category by ID
export async function getCategoryById(
  categoryId: string,
): Promise<Category | null> {
  const payload = await getPayloadClient()
  await simulateDelay()
  
  // Fallback to JSON
  if (!payload) {
    const data = await getBlogDataFromJSON()
    return data.categories.find((cat) => cat.id === categoryId) || null
  }
  
  try {
    const cat = await payload.findByID({
      collection: 'categories',
      id: categoryId,
    })
    
    return cat ? {
      id: String(cat.id),
      name: cat.name,
      slug: cat.slug,
      description: cat.description || undefined,
      postsCount: cat.postsCount || undefined,
    } : null
  } catch (error) {
    return null
  }
}

// 9. Get category by slug
export async function getCategoryBySlug(
  slug: string,
): Promise<Category | null> {
  const payload = await getPayloadClient()
  await simulateDelay()
  
  // Fallback to JSON
  if (!payload) {
    const data = await getBlogDataFromJSON()
    return data.categories.find((cat) => cat.slug === slug) || null
  }
  
  const result = await payload.find({
    collection: 'categories',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })
  
  return result.docs.length > 0 ? {
    id: String(result.docs[0].id),
    name: result.docs[0].name,
    slug: result.docs[0].slug,
    description: result.docs[0].description || undefined,
    postsCount: result.docs[0].postsCount || undefined,
  } : null
}

// 10. Get posts by category slug
export async function getPostsByCategory(slug: string): Promise<Post[]> {
  const payload = await getPayloadClient()
  await simulateDelay()
  
  const category = await getCategoryBySlug(slug)
  if (!category) return []
  
  // Fallback to JSON
  if (!payload) {
    const data = await getBlogDataFromJSON()
    return data.posts.filter(
      (post) =>
        post.categories.some((cat) => cat.slug === slug) &&
        post.status === "published",
    )
  }
  
  const result = await payload.find({
    collection: 'posts',
    where: {
      categories: {
        contains: category.id,
      },
      status: {
        equals: 'published',
      },
    },
    depth: 2,
    sort: '-publishedAt',
  })
  
  return result.docs.map(transformPost)
}

// 11. Get all tags
export async function getAllTags(): Promise<Tag[]> {
  const payload = await getPayloadClient()
  await simulateDelay()
  
  // Fallback to JSON
  if (!payload) {
    const data = await getBlogDataFromJSON()
    return data.tags
  }
  
  const result = await payload.find({
    collection: 'tags',
    limit: 100,
  })
  
  return result.docs.map((tag: any) => ({
    id: String(tag.id),
    name: tag.name,
    slug: tag.slug,
    postsCount: tag.postsCount || undefined,
  }))
}

// 12. Get tag by ID
export async function getTagById(tagId: string): Promise<Tag | null> {
  const payload = await getPayloadClient()
  await simulateDelay()
  
  // Fallback to JSON
  if (!payload) {
    const data = await getBlogDataFromJSON()
    return data.tags.find((tag) => tag.id === tagId) || null
  }
  
  try {
    const tag = await payload.findByID({
      collection: 'tags',
      id: tagId,
    })
    
    return tag ? {
      id: String(tag.id),
      name: tag.name,
      slug: tag.slug,
      postsCount: tag.postsCount || undefined,
    } : null
  } catch (error) {
    return null
  }
}

// 13. Get tag by slug
export async function getTagBySlug(slug: string): Promise<Tag | null> {
  const payload = await getPayloadClient()
  await simulateDelay()
  
  // Fallback to JSON
  if (!payload) {
    const data = await getBlogDataFromJSON()
    return data.tags.find((tag) => tag.slug === slug) || null
  }
  
  const result = await payload.find({
    collection: 'tags',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })
  
  return result.docs.length > 0 ? {
    id: String(result.docs[0].id),
    name: result.docs[0].name,
    slug: result.docs[0].slug,
    postsCount: result.docs[0].postsCount || undefined,
  } : null
}

// 14. Get posts by tag slug
export async function getPostsByTag(slug: string): Promise<Post[]> {
  const payload = await getPayloadClient()
  await simulateDelay()
  
  const tag = await getTagBySlug(slug)
  if (!tag) return []
  
  // Fallback to JSON
  if (!payload) {
    const data = await getBlogDataFromJSON()
    return data.posts.filter(
      (post) =>
        post.tags.some((t) => t.slug === slug) && post.status === "published",
    )
  }
  
  const result = await payload.find({
    collection: 'posts',
    where: {
      tags: {
        contains: tag.id,
      },
      status: {
        equals: 'published',
      },
    },
    depth: 2,
    sort: '-publishedAt',
  })
  
  return result.docs.map(transformPost)
}

// 15. Get full blog data (for admin or overview pages)
export async function getFullBlogData() {
  await simulateDelay()
  
  const [posts, authors, categories, tags] = await Promise.all([
    getAllPosts(),
    getAllAuthors(),
    getAllCategories(),
    getAllTags(),
  ])
  
  return {
    posts,
    authors,
    categories,
    tags,
  }
}
