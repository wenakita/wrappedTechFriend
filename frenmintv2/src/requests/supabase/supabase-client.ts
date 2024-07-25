import { createClient } from "@supabase/supabase-js";

export const supabase: any = createClient(
  "https://izeqvvxcixuderqjsxbk.supabase.co",
  import.meta.env.VITE_SUPABASE_ANON_KEY
);
