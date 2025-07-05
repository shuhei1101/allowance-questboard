import { DIContainer } from "../../shared/di_container.ts";
import { Quest } from "../domain/quest.ts";
import { QuestId } from "../domain/value_object/quest_id.ts";
import { QuestRepository } from "../repository/quest_repository.ts";

export class GetQuestCommand {
    constructor(
        public readonly familyId: number,
    ) {}
}

export class GetQuestResult {
    id: number;
    constructor(id: number) {
        this.id = id;
    }
    static fromModel(model: Quest): GetQuestResult {
        return new GetQuestResult(
            Number(model.id),
        );
    }
}

export class GetQuestUseCase {
    constructor(
        private readonly _repo = DIContainer.instance.get(QuestRepository),
    ) {
    }
    async execute(command: GetQuestCommand): Promise<GetQuestResult | null> {
        const family = await this._repo.findById(
            new QuestId(command.familyId),
        );
        return family ? GetQuestResult.fromModel(family) : null;
    }
}
