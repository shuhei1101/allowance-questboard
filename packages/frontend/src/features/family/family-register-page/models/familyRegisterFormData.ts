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
export class FamilyRegisterFormData extends BaseForm {
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
  public static initialize(): FamilyRegisterFormData {
    return new FamilyRegisterFormData({
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
  }>): FamilyRegisterFormData {
    return new FamilyRegisterFormData({
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
  }>): FamilyRegisterFormData {
    return new FamilyRegisterFormData({
      family: this.family,
      parent: {
        ...this.parent,
        ...parentData,
      },
    });
  }

  /** 家族名の文字列表現を取得 */
  public getFamilyNameString(): string {
    return this.family.name.value || "(未設定)";
  }

  /** 家族オンライン名の文字列表現を取得 */
  public getFamilyOnlineNameString(): string {
    return this.family.onlineName.value || "(未設定)";
  }

  /** 家族表示IDの文字列表現を取得 */
  public getFamilyDisplayIdString(): string {
    return this.family.displayId.value || "(未設定)";
  }

  /** 親名の文字列表現を取得 */
  public getParentNameString(): string {
    return this.parent.name.value || "(未設定)";
  }

  /** authRouter.registerFamilyの入力形式に変換 */
  public toRegisterFamilyInput() {
    return {
      family: {
        displayId: this.family.displayId.value,
        name: this.family.name.value,
        onlineName: this.family.onlineName.value,
        iconId: this.family.iconId?.value,
        introduction: this.family.introduction?.value,
      },
      parent: {
        name: this.parent.name.value,
        birthday: this.parent.birthday.value,
        iconId: this.parent.iconId?.value,
        familyMemberId: this.parent.familyMemberId?.value,
      },
    };
  }
}
