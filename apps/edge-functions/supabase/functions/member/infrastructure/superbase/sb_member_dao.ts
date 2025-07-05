import { MemberDao } from "../interface/member_dao.ts";
import { MemberEntity } from "../entity/member_entity.ts";
import { SUPABASE_CLIENT, TABLE_NAMES } from "../../../shared/config.ts";
import { SupabaseClient } from "npm:@supabase/supabase-js";
export class SbMemberDao implements MemberDao {
    private supabase: SupabaseClient;

    constructor(supabase: SupabaseClient) {
        this.supabase = supabase;
    }
    async findByUserId(userId: string): Promise<MemberEntity | null> {
        const { data, error } = await this.supabase
            .from(TABLE_NAMES.MEMBERS)
            .select("*")
            .eq("user_id", userId)
            .single();

        if (error) throw error;
        if (!data) return null;

        return MemberEntity.fromMap(data);
    }

    findAll(): Promise<Array<MemberEntity>> {
        throw new Error("Method not implemented.");
    }

    async findById(memberId: number): Promise<MemberEntity | null> {
        const { data, error } = await this.supabase
            .from(TABLE_NAMES.MEMBERS)
            .select("*")
            .eq("id", memberId)
            .single();

        if (error) throw error;
        if (!data) return null;

        return MemberEntity.fromMap(data);
    }
    async findByFamilyId(familyId: number): Promise<Array<MemberEntity>> {
        const { data, error } = await this.supabase
            .from(TABLE_NAMES.MEMBERS)
            .select("*")
            .eq("family_id", familyId);

        if (error) throw error;
        if (!data) return [];

        return data.map(MemberEntity.fromMap);
    }
}

// 動作確認用
if (import.meta.main) {
    const dao = new SbMemberDao(
        SUPABASE_CLIENT,
    );
    const entity = await dao.findById(1);
    console.log(entity);
}
