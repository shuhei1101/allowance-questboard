import { UserId } from "../../user/domain/value_object/user_id.ts";
import { Members } from "../domain/members.ts";
import { Member } from "../domain/member.ts";
import { MemberId } from "../domain/value_object/member_id.ts";
import { FamilyId } from "../../family/domain/value_object/family_id.ts";

export class MemberRepository {
    findAll(): Promise<Members> {
        throw new Error("Method findAll() must be implemented.");
    }
    findById(familyId: MemberId): Promise<Member | null> {
        throw new Error("Method findById() must be implemented.");
    }
    findByUserId(userId: UserId): Promise<Member | null> {
        throw new Error("Method findById() must be implemented.");
    }
    findByFamilyId(familyId: FamilyId): Promise<Members> {
        throw new Error("Method findById() must be implemented.");
    }
}
