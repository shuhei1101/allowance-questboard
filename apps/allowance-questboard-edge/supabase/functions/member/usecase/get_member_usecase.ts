import { DIContainer } from "../../shared/di_container.ts";
import { Member } from "../domain/member.ts";
import { MemberId } from "../domain/value_object/member_id.ts";
import { MemberRepository } from "../repository/member_repository.ts";

export class GetMemberCommand {
    constructor(
        public readonly familyId: number,
    ) {}
}

export class GetMemberResult {
    id: number;
    constructor(id: number) {
        this.id = id;
    }
    static fromModel(model: Member): GetMemberResult {
        return new GetMemberResult(
            Number(model.id),
        );
    }
}

export class GetMemberUseCase {
    constructor(
        private readonly _repo = DIContainer.instance.get(MemberRepository),
    ) {
    }
    async execute(command: GetMemberCommand): Promise<GetMemberResult | null> {
        const family = await this._repo.findById(
            new MemberId(command.familyId),
        );
        return family ? GetMemberResult.fromModel(family) : null;
    }
}
