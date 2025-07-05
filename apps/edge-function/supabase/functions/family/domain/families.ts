import { FamilyEntity } from "../infrastructure/entity/family_entity.ts";
import { Family } from "./family.ts";

export class Families {
    private readonly _list: Array<Family>;
    constructor(families: Array<Family>) {
        this._list = families;
    }

    static fromEntities(entities: Array<FamilyEntity>): Families {
        return new Families(
            entities.map((e) => Family.fromEntity(e)),
        );
    }

    get(index: number): Family | undefined {
        return this._list[index];
    }

    [Symbol.iterator](): Iterator<Family> {
        return this._list[Symbol.iterator]();
    }

    get length(): number {
        return this._list.length;
    }

    first(): Family | undefined {
        return this._list[0];
    }
}
