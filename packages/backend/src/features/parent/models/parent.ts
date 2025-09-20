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

  /**
   * 新しい親を作成（IDは自動で採番される）
   */
  static createNew(params: {
    name: ParentName;
    iconId?: IconId;
    birthday: Birthday;
    familyId: FamilyId;
    familyMemberId?: FamilyMemberId;
  }): Parent {
    // 新規作成時は一時的なIDを使用（リポジトリで実際のIDが割り当てられる）
    const tempId = new ParentId(0);
    
    return new Parent({
      id: tempId,
      name: params.name,
      iconId: params.iconId,
      birthday: params.birthday,
      familyId: params.familyId,
      familyMemberId: params.familyMemberId,
    });
  }

  protected validate(): void {
    throw new Error("Method not implemented.");
  }
}
