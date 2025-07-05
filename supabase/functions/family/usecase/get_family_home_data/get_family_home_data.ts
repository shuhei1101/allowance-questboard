import { MemberRepository } from "../../../member/repository/member_repository.ts";
import { QuestRepository } from "../../../quest/repository/quest_repository.ts";
import { DIContainer } from "../../../shared/di_container.ts";
import { FamilyId } from "../../domain/value_object/family_id.ts";
import { FamilyRepository } from "../../repository/family_repository.ts";
import { GetFamilyHomeDataCommand } from "./get_family_home_data_command.ts";
import { GetFamilyHomeDataResult } from "./get_family_home_data_result.ts";

export class GetFamilyHomeDataUseCase {
  constructor(
    private readonly _quest_repo = DIContainer.instance.get(QuestRepository),
    private readonly _family_repo = DIContainer.instance.get(FamilyRepository),
    private readonly _member_repo = DIContainer.instance.get(MemberRepository)
  ) {}

  async execute(
    command: GetFamilyHomeDataCommand
  ): Promise<GetFamilyHomeDataResult> {
    if (!command) {
      throw new Error("コマンドが指定されていません");
    }
    if (!command.familyId) {
      throw new Error("familyIdが指定されていません");
    }
    const familyId = new FamilyId(command.familyId);

    const [familyQuests, family, member] = await Promise.all([
      this._quest_repo.findByFamilyId(familyId),
      this._family_repo.findById(familyId),
      this._member_repo.findByFamilyId(familyId),
    ]);

    // 仮のデータを返す
    return GetFamilyHomeDataResult.fromModels(member, family, familyQuests);
  }
}
