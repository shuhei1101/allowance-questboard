import { FamilyId } from "../../family/domain/value_object/family_id.ts";
import { Quest } from "../domain/quest.ts";
import { QuestId } from "../domain/value_object/quest_id.ts";

export class QuestRepository {
    findById(questId: QuestId): Promise<Quest | null> {
        throw new Error("Method findById() must be implemented.");
    }
    findByFamilyId(familyId: FamilyId): Promise<Quest | null> {
        throw new Error("Method findById() must be implemented.");
    }
}
