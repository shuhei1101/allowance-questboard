import { DIContainer } from "../../shared/di_container.ts";
import { Family } from "../domain/family.ts";
import { FamilyId } from "../domain/value_object/family_id.ts";
import { FamilyRepository } from "../repository/family_repository.ts";

export class GetFamilyCommand {
    constructor(
        public readonly familyId: number,
    ) {}
}

export class GetFamilyResult {
    id: number;
    constructor(id: number) {
        this.id = id;
    }
    static fromModel(model: Family): GetFamilyResult {
        return new GetFamilyResult(
            Number(model.id),
        );
    }
}

export class GetFamilyUseCase {
    constructor(
        private readonly _repo = DIContainer.instance.get(FamilyRepository),
    ) {}
    async execute(command: GetFamilyCommand): Promise<GetFamilyResult | null> {
        const family = await this._repo.findById(
            new FamilyId(command.familyId),
        );
        return family ? GetFamilyResult.fromModel(family) : null;
    }
}
