import { MemberEntity } from "../infrastructure/entity/member_entity.ts";
import { Member } from "./member.ts";

export class Members {
    private readonly _list: Array<Member>;
    constructor(families: Array<Member>) {
        this._list = families;
    }

    static fromEntities(entities: Array<MemberEntity>): Members {
        return new Members(
            entities.map((e) => Member.fromEntity(e)),
        );
    }

    get(index: number): Member | undefined {
        return this._list[index];
    }

    [Symbol.iterator](): Iterator<Member> {
        return this._list[Symbol.iterator]();
    }

    get length(): number {
        return this._list.length;
    }

    first(): Member | undefined {
        return this._list[0];
    }

    map<U>(
        callback: (member: Member, index: number, array: Member[]) => U,
    ): U[] {
        return this._list.map(callback);
    }

    static empty(): Members {
        return new Members([]);
    }
}
