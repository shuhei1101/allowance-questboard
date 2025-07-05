import { QuestEntity } from "../infrastructure/entity/quest_entity.ts";
import { Quest } from "./quest.ts";

export class Quests {
    private readonly _list: Array<Quest>;
    constructor(families: Array<Quest>) {
        this._list = families;
    }

    static fromEntities(entities: Array<QuestEntity>): Quests {
        return new Quests(
            entities.map((e) => Quest.fromEntity(e)),
        );
    }

    get(index: number): Quest | undefined {
        return this._list[index];
    }

    [Symbol.iterator](): Iterator<Quest> {
        return this._list[Symbol.iterator]();
    }

    get length(): number {
        return this._list.length;
    }

    first(): Quest | undefined {
        return this._list[0];
    }
    map<U>(
        callback: (quest: Quest, index: number, array: Quest[]) => U,
    ): U[] {
        return this._list.map(callback);
    }
}
