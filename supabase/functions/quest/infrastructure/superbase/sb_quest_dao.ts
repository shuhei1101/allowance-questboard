import { QuestDao } from "../interface/quest_dao.ts";
import { QuestEntity } from "../entity/quest_entity.ts";
import { SupabaseClient } from "npm:@supabase/supabase-js";
export class SbQuestDao implements QuestDao {
    private supabase: SupabaseClient;

    constructor(supabase: SupabaseClient) {
        this.supabase = supabase;
    }
    async findById(questId: number): Promise<QuestEntity | null> {
        const { data, error } = await this.supabase
            .from("quests")
            .select("*")
            .eq("id", questId)
            .single();

        if (error) throw error;
        if (!data) return null;

        return QuestEntity.fromMap(data);
    }
}
