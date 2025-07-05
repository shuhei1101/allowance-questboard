import { FamilyId } from "../../family/domain/value_object/family_id.ts";
import { AppLogger } from "../../shared/app_logger.ts";
import { ERROR_MESSAGES } from "../../shared/constants/error_messages.ts";
import { DIContainer } from "../../shared/di_container.ts";
import { Quest } from "../domain/quest.ts";
import { QuestId } from "../domain/value_object/quest_id.ts";
import { QuestDao } from "../infrastructure/interface/quest_dao.ts";
import { QuestRepository } from "./quest_repository.ts";

export class QuestRepositoryImpl implements QuestRepository {
    constructor(
        private readonly _dao = DIContainer.instance.get(QuestDao),
    ) {}
    findByFamilyId(familyId: FamilyId): Promise<Quest | null> {
        throw new Error("Method not implemented.");
    }
    async findById(questId: QuestId): Promise<Quest | null> {
        try {
            const family = await this._dao.findById(Number(questId));
            return family ? Quest.fromEntity(family) : null;
        } catch (_error) {
            AppLogger.I.info(
                `${ERROR_MESSAGES.FAMILY_NOT_FOUND} ${Number(questId)}`,
            );
            return null;
        }
    }
}
