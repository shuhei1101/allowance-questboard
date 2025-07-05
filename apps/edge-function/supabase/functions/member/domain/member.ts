import { UserId } from "../../user/domain/value_object/user_id.ts";
import { MemberEntity } from "../infrastructure/entity/member_entity.ts";
import { MemberId } from "./value_object/member_id.ts";
import { MemberName } from "./value_object/member_name.ts";

export class Member {
    constructor(
        public readonly id: MemberId,
        public readonly userId: UserId,
        public readonly name: MemberName,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
    ) {}

    static fromEntity(entity: MemberEntity): Member {
        return new Member(
            new MemberId(entity.id),
            new UserId(entity.userId),
            new MemberName(entity.name),
            entity.createdAt,
            entity.updatedAt,
        );
    }

    equals(other: Member): boolean {
        return this.id.equals(other.id) &&
            this.userId.equals(other.userId) &&
            this.name.equals(other.name) &&
            this.createdAt.getTime() === other.createdAt.getTime() &&
            this.updatedAt.getTime() === other.updatedAt.getTime();
    }
}
