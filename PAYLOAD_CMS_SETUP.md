# Payload CMS + Supabase Blog Setup

This project now uses **Payload CMS** with **Supabase PostgreSQL** as the database backend for the blog.

## 🚀 Setup Instructions

### 1. Set Up Supabase Project

1. Go to [Supabase](https://supabase.com) and create a new project
2. Wait for the database to be provisioned
3. Go to **Settings** → **Database** to get your connection string

### 2. Configure Environment Variables

Create a `.env.local` file in the project root with the following:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Payload CMS Configuration
# Generate a secure secret: openssl rand -base64 32
PAYLOAD_SECRET=your_secure_payload_secret_here

# Database Configuration  
# Get from Supabase Project Settings -> Database -> Connection String (Transaction mode, port 5432)
DATABASE_URL=postgresql://postgres.[YOUR-REF]:[YOUR-PASSWORD]@aws-0-[region].pooler.supabase.com:5432/postgres
```

### 3. Initialize Payload Database

Run these commands to set up the database schema:

```bash
# Generate Payload types
npm run payload generate:types

# Run database migrations
npm run payload migrate

# (Optional) Seed with existing blog data
npm run migrate:blog
```

### 4. Access the CMS

Due to Next.js 16 compatibility, we're using Payload's standalone admin panel:

```bash
# Start the Next.js app
npm run dev

# In a separate terminal, start Payload admin (if needed)
# Note: With Supabase, you can also manage content directly in Supabase Studio
```

## 📝 Managing Content

### Option 1: Supabase Studio (Recommended)

1. Go to your Supabase project dashboard
2. Click on **Table Editor**
3. You'll see these tables:
   - `posts` - Blog posts
   - `authors` - Post authors
   - `categories` - Post categories
   - `tags` - Post tags
   - `users` - CMS users (for authentication)

You can add, edit, and delete content directly here!

### Option 2: Payload Local Admin

If you need the Payload admin interface, you can run it separately (requires additional setup for Next.js 16 compatibility).

## 🔄 Migrating Existing Blog Posts

The existing blog posts from `get-blog.json` can be migrated to Payload/Supabase:

```bash
npm run migrate:blog
```

This will:
- Import all 3 authors
- Import all 9 categories  
- Import all 17 tags
- Import all 7 blog posts with relationships

## 📊 Database Schema

### Posts Table
- `id` - UUID (auto-generated)
- `title` - Post title
- `slug` - URL-friendly slug (unique)
- `excerpt` - Short description
- `content` - Rich text content (Lexical JSON)
- `featured_image` - Image URL, alt text, dimensions
- `author_id` - Foreign key to authors table
- `status` - 'draft' or 'published'
- `published_at` - Publication date
- `created_at`, `updated_at` - Timestamps
- `views`, `likes`, `comments_count` - Engagement metrics
- `read_time` - Estimated reading time (minutes)
- `seo_meta_title`, `seo_meta_description`, `seo_keywords` - SEO fields

### Authors Table
- `id` - UUID
- `name`, `email`, `username`
- `avatar` - Profile image URL
- `bio` - Author bio
- `role` - Author role/title
- `social` - Social media links (JSON)
- `posts_count` - Number of posts
- `joined_at` - Join date

### Categories & Tags Tables
- `id` - UUID
- `name` - Display name
- `slug` - URL slug (unique)
- `description` - Category description (optional)
- `posts_count` - Number of posts

## 🎨 Frontend Integration

The blog pages (`/ai` and `/post/[id]`) continue to work exactly as before - **no visual changes**!

The blog actions (`actions/blog.ts`) now fetch from Payload/Supabase instead of the JSON file:
- `getAllPosts()` - Get all published posts
- `getPostById(id)` - Get single post
- `getPostBySlug(slug)` - Get post by slug
- `getAllAuthors()` - Get all authors
- `getAllCategories()` - Get all categories  
- `getAllTags()` - Get all tags
- And more...

## 📚 API Endpoints

Payload provides a REST API and GraphQL API automatically:

- REST API: `http://localhost:3000/api/posts`
- GraphQL: `http://localhost:3000/api/graphql`

## 🚢 Deploying to Vercel

1. Push your code to GitHub
2. Import to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

Make sure to run migrations after deployment:

```bash
vercel env pull .env.local
npm run payload migrate
```

## 📝 Creating New Posts

### Via Supabase Studio:

1. Go to Table Editor → `authors` → Insert a new author (if needed)
2. Go to Table Editor → `posts` → Insert row
3. Fill in required fields:
   - title, slug, excerpt, content (as JSON), featured_image (as JSON)
   - author_id (select from authors)
   - status ('published')
   - published_at (current timestamp)
   - read_time (estimate in minutes)

### Via API:

```typescript
import { getPayloadClient } from '@/lib/payload'

const payload = await getPayloadClient()

await payload.create({
  collection: 'posts',
  data: {
    title: 'My New Post',
    slug: 'my-new-post',
    excerpt: 'This is a great post...',
    content: { /* Lexical JSON */ },
    // ... more fields
  }
})
```

## 🔐 Security

- Row Level Security (RLS) is automatically handled by Payload
- User authentication is required for write operations
- Public read access for published posts
- API keys should never be committed to Git

## 📖 Resources

- [Payload CMS Docs](https://payloadcms.com/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Payload + Supabase Guide](https://payloadcms.com/docs/database/postgres)

## 🐛 Troubleshooting

**Build errors with Next.js 16?**
- Payload CMS 3.x officially supports Next.js 15.x
- We're using legacy peer deps to maintain compatibility
- The admin panel may need to run separately

**Database connection errors?**
- Verify your `DATABASE_URL` is correct
- Use Transaction mode (port 5432) not Session mode (port 6543)
- Check Supabase project is not paused

**Migration issues?**
- Make sure DATABASE_URL and PAYLOAD_SECRET are set
- Check Supabase database is accessible
- Verify JSON structure in get-blog.json is valid

---

✅ **Your blog is now powered by Payload CMS + Supabase!**

