import { DIContainer } from "../../shared/di_container.ts";
import { UserId } from "../../user/domain/value_object/user_id.ts";
import { Family } from "../domain/family.ts";
import { GetFamilyByUserIdParams } from "../methods/get_familyid_by_userid.ts";
import { FamilyRepository } from "../repository/family_repository.ts";

export class GetFamilyByUserIdCommand {
    constructor(
        public readonly userId: string,
        public readonly since?: Date,
    ) {}

    static fromParams(
        params: GetFamilyByUserIdParams,
    ): GetFamilyByUserIdCommand {
        let sinceDate: Date | undefined = undefined;

        if (params.since) {
            const parsed = new Date(params.since);
            if (isNaN(parsed.getTime())) {
                throw new Error(
                    `Invalid date format for since: ${params.since}`,
                );
            }
            sinceDate = parsed;
        }

        return new GetFamilyByUserIdCommand(params.userId, sinceDate);
    }
}

export class GetFamilyByUserIdResult {
    familyId: number;
    constructor(familyId: number) {
        this.familyId = familyId;
    }
    static fromModel(model: Family): GetFamilyByUserIdResult {
        return new GetFamilyByUserIdResult(
            Number(model.id),
        );
    }
}

export class GetFamilyByUserIdUseCase {
    constructor(
        private readonly _repo = DIContainer.instance.get(FamilyRepository),
    ) {}
    async execute(
        command: GetFamilyByUserIdCommand,
    ): Promise<GetFamilyByUserIdResult | null> {
        const family = await this._repo.findByUserId(
            new UserId(command.userId),
        );

        return family ? GetFamilyByUserIdResult.fromModel(family) : null;
    }
}
