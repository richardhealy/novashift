-- Force PostgREST to reload the schema cache
-- Run this in the Supabase SQL Editor if you see "Could not find the table" errors after creating a table

NOTIFY pgrst, 'reload config';

