import { BaseDomainModel } from "@backend/core/models/baseDomainModel";
import { ParentId } from "../value-object/parentId";
import { ParentName } from "../value-object/parentName";
import { Birthday } from "@backend/features/shared/value-object/birthday";
import { IconId } from "@backend/features/icon/value-objects/iconId";
import { FamilyId } from "@backend/features/family/value-object/familyId";
import { FamilyMemberId } from "@backend/features/family-member/value-object/familyMemberId";

export class Parent extends BaseDomainModel<ParentId> {
  name: ParentName;
  iconId?: IconId;
  birthday: Birthday;
  familyId: FamilyId;
  familyMemberId?: FamilyMemberId;

  constructor(params: {
    id: ParentId;
    name: ParentName;
    iconId?: IconId;
    birthday: Birthday;
    familyId: FamilyId;
    familyMemberId?: FamilyMemberId;
  }) {
    super(params.id);
    this.name = params.name;
    this.iconId = params.iconId;
    this.birthday = params.birthday;
    this.familyId = params.familyId;
    this.familyMemberId = params.familyMemberId;
  }

  protected validate(): void {
    throw new Error("Method not implemented.");
  }
}
