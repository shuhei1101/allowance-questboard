import { DIContainer } from "../../shared/di_container.ts";
import { UserId } from "../../user/domain/value_object/user_id.ts";
import { Member } from "../domain/member.ts";
import { MemberRepository } from "../repository/member_repository.ts";

export class GetMemberByUserIdCommand {
    constructor(
        public readonly userId: string,
        public readonly since?: Date,
    ) {}
}

export class GetMemberByUserIdResult {
    memberId: number;
    constructor(memberId: number) {
        this.memberId = memberId;
    }
    static fromModel(model: Member): GetMemberByUserIdResult {
        return new GetMemberByUserIdResult(
            Number(model.id),
        );
    }
}

export class GetMemberByUserIdUseCase {
    constructor(
        private readonly _repo = DIContainer.instance.get(MemberRepository),
    ) {}
    async execute(
        command: GetMemberByUserIdCommand,
    ): Promise<GetMemberByUserIdResult | null> {
        const member = await this._repo.findByUserId(
            new UserId(command.userId),
        );

        return member ? GetMemberByUserIdResult.fromModel(member) : null;
    }
}
