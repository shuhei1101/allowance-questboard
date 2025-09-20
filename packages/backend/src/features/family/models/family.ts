import { BaseDomainModel } from "@backend/core/models/baseDomainModel";
import { FamilyId } from "../value-object/familyId";
import { FamilyName } from "../value-object/familyName";
import { IconId } from "@backend/features/icon/value-objects/iconId";
import { FamilyIntroduction } from "../value-object/familyIntroduction";
import { FamilyDisplayId } from "../value-object/familyDisplayId";
import { FamilyOnlineName } from "../value-object/familyOnlineName";

export class Family extends BaseDomainModel<FamilyId> {
  displayId: FamilyDisplayId;
  name: FamilyName;
  onlineName: FamilyOnlineName;
  iconId?: IconId;
  introduction: FamilyIntroduction;

  constructor(params: {
    id: FamilyId;
    displayId: FamilyDisplayId;
    name: FamilyName;
    onlineName: FamilyOnlineName;
    iconId?: IconId;
    introduction?: FamilyIntroduction;
  }) {
    super(params.id);
    this.displayId = params.displayId;
    this.name = params.name;
    this.onlineName = params.onlineName;
    this.iconId = params.iconId;
    this.introduction = params.introduction || new FamilyIntroduction("");
  }

  /**
   * 新しい家族を作成（IDは自動で採番される）
   */
  static createNew(params: {
    displayId: FamilyDisplayId;
    name: FamilyName;
    onlineName: FamilyOnlineName;
    iconId?: IconId;
    introduction?: FamilyIntroduction;
  }): Family {
    // 新規作成時は一時的なIDを使用（リポジトリで実際のIDが割り当てられる）
    const tempId = new FamilyId(0);
    
    return new Family({
      id: tempId,
      displayId: params.displayId,
      name: params.name,
      onlineName: params.onlineName,
      iconId: params.iconId,
      introduction: params.introduction,
    });
  }

  protected validate(): void {
    throw new Error("Method not implemented.");
  }
}
