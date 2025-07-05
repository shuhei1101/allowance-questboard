import { Member } from "../../../member/domain/member.ts";
import { Members } from "../../../member/domain/members.ts";
import { Quest } from "../../../quest/domain/quest.ts";
import { Quests } from "../../../quest/domain/quests.ts";
import { Family } from "../../domain/family.ts";

export class FamilyMemberDto {
    constructor(
        public readonly id: number,
        public readonly name: string,
    ) {}
    static fromModel(model: Member): FamilyMemberDto {
        return new FamilyMemberDto(Number(model.id), String(model.name));
    }
}

export class FamilyDto {
    constructor(
        public readonly id: number,
    ) {}
    static fromModel(model: Family): FamilyDto {
        return new FamilyDto(Number(model.id));
    }
}

export class FamilyQuestDto {
    constructor(
        public readonly id: number,
        public readonly title: string,
    ) {}
    static fromModel(model: Quest): FamilyQuestDto {
        return new FamilyQuestDto(Number(model.id), String(model.title));
    }
}

export class GetFamilyHomeDataResult {
    constructor(
        public readonly familyMembers: FamilyMemberDto[],
        public readonly family: FamilyDto,
        public readonly familyQuests: FamilyQuestDto[],
    ) {}

    static fromModels(
        familyMembers: Members,
        family: Family,
        familyQuests: Quests,
    ): GetFamilyHomeDataResult {
        return new GetFamilyHomeDataResult(
            familyMembers.map((member) => FamilyMemberDto.fromModel(member)),
            FamilyDto.fromModel(family),
            familyQuests.map((quest) => FamilyQuestDto.fromModel(quest)),
        );
    }
}
