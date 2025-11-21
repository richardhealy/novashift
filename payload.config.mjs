import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: 'users',
    meta: {
      titleSuffix: '- NovaShift CMS',
    },
  },
  collections: [
    {
      slug: 'users',
      auth: true,
      admin: {
        useAsTitle: 'email',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      slug: 'posts',
      admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'author', 'status', 'publishedAt'],
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'slug',
          type: 'text',
          required: true,
          unique: true,
          admin: {
            description: 'URL-friendly version of the title',
          },
        },
        {
          name: 'excerpt',
          type: 'textarea',
          required: true,
        },
        {
          name: 'content',
          type: 'richText',
          required: true,
          editor: lexicalEditor({}),
        },
        {
          name: 'featuredImage',
          type: 'group',
          fields: [
            {
              name: 'url',
              type: 'text',
              required: true,
            },
            {
              name: 'alt',
              type: 'text',
              required: true,
            },
            {
              name: 'width',
              type: 'number',
              required: true,
              defaultValue: 1200,
            },
            {
              name: 'height',
              type: 'number',
              required: true,
              defaultValue: 630,
            },
          ],
        },
        {
          name: 'author',
          type: 'relationship',
          relationTo: 'authors',
          required: true,
        },
        {
          name: 'categories',
          type: 'relationship',
          relationTo: 'categories',
          hasMany: true,
        },
        {
          name: 'tags',
          type: 'relationship',
          relationTo: 'tags',
          hasMany: true,
        },
        {
          name: 'status',
          type: 'select',
          options: [
            {
              label: 'Draft',
              value: 'draft',
            },
            {
              label: 'Published',
              value: 'published',
            },
          ],
          defaultValue: 'draft',
          required: true,
        },
        {
          name: 'publishedAt',
          type: 'date',
          admin: {
            date: {
              pickerAppearance: 'dayAndTime',
            },
          },
        },
        {
          name: 'views',
          type: 'number',
          defaultValue: 0,
        },
        {
          name: 'likes',
          type: 'number',
          defaultValue: 0,
        },
        {
          name: 'commentsCount',
          type: 'number',
          defaultValue: 0,
        },
        {
          name: 'readTime',
          type: 'number',
          required: true,
          admin: {
            description: 'Estimated reading time in minutes',
          },
        },
        {
          name: 'seo',
          type: 'group',
          fields: [
            {
              name: 'metaTitle',
              type: 'text',
              required: true,
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              required: true,
            },
            {
              name: 'keywords',
              type: 'array',
              fields: [
                {
                  name: 'keyword',
                  type: 'text',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      slug: 'authors',
      admin: {
        useAsTitle: 'name',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'email',
          type: 'email',
          required: true,
        },
        {
          name: 'username',
          type: 'text',
        },
        {
          name: 'avatar',
          type: 'text',
          required: true,
        },
        {
          name: 'bio',
          type: 'textarea',
          required: true,
        },
        {
          name: 'role',
          type: 'text',
        },
        {
          name: 'social',
          type: 'group',
          fields: [
            {
              name: 'twitter',
              type: 'text',
            },
            {
              name: 'github',
              type: 'text',
            },
            {
              name: 'linkedin',
              type: 'text',
            },
          ],
        },
        {
          name: 'postsCount',
          type: 'number',
          defaultValue: 0,
        },
        {
          name: 'joinedAt',
          type: 'date',
        },
      ],
    },
    {
      slug: 'categories',
      admin: {
        useAsTitle: 'name',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'slug',
          type: 'text',
          required: true,
          unique: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'postsCount',
          type: 'number',
          defaultValue: 0,
        },
      ],
    },
    {
      slug: 'tags',
      admin: {
        useAsTitle: 'name',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'slug',
          type: 'text',
          required: true,
          unique: true,
        },
        {
          name: 'postsCount',
          type: 'number',
          defaultValue: 0,
        },
      ],
    },
  ],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || process.env.POSTGRES_URL,
    },
  }),
})

