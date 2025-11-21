# Supabase Setup Guide

This project uses Supabase to store contact form submissions. Follow these steps to complete the setup:

## 1. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and sign in (or create an account)
2. Click "New Project"
3. Fill in your project details and wait for the setup to complete

## 2. Create the Database Table

Once your project is ready, go to the SQL Editor and run this SQL to create the `contact_submissions` table:

```sql
-- Create contact_submissions table
CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  company_name TEXT NOT NULL,
  website_url TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow inserts (public can submit forms)
CREATE POLICY "Allow public form submissions"
ON contact_submissions
FOR INSERT
TO anon
WITH CHECK (true);

-- Create a policy for authenticated users to view submissions (optional)
CREATE POLICY "Allow authenticated users to view submissions"
ON contact_submissions
FOR SELECT
TO authenticated
USING (true);

-- Add indexes for better query performance
CREATE INDEX idx_contact_submissions_created_at ON contact_submissions(created_at DESC);
CREATE INDEX idx_contact_submissions_email ON contact_submissions(email);
```

## 3. Configure Environment Variables

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy your **Project URL** and **anon/public key**
3. Create a `.env.local` file in the project root (use `.env.local.example` as a template):

```bash
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

4. **Important:** Make sure `.env.local` is in your `.gitignore` file (it should be by default)

## 4. Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to the contact page (usually `/contact-us`)
3. Fill out and submit the form
4. Check your Supabase dashboard under **Table Editor** → **contact_submissions** to see the new entry

## 5. View Submissions in Supabase

You can view all form submissions in your Supabase dashboard:
1. Go to **Table Editor**
2. Select the `contact_submissions` table
3. You'll see all submissions with timestamps

## Optional: Set Up Email Notifications

To receive email notifications when someone submits the contact form, you can set up a Supabase Database Webhook or Edge Function. Refer to the [Supabase Documentation](https://supabase.com/docs/guides/functions) for more details.

## Troubleshooting

- **"Missing Supabase environment variables" error:** Make sure your `.env.local` file exists and contains both environment variables
- **Form submission fails:** Check the browser console for errors and verify your Supabase credentials
- **RLS errors:** Make sure you've enabled the correct policies for public form submissions

