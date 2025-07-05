import { FamilyDao } from "../interface/family_dao.ts";
import { FamilyEntity } from "../entity/family_entity.ts";
import { TABLE_NAMES } from "../../../shared/config.ts";
import { SupabaseClient } from "npm:@supabase/supabase-js";
export class SbFamilyDao implements FamilyDao {
    private supabase: SupabaseClient;

    constructor(supabase: SupabaseClient) {
        this.supabase = supabase;
    }
    async findByUserId(userId: string): Promise<FamilyEntity | null> {
        const { data, error } = await this.supabase
            .from(TABLE_NAMES.FAMILIES)
            .select("*")
            .eq("user_id", userId)
            .single();

        if (error) throw error;
        if (!data) return null;

        return FamilyEntity.fromMap(data);
    }

    findAll(): Promise<Array<FamilyEntity>> {
        throw new Error("Method not implemented.");
    }

    async findById(familyId: number): Promise<FamilyEntity | null> {
        const { data, error } = await this.supabase
            .from(TABLE_NAMES.FAMILIES)
            .select("*")
            .eq("id", familyId)
            .single();

        if (error) throw error;
        if (!data) return null;

        return FamilyEntity.fromMap(data);
    }
}
