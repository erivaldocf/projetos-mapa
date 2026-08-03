import { createClient } from "@supabase/supabase-js";

// Cole aqui os dados do seu painel (Settings > API)
const supabaseUrl = "https://ktnptgjctfgmaankallr.supabase.co";
const supabaseAnonKey = "sb_publishable_KXEpANPXCSc7iLnUXaXZ_g_SENplPbG";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
