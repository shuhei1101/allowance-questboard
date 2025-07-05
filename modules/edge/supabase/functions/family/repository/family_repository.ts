import { UserId } from "../../user/domain/value_object/user_id.ts";
import { Families } from "../domain/families.ts";
import { Family } from "../domain/family.ts";
import { FamilyId } from "../domain/value_object/family_id.ts";

export class FamilyRepository {
    findAll(): Promise<Families> {
        throw new Error("Method findAll() must be implemented.");
    }
    findById(familyId: FamilyId): Promise<Family | null> {
        throw new Error("Method findById() must be implemented.");
    }
    findByUserId(userId: UserId): Promise<Family | null> {
        throw new Error("Method findById() must be implemented.");
    }
}
