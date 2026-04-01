import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

// Log at module load time (visible in Vercel Function logs)
console.log('[supabase.ts] NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ?? 'MISSING');
console.log('[supabase.ts] NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseAnonKey ? 'SET' : 'MISSING');

if (!supabaseUrl || !supabaseAnonKey) {
  // Instead of throwing (which silently crashes), log a clear error
  console.error(
    '[supabase.ts] ❌ Missing Supabase environment variables! ' +
    'Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in Vercel.'
  );
}

export const supabase = createClient(
  supabaseUrl ?? 'https://placeholder.supabase.co',
  supabaseAnonKey ?? 'placeholder'
);
