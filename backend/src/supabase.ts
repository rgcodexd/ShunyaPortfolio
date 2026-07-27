import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Initialize with the Service Role Key to bypass RLS for admin operations if needed.
// For user operations, we should use the JWT of the incoming request.
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
