import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.warn('⚠️ Missing Supabase environment variables. Please check your .env file.');
}

// We use the Service Role Key here because the backend needs full admin access
// to bypass Row Level Security (RLS) for server-side operations.
export const supabase = createClient(supabaseUrl || '', supabaseServiceRoleKey || '');
