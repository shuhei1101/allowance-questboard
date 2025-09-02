import { BaseForm } from '@backend/core/models/baseForm';
import { FamilyDisplayId } from '@backend/features/family/value-object/familyDisplayId';
import { FamilyName } from '../../../../../../backend/src/features/family/value-object/familyName';
import { IconId } from '../../../../../../backend/src/features/icon/value-objects/iconId';
import { FamilyIntroduction } from '@backend/features/family/value-object/familyIntroduction';
import { ParentForm } from '../../../parent/parent-edit-page/models/parentForm';



/** 家族登録フォームモデル */
export class FamilyForm extends BaseForm {
  public readonly displayId: FamilyDisplayId;
  public readonly name: FamilyName;
  public readonly iconId?: IconId;
  public readonly introduction: FamilyIntroduction;
  public readonly parents: ParentForm[];

  constructor(params: { 
    displayId: FamilyDisplayId;
    name: FamilyName;
    iconId?: IconId;
    introduction: FamilyIntroduction;
    parents?: ParentForm[];
  }) {
    super();
    this.displayId = params.displayId;
    this.name = params.name;
    this.iconId = params.iconId;
    this.introduction = params.introduction;
    this.parents = params.parents || [];
    this.runValidate();
  }

  /**
   * モデルの値を検証する
   */
  protected validate(): void {
    this.validator.valuesEmpty(
      this.displayId,
      this.name,
      this.introduction,
    )
  }

  /** 初期状態のフォームを作成 */
  public static initialize(): FamilyForm {
    return new FamilyForm({
      displayId: new FamilyDisplayId(""),
      name: new FamilyName(""),
      introduction: new FamilyIntroduction(""),
      parents: []
    });
  }
}
