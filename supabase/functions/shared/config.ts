import { createClient } from "npm:@supabase/supabase-js";
import "https://deno.land/std@0.203.0/dotenv/load.ts";

// supabaseClientの作成
export const SUPABASE_CLIENT = createClient(
    Deno.env.get("MY_SUPABASE_URL")!,
    Deno.env.get("MY_SUPABASE_ANON_KEY")!,
);

export const TABLE_NAMES = {
    FAMILIES: "families",
    MEMBERS: "members",
    QUESTS: "quests",
};
