import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-service-key';

// Client for public operations (read products, subscribe leads)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin client for backend server routes (bypasses RLS to insert orders & create tokens)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
