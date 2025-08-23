import { BaseDomainModel } from "@backend/core/models/baseDomainModel";
import { FamilyId } from "../value-object/familyId";
import { FamilyName } from "../value-object/familyName";
import { IconId } from "@backend/features/icon/value-objects/iconId";
import { FamilyIntroduction } from "../value-object/familyIntroduction";

export class Family extends BaseDomainModel<FamilyId> {
  name: FamilyName;
  iconId: IconId | null;
  introduction: FamilyIntroduction;

  constructor(params: {
    id: FamilyId;
    name: FamilyName;
    iconId: IconId | null;
    introduction: FamilyIntroduction;
  }) {
    super(params.id);
    this.name = params.name;
    this.iconId = params.iconId;
    this.introduction = params.introduction;
  }

  protected validate(): void {
    throw new Error("Method not implemented.");
  }
}
