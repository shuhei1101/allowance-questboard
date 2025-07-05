import { MemberEntity } from "../entity/member_entity.ts";

export class MemberDao {
    findAll(): Promise<Array<MemberEntity>> {
        throw new Error("Method findAll() must be implemented.");
    }
    findById(memberId: number): Promise<MemberEntity | null> {
        throw new Error("Method findById() must be implemented.");
    }
    findByUserId(userId: string): Promise<MemberEntity | null> {
        throw new Error("Method findById() must be implemented.");
    }
    findByFamilyId(familyId: number): Promise<Array<MemberEntity>> {
        throw new Error("Method findByFamilyId() must be implemented.");
    }
}
