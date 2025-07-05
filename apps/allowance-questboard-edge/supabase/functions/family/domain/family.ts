import { UserId } from "../../user/domain/value_object/user_id.ts";
import { FamilyEntity } from "../infrastructure/entity/family_entity.ts";
import { FamilyId } from "./value_object/family_id.ts";

export class Family {
    constructor(
        public readonly id: FamilyId,
        public readonly userId: UserId,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
    ) {}

    static fromEntity(entity: FamilyEntity): Family {
        return new Family(
            new FamilyId(entity.id),
            new UserId(entity.userId),
            entity.createdAt,
            entity.updatedAt,
        );
    }

    equals(other: Family): boolean {
        return this.id.equals(other.id) &&
            this.userId.equals(other.userId) &&
            this.createdAt.getTime() === other.createdAt.getTime() &&
            this.updatedAt.getTime() === other.updatedAt.getTime();
    }
}
