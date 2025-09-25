import { BaseForm } from '@backend/core/models/baseForm';
import { FamilyDisplayId } from '@backend/features/family/value-object/familyDisplayId';
import { FamilyName } from '@backend/features/family/value-object/familyName';
import { FamilyOnlineName } from '@backend/features/family/value-object/familyOnlineName';
import { FamilyIntroduction } from '@backend/features/family/value-object/familyIntroduction';
import { ParentName } from '@backend/features/parent/value-object/parentName';
import { Birthday } from '@backend/features/shared/value-object/birthday';
import { IconId } from '@backend/features/icon/value-objects/iconId';
import { FamilyMemberId } from '@backend/features/family-member/value-object/familyMemberId';

/** 家族登録フォームデータモデル */
export class FamilyRegisterForm extends BaseForm {
  /** 家族情報 */
  public readonly family: {
    /** 家族表示ID */
    displayId: FamilyDisplayId;
    /** 家族名 */
    name: FamilyName;
    /** 家族オンライン名 */
    onlineName: FamilyOnlineName;
    /** アイコンID（オプション） */
    iconId?: IconId;
    /** 家族紹介（オプション） */
    introduction?: FamilyIntroduction;
  };

  /** 親情報 */
  public readonly parent: {
    /** 親の名前 */
    name: ParentName;
    /** 誕生日 */
    birthday: Birthday;
    /** アイコンID（オプション） */
    iconId?: IconId;
    /** 家族メンバーID（オプション） */
    familyMemberId?: FamilyMemberId;
  };

  constructor(params: {
    /** 家族情報 */
    family: {
      /** 家族表示ID */
      displayId: FamilyDisplayId;
      /** 家族名 */
      name: FamilyName;
      /** 家族オンライン名 */
      onlineName: FamilyOnlineName;
      /** アイコンID（オプション） */
      iconId?: IconId;
      /** 家族紹介（オプション） */
      introduction?: FamilyIntroduction;
    };
    /** 親情報 */
    parent: {
      /** 親の名前 */
      name: ParentName;
      /** 誕生日 */
      birthday: Birthday;
      /** アイコンID（オプション） */
      iconId?: IconId;
      /** 家族メンバーID（オプション） */
      familyMemberId?: FamilyMemberId;
    };
  }) {
    super();
    this.family = params.family;
    this.parent = params.parent;
    this.runValidate();
  }

  /** モデルの値を検証 */
  protected validate(): void {
    this.validator.valuesEmpty(
      this.family.displayId,
      this.family.name,
      this.family.onlineName,
      this.parent.name,
      this.parent.birthday,
    );
  }

  /** 初期状態のフォームデータを作成 */
  public static initialize(): FamilyRegisterForm {
    return new FamilyRegisterForm({
      family: {
        displayId: new FamilyDisplayId(""),
        name: new FamilyName(""),
        onlineName: new FamilyOnlineName(""),
        iconId: undefined,
        introduction: undefined,
      },
      parent: {
        name: new ParentName(""),
        birthday: new Birthday(),
        iconId: undefined,
        familyMemberId: undefined,
      },
    });
  }

  /** 家族情報のみを更新した新しいインスタンスを作成 */
  public updateFamily(familyData: Partial<{
    displayId: FamilyDisplayId;
    name: FamilyName;
    onlineName: FamilyOnlineName;
    iconId?: IconId;
    introduction?: FamilyIntroduction;
  }>): FamilyRegisterForm {
    return new FamilyRegisterForm({
      family: {
        ...this.family,
        ...familyData,
      },
      parent: this.parent,
    });
  }

  /** 親情報のみを更新した新しいインスタンスを作成 */
  public updateParent(parentData: Partial<{
    name: ParentName;
    birthday: Birthday;
    iconId?: IconId;
    familyMemberId?: FamilyMemberId;
  }>): FamilyRegisterForm {
    return new FamilyRegisterForm({
      family: this.family,
      parent: {
        ...this.parent,
        ...parentData,
      },
    });
  }

}
