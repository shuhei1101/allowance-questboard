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

  protected validate(): void {
    throw new Error("Method not implemented.");
  }
}
