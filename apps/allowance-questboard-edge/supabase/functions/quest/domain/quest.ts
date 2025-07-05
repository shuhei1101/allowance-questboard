import { QuestEntity } from "../infrastructure/entity/quest_entity.ts";
import { QuestId } from "./value_object/quest_id.ts";
import { QuestTitle } from "./value_object/quest_title.ts";

export class Quest {
    constructor(
        public readonly id: QuestId,
        public readonly title: QuestTitle,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
    ) {}

    static fromEntity(entity: QuestEntity): Quest {
        return new Quest(
            new QuestId(entity.id),
            new QuestTitle(entity.title),
            entity.createdAt,
            entity.updatedAt,
        );
    }

    equals(other: Quest): boolean {
        return this.id.equals(other.id) &&
            this.title.equals(other.title) &&
            this.createdAt.getTime() === other.createdAt.getTime() &&
            this.updatedAt.getTime() === other.updatedAt.getTime();
    }
}
