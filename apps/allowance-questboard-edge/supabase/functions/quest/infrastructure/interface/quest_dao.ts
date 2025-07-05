import { QuestEntity } from "../entity/quest_entity.ts";

export class QuestDao {
    findById(memberId: number): Promise<QuestEntity | null> {
        throw new Error("Method findById() must be implemented.");
    }
}
