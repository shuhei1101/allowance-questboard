import { FamilyEntity } from "../entity/family_entity.ts";

export class FamilyDao {
    findAll(): Promise<Array<FamilyEntity>> {
        throw new Error("Method findAll() must be implemented.");
    }
    findById(familyId: number): Promise<FamilyEntity | null> {
        throw new Error("Method findById() must be implemented.");
    }
    findByUserId(userId: string): Promise<FamilyEntity | null> {
        throw new Error("Method findById() must be implemented.");
    }
}
